import json
import os
import secrets as pysecrets
from datetime import datetime

import psycopg2
import psycopg2.extras


def get_conn():
    dsn = os.environ['DATABASE_URL']
    return psycopg2.connect(dsn)


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
        'body': json.dumps(body, ensure_ascii=False, default=str),
        'isBase64Encoded': False,
    }


def get_user_id(cur, event) -> int | None:
    headers = event.get('headers') or {}
    auth = headers.get('X-Authorization') or headers.get('x-authorization') or ''
    token = auth.replace('Bearer ', '').strip()
    if not token:
        return None
    cur.execute(
        "SELECT user_id FROM sessions WHERE token = %s AND expires_at > now()",
        (token,),
    )
    row = cur.fetchone()
    return row['user_id'] if row else None


def course_public(row) -> dict:
    return {
        'courseId': row['course_id'],
        'progress': row['progress'],
        'status': row['status'],
        'certId': row['cert_id'],
        'enrolledAt': row['enrolled_at'].isoformat() if row['enrolled_at'] else None,
        'completedAt': row['completed_at'].isoformat() if row['completed_at'] else None,
    }


def order_public(row) -> dict:
    return {
        'id': row['id'],
        'itemsCount': row['items_count'],
        'total': float(row['total']),
        'status': row['status'],
        'createdAt': row['created_at'].isoformat() if row['created_at'] else None,
    }


def membership_public(row) -> dict:
    if not row:
        return {'tier': 'basic', 'active': False, 'renewsAt': None, 'price': 0}
    return {
        'tier': row['tier'],
        'active': row['active'],
        'price': float(row['price']),
        'startedAt': row['started_at'].isoformat() if row['started_at'] else None,
        'renewsAt': row['renews_at'].isoformat() if row['renews_at'] else None,
    }


def handler(event: dict, context) -> dict:
    """Личный кабинет: прогресс курсов, история заказов и подписка на клуб пользователя"""
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
        user_id = get_user_id(cur, event)
        if not user_id:
            return response(401, {'error': 'Не авторизован'})

        if method == 'GET' and action == 'courses':
            cur.execute(
                "SELECT course_id, progress, status, cert_id, enrolled_at, completed_at "
                "FROM user_courses WHERE user_id = %s ORDER BY enrolled_at DESC",
                (user_id,),
            )
            rows = cur.fetchall()
            return response(200, {'courses': [course_public(r) for r in rows]})

        if method == 'POST' and action == 'enroll':
            course_id = (body.get('courseId') or '').strip()
            if not course_id:
                return response(400, {'error': 'Не указан курс'})
            cur.execute(
                "INSERT INTO user_courses (user_id, course_id, progress, status) "
                "VALUES (%s, %s, 0, 'in_progress') "
                "ON CONFLICT (user_id, course_id) DO NOTHING "
                "RETURNING course_id, progress, status, cert_id, enrolled_at, completed_at",
                (user_id, course_id),
            )
            row = cur.fetchone()
            if not row:
                cur.execute(
                    "SELECT course_id, progress, status, cert_id, enrolled_at, completed_at "
                    "FROM user_courses WHERE user_id = %s AND course_id = %s",
                    (user_id, course_id),
                )
                row = cur.fetchone()
            return response(200, {'course': course_public(row)})

        if method == 'POST' and action == 'update_progress':
            course_id = (body.get('courseId') or '').strip()
            progress = int(body.get('progress', 0))
            progress = max(0, min(100, progress))
            if not course_id:
                return response(400, {'error': 'Не указан курс'})

            if progress >= 100:
                cert_id = 'HMH-' + datetime.now().strftime('%Y') + '-' + pysecrets.token_hex(3).upper()
                cur.execute(
                    "UPDATE user_courses SET progress = 100, status = 'completed', "
                    "cert_id = COALESCE(cert_id, %s), completed_at = now() "
                    "WHERE user_id = %s AND course_id = %s "
                    "RETURNING course_id, progress, status, cert_id, enrolled_at, completed_at",
                    (cert_id, user_id, course_id),
                )
            else:
                cur.execute(
                    "UPDATE user_courses SET progress = %s, status = 'in_progress' "
                    "WHERE user_id = %s AND course_id = %s "
                    "RETURNING course_id, progress, status, cert_id, enrolled_at, completed_at",
                    (progress, user_id, course_id),
                )
            row = cur.fetchone()
            if not row:
                return response(404, {'error': 'Курс не найден в списке пользователя'})
            return response(200, {'course': course_public(row)})

        if method == 'GET' and action == 'orders':
            cur.execute(
                "SELECT id, items_count, total, status, created_at "
                "FROM orders WHERE user_id = %s ORDER BY created_at DESC",
                (user_id,),
            )
            rows = cur.fetchall()
            return response(200, {'orders': [order_public(r) for r in rows]})

        if method == 'POST' and action == 'create_order':
            items_count = int(body.get('itemsCount', 0))
            total = float(body.get('total', 0))
            cur.execute(
                "INSERT INTO orders (user_id, items_count, total, status) "
                "VALUES (%s, %s, %s, 'Доставлен') "
                "RETURNING id, items_count, total, status, created_at",
                (user_id, items_count, total),
            )
            row = cur.fetchone()
            return response(200, {'order': order_public(row)})

        if method == 'GET' and action == 'membership':
            cur.execute(
                "SELECT tier, price, started_at, renews_at, active "
                "FROM membership_subscriptions WHERE user_id = %s",
                (user_id,),
            )
            row = cur.fetchone()
            return response(200, {'membership': membership_public(row)})

        if method == 'POST' and action == 'subscribe':
            tier = (body.get('tier') or 'basic').strip()
            price = float(body.get('price', 0))
            cur.execute(
                "INSERT INTO membership_subscriptions (user_id, tier, price, renews_at, active) "
                "VALUES (%s, %s, %s, now() + interval '30 days', true) "
                "ON CONFLICT (user_id) DO UPDATE SET "
                "tier = EXCLUDED.tier, price = EXCLUDED.price, "
                "started_at = now(), renews_at = now() + interval '30 days', active = true "
                "RETURNING tier, price, started_at, renews_at, active",
                (user_id, tier, price),
            )
            row = cur.fetchone()
            cur.execute("UPDATE users SET membership_tier = %s WHERE id = %s", (tier, user_id))
            return response(200, {'membership': membership_public(row)})

        if method == 'POST' and action == 'cancel_membership':
            cur.execute(
                "UPDATE membership_subscriptions SET active = false, tier = 'basic' "
                "WHERE user_id = %s "
                "RETURNING tier, price, started_at, renews_at, active",
                (user_id,),
            )
            row = cur.fetchone()
            cur.execute("UPDATE users SET membership_tier = 'basic' WHERE id = %s", (user_id,))
            return response(200, {'membership': membership_public(row)})

        return response(400, {'error': 'Неизвестное действие'})
    finally:
        cur.close()
        conn.close()
