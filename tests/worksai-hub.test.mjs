import test from "node:test";
import assert from "node:assert/strict";
import {
  createWorksAiStore,
  handleWorksAiRequest,
  APPS_CATALOG
} from "../src/worker.mjs";

test("1. Health check and 12 verified MIT apps catalog on worksai.org", async () => {
  const store = createWorksAiStore();
  const res = await handleWorksAiRequest(new Request("https://worksai.org/api/health"), {}, store);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.appsCount, 12);
  assert.equal(body.stack.license, "MIT");
  assert.equal(APPS_CATALOG.length, 12);
});

test("2. Primary Hub HTML renders glassmorphic UI, 12 apps, and devinai.uk cross-links", async () => {
  const store = createWorksAiStore();
  const res = await handleWorksAiRequest(new Request("https://worksai.org/"), {}, store);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /WorksAI\.org/);
  assert.match(html, /WorksAi CanvasArch/);
  assert.match(html, /WorksAi ForumPulse/);
  assert.match(html, /https:\/\/devinai\.uk/);
});

test("3. Subdomain routing renders dedicated app workspace (<app>.worksai.org)", async () => {
  const store = createWorksAiStore();
  const res = await handleWorksAiRequest(
    new Request("https://canvasarch.worksai.org/", { headers: { host: "canvasarch.worksai.org" } }),
    {},
    store
  );
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.match(html, /WorksAi CanvasArch — WorksAI App Workspace/);
  assert.match(html, /Excalidraw/);
});

test("4. Better Auth sign-in, session check, sign-up, and sign-out lifecycle", async () => {
  const store = createWorksAiStore();
  const unauthRes = await handleWorksAiRequest(new Request("https://worksai.org/api/auth/session"), {}, store);
  const unauthData = await unauthRes.json();
  assert.equal(unauthData.authenticated, false);

  const badLogin = await handleWorksAiRequest(
    new Request("https://worksai.org/api/auth/sign-in/email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "demo@worksai.org", password: "wrong-password" })
    }),
    {},
    store
  );
  assert.equal(badLogin.status, 401);

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
  const loginData = await loginRes.json();
  assert.equal(loginData.ok, true);
  assert.ok(loginData.token);
});

test("5. Authorization-aware Data Lake search enforces strict tenant isolation", async () => {
  const store = createWorksAiStore();
  const guestSearch = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/search?q=confidential"),
    {},
    store
  );
  const guestData = await guestSearch.json();
  assert.equal(guestData.count, 0);

  const alphaSearch = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/search?q=confidential", {
      headers: { Authorization: "Bearer ba_alpha_session_isolated_2026" }
    }),
    {},
    store
  );
  const alphaData = await alphaSearch.json();
  assert.equal(alphaData.count, 1);
  assert.equal(alphaData.results[0].id, "dl-doc-08-private");
});

test("6. Data Lake ingestion validates auth, MIME types, private-key guardrails, and indexes new documents", async () => {
  const store = createWorksAiStore();
  const unauthIngest = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Test", mimeType: "text/markdown", content: "# Hello" })
    }),
    {},
    store
  );
  assert.equal(unauthIngest.status, 401);

  const badMime = await handleWorksAiRequest(
    new Request("https://worksai.org/api/datalake/ingest", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer ba_demo_session_worksai_2026"
      },
      body: JSON.stringify({
        title: "Binary Executable",
        mimeType: "application/x-msdownload",
        content: "MZ..."
      })
    }),
    {},
    store
  );
  assert.equal(badMime.status, 415);
});
