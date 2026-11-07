-- WorksAI Hub & Data Lake Drizzle Migration (0001_worksai_hub.sql)
-- Non-destructive isolated schema `worksai_hub` on Neon Postgres

CREATE SCHEMA IF NOT EXISTS worksai_hub;

CREATE TABLE IF NOT EXISTS worksai_hub.tenants (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'community_mit',
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  default_tenant_id TEXT NOT NULL REFERENCES worksai_hub.tenants(id),
  role TEXT NOT NULL DEFAULT 'member',
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES worksai_hub.users(id) ON DELETE CASCADE,
  tenant_id TEXT NOT NULL REFERENCES worksai_hub.tenants(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES worksai_hub.users(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.verifications (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.apps (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  tagline TEXT NOT NULL,
  value_proposition TEXT NOT NULL,
  upstream_name TEXT NOT NULL,
  upstream_url TEXT NOT NULL,
  upstream_commit TEXT NOT NULL,
  upstream_license TEXT NOT NULL DEFAULT 'MIT',
  github_url TEXT NOT NULL,
  local_commit_sha TEXT NOT NULL,
  github_commit_sha TEXT NOT NULL,
  subdomain TEXT NOT NULL,
  app_url TEXT NOT NULL,
  portfolio_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.data_lake_sources (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES worksai_hub.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  app_slug TEXT NOT NULL,
  r2_bucket TEXT NOT NULL DEFAULT 'worksai-datalake',
  status TEXT NOT NULL DEFAULT 'active',
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS worksai_hub.data_lake_documents (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL REFERENCES worksai_hub.tenants(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES worksai_hub.data_lake_sources(id) ON DELETE CASCADE,
  app_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  r2_object_key TEXT NOT NULL,
  byte_size INTEGER NOT NULL DEFAULT 0,
  visibility TEXT NOT NULL DEFAULT 'tenant_private',
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_by TEXT NOT NULL,
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_worksai_datalake_fts ON worksai_hub.data_lake_documents USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_worksai_datalake_tenant ON worksai_hub.data_lake_documents (tenant_id, category);
