# Upstream Attribution & Derivative Disclosure

**WorksAI Product Hub & Data Lake Platform (`worksai.org`)** is a lean derivative adaptation of [apptension/saas-boilerplate](https://github.com/apptension/saas-boilerplate) (MIT License, Copyright (c) 2023 Apptension).

## What Was Adapted vs. Stripped
- **Retained & Adapted**: Multi-tenant workspace model (`tenants`, `users`, `documents`/`crud-demo`), authentication lifecycle, profile/session guards, and modular routing patterns.
- **Replaced with Lean Edge Stack**:
  - Replaced Django/Python backend and AWS CDK/ECS infrastructure with **Cloudflare Workers** + **TypeScript**.
  - Replaced ORM layer with **Drizzle ORM** targeting **Neon Serverless Postgres** (`worksai_hub` schema) with PostgreSQL `tsvector` GIN full-text indexing.
  - Replaced legacy JWT/OAuth boilerplate with **Better Auth** compatible session/account/verification tables and endpoints.
  - Added authorization-aware **Data Lake Ingestion & Search** supporting Markdown, JSON, CSV, and plain-text ingestion with Cloudflare R2 object keys.
- **Stripped Bloat**: Removed Stripe/Finances billing, Contentful CMS, OpenAI SaaS Assistant, AWS ECS/CloudFormation templates, and Storybook/Nx monorepo overhead.
