-- WorksAI Hub & Ecosystem Migration 0003: 20 AI-News Articles & 12 MCP Connectors
CREATE TABLE IF NOT EXISTS worksai_hub.articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  legacy_wp_slug TEXT UNIQUE,
  title TEXT NOT NULL,
  seo_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  target_keyword TEXT NOT NULL,
  search_intent TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  origin_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  modified_at TIMESTAMPTZ NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  internal_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT NOT NULL,
  body TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS worksai_hub.mcp_connections (
  id TEXT PRIMARY KEY,
  app_slug TEXT NOT NULL UNIQUE REFERENCES worksai_hub.apps(slug) ON DELETE CASCADE,
  mcp_endpoint TEXT NOT NULL,
  ai_endpoint TEXT NOT NULL,
  tools_manifest JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
