CREATE TABLE IF NOT EXISTS user_courses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'in_progress',
    cert_id TEXT,
    enrolled_at TIMESTAMP NOT NULL DEFAULT now(),
    completed_at TIMESTAMP,
    UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    items_count INTEGER NOT NULL DEFAULT 0,
    total NUMERIC(10,2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Доставлен',
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS membership_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) UNIQUE,
    tier TEXT NOT NULL DEFAULT 'basic',
    price NUMERIC(10,2) NOT NULL DEFAULT 0,
    started_at TIMESTAMP NOT NULL DEFAULT now(),
    renews_at TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
