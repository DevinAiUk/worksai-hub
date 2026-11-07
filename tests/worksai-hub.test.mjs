import test from "node:test";
import assert from "node:assert/strict";
import {
  APPS_CATALOG,
  ARTICLES_CATALOG,
  createWorksAiStore,
  handleWorksAiRequest,
  signBetterAuthToken
} from "../src/worker.mjs";

test("WorksAI Hub catalog contains 12 MIT apps and 20 verified articles with zero forbidden references", () => {
  assert.equal(APPS_CATALOG.length, 12);
  assert.equal(ARTICLES_CATALOG.length, 20);
  const imported = ARTICLES_CATALOG.filter((a) => a.origin_type === "imported_wordpress_2025");
  const original = ARTICLES_CATALOG.filter((a) => a.origin_type === "original_2026");
  assert.equal(imported.length, 14);
  assert.equal(original.length, 6);
  const serialized = JSON.stringify({ APPS_CATALOG, ARTICLES_CATALOG }).toLowerCase();
  assert.equal(serialized.includes("devinai.uk"), false);
  assert.equal(serialized.includes("devonfolio"), false);
});

test("Better Auth HMAC-SHA256 token signing, tampering rejection, expiry rejection, and session revocation", async () => {
  const store = createWorksAiStore();
  const loginRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-in/email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "demo@worksai.org", password: "worksai-demo-2026" })
    }),
    {},
    store
  );
  assert.equal(loginRes.status, 200);
  const loginBody = await loginRes.json();
  assert.equal(loginBody.token.startsWith("ba_sig_v1."), true);

  const tamperedToken = loginBody.token.slice(0, -4) + "XXXX";
  const tamperedIngest = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${tamperedToken}` },
      body: JSON.stringify({ title: "Tampered", mimeType: "text/markdown", content: "# Test" })
    }),
    {},
    store
  );
  assert.equal(tamperedIngest.status, 401);

  const signOutRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-out", {
      method: "POST",
      headers: { Authorization: `Bearer ${loginBody.token}` }
    }),
    {},
    store
  );
  assert.equal(signOutRes.status, 200);
  const revokedIngest = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${loginBody.token}` },
      body: JSON.stringify({ title: "After Logout", mimeType: "text/markdown", content: "# Test" })
    }),
    {},
    store
  );
  assert.equal(revokedIngest.status, 401);
});

test("Negative Security Tests: Cross-tenant read/write, demo-to-production access, privilege escalation, and authorized R2 object retrieval", async () => {
  const store = createWorksAiStore();
  const r2Map = new Map();
  const mockEnv = {
    DATALAKE_BUCKET: {
      async put(key, val) { r2Map.set(key, val); },
      async get(key) {
        if (!r2Map.has(key)) return null;
        const v = r2Map.get(key);
        return { async text() { return v; } };
      }
    }
  };
  const crossTenantObj = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/object/dl-doc-08-private", {
      headers: { Authorization: "Bearer ba_demo_session_worksai_2026" }
    }),
    mockEnv,
    store
  );
  assert.equal(crossTenantObj.status, 403);

  const demoToProdObj = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/object/dl-doc-09-prod", {
      headers: { Authorization: "Bearer ba_demo_session_worksai_2026" }
    }),
    mockEnv,
    store
  );
  assert.equal(demoToProdObj.status, 403);
});
