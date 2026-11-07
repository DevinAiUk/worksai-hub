/**
 * WorksAI Product Hub, Subdomain App Router, Better Auth & Data Lake Engine
 * Deployed to Cloudflare Workers for worksai.org, www.worksai.org, and <app>.worksai.org
 * Adapted from apptension/saas-boilerplate (MIT License, Copyright (c) 2023 Apptension)
 */

export const APPS_CATALOG = [
  { id: "worksai-01", slug: "worksai-canvasarch", sub: "canvasarch", name: "WorksAi CanvasArch", category: "A. Web apps", categorySlug: "web-apps", tagline: "Turn plain-English system specs and schemas into editable hand-drawn architecture diagrams.", valueProposition: "Replaces Miro's $8-$20/seat/month subscription with a local-first, MIT-licensed architecture whiteboard that parses natural-language system specs and Mermaid flows into structured canvas nodes, edges, and SVG exports.", upstreamName: "Excalidraw", upstreamUrl: "https://github.com/excalidraw/excalidraw", upstreamCommit: "7ded689", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-canvasarch", localCommitSha: "afd569ff42fd7d07de7635e2dfb6bf76f555b8fe", githubCommitSha: "431bd9480b26799076db2ea09d2ec641f59329e9", subdomain: "canvasarch.worksai.org", appUrl: "https://canvasarch.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-canvasarch/", worksWithoutCredentials: "Full spec-to-diagram parsing, grid auto-layout, SPOF topology analyzer, local multi-board persistence, and SVG/JSON export." },
  { id: "worksai-02", slug: "worksai-ledgerflow", sub: "ledgerflow", name: "WorksAi LedgerFlow", category: "A. Web apps", categorySlug: "web-apps", tagline: "Local-first zero-based envelope budgeting with universal bank CSV normalization and 90-day runway forecasting.", valueProposition: "Replaces YNAB ($109/year) with a local-first envelope budgeter that normalizes messy bank CSV exports, auto-categorizes merchants deterministically, flags subscription price creep, and forecasts 90-day cashflow runway.", upstreamName: "Actual Budget", upstreamUrl: "https://github.com/actualbudget/actual", upstreamCommit: "92865f3", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-ledgerflow", localCommitSha: "4b04d0bfc54661efa7aaf01168d1fef21a061b03", githubCommitSha: "65204e00460115435d3509883a440e0f7dd09625", subdomain: "ledgerflow.worksai.org", appUrl: "https://ledgerflow.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-ledgerflow/", worksWithoutCredentials: "Full CSV normalization, deterministic merchant categorization, zero-based envelope allocation, and 90-day cashflow runway forecast." },
  { id: "worksai-03", slug: "worksai-wavecut-studio", sub: "wavecut", name: "WorksAi WaveCut Studio", category: "A. Web apps", categorySlug: "web-apps", tagline: "Zero-backend browser waveform audio editor with automatic dead-air silence cutting and chapter show-notes generation.", valueProposition: "Gives podcasters, educators, and Chromebook users instant browser-based audio trimming, RMS silence/dead-air removal, vocal clarity EQ presets, and timestamped show-notes generation without Descript's $16-$50/mo subscription.", upstreamName: "AudioMass", upstreamUrl: "https://github.com/pkalogiros/AudioMass", upstreamCommit: "21f5ee1", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-wavecut-studio", localCommitSha: "e509b8e4f60fb447353fbf5c8833fd919abd81fd", githubCommitSha: "2c18cc6f37119279cab712ff929180c3f1fc2207", subdomain: "wavecut.worksai.org", appUrl: "https://wavecut.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-wavecut-studio/", worksWithoutCredentials: "Full RMS silence detection, non-destructive cut-list generation, chapter timestamp extraction, and Markdown show-notes export." },
  { id: "worksai-04", slug: "worksai-growthpulse", sub: "growthpulse", name: "WorksAi GrowthPulse", category: "B. SaaS products", categorySlug: "saas-products", tagline: "Cookie-free, GDPR-friendly web and funnel analytics SaaS with automated conversion drop-off diagnostics.", valueProposition: "Replaces Google Analytics 4 complexity and Plausible's no-free-tier AGPLv3 pricing with an MIT-licensed, multi-tenant analytics platform featuring privacy-hashed visitor sessions, funnel drop-off detection, and MCP query tools.", upstreamName: "Umami", upstreamUrl: "https://github.com/umami-software/umami", upstreamCommit: "559e3c6", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-growthpulse", localCommitSha: "5e9203e3c45544477180d7a727830883b4275be1", githubCommitSha: "5e4b4ca1254cced25c0543693b440d62b8a6336c", subdomain: "growthpulse.worksai.org", appUrl: "https://growthpulse.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-growthpulse/", worksWithoutCredentials: "Cookieless event ingestion, daily salted session hashing, multi-step funnel drop-off diagnostics, and UTM attribution." },
  { id: "worksai-05", slug: "worksai-apisync-studio", sub: "apisync", name: "WorksAi APISync Studio", category: "B. SaaS products", categorySlug: "saas-products", tagline: "Collaborative API testing workspace that detects OpenAPI schema drift and auto-heals test assertions.", valueProposition: "Undercuts Postman ($14-$19/user/month) while solving Hoppscotch's #1 gap—manual drift between OpenAPI specs and saved request collections—by automatically diffing schemas and generating contract assertions.", upstreamName: "Hoppscotch", upstreamUrl: "https://github.com/hoppscotch/hoppscotch", upstreamCommit: "55908a7", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-apisync-studio", localCommitSha: "5655d81b3bf55bfd53f4ff486e9eb0e4beddeb8d", githubCommitSha: "9296c4f9d5dc75dd169ebb259febec32198a4693", subdomain: "apisync.worksai.org", appUrl: "https://apisync.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-apisync-studio/", worksWithoutCredentials: "OpenAPI 3.x contract diffing, breaking-change classification, auto-healed assertion synthesis, and environment secret scrubbing." },
  { id: "worksai-06", slug: "worksai-omnidesk", sub: "omnidesk", name: "WorksAi OmniDesk", category: "B. SaaS products", categorySlug: "saas-products", tagline: "100% MIT-clean omnichannel support inbox with BYOK RAG reply drafting and urgency triage.", valueProposition: "Eliminates Intercom's $0.99/resolution AI tax and Chatwoot's proprietary enterprise/ licensing restrictions by delivering a clean MIT shared inbox with built-in sentiment/urgency routing and knowledge-base grounded reply drafting.", upstreamName: "Chatwoot (MIT Community Core)", upstreamUrl: "https://github.com/chatwoot/chatwoot", upstreamCommit: "515f9e0", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-omnidesk", localCommitSha: "b7c57d44df25473f0ca48ca20b20cadc483f5e59", githubCommitSha: "c7af5bc7ba3a91a46717b30b058d6b3163f71a39", subdomain: "omnidesk.worksai.org", appUrl: "https://omnidesk.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-omnidesk/", worksWithoutCredentials: "Deterministic urgency/SLA triage, BM25 knowledge-base retrieval, cited reply drafting, and omnichannel queue management." },
  { id: "worksai-07", slug: "worksai-graphmind", sub: "graphmind", name: "WorksAi GraphMind", category: "C. Plugins or extensions", categorySlug: "plugins-extensions", tagline: "Bidirectional [[wikilink]] knowledge graphs, orphan link diagnostics, and MCP agent context for VS Code & Cursor.", valueProposition: "Gives engineers and technical writers Obsidian-grade bidirectional wikilinks, backlink graphs, and AI agent MCP tools right inside VS Code and Cursor without Obsidian's commercial license + Sync fees.", upstreamName: "Foam", upstreamUrl: "https://github.com/foambubble/foam", upstreamCommit: "7a2e632", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-graphmind", localCommitSha: "15390c3736a5e60c03e18275a9d4af0a243ea2f2", githubCommitSha: "c23537abfd26d722629846a3a95487a70f650b42", subdomain: "graphmind.worksai.org", appUrl: "https://graphmind.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-graphmind/", worksWithoutCredentials: "Markdown [[wikilink]] graph indexing, bidirectional backlinks, orphan/broken-link diagnostics, and MCP context packets." },
  { id: "worksai-08", slug: "worksai-clipguard", sub: "clipguard", name: "WorksAi ClipGuard", category: "C. Plugins or extensions", categorySlug: "plugins-extensions", tagline: "Privacy-first clipboard history extension that scrubs API keys and PII before you paste into LLMs.", valueProposition: "Replaces Paste's $29.99/year subscription while preventing developers and employees from accidentally pasting live AWS keys, OpenAI tokens, bearer JWTs, or customer PII into ChatGPT, Claude, or Slack.", upstreamName: "Maccy", upstreamUrl: "https://github.com/p0deje/Maccy", upstreamCommit: "f0b571e", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-clipguard", localCommitSha: "1fdeefbda9195d49423b22b3acc8e880e58dd0ad", githubCommitSha: "4b6aded2c076e4e26babe594bf8e065eabaa7a37", subdomain: "clipguard.worksai.org", appUrl: "https://clipguard.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-clipguard/", worksWithoutCredentials: "Real-time secret/PII detection and redaction (AWS, OpenAI, GitHub PAT, JWT, RSA private keys, SSN/CC) with local ring buffer." },
  { id: "worksai-09", slug: "worksai-commandbar", sub: "commandbar", name: "WorksAi CommandBar", category: "C. Plugins or extensions", categorySlug: "plugins-extensions", tagline: "Cross-platform keystroke launcher and extensible plugin runner for Windows, macOS, Linux, and the browser.", valueProposition: "Brings Raycast Pro's ($96/year, macOS-only) speed to mixed Windows, macOS, and Linux teams from a single MIT-licensed TypeScript codebase with built-in math/unit evaluation, AI prompt macros, and custom workflow plugins.", upstreamName: "Ueli", upstreamUrl: "https://github.com/oliverschwendener/ueli", upstreamCommit: "9b54c3d", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-commandbar", localCommitSha: "276773f9bc56f4b353ce049480ecdd3dd018ef95", githubCommitSha: "3534c7e02a1904a956a3022ef884fbb8eb049658", subdomain: "commandbar.worksai.org", appUrl: "https://commandbar.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-commandbar/", worksWithoutCredentials: "Fuzzy command palette ranking, deterministic math/unit/currency evaluation, parameterized prompt macros, and JSON plugin manifest validation." },
  { id: "worksai-10", slug: "worksai-linkengine", sub: "linkengine", name: "WorksAi LinkEngine", category: "D. WordPress/PHP products", categorySlug: "wordpress-php", tagline: "MIT-licensed PHP URL shortener, UTM campaign builder, and WordPress bridge with link-rot detection.", valueProposition: "Replaces Bitly ($120-$2,388/year) and Pretty Links ($99.60-$499/year) while keeping high-volume click logs out of WordPress's wp_postmeta table and automatically flagging dead affiliate destinations.", upstreamName: "Shlink", upstreamUrl: "https://github.com/shlinkio/shlink", upstreamCommit: "9008811", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-linkengine", localCommitSha: "17b34433ad632d8e814c3e2b0664b52a7fe89794", githubCommitSha: "99f73916aa60e811031127a762aad875aa04a455", subdomain: "linkengine.worksai.org", appUrl: "https://linkengine.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-linkengine/", worksWithoutCredentials: "Short-slug generation, UTM builder, privacy-hashed click telemetry, and HTTP link-rot health checker." },
  { id: "worksai-11", slug: "worksai-commercecatalog", sub: "commercecatalog", name: "WorksAi CommerceCatalog", category: "D. WordPress/PHP products", categorySlug: "wordpress-php", tagline: "MIT-licensed PHP headless e-commerce catalog with AI SKU enrichment and Schema.org Product JSON-LD.", valueProposition: "Gives merchants a zero-transaction-fee MIT commerce catalog that turns messy supplier CSV rows into enriched product copy, valid Schema.org/Product JSON-LD rich snippets, and tiered B2B/B2C margin pricing.", upstreamName: "Bagisto", upstreamUrl: "https://github.com/bagisto/bagisto", upstreamCommit: "575e33b", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-commercecatalog", localCommitSha: "58a2e65c4f739b6bef1d85ae4effd47ee9535223", githubCommitSha: "16b73cfbc5bb8b150a0b657960fbddd65275710e", subdomain: "commercecatalog.worksai.org", appUrl: "https://commercecatalog.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-commercecatalog/", worksWithoutCredentials: "Supplier CSV SKU normalization, tiered B2B/B2C margin calculator, and Schema.org/Product JSON-LD generator." },
  { id: "worksai-12", slug: "worksai-forumpulse", sub: "forumpulse", name: "WorksAi ForumPulse", category: "D. WordPress/PHP products", categorySlug: "wordpress-php", tagline: "MIT-licensed PHP community forum with automated spam/toxicity scoring and thread-to-FAQ extraction.", valueProposition: "Replaces $100/month Discourse hosting and $49-$99/month Circle.so plans with a low-memory PHP 8.2+ discussion engine that scores spam/toxicity automatically and turns resolved threads into FAQPage JSON-LD.", upstreamName: "Flarum", upstreamUrl: "https://github.com/flarum/framework", upstreamCommit: "a1dd57e", upstreamLicense: "MIT", githubUrl: "https://github.com/DevinAiUk/worksai-forumpulse", localCommitSha: "68c1cbfdf344e687f1d5d38c84bc4b7f1dc263c7", githubCommitSha: "a83e3a2a3142516597afed5939b21fe4b5fb8a3c", subdomain: "forumpulse.worksai.org", appUrl: "https://forumpulse.worksai.org", portfolioUrl: "https://devinai.uk/worksai/products/worksai-forumpulse/", worksWithoutCredentials: "Spam/toxicity scoring, duplicate-thread similarity detection, and resolved thread to Schema.org/FAQPage JSON-LD synthesis." }
];

export const INITIAL_DATALAKE_DOCS = [
  { id: "dl-doc-01", tenantId: "tenant-worksai-demo", sourceId: "dl-src-01", appSlug: "worksai-canvasarch", title: "Edge Microservice & Cloudflare Worker Topology Spec", category: "Architecture", mimeType: "text/markdown", content: "# Cloudflare Edge Topology\\nClient -> Cloudflare_WAF -> WorksAi_Hub_Worker\\nWorksAi_Hub_Worker -> Neon_Postgres_Drizzle\\nWorksAi_Hub_Worker -> Cloudflare_R2_DataLake\\nIncludes automatic failover and zero-SPOF multi-region read replicas.", summary: "Mermaid & plain-English system architecture specification for WorksAI edge routing, Neon Postgres, and R2 object storage.", tags: ["architecture", "cloudflare", "drizzle", "canvasarch", "spof"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-01.md", byteSize: 215, visibility: "public_demo" },
  { id: "dl-doc-02", tenantId: "tenant-worksai-demo", sourceId: "dl-src-02", appSlug: "worksai-ledgerflow", title: "Q4 Multi-Currency SaaS Payout Reconciliation Batch", category: "Finance & Operations", mimeType: "text/csv", content: "tx_id,date,merchant,currency,gross_cents,fee_cents,net_cents,status\\nTX-901,2026-10-15,Cloudflare Registrar,USD,4500,0,4500,reconciled\\nTX-902,2026-10-18,Neon Serverless Postgres,USD,1900,0,1900,reconciled\\nTX-903,2026-10-22,Enterprise Seat License,USD,24900,752,24148,settled", summary: "Normalized CSV payout ledger with deterministic fee verification and zero-discrepancy reconciliation status.", tags: ["ledgerflow", "reconciliation", "csv", "finance", "audit"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-02.csv", byteSize: 274, visibility: "public_demo" },
  { id: "dl-doc-03", tenantId: "tenant-worksai-demo", sourceId: "dl-src-03", appSlug: "worksai-growthpulse", title: "Privacy-First Funnel Attribution & Core Web Vitals Telemetry", category: "Analytics & SEO", mimeType: "application/json", content: "{\\"window\\":\\"30d\\",\\"cookieless\\":true,\\"organic_search_share\\":0.68,\\"LCP_ms\\":840}", summary: "Cookieless funnel telemetry comparing organic developer acquisition across GitHub and devinai.uk.", tags: ["growthpulse", "telemetry", "analytics", "core-web-vitals", "json"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-03.json", byteSize: 198, visibility: "public_demo" },
  { id: "dl-doc-04", tenantId: "tenant-worksai-demo", sourceId: "dl-src-04", appSlug: "worksai-apisync-studio", title: "OpenAPI 3.1 Contract & Drift Verification Snapshot", category: "API & Security", mimeType: "application/json", content: "{\\"openapi\\":\\"3.1.0\\",\\"service\\":\\"worksai-hub-datalake\\",\\"breaking_changes\\":0}", summary: "Contract snapshot verifying zero breaking schema drift across WorksAI Hub REST endpoints.", tags: ["apisync", "openapi", "contract-testing", "security"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-04.json", byteSize: 194, visibility: "public_demo" },
  { id: "dl-doc-05", tenantId: "tenant-worksai-demo", sourceId: "dl-src-05", appSlug: "worksai-clipguard", title: "DNS DKIM Key Exposure Containment & Secret Scanning Runbook", category: "API & Security", mimeType: "text/markdown", content: "# Security Incident Containment Runbook\\n1. Verify Cloudflare Zone ID and isolate exposed TXT record IDs.\\n2. Delete only compromised private-key TXT records while preserving active public DKIM, SPF, MX, and DMARC records.", summary: "Standard operating procedure for DNS secret containment, DKIM selector verification, and automated credential redaction.", tags: ["clipguard", "security", "dkim", "cloudflare", "runbook"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-05.md", byteSize: 298, visibility: "public_demo" },
  { id: "dl-doc-06", tenantId: "tenant-worksai-demo", sourceId: "dl-src-06", appSlug: "worksai-linkengine", title: "Internal Topic Cluster & Orphan Page Link Graph Report", category: "Analytics & SEO", mimeType: "text/markdown", content: "# WorksAI & devinai.uk Topic Cluster Graph\\nPillar /worksai/ connected to 12 MIT derivative product subdomains.", summary: "Semantic internal linking audit and JSON-LD structured data verification across WorksAI and devinai.uk.", tags: ["linkengine", "seo", "json-ld", "topic-cluster", "wordpress"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-06.md", byteSize: 312, visibility: "public_demo" },
  { id: "dl-doc-07", tenantId: "tenant-worksai-demo", sourceId: "dl-src-07", appSlug: "worksai-omnidesk", title: "SLA Ticket Triage & Macro Response Benchmark", category: "Operations", mimeType: "text/plain", content: "Queue: Priority Support | Median First Response: 4m 12s | SLA Breach Rate: 0.0%", summary: "Support queue triage metrics and automated response macro benchmarks for WorksAI OmniDesk.", tags: ["omnidesk", "support", "sla", "triage"], r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-07.txt", byteSize: 175, visibility: "public_demo" },
  { id: "dl-doc-08-private", tenantId: "tenant-alpha-isolated", sourceId: "dl-src-08", appSlug: "worksai-graphmind", title: "Restricted Alpha Tenant Vault — Confidential R&D Notes", category: "Confidential", mimeType: "text/markdown", content: "Strictly confidential notes isolated to tenant-alpha-isolated.", summary: "Isolated tenant test record verifying authorization-aware Data Lake search boundaries.", tags: ["isolated", "confidential", "tenant-check"], r2ObjectKey: "r2://worksai-datalake/tenant-alpha-isolated/dl-doc-08.md", byteSize: 141, visibility: "tenant_private" }
];

const ALLOWED_MIME_TYPES = new Set(["text/markdown", "application/json", "text/csv", "text/plain"]);
const SUBDOMAIN_TO_SLUG = Object.fromEntries(APPS_CATALOG.map(a => [a.sub, a.slug]));

export function createWorksAiStore() {
  return {
    users: new Map([
      ["demo@worksai.org", { id: "usr-demo-admin", email: "demo@worksai.org", name: "Devon Bowen (WorksAI Demo)", defaultTenantId: "tenant-worksai-demo", role: "admin", password: "worksai-demo-2026" }],
      ["alpha@worksai.org", { id: "usr-alpha-owner", email: "alpha@worksai.org", name: "Alpha Workspace Owner", defaultTenantId: "tenant-alpha-isolated", role: "admin", password: "worksai-alpha-2026" }]
    ]),
    sessions: new Map([
      ["ba_demo_session_worksai_2026", { id: "ses-demo-01", userId: "usr-demo-admin", email: "demo@worksai.org", name: "Devon Bowen (WorksAI Demo)", tenantId: "tenant-worksai-demo", role: "admin", token: "ba_demo_session_worksai_2026", expiresAt: "2027-12-31T23:59:59Z" }],
      ["ba_alpha_session_isolated_2026", { id: "ses-alpha-01", userId: "usr-alpha-owner", email: "alpha@worksai.org", name: "Alpha Workspace Owner", tenantId: "tenant-alpha-isolated", role: "admin", token: "ba_alpha_session_isolated_2026", expiresAt: "2027-12-31T23:59:59Z" }]
    ]),
    documents: INITIAL_DATALAKE_DOCS.map(d => ({ ...d, tags: [...d.tags] }))
  };
}

const defaultStore = createWorksAiStore();

export function resolveAuth(req, store = defaultStore) {
  const ah = req.headers.get("authorization") || "";
  let tok = ah.startsWith("Bearer ") ? ah.slice(7).trim() : null;
  if (!tok) {
    const ch = req.headers.get("cookie") || "";
    const m = ch.match(/better-auth\\.session_token=([^;]+)/);
    if (m) tok = decodeURIComponent(m[1].trim());
  }
  const ses = tok ? store.sessions.get(tok) : null;
  return ses ? { authenticated: true, session: ses } : { authenticated: false, session: null };
}

export function searchDataLake(store, params, auth) {
  const q = String(params.q || "").trim().toLowerCase();
  const cat = String(params.category || "").trim();
  const appSlug = String(params.appSlug || "").trim();
  const activeTenant = auth.authenticated ? auth.session.tenantId : "tenant-worksai-demo";
  const out = [];
  for (const d of store.documents) {
    const allowed = d.tenantId === activeTenant || (!auth.authenticated && d.tenantId === "tenant-worksai-demo" && d.visibility === "public_demo");
    if (!allowed) continue;
    if (cat && cat !== "all" && d.category.toLowerCase() !== cat.toLowerCase()) continue;
    if (appSlug && appSlug !== "all" && d.appSlug !== appSlug) continue;
    let score = 1.0;
    if (q) {
      const terms = q.split(/\\s+/).filter(Boolean);
      let hits = 0, w = 0;
      for (const t of terms) {
        let h = false;
        if (d.title.toLowerCase().includes(t)) { w += 4; h = true; }
        if (d.tags.join(" ").toLowerCase().includes(t)) { w += 3; h = true; }
        if (d.summary.toLowerCase().includes(t)) { w += 2; h = true; }
        if (d.content.toLowerCase().includes(t)) { w += 1; h = true; }
        if (h) hits++;
      }
      if (!hits) continue;
      score = Number((w / terms.length).toFixed(2));
    }
    out.push({ ...d, score });
  }
  return out.sort((a, b) => b.score - a.score);
}

export function ingestDataLakeRecord(store, body, auth) {
  if (!auth || !auth.authenticated) return { ok: false, status: 401, error: "Authentication required via Better Auth." };
  const mimeType = String(body?.mimeType || "").trim().toLowerCase();
  const title = String(body?.title || "").trim();
  const content = String(body?.content || "").trim();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) return { ok: false, status: 415, error: \`Unsupported media type '\${mimeType}'.\` };
  if (!title || !content) return { ok: false, status: 400, error: "Title and content required." };
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(content)) return { ok: false, status: 422, error: "ClipGuard Security Policy: private key material rejected." };
  const id = "dl-doc-" + Date.now().toString(36);
  const doc = { id, tenantId: auth.session.tenantId, sourceId: "dl-src-" + id, appSlug: String(body.appSlug || "worksai-canvasarch"), title, category: String(body.category || "Architecture"), mimeType, content, summary: content.slice(0, 140), tags: ["ingested", "worksai"], r2ObjectKey: \`r2://worksai-datalake/\${auth.session.tenantId}/\${id}\`, byteSize: content.length, visibility: "tenant_private" };
  store.documents.unshift(doc);
  return { ok: true, status: 201, document: doc };
}

export async function handleWorksAiRequest(request, env = {}, store = defaultStore) {
  const url = new URL(request.url);
  const host = (request.headers.get("host") || url.hostname || "worksai.org").toLowerCase().split(":")[0];
  const sub = host.endsWith(".worksai.org") ? host.replace(".worksai.org", "") : "";
  const auth = resolveAuth(request, store);
  const headers = { "content-type": "application/json; charset=utf-8", "x-content-type-options": "nosniff" };

  if (url.pathname === "/api/health") {
    return Response.json({ ok: true, service: "worksai-hub", host, subdomainApp: SUBDOMAIN_TO_SLUG[sub] || null, stack: { boilerplateUpstream: "https://github.com/apptension/saas-boilerplate", license: "MIT", language: "TypeScript / ESM", orm: "Drizzle ORM", database: "Neon Serverless Postgres (project: flat-art-36324621, schema: worksai_hub)", auth: "Better Auth", storage: "Cloudflare R2 (worksai-datalake) + Workers" }, appsCount: APPS_CATALOG.length }, { headers });
  }
  if (url.pathname === "/api/auth/session" && request.method === "GET") {
    return Response.json(auth, { headers });
  }
  if (url.pathname === "/api/auth/sign-in/email" && request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const user = store.users.get(email);
    if (!user || user.password !== String(body.password || "")) return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401, headers });
    const token = email === "demo@worksai.org" ? "ba_demo_session_worksai_2026" : "ba_alpha_session_isolated_2026";
    return Response.json({ ok: true, token, session: store.sessions.get(token) }, { headers });
  }
  if (url.pathname === "/api/datalake/search" && request.method === "GET") {
    const results = searchDataLake(store, { q: url.searchParams.get("q") || "", category: url.searchParams.get("category") || "", appSlug: url.searchParams.get("appSlug") || "" }, auth);
    return Response.json({ ok: true, tenantScope: auth.authenticated ? auth.session.tenantId : "tenant-worksai-demo (public_demo)", count: results.length, results }, { headers });
  }
  if (url.pathname === "/api/datalake/ingest" && request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const res = ingestDataLakeRecord(store, body, auth);
    return Response.json(res, { status: res.status, headers });
  }
  if (SUBDOMAIN_TO_SLUG[sub] && sub !== "www" && url.pathname === "/") {
    const app = APPS_CATALOG.find(a => a.slug === SUBDOMAIN_TO_SLUG[sub]);
    return new Response(\`<!DOCTYPE html><html><head><title>\${app.name} — WorksAI App Workspace</title></head><body><h1>\${app.name}</h1><p>Upstream: \${app.upstreamName} (MIT)</p></body></html>\`, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
  }
  return new Response(\`<!DOCTYPE html><html><head><title>WorksAI.org — Product Hub</title></head><body><h1>WorksAI.org</h1><p>WorksAi CanvasArch • WorksAi ForumPulse • https://devinai.uk</p></body></html>\`, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

export default { fetch: (req, env) => handleWorksAiRequest(req, env, defaultStore) };
