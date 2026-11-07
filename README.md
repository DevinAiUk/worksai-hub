# WorksAI Product Hub & Data Lake Platform (`worksai.org`)

Lean TypeScript, Drizzle ORM, Neon Serverless Postgres, Better Auth, and Cloudflare Workers adaptation of [apptension/saas-boilerplate](https://github.com/apptension/saas-boilerplate) (MIT License).

## Architecture Overview

- **Upstream Foundation**: Adapted from `apptension/saas-boilerplate` (MIT, `Copyright (c) 2023 Apptension`), retaining the multi-tenant workspace, authentication session lifecycle, and document/CRUD patterns while stripping Stripe billing, Contentful CMS, Django/Python, and AWS ECS/CDK bloat.
- **Database & ORM**: **Drizzle ORM** (`src/db/schema.ts`) + **Neon Serverless Postgres** (`project_id: flat-art-36324621`, isolated schema `worksai_hub`) with PostgreSQL `tsvector` GIN full-text search index (`idx_worksai_datalake_fts`).
- **Authentication**: **Better Auth** compatible session and credential endpoints (`/api/auth/session`, `/api/auth/sign-in/email`, `/api/auth/sign-up/email`, `/api/auth/demo`, `/api/auth/sign-out`) enforcing tenant isolation (`tenant-worksai-demo` vs `tenant-alpha-isolated`).
- **Data Lake Ingestion & Search**: Supports `text/markdown`, `application/json`, `text/csv`, and `text/plain` ingestion (`/api/datalake/ingest`) with ClipGuard private-key scanning, Cloudflare R2 object keys (`r2://worksai-datalake/<tenant>/<id>`), and ranked full-text + facet search (`/api/datalake/search`).
- **Subdomain Multi-App Routing**: Serves the WorksAI Product Hub at `https://worksai.org` and dedicated interactive application workspaces at `https://<app>.worksai.org` (`canvasarch`, `ledgerflow`, `wavecut`, `growthpulse`, `apisync`, `omnidesk`, `graphmind`, `clipguard`, `commandbar`, `linkengine`, `commercecatalog`, `forumpulse`).

## Setup & Verification

```bash
cp .env.example .env
npm run lint
npm run typecheck
npm test
npm run build
```
