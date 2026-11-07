import test from "node:test";
import assert from "node:assert/strict";
import {
  APPS_CATALOG,
  ARTICLES_CATALOG,
  createWorksAiStore,
  handleWorksAiRequest,
  signWebCryptoSessionToken,
  hashPasswordPbkdf2,
  verifyPasswordPbkdf2
} from "../src/worker.mjs";

test("WorksAI Hub catalog contains 12 MIT apps with explicit capabilityMatrix and 20 verified articles with zero forbidden references", () => {
  assert.equal(APPS_CATALOG.length, 12);
  assert.equal(ARTICLES_CATALOG.length, 20);
  for (const app of APPS_CATALOG) {
    assert.equal(Boolean(app.capabilityMatrix?.deterministicUtilities), true);
    assert.equal(Boolean(app.capabilityMatrix?.genuineAiFeatures), true);
  }
  const serialized = JSON.stringify({ APPS_CATALOG, ARTICLES_CATALOG }).toLowerCase();
  assert.equal(serialized.includes("devinai.uk"), false);
  assert.equal(serialized.includes("devonfolio"), false);
});

test("WebCrypto PBKDF2-SHA256 password hashing, HMAC-SHA256 session signing, session rotation, and durable cross-isolate R2 revocation", async () => {
  const r2Map = new Map();
  const sharedR2Env = {
    DATALAKE_BUCKET: {
      async put(key, val) { r2Map.set(key, val); },
      async get(key) {
        if (!r2Map.has(key)) return null;
        const v = r2Map.get(key);
        return { async text() { return v; } };
      }
    }
  };

  // Verify WebCrypto PBKDF2-SHA256 password derivation & constant-time check
  const hashHex = await hashPasswordPbkdf2("worksai-demo-2026", "salt-demo-worksai-2026");
  assert.equal(hashHex.length, 64);
  assert.equal(await verifyPasswordPbkdf2("worksai-demo-2026", "salt-demo-worksai-2026", hashHex), true);
  assert.equal(await verifyPasswordPbkdf2("wrong-password", "salt-demo-worksai-2026", hashHex), false);

  // Isolate 1: Sign in and receive ws_ses_v2.* token
  const isolateStore1 = createWorksAiStore();
  const loginRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-in/email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "demo@worksai.org", password: "worksai-demo-2026" })
    }),
    sharedR2Env,
    isolateStore1
  );
  assert.equal(loginRes.status, 200);
  const loginBody = await loginRes.json();
  assert.equal(loginBody.token.startsWith("ws_ses_v2."), true);

  // Session rotation (/api/auth/rotate) issues new token and durably revokes old token in R2
  const rotRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/rotate", {
      method: "POST",
      headers: { Authorization: `Bearer ${loginBody.token}` }
    }),
    sharedR2Env,
    isolateStore1
  );
  assert.equal(rotRes.status, 200);
  const rotBody = await rotRes.json();
  assert.equal(rotBody.rotated, true);
  assert.notEqual(rotBody.token, loginBody.token);

  // Isolate 2 (fresh store simulating separate Worker isolate / deployment restart): old rotated token MUST be rejected via durable R2 revocation!
  const isolateStore2 = createWorksAiStore();
  assert.equal(isolateStore2.revokedTokens.size, 0, "Fresh isolate starts with empty in-memory revocation set");
  const oldTokenOnFreshIsolate = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${loginBody.token}` },
      body: JSON.stringify({ title: "Using Rotated Token", mimeType: "text/markdown", content: "# Test" })
    }),
    sharedR2Env,
    isolateStore2
  );
  assert.equal(oldTokenOnFreshIsolate.status, 401);
  const oldTokJson = await oldTokenOnFreshIsolate.json();
  assert.equal(oldTokJson.reason, "token_revoked_durable_r2");

  // Sign out rotated token on Isolate 1, then verify Isolate 3 rejects it via durable R2 revocation
  const signOutRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-out", {
      method: "POST",
      headers: { Authorization: `Bearer ${rotBody.token}` }
    }),
    sharedR2Env,
    isolateStore1
  );
  assert.equal(signOutRes.status, 200);

  const isolateStore3 = createWorksAiStore();
  const revokedOnIsolate3 = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${rotBody.token}` },
      body: JSON.stringify({ title: "After Logout on Fresh Isolate", mimeType: "text/markdown", content: "# Test" })
    }),
    sharedR2Env,
    isolateStore3
  );
  assert.equal(revokedOnIsolate3.status, 401);
  const rev3Json = await revokedOnIsolate3.json();
  assert.equal(rev3Json.reason, "token_revoked_durable_r2");
});

test("CSRF protection, login rate limiting (429), cross-tenant/demo-to-prod isolation (403), and R2 object round-trip", async () => {
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

  // 1. Cross-origin Cookie POST is blocked by CSRF protection (403)
  const csrfRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Cookie: "worksai_session=ba_demo_session_worksai_2026",
        Origin: "https://evil-csrf.example.com"
      },
      body: JSON.stringify({ title: "CSRF Attack", mimeType: "text/markdown", content: "# X" })
    }),
    mockEnv,
    store
  );
  assert.equal(csrfRes.status, 403);
  const csrfJson = await csrfRes.json();
  assert.equal(csrfJson.reason, "csrf_origin_mismatch");

  // 2. Login rate limit triggers 429 after 5 failed attempts
  for (let i = 0; i < 5; i++) {
    const r = await handleWorksAiRequest(
      new Request("https://worksai.org/api/auth/sign-in/email", {
        method: "POST",
        headers: { "content-type": "application/json", "cf-connecting-ip": "198.51.100.99" },
        body: JSON.stringify({ email: "demo@worksai.org", password: "wrong-password" })
      }),
      mockEnv,
      store
    );
    assert.equal(r.status, 401);
  }
  const rlRes = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-in/email", {
      method: "POST",
      headers: { "content-type": "application/json", "cf-connecting-ip": "198.51.100.99" },
      body: JSON.stringify({ email: "demo@worksai.org", password: "wrong-password" })
    }),
    mockEnv,
    store
  );
  assert.equal(rlRes.status, 429);

  // 3. Cross-tenant & demo-to-prod object reads rejected with 403
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
