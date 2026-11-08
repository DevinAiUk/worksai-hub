import crypto from "node:crypto";

// ============================================================================
// WORKSAI DOTS (it.worksai.org) — v2.3.0 PRODUCTION WORKER & AGENT WORKSPACE
// Connect approved tools, run scoped AI workflows, and review consequential
// actions in one WorksAI workspace.
// ============================================================================

export const RELEASE_VERSION = "2.3.0";
export const WORKERS_AI_MODEL_ID = "@cf/meta/llama-3.1-8b-instruct-fp8";
export const WORKERS_AI_CATALOG_UUID = "9b9c87c6-d4b7-494c-b177-87feab5904db";

export const BINARY_KIB = 1024;
export const PROD_MAX_ARTIFACT_BYTES = 64 * BINARY_KIB; // 65,536 bytes
export const DEMO_MAX_ARTIFACT_BYTES = 32 * BINARY_KIB; // 32,768 bytes
export const MAX_PROMPT_UTF8_BYTES = 4 * BINARY_KIB;    // 4,096 bytes model prompt cap
export const MAX_INFERENCE_TOKENS = 300;                // Output token cap per inference
export const MAX_INFERENCE_CALLS_PER_TASK = 2;          // Max model invocations per agent task
export const INFERENCE_TIMEOUT_MS = 8000;               // 8,000 ms timeout per AI.run call
export const MAX_INFERENCE_RETRIES = 1;                 // Max 1 retry on transient AI error
export const MAX_AGENT_TURNS = 5;                       // Bounded 5-turn execution loop
export const MAX_TELEMETRY_RING_BUFFER = 500;
export const MAX_METRIC_TOOL_CARDINALITY = 50;

export const TRUSTED_MEMBERSHIPS = new Map([
  ["u-admin", { tenantId: "t-worksai", workspaceId: "ws-prod", role: "owner", email: "admin@worksai.org" }],
  ["u-editor", { tenantId: "t-worksai", workspaceId: "ws-prod", role: "editor", email: "editor@worksai.org" }],
  ["u-dev", { tenantId: "t-worksai", workspaceId: "ws-prod", role: "member", email: "dev@worksai.org" }],
  ["u-viewer", { tenantId: "t-worksai", workspaceId: "ws-prod", role: "viewer", email: "audit@worksai.org" }],
  ["u-beta", { tenantId: "t-other-org", workspaceId: "ws-beta", role: "owner", email: "owner@beta.example" }]
]);

export const ROLE_CAPABILITIES = {
  owner: new Set(["mcp:read", "mcp:write", "artifact:read", "artifact:write", "approval:grant", "agent:execute", "workspace:admin"]),
  editor: new Set(["mcp:read", "mcp:write", "artifact:read", "artifact:write", "approval:grant", "agent:execute"]),
  member: new Set(["mcp:read", "artifact:read", "artifact:write", "agent:execute"]),
  viewer: new Set(["mcp:read", "artifact:read"]),
  demo_visitor: new Set(["demo:read", "demo:artifact:write", "agent:execute"])
};

export class ConfigValidationError extends Error {
  constructor(message, missingOrInvalidKeys = []) {
    super(message);
    this.name = "ConfigValidationError";
    this.code = "CONFIG_VALIDATION_FAILED";
    this.missingOrInvalidKeys = missingOrInvalidKeys;
  }
}

const PLACEHOLDER_PATTERNS = [
  /^changeme/i,
  /^use-a-random-secret/i,
  /^placeholder/i,
  /^replace[-_]?me/i,
  /^your[-_]?secret/i,
  /^<replace/i,
  /^sk-\.\.\./i
];

export function isValidSecretValue(val, minLen = 32) {
  if (typeof val !== "string" || val.trim().length < minLen) return false;
  for (const pat of PLACEHOLDER_PATTERNS) {
    if (pat.test(val.trim())) return false;
  }
  return true;
}

export function validateRuntimeConfig(env = {}, requiredMode = null) {
  const mode = requiredMode || env.WORKSAI_ENV || "production";
  const errors = [];

  if (!["development", "preview", "demo", "production"].includes(mode)) {
    errors.push("WORKSAI_ENV");
  }

  if (mode === "demo") {
    if (!isValidSecretValue(env.DEMO_SIGNING_SECRET, 32)) errors.push("DEMO_SIGNING_SECRET");
    if (env.DEMO_SIGNING_SECRET && env.JWT_SECRET && env.DEMO_SIGNING_SECRET === env.JWT_SECRET) {
      errors.push("DEMO_SIGNING_SECRET_MUST_NOT_EQUAL_PRODUCTION_JWT_SECRET");
    }
  } else {
    if (!isValidSecretValue(env.JWT_SECRET || env.BETTER_AUTH_SECRET, 32)) {
      errors.push("JWT_SECRET/BETTER_AUTH_SECRET");
    }
    if (!isValidSecretValue(env.ARTIFACT_HMAC_SECRET, 32)) {
      errors.push("ARTIFACT_HMAC_SECRET");
    }
    if (!isValidSecretValue(env.APPROVAL_SIGNING_SECRET, 32)) {
      errors.push("APPROVAL_SIGNING_SECRET");
    }
  }

  if (errors.length > 0) {
    throw new ConfigValidationError(
      `Configuration validation failed-closed for mode '${mode}': invalid or missing [${errors.join(", ")}]`,
      errors
    );
  }

  return {
    mode,
    r2Prefix: mode === "demo" ? "demo/" : mode === "preview" ? "preview/" : "prod/",
    maxArtifactBytes: Number(env.MAX_ARTIFACT_BYTES || (mode === "demo" ? DEMO_MAX_ARTIFACT_BYTES : PROD_MAX_ARTIFACT_BYTES)),
    maxHandoffDepth: Number(env.MAX_HANDOFF_DEPTH || (mode === "demo" ? 3 : 5)),
    artifactTtlMs: mode === "demo" ? 3600 * 1000 : 24 * 3600 * 1000,
    approvalTtlMs: 15 * 60 * 1000,
    rateLimitPerMin: mode === "demo" ? 25 : 100,
    aiCallsPerMin: mode === "demo" ? (env.ALLOW_DEMO_LIVE_AI === "true" ? 5 : 0) : 20,
    allowDemoLiveAi: env.ALLOW_DEMO_LIVE_AI === "true"
  };
}

export function isAllowedHost(hostStr, env = {}) {
  if (!hostStr) return false;
  const h = hostStr.toLowerCase().split(":")[0];
  if (h === "it.worksai.org") return true;
  const isDevOrTest = env.WORKSAI_ENV === "development" || env.WORKSAI_ENV === "preview" || env.ALLOW_LOCALHOST_HOSTS === "true";
  if (isDevOrTest && (h === "localhost" || h === "127.0.0.1")) return true;
  return false;
}

const SECRET_DETECTORS = [
  { type: "OPENAI_API_KEY", regex: /\bsk-(?:proj-|live-|test-)?[A-Za-z0-9_-]{20,}\b/g, replacement: "[REDACTED_OPENAI_KEY]" },
  { type: "AWS_ACCESS_KEY", regex: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/g, replacement: "[REDACTED_AWS_KEY]" },
  { type: "GITHUB_PAT", regex: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, replacement: "[REDACTED_GITHUB_TOKEN]" },
  { type: "SLACK_TOKEN", regex: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g, replacement: "[REDACTED_SLACK_TOKEN]" },
  { type: "GOOGLE_API_KEY", regex: /\bAIza[0-9A-Za-z_-]{35}\b/g, replacement: "[REDACTED_GOOGLE_API_KEY]" },
  { type: "PEM_PRIVATE_KEY", regex: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/g, replacement: "[REDACTED_PEM_PRIVATE_KEY]" },
  { type: "BEARER_JWT", regex: /\b(?:wai_prod_v1|wai_demo_v1|wai_appr_v1|wai_v1|eyJ[A-Za-z0-9_-]{10,})\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g, replacement: "[REDACTED_SESSION_TOKEN]" },
  { type: "DATABASE_URL", regex: /\b(?:postgres|postgresql|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s"'<>]+/gi, replacement: "[REDACTED_DATABASE_URI]" },
  { type: "EMAIL_PII", regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, replacement: "[REDACTED_EMAIL]" },
  { type: "PHONE_PII", regex: /\b(?:\+?1[-.\s]?)?\(?[2-9][0-9]{2}\)?[-.\s][2-9][0-9]{2}[-.\s][0-9]{4}\b/g, replacement: "[REDACTED_PHONE]" }
];

export function scrubSecretsDeep(input) {
  const detectedTypes = new Set();
  let redactedCount = 0;

  function scrubString(str) {
    let out = String(str);
    for (const det of SECRET_DETECTORS) {
      const matches = out.match(det.regex);
      if (matches && matches.length > 0) {
        detectedTypes.add(det.type);
        redactedCount += matches.length;
        out = out.replace(det.regex, det.replacement);
      }
    }
    return out;
  }

  function walk(val) {
    if (typeof val === "string") return scrubString(val);
    if (Array.isArray(val)) return val.map(walk);
    if (val && typeof val === "object") {
      const copy = {};
      for (const [k, v] of Object.entries(val)) copy[k] = walk(v);
      return copy;
    }
    return val;
  }

  const sanitized = walk(input);
  return { sanitized, redactedCount, detectedTypes: Array.from(detectedTypes), rawSecretLogged: false };
}

const PROMPT_INJECTION_PATTERNS = [
  { id: "IGNORE_PREVIOUS_INSTRUCTIONS", regex: /\b(?:ignore|disregard|forget)\s+(?:all\s+)?(?:previous|prior|above|system)\s+(?:instructions|prompts|rules|guardrails)/i },
  { id: "SYSTEM_ROLE_HIJACK", regex: /(?:^|\n)\s*(?:SYSTEM|DEVELOPER|ADMIN_OVERRIDE)\s*:\s*(?:you\s+are\s+now|grant\s+admin|bypass|execute)/i },
  { id: "TOOL_CALL_SPOOFING", regex: /<(?:tool_call|function_call|mcp_invoke|system_instruction)>[\s\S]*?<\/(?:tool_call|function_call|mcp_invoke|system_instruction)>/i },
  { id: "EXFILTRATE_SECRETS_DIRECTIVE", regex: /\b(?:exfiltrate|print|dump|send|post)\s+(?:all\s+)?(?:env|environment\s+variables|secrets|jwt_secret|api_keys|Authorization\s+header)/i },
  { id: "APPROVAL_BYPASS_DIRECTIVE", regex: /\b(?:bypass|skip|forge|auto[-_]?approve)\s+(?:human\s+)?(?:approval|confirmWrite|approvalToken)/i }
];

export function inspectForPromptInjection(input) {
  const text = typeof input === "string" ? input : JSON.stringify(input || "");
  const matched = [];
  for (const pat of PROMPT_INJECTION_PATTERNS) {
    if (pat.regex.test(text)) matched.push(pat.id);
  }
  return { detected: matched.length > 0, matchedPatterns: matched };
}

export function validateSafeExternalUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(String(rawUrl).trim());
  } catch {
    return { valid: false, reason: "INVALID_URL_SYNTAX" };
  }
  if (parsed.protocol !== "https:") return { valid: false, reason: "NON_HTTPS_SCHEME_FORBIDDEN" };
  if (parsed.username || parsed.password) return { valid: false, reason: "EMBEDDED_URL_CREDENTIALS_FORBIDDEN" };
  const host = parsed.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "metadata.google.internal" ||
    host === "instance-data"
  ) {
    return { valid: false, reason: "INTERNAL_HOSTNAME_SSRF_BLOCKED" };
  }
  const cleanHost = host.replace(/^\[|\]$/g, "");
  if (cleanHost === "::1" || cleanHost === "0:0:0:0:0:0:0:1" || /^fe80:/i.test(cleanHost) || /^f[cd][0-9a-f]{2}:/i.test(cleanHost)) {
    return { valid: false, reason: "PRIVATE_IPV6_SSRF_BLOCKED" };
  }
  const ipv4Match = cleanHost.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b] = ipv4Match.map(Number);
    if (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    ) {
      return { valid: false, reason: "PRIVATE_OR_METADATA_IPV4_SSRF_BLOCKED" };
    }
  }
  return { valid: true, normalizedUrl: parsed.toString() };
}

export function escapeHtmlSafe(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function hmacSha256Hex(secret, message) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

function sha256Hex(message) {
  return crypto.createHash("sha256").update(message).digest("hex");
}

export function canonicalizeJson(val) {
  if (val === null || typeof val !== "object") return JSON.stringify(val);
  if (Array.isArray(val)) return "[" + val.map(canonicalizeJson).join(",") + "]";
  const keys = Object.keys(val).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + canonicalizeJson(val[k])).join(",") + "}";
}

export function createSimulatedR2Bucket() {
  const objects = new Map();
  let verCounter = 1;
  return {
    __isSimulatedR2: true,
    __objects: objects,
    async get(key) {
      const entry = objects.get(key);
      if (!entry) return null;
      return {
        key,
        etag: entry.etag,
        uploaded: entry.uploaded,
        async text() { return entry.body; },
        async json() { return JSON.parse(entry.body); }
      };
    },
    async put(key, value, options = {}) {
      const existing = objects.get(key);
      if (options && options.onlyIf) {
        if (options.onlyIf.etagMatches !== undefined) {
          if (!existing || existing.etag !== options.onlyIf.etagMatches) {
            return null;
          }
        }
        if (options.onlyIf.etagDoesNotMatch === "*") {
          if (existing) return null;
        }
      }
      const nextEtag = `etag_v${++verCounter}_${sha256Hex(String(value)).slice(0, 12)}`;
      const rec = { body: String(value), etag: nextEtag, uploaded: new Date() };
      objects.set(key, rec);
      return { key, etag: nextEtag };
    },
    async delete(key) {
      objects.delete(key);
    },
    async list(options = {}) {
      const prefix = options.prefix || "";
      const out = [];
      for (const [k, v] of objects.entries()) {
        if (k.startsWith(prefix)) {
          out.push({ key: k, etag: v.etag, uploaded: v.uploaded });
        }
      }
      return { objects: out, truncated: false };
    }
  };
}

export function createWorksAiDotsStore({ supportsAtomicCas = true } = {}) {
  const approvals = new Map();
  const approvalLocks = new Map();
  const r2Objects = new Map();
  const conversations = new Map();
  const revokedJtis = new Set();
  const revokedArtifacts = new Set();
  const rateBuckets = new Map();
  const aiRateBuckets = new Map();
  const telemetryEvents = [];
  const metricsByTool = new Map();

  async function withApprovalMutex(approvalId, fn) {
    const prev = approvalLocks.get(approvalId) || Promise.resolve();
    let release;
    const next = new Promise(r => { release = r; });
    approvalLocks.set(approvalId, prev.then(() => next));
    await prev;
    try {
      return await fn();
    } finally {
      release();
      if (approvalLocks.get(approvalId) === next) approvalLocks.delete(approvalId);
    }
  }

  return {
    supportsAtomicCas,
    approvals,
    r2Objects,
    conversations,
    revokedJtis,
    revokedArtifacts,
    rateBuckets,
    aiRateBuckets,
    telemetryEvents,
    metricsByTool,

    async r2Put(key, strValue, env, options = {}) {
      r2Objects.set(key, strValue);
      if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.put === "function") {
        return await env.WORKSAI_DATA_LAKE.put(key, strValue, options);
      }
      return { key, etag: `local_${sha256Hex(strValue).slice(0, 12)}` };
    },

    async r2Get(key, env) {
      if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.get === "function") {
        const obj = await env.WORKSAI_DATA_LAKE.get(key);
        if (obj) {
          const text = await obj.text();
          r2Objects.set(key, text);
          return { text, etag: obj.etag || `r2_${sha256Hex(text).slice(0, 12)}` };
        }
      }
      const local = r2Objects.get(key);
      if (!local) return null;
      return { text: local, etag: `local_${sha256Hex(local).slice(0, 12)}` };
    },

    async r2Delete(key, env) {
      r2Objects.delete(key);
      if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.delete === "function") {
        await env.WORKSAI_DATA_LAKE.delete(key);
      }
    },

    recordTelemetry(ev) {
      if (telemetryEvents.length >= MAX_TELEMETRY_RING_BUFFER) telemetryEvents.shift();
      telemetryEvents.push({ ...ev, timestamp: new Date().toISOString() });
      if (ev.toolName) {
        if (!metricsByTool.has(ev.toolName) && metricsByTool.size >= MAX_METRIC_TOOL_CARDINALITY) return;
        const m = metricsByTool.get(ev.toolName) || { calls: 0, successes: 0, errors: 0 };
        m.calls += 1;
        if (ev.isError) m.errors += 1;
        else m.successes += 1;
        metricsByTool.set(ev.toolName, m);
      }
    },

    async atomicTransitionApproval(approvalId, validatorAndMutator, env = null) {
      if (!this.supportsAtomicCas || (env && env.DISABLE_ATOMIC_APPROVAL_CAS === "true")) {
        return {
          ok: false,
          status: 503,
          code: "ATOMIC_APPROVAL_STORE_REQUIRED",
          error: "Consequential write blocked: atomic approval coordination store is unavailable or disabled."
        };
      }
      return withApprovalMutex(approvalId, async () => {
        await Promise.resolve();
        const r2Key = `prod/approvals/${approvalId}.json`;
        let entry = approvals.get(approvalId);
        let currentEtag = entry ? entry.etag : null;

        if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.get === "function") {
          const r2Obj = await env.WORKSAI_DATA_LAKE.get(r2Key);
          if (r2Obj) {
            const parsed = JSON.parse(await r2Obj.text());
            currentEtag = r2Obj.etag;
            entry = { record: parsed.record, version: parsed.version || 1, etag: currentEtag };
          }
        }

        if (!entry) {
          return { ok: false, status: 403, code: "UNKNOWN_APPROVAL_RECORD", error: "Approval record not found" };
        }

        const currentCopy = JSON.parse(JSON.stringify(entry.record));
        const res = await validatorAndMutator(currentCopy, entry.version);
        if (!res.ok) return res;

        const nextVersion = entry.version + 1;
        let nextEtag = `v${nextVersion}`;

        if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.put === "function" && currentEtag) {
          const putRes = await env.WORKSAI_DATA_LAKE.put(
            r2Key,
            JSON.stringify({ record: res.updatedRecord, version: nextVersion }),
            { onlyIf: { etagMatches: currentEtag } }
          );
          if (!putRes) {
            return {
              ok: false,
              status: 409,
              code: "APPROVAL_REPLAY_FORBIDDEN",
              error: `Cross-instance conditional R2 CAS rejected concurrent transition for approval '${approvalId}'.`
            };
          }
          nextEtag = putRes.etag || nextEtag;
        }

        approvals.set(approvalId, { record: res.updatedRecord, version: nextVersion, etag: nextEtag });
        return { ...res, ok: true, record: res.updatedRecord, version: nextVersion };
      });
    }
  };
}

export function issueSessionToken(identity, env) {
  const isDemo = identity.mode === "demo" || identity.role === "demo_visitor";
  validateRuntimeConfig(env, isDemo ? "demo" : (env.WORKSAI_ENV || "production"));
  const secret = isDemo ? env.DEMO_SIGNING_SECRET : (env.JWT_SECRET || env.BETTER_AUTH_SECRET);
  const prefix = isDemo ? "wai_demo_v1" : "wai_prod_v1";

  const payload = {
    jti: "sess_" + crypto.randomBytes(12).toString("hex"),
    userId: String(identity.userId),
    tenantId: String(identity.tenantId),
    workspaceId: String(identity.workspaceId || identity.tenantId),
    role: String(identity.role || (isDemo ? "demo_visitor" : "member")),
    mode: isDemo ? "demo" : "production",
    csrfToken: crypto.randomBytes(16).toString("hex"),
    iat: Date.now(),
    exp: Date.now() + (isDemo ? 3600 * 1000 : 12 * 3600 * 1000)
  };
  const b64 = Buffer.from(JSON.stringify(payload), "utf-8").toString("base64url");
  const sig = hmacSha256Hex(secret, `${prefix}.${b64}`);
  return { token: `${prefix}.${b64}.${sig}`, payload };
}

export function verifySessionToken(rawToken, env, expectedRouteMode = "production", revokedJtis = new Set()) {
  if (!rawToken || typeof rawToken !== "string") {
    return { ok: false, status: 401, code: "AUTH_REQUIRED", error: "Missing session token" };
  }
  const parts = rawToken.trim().split(".");
  if (parts.length !== 3) {
    return { ok: false, status: 401, code: "INVALID_TOKEN_FORMAT", error: "Malformed session token" };
  }
  const [prefix, b64, sig] = parts;

  if (expectedRouteMode === "demo" && prefix !== "wai_demo_v1") {
    return { ok: false, status: 403, code: "DEMO_BOUNDARY_VIOLATION", error: "Production credentials cannot be used on /demo API routes." };
  }
  if (expectedRouteMode === "production" && prefix !== "wai_prod_v1") {
    return { ok: false, status: 403, code: "DEMO_CREDENTIAL_FORBIDDEN_IN_PROD", error: "Demo sandbox tokens cannot access production routes." };
  }

  const secret = prefix === "wai_demo_v1" ? env.DEMO_SIGNING_SECRET : (env.JWT_SECRET || env.BETTER_AUTH_SECRET);
  if (!isValidSecretValue(secret, 32)) {
    return { ok: false, status: 503, code: "CONFIG_VALIDATION_FAILED", error: "Signing secret not configured" };
  }
  const expectedSig = hmacSha256Hex(secret, `${prefix}.${b64}`);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { ok: false, status: 401, code: "INVALID_TOKEN_SIGNATURE", error: "Token signature verification failed" };
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf-8"));
  } catch {
    return { ok: false, status: 401, code: "CORRUPT_TOKEN_PAYLOAD", error: "Invalid token JSON" };
  }

  if (!payload.exp || Date.now() > payload.exp) {
    return { ok: false, status: 401, code: "TOKEN_EXPIRED", error: "Session token has expired" };
  }
  if (revokedJtis.has(payload.jti)) {
    return { ok: false, status: 401, code: "TOKEN_REVOKED", error: "Session token has been revoked" };
  }

  const caps = ROLE_CAPABILITIES[payload.role] || new Set();
  return { ok: true, identity: { ...payload, authenticated: true, capabilities: Array.from(caps) } };
}

export function checkCapability(identity, capability) {
  if (!identity || !identity.authenticated) return false;
  const set = ROLE_CAPABILITIES[identity.role];
  return Boolean(set && set.has(capability));
}

export const CORRECTED_MCP_TOOLS = [
  { name: "canvasarch.parse_topology", sub: "canvasarch", appSlug: "worksai-canvasarch", requiredScope: "mcp:read", description: "Parse architecture arrows into directed graph nodes, fan-in/fan-out, and SPOFs.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "canvasarch.detect_spof", sub: "canvasarch", appSlug: "worksai-canvasarch", requiredScope: "mcp:read", description: "Identify single points of failure across service topologies.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "canvasarch.export_svg", sub: "canvasarch", appSlug: "worksai-canvasarch", requiredScope: "mcp:read", description: "Render topology diagram metadata for export.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "graphmind.build_backlink_graph", sub: "graphmind", appSlug: "worksai-graphmind", requiredScope: "mcp:read", description: "Build bidirectional wikilink graph from ADR notes.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "graphmind.find_orphan_notes", sub: "graphmind", appSlug: "worksai-graphmind", requiredScope: "mcp:read", description: "Detect unlinked ADR and architecture notes.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "graphmind.retrieve_context_subgraph", sub: "graphmind", appSlug: "worksai-graphmind", requiredScope: "mcp:read", description: "Hydrate ADR context subgraph and merge upstream CanvasArch nodes.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "apisync.diff_openapi", sub: "apisync", appSlug: "worksai-apisync-studio", requiredScope: "mcp:read", description: "Detect breaking and non-breaking OpenAPI contract changes across services.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "apisync.validate_contract", sub: "apisync", appSlug: "worksai-apisync-studio", requiredScope: "mcp:read", description: "Validate endpoint schemas and status codes.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "apisync.generate_mock_fixture", sub: "apisync", appSlug: "worksai-apisync-studio", requiredScope: "mcp:read", description: "Generate deterministic contract mock payloads.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commercecatalog.enrich_sku", sub: "commercecatalog", appSlug: "worksai-commercecatalog", requiredScope: "mcp:read", description: "Enrich SKU attributes and structured catalog fields.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commercecatalog.generate_product_jsonld", sub: "commercecatalog", appSlug: "worksai-commercecatalog", requiredScope: "mcp:read", description: "Generate Schema.org Product JSON-LD markup.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commercecatalog.audit_margin_floor", sub: "commercecatalog", appSlug: "worksai-commercecatalog", requiredScope: "mcp:read", description: "Audit SKU gross margins against the 35.0% floor policy.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "linkengine.create_shortlink", sub: "linkengine", appSlug: "worksai-linkengine", requiredScope: "mcp:write", description: "Create and persist a governed UTM shortlink (consequential write requires approval when dryRun=false).", annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true } },
  { name: "linkengine.validate_utm_policy", sub: "linkengine", appSlug: "worksai-linkengine", requiredScope: "mcp:read", description: "Validate UTM parameters against campaign taxonomy.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "linkengine.audit_redirect_health", sub: "linkengine", appSlug: "worksai-linkengine", requiredScope: "mcp:read", description: "Inspect HTTPS destination safety and SSRF guard compliance.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true } },
  { name: "growthpulse.evaluate_funnel", sub: "growthpulse", appSlug: "worksai-growthpulse", requiredScope: "mcp:read", description: "Compute conversion rates and attributed MRR across funnel stages.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "growthpulse.detect_metric_anomalies", sub: "growthpulse", appSlug: "worksai-growthpulse", requiredScope: "mcp:read", description: "Detect conversion drop-offs and traffic anomalies.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "growthpulse.privacy_event_digest", sub: "growthpulse", appSlug: "worksai-growthpulse", requiredScope: "mcp:read", description: "Summarize cookieless analytics events.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "omnidesk.triage_ticket", sub: "omnidesk", appSlug: "worksai-omnidesk", requiredScope: "mcp:read", description: "Triage support tickets by SLA urgency and KB match.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "omnidesk.draft_grounded_reply", sub: "omnidesk", appSlug: "worksai-omnidesk", requiredScope: "mcp:read", description: "Draft a grounded customer response citing verified KB articles.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "omnidesk.evaluate_sla_risk", sub: "omnidesk", appSlug: "worksai-omnidesk", requiredScope: "mcp:read", description: "Evaluate P1/P2 SLA breach timelines.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "forumpulse.score_thread_safety", sub: "forumpulse", appSlug: "worksai-forumpulse", requiredScope: "mcp:read", description: "Score community thread moderation safety.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "forumpulse.extract_faq_jsonld", sub: "forumpulse", appSlug: "worksai-forumpulse", requiredScope: "mcp:write", description: "Stage or publish Schema.org FAQPage JSON-LD (consequential write requires approval when dryRun=false).", annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "forumpulse.summarize_topic_cluster", sub: "forumpulse", appSlug: "worksai-forumpulse", requiredScope: "mcp:read", description: "Summarize recurring community questions.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "clipguard.scrub_clipboard", sub: "clipguard", appSlug: "worksai-clipguard", requiredScope: "mcp:read", description: "Scrub API keys, tokens, PEM keys, and PII from raw text.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "clipguard.detect_secrets", sub: "clipguard", appSlug: "worksai-clipguard", requiredScope: "mcp:read", description: "Scan text for credential patterns without logging raw values.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "clipguard.normalize_format", sub: "clipguard", appSlug: "worksai-clipguard", requiredScope: "mcp:read", description: "Normalize structured text after secret redaction.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commandbar.rank_commands", sub: "commandbar", appSlug: "worksai-commandbar", requiredScope: "mcp:read", description: "Rank workspace commands by intent relevance.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commandbar.evaluate_expression", sub: "commandbar", appSlug: "worksai-commandbar", requiredScope: "mcp:read", description: "Evaluate deterministic command expressions.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "commandbar.resolve_workflow_macro", sub: "commandbar", appSlug: "worksai-commandbar", requiredScope: "mcp:read", description: "Compile a sanitized CLI workflow macro from upstream ClipGuard output.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "ledgerflow.normalize_csv", sub: "ledgerflow", appSlug: "worksai-ledgerflow", requiredScope: "mcp:read", description: "Normalize raw ledger CSV entries.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "ledgerflow.detect_subscription_creep", sub: "ledgerflow", appSlug: "worksai-ledgerflow", requiredScope: "mcp:read", description: "Flag duplicate or growing SaaS charges.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "ledgerflow.forecast_runway", sub: "ledgerflow", appSlug: "worksai-ledgerflow", requiredScope: "mcp:read", description: "Calculate cash burn and runway months.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "wavecut.detect_silence", sub: "wavecut", appSlug: "worksai-wavecut-studio", requiredScope: "mcp:read", description: "Identify dead-air segments in timeline transcripts.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "wavecut.generate_chapters", sub: "wavecut", appSlug: "worksai-wavecut-studio", requiredScope: "mcp:read", description: "Generate timestamped chapter markers.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } },
  { name: "wavecut.export_cue_sheet", sub: "wavecut", appSlug: "worksai-wavecut-studio", requiredScope: "mcp:read", description: "Export structured audio cue sheets.", annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false } }
];

export async function createArtifactEnvelope({
  identity,
  sourceApp,
  sourceTool,
  rawPayload,
  parentEnvelope = null,
  env,
  store,
  customTtlMs = null
}) {
  const mode = identity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, mode);

  const canWrite = mode === "demo"
    ? checkCapability(identity, "demo:artifact:write")
    : checkCapability(identity, "artifact:write");
  if (!canWrite) {
    return { ok: false, status: 403, code: "INSUFFICIENT_ROLE_FOR_ARTIFACT", error: `Role '${identity.role}' cannot persist handoff artifacts.` };
  }

  const parentIds = parentEnvelope
    ? [...(parentEnvelope.parentArtifactIds || []), parentEnvelope.artifactId]
    : [];
  const chainDepth = parentIds.length + 1;
  if (chainDepth > cfg.maxHandoffDepth) {
    return {
      ok: false,
      status: 400,
      code: "HANDOFF_MAX_DEPTH_EXCEEDED",
      error: `Handoff chain depth (${chainDepth}) exceeds maxHandoffDepth (${cfg.maxHandoffDepth}).`
    };
  }

  const scrubRes = scrubSecretsDeep(rawPayload);
  const serializedPayload = JSON.stringify(scrubRes.sanitized);
  const byteSize = Buffer.byteLength(serializedPayload, "utf-8");

  if (byteSize > cfg.maxArtifactBytes) {
    return {
      ok: false,
      status: 413,
      code: "ARTIFACT_TOO_LARGE",
      error: `Sanitized artifact payload (${byteSize} UTF-8 bytes) exceeds maxArtifactBytes (${cfg.maxArtifactBytes} bytes = ${cfg.maxArtifactBytes / 1024} KiB).`
    };
  }

  const artifactId = "art_" + crypto.randomBytes(16).toString("hex");
  const sha256Digest = sha256Hex(serializedPayload);
  const now = Date.now();
  const ttl = customTtlMs !== null ? customTtlMs : cfg.artifactTtlMs;
  const traceId = (parentEnvelope && parentEnvelope.traceId)
    ? parentEnvelope.traceId
    : `wai-tr-${now.toString(36)}-${crypto.randomBytes(3).toString("hex")}`;

  const envelope = {
    schemaVersion: "wai.artifact.v1",
    artifactId,
    status: "active",
    tenantId: identity.tenantId,
    workspaceId: identity.workspaceId,
    createdByUserId: identity.userId,
    environmentMode: mode,
    sourceApp,
    sourceTool,
    createdAt: new Date(now).toISOString(),
    createdAtMs: now,
    expiresAt: new Date(now + ttl).toISOString(),
    expiresAtMs: now + ttl,
    contentType: "application/json",
    byteSize,
    sha256Digest,
    sanitizedPayload: scrubRes.sanitized,
    traceId,
    parentArtifactIds: parentIds,
    chainDepth,
    classification: {
      dataSensitivity: mode === "demo" ? "public_demo_synthetic" : "tenant_scoped_sanitized",
      piiScrubbed: true,
      redactedSecretCount: scrubRes.redactedCount,
      detectedSecretTypes: scrubRes.detectedTypes,
      untrustedDataContent: true
    }
  };

  const r2Key = `${cfg.r2Prefix}artifacts/${identity.tenantId}/${identity.workspaceId}/${artifactId}.json`;
  await store.r2Put(r2Key, JSON.stringify(envelope), env);

  const hmacKey = mode === "demo" ? env.DEMO_SIGNING_SECRET : env.ARTIFACT_HMAC_SECRET;
  const handleCore = `${artifactId}.${mode}.${identity.tenantId}.${identity.workspaceId}`;
  const sig = hmacSha256Hex(hmacKey, handleCore).slice(0, 24);
  const handoffHandle = `wai_art_v1.${artifactId}.${sig}`;

  return { ok: true, handoffHandle, envelope, r2Key };
}

export async function resolveArtifactHandoff({ handoffFrom, callerIdentity, targetCycleId = null, env, store }) {
  if (!handoffFrom || typeof handoffFrom !== "string") {
    return { ok: false, status: 400, code: "MISSING_HANDOFF_HANDLE", error: "handoffFrom handle is empty" };
  }
  if (handoffFrom.startsWith("handoff:")) {
    return {
      ok: false,
      status: 400,
      code: "LEGACY_HANDLE_UNSUPPORTED",
      error: `Legacy checksum handle '${handoffFrom}' is a non-persisted label and cannot hydrate upstream data.`
    };
  }
  const parts = handoffFrom.trim().split(".");
  if (parts.length !== 3 || parts[0] !== "wai_art_v1") {
    return { ok: false, status: 400, code: "MALFORMED_HANDOFF_HANDLE", error: "Invalid handoffFrom handle format" };
  }
  const [, artifactId, sig] = parts;

  if (store.revokedArtifacts.has(artifactId)) {
    return { ok: false, status: 403, code: "ARTIFACT_REVOKED", error: `Artifact '${artifactId}' has been revoked.` };
  }

  const callerMode = callerIdentity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, callerMode);
  const expectedR2Key = `${cfg.r2Prefix}artifacts/${callerIdentity.tenantId}/${callerIdentity.workspaceId}/${artifactId}.json`;
  const r2Obj = await store.r2Get(expectedR2Key, env);

  if (!r2Obj) {
    for (const k of store.r2Objects.keys()) {
      if (k.endsWith(`/${artifactId}.json`)) {
        return {
          ok: false,
          status: 403,
          code: "CROSS_TENANT_OR_MODE_ARTIFACT_FORBIDDEN",
          error: `Caller (${callerMode}:${callerIdentity.tenantId}/${callerIdentity.workspaceId}) is not authorized to resolve artifact '${artifactId}'.`
        };
      }
    }
    if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.list === "function") {
      const listed = await env.WORKSAI_DATA_LAKE.list();
      if (listed && Array.isArray(listed.objects) && listed.objects.some(o => o.key.endsWith(`/${artifactId}.json`))) {
        return {
          ok: false,
          status: 403,
          code: "CROSS_TENANT_OR_MODE_ARTIFACT_FORBIDDEN",
          error: `Caller (${callerMode}:${callerIdentity.tenantId}/${callerIdentity.workspaceId}) is not authorized to resolve artifact '${artifactId}'.`
        };
      }
    }
    return { ok: false, status: 404, code: "ARTIFACT_NOT_FOUND", error: `Artifact '${artifactId}' not found in R2 storage.` };
  }

  let envelope;
  try {
    envelope = JSON.parse(r2Obj.text);
  } catch {
    return { ok: false, status: 500, code: "ARTIFACT_CORRUPT_JSON", error: "Stored artifact JSON is unreadable" };
  }

  if (envelope.schemaVersion !== "wai.artifact.v1") {
    return { ok: false, status: 400, code: "UNSUPPORTED_ARTIFACT_SCHEMA", error: `Unsupported artifact schemaVersion '${envelope.schemaVersion}'` };
  }

  const hmacKey = callerMode === "demo" ? env.DEMO_SIGNING_SECRET : env.ARTIFACT_HMAC_SECRET;
  const handleCore = `${artifactId}.${envelope.environmentMode}.${envelope.tenantId}.${envelope.workspaceId}`;
  const expectedSig = hmacSha256Hex(hmacKey, handleCore).slice(0, 24);
  if (sig !== expectedSig) {
    return { ok: false, status: 403, code: "FORGED_HANDOFF_SIGNATURE", error: "Handoff handle HMAC signature verification failed" };
  }

  if (Date.now() > envelope.expiresAtMs) {
    return { ok: false, status: 410, code: "ARTIFACT_EXPIRED", error: `Artifact '${artifactId}' expired at ${envelope.expiresAt}` };
  }

  const actualDigest = sha256Hex(JSON.stringify(envelope.sanitizedPayload));
  if (actualDigest !== envelope.sha256Digest) {
    return { ok: false, status: 500, code: "ARTIFACT_INTEGRITY_FAILED", error: "Stored artifact payload failed SHA-256 integrity verification" };
  }

  if (targetCycleId && (envelope.artifactId === targetCycleId || (envelope.parentArtifactIds || []).includes(targetCycleId))) {
    return { ok: false, status: 400, code: "HANDOFF_CYCLE_DETECTED", error: "Cyclic handoff reference detected" };
  }

  const pi = inspectForPromptInjection(envelope.sanitizedPayload);
  if (pi.detected) {
    return {
      ok: false,
      status: 400,
      code: "ARTIFACT_PROMPT_INJECTION_BLOCKED",
      error: `Upstream artifact '${artifactId}' contains embedded instruction-override patterns (${pi.matchedPatterns.join(", ")}); execution refused.`
    };
  }

  return { ok: true, envelope };
}

function cleanArgsForApprovalHash(args = {}) {
  const clean = {};
  for (const [k, v] of Object.entries(args || {})) {
    if (v === undefined || v === null) continue;
    if ([
      "approvalToken",
      "approvalId",
      "confirmWrite",
      "idempotencyKey",
      "target",
      "__simulateDomainFailure",
      "__simulateArtifactPersistenceFailure"
    ].includes(k)) continue;
    clean[k] = v;
  }
  return clean;
}

export async function grantActionApproval({ identity, toolName, target, normalizedArgs, env, store, customTtlMs = null }) {
  if (!store.supportsAtomicCas || (env && env.DISABLE_ATOMIC_APPROVAL_CAS === "true")) {
    return { ok: false, status: 503, code: "ATOMIC_APPROVAL_STORE_REQUIRED", error: "Atomic approval store is required to mint approvals." };
  }
  if (!identity || !identity.authenticated || identity.mode === "demo") {
    return { ok: false, status: 403, code: "DEMO_APPROVAL_FORBIDDEN", error: "Demo visitors cannot grant production write approvals." };
  }
  if (!checkCapability(identity, "approval:grant")) {
    return { ok: false, status: 403, code: "INSUFFICIENT_ROLE_FOR_APPROVAL", error: `Role '${identity.role}' cannot grant write approvals.` };
  }

  const cleanArgs = cleanArgsForApprovalHash(normalizedArgs);
  const argsSha256 = sha256Hex(canonicalizeJson(cleanArgs));
  const approvalId = "appr_" + crypto.randomBytes(16).toString("hex");
  const now = Date.now();
  const ttl = customTtlMs !== null ? customTtlMs : 15 * 60 * 1000;

  const record = {
    approvalId,
    state: "approved",
    approverUserId: identity.userId,
    approverRole: identity.role,
    tenantId: identity.tenantId,
    workspaceId: identity.workspaceId,
    toolName: String(toolName),
    target: String(target || toolName),
    argsSha256,
    normalizedArgs: cleanArgs,
    issuedAt: now,
    expiresAt: now + ttl,
    singleUse: true,
    usedAt: null,
    idempotencyKey: null,
    completedResult: null,
    failureReason: null
  };

  const b64 = Buffer.from(JSON.stringify({
    approvalId: record.approvalId,
    tenantId: record.tenantId,
    workspaceId: record.workspaceId,
    toolName: record.toolName,
    target: record.target,
    argsSha256: record.argsSha256,
    expiresAt: record.expiresAt
  }), "utf-8").toString("base64url");
  const sig = hmacSha256Hex(env.APPROVAL_SIGNING_SECRET, `wai_appr_v1.${b64}`);
  const approvalToken = `wai_appr_v1.${b64}.${sig}`;

  let initialEtag = "v1";
  if (env && env.WORKSAI_DATA_LAKE && typeof env.WORKSAI_DATA_LAKE.put === "function") {
    const putRes = await env.WORKSAI_DATA_LAKE.put(
      `prod/approvals/${approvalId}.json`,
      JSON.stringify({ record, version: 1 }),
      { onlyIf: { etagDoesNotMatch: "*" } }
    );
    if (putRes && putRes.etag) initialEtag = putRes.etag;
  }

  store.approvals.set(approvalId, { record, version: 1, etag: initialEtag });
  return { ok: true, approvalId, approvalToken, record };
}

export async function beginAtomicApprovalExecution({ approvalToken, approvalId = null, callerIdentity, toolName, target, args, env, store }) {
  if (!store.supportsAtomicCas || (env && env.DISABLE_ATOMIC_APPROVAL_CAS === "true")) {
    return {
      ok: false,
      status: 503,
      code: "ATOMIC_APPROVAL_STORE_REQUIRED",
      error: "Consequential write blocked: atomic approval coordination store is unavailable."
    };
  }

  let resolvedApprovalId = approvalId;

  if (approvalToken) {
    const parts = String(approvalToken).trim().split(".");
    if (parts.length !== 3 || parts[0] !== "wai_appr_v1") {
      return { ok: false, status: 403, code: "INVALID_APPROVAL_TOKEN", error: "Malformed approval token" };
    }
    const [, b64, sig] = parts;
    const expectedSig = hmacSha256Hex(env.APPROVAL_SIGNING_SECRET, `wai_appr_v1.${b64}`);
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { ok: false, status: 403, code: "TAMPERED_APPROVAL_TOKEN", error: "Approval token signature invalid" };
    }
    const tokenPayload = JSON.parse(Buffer.from(b64, "base64url").toString("utf-8"));
    resolvedApprovalId = tokenPayload.approvalId;
  }

  if (!resolvedApprovalId) {
    return {
      ok: false,
      status: 200,
      code: "APPROVAL_TOKEN_REQUIRED",
      error: `Consequential action '${toolName}' requires a server-verified approval (model confirmWrite:true is never accepted as human approval).`
    };
  }

  const cleanArgs = cleanArgsForApprovalHash(args);
  const currentArgsHash = sha256Hex(canonicalizeJson(cleanArgs));
  const reqIdempKey = args.idempotencyKey ? String(args.idempotencyKey) : null;

  return store.atomicTransitionApproval(resolvedApprovalId, async (stored) => {
    if (stored.tenantId !== callerIdentity.tenantId || stored.workspaceId !== callerIdentity.workspaceId) {
      return { ok: false, status: 403, code: "CROSS_TENANT_APPROVAL_FORBIDDEN", error: "Approval belongs to a different tenant/workspace" };
    }
    if (stored.toolName !== toolName || (target && stored.target !== target)) {
      return { ok: false, status: 403, code: "APPROVAL_TOOL_MISMATCH", error: `Approval bound to '${stored.toolName}', not '${toolName}'` };
    }
    if (currentArgsHash !== stored.argsSha256) {
      return { ok: false, status: 403, code: "APPROVAL_ARGS_CHANGED", error: "Action arguments changed after approval was granted; approval invalidated." };
    }
    if (Date.now() > stored.expiresAt) {
      return { ok: false, status: 403, code: "APPROVAL_EXPIRED", error: "Approval record has expired" };
    }
    if (stored.state === "revoked" || stored.state === "denied") {
      return { ok: false, status: 403, code: "APPROVAL_REVOKED", error: `Approval is ${stored.state}` };
    }

    if (stored.state === "completed" && reqIdempKey && stored.idempotencyKey === reqIdempKey && stored.completedResult) {
      return {
        ok: true,
        idempotentReplay: true,
        cachedResult: stored.completedResult,
        updatedRecord: stored
      };
    }

    if (stored.state !== "approved") {
      return {
        ok: false,
        status: 409,
        code: "APPROVAL_REPLAY_FORBIDDEN",
        error: `Approval '${stored.approvalId}' cannot be consumed (current state: '${stored.state}', usedAt: ${stored.usedAt})`
      };
    }

    stored.state = "executing";
    stored.usedAt = Date.now();
    stored.consumedByUserId = callerIdentity.userId;
    stored.idempotencyKey = reqIdempKey;
    return { ok: true, idempotentReplay: false, updatedRecord: stored };
  }, env);
}

export async function finalizeAtomicApprovalExecution({ approvalId, finalState, completedResult = null, failureReason = null, store, env = null }) {
  return store.atomicTransitionApproval(approvalId, async (stored) => {
    stored.state = finalState;
    stored.completedResult = completedResult;
    stored.failureReason = failureReason;
    stored.completedAt = Date.now();
    return { ok: true, updatedRecord: stored };
  }, env);
}

export function executeDomainToolWithHandoff({ toolMeta, args, upstreamEnvelope = null }) {
  const tName = toolMeta.name;
  const explicitInput = typeof args.input === "string" ? args.input.trim() : "";
  const upPayload = upstreamEnvelope ? upstreamEnvelope.sanitizedPayload : null;

  if (args.__simulateDomainFailure) {
    return { __domainError: true, errorCode: "SIMULATED_DOMAIN_EXECUTION_FAILURE", message: "Simulated downstream provider execution failure after approval consumption." };
  }

  if (tName.startsWith("canvasarch.")) {
    const lines = explicitInput.split(/\r?\n|;/).map(l => l.trim()).filter(Boolean);
    const nodeMap = new Map();
    const edges = [];
    function getNode(label) {
      const clean = label.trim();
      if (!nodeMap.has(clean)) {
        nodeMap.set(clean, { id: `node_${nodeMap.size + 1}`, label: clean, fanIn: 0, fanOut: 0 });
      }
      return nodeMap.get(clean);
    }
    for (const line of lines) {
      const parts = line.split(/-->|->/).map(s => s.trim()).filter(Boolean);
      if (parts.length >= 2) {
        for (let i = 0; i < parts.length - 1; i++) {
          const a = getNode(parts[i]);
          const b = getNode(parts[i + 1]);
          a.fanOut += 1;
          b.fanIn += 1;
          edges.push({ from: a.label, to: b.label });
        }
      } else if (parts.length === 1) {
        getNode(parts[0]);
      }
    }
    const nodes = Array.from(nodeMap.values());
    const spofNodes = nodes.filter(n => (n.fanIn + n.fanOut) >= 2).map(n => n.label);
    return { nodeCount: nodes.length, edgeCount: edges.length, nodes, edges, spofNodes };
  }

  if (tName.startsWith("graphmind.")) {
    const upstreamNodes = (upPayload && Array.isArray(upPayload.nodes)) ? upPayload.nodes.map(n => n.label) : [];
    const upstreamEdges = (upPayload && Array.isArray(upPayload.edges)) ? upPayload.edges.map(e => `${e.from} -> ${e.to}`) : [];
    const upstreamSpofs = (upPayload && Array.isArray(upPayload.spofNodes)) ? upPayload.spofNodes : [];
    const wikiMatches = Array.from(explicitInput.matchAll(/\[\[([^\]]+)\]\]/g)).map(m => m[1].trim());
    const mergedNodes = Array.from(new Set([...upstreamNodes, ...wikiMatches]));
    const orphanNotes = mergedNodes.filter(n => !upstreamEdges.some(e => e.includes(n)) && !upstreamSpofs.includes(n));
    return {
      linkedNodes: mergedNodes,
      backlinkEdges: upstreamEdges,
      criticalSpofLinks: upstreamSpofs,
      orphanNotes,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("apisync.")) {
    const upstreamNodes = (upPayload && Array.isArray(upPayload.linkedNodes))
      ? upPayload.linkedNodes
      : ((upPayload && Array.isArray(upPayload.nodes)) ? upPayload.nodes.map(n => n.label) : []);
    const lines = explicitInput.split(/\r?\n|;/).map(l => l.trim()).filter(Boolean);
    const removedEndpoints = lines.filter(l => /REMOVED|DELETE/i.test(l));
    const addedEndpoints = lines.filter(l => /ADDED|v2|POST|GET/i.test(l) && !/REMOVED/i.test(l));
    const impactedArchitectureServices = upstreamNodes.filter(node =>
      lines.some(l => l.toLowerCase().includes(node.toLowerCase().split(/\s+/)[0]))
    );
    return {
      breakingChangesCount: removedEndpoints.length,
      breakingChanges: removedEndpoints,
      nonBreakingChanges: addedEndpoints,
      impactedArchitectureServices,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("commercecatalog.")) {
    const lines = explicitInput.split(/\r?\n|;/).map(l => l.trim()).filter(Boolean);
    const validSkus = [];
    const flaggedSkus = [];
    for (const line of lines) {
      const skuMatch = line.match(/\b(SKU-[A-Za-z0-9-]+|[A-Z]+-[0-9]{3,})\b/);
      const skuId = skuMatch ? skuMatch[1] : `SKU-${validSkus.length + flaggedSkus.length + 1}`;
      const costMatch = line.match(/cost\s*:\s*([0-9.]+)/i);
      const priceMatch = line.match(/price\s*:\s*([0-9.]+)/i);
      const cost = costMatch ? parseFloat(costMatch[1]) : 30;
      const price = priceMatch ? parseFloat(priceMatch[1]) : 90;
      const marginPct = price > 0 ? Number((((price - cost) / price) * 100).toFixed(1)) : 0;
      if (marginPct >= 35.0) validSkus.push({ sku: skuId, cost, price, marginPct });
      else flaggedSkus.push({ sku: skuId, cost, price, marginPct, issue: `Gross margin (${marginPct}%) below 35.0% floor` });
    }
    return { validSkus, flaggedSkus, approvedSkuCount: validSkus.length, rejectedSkuCount: flaggedSkus.length };
  }

  if (tName.startsWith("linkengine.")) {
    const approvedSkus = (upPayload && Array.isArray(upPayload.validSkus)) ? upPayload.validSkus.map(s => s.sku) : [];
    const urlMatch = explicitInput.match(/https?:\/\/[^\s"'<>]+/i);
    const candidateUrl = urlMatch ? urlMatch[0] : explicitInput;
    const urlCheck = validateSafeExternalUrl(candidateUrl);
    if (!urlCheck.valid) {
      return { __domainError: true, errorCode: urlCheck.reason, message: `Destination URL rejected by SSRF/HTTPS guard: ${urlCheck.reason}` };
    }
    const u = new URL(urlCheck.normalizedUrl);
    const utmCampaign = (u.searchParams.get("utm_campaign") || "q4_enterprise").toLowerCase();
    const utmSource = (u.searchParams.get("utm_source") || "worksai").toLowerCase();
    const slugHash = sha256Hex(u.toString() + JSON.stringify(approvedSkus)).slice(0, 6);
    return {
      shortUrl: `https://linkengine.worksai.org/s/${slugHash}`,
      governedDestinationUrl: u.toString(),
      utmCampaign,
      utmSource,
      boundApprovedSkus: approvedSkus,
      persisted: args.dryRun === false,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("growthpulse.")) {
    const boundSkus = (upPayload && Array.isArray(upPayload.boundApprovedSkus)) ? upPayload.boundApprovedSkus : [];
    const campaign = (upPayload && upPayload.utmCampaign) ? upPayload.utmCampaign : "organic";
    const visMatch = explicitInput.match(/visitors\s*:\s*([0-9]+)/i);
    const paidMatch = explicitInput.match(/paid\s*:\s*([0-9]+)/i);
    const mrrMatch = explicitInput.match(/mrr\s*:\s*([0-9.]+)/i);
    const visitors = visMatch ? parseInt(visMatch[1], 10) : 1200;
    const paid = paidMatch ? parseInt(paidMatch[1], 10) : 64;
    const mrr = mrrMatch ? parseFloat(mrrMatch[1]) : 3200;
    const conversionPct = visitors > 0 ? Number(((paid / visitors) * 100).toFixed(2)) : 0;
    return {
      overallConversionPct: conversionPct,
      visitors,
      paidConversions: paid,
      attributedMrrUsd: mrr,
      attributedCampaign: campaign,
      attributedSkus: boundSkus,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("omnidesk.")) {
    const upTicket = upPayload || {};
    const isEnterprise = /enterprise|p1|saml|sso|outage/i.test(explicitInput) || upTicket.priority === "P1";
    const kbCode = /saml|sso|clock/i.test(explicitInput) ? "KB-101" : (/webhook|503|retry/i.test(explicitInput) ? "KB-204" : "KB-100");
    return {
      priority: isEnterprise ? "P1" : "P2",
      slaBreached: /elapsed 52m|breach/i.test(explicitInput),
      matchedKbCode: upTicket.matchedKbCode || kbCode,
      draftReply: `Grounded reply citing ${upTicket.matchedKbCode || kbCode} for input: ${escapeHtmlSafe(explicitInput.slice(0, 140))}`,
      requiresHumanReviewBeforeSend: true,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("forumpulse.")) {
    const citedKb = (upPayload && upPayload.matchedKbCode) ? upPayload.matchedKbCode : "KB-GENERAL";
    const draftAnswer = (upPayload && upPayload.draftReply) ? upPayload.draftReply : explicitInput;
    return {
      faqJsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "kbReference": citedKb,
        "mainEntity": [{
          "@type": "Question",
          "name": escapeHtmlSafe(explicitInput.slice(0, 120)),
          "acceptedAnswer": { "@type": "Answer", "text": escapeHtmlSafe(draftAnswer) }
        }]
      },
      publicationStatus: args.dryRun === false ? "staged_approved_draft" : "pending_human_approval",
      persisted: args.dryRun === false,
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  if (tName.startsWith("clipguard.")) {
    const res = scrubSecretsDeep(explicitInput);
    return {
      scrubbedText: typeof res.sanitized === "string" ? res.sanitized : JSON.stringify(res.sanitized),
      redactedCount: res.redactedCount,
      detectedTypes: res.detectedTypes,
      rawSecretLogged: false
    };
  }

  if (tName.startsWith("commandbar.")) {
    const sourceText = (upPayload && upPayload.scrubbedText) ? upPayload.scrubbedText : explicitInput;
    return {
      compiledMacroCommand: `wai-exec --sanitized ${JSON.stringify(sourceText)}`,
      steps: [
        `1. Verified input sanitized (${(upPayload && upPayload.redactedCount) || 0} secrets redacted upstream)`,
        `2. Execute scoped macro for: ${sourceText.slice(0, 100)}`
      ],
      hydratedFromArtifactId: upstreamEnvelope ? upstreamEnvelope.artifactId : null,
      upstreamHandleVerified: Boolean(upstreamEnvelope)
    };
  }

  return { summary: `Executed ${tName}`, inputLength: explicitInput.length };
}

export async function evaluateAndExecuteToolCall({
  callerIdentity,
  toolName,
  args = {},
  env,
  store,
  trafficClass = "live_user"
}) {
  const toolMeta = CORRECTED_MCP_TOOLS.find(t => t.name === toolName);
  if (!toolMeta) {
    return { ok: false, protocolError: true, code: -32602, status: 400, errorCode: "UNKNOWN_TOOL", message: `Unknown MCP tool '${toolName}'.` };
  }

  for (const forbiddenKey of ["tenantId", "workspaceId", "userId", "role", "capabilities", "isDemo"]) {
    if (args && Object.prototype.hasOwnProperty.call(args, forbiddenKey)) {
      return {
        ok: false,
        isError: true,
        status: 200,
        errorCode: "IDENTITY_OVERRIDE_FORBIDDEN",
        message: `Security Error (IDENTITY_OVERRIDE_FORBIDDEN): Argument '${forbiddenKey}' cannot be supplied by caller or model.`
      };
    }
  }

  const mode = callerIdentity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, mode);
  const rateKey = `${mode}:${callerIdentity.tenantId}:${callerIdentity.workspaceId}`;
  const now = Date.now();
  const bucket = store.rateBuckets.get(rateKey) || { count: 0, resetAt: now + 60000 };
  if (now > bucket.resetAt) {
    bucket.count = 1;
    bucket.resetAt = now + 60000;
  } else {
    bucket.count += 1;
  }
  store.rateBuckets.set(rateKey, bucket);
  if (bucket.count > cfg.rateLimitPerMin) {
    return {
      ok: false,
      isError: true,
      status: 429,
      errorCode: "RATE_LIMIT_EXCEEDED",
      message: `Quota Error (RATE_LIMIT_EXCEEDED): Exceeded ${cfg.rateLimitPerMin} calls/min.`
    };
  }

  const isWriteExecution = toolMeta.requiredScope === "mcp:write" && args.dryRun === false;
  if (mode === "demo") {
    if (isWriteExecution) {
      return {
        ok: false,
        isError: true,
        status: 403,
        errorCode: "DEMO_WRITE_FORBIDDEN",
        message: `Sandbox Restriction (DEMO_WRITE_FORBIDDEN): Public demo sessions cannot execute write action '${toolName}' with dryRun=false.`
      };
    }
    if (!checkCapability(callerIdentity, "demo:read")) {
      return { ok: false, isError: true, status: 403, errorCode: "INSUFFICIENT_SCOPE", message: "Missing demo:read capability" };
    }
  } else {
    if (!checkCapability(callerIdentity, "mcp:read")) {
      return { ok: false, isError: true, status: 403, errorCode: "INSUFFICIENT_SCOPE", message: "Missing mcp:read capability" };
    }
    if (isWriteExecution && !checkCapability(callerIdentity, "mcp:write")) {
      return {
        ok: false,
        isError: true,
        status: 403,
        errorCode: "INSUFFICIENT_SCOPE",
        message: `Role '${callerIdentity.role}' lacks 'mcp:write' capability.`
      };
    }
  }

  if (typeof args.input !== "string" || !args.input.trim()) {
    return {
      ok: false,
      isError: true,
      status: 200,
      errorCode: "INVALID_INPUT",
      message: `Validation Error (INVALID_INPUT): '${toolName}' requires a non-empty string 'input'.`
    };
  }

  const inputByteLen = Buffer.byteLength(args.input, "utf-8");
  if (inputByteLen > cfg.maxArtifactBytes) {
    return {
      ok: false,
      isError: true,
      status: 413,
      errorCode: "PAYLOAD_TOO_LARGE",
      message: `Input payload (${inputByteLen} UTF-8 bytes) exceeds ${cfg.maxArtifactBytes} bytes (${cfg.maxArtifactBytes / 1024} KiB).`
    };
  }

  const pi = inspectForPromptInjection(args.input);
  if (pi.detected && toolMeta.sub !== "clipguard") {
    store.recordTelemetry({ event: "prompt_injection_blocked", toolName, trafficClass, environmentMode: mode, isError: true });
    return {
      ok: false,
      isError: true,
      status: 200,
      errorCode: "PROMPT_INJECTION_BLOCKED",
      matchedPatterns: pi.matchedPatterns,
      message: `Security Refusal (PROMPT_INJECTION_BLOCKED): Embedded instruction-override pattern (${pi.matchedPatterns.join(", ")}) blocked.`
    };
  }

  let upstreamEnvelope = null;
  if (args.handoffFrom) {
    const resHandoff = await resolveArtifactHandoff({
      handoffFrom: args.handoffFrom,
      callerIdentity,
      targetCycleId: args.simulateCycleArtifactId || null,
      env,
      store
    });
    if (!resHandoff.ok) {
      store.recordTelemetry({ event: "handoff_failed", toolName, trafficClass, environmentMode: mode, isError: true });
      return { ok: false, isError: true, status: resHandoff.status, errorCode: resHandoff.code, message: resHandoff.error };
    }
    upstreamEnvelope = resHandoff.envelope;
  }

  let activeApprovalRecord = null;
  if (isWriteExecution) {
    const apprStart = await beginAtomicApprovalExecution({
      approvalToken: args.approvalToken,
      approvalId: args.approvalId,
      callerIdentity,
      toolName,
      target: args.target || toolName,
      args,
      env,
      store
    });
    if (!apprStart.ok) {
      return { ok: false, isError: true, status: apprStart.status, errorCode: apprStart.code, message: apprStart.error };
    }
    if (apprStart.idempotentReplay) {
      return {
        ok: true,
        isError: false,
        status: 200,
        structuredContent: {
          ...apprStart.cachedResult,
          idempotentReplay: true
        }
      };
    }
    activeApprovalRecord = apprStart.record;
  }

  const domainOutput = executeDomainToolWithHandoff({
    toolMeta,
    args,
    upstreamEnvelope,
    identity: callerIdentity
  });

  if (domainOutput && domainOutput.__domainError) {
    if (activeApprovalRecord) {
      await finalizeAtomicApprovalExecution({
        approvalId: activeApprovalRecord.approvalId,
        finalState: "failed",
        failureReason: domainOutput.errorCode,
        store,
        env
      });
    }
    store.recordTelemetry({ event: "tool_failed", toolName, trafficClass, environmentMode: mode, isError: true });
    return {
      ok: false,
      isError: true,
      status: 200,
      errorCode: domainOutput.errorCode,
      approvalState: activeApprovalRecord ? "failed" : undefined,
      message: domainOutput.message
    };
  }

  if (args.__simulateArtifactPersistenceFailure) {
    if (activeApprovalRecord) {
      await finalizeAtomicApprovalExecution({
        approvalId: activeApprovalRecord.approvalId,
        finalState: "partial_effect_persistence_failed",
        failureReason: "R2_ARTIFACT_WRITE_FAILED_AFTER_DOMAIN_EFFECT",
        store,
        env
      });
    }
    return {
      ok: false,
      isError: true,
      status: 500,
      errorCode: "PARTIAL_COMMIT_ARTIFACT_FAILED",
      externalEffectExecuted: true,
      approvalState: activeApprovalRecord ? "partial_effect_persistence_failed" : undefined,
      message: "Domain action executed, but R2 artifact persistence failed. Do NOT blindly replay non-idempotent write without checking external state."
    };
  }

  let handoffHandle = null;
  let artifactEnvelope = null;
  const canPersistArtifact = mode === "demo"
    ? checkCapability(callerIdentity, "demo:artifact:write")
    : checkCapability(callerIdentity, "artifact:write");

  if (canPersistArtifact) {
    const artRes = await createArtifactEnvelope({
      identity: callerIdentity,
      sourceApp: toolMeta.appSlug,
      sourceTool: toolName,
      rawPayload: domainOutput,
      parentEnvelope: upstreamEnvelope,
      env,
      store,
      customTtlMs: args.__testCustomTtlMs ?? null
    });
    if (!artRes.ok) {
      if (activeApprovalRecord) {
        await finalizeAtomicApprovalExecution({
          approvalId: activeApprovalRecord.approvalId,
          finalState: "partial_effect_persistence_failed",
          failureReason: artRes.code,
          store,
          env
        });
      }
      return { ok: false, isError: true, status: artRes.status, errorCode: artRes.code, message: artRes.error };
    }
    handoffHandle = artRes.handoffHandle;
    artifactEnvelope = artRes.envelope;
  }

  const structuredContent = {
    ...domainOutput,
    tool: toolName,
    appSlug: toolMeta.appSlug,
    workspaceUrl: `https://${toolMeta.sub}.worksai.org/?workspace=${encodeURIComponent(callerIdentity.workspaceId)}`,
    handoffHandle,
    artifactId: artifactEnvelope ? artifactEnvelope.artifactId : null,
    artifactByteSize: artifactEnvelope ? artifactEnvelope.byteSize : 0,
    artifactSha256: artifactEnvelope ? artifactEnvelope.sha256Digest : null,
    parentArtifactIds: artifactEnvelope ? artifactEnvelope.parentArtifactIds : [],
    chainDepth: artifactEnvelope ? artifactEnvelope.chainDepth : 1,
    traceId: artifactEnvelope ? artifactEnvelope.traceId : `wai-tr-${Date.now().toString(36)}`,
    tenantScope: callerIdentity.tenantId,
    workspaceScope: callerIdentity.workspaceId,
    environmentMode: mode,
    approvalVerified: Boolean(activeApprovalRecord),
    approvalId: activeApprovalRecord ? activeApprovalRecord.approvalId : null,
    approvalState: activeApprovalRecord ? "completed" : undefined,
    idempotentReplay: false
  };

  if (activeApprovalRecord) {
    await finalizeAtomicApprovalExecution({
      approvalId: activeApprovalRecord.approvalId,
      finalState: "completed",
      completedResult: structuredContent,
      store,
      env
    });
  }

  store.recordTelemetry({
    event: "tool_executed",
    toolName,
    trafficClass,
    environmentMode: mode,
    isError: false
  });

  return { ok: true, isError: false, status: 200, structuredContent };
}

const ALLOWED_PLAN_ROOT_KEYS = new Set(["thought", "steps"]);
const ALLOWED_PLAN_STEP_KEYS = new Set(["tool", "input", "dryRun", "target"]);
const FORBIDDEN_MODEL_OVERRIDE_KEYS = new Set([
  "tenantId", "workspaceId", "userId", "role", "capabilities",
  "approvalToken", "approvalId", "confirmWrite", "approved", "bypassApproval"
]);

export function validateAndSanitizeModelPlan(rawModelText, callerIdentity) {
  if (typeof rawModelText !== "string" || !rawModelText.trim()) {
    return { ok: false, code: "EMPTY_MODEL_RESPONSE", error: "Model returned empty planning output." };
  }

  let jsonCandidate = rawModelText.trim();
  const fenceMatch = jsonCandidate.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) jsonCandidate = fenceMatch[1].trim();
  else {
    const firstBrace = jsonCandidate.indexOf("{");
    const lastBrace = jsonCandidate.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      jsonCandidate = jsonCandidate.slice(firstBrace, lastBrace + 1);
    }
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonCandidate);
  } catch {
    return { ok: false, code: "MALFORMED_MODEL_JSON", error: "Workers AI response did not contain valid JSON plan." };
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, code: "INVALID_PLAN_ROOT", error: "Model plan root must be a JSON object." };
  }

  for (const k of Object.keys(parsed)) {
    if (FORBIDDEN_MODEL_OVERRIDE_KEYS.has(k)) {
      return { ok: false, code: "MODEL_SECURITY_OVERRIDE_REJECTED", error: `Model attempted forbidden root override '${k}'.` };
    }
    if (!ALLOWED_PLAN_ROOT_KEYS.has(k)) {
      return { ok: false, code: "UNEXPECTED_PLAN_FIELD_REJECTED", error: `Unexpected root field '${k}' in model plan.` };
    }
  }

  if (!Array.isArray(parsed.steps)) {
    return { ok: false, code: "MISSING_PLAN_STEPS", error: "Model plan must include a 'steps' array." };
  }

  const validatedSteps = [];

  for (const rawStep of parsed.steps.slice(0, MAX_AGENT_TURNS)) {
    if (!rawStep || typeof rawStep !== "object" || Array.isArray(rawStep)) {
      return { ok: false, code: "INVALID_STEP_OBJECT", error: "Each plan step must be an object." };
    }
    for (const sk of Object.keys(rawStep)) {
      if (FORBIDDEN_MODEL_OVERRIDE_KEYS.has(sk)) {
        return { ok: false, code: "MODEL_SECURITY_OVERRIDE_REJECTED", error: `Model attempted forbidden step override '${sk}'.` };
      }
      if (!ALLOWED_PLAN_STEP_KEYS.has(sk)) {
        return { ok: false, code: "UNEXPECTED_PLAN_FIELD_REJECTED", error: `Unexpected step field '${sk}' in model plan.` };
      }
    }

    const toolName = String(rawStep.tool || "").trim();
    const toolMeta = CORRECTED_MCP_TOOLS.find(t => t.name === toolName);
    if (!toolMeta) {
      return { ok: false, code: "UNKNOWN_TOOL_REJECTED", error: `Model selected unknown tool '${toolName}'.` };
    }

    const isDemo = callerIdentity.mode === "demo";
    const dryRunVal = typeof rawStep.dryRun === "boolean" ? rawStep.dryRun : (toolMeta.requiredScope !== "mcp:write");
    const isWriteStep = toolMeta.requiredScope === "mcp:write" && dryRunVal === false;

    if (isDemo && isWriteStep) {
      return { ok: false, code: "UNAUTHORIZED_TOOL_FOR_DEMO", error: `Model selected production write tool '${toolName}' in demo mode.` };
    }
    if (!isDemo && isWriteStep && !checkCapability(callerIdentity, "mcp:write")) {
      return { ok: false, code: "UNAUTHORIZED_TOOL_FOR_ROLE", error: `Role '${callerIdentity.role}' is not authorized for write tool '${toolName}'.` };
    }

    const stepInput = typeof rawStep.input === "string" && rawStep.input.trim()
      ? rawStep.input.trim()
      : "";
    if (!stepInput) {
      return { ok: false, code: "EMPTY_STEP_INPUT", error: `Model provided empty input for '${toolName}'.` };
    }

    validatedSteps.push({
      tool: toolName,
      input: stepInput,
      dryRun: dryRunVal,
      target: rawStep.target ? String(rawStep.target) : toolName
    });
  }

  return {
    ok: true,
    thought: typeof parsed.thought === "string" ? scrubSecretsDeep(parsed.thought).sanitized : "Planned tool workflow.",
    steps: validatedSteps
  };
}

export function buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope = null, callerIdentity = null) {
  const lower = userPrompt.toLowerCase();
  const isDemo = callerIdentity && callerIdentity.mode === "demo";
  const steps = [];

  if (lower.includes("secret") || lower.includes("scrub") || lower.includes("redact") || /sk-[a-z0-9_-]{20,}|akia[0-9a-z]{16}/i.test(userPrompt)) {
    steps.push({ tool: "clipguard.scrub_clipboard", input: userPrompt, dryRun: true, target: "clipguard.scrub_clipboard" });
    if (lower.includes("macro") || lower.includes("command")) {
      steps.push({ tool: "commandbar.resolve_workflow_macro", input: userPrompt, dryRun: true, target: "commandbar.resolve_workflow_macro" });
    }
  }
  if (lower.includes("architecture") || lower.includes("topology") || lower.includes("diagram") || lower.includes("-->") || lower.includes("->")) {
    steps.push({ tool: "canvasarch.parse_topology", input: userPrompt, dryRun: true, target: "canvasarch.parse_topology" });
  }
  if (lower.includes("graph") || lower.includes("adr") || lower.includes("wikilink") || lower.includes("[[") || (upstreamEnvelope && upstreamEnvelope.sourceApp === "worksai-canvasarch")) {
    steps.push({ tool: "graphmind.retrieve_context_subgraph", input: userPrompt, dryRun: true, target: "graphmind.retrieve_context_subgraph" });
  }
  if (lower.includes("openapi") || lower.includes("contract") || lower.includes("breaking") || lower.includes("diff")) {
    steps.push({ tool: "apisync.diff_openapi", input: userPrompt, dryRun: true, target: "apisync.diff_openapi" });
  }
  if (lower.includes("sku") || lower.includes("margin") || lower.includes("catalog")) {
    steps.push({ tool: "commercecatalog.audit_margin_floor", input: userPrompt, dryRun: true, target: "commercecatalog.audit_margin_floor" });
  }
  if (lower.includes("ticket") || lower.includes("sla") || lower.includes("saml") || lower.includes("omnidesk")) {
    steps.push({ tool: "omnidesk.triage_ticket", input: userPrompt, dryRun: true, target: "omnidesk.triage_ticket" });
  }
  if (lower.includes("shortlink") || lower.includes("utm") || lower.includes("publish link") || lower.includes("create link")) {
    const urlMatch = userPrompt.match(/https?:\/\/[^\s"'<>]+/i);
    const linkInput = urlMatch ? urlMatch[0] : "https://worksai.org/launch?utm_source=worksai&utm_campaign=q4_enterprise";
    steps.push({
      tool: "linkengine.create_shortlink",
      input: linkInput,
      dryRun: isDemo ? true : false,
      target: linkInput
    });
  }

  return {
    ok: true,
    thought: isDemo
      ? "Synthetic demo planner matched task intent to approved read/dry-run WorksAI tools."
      : "Structured WorksAI planner mapped task intent to verified MCP tools.",
    steps: steps.slice(0, MAX_AGENT_TURNS)
  };
}

export async function planWithWorkersAi({ userPrompt, upstreamEnvelope = null, callerIdentity, env, store }) {
  const mode = callerIdentity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, mode);

  const promptBytes = Buffer.byteLength(userPrompt, "utf-8");
  if (promptBytes > MAX_PROMPT_UTF8_BYTES) {
    return {
      ok: false,
      status: 413,
      code: "MODEL_PROMPT_TOO_LARGE",
      error: `Task prompt (${promptBytes} UTF-8 bytes) exceeds Workers AI input limit (${MAX_PROMPT_UTF8_BYTES} bytes).`
    };
  }

  if (mode === "demo" && !cfg.allowDemoLiveAi) {
    const fallback = buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope, callerIdentity);
    return {
      ...fallback,
      plannerMetadata: {
        plannerMode: "demo_synthetic_fixture",
        modelId: WORKERS_AI_MODEL_ID,
        liveGpuInvoked: false,
        latencyMs: 1,
        reason: "Live Workers AI inference is disabled by default on public /demo to protect Neuron quota."
      }
    };
  }

  if (env && env.AI && typeof env.AI.run === "function") {
    const aiRateKey = `${mode}:${callerIdentity.tenantId}`;
    const now = Date.now();
    const bucket = store.aiRateBuckets.get(aiRateKey) || { count: 0, resetAt: now + 60000 };
    if (now > bucket.resetAt) {
      bucket.count = 1;
      bucket.resetAt = now + 60000;
    } else {
      bucket.count += 1;
    }
    store.aiRateBuckets.set(aiRateKey, bucket);

    if (bucket.count > cfg.aiCallsPerMin) {
      return {
        ok: false,
        status: 429,
        code: "AI_INFERENCE_QUOTA_EXCEEDED",
        error: `Workers AI inference rate limit (${cfg.aiCallsPerMin} calls/min) exceeded for tenant '${callerIdentity.tenantId}'.`
      };
    }

    const scrubbedPrompt = scrubSecretsDeep(userPrompt).sanitized;
    const allowedToolNames = CORRECTED_MCP_TOOLS
      .filter(t => mode !== "demo" || t.requiredScope === "mcp:read")
      .map(t => `${t.name} (${t.requiredScope}): ${t.description}`)
      .slice(0, 16)
      .join("\n");

    const systemPrompt = [
      "You are the WorksAI Dots structured tool planner.",
      "Output ONLY a valid JSON object with exact keys: {\"thought\": string, \"steps\": [{\"tool\": string, \"input\": string, \"dryRun\": boolean}]}.",
      "Never include markdown prose outside JSON. Never invent tool names. Never include tenantId, userId, role, or approvalToken.",
      "Available tools:",
      allowedToolNames
    ].join("\n");

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Task: ${scrubbedPrompt}` }
    ];

    let attempt = 0;
    const t0 = Date.now();
    while (attempt <= MAX_INFERENCE_RETRIES) {
      attempt += 1;
      try {
        const aiPromise = env.AI.run(WORKERS_AI_MODEL_ID, {
          messages,
          max_tokens: MAX_INFERENCE_TOKENS,
          temperature: 0.1
        });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("WORKERS_AI_TIMEOUT")), INFERENCE_TIMEOUT_MS)
        );
        const rawAiRes = await Promise.race([aiPromise, timeoutPromise]);
        const latencyMs = Math.max(1, Date.now() - t0);
        const rawText = typeof rawAiRes === "string"
          ? rawAiRes
          : (rawAiRes && typeof rawAiRes.response === "string" ? rawAiRes.response : JSON.stringify(rawAiRes));

        const validated = validateAndSanitizeModelPlan(rawText, callerIdentity);
        if (!validated.ok) {
          if (env.STRICT_MODEL_PLAN_VALIDATION === "true") {
            return {
              ok: false,
              status: 422,
              code: validated.code,
              error: validated.error,
              plannerMetadata: {
                plannerMode: "workers_ai_rejected",
                modelId: WORKERS_AI_MODEL_ID,
                liveGpuInvoked: true,
                latencyMs,
                validationError: validated.code
              }
            };
          }
          const fallback = buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope, callerIdentity);
          return {
            ...fallback,
            plannerMetadata: {
              plannerMode: "workers_ai_with_schema_guard_fallback",
              modelId: WORKERS_AI_MODEL_ID,
              liveGpuInvoked: true,
              latencyMs,
              schemaGuardNote: validated.code
            }
          };
        }

        if (validated.steps.length === 0) {
          const fallback = buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope, callerIdentity);
          if (fallback.steps.length > 0) {
            return {
              ...fallback,
              thought: validated.thought || fallback.thought,
              plannerMetadata: {
                plannerMode: "workers_ai_augmented",
                modelId: WORKERS_AI_MODEL_ID,
                liveGpuInvoked: true,
                latencyMs
              }
            };
          }
        }

        return {
          ok: true,
          thought: validated.thought,
          steps: validated.steps,
          plannerMetadata: {
            plannerMode: "workers_ai_serverless_gpu",
            modelId: WORKERS_AI_MODEL_ID,
            catalogUuid: WORKERS_AI_CATALOG_UUID,
            liveGpuInvoked: true,
            latencyMs
          }
        };
      } catch (err) {
        if (attempt > MAX_INFERENCE_RETRIES) {
          const latencyMs = Math.max(1, Date.now() - t0);
          if (env.STRICT_MODEL_PLAN_VALIDATION === "true") {
            return {
              ok: false,
              status: 504,
              code: err.message === "WORKERS_AI_TIMEOUT" ? "WORKERS_AI_TIMEOUT" : "WORKERS_AI_INFERENCE_ERROR",
              error: `Workers AI invocation failed: ${err.message}`
            };
          }
          const fallback = buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope, callerIdentity);
          return {
            ...fallback,
            plannerMetadata: {
              plannerMode: "deterministic_fallback_after_ai_error",
              modelId: WORKERS_AI_MODEL_ID,
              liveGpuInvoked: false,
              latencyMs,
              fallbackReason: err.message
            }
          };
        }
      }
    }
  }

  const fallback = buildDeterministicFallbackPlan(userPrompt, upstreamEnvelope, callerIdentity);
  return {
    ...fallback,
    plannerMetadata: {
      plannerMode: "deterministic_local_planner",
      modelId: WORKERS_AI_MODEL_ID,
      liveGpuInvoked: false,
      latencyMs: 1
    }
  };
}

async function loadConversation(conversationId, identity, env, store) {
  const mode = identity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, mode);
  const r2Key = `${cfg.r2Prefix}conversations/${identity.tenantId}/${identity.workspaceId}/${conversationId}.json`;

  const r2Obj = await store.r2Get(r2Key, env);
  if (r2Obj) {
    try {
      return JSON.parse(r2Obj.text);
    } catch {
      // ignore corrupt
    }
  }
  if (store.conversations.has(conversationId)) {
    return store.conversations.get(conversationId);
  }
  return null;
}

async function saveConversation(conv, identity, env, store) {
  const mode = identity.mode === "demo" ? "demo" : "production";
  const cfg = validateRuntimeConfig(env, mode);
  const r2Key = `${cfg.r2Prefix}conversations/${identity.tenantId}/${identity.workspaceId}/${conv.id}.json`;
  store.conversations.set(conv.id, conv);
  await store.r2Put(r2Key, JSON.stringify(conv), env);
}

export async function executeAgentTask({
  conversationId,
  userPrompt,
  identity,
  handoffFrom = null,
  approvalToken = null,
  approvalId = null,
  env,
  store
}) {
  if (!checkCapability(identity, "agent:execute")) {
    return { ok: false, status: 403, code: "INSUFFICIENT_SCOPE", error: "Role cannot execute agent tasks." };
  }

  const pi = inspectForPromptInjection(userPrompt);
  if (pi.detected && !/clipguard|scrub/i.test(userPrompt)) {
    store.recordTelemetry({ event: "agent_prompt_injection_blocked", trafficClass: "live_user", environmentMode: identity.mode, isError: true });
    return {
      ok: false,
      status: 400,
      code: "PROMPT_INJECTION_BLOCKED",
      matchedPatterns: pi.matchedPatterns,
      error: `Security Refusal (PROMPT_INJECTION_BLOCKED): Embedded instruction-override pattern (${pi.matchedPatterns.join(", ")}) blocked before Workers AI planning.`
    };
  }

  let conv = await loadConversation(conversationId, identity, env, store);
  if (conv && conv.tenantId !== identity.tenantId) {
    return { ok: false, status: 403, code: "CROSS_TENANT_CONVERSATION_FORBIDDEN", error: "Cannot access another tenant's conversation." };
  }
  if (!conv) {
    conv = {
      id: conversationId,
      tenantId: identity.tenantId,
      workspaceId: identity.workspaceId,
      userId: identity.userId,
      environmentMode: identity.mode,
      createdAt: new Date().toISOString(),
      turns: [],
      pendingApproval: null,
      artifacts: []
    };
  }

  const scrubbedUserPrompt = scrubSecretsDeep(userPrompt).sanitized;
  conv.turns.push({
    role: "user",
    content: scrubbedUserPrompt,
    timestamp: new Date().toISOString()
  });

  let currentHandoffHandle = handoffFrom;
  let upstreamEnv = null;
  if (currentHandoffHandle) {
    const r = await resolveArtifactHandoff({ handoffFrom: currentHandoffHandle, callerIdentity: identity, env, store });
    if (!r.ok) {
      return { ok: false, status: r.status, code: r.code, error: r.error };
    }
    upstreamEnv = r.envelope;
  }

  let stepsToExecute = [];
  let plannerMetadata = null;
  let plannerThought = "";

  if ((approvalToken || approvalId) && conv.pendingApproval) {
    stepsToExecute = [{
      tool: conv.pendingApproval.tool,
      input: conv.pendingApproval.arguments.input,
      dryRun: false,
      target: conv.pendingApproval.target
    }];
    currentHandoffHandle = conv.pendingApproval.handoffFrom || currentHandoffHandle;
    plannerThought = `Resuming consequential action '${conv.pendingApproval.tool}' with verified human approval.`;
    plannerMetadata = {
      plannerMode: "approval_resume",
      modelId: WORKERS_AI_MODEL_ID,
      liveGpuInvoked: false,
      latencyMs: 1
    };
  } else {
    const planRes = await planWithWorkersAi({
      userPrompt,
      upstreamEnvelope: upstreamEnv,
      callerIdentity: identity,
      env,
      store
    });
    if (!planRes.ok) {
      return {
        ok: false,
        status: planRes.status || 422,
        code: planRes.code,
        error: planRes.error,
        plannerMetadata: planRes.plannerMetadata
      };
    }
    stepsToExecute = planRes.steps;
    plannerThought = planRes.thought;
    plannerMetadata = planRes.plannerMetadata;
  }

  if (stepsToExecute.length === 0) {
    const reply = `I evaluated your request ("${scrubbedUserPrompt.slice(0, 90)}"). No external tool execution was required. You can select an example workflow or specify an architecture, ADR graph, OpenAPI diff, SKU margin audit, or shortlink task.`;
    conv.turns.push({
      role: "assistant",
      content: reply,
      thought: plannerThought,
      plannerMetadata,
      turnCount: 1,
      maxTurns: MAX_AGENT_TURNS,
      timestamp: new Date().toISOString()
    });
    await saveConversation(conv, identity, env, store);
    return {
      ok: true,
      conversationId,
      status: "completed",
      turnCount: 1,
      maxTurns: MAX_AGENT_TURNS,
      plannerMetadata,
      turns: conv.turns,
      pendingApproval: null
    };
  }

  const toolResults = [];
  let executionHaltedForApproval = false;
  let activeTurnCount = 0;

  for (let i = 0; i < Math.min(stepsToExecute.length, MAX_AGENT_TURNS); i++) {
    activeTurnCount = i + 1;
    const step = stepsToExecute[i];
    const toolMeta = CORRECTED_MCP_TOOLS.find(t => t.name === step.tool);
    const isConsequentialWrite = toolMeta && toolMeta.requiredScope === "mcp:write" && step.dryRun === false;

    if (isConsequentialWrite && !approvalToken && !approvalId) {
      if (!store.supportsAtomicCas || (env && env.DISABLE_ATOMIC_APPROVAL_CAS === "true")) {
        return {
          ok: false,
          status: 503,
          code: "ATOMIC_APPROVAL_STORE_REQUIRED",
          error: "Consequential write blocked: atomic approval coordination store is required."
        };
      }

      const cleanArgs = cleanArgsForApprovalHash({ input: step.input, dryRun: false, handoffFrom: currentHandoffHandle });
      const argsSha256 = sha256Hex(canonicalizeJson(cleanArgs));

      conv.pendingApproval = {
        pendingId: "pend_" + crypto.randomBytes(8).toString("hex"),
        tool: step.tool,
        appSlug: toolMeta.appSlug,
        target: step.target || step.input,
        arguments: { input: step.input, dryRun: false, handoffFrom: currentHandoffHandle },
        argsSha256,
        handoffFrom: currentHandoffHandle,
        whatWillChange: step.tool === "linkengine.create_shortlink"
          ? `Creates and persists a governed production shortlink on linkengine.worksai.org pointing to ${step.target || step.input}.`
          : `Publishes structured Schema.org FAQ JSON-LD from ${step.tool} to workspace storage.`,
        state: "pending_approval",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        prompt: `Consequential action '${step.tool}' paused awaiting explicit human approval.`
      };
      executionHaltedForApproval = true;
      conv.turns.push({
        role: "assistant",
        content: conv.pendingApproval.prompt,
        thought: plannerThought,
        plannerMetadata,
        requiresApproval: true,
        pendingTool: step.tool,
        pendingApproval: conv.pendingApproval,
        toolResults,
        turnCount: activeTurnCount,
        maxTurns: MAX_AGENT_TURNS,
        timestamp: new Date().toISOString()
      });
      break;
    }

    const execRes = await evaluateAndExecuteToolCall({
      callerIdentity: identity,
      toolName: step.tool,
      args: {
        input: step.input,
        dryRun: step.dryRun,
        target: step.target || step.tool,
        handoffFrom: currentHandoffHandle,
        approvalToken: approvalToken || undefined,
        approvalId: approvalId || undefined
      },
      env,
      store
    });

    if (!execRes.ok) {
      return {
        ok: false,
        status: execRes.status || 400,
        code: execRes.errorCode || "TOOL_EXECUTION_FAILED",
        error: execRes.message,
        plannerMetadata
      };
    }

    const sc = execRes.structuredContent;
    const stepRecord = {
      turnNumber: activeTurnCount,
      tool: step.tool,
      appSlug: sc.appSlug,
      output: sc,
      handoffHandle: sc.handoffHandle,
      artifactId: sc.artifactId,
      artifactSha256: sc.artifactSha256,
      artifactByteSize: sc.artifactByteSize,
      parentArtifactIds: sc.parentArtifactIds,
      chainDepth: sc.chainDepth,
      traceId: sc.traceId,
      approvalVerified: sc.approvalVerified,
      approvalId: sc.approvalId,
      approvalState: sc.approvalState
    };

    toolResults.push(stepRecord);
    if (sc.handoffHandle) {
      currentHandoffHandle = sc.handoffHandle;
      conv.artifacts.push({
        artifactId: sc.artifactId,
        handoffHandle: sc.handoffHandle,
        sourceTool: step.tool,
        sourceApp: sc.appSlug,
        traceId: sc.traceId,
        byteSize: sc.artifactByteSize,
        sha256Digest: sc.artifactSha256,
        chainDepth: sc.chainDepth,
        parentArtifactIds: sc.parentArtifactIds,
        createdAt: new Date().toISOString()
      });
    }
  }

  if (!executionHaltedForApproval) {
    conv.pendingApproval = null;
    const lastStep = toolResults[toolResults.length - 1];
    const finalReply = `Completed ${toolResults.length} scoped tool step(s) (${toolResults.map(r => r.tool).join(" -> ")}). Latest artifact: ${lastStep ? lastStep.artifactId : "none"} (trace: ${lastStep ? lastStep.traceId : "n/a"}).`;
    conv.turns.push({
      role: "assistant",
      content: finalReply,
      thought: plannerThought,
      plannerMetadata,
      toolResults,
      turnCount: activeTurnCount,
      maxTurns: MAX_AGENT_TURNS,
      timestamp: new Date().toISOString()
    });
  }

  await saveConversation(conv, identity, env, store);
  return {
    ok: true,
    conversationId,
    status: executionHaltedForApproval ? "paused_awaiting_approval" : "completed",
    turnCount: activeTurnCount,
    maxTurns: MAX_AGENT_TURNS,
    plannerMetadata,
    turns: conv.turns,
    toolResults,
    pendingApproval: conv.pendingApproval,
    artifacts: conv.artifacts
  };
}

// ============================================================================
// WORKSAI DOTS GRAPHICAL REDESIGN (v2.3.0) — ALL 5 INTERFACE AREAS (A–E)
// ============================================================================
export function renderWorksAiDotsHtml({
  isDemo = false,
  identity = null,
  host = "it.worksai.org",
  prodCookieStrippedOnDemo = false
}) {
  const pageTitle = isDemo
    ? `WorksAI Dots — Synthetic Demo Sandbox (${host}/demo)`
    : `WorksAI Dots — AI Agent & MCP Workspace (${host})`;
  const subhead = "Connect approved tools, run scoped AI workflows, and review consequential actions in one WorksAI workspace.";
  const ga4Id = "G-113353C400";

  const toolItemsJson = JSON.stringify(
    CORRECTED_MCP_TOOLS.map(t => ({
      name: t.name,
      sub: t.sub,
      appSlug: t.appSlug,
      requiredScope: t.requiredScope,
      description: t.description,
      readOnlyHint: t.annotations.readOnlyHint
    }))
  );

  return `<!DOCTYPE html>
<html lang="en" data-theme="obsidian-dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtmlSafe(pageTitle)}</title>
  <meta name="description" content="${escapeHtmlSafe(subhead)}" />
  <script>
    window.dataLayer = window.dataLayer || [];
    window.__ga4SentPayloads = [];
    function gtag(){
      const args = Array.from(arguments);
      window.dataLayer.push(args);
      window.__ga4SentPayloads.push(JSON.parse(JSON.stringify(args)));
    }
    gtag("js", new Date());
    gtag("config", "${ga4Id}", {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: window.location.origin + window.location.pathname,
      traffic_type: "${isDemo ? "demo_sandbox" : "workspace_app"}"
    });
  </script>
  <style>
    :root {
      --wai-bg-canvas: #090d14;
      --wai-bg-elevated: #111724;
      --wai-bg-panel: #151d2e;
      --wai-surface-glass: rgba(17, 23, 36, 0.88);
      --wai-border-subtle: rgba(255, 255, 255, 0.12);
      --wai-border-titanium: rgba(203, 213, 225, 0.22);
      --wai-border-gloss: rgba(0, 240, 255, 0.38);
      --wai-text-primary: #f5f7fa;
      --wai-text-secondary: #b4bfd0;
      --wai-text-muted: #8b9bb4;
      --wai-accent-cyan: #00f0ff;
      --wai-accent-blue: #38bdf8;
      --wai-accent-lime: #c6ff34;
      --wai-status-pass: #10b981;
      --wai-status-warn: #f59e0b;
      --wai-status-err: #ef4444;
      --wai-font-sans: "Readex Pro", Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      --wai-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    }
    * { box-sizing: border-box; }
    html, body {
      max-width: 100%;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at 15% 0%, rgba(0, 240, 255, 0.07), transparent 40%), var(--wai-bg-canvas);
      color: var(--wai-text-primary);
      font-family: var(--wai-font-sans);
      line-height: 1.5;
      font-size: 14px;
    }
    code, pre, .mono { font-family: var(--wai-font-mono); overflow-wrap: anywhere; }
    .nav-item span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
    .nav-item span:last-child, .badge { white-space: nowrap; flex-shrink: 0; }
    .skip-link {
      position: absolute;
      top: -90px;
      left: 16px;
      background: var(--wai-accent-cyan);
      color: #05080f;
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 700;
      z-index: 200;
      text-decoration: none;
    }
    .skip-link:focus { top: 12px; }
    a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
      outline: 2px solid var(--wai-accent-cyan);
      outline-offset: 2px;
    }
    .demo-banner {
      background: linear-gradient(90deg, rgba(245, 158, 11, 0.18), rgba(0, 240, 255, 0.12));
      border-bottom: 1px solid rgba(245, 158, 11, 0.45);
      padding: 8px 18px;
      font-size: 12.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
    }
    .demo-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(245, 158, 11, 0.22);
      border: 1px solid #f59e0b;
      color: #fde68a;
      font-weight: 700;
      font-size: 11px;
      padding: 2px 9px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .topbar {
      background: var(--wai-surface-glass);
      border-bottom: 1px solid var(--wai-border-subtle);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .brand-cluster {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-monogram {
      width: 40px;
      height: 40px;
      border-radius: 11px;
      background: linear-gradient(145deg, #161f33, #090d14);
      border: 1px solid var(--wai-border-gloss);
      box-shadow: 0 0 18px rgba(0, 240, 255, 0.16);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .brand-title {
      margin: 0;
      font-size: 1.18rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .brand-sub {
      margin: 2px 0 0;
      font-size: 12.5px;
      color: var(--wai-text-secondary);
    }
    .topbar-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 600;
      border: 1px solid var(--wai-border-gloss);
      color: var(--wai-accent-cyan);
      background: rgba(0, 240, 255, 0.08);
    }
    .badge-gpu {
      border-color: rgba(198, 255, 52, 0.4);
      color: var(--wai-accent-lime);
      background: rgba(198, 255, 52, 0.08);
    }
    .workspace-grid {
      max-width: 1440px;
      margin: 0 auto;
      padding: 16px;
      display: grid;
      grid-template-columns: 280px minmax(0, 1fr) 340px;
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 1100px) {
      .workspace-grid {
        grid-template-columns: 1fr;
        padding: 10px;
      }
    }
    .panel {
      background: var(--wai-bg-elevated);
      border: 1px solid var(--wai-border-subtle);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
    }
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--wai-border-subtle);
    }
    .panel-title {
      margin: 0;
      font-size: 13.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--wai-text-secondary);
    }
    .nav-section { margin-bottom: 14px; }
    .nav-section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--wai-text-muted);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-item {
      width: 100%;
      text-align: left;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--wai-border-subtle);
      color: var(--wai-text-primary);
      padding: 8px 10px;
      border-radius: 10px;
      font-size: 12.5px;
      margin-bottom: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .nav-item:hover, .nav-item.active {
      background: rgba(0, 240, 255, 0.1);
      border-color: var(--wai-border-gloss);
    }
    .tool-list-scroll { max-height: 190px; overflow-y: auto; padding-right: 4px; }
    button, .btn {
      background: linear-gradient(135deg, #0284c7, #2563eb);
      color: #ffffff;
      border: 1px solid var(--wai-border-gloss);
      border-radius: 10px;
      padding: 8px 14px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
      transition: filter 0.15s ease;
    }
    button:hover { filter: brightness(1.12); }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      border-color: var(--wai-border-titanium);
      color: var(--wai-text-primary);
    }
    .btn-approve {
      background: linear-gradient(135deg, #059669, #10b981);
      border-color: rgba(16, 185, 129, 0.6);
    }
    .btn-deny {
      background: rgba(239, 68, 68, 0.18);
      border-color: rgba(239, 68, 68, 0.55);
      color: #fca5a5;
    }
    input, textarea, select {
      width: 100%;
      background: #060a10;
      color: var(--wai-text-primary);
      border: 1px solid var(--wai-border-titanium);
      border-radius: 10px;
      padding: 9px 12px;
      font-family: inherit;
      font-size: 13.5px;
    }
    .lifecycle-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      background: var(--wai-bg-panel);
      border: 1px solid var(--wai-border-subtle);
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 12px;
    }
    .state-steps { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .state-pill {
      font-size: 11.5px;
      padding: 3px 9px;
      border-radius: 999px;
      border: 1px solid var(--wai-border-subtle);
      color: var(--wai-text-muted);
      background: rgba(255, 255, 255, 0.02);
    }
    .state-pill.active {
      border-color: var(--wai-accent-cyan);
      color: var(--wai-accent-cyan);
      background: rgba(0, 240, 255, 0.12);
      font-weight: 700;
    }
    .state-pill.waiting {
      border-color: #f59e0b;
      color: #fde68a;
      background: rgba(245, 158, 11, 0.16);
      font-weight: 700;
    }
    .state-pill.completed {
      border-color: #10b981;
      color: #6ee7b7;
      background: rgba(16, 185, 129, 0.14);
      font-weight: 700;
    }
    .turn-meter {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--wai-text-secondary);
    }
    .turn-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid var(--wai-border-subtle);
    }
    .turn-dot.filled {
      background: var(--wai-accent-cyan);
      box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
    }
    .chip-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
    .task-chip {
      background: rgba(0, 240, 255, 0.06);
      border: 1px solid rgba(0, 240, 255, 0.26);
      color: var(--wai-text-primary);
      font-size: 12px;
      padding: 6px 11px;
      border-radius: 999px;
      cursor: pointer;
    }
    .task-chip:hover { background: rgba(0, 240, 255, 0.15); }
    .conversation-stream {
      min-height: 170px;
      max-height: 280px;
      overflow-y: auto;
      padding: 12px;
      background: #070b12;
      border: 1px solid var(--wai-border-subtle);
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .chat-bubble { padding: 12px 14px; border-radius: 12px; margin-bottom: 10px; font-size: 13.5px; }
    .chat-user { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.32); }
    .chat-assistant { background: rgba(255, 255, 255, 0.04); border: 1px solid var(--wai-border-subtle); }
    .step-result-card {
      margin-top: 8px;
      padding: 10px;
      border-radius: 10px;
      background: rgba(0, 240, 255, 0.05);
      border: 1px solid rgba(0, 240, 255, 0.22);
      font-size: 12px;
    }
    .approval-card {
      background: linear-gradient(145deg, rgba(245, 158, 11, 0.12), rgba(17, 23, 36, 0.95));
      border: 1px solid rgba(245, 158, 11, 0.55);
      border-radius: 14px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .approval-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; font-size: 12px; }
    @media (max-width: 640px) { .approval-grid { grid-template-columns: 1fr; } }
    .kv-box { background: rgba(0, 0, 0, 0.32); border: 1px solid var(--wai-border-subtle); border-radius: 8px; padding: 8px 10px; }
    .kv-label { font-size: 10.5px; text-transform: uppercase; color: var(--wai-text-muted); font-weight: 700; display: block; margin-bottom: 2px; }
    .kv-val { font-size: 12px; color: var(--wai-text-primary); word-break: break-all; }
  </style>
</head>
<body>
  <a href="#main-task-workspace" class="skip-link">Skip to main task workspace</a>

  ${isDemo ? `
  <div class="demo-banner" role="region" aria-label="Synthetic Demo Sandbox Notice">
    <div>
      <span class="demo-pill" id="demoSyntheticBadge">Synthetic demo</span>
      <strong style="margin-left:6px;">Public Sandbox Mode (/demo):</strong>
      <span>Deterministic Workers AI planning preview &amp; real sandbox-scoped read/dry-run execution. Consequential production writes are disabled (<code>DEMO_WRITE_FORBIDDEN</code>).</span>
    </div>
    <div style="font-size:11.5px;color:#fde68a;">
      <strong>Retention:</strong> 1-hour session &amp; <code>demo/</code> artifact TTL (32 KiB limit, max depth 3) · Zero production connectors
    </div>
  </div>
  ` : ""}

  ${prodCookieStrippedOnDemo ? `
  <div style="background:rgba(16,185,129,0.14);border-bottom:1px solid #10b981;padding:6px 18px;font-size:12px;color:#a7f3d0;">
    Security Isolation Notice: Your production cookie was ignored on <code>/demo</code>; this page runs strictly inside an isolated demo visitor context.
  </div>
  ` : ""}

  <header class="topbar">
    <div class="brand-cluster">
      <div class="brand-monogram" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waiMetal" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#f8fafc" />
              <stop offset="55%" stop-color="#94a3b8" />
              <stop offset="100%" stop-color="#00f0ff" />
            </linearGradient>
          </defs>
          <path d="M4 8L9 24L14 12L19 24L24 8" stroke="url(#waiMetal)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M27 8V24" stroke="#00f0ff" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="27" cy="4.5" r="2" fill="#c6ff34"/>
        </svg>
      </div>
      <div>
        <h1 class="brand-title">
          WorksAI Dots
          <span class="badge">${isDemo ? "Synthetic demo (/demo)" : "Production Workspace"}</span>
          <span class="badge badge-gpu" title="Cloudflare Workers AI Serverless GPU Binding">Workers AI · llama-3.1-8b-instruct-fp8</span>
        </h1>
        <p class="brand-sub">${escapeHtmlSafe(subhead)}</p>
      </div>
    </div>

    <div class="topbar-meta">
      <span id="identityBadge" class="badge mono">${escapeHtmlSafe(identity ? `${identity.mode}:${identity.tenantId} (${identity.role})` : (isDemo ? "demo:demo-sandbox (demo_visitor)" : "prod:t-worksai (owner)"))}</span>
      <a href="${isDemo ? "/" : "/demo"}" class="btn btn-secondary" style="text-decoration:none;padding:6px 11px;font-size:12px;">
        ${isDemo ? "Switch to Production Workspace (/)" : "Open Safe Public Demo (/demo)"}
      </a>
    </div>
  </header>

  <div class="workspace-grid">
    <!-- AREA A: WORKSPACE NAVIGATION -->
    <aside class="panel" aria-label="Workspace Navigation">
      <div class="panel-header">
        <h2 class="panel-title">A · Workspace Navigation</h2>
        <button type="button" class="btn-secondary" style="padding:4px 9px;font-size:11.5px;" onclick="window.DOTS.newConversation()">+ New Task</button>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">
          <span>Conversation / Task History</span>
          <span id="convCountBadge" class="mono">1</span>
        </div>
        <div id="conversationHistoryList">
          <button type="button" class="nav-item active" onclick="window.DOTS.selectConversation('conv_active')">
            <span>Active Session Task</span>
            <span style="color:var(--wai-accent-cyan);font-size:11px;">Live</span>
          </button>
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">
          <span>Verified Multi-App Workflows</span>
          <span>4</span>
        </div>
        <button type="button" class="nav-item" onclick="window.DOTS.loadPresetWorkflow('arch_graph_openapi')">
          <span>1. Architecture → Graph → OpenAPI</span>
          <span class="mono" style="font-size:10.5px;color:#6ee7b7;">3-App</span>
        </button>
        <button type="button" class="nav-item" onclick="window.DOTS.loadPresetWorkflow('sku_shortlink_write')">
          <span>2. SKU Margin → Governed Shortlink</span>
          <span class="mono" style="font-size:10.5px;color:#fcd34d;">Approval</span>
        </button>
        <button type="button" class="nav-item" onclick="window.DOTS.loadPresetWorkflow('secret_scrub_macro')">
          <span>3. Secret Scrub → CLI Macro</span>
          <span class="mono" style="font-size:10.5px;color:var(--wai-accent-cyan);">Redaction</span>
        </button>
        <button type="button" class="nav-item" onclick="window.DOTS.loadPresetWorkflow('ticket_sla_triage')">
          <span>4. P1 SAML Ticket SLA Triage</span>
          <span class="mono" style="font-size:10.5px;color:#93c5fd;">KB-101</span>
        </button>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">
          <span>Available MCP Tools &amp; Apps</span>
          <span class="mono">36 Tools</span>
        </div>
        <label for="toolFilterInput" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Filter MCP tools</label>
        <input id="toolFilterInput" type="search" placeholder="Filter 36 tools (e.g. canvasarch, linkengine)..." oninput="window.DOTS.filterTools(this.value)" style="margin-bottom:8px;padding:6px 10px;font-size:12px;" />
        <div id="mcpToolsCatalogList" class="tool-list-scroll" role="list">
          ${CORRECTED_MCP_TOOLS.map(t => `
            <button type="button" class="nav-item tool-catalog-btn" data-tool-name="${escapeHtmlSafe(t.name)}" onclick="window.DOTS.inspectTool('${escapeHtmlSafe(t.name)}')">
              <span class="mono" style="font-size:11.5px;">${escapeHtmlSafe(t.name)}</span>
              <span style="font-size:10px;padding:1px 6px;border-radius:6px;background:${t.requiredScope === "mcp:write" ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.16)"};color:${t.requiredScope === "mcp:write" ? "#fcd34d" : "#6ee7b7"};">${escapeHtmlSafe(t.requiredScope)}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">
          <span>Artifact History (wai.artifact.v1)</span>
          <span id="artifactCountBadge" class="mono">0</span>
        </div>
        <div id="artifactHistoryList" style="font-size:12px;color:var(--wai-text-muted);">
          No artifacts created in this session yet. Run a task to mint a signed R2 handoff envelope.
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">
          <span>Pending Approvals</span>
          <span id="pendingApprovalNavBadge" class="mono" style="color:#fcd34d;">0</span>
        </div>
        <div id="pendingApprovalNavSummary" style="font-size:12px;color:var(--wai-text-muted);">
          Zero consequential writes awaiting review.
        </div>
      </div>

      <details style="margin-top:10px;font-size:12px;color:var(--wai-text-secondary);background:rgba(0,0,0,0.25);padding:10px;border-radius:10px;border:1px solid var(--wai-border-subtle);">
        <summary style="cursor:pointer;font-weight:700;color:var(--wai-text-primary);">Settings, Quotas &amp; Architecture Help</summary>
        <ul style="margin:8px 0 0;padding-left:16px;line-height:1.45;">
          <li><strong>Workers AI Binding:</strong> <code>@cf/meta/llama-3.1-8b-instruct-fp8</code> runs on Cloudflare's serverless GPU infrastructure (max 4 KiB prompt, 300 output tokens, 8s timeout).</li>
          <li><strong>Durable Storage:</strong> R2 bucket <code>worksai-datalake</code> with conditional ETag CAS.</li>
          <li><strong>Hosted Scope Note:</strong> Desktop-only upstream <code>open-dot</code> features (Electron shell, macOS Keychain, local desktop socket) are intentionally excluded from this hosted Cloudflare Worker.</li>
        </ul>
      </details>
    </aside>

    <!-- AREA B: MAIN TASK WORKSPACE -->
    <main id="main-task-workspace" class="panel" aria-label="Main Task Workspace">
      <div class="panel-header">
        <h2 class="panel-title">B · Main Task Workspace &amp; Bounded Agent Loop</h2>
        <div style="display:flex;gap:6px;">
          <button type="button" id="cancelTaskBtn" class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="window.DOTS.cancelActiveTask()">Cancel</button>
          <button type="button" id="retryTaskBtn" class="btn-secondary" style="padding:4px 10px;font-size:11.5px;" onclick="window.DOTS.retryLastTask()">Retry Last</button>
        </div>
      </div>

      <div class="lifecycle-bar" aria-live="polite">
        <div class="state-steps" id="lifecyclePills">
          <span class="state-pill active" id="statePillIdle">1. Ready</span>
          <span class="state-pill" id="statePillPlanning">2. Planning (Workers AI)</span>
          <span class="state-pill" id="statePillExecuting">3. Executing Tools</span>
          <span class="state-pill" id="statePillWaiting">4. Waiting for Approval</span>
          <span class="state-pill" id="statePillCompleted">5. Completed</span>
        </div>
        <div class="turn-meter" title="Bounded Agent Execution Loop (Max 5 Turns)">
          <span id="turnCountLabel">Turn 0 / 5</span>
          <span class="turn-dot" id="turnDot1"></span>
          <span class="turn-dot" id="turnDot2"></span>
          <span class="turn-dot" id="turnDot3"></span>
          <span class="turn-dot" id="turnDot4"></span>
          <span class="turn-dot" id="turnDot5"></span>
        </div>
      </div>

      ${isDemo ? `
      <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.35);border-radius:12px;padding:12px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <strong style="font-size:13px;color:#fde68a;">Area E · Guided Synthetic Demo Walkthroughs</strong>
          <span class="demo-pill">1h Sandbox TTL · No Production Data</span>
        </div>
        <p style="margin:0 0 8px;font-size:12px;color:var(--wai-text-secondary);">
          Test multi-app <code>wai.artifact.v1</code> handoffs and automatic secret redaction using synthetic fixtures:
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" id="demoGuidedHandoffBtn" class="btn-secondary" style="font-size:12px;border-color:#f59e0b;color:#fde68a;" onclick="window.DOTS.runGuidedDemoHandoff()">
            ▶ Run Guided 3-App Handoff (CanvasArch → GraphMind → APISync)
          </button>
          <button type="button" id="demoGuidedRedactionBtn" class="btn-secondary" style="font-size:12px;border-color:var(--wai-accent-cyan);color:var(--wai-accent-cyan);" onclick="window.DOTS.runGuidedDemoRedaction()">
            🛡 Run Synthetic Secret-Redaction Example (ClipGuard → CommandBar)
          </button>
        </div>
      </div>
      ` : ""}

      <div class="chip-row" aria-label="Example Tasks">
        <button type="button" class="task-chip" onclick="window.DOTS.fillExampleTask('Parse architecture topology Edge CDN -> API Gateway -> Auth Service; API Gateway -> Billing DB and retrieve ADR graph context [[API Gateway]] [[ADR-014]] and diff OpenAPI REMOVED DELETE /v1/legacy-auth')">
          ⚡ Architecture → ADR Graph → OpenAPI Diff
        </button>
        <button type="button" class="task-chip" onclick="window.DOTS.fillExampleTask('Audit SKU margin SKU-ENT-01 cost:25 price:95 and create shortlink https://worksai.org/launch?utm_source=worksai&utm_campaign=q4_enterprise')">
          🔒 SKU Audit → Governed Shortlink (Requires Approval)
        </button>
        <button type="button" class="task-chip" onclick="window.DOTS.fillExampleTask('Scrub secret keys sk-proj-SyntheticTestKey99887766554433221100 and AKIAIOSFODNN7EXAMPLE and compile workflow macro')">
          🧹 Scrub Synthetic Secrets → Compile Macro
        </button>
      </div>

      <!-- AREA D: CONSEQUENTIAL-ACTION APPROVAL CARD -->
      <section id="approvalCardContainer" class="approval-card" style="display:none;" aria-label="Consequential Action Approval Card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="demo-pill" id="approvalStateBadge">Pending Human Approval</span>
            <strong style="font-size:13.5px;">D · Consequential-Action Review</strong>
          </div>
          <span class="mono" style="font-size:11px;color:var(--wai-text-muted);" id="approvalExpiryText">Expires in 15m · Single-Use CAS</span>
        </div>

        <div class="approval-grid">
          <div class="kv-box">
            <span class="kv-label">Proposed Action &amp; Tool</span>
            <span class="kv-val mono" id="approvalToolName">linkengine.create_shortlink</span>
          </div>
          <div class="kv-box">
            <span class="kv-label">Target Resource</span>
            <span class="kv-val mono" id="approvalTargetVal">https://worksai.org/launch</span>
          </div>
          <div class="kv-box">
            <span class="kv-label">Human-Readable Argument Summary</span>
            <span class="kv-val" id="approvalArgsSummary">dryRun: false</span>
          </div>
          <div class="kv-box">
            <span class="kv-label">Canonical Argument SHA-256 Digest</span>
            <span class="kv-val mono" id="approvalArgsHash">—</span>
          </div>
        </div>

        <div class="kv-box" style="margin-bottom:10px;">
          <span class="kv-label">What Will Change</span>
          <span class="kv-val" id="approvalWhatWillChange">Creates and persists a governed shortlink record.</span>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:8px;">
            <button type="button" id="approveActionBtn" class="btn-approve" onclick="window.DOTS.approvePendingAction()">
              ✓ Approve &amp; Execute Action
            </button>
            <button type="button" id="denyActionBtn" class="btn-deny" onclick="window.DOTS.denyPendingAction()">
              ✕ Deny Action
            </button>
          </div>
          <span style="font-size:11px;color:var(--wai-text-muted);">
            Bound by server-side <code>approvalId</code> · Raw approval token never exposed in UI
          </span>
        </div>
      </section>

      <div id="conversationStream" class="conversation-stream" role="log" aria-live="polite">
        <div class="chat-bubble chat-assistant">
          <strong>WorksAI Dots Agent Ready (${escapeHtmlSafe(host)})</strong><br/>
          Describe your task below or choose a verified multi-app workflow. Read-only and dry-run tools execute automatically within a bounded 5-turn loop; consequential writes always pause for human approval in Area D.
        </div>
      </div>

      <form id="agentTaskForm" onsubmit="return window.DOTS.submitTask(event)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px;">
          <label for="taskInputBox" style="font-size:12px;font-weight:600;color:var(--wai-text-secondary);">
            Natural-Language Task Composer
          </label>
          <span style="font-size:11px;color:var(--wai-text-muted);">
            Max 4 KiB prompt · Bounded 5-turn agent loop
          </span>
        </div>
        <textarea id="taskInputBox" rows="3" placeholder="Describe a task across CanvasArch, GraphMind, APISync, CommerceCatalog, LinkEngine, OmniDesk, or ClipGuard..." required></textarea>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:220px;">
            <label for="handoffInputBox" style="font-size:11.5px;color:var(--wai-text-muted);white-space:nowrap;">Upstream Handoff:</label>
            <input id="handoffInputBox" type="text" class="mono" placeholder="Optional wai_art_v1.<id>.<sig> handle" style="padding:6px 10px;font-size:12px;" />
          </div>
          <button type="submit" id="sendTaskBtn">Run Scoped Agent Task</button>
        </div>
      </form>
    </main>

    <!-- AREA C: TOOL & ARTIFACT INSPECTOR -->
    <aside class="panel" aria-label="Tool and Artifact Inspector">
      <div class="panel-header">
        <h2 class="panel-title">C · Tool &amp; Artifact Inspector</h2>
        <span class="badge mono" id="inspectorSchemaBadge">wai.artifact.v1</span>
      </div>

      <div class="kv-box" style="margin-bottom:8px;">
        <span class="kv-label">Selected App / MCP Tool</span>
        <span class="kv-val mono" id="inspToolName">canvasarch.parse_topology (worksai-canvasarch)</span>
      </div>

      <div class="kv-box" style="margin-bottom:8px;">
        <span class="kv-label">Planner &amp; Workers AI Telemetry</span>
        <span class="kv-val mono" id="inspPlannerMeta">Model: @cf/meta/llama-3.1-8b-instruct-fp8 · Serverless GPU ready</span>
      </div>

      <div class="kv-box" style="margin-bottom:8px;">
        <span class="kv-label">Artifact Provenance &amp; Chain Depth</span>
        <span class="kv-val mono" id="inspProvenance">No artifact selected yet</span>
      </div>

      <div class="kv-box" style="margin-bottom:8px;">
        <span class="kv-label">Trace ID &amp; SHA-256 Integrity Digest</span>
        <span class="kv-val mono" id="inspTraceAndHash">—</span>
      </div>

      <div class="kv-box" style="margin-bottom:8px;">
        <span class="kv-label">Expiry, Scope &amp; Access Limits</span>
        <span class="kv-val mono" id="inspExpiryScope">${isDemo ? "Mode: demo · TTL: 1h · Max: 32 KiB · Depth: 3" : "Mode: production · TTL: 24h · Max: 64 KiB · Depth: 5"}</span>
      </div>

      <div class="kv-box">
        <span class="kv-label">Sanitized Payload Preview (Zero Raw Secrets/Tokens)</span>
        <pre id="inspSanitizedPayload" style="margin:6px 0 0;font-size:11.5px;max-height:220px;overflow-y:auto;color:#a5f3fc;white-space:pre-wrap;">Select any executed step or artifact from the workspace to inspect its sanitized wai.artifact.v1 payload and lineage.</pre>
      </div>
    </aside>
  </div>

  <script>
  (function(){
    const IS_DEMO = ${isDemo ? "true" : "false"};
    const TOOL_CATALOG = ${toolItemsJson};
    let sessionToken = "";
    let activeConvId = "conv_" + Math.random().toString(36).slice(2, 10);
    let lastSubmittedPrompt = "";
    let pendingApprovalObj = null;
    let sessionArtifacts = [];
    let conversationsMap = {};

    function setLifecycleState(phase, turnCount = 0) {
      const ids = {
        idle: "statePillIdle",
        planning: "statePillPlanning",
        executing: "statePillExecuting",
        waiting: "statePillWaiting",
        completed: "statePillCompleted"
      };
      Object.values(ids).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = "state-pill";
      });
      const targetEl = document.getElementById(ids[phase] || ids.idle);
      if (targetEl) {
        targetEl.className = "state-pill " + (phase === "waiting" ? "waiting" : (phase === "completed" ? "completed" : "active"));
      }
      const lbl = document.getElementById("turnCountLabel");
      if (lbl) lbl.textContent = "Turn " + turnCount + " / 5";
      for (let i = 1; i <= 5; i++) {
        const dot = document.getElementById("turnDot" + i);
        if (dot) dot.className = "turn-dot" + (i <= turnCount ? " filled" : "");
      }
    }

    async function initSession() {
      const ep = IS_DEMO ? "/api/demo/session" : "/api/auth/session";
      const r = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "u-admin" })
      });
      const d = await r.json();
      if (d.ok) {
        sessionToken = d.token;
        const badge = document.getElementById("identityBadge");
        if (badge) badge.textContent = d.identity.mode + ":" + d.identity.tenantId + " (" + d.identity.role + ")";
      }
    }

    function fillExampleTask(text) {
      const box = document.getElementById("taskInputBox");
      if (box) {
        box.value = text;
        box.focus();
      }
    }

    function loadPresetWorkflow(key) {
      const presets = {
        arch_graph_openapi: "Parse architecture topology Edge CDN -> API Gateway -> Auth Service; API Gateway -> Billing DB and retrieve ADR graph context [[API Gateway]] [[ADR-014]] and diff OpenAPI REMOVED DELETE /v1/legacy-auth",
        sku_shortlink_write: "Audit SKU margin SKU-ENT-01 cost:25 price:95 and create shortlink https://worksai.org/launch?utm_source=worksai&utm_campaign=q4_enterprise",
        secret_scrub_macro: "Scrub secret keys sk-proj-SyntheticTestKey99887766554433221100 and AKIAIOSFODNN7EXAMPLE and compile workflow macro",
        ticket_sla_triage: "Triage P1 enterprise SAML SSO clock skew outage ticket elapsed 52m"
      };
      fillExampleTask(presets[key] || presets.arch_graph_openapi);
    }

    function filterTools(q) {
      const needle = String(q || "").toLowerCase().trim();
      const buttons = document.querySelectorAll(".tool-catalog-btn");
      buttons.forEach(btn => {
        const name = (btn.getAttribute("data-tool-name") || "").toLowerCase();
        btn.style.display = (!needle || name.includes(needle)) ? "flex" : "none";
      });
    }

    function inspectTool(toolName) {
      const meta = TOOL_CATALOG.find(t => t.name === toolName);
      if (!meta) return;
      document.getElementById("inspToolName").textContent = meta.name + " (" + meta.appSlug + ")";
      document.getElementById("inspSanitizedPayload").textContent = JSON.stringify({
        tool: meta.name,
        appSlug: meta.appSlug,
        requiredScope: meta.requiredScope,
        readOnlyHint: meta.readOnlyHint,
        description: meta.description
      }, null, 2);
    }

    function inspectArtifact(art) {
      if (!art) return;
      document.getElementById("inspToolName").textContent = (art.sourceTool || art.tool || "tool") + " (" + (art.sourceApp || art.appSlug || "worksai") + ")";
      document.getElementById("inspProvenance").textContent =
        "Artifact: " + (art.artifactId || "n/a") +
        " · Depth: " + (art.chainDepth || 1) +
        " · Parents: " + ((art.parentArtifactIds && art.parentArtifactIds.length) ? art.parentArtifactIds.join(", ") : "root");
      document.getElementById("inspTraceAndHash").textContent =
        "Trace: " + (art.traceId || "n/a") + " · SHA-256: " + (art.sha256Digest || art.artifactSha256 || "n/a");
      document.getElementById("inspSanitizedPayload").textContent = JSON.stringify(art.output || art, null, 2);
    }

    function renderArtifactHistory() {
      const countEl = document.getElementById("artifactCountBadge");
      if (countEl) countEl.textContent = String(sessionArtifacts.length);
      const listEl = document.getElementById("artifactHistoryList");
      if (!listEl) return;
      if (sessionArtifacts.length === 0) {
        listEl.textContent = "No artifacts created in this session yet.";
        return;
      }
      listEl.innerHTML = "";
      sessionArtifacts.slice().reverse().forEach(art => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-item";
        btn.innerHTML = "<span class='mono' style='font-size:11px;'>" + (art.artifactId || "art").slice(0, 14) + "…</span><span style='font-size:11px;color:var(--wai-accent-cyan);'>" + (art.sourceTool || art.tool) + "</span>";
        btn.onclick = function() { inspectArtifact(art); };
        listEl.appendChild(btn);
      });
    }

    function updateApprovalCardUI(pending, customStateLabel) {
      const card = document.getElementById("approvalCardContainer");
      const navBadge = document.getElementById("pendingApprovalNavBadge");
      const navSum = document.getElementById("pendingApprovalNavSummary");
      if (!pending) {
        if (card) card.style.display = "none";
        if (navBadge) navBadge.textContent = "0";
        if (navSum) navSum.textContent = "Zero consequential writes awaiting review.";
        return;
      }
      if (card) card.style.display = "block";
      if (navBadge) navBadge.textContent = "1";
      if (navSum) navSum.textContent = "Awaiting approval: " + pending.tool;
      document.getElementById("approvalStateBadge").textContent = customStateLabel || "Pending Human Approval";
      document.getElementById("approvalToolName").textContent = pending.tool + " (" + (pending.appSlug || "worksai-linkengine") + ")";
      document.getElementById("approvalTargetVal").textContent = pending.target || pending.tool;
      document.getElementById("approvalArgsSummary").textContent = "input: " + (pending.arguments && pending.arguments.input ? pending.arguments.input.slice(0, 90) : "") + " · dryRun: false";
      document.getElementById("approvalArgsHash").textContent = pending.argsSha256 || "—";
      document.getElementById("approvalWhatWillChange").textContent = pending.whatWillChange || "Executes consequential state mutation.";
    }

    async function submitTask(ev) {
      if (ev) ev.preventDefault();
      if (!sessionToken) await initSession();
      const box = document.getElementById("taskInputBox");
      const hfBox = document.getElementById("handoffInputBox");
      const txt = box ? box.value.trim() : "";
      const handoffFrom = hfBox && hfBox.value.trim() ? hfBox.value.trim() : null;
      if (!txt) return false;

      lastSubmittedPrompt = txt;
      appendBubble("user", txt);
      if (box) box.value = "";
      setLifecycleState("planning", 1);

      const ep = IS_DEMO ? "/api/demo/agent/task" : "/api/agent/task";
      const r = await fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionToken },
        body: JSON.stringify({ conversationId: activeConvId, userPrompt: txt, handoffFrom })
      });
      const d = await r.json();
      handleTaskResponse(d);
      return false;
    }

    function handleTaskResponse(d) {
      if (!d.ok) {
        setLifecycleState("idle", 0);
        appendBubble("assistant", "Security / Validation Notice (" + (d.code || "ERROR") + "): " + (d.error || "Request blocked."));
        return;
      }

      if (d.plannerMetadata) {
        document.getElementById("inspPlannerMeta").textContent =
          "Mode: " + d.plannerMetadata.plannerMode +
          " · Model: " + d.plannerMetadata.modelId +
          " · Latency: " + (d.plannerMetadata.latencyMs || 1) + "ms";
      }

      const turnsCount = d.turnCount || 1;
      if (Array.isArray(d.toolResults) && d.toolResults.length > 0) {
        d.toolResults.forEach(tr => {
          sessionArtifacts.push(tr);
        });
        renderArtifactHistory();
        inspectArtifact(d.toolResults[d.toolResults.length - 1]);
      }

      const lastTurn = d.turns && d.turns.length ? d.turns[d.turns.length - 1] : { content: "Completed." };
      appendBubble("assistant", lastTurn.content, d.toolResults);

      if (d.status === "paused_awaiting_approval" && d.pendingApproval) {
        pendingApprovalObj = d.pendingApproval;
        setLifecycleState("waiting", turnsCount);
        updateApprovalCardUI(pendingApprovalObj, "Pending Human Approval");
      } else {
        pendingApprovalObj = null;
        setLifecycleState("completed", turnsCount);
        updateApprovalCardUI(null);
      }
    }

    async function approvePendingAction() {
      if (!pendingApprovalObj) return;
      document.getElementById("approvalStateBadge").textContent = "Approved · Executing…";
      setLifecycleState("executing", 2);

      const apprRes = await fetch("/api/approvals/grant", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionToken },
        body: JSON.stringify({
          toolName: pendingApprovalObj.tool,
          target: pendingApprovalObj.target,
          arguments: pendingApprovalObj.arguments,
          omitRawTokenInResponse: true
        })
      });
      const appr = await apprRes.json();
      if (!appr.ok) {
        document.getElementById("approvalStateBadge").textContent = "Failed (" + (appr.code || "ERROR") + ")";
        appendBubble("assistant", "Approval refused: " + (appr.error || appr.code));
        return;
      }

      const resumeRes = await fetch("/api/agent/task", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionToken },
        body: JSON.stringify({
          conversationId: activeConvId,
          userPrompt: "Approve and execute " + pendingApprovalObj.tool,
          approvalId: appr.approvalId
        })
      });
      const d = await resumeRes.json();
      handleTaskResponse(d);
    }

    async function denyPendingAction() {
      if (!pendingApprovalObj) return;
      pendingApprovalObj = null;
      updateApprovalCardUI(null);
      setLifecycleState("idle", 0);
      appendBubble("assistant", "Consequential action denied by user. No external state was modified.");
    }

    function cancelActiveTask() {
      pendingApprovalObj = null;
      updateApprovalCardUI(null);
      setLifecycleState("idle", 0);
      appendBubble("assistant", "Active task cancelled by user.");
    }

    function retryLastTask() {
      if (!lastSubmittedPrompt) return;
      fillExampleTask(lastSubmittedPrompt);
      submitTask(null);
    }

    function newConversation() {
      activeConvId = "conv_" + Math.random().toString(36).slice(2, 10);
      conversationsMap[activeConvId] = true;
      const countBadge = document.getElementById("convCountBadge");
      if (countBadge) countBadge.textContent = String(Object.keys(conversationsMap).length + 1);
      document.getElementById("conversationStream").innerHTML =
        '<div class="chat-bubble chat-assistant">Started new scoped conversation (<code>' + activeConvId + '</code>). Ready for your task.</div>';
      setLifecycleState("idle", 0);
    }

    function selectConversation(id) {
      activeConvId = id;
    }

    async function runGuidedDemoHandoff() {
      fillExampleTask("Parse architecture topology Edge CDN -> API Gateway -> Auth Service and retrieve ADR graph context [[API Gateway]] and diff OpenAPI REMOVED DELETE /v1/legacy-auth");
      await submitTask(null);
    }

    async function runGuidedDemoRedaction() {
      fillExampleTask("Scrub secret keys sk-proj-SyntheticDemoSecretKey998877665544332211 and AKIAIOSFODNN7EXAMPLE and compile workflow macro");
      await submitTask(null);
    }

    function appendBubble(role, content, toolResults) {
      const box = document.getElementById("conversationStream");
      if (!box) return;
      const div = document.createElement("div");
      div.className = "chat-bubble " + (role === "user" ? "chat-user" : "chat-assistant");
      const textSpan = document.createElement("div");
      textSpan.textContent = content;
      div.appendChild(textSpan);

      if (Array.isArray(toolResults) && toolResults.length > 0) {
        toolResults.forEach(tr => {
          const card = document.createElement("div");
          card.className = "step-result-card mono";
          card.textContent = "✓ Step " + tr.turnNumber + ": " + tr.tool + " → Artifact " + (tr.artifactId || "none") + " (depth " + (tr.chainDepth || 1) + ", trace " + (tr.traceId || "n/a") + ")";
          div.appendChild(card);
        });
      }
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    }

    window.DOTS = {
      submitTask,
      approvePendingAction,
      denyPendingAction,
      cancelActiveTask,
      retryLastTask,
      newConversation,
      selectConversation,
      fillExampleTask,
      loadPresetWorkflow,
      filterTools,
      inspectTool,
      inspectArtifact,
      runGuidedDemoHandoff,
      runGuidedDemoRedaction
    };
    window.addEventListener("DOMContentLoaded", initSession);
  })();
  </script>
</body>
</html>`;
}

export async function handleWorksAiDotsRequest(request, env, store) {
  const url = new URL(request.url);
  const pathName = url.pathname;
  const host = url.hostname || "it.worksai.org";

  if (!isAllowedHost(host, env)) {
    return Response.json(
      { ok: false, errorCode: "HOST_FORBIDDEN", error: `Host '${host}' is not authorized to access WorksAI Dots.` },
      { status: 403, headers: { "Cache-Control": "private, no-store" } }
    );
  }

  if (request.method === "GET" && pathName === "/health") {
    return Response.json({
      ok: true,
      service: "worksai-dots",
      version: RELEASE_VERSION,
      canonicalHost: "it.worksai.org",
      workersAiModel: WORKERS_AI_MODEL_ID,
      workersAiCatalogUuid: WORKERS_AI_CATALOG_UUID,
      mcpToolsCount: CORRECTED_MCP_TOOLS.length,
      r2DataLakeBound: Boolean(env && env.WORKSAI_DATA_LAKE),
      aiBound: Boolean(env && env.AI)
    }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
  }

  const isDemoRoute =
    pathName === "/demo" ||
    pathName.startsWith("/demo/") ||
    pathName.startsWith("/api/demo/");
  const expectedMode = isDemoRoute ? "demo" : "production";

  try {
    validateRuntimeConfig(env, expectedMode);
  } catch (err) {
    return Response.json(
      { ok: false, errorCode: "CONFIG_VALIDATION_FAILED", error: err.message, missingKeys: err.missingOrInvalidKeys },
      { status: 503, headers: { "Cache-Control": "private, no-store" } }
    );
  }

  let rawToken = null;
  const authHdr = request.headers.get("Authorization");
  const cookieHdr = request.headers.get("Cookie") || "";
  const hasProdCookieOnDemo = isDemoRoute && cookieHdr.includes("wai_prod_session=");

  if (authHdr && authHdr.startsWith("Bearer ")) {
    rawToken = authHdr.slice(7).trim();
  } else {
    const cookieName = isDemoRoute ? "wai_demo_session=" : "wai_prod_session=";
    const match = cookieHdr.split(";").map(s => s.trim()).find(s => s.startsWith(cookieName));
    if (match) rawToken = match.slice(cookieName.length);
  }

  if (request.method === "GET" && (pathName === "/" || pathName === "/demo")) {
    let identity = null;
    if (rawToken) {
      const v = verifySessionToken(rawToken, env, expectedMode, store.revokedJtis);
      if (v.ok) identity = v.identity;
    } else if (isDemoRoute) {
      identity = { mode: "demo", tenantId: "demo-sandbox", workspaceId: "demo-ws", role: "demo_visitor", authenticated: true };
    }
    return new Response(
      renderWorksAiDotsHtml({
        isDemo: isDemoRoute,
        identity,
        host,
        prodCookieStrippedOnDemo: hasProdCookieOnDemo
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY"
        }
      }
    );
  }

  if (request.method === "POST" && pathName === "/api/demo/session") {
    const vid = crypto.randomBytes(6).toString("hex");
    const issued = issueSessionToken(
      { userId: `visitor-${vid}`, tenantId: `demo-sandbox-${vid}`, workspaceId: `demo-ws-${vid}`, role: "demo_visitor", mode: "demo" },
      env
    );
    return Response.json(
      { ok: true, token: issued.token, identity: issued.payload },
      {
        status: 200,
        headers: {
          "Set-Cookie": `wai_demo_session=${issued.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`,
          "Cache-Control": "private, no-store"
        }
      }
    );
  }

  if (request.method === "POST" && pathName === "/api/auth/session") {
    const body = await request.json().catch(() => ({}));
    const username = typeof body.username === "string" && TRUSTED_MEMBERSHIPS.has(body.username)
      ? body.username
      : "u-admin";
    const user = TRUSTED_MEMBERSHIPS.get(username);
    const issued = issueSessionToken(
      { userId: username, tenantId: user.tenantId, workspaceId: user.workspaceId, role: user.role, mode: "production" },
      env
    );
    return Response.json(
      { ok: true, token: issued.token, identity: issued.payload },
      {
        status: 200,
        headers: {
          "Set-Cookie": `wai_prod_session=${issued.token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`,
          "Cache-Control": "private, no-store"
        }
      }
    );
  }

  const verified = verifySessionToken(rawToken, env, expectedMode, store.revokedJtis);
  if (!verified.ok) {
    return Response.json(
      { ok: false, errorCode: verified.code, error: verified.error },
      { status: verified.status, headers: { "Cache-Control": "private, no-store" } }
    );
  }
  const callerIdentity = verified.identity;

  if (request.method === "POST" && (pathName === "/api/agent/task" || pathName === "/api/demo/agent/task")) {
    const body = await request.json().catch(() => ({}));
    const result = await executeAgentTask({
      conversationId: body.conversationId || "conv_default",
      userPrompt: body.userPrompt || "",
      identity: callerIdentity,
      handoffFrom: body.handoffFrom || null,
      approvalToken: body.approvalToken || null,
      approvalId: body.approvalId || null,
      env,
      store
    });
    const httpStatus = result.ok ? 200 : (typeof result.status === "number" ? result.status : 400);
    return Response.json(result, { status: httpStatus, headers: { "Cache-Control": "private, no-store" } });
  }

  if (request.method === "POST" && pathName === "/api/approvals/grant") {
    const body = await request.json().catch(() => ({}));
    const res = await grantActionApproval({
      identity: callerIdentity,
      toolName: body.toolName,
      target: body.target,
      normalizedArgs: body.arguments || {},
      env,
      store
    });
    if (!res.ok) {
      return Response.json(res, { status: res.status, headers: { "Cache-Control": "private, no-store" } });
    }
    if (body.omitRawTokenInResponse) {
      return Response.json(
        { ok: true, approvalId: res.approvalId, record: res.record },
        { status: 200, headers: { "Cache-Control": "private, no-store" } }
      );
    }
    return Response.json(res, { status: 200, headers: { "Cache-Control": "private, no-store" } });
  }

  if (request.method === "GET" && (pathName.startsWith("/api/artifacts/") || pathName.startsWith("/api/demo/artifacts/"))) {
    const handleOrId = decodeURIComponent(pathName.split("/").pop() || "");
    if (handleOrId.startsWith("wai_art_v1.")) {
      const resolved = await resolveArtifactHandoff({ handoffFrom: handleOrId, callerIdentity, env, store });
      return Response.json(resolved, { status: resolved.ok ? 200 : resolved.status, headers: { "Cache-Control": "private, no-store" } });
    }
    const cfg = validateRuntimeConfig(env, expectedMode);
    const r2Key = `${cfg.r2Prefix}artifacts/${callerIdentity.tenantId}/${callerIdentity.workspaceId}/${handleOrId}.json`;
    const r2Obj = await store.r2Get(r2Key, env);
    if (!r2Obj) {
      return Response.json({ ok: false, errorCode: "ARTIFACT_NOT_FOUND", error: "Artifact not found in tenant scope." }, { status: 404 });
    }
    return Response.json({ ok: true, envelope: JSON.parse(r2Obj.text) }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
  }

  if (request.method === "POST" && (pathName === "/mcp" || pathName === "/demo/mcp")) {
    const rpc = await request.json().catch(() => null);
    if (!rpc || rpc.jsonrpc !== "2.0") {
      return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid JSON-RPC 2.0 request" } }, { status: 400 });
    }
    if (rpc.method === "initialize") {
      return Response.json({
        jsonrpc: "2.0",
        id: rpc.id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "worksai-dots-mcp", version: RELEASE_VERSION },
          capabilities: { tools: { listChanged: false } }
        }
      });
    }
    if (rpc.method === "tools/list") {
      return Response.json({
        jsonrpc: "2.0",
        id: rpc.id,
        result: {
          tools: CORRECTED_MCP_TOOLS.map(t => ({
            name: t.name,
            description: t.description,
            annotations: t.annotations,
            inputSchema: {
              type: "object",
              properties: {
                input: { type: "string" },
                handoffFrom: { type: "string" },
                dryRun: { type: "boolean" },
                approvalToken: { type: "string" }
              },
              required: ["input"]
            }
          }))
        }
      });
    }
    if (rpc.method === "tools/call") {
      const params = rpc.params || {};
      const callRes = await evaluateAndExecuteToolCall({
        callerIdentity,
        toolName: params.name,
        args: params.arguments || {},
        env,
        store
      });
      if (callRes.protocolError) {
        return Response.json({ jsonrpc: "2.0", id: rpc.id, error: { code: callRes.code, message: callRes.message } }, { status: 400 });
      }
      return Response.json({
        jsonrpc: "2.0",
        id: rpc.id,
        result: {
          isError: Boolean(callRes.isError),
          errorCode: callRes.errorCode,
          content: [{ type: "text", text: callRes.isError ? callRes.message : JSON.stringify(callRes.structuredContent) }],
          structuredContent: callRes.structuredContent || null
        }
      }, { status: callRes.status || 200 });
    }
    return Response.json({ jsonrpc: "2.0", id: rpc.id, error: { code: -32601, message: `Method '${rpc.method}' not found` } }, { status: 404 });
  }

  return Response.json({ ok: false, errorCode: "NOT_FOUND", error: "Route not found" }, { status: 404 });
}

export default {
  async fetch(request, env) {
    if (!globalThis.__waiDotsStore) {
      globalThis.__waiDotsStore = createWorksAiDotsStore({ supportsAtomicCas: true });
    }
    return handleWorksAiDotsRequest(request, env, globalThis.__waiDotsStore);
  }
};
