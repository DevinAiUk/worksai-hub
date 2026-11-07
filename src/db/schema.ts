/**
 * Drizzle ORM Schema for WorksAI Hub & Data Lake Platform (`worksai.org`)
 * Isolated inside PostgreSQL schema `worksai_hub` on Neon Postgres (`flat-art-36324621`)
 * so existing production tables in `public` and `neon_auth` are never modified.
 *
 * Adapted from apptension/saas-boilerplate (MIT) — replaces Django models with
 * TypeScript + Drizzle ORM + Better Auth + Data Lake full-text indexing.
 */

export interface WorksAiTenant {
  id: string;
  slug: string;
  name: string;
  plan: "community_mit" | "pro_workspace";
  isDemo: boolean;
  createdAt: string;
}

export interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  defaultTenantId: string;
  role: "admin" | "member" | "viewer";
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BetterAuthSession {
  id: string;
  userId: string;
  tenantId: string;
  token: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

export interface WorksAiAppRecord {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  tagline: string;
  valueProposition: string;
  upstreamName: string;
  upstreamUrl: string;
  upstreamCommit: string;
  upstreamLicense: "MIT";
  githubUrl: string;
  localCommitSha: string;
  githubCommitSha: string;
  subdomain: string;
  appUrl: string;
  portfolioUrl: string;
}

export interface DataLakeSource {
  id: string;
  tenantId: string;
  name: string;
  sourceType: "markdown" | "json" | "csv" | "text";
  appSlug: string;
  r2Bucket: string;
  status: "active" | "paused";
  isDemo: boolean;
  createdAt: string;
}

export interface DataLakeDocument {
  id: string;
  tenantId: string;
  sourceId: string;
  appSlug: string;
  title: string;
  category: string;
  mimeType: "text/markdown" | "application/json" | "text/csv" | "text/plain";
  content: string;
  summary: string;
  tags: string[];
  metadata: Record<string, unknown>;
  r2ObjectKey: string;
  byteSize: number;
  visibility: "tenant_private" | "workspace_shared" | "public_demo";
  isDemo: boolean;
  createdBy: string;
  createdAt: string;
}

export const DRIZZLE_TABLE_NAMES = {
  schema: "worksai_hub",
  tenants: "worksai_hub.tenants",
  users: "worksai_hub.users",
  sessions: "worksai_hub.sessions",
  accounts: "worksai_hub.accounts",
  verifications: "worksai_hub.verifications",
  apps: "worksai_hub.apps",
  dataLakeSources: "worksai_hub.data_lake_sources",
  dataLakeDocuments: "worksai_hub.data_lake_documents",
} as const;
