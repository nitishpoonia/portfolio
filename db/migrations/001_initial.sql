-- 001: the schema as it stood before migrations existed. Every statement is
-- IF NOT EXISTS, so it is a no-op on the production database, which already has these tables.

CREATE TABLE IF NOT EXISTS posts (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  category    TEXT NOT NULL DEFAULT 'tech',
  content     TEXT NOT NULL DEFAULT '',
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  tagline     TEXT NOT NULL DEFAULT '',
  role        TEXT NOT NULL DEFAULT '',
  company     TEXT NOT NULL DEFAULT '',
  timeline    TEXT NOT NULL DEFAULT '',
  tags        TEXT[] NOT NULL DEFAULT '{}',
  type        TEXT NOT NULL DEFAULT 'case-study',
  status      TEXT,
  content     TEXT NOT NULL DEFAULT '',
  published   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Free-form site content (contact details, hero text, etc.), one JSON value per key.
CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Studio login. One row (id = 1) holds the scrypt hash of the admin password.
CREATE TABLE IF NOT EXISTS studio_auth (
  id            INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash TEXT NOT NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Logged-in browsers. Only a SHA-256 of the cookie value is stored.
CREATE TABLE IF NOT EXISTS studio_sessions (
  token_hash  TEXT PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL
);

-- Failed logins, used to rate-limit guessing.
CREATE TABLE IF NOT EXISTS studio_login_failures (
  id  SERIAL PRIMARY KEY,
  ip  TEXT NOT NULL,
  at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS studio_login_failures_at ON studio_login_failures (at);

-- Images uploaded from the Studio editor, served at /media/<id>.
-- id is random so draft images can't be guessed by counting.
CREATE TABLE IF NOT EXISTS media (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  mime        TEXT NOT NULL,
  size        INT NOT NULL,
  width       INT,
  height      INT,
  data        BYTEA NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Short-lived snapshots of unsaved editor content for /preview/<token>.
CREATE TABLE IF NOT EXISTS studio_previews (
  token       TEXT PRIMARY KEY,
  kind        TEXT NOT NULL,
  data        JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
)
