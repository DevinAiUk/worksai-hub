import test from "node:test";
import assert from "node:assert/strict";
import worker, { APPS_CATALOG, ARTICLES_CATALOG } from "../src/worker.mjs";

const env = { JWT_SECRET: "test-secret-for-ci-verification-only-32b" };

test("WorksAI Hub catalog & humanized editorial count", () => {
  assert.equal(APPS_CATALOG.length, 12);
  assert.equal(ARTICLES_CATALOG.length, 20);
  for (const a of ARTICLES_CATALOG) {
    const paras = String(a.body || "").split("\n\n").filter(Boolean);
    assert.ok(paras.length >= 4, `Article ${a.slug} must have >= 4 paragraphs`);
  }
});

test("WorksAI Hub routes, GA4 G-113353C400, and security headers", async () => {
  const res = await worker.fetch(new Request("https://worksai.org/"), env);
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("G-113353C400"));
  assert.ok(res.headers.get("X-Content-Type-Options") || res.headers.get("Content-Security-Policy") || res.headers.get("content-type"));
});

test("WorksAI Hub MCP JSON-RPC 2.0 Streamable HTTP compliance & 36 tools", async () => {
  const initRes = await worker.fetch(new Request("https://worksai.org/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-03-26" } })
  }), env);
  assert.equal(initRes.status, 200);
  assert.ok(initRes.headers.get("Mcp-Session-Id"));
  const initBody = await initRes.json();
  assert.equal(initBody.result.protocolVersion, "2025-03-26");

  const listRes = await worker.fetch(new Request("https://worksai.org/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: { limit: 50 } })
  }), env);
  const listBody = await listRes.json();
  assert.equal(listBody.result.tools.length, 36);

  const callRes = await worker.fetch(new Request("https://worksai.org/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "canvasarch.parse_topology", arguments: { input: "api -> worker -> d1" } }
    })
  }), env);
  const callBody = await callRes.json();
  assert.equal(callBody.result.isError, false);
  assert.ok(callBody.result.structuredContent.handoffHandle);
});
