import json
import os
import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

import psycopg2
import psycopg2.extras


def get_conn():
    dsn = os.environ['DATABASE_URL']
    return psycopg2.connect(dsn)


def hash_password(password: str, salt: str) -> str:
    return hmac.new(salt.encode(), password.encode(), hashlib.sha256).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    'Access-Control-Max-Age': '86400',
}


def response(status: int, body: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'body': json.dumps(body, ensure_ascii=False),
        'isBase64Encoded': False,
    }


def user_public(row) -> dict:
    return {
        'id': row['id'],
        'name': row['name'],
        'email': row['email'],
        'phone': row['phone'],
        'role': row['role'],
        'membershipTier': row['membership_tier'],
        'createdAt': row['created_at'].isoformat() if row['created_at'] else None,
    }


def handler(event: dict, context) -> dict:
    """Регистрация, вход, выход и получение текущего пользователя личного кабинета"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')

    body_raw = event.get('body') or '{}'
    try:
        body = json.loads(body_raw) if body_raw else {}
    except json.JSONDecodeError:
        body = {}

    if not action:
        action = body.get('action', '')

    conn = get_conn()
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        if method == 'POST' and action == 'register':
            name = (body.get('name') or '').strip()
            email = (body.get('email') or '').strip().lower()
            password = body.get('password') or ''
            phone = (body.get('phone') or '').strip()
            role = (body.get('role') or 'Мастер').strip()

            if len(name) < 2:
                return response(400, {'error': 'Введите имя'})
            if '@' not in email or '.' not in email:
                return response(400, {'error': 'Некорректный email'})
            if len(password) < 6:
                return response(400, {'error': 'Пароль должен быть не менее 6 символов'})

            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cur.fetchone():
                return response(409, {'error': 'Пользователь с таким email уже зарегистрирован'})

            salt = secrets.token_hex(16)
            pwd_hash = salt + '$' + hash_password(password, salt)

            cur.execute(
                "INSERT INTO users (name, email, password_hash, phone, role) VALUES (%s, %s, %s, %s, %s) "
                "RETURNING id, name, email, phone, role, membership_tier, created_at",
                (name, email, pwd_hash, phone, role),
            )
            user = cur.fetchone()

            token = make_token()
            expires = datetime.now(timezone.utc) + timedelta(days=30)
            cur.execute(
                "INSERT INTO sessions (token, user_id, expires_at) VALUES (%s, %s, %s)",
                (token, user['id'], expires),
            )

            return response(200, {'token': token, 'user': user_public(user)})

        if method == 'POST' and action == 'login':
            email = (body.get('email') or '').strip().lower()
            password = body.get('password') or ''

            cur.execute(
                "SELECT id, name, email, phone, role, membership_tier, created_at, password_hash "
                "FROM users WHERE email = %s",
                (email,),
            )
            user = cur.fetchone()
            if not user:
                return response(401, {'error': 'Неверный email или пароль'})

            salt, stored_hash = user['password_hash'].split('$', 1)
            if hash_password(password, salt) != stored_hash:
                return response(401, {'error': 'Неверный email или пароль'})

            token = make_token()
            expires = datetime.now(timezone.utc) + timedelta(days=30)
            cur.execute(
                "INSERT INTO sessions (token, user_id, expires_at) VALUES (%s, %s, %s)",
                (token, user['id'], expires),
            )

            return response(200, {'token': token, 'user': user_public(user)})

        if method == 'GET' and action == 'me':
            headers = event.get('headers') or {}
            auth = headers.get('X-Authorization') or headers.get('x-authorization') or ''
            token = auth.replace('Bearer ', '').strip()
            if not token:
                return response(401, {'error': 'Не авторизован'})

            cur.execute(
                "SELECT u.id, u.name, u.email, u.phone, u.role, u.membership_tier, u.created_at "
                "FROM sessions s JOIN users u ON u.id = s.user_id "
                "WHERE s.token = %s AND s.expires_at > now()",
                (token,),
            )
            user = cur.fetchone()
            if not user:
                return response(401, {'error': 'Сессия истекла'})

            return response(200, {'user': user_public(user)})

        if method == 'POST' and action == 'logout':
            headers = event.get('headers') or {}
            auth = headers.get('X-Authorization') or headers.get('x-authorization') or ''
            token = auth.replace('Bearer ', '').strip()
            if token:
                cur.execute("DELETE FROM sessions WHERE token = %s", (token,))
            return response(200, {'ok': True})

        return response(400, {'error': 'Неизвестное действие'})
    finally:
        cur.close()
        conn.close()
