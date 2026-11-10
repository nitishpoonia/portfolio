-- 002: richer case studies and safe slug changes.
-- All columns have defaults, so code from before this migration keeps working.

-- Case-study summary: links (live site, store, repo), one-line outcome, card cover.
ALTER TABLE projects ADD COLUMN IF NOT EXISTS links JSONB NOT NULL DEFAULT '[]';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS outcome TEXT NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cover TEXT NOT NULL DEFAULT '';

-- Ordering on the home and Work pages: featured first, then sort_order (low first).
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INT;

-- When a published post or project changes slug, the old URL redirects to the new one.
CREATE TABLE IF NOT EXISTS slug_redirects (
  kind        TEXT NOT NULL,
  from_slug   TEXT NOT NULL,
  to_slug     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, from_slug)
);
