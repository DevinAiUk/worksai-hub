/**
 * Authorization-Aware Data Lake Ingestion & Full-Text Search Engine
 * Adapted from apptension/saas-boilerplate documents/crud modules.
 * Supports Markdown, JSON, CSV, and plain-text ingestion with MIME validation,
 * secret/private-key guardrails, Cloudflare R2 object keys, and ranked search.
 */
import type { DataLakeDocument } from "../db/schema";

export const ALLOWED_MIME_TYPES = new Set([
  "text/markdown",
  "application/json",
  "text/csv",
  "text/plain",
]);

export interface IngestRequest {
  title: string;
  category?: string;
  appSlug?: string;
  mimeType: string;
  content: string;
  tags?: string[];
  visibility?: "tenant_private" | "workspace_shared" | "public_demo";
}

export interface SearchQuery {
  q?: string;
  category?: string;
  appSlug?: string;
  tag?: string;
  tenantId: string;
  includePublicDemo?: boolean;
}
