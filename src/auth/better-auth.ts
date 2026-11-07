/**
 * Better Auth Compatible Authentication & Tenant Session Engine for WorksAI Hub
 * Supports credential sign-in, sign-up, demo session bootstrap, session verification,
 * and authorization-aware tenant isolation across `worksai_hub.users` & `worksai_hub.sessions`.
 */
import type { BetterAuthSession, BetterAuthUser } from "../db/schema";

export interface AuthContext {
  authenticated: boolean;
  user: BetterAuthUser | null;
  session: BetterAuthSession | null;
}

export const DEMO_USERS: Record<string, BetterAuthUser & { passwordHash: string }> = {
  "demo@worksai.org": {
    id: "usr-demo-admin",
    email: "demo@worksai.org",
    name: "Devon Bowen (WorksAI Demo)",
    emailVerified: true,
    defaultTenantId: "tenant-worksai-demo",
    role: "admin",
    isDemo: true,
    passwordHash: "worksai-demo-2026",
    createdAt: "2026-11-06T00:00:00Z",
    updatedAt: "2026-11-06T00:00:00Z",
  },
  "alpha@worksai.org": {
    id: "usr-alpha-owner",
    email: "alpha@worksai.org",
    name: "Alpha Workspace Owner",
    emailVerified: true,
    defaultTenantId: "tenant-alpha-isolated",
    role: "admin",
    isDemo: true,
    passwordHash: "worksai-alpha-2026",
    createdAt: "2026-11-06T00:00:00Z",
    updatedAt: "2026-11-06T00:00:00Z",
  },
};
