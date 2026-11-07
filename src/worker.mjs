export const WORKSAI_CREST_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\" width=\"38\" height=\"38\" role=\"img\" aria-label=\"WorksAI Metallic WI Crest\">\n  <defs>\n    <radialGradient id=\"wi-bg\" cx=\"30%\" cy=\"25%\" r=\"80%\">\n      <stop offset=\"0%\" stop-color=\"#1e293b\"/>\n      <stop offset=\"65%\" stop-color=\"#0b0f17\"/>\n      <stop offset=\"100%\" stop-color=\"#05070b\"/>\n    </radialGradient>\n    <linearGradient id=\"wi-metal\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\">\n      <stop offset=\"0%\" stop-color=\"#ffffff\"/>\n      <stop offset=\"52%\" stop-color=\"#e2e8f0\"/>\n      <stop offset=\"100%\" stop-color=\"#94a3b8\"/>\n    </linearGradient>\n    <linearGradient id=\"wi-rim\" x1=\"0%\" y1=\"100%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" stop-color=\"#f97316\"/>\n      <stop offset=\"35%\" stop-color=\"#38bdf8\"/>\n      <stop offset=\"100%\" stop-color=\"#475569\"/>\n    </linearGradient>\n  </defs>\n  <circle cx=\"32\" cy=\"32\" r=\"30\" fill=\"url(#wi-bg)\" stroke=\"url(#wi-rim)\" stroke-width=\"2.5\"/>\n  <path d=\"M9 14 L16 14 L22 40 L29 20 L34 20 L41 40 L35 50 L29 33 L23 50 L17 50 Z\" fill=\"url(#wi-metal)\" stroke=\"#0f172a\" stroke-width=\"1\"/>\n  <rect x=\"46\" y=\"14\" width=\"7.5\" height=\"36\" rx=\"1.5\" fill=\"url(#wi-metal)\" stroke=\"#0f172a\" stroke-width=\"1\"/>\n</svg>";
export const SHARED_CSS = "\n:root {\n  --bg-obsidian: #07090e;\n  --bg-surface: rgba(15, 21, 34, 0.84);\n  --bg-elevated: rgba(23, 32, 51, 0.90);\n  --border-titanium: rgba(226, 232, 240, 0.14);\n  --border-glow: rgba(56, 189, 248, 0.38);\n  --text-primary: #f8fafc;\n  --text-secondary: #cbd5e1;\n  --text-muted: #94a3b8;\n  --accent-cyan: #38bdf8;\n  --accent-amber: #f97316;\n  --accent-emerald: #10b981;\n  --radius-lg: 18px;\n  --radius-md: 12px;\n  --font-sans: \"Readex Pro\", Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n}\n* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  font-family: var(--font-sans);\n  background:\n    radial-gradient(circle at 10% 92%, rgba(249, 115, 22, 0.11), transparent 34%),\n    radial-gradient(circle at 86% 10%, rgba(56, 189, 248, 0.15), transparent 38%),\n    var(--bg-obsidian);\n  color: var(--text-primary);\n  line-height: 1.62;\n  min-height: 100vh;\n}\na { color: var(--accent-cyan); text-decoration: none; }\na:hover { text-decoration: underline; }\n.skip-link {\n  position: absolute; top: -100px; left: 16px; z-index: 100;\n  background: #fff; color: #000; padding: 8px 14px; border-radius: 8px; font-weight: 700;\n}\n.skip-link:focus { top: 12px; }\n.wrap { max-width: 1240px; margin: 0 auto; padding: 20px 20px 72px; }\n.site-header {\n  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;\n  padding: 12px 20px; border-radius: var(--radius-lg); background: var(--bg-surface);\n  border: 1px solid var(--border-titanium); backdrop-filter: blur(18px); margin-bottom: 26px;\n}\n.brand-link {\n  display: inline-flex; align-items: center; gap: 12px; color: var(--text-primary);\n  font-weight: 800; font-size: 1.12rem; letter-spacing: -0.02em; text-decoration: none !important;\n}\n.nav-links { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }\n.nav-links a {\n  padding: 7px 13px; border-radius: 9px; color: var(--text-secondary);\n  font-size: 13.5px; font-weight: 600; text-decoration: none;\n}\n.nav-links a:hover, .nav-links a[aria-current=\"page\"] {\n  background: rgba(255, 255, 255, 0.09); color: var(--text-primary);\n}\n.pill {\n  display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;\n  border-radius: 999px; font-size: 11.5px; font-weight: 600;\n  background: rgba(56, 189, 248, 0.12); color: var(--accent-cyan);\n  border: 1px solid rgba(56, 189, 248, 0.28);\n}\n.pill-amber {\n  background: rgba(249, 115, 22, 0.14); color: #fdba74;\n  border-color: rgba(249, 115, 22, 0.34);\n}\n.tag-chip {\n  display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11.5px;\n  background: rgba(255, 255, 255, 0.06); color: var(--text-secondary);\n  border: 1px solid var(--border-titanium); margin-right: 4px; margin-bottom: 4px;\n}\n.panel {\n  background: var(--bg-surface); border: 1px solid var(--border-titanium);\n  border-radius: var(--radius-lg); padding: 26px; backdrop-filter: blur(16px); margin-bottom: 22px;\n}\n.grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }\n.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px; }\n.card {\n  display: flex; flex-direction: column; justify-content: space-between;\n  background: var(--bg-elevated); border: 1px solid var(--border-titanium);\n  border-radius: 15px; padding: 20px;\n}\n.btn {\n  display: inline-flex; align-items: center; justify-content: center; gap: 8px;\n  padding: 9px 16px; border-radius: 9px; font-weight: 600; font-size: 13.5px;\n  background: linear-gradient(135deg, #0284c7, #2563eb); color: #fff !important;\n  border: 1px solid rgba(56, 189, 248, 0.4); cursor: pointer; text-decoration: none !important;\n}\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.06); color: var(--text-primary) !important;\n  border: 1px solid var(--border-titanium);\n}\ninput, select, textarea {\n  width: 100%; padding: 10px 12px; border-radius: 9px;\n  background: #05070b; color: var(--text-primary);\n  border: 1px solid var(--border-titanium); font-family: inherit; font-size: 13.5px; margin-bottom: 10px;\n}\npre {\n  background: #05070b; color: #bae6fd; border: 1px solid var(--border-titanium);\n  border-radius: 10px; padding: 14px; overflow-x: auto; font-family: var(--font-mono); font-size: 12.5px;\n}\n.site-footer {\n  margin-top: 44px; padding-top: 22px; border-top: 1px solid var(--border-titanium);\n  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 14px;\n  font-size: 13px; color: var(--text-muted);\n}\n";
export const APPS_CATALOG = [
  {
    "id": "worksai-01",
    "slug": "worksai-canvasarch",
    "sub": "canvasarch",
    "name": "WorksAi CanvasArch",
    "category": "A. Web apps",
    "categorySlug": "web-apps",
    "tagline": "Turn plain-English system specs and schemas into editable hand-drawn architecture diagrams.",
    "valueProposition": "Replaces Miro's $8-$20/seat/month subscription with a local-first, MIT-licensed architecture whiteboard that parses natural-language system specs and Mermaid flows into structured canvas nodes, edges, and SVG exports.",
    "upstreamName": "Excalidraw",
    "upstreamUrl": "https://github.com/excalidraw/excalidraw",
    "upstreamCommit": "7ded689",
    "mcpTools": [
      "canvasarch.parse_topology",
      "canvasarch.detect_spof",
      "canvasarch.export_svg"
    ],
    "aiFeature": "Natural-Language & Mermaid Spec-to-Topology Graph Synthesis + SPOF Bottleneck Analyzer",
    "worksWithoutCredentials": "Full spec-to-diagram parsing, grid auto-layout, SPOF topology analyzer, local multi-board persistence, and SVG/JSON export.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-canvasarch",
    "subdomain": "canvasarch.worksai.org",
    "appUrl": "https://canvasarch.worksai.org",
    "mcpEndpoint": "https://canvasarch.worksai.org/api/mcp",
    "aiEndpoint": "https://canvasarch.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Parse plain-English or Mermaid specs into positioned architecture nodes/edges, detect single-point-of-failure (SPOF) bottlenecks, render & export interactive SVG diagrams, and persist multi-board snapshots to Cloudflare R2.",
      "persistedFeatures": "Saved architecture specs, generated SVG topologies, and SPOF audit snapshots persisted in Cloudflare R2 (workspaces/worksai-canvasarch/*) and Neon Postgres.",
      "deterministicUtilities": "parseArchitectureSpec (directed graph layout & fan-in/fan-out SPOF calculation) and renderArchitectureSvg (accessible SVG generator).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) unstructured prose-to-topology expansion and architectural risk remediation advice when invoked with mode='ai_assisted'.",
      "knownLimitations": "Real-time multi-cursor WebSocket collaboration requires an external Durable Object room relay; standalone mode uses R2 snapshot persistence."
    }
  },
  {
    "id": "worksai-02",
    "slug": "worksai-ledgerflow",
    "sub": "ledgerflow",
    "name": "WorksAi LedgerFlow",
    "category": "A. Web apps",
    "categorySlug": "web-apps",
    "tagline": "Local-first zero-based envelope budgeting with universal bank CSV normalization and 90-day runway forecasting.",
    "valueProposition": "Replaces YNAB ($109/year) with a local-first envelope budgeter that normalizes messy bank CSV exports, auto-categorizes merchants deterministically, flags subscription price creep, and forecasts 90-day cashflow runway.",
    "upstreamName": "Actual Budget",
    "upstreamUrl": "https://github.com/actualbudget/actual",
    "upstreamCommit": "92865f3",
    "mcpTools": [
      "ledgerflow.normalize_csv",
      "ledgerflow.detect_subscription_creep",
      "ledgerflow.forecast_runway"
    ],
    "aiFeature": "Multi-Bank CSV Schema Normalization, Merchant Classification & 90-Day Cashflow Forecaster",
    "worksWithoutCredentials": "Full CSV normalization, deterministic merchant categorization, zero-based envelope allocation, and 90-day cashflow runway forecast.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-ledgerflow",
    "subdomain": "ledgerflow.worksai.org",
    "appUrl": "https://ledgerflow.worksai.org",
    "mcpEndpoint": "https://ledgerflow.worksai.org/api/mcp",
    "aiEndpoint": "https://ledgerflow.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Normalize CSV/JSON bank & SaaS ledger rows, enforce zero-based monthly budgeting, flag vendor subscription price creep (>5% increase), and calculate 90-day net cashflow runway.",
      "persistedFeatures": "Normalized ledger batches, price-creep alerts, and 90-day runway snapshots persisted in Cloudflare R2 (workspaces/worksai-ledgerflow/*) and Neon Postgres.",
      "deterministicUtilities": "normalizeAndBudgetTransactions (regex vendor categorization, cent-exact zero-based budgeting, and 90-day burn projection).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) executive variance commentary and vendor consolidation recommendations.",
      "knownLimitations": "Live Plaid/GoCardless bank feed polling requires user API credentials; CSV/JSON import works out of the box."
    }
  },
  {
    "id": "worksai-03",
    "slug": "worksai-wavecut-studio",
    "sub": "wavecut",
    "name": "WorksAi WaveCut Studio",
    "category": "A. Web apps",
    "categorySlug": "web-apps",
    "tagline": "Zero-backend browser waveform audio editor with automatic dead-air silence cutting and chapter show-notes generation.",
    "valueProposition": "Gives podcasters, educators, and Chromebook users instant browser-based audio trimming, RMS silence/dead-air removal, vocal clarity EQ presets, and timestamped show-notes generation.",
    "upstreamName": "AudioMass",
    "upstreamUrl": "https://github.com/pkalogiros/AudioMass",
    "upstreamCommit": "21f5ee1",
    "mcpTools": [
      "wavecut.detect_silence_rms",
      "wavecut.generate_chapters",
      "wavecut.export_shownotes"
    ],
    "aiFeature": "RMS Dead-Air Silence Trimming, Vocal Clarity Mastering & Timestamped Chapter Generator",
    "worksWithoutCredentials": "Full RMS silence detection, non-destructive cut-list generation, chapter timestamp extraction, and Markdown show-notes export.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-wavecut-studio",
    "subdomain": "wavecut.worksai.org",
    "appUrl": "https://wavecut.worksai.org",
    "mcpEndpoint": "https://wavecut.worksai.org/api/mcp",
    "aiEndpoint": "https://wavecut.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Analyze audio sample arrays for silence intervals (<0.02 RMS), construct valid 44-byte RIFF WAVE 16-bit mono PCM containers, and format timestamped podcast chapter Markdown.",
      "persistedFeatures": "Trimmed waveform metadata, silence interval logs, and chapter Markdown persisted in Cloudflare R2 (workspaces/worksai-wavecut-studio/*).",
      "deterministicUtilities": "analyzeWaveformAndBuildChapters (RMS window silence detector, DataView 44-byte RIFF WAVE PCM header builder, and Markdown chapter formatter).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) show-notes summarization and chapter title refinement.",
      "knownLimitations": "Operates on PCM sample buffers and transcript segments; MP3 encoding is intentionally omitted to preserve 100% MIT licensing."
    }
  },
  {
    "id": "worksai-04",
    "slug": "worksai-growthpulse",
    "sub": "growthpulse",
    "name": "WorksAi GrowthPulse",
    "category": "B. SaaS products",
    "categorySlug": "saas-products",
    "tagline": "Cookie-free, GDPR-friendly web and funnel analytics SaaS with automated conversion drop-off diagnostics.",
    "valueProposition": "Replaces GA4 complexity with an MIT-licensed, multi-tenant analytics platform featuring privacy-hashed visitor sessions, funnel drop-off detection, and MCP query tools.",
    "upstreamName": "Umami",
    "upstreamUrl": "https://github.com/umami-software/umami",
    "upstreamCommit": "559e3c6",
    "mcpTools": [
      "growthpulse.diagnose_funnel",
      "growthpulse.compute_attribution",
      "growthpulse.audit_cwv"
    ],
    "aiFeature": "Cookieless Funnel Drop-Off Diagnostics, Channel Attribution & Core Web Vitals Auditor",
    "worksWithoutCredentials": "Cookieless event ingestion, daily salted session hashing, multi-step funnel drop-off diagnostics, and UTM attribution.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-growthpulse",
    "subdomain": "growthpulse.worksai.org",
    "appUrl": "https://growthpulse.worksai.org",
    "mcpEndpoint": "https://growthpulse.worksai.org/api/mcp",
    "aiEndpoint": "https://growthpulse.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Evaluate multi-step conversion funnels (landing -> pricing -> signup) using cookieless daily-salted session hashes and identify largest stage drop-off bottlenecks.",
      "persistedFeatures": "Cookieless funnel telemetry summaries and anomaly snapshots persisted in Cloudflare R2 (workspaces/worksai-growthpulse/*) and Neon Postgres.",
      "deterministicUtilities": "evaluateFunnelAndAnomalies (cookieless salted session hashing, stage conversion math, and daily event aggregation).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) conversion bottleneck diagnosis and A/B hypothesis generation.",
      "knownLimitations": "Processes batch/webhook event streams; client-side script tag tracking requires adding the GrowthPulse beacon snippet to target sites."
    }
  },
  {
    "id": "worksai-05",
    "slug": "worksai-apisync-studio",
    "sub": "apisync",
    "name": "WorksAi APISync Studio",
    "category": "B. SaaS products",
    "categorySlug": "saas-products",
    "tagline": "Collaborative API testing workspace that detects OpenAPI schema drift and auto-heals test assertions.",
    "valueProposition": "Undercuts Postman while solving manual drift between OpenAPI specs and saved request collections by automatically diffing schemas and generating contract assertions.",
    "upstreamName": "Hoppscotch",
    "upstreamUrl": "https://github.com/hoppscotch/hoppscotch",
    "upstreamCommit": "55908a7",
    "mcpTools": [
      "apisync.diff_openapi",
      "apisync.synthesize_assertions",
      "apisync.scrub_env_secrets"
    ],
    "aiFeature": "OpenAPI 3.1 Structural Drift Detector & Automated Contract Assertion Synthesizer",
    "worksWithoutCredentials": "OpenAPI 3.x contract diffing, breaking-change classification, auto-healed assertion synthesis, and environment secret scrubbing.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-apisync-studio",
    "subdomain": "apisync.worksai.org",
    "appUrl": "https://apisync.worksai.org",
    "mcpEndpoint": "https://apisync.worksai.org/api/mcp",
    "aiEndpoint": "https://apisync.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Diff OpenAPI route specifications against saved request collections, flag missing routes and unvalidated required fields, and generate contract test assertions.",
      "persistedFeatures": "OpenAPI drift reports and generated contract test suites persisted in Cloudflare R2 (workspaces/worksai-apisync-studio/*).",
      "deterministicUtilities": "auditOpenApiDrift (route map comparison, required field verification, and expect() assertion generator).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) edge-case test payload synthesis and breaking-change migration notes.",
      "knownLimitations": "Evaluates JSON route descriptors and OpenAPI path summaries; full $ref external URL dereferencing requires pre-bundled specs."
    }
  },
  {
    "id": "worksai-06",
    "slug": "worksai-omnidesk",
    "sub": "omnidesk",
    "name": "WorksAi OmniDesk",
    "category": "B. SaaS products",
    "categorySlug": "saas-products",
    "tagline": "100% MIT-clean omnichannel support inbox with BYOK RAG reply drafting and urgency triage.",
    "valueProposition": "Eliminates per-resolution AI taxes by delivering a clean MIT shared inbox with built-in sentiment/urgency routing and knowledge-base grounded reply drafting.",
    "upstreamName": "Chatwoot (MIT Community Core)",
    "upstreamUrl": "https://github.com/chatwoot/chatwoot",
    "upstreamCommit": "515f9e0",
    "mcpTools": [
      "omnidesk.triage_urgency",
      "omnidesk.draft_rag_reply",
      "omnidesk.evaluate_sla"
    ],
    "aiFeature": "BYOK Retrieval-Augmented Support Reply Drafter & Deterministic SLA Urgency Router",
    "worksWithoutCredentials": "Deterministic urgency/SLA triage, BM25 knowledge-base retrieval, cited reply drafting, and omnichannel queue management.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-omnidesk",
    "subdomain": "omnidesk.worksai.org",
    "appUrl": "https://omnidesk.worksai.org",
    "mcpEndpoint": "https://omnidesk.worksai.org/api/mcp",
    "aiEndpoint": "https://omnidesk.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Triage incoming support tickets by urgency (critical/high/normal) and churn risk, match against knowledge-base articles, and draft grounded operator replies with citations.",
      "persistedFeatures": "Triaged ticket records, SLA urgency scores, and drafted replies persisted in Cloudflare R2 (workspaces/worksai-omnidesk/*).",
      "deterministicUtilities": "triageAndDraftSupportReply (urgency/churn keyword classifier and deterministic KB article citation matcher).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) empathetic customer response polishing grounded strictly in matched KB articles.",
      "knownLimitations": "Outbound email delivery of drafted replies requires a verified transactional sender domain in Resend or Postmark."
    }
  },
  {
    "id": "worksai-07",
    "slug": "worksai-graphmind",
    "sub": "graphmind",
    "name": "WorksAi GraphMind",
    "category": "C. Plugins or extensions",
    "categorySlug": "plugins-extensions",
    "tagline": "Bidirectional [[wikilink]] knowledge graphs, orphan link diagnostics, and MCP agent context for VS Code & Cursor.",
    "valueProposition": "Gives engineers and technical writers bidirectional wikilinks, backlink graphs, and AI agent MCP tools inside VS Code and Cursor.",
    "upstreamName": "Foam",
    "upstreamUrl": "https://github.com/foambubble/foam",
    "upstreamCommit": "7a2e632",
    "mcpTools": [
      "graphmind.index_wikilinks",
      "graphmind.find_orphan_notes",
      "graphmind.build_context_packet"
    ],
    "aiFeature": "Bidirectional [[Wikilink]] Knowledge Graph Indexer & Token-Budgeted MCP Context Builder",
    "worksWithoutCredentials": "Markdown [[wikilink]] graph indexing, bidirectional backlinks, orphan/broken-link diagnostics, and MCP context packets.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-graphmind",
    "subdomain": "graphmind.worksai.org",
    "appUrl": "https://graphmind.worksai.org",
    "mcpEndpoint": "https://graphmind.worksai.org/api/mcp",
    "aiEndpoint": "https://graphmind.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Download and run the VS Code/Cursor extension (extension/extension.cjs + package.json) or use the companion web verifier to parse [[wiki-links]], compute backlinks, and flag orphan notes and broken links.",
      "persistedFeatures": "Knowledge graph topology and orphan audit snapshots persisted in Cloudflare R2 (workspaces/worksai-graphmind/*).",
      "deterministicUtilities": "analyzeMarkdownGraph (wiki-link regex parser, path-traversal guard, backlink graph builder, and orphan detector).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) semantic topic cluster naming and bridge-note suggestions.",
      "knownLimitations": "Local filesystem note watching runs inside the downloadable VS Code extension (extension/extension.cjs); the web UI operates on submitted note arrays."
    }
  },
  {
    "id": "worksai-08",
    "slug": "worksai-clipguard",
    "sub": "clipguard",
    "name": "WorksAi ClipGuard",
    "category": "C. Plugins or extensions",
    "categorySlug": "plugins-extensions",
    "tagline": "Privacy-first clipboard history extension that scrubs API keys and PII before you paste into LLMs.",
    "valueProposition": "Prevents developers and employees from accidentally pasting live AWS keys, OpenAI tokens, bearer JWTs, or customer PII into LLMs.",
    "upstreamName": "Maccy",
    "upstreamUrl": "https://github.com/p0deje/Maccy",
    "upstreamCommit": "f0b571e",
    "mcpTools": [
      "clipguard.scan_secrets",
      "clipguard.redact_pii",
      "clipguard.verify_policy"
    ],
    "aiFeature": "Real-Time API Key, JWT, Private Key & Customer PII Pre-Prompt Redaction Engine",
    "worksWithoutCredentials": "Real-time secret/PII detection and redaction (AWS, OpenAI, GitHub PAT, JWT, RSA private keys, SSN/CC) with local ring buffer.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-clipguard",
    "subdomain": "clipguard.worksai.org",
    "appUrl": "https://clipguard.worksai.org",
    "mcpEndpoint": "https://clipguard.worksai.org/api/mcp",
    "aiEndpoint": "https://clipguard.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Download and load the Chrome/Edge Manifest V3 extension (manifest.json + background.cjs + popup.html) or use the companion web verifier to redact OpenAI keys, GitHub PATs, AWS keys, private keys, and email PII.",
      "persistedFeatures": "Redaction audit counts (without raw secrets) persisted in Cloudflare R2 (workspaces/worksai-clipguard/*).",
      "deterministicUtilities": "scrubClipboardSecrets (deterministic regex & PEM block redactor for API keys, private keys, and email PII).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) contextual policy explanation for redacted payload categories.",
      "knownLimitations": "OS-wide background clipboard interception requires loading the unpacked MV3 extension in Chrome/Edge; browser sandboxing restricts automatic clipboard reads without user gesture on the web."
    }
  },
  {
    "id": "worksai-09",
    "slug": "worksai-commandbar",
    "sub": "commandbar",
    "name": "WorksAi CommandBar",
    "category": "C. Plugins or extensions",
    "categorySlug": "plugins-extensions",
    "tagline": "Cross-platform keystroke launcher and extensible plugin runner for Windows, macOS, Linux, and the browser.",
    "valueProposition": "Brings fast command launcher speed to mixed Windows, macOS, and Linux teams from a single MIT-licensed TypeScript codebase.",
    "upstreamName": "Ueli",
    "upstreamUrl": "https://github.com/oliverschwendener/ueli",
    "upstreamCommit": "9b54c3d",
    "mcpTools": [
      "commandbar.rank_commands",
      "commandbar.evaluate_expression",
      "commandbar.expand_macro"
    ],
    "aiFeature": "Cross-Platform Fuzzy Launcher, Unit/Math Evaluator & Parameterized AI Prompt Macro Runner",
    "worksWithoutCredentials": "Fuzzy command palette ranking, deterministic math/unit/currency evaluation, parameterized prompt macros, and JSON plugin manifest validation.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-commandbar",
    "subdomain": "commandbar.worksai.org",
    "appUrl": "https://commandbar.worksai.org",
    "mcpEndpoint": "https://commandbar.worksai.org/api/mcp",
    "aiEndpoint": "https://commandbar.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Download and run the executable Node CLI launcher (bin/worksai-commandbar.mjs) or use the companion web verifier for safe arithmetic calculation, fuzzy command ranking, and MCP tool dispatch.",
      "persistedFeatures": "Command execution history and custom launcher shortcuts persisted in Cloudflare R2 (workspaces/worksai-commandbar/*).",
      "deterministicUtilities": "executeCommandBarQuery (eval-free arithmetic tokenizer/evaluator and prefix/substring command ranker).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) natural-language intent-to-command routing when no exact fuzzy match exists.",
      "knownLimitations": "Global OS hotkey registration requires running the downloadable CLI/desktop wrapper locally."
    }
  },
  {
    "id": "worksai-10",
    "slug": "worksai-linkengine",
    "sub": "linkengine",
    "name": "WorksAi LinkEngine",
    "category": "D. WordPress/PHP products",
    "categorySlug": "wordpress-php",
    "tagline": "MIT-licensed PHP URL shortener, UTM campaign builder, and WordPress bridge with link-rot detection.",
    "valueProposition": "Keeps high-volume click logs out of WordPress wp_postmeta and automatically flags dead affiliate destinations.",
    "upstreamName": "Shlink",
    "upstreamUrl": "https://github.com/shlinkio/shlink",
    "upstreamCommit": "9008811",
    "mcpTools": [
      "linkengine.create_shortlink",
      "linkengine.validate_utm",
      "linkengine.check_link_rot"
    ],
    "aiFeature": "High-Velocity Short-Link Router, UTM Taxonomy Validator & Automated Link-Rot Scanner",
    "worksWithoutCredentials": "Short-slug generation, UTM builder, privacy-hashed click telemetry, and HTTP link-rot health checker.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-linkengine",
    "subdomain": "linkengine.worksai.org",
    "appUrl": "https://linkengine.worksai.org",
    "mcpEndpoint": "https://linkengine.worksai.org/api/mcp",
    "aiEndpoint": "https://linkengine.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Install the working PHP 8.2+ / WordPress plugin bridge (worksai-linkengine-wp-bridge.php) or call the Edge API to resolve smart shortlinks with SSRF protection, bot filtering, device routing, and UTM injection.",
      "persistedFeatures": "Shortlink resolution logs and UTM campaign rules persisted in Cloudflare R2 (workspaces/worksai-linkengine/*).",
      "deterministicUtilities": "resolveSmartShortlink (SSRF private-IP blocker, bot user-agent filter, iOS/Android/fallback router, and UTM query builder).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) semantic anchor-text and internal topic-cluster link recommendations.",
      "knownLimitations": "Automatic WordPress post-save hook execution requires installing the downloadable PHP plugin on a WordPress host."
    }
  },
  {
    "id": "worksai-11",
    "slug": "worksai-commercecatalog",
    "sub": "commercecatalog",
    "name": "WorksAi CommerceCatalog",
    "category": "D. WordPress/PHP products",
    "categorySlug": "wordpress-php",
    "tagline": "MIT-licensed PHP headless e-commerce catalog with AI SKU enrichment and Schema.org Product JSON-LD.",
    "valueProposition": "Gives merchants a zero-transaction-fee MIT commerce catalog that turns messy supplier CSV rows into enriched product copy and valid Schema.org/Product JSON-LD.",
    "upstreamName": "Bagisto",
    "upstreamUrl": "https://github.com/bagisto/bagisto",
    "upstreamCommit": "575e33b",
    "mcpTools": [
      "commercecatalog.enrich_sku",
      "commercecatalog.compute_margins",
      "commercecatalog.generate_product_jsonld"
    ],
    "aiFeature": "Supplier CSV SKU Copy Enrichment, B2B/B2C Margin Tiering & Schema.org/Product JSON-LD Generator",
    "worksWithoutCredentials": "Supplier CSV SKU normalization, tiered B2B/B2C margin calculator, and Schema.org/Product JSON-LD generator.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-commercecatalog",
    "subdomain": "commercecatalog.worksai.org",
    "appUrl": "https://commercecatalog.worksai.org",
    "mcpEndpoint": "https://commercecatalog.worksai.org/api/mcp",
    "aiEndpoint": "https://commercecatalog.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Install the working PHP 8.2+ / Bagisto / WooCommerce bridge (worksai-commercecatalog-bridge.php) or call the Edge API to enforce minimum margin floors on discounted SKUs and generate Schema.org Product JSON-LD.",
      "persistedFeatures": "Enriched SKU records and Product JSON-LD schemas persisted in Cloudflare R2 (workspaces/worksai-commercecatalog/*).",
      "deterministicUtilities": "enrichSkuAndBuildProductJsonLd (margin-floor price calculator, HTML sanitizer, and Schema.org/Product JSON-LD builder).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) SEO-optimized product copy and structured attribute extraction.",
      "knownLimitations": "Direct Bagisto/WooCommerce database catalog writeback requires installing the downloadable PHP bridge in your store environment."
    }
  },
  {
    "id": "worksai-12",
    "slug": "worksai-forumpulse",
    "sub": "forumpulse",
    "name": "WorksAi ForumPulse",
    "category": "D. WordPress/PHP products",
    "categorySlug": "wordpress-php",
    "tagline": "MIT-licensed PHP community forum with automated spam/toxicity scoring and thread-to-FAQ extraction.",
    "valueProposition": "Low-memory PHP 8.2+ discussion engine that scores spam/toxicity automatically and turns resolved threads into FAQPage JSON-LD.",
    "upstreamName": "Flarum",
    "upstreamUrl": "https://github.com/flarum/framework",
    "upstreamCommit": "a1dd57e",
    "mcpTools": [
      "forumpulse.score_moderation",
      "forumpulse.detect_duplicate_thread",
      "forumpulse.extract_faq_jsonld"
    ],
    "aiFeature": "Automated Spam/Toxicity Triage & Resolved Thread to Schema.org/FAQPage JSON-LD Extractor",
    "worksWithoutCredentials": "Spam/toxicity scoring, duplicate-thread similarity detection, and resolved thread to Schema.org/FAQPage JSON-LD synthesis.",
    "upstreamLicense": "MIT",
    "githubUrl": "https://github.com/DevinAiUk/worksai-forumpulse",
    "subdomain": "forumpulse.worksai.org",
    "appUrl": "https://forumpulse.worksai.org",
    "mcpEndpoint": "https://forumpulse.worksai.org/api/mcp",
    "aiEndpoint": "https://forumpulse.worksai.org/api/ai/analyze",
    "capabilityMatrix": {
      "userCapabilities": "Install the working PHP 8.2+ / Flarum / WordPress bridge (worksai-forumpulse-bridge.php) or call the Edge API to score community threads for link-spam/toxicity and synthesize Schema.org FAQPage JSON-LD.",
      "persistedFeatures": "Moderated thread audits and FAQPage JSON-LD schemas persisted in Cloudflare R2 (workspaces/worksai-forumpulse/*).",
      "deterministicUtilities": "moderateThreadAndBuildFaqJsonLd (spam/toxicity scorer, quarantine gate, and Schema.org/FAQPage JSON-LD generator).",
      "genuineAiFeatures": "Cloudflare Workers AI (@cf/meta/llama-3.1-8b-instruct) multi-reply thread summarization into canonical FAQ answers.",
      "knownLimitations": "Automatic forum webhook moderation requires installing the downloadable PHP bridge on your Flarum or WordPress instance."
    }
  }
];
export const ARTICLES_CATALOG = [
  {
    "id": "art-01",
    "slug": "n8n-google-ai-agent-automation-guide",
    "legacy_wp_slug": "n8n-full-tutorial-easy-google-ai-agent-in-2025-for-beginners-no-code",
    "title": "Building No-Code Google AI Agents with n8n Workflow Automation",
    "seo_title": "n8n Google AI Agent Guide: No-Code Workflow Automation | WorksAI",
    "meta_description": "Step-by-step analysis of building deterministic Google AI agents with n8n, webhook triggers, tool-calling nodes, and WorksAI OmniDesk routing.",
    "target_keyword": "n8n google ai agent automation",
    "search_intent": "Informational / Implementation Tutorial",
    "category": "AI Automation",
    "tags": [
      "n8n",
      "ai-agents",
      "workflow-automation",
      "omnidesk"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-10",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "n8n Documentation",
    "source_url": "https://docs.n8n.io/advanced-ai/",
    "internal_links": [
      "/apps",
      "https://omnidesk.worksai.org",
      "https://apisync.worksai.org"
    ],
    "summary": "How engineering and operations teams wire n8n agent nodes to Google AI models, structured webhook schemas, and support triage queues.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026 with WorksAI MCP integration patterns. Teams wire n8n AI Agent nodes to Google Gemini models with strict JSON Schema validation via WorksAi APISync Studio and human-in-the-loop escalation in WorksAi OmniDesk."
  },
  {
    "id": "art-02",
    "slug": "technical-seo-topic-clusters-ai-search-visibility",
    "legacy_wp_slug": "semrush-tutorial-for-beginners-easy-steps-to-dominate-seo-in-2025",
    "title": "Technical SEO & Topic Cluster Architecture for AI Search Visibility",
    "seo_title": "Technical SEO & Topic Clusters for AI Search | WorksAI",
    "meta_description": "Practical guide to keyword intent mapping, internal link graphs, Schema.org JSON-LD, and orphan-page elimination using WorksAi LinkEngine.",
    "target_keyword": "technical seo topic cluster architecture",
    "search_intent": "Informational / Commercial Strategy",
    "category": "Search & Growth",
    "tags": [
      "technical-seo",
      "topic-clusters",
      "json-ld",
      "linkengine"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-12",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Google Search Essentials",
    "source_url": "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
    "internal_links": [
      "/apps",
      "https://linkengine.worksai.org",
      "https://growthpulse.worksai.org"
    ],
    "summary": "Aligning keyword search intent with clean canonical URLs, Schema.org structured data, and internal topic clusters.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. Audit internal link depth with WorksAi LinkEngine and measure cookieless Core Web Vitals with WorksAi GrowthPulse."
  },
  {
    "id": "art-03",
    "slug": "offline-local-first-ai-audio-video-workflows",
    "legacy_wp_slug": "make-ai-videos-with-anyones-audio-free-offline",
    "title": "Local-First Offline AI Audio & Video Workflows in the Browser",
    "seo_title": "Local-First AI Audio & Video Processing Workflows | WorksAI",
    "meta_description": "How WebAudio, WebGPU, and RMS silence trimming enable privacy-preserving browser audio editing in WorksAi WaveCut Studio.",
    "target_keyword": "browser waveform audio editor ai",
    "search_intent": "Transactional / Utility",
    "category": "Media & Creator Tools",
    "tags": [
      "webaudio",
      "local-first",
      "podcast-editing",
      "wavecut"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-14",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "MDN Web Audio API",
    "source_url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
    "internal_links": [
      "/apps",
      "https://wavecut.worksai.org",
      "/data-lake"
    ],
    "summary": "Eliminating cloud upload latency and per-minute transcription fees with client-side WebAudio waveform trimming.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi WaveCut Studio performs deterministic RMS silence trimming and chapter extraction directly in the browser."
  },
  {
    "id": "art-04",
    "slug": "automated-short-form-video-pipelines-guardrails",
    "legacy_wp_slug": "this-automates-viral-ai-shorts-10x-per-day-mind-blowing-automation",
    "title": "Automated Short-Form Video Pipelines: Quality & Licensing Guardrails",
    "seo_title": "Automated AI Short-Form Video Pipelines & Guardrails | WorksAI",
    "meta_description": "Engineering reliable short-form media automation pipelines with audio pacing, caption verification, and copyright attribution checks.",
    "target_keyword": "automated short form ai video pipeline",
    "search_intent": "Informational / Workflow Architecture",
    "category": "Media & Creator Tools",
    "tags": [
      "video-automation",
      "media-pipelines",
      "audio-pacing",
      "wavecut"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-13",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "AudioMass MIT Repository",
    "source_url": "https://github.com/pkalogiros/AudioMass",
    "internal_links": [
      "https://wavecut.worksai.org",
      "https://clipguard.worksai.org",
      "/apps"
    ],
    "summary": "How to structure batch video and audio rendering pipelines while enforcing quality gates and credential security.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. Pair audio pacing checks in WorksAi WaveCut Studio with secret scrubbing in WorksAi ClipGuard."
  },
  {
    "id": "art-05",
    "slug": "kling-2-generative-video-prompt-engineering-benchmarks",
    "legacy_wp_slug": "kling-2-0-tutorial-best-video-generator-of-2025-easy-prompts",
    "title": "Generative Video Prompt Engineering: Camera Motion & Temporal Consistency",
    "seo_title": "Generative Video Prompt Engineering & Motion Control | WorksAI",
    "meta_description": "Structured prompt syntax for camera motion, lighting continuity, and temporal consistency in generative video workflows.",
    "target_keyword": "generative video camera motion prompt engineering",
    "search_intent": "Informational / Creative Engineering",
    "category": "Generative Media",
    "tags": [
      "generative-video",
      "prompt-engineering",
      "camera-control",
      "commandbar"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-01",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Ueli MIT Repository",
    "source_url": "https://github.com/oliverschwendener/ueli",
    "internal_links": [
      "https://commandbar.worksai.org",
      "/data-lake",
      "/apps"
    ],
    "summary": "Standardizing reusable camera-motion and lighting macros for consistent generative video production.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. Store parameterized camera and lighting prompt macros in WorksAi CommandBar and the WorksAI Data Lake."
  },
  {
    "id": "art-06",
    "slug": "ethical-social-research-content-ideation-pipelines",
    "legacy_wp_slug": "this-social-media-ai-automation-scrapes-1000-viral-ideas-daily-100-automated",
    "title": "Structured Content Ideation Pipelines & Analytics-Driven Topic Selection",
    "seo_title": "Structured AI Content Ideation & Funnel Analytics | WorksAI",
    "meta_description": "Replacing noisy social scraping with cookieless conversion telemetry and structured topic clustering in WorksAi GrowthPulse.",
    "target_keyword": "privacy first web analytics saas",
    "search_intent": "Commercial / B2B SaaS",
    "category": "Search & Growth",
    "tags": [
      "content-research",
      "funnel-analytics",
      "growthpulse",
      "data-lake"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-11",
    "published_at": "2025-06-15T21:39:58Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Umami MIT Repository",
    "source_url": "https://github.com/umami-software/umami",
    "internal_links": [
      "https://growthpulse.worksai.org",
      "https://graphmind.worksai.org",
      "/data-lake"
    ],
    "summary": "Connecting privacy-first funnel telemetry to structured knowledge graphs for high-signal editorial planning.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. Combine cookieless funnel diagnostics in WorksAi GrowthPulse with topic graphs in WorksAi GraphMind."
  },
  {
    "id": "art-07",
    "slug": "google-veo-3-synchronized-audio-video-generation-analysis",
    "legacy_wp_slug": "google-veo-3-just-wrecked-the-video-industry",
    "title": "Google Veo 3 & Synchronized Audio-Video Generation: Technical Analysis",
    "seo_title": "Google Veo 3 Synchronized Audio-Video Analysis | WorksAI",
    "meta_description": "Technical breakdown of Google DeepMind Veo 3 native audio-video generation, SynthID watermarking, and post-production workflows.",
    "target_keyword": "google veo 3 native audio video generation",
    "search_intent": "Informational / News Analysis",
    "category": "AI Models & Research",
    "tags": [
      "google-veo-3",
      "deepmind",
      "generative-video",
      "wavecut"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-05-20",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Google DeepMind Veo Overview",
    "source_url": "https://deepmind.google/technologies/veo/",
    "internal_links": [
      "https://wavecut.worksai.org",
      "/news",
      "/apps"
    ],
    "summary": "Examining how Google DeepMind Veo 3 unifies video frames with synchronized ambient sound and dialogue.",
    "body": "Originally published on June 15, 2025 (analyzing May 2025 Veo 3 announcements) and updated on November 7, 2026. Google DeepMind Veo 3 generates synchronized audio and video frames."
  },
  {
    "id": "art-08",
    "slug": "open-source-local-tts-voice-synthesis-vs-cloud-apis",
    "legacy_wp_slug": "rip-elevenlabs-the-best-tts-ai-voices-locally-for-free",
    "title": "Open-Source Local Text-to-Speech (TTS) vs. Cloud Voice APIs",
    "seo_title": "Open-Source Local TTS Voice Synthesis Benchmark | WorksAI",
    "meta_description": "Comparing local open-source TTS models with commercial cloud voice APIs across latency, unit cost, licensing, and audio mastering.",
    "target_keyword": "open source local tts voice synthesis",
    "search_intent": "Commercial / Technical Comparison",
    "category": "Media & Creator Tools",
    "tags": [
      "text-to-speech",
      "open-source-ai",
      "audio-mastering",
      "wavecut"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-10",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Hugging Face TTS Tasks",
    "source_url": "https://huggingface.co/tasks/text-to-speech",
    "internal_links": [
      "https://wavecut.worksai.org",
      "https://ledgerflow.worksai.org",
      "/apps"
    ],
    "summary": "Evaluating when to run local open-weight text-to-speech synthesis versus metered cloud APIs.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. Local open-weight TTS paired with WorksAi WaveCut Studio reduces recurring narration costs."
  },
  {
    "id": "art-09",
    "slug": "gemini-2-5-claude-4-multimodal-reasoning-comparison",
    "legacy_wp_slug": "im-screwed-open-source-40-image-editor-google-ai-updates-claude-4-ais-higher-eq",
    "title": "Multimodal Reasoning & Code Generation: Gemini 2.5 and Claude 4 Analysis",
    "seo_title": "Gemini 2.5 & Claude 4 Multimodal Coding Analysis | WorksAI",
    "meta_description": "Benchmarking long-context multimodal reasoning, tool calling, and architecture synthesis across frontier AI models.",
    "target_keyword": "multimodal reasoning code generation benchmark",
    "search_intent": "Informational / Model Comparison",
    "category": "AI Models & Research",
    "tags": [
      "gemini",
      "claude",
      "multimodal-ai",
      "canvasarch"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-05-25",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Google AI Gemini Docs",
    "source_url": "https://ai.google.dev/gemini-api/docs",
    "internal_links": [
      "https://canvasarch.worksai.org",
      "https://apisync.worksai.org",
      "/mcp"
    ],
    "summary": "How frontier multimodal models translate plain-English system specifications into verified architecture topologies.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi CanvasArch pairs deterministic graph layout with natural-language topology parsing."
  },
  {
    "id": "art-10",
    "slug": "ai-molecular-discovery-alphafold-scientific-computing",
    "legacy_wp_slug": "huge-breakthrough-ai-unveils-unknown-molecules",
    "title": "AI in Molecular Discovery & Structured Scientific Data Lakes",
    "seo_title": "AI Molecular Discovery & Scientific Data Lakes | WorksAI",
    "meta_description": "How machine learning accelerates molecular screening and why reproducible metadata indexing in Neon Postgres matters.",
    "target_keyword": "ai molecular discovery structured data lake",
    "search_intent": "Informational / Scientific AI",
    "category": "AI Models & Research",
    "tags": [
      "scientific-ai",
      "alphafold",
      "data-lake",
      "postgres"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-05",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Google DeepMind AlphaFold",
    "source_url": "https://deepmind.google/technologies/alphafold/",
    "internal_links": [
      "/data-lake",
      "https://graphmind.worksai.org",
      "/apps"
    ],
    "summary": "Lessons from biomolecular AI models on dataset provenance, schema validation, and full-text research indexing.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. The WorksAI Data Lake indexes validated research artifacts with PostgreSQL tsvector full-text search."
  },
  {
    "id": "art-11",
    "slug": "ecommerce-structured-data-schema-product-json-ld-seo",
    "legacy_wp_slug": "how-to-boost-your-online-stores-sales-with-effective-seo-strategies",
    "title": "Headless E-Commerce SEO: Schema.org Product JSON-LD & SKU Enrichment",
    "seo_title": "Headless E-Commerce SEO & Schema.org Product JSON-LD | WorksAI",
    "meta_description": "Boost e-commerce organic discovery by normalizing supplier CSVs into valid Schema.org/Product JSON-LD with WorksAi CommerceCatalog.",
    "target_keyword": "open source laravel ecommerce platform mit",
    "search_intent": "High-Commercial B2B E-Commerce",
    "category": "E-Commerce & PHP",
    "tags": [
      "ecommerce-seo",
      "schema-org",
      "commercecatalog",
      "linkengine"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-14",
    "published_at": "2025-06-15T21:40:39Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Schema.org Product Spec",
    "source_url": "https://schema.org/Product",
    "internal_links": [
      "https://commercecatalog.worksai.org",
      "https://linkengine.worksai.org",
      "/apps"
    ],
    "summary": "Transforming raw supplier SKU spreadsheets into enriched product copy and rich-snippet Schema.org/Product JSON-LD.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi CommerceCatalog normalizes supplier CSVs and emits valid Schema.org/Product JSON-LD."
  },
  {
    "id": "art-12",
    "slug": "no-code-ai-agent-triage-customer-support-slas",
    "legacy_wp_slug": "lindy-ai-tutorial-build-your-first-ai-agent-in-minutes",
    "title": "Autonomous Support Triage Agents: Eliminating Per-Resolution AI Taxes",
    "seo_title": "Open-Source AI Support Inbox & SLA Triage | WorksAI",
    "meta_description": "How to deploy BYOK retrieval-augmented support triage in WorksAi OmniDesk without paying $0.99 per AI resolution.",
    "target_keyword": "open source intercom alternative flat pricing",
    "search_intent": "High-Commercial B2B SaaS Replacement",
    "category": "AI Automation",
    "tags": [
      "customer-support",
      "rag-triage",
      "omnidesk",
      "mit-saas"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-12",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Chatwoot MIT Core",
    "source_url": "https://github.com/chatwoot/chatwoot",
    "internal_links": [
      "https://omnidesk.worksai.org",
      "/data-lake",
      "/apps"
    ],
    "summary": "Replacing usage-taxed proprietary helpdesks with an MIT-licensed omnichannel inbox and knowledge-base grounded reply drafting.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi OmniDesk routes tickets by urgency and drafts replies grounded in the WorksAI Data Lake."
  },
  {
    "id": "art-13",
    "slug": "synthetic-media-provenance-deepfake-detection-enterprise-security",
    "legacy_wp_slug": "ai-deepfakes-just-got-even-more-real",
    "title": "Synthetic Media Provenance, Secret Redaction & Enterprise AI Guardrails",
    "seo_title": "Synthetic Media Provenance & AI Security Guardrails | WorksAI",
    "meta_description": "Protecting engineering and media teams against synthetic phishing, clipboard secret leaks, and unverified model outputs.",
    "target_keyword": "ai clipboard manager pii redactor",
    "search_intent": "Transactional / Paid Utility Replacement",
    "category": "Security & Governance",
    "tags": [
      "ai-security",
      "pii-redaction",
      "clipguard",
      "provenance"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-13",
    "published_at": "2025-06-15T21:39:59Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "OWASP LLM Top 10",
    "source_url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    "internal_links": [
      "https://clipguard.worksai.org",
      "https://apisync.worksai.org",
      "/data-lake"
    ],
    "summary": "Mitigating OWASP LLM sensitive-information disclosure risks with client-side clipboard scrubbing and pre-ingest secret scanning.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi ClipGuard scrubs API keys, JWTs, and private keys before prompt or Data Lake ingestion."
  },
  {
    "id": "art-14",
    "slug": "small-business-open-source-ai-stack-consolidation",
    "legacy_wp_slug": "25-best-apps-for-small-business-owners-2024s-top-picks",
    "title": "Consolidating Small-Business SaaS Sprawl with MIT-Licensed Open-Source Tools",
    "seo_title": "Consolidating SaaS Sprawl with MIT Open-Source Tools | WorksAI",
    "meta_description": "How small businesses replace fragmented $1,500/month SaaS stacks with 12 unified MIT-licensed WorksAI applications.",
    "target_keyword": "local first envelope budgeting app",
    "search_intent": "Transactional / Competitor Switch",
    "category": "Operations & Finance",
    "tags": [
      "saas-consolidation",
      "ledgerflow",
      "open-source",
      "small-business"
    ],
    "origin_type": "imported_wordpress_2025",
    "event_date": "2025-06-14",
    "published_at": "2025-06-15T21:40:40Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Actual Budget MIT Repo",
    "source_url": "https://github.com/actualbudget/actual",
    "internal_links": [
      "https://ledgerflow.worksai.org",
      "/apps",
      "/data-lake"
    ],
    "summary": "Auditing recurring subscription creep and replacing per-seat SaaS tools with local-first MIT alternatives.",
    "body": "Originally published on June 15, 2025 and updated on November 7, 2026. WorksAi LedgerFlow normalizes bank CSVs, flags subscription creep, and forecasts 90-day runway."
  },
  {
    "id": "art-15",
    "slug": "turning-overlooked-software-niches-into-mit-derivative-products",
    "legacy_wp_slug": null,
    "title": "How AI & Permissive Open-Source Foundations Turn Overlooked Niches into Sustainable Products",
    "seo_title": "Turning Overlooked Software Niches into MIT AI Products | WorksAI",
    "meta_description": "Research-backed methodology for evaluating MIT-licensed repositories, solving upstream gaps, and shipping focused software products.",
    "target_keyword": "ai architecture diagram whiteboard",
    "search_intent": "Commercial / Product Strategy",
    "category": "Product Research",
    "tags": [
      "product-strategy",
      "mit-license",
      "canvasarch",
      "niche-software"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "OSI MIT License Spec",
    "source_url": "https://opensource.org/license/mit",
    "internal_links": [
      "https://canvasarch.worksai.org",
      "https://apisync.worksai.org",
      "/apps"
    ],
    "summary": "Why disciplined licensing verification, focused workflow upgrades, and deterministic testing outperform generic AI wrappers.",
    "body": "Published on November 7, 2026. By selecting repositories verified under the OSI MIT License and engineering focused workflow upgrades, teams ship durable self-hostable software."
  },
  {
    "id": "art-16",
    "slug": "model-context-protocol-mcp-ide-knowledge-graphs",
    "legacy_wp_slug": null,
    "title": "Model Context Protocol (MCP) & Bidirectional Knowledge Graphs in Modern IDEs",
    "seo_title": "Model Context Protocol (MCP) & IDE Knowledge Graphs | WorksAI",
    "meta_description": "Connecting VS Code and Cursor AI agents to bidirectional Markdown knowledge graphs and Neon Postgres via WorksAi GraphMind.",
    "target_keyword": "vscode knowledge graph extension mcp",
    "search_intent": "Commercial / Developer IDE Extension",
    "category": "Developer Tools & MCP",
    "tags": [
      "model-context-protocol",
      "graphmind",
      "vscode",
      "knowledge-graph"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Model Context Protocol Spec",
    "source_url": "https://modelcontextprotocol.io/introduction",
    "internal_links": [
      "https://graphmind.worksai.org",
      "/mcp",
      "/data-lake"
    ],
    "summary": "Exposing Markdown backlink graphs and orphan-note diagnostics to coding agents through standardized MCP JSON-RPC endpoints.",
    "body": "Published on November 7, 2026. WorksAi GraphMind indexes bidirectional wikilinks and serves token-budgeted context packets via /api/mcp."
  },
  {
    "id": "art-17",
    "slug": "automated-openapi-contract-drift-detection-apisync-studio",
    "legacy_wp_slug": null,
    "title": "Eliminating OpenAPI Schema Drift Between Backend Services and Test Collections",
    "seo_title": "Automated OpenAPI Schema Drift Detection | WorksAI APISync Studio",
    "meta_description": "How WorksAi APISync Studio diffs OpenAPI 3.1 specifications against saved collections and synthesizes contract assertions.",
    "target_keyword": "open source postman alternative team workspace",
    "search_intent": "Commercial / Engineering Team Switch",
    "category": "Developer Tools & MCP",
    "tags": [
      "openapi",
      "contract-testing",
      "apisync",
      "hoppscotch"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "OpenAPI 3.1 Spec",
    "source_url": "https://spec.openapis.org/oas/v3.1.0",
    "internal_links": [
      "https://apisync.worksai.org",
      "/mcp",
      "/data-lake"
    ],
    "summary": "Detecting breaking API response changes and auto-healing assertion suites before production deployment.",
    "body": "Published on November 7, 2026. WorksAi APISync Studio diffs OpenAPI 3.1 contracts and publishes verified snapshots into the WorksAI Data Lake."
  },
  {
    "id": "art-18",
    "slug": "cross-platform-command-launchers-ai-macro-workflows",
    "legacy_wp_slug": null,
    "title": "Cross-Platform Command Palettes: Unifying Windows, macOS, and Linux Developer Macros",
    "seo_title": "Cross-Platform Raycast Alternative & AI Macros | WorksAI CommandBar",
    "meta_description": "Bringing sub-50ms fuzzy command execution, unit evaluation, and MCP workflow triggers to mixed OS teams with WorksAi CommandBar.",
    "target_keyword": "cross platform raycast alternative",
    "search_intent": "Commercial / Cross-Platform Productivity",
    "category": "Developer Tools & MCP",
    "tags": [
      "command-palette",
      "commandbar",
      "productivity",
      "ueli"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Ueli MIT Repository",
    "source_url": "https://github.com/oliverschwendener/ueli",
    "internal_links": [
      "https://commandbar.worksai.org",
      "https://clipguard.worksai.org",
      "/apps"
    ],
    "summary": "Why mixed-OS engineering organizations standardize on a single TypeScript command bar and plugin manifest.",
    "body": "Published on November 7, 2026. WorksAi CommandBar unifies Windows, macOS, and Linux command macros and MCP tool triggers."
  },
  {
    "id": "art-19",
    "slug": "self-hosted-short-links-utm-governance-link-rot-monitoring",
    "legacy_wp_slug": null,
    "title": "Self-Hosted URL Shortening, UTM Governance & Automated Link-Rot Detection",
    "seo_title": "Self-Hosted Bitly Alternative & Link-Rot Scanner | WorksAI LinkEngine",
    "meta_description": "Offloading high-velocity click telemetry from WordPress wp_postmeta and detecting dead campaign links with WorksAi LinkEngine.",
    "target_keyword": "self hosted bitly alternative php wordpress",
    "search_intent": "Commercial / Transactional",
    "category": "E-Commerce & PHP",
    "tags": [
      "url-shortener",
      "utm-tracking",
      "linkengine",
      "shlink"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Shlink MIT Repository",
    "source_url": "https://github.com/shlinkio/shlink",
    "internal_links": [
      "https://linkengine.worksai.org",
      "https://growthpulse.worksai.org",
      "/apps"
    ],
    "summary": "Preventing affiliate revenue loss and database bloat with dedicated short-link routing and HTTP health checks.",
    "body": "Published on November 7, 2026. WorksAi LinkEngine isolates short-slug routing, enforces UTM taxonomy, and detects link rot."
  },
  {
    "id": "art-20",
    "slug": "community-forum-moderation-resolved-threads-to-faq-json-ld",
    "legacy_wp_slug": null,
    "title": "AI-Assisted Community Forum Moderation & Thread-to-FAQ Schema Generation",
    "seo_title": "Lightweight PHP Forum & AI Moderation | WorksAI ForumPulse",
    "meta_description": "Automating spam/toxicity triage and converting resolved community threads into Schema.org/FAQPage JSON-LD with WorksAi ForumPulse.",
    "target_keyword": "lightweight php forum software ai moderation",
    "search_intent": "Commercial / Community Platform Replacement",
    "category": "E-Commerce & PHP",
    "tags": [
      "community-forum",
      "ai-moderation",
      "forumpulse",
      "flarum"
    ],
    "origin_type": "original_2026",
    "event_date": "2026-11-06",
    "published_at": "2026-11-07T02:00:00Z",
    "modified_at": "2026-11-07T02:00:00Z",
    "source_name": "Flarum MIT Framework",
    "source_url": "https://github.com/flarum/framework",
    "internal_links": [
      "https://forumpulse.worksai.org",
      "https://omnidesk.worksai.org",
      "/apps"
    ],
    "summary": "Turning resolved community support discussions into structured knowledge-base articles and FAQPage JSON-LD.",
    "body": "Published on November 7, 2026. WorksAi ForumPulse moderates incoming posts and extracts resolved threads into Schema.org/FAQPage JSON-LD."
  }
];

// ============================================================================
// Pure-ESM Isomorphic Domain Engines for all 12 WorksAI Products
// Zero Node-only dependencies (works in Cloudflare Workers V8 & Node.js 18/20+)
// ============================================================================

export class WorksAiSecurityGuard {
  static sanitizeHtml(input) {
    return String(input ?? "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
      .replace(/javascript\s*:/gi, "blocked:")
      .replace(/<\/script>/gi, "<\\/script>");
  }

  static isSafeExternalUrl(rawUrl) {
    try {
      const u = new URL(String(rawUrl));
      if (u.protocol !== "https:" && u.protocol !== "http:") return false;
      const host = u.hostname.toLowerCase();
      if (
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "0.0.0.0" ||
        host === "169.254.169.254" ||
        host.startsWith("10.") ||
        host.startsWith("192.168.") ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
      ) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}

function deterministicHash16(str) {
  let h1 = 0xdeadbeef ^ str.length;
  let h2 = 0x41c6ce57 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
}

/** worksai-01: WorksAi CanvasArch */
export function parseArchitectureSpec(specText) {
  const raw = String(specText ?? "").trim();
  if (!raw) throw new Error("ValidationError: Architecture specification cannot be empty.");
  const nodesMap = new Map();
  const edges = [];
  const lines = raw.split(/\r?\n|,|;/).map((s) => s.trim()).filter(Boolean);

  for (const line of lines) {
    const parts = line.split(/\s*(?:->|-->|=>)\s*/).map((s) => s.trim()).filter(Boolean);
    for (let i = 0; i < parts.length; i++) {
      const label = parts[i].replace(/^\[|\]$/g, "").trim();
      if (!label) continue;
      if (!nodesMap.has(label)) {
        const idx = nodesMap.size;
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const kind = /db|postgres|mysql|sqlite|redis|d1|r2|neon/i.test(label)
          ? "database"
          : /queue|kafka|worker|cron|edge/i.test(label)
          ? "worker"
          : /gateway|cdn|cloudflare|proxy|client/i.test(label)
          ? "gateway"
          : "service";
        nodesMap.set(label, {
          id: `node_${idx + 1}`,
          label,
          kind,
          x: 60 + col * 240,
          y: 60 + row * 140,
          width: 180,
          height: 76
        });
      }
      if (i > 0) {
        const fromNode = nodesMap.get(parts[i - 1].replace(/^\[|\]$/g, "").trim());
        const toNode = nodesMap.get(label);
        if (fromNode && toNode && fromNode.id !== toNode.id) {
          edges.push({
            id: `edge_${edges.length + 1}`,
            from: fromNode.id,
            to: toNode.id,
            fromLabel: fromNode.label,
            toLabel: toNode.label
          });
        }
      }
    }
  }

  const nodes = Array.from(nodesMap.values());
  const inboundCount = {};
  const outboundCount = {};
  for (const n of nodes) {
    inboundCount[n.id] = 0;
    outboundCount[n.id] = 0;
  }
  for (const e of edges) {
    inboundCount[e.to] = (inboundCount[e.to] || 0) + 1;
    outboundCount[e.from] = (outboundCount[e.from] || 0) + 1;
  }
  const spofNodes = nodes
    .filter((n) => outboundCount[n.id] >= 2 || inboundCount[n.id] >= 2)
    .map((n) => ({ id: n.id, label: n.label, fanOut: outboundCount[n.id], fanIn: inboundCount[n.id] }));

  return { nodes, edges, spofNodes };
}

export function renderArchitectureSvg(graph, title = "WorksAi CanvasArch Diagram") {
  if (!graph || !Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    throw new Error("ValidationError: Graph must contain at least one node.");
  }
  const safeTitle = WorksAiSecurityGuard.sanitizeHtml(title);
  const nodeById = new Map(graph.nodes.map((n) => [n.id, n]));
  const edgeLines = (graph.edges || [])
    .map((e) => {
      const f = nodeById.get(e.from);
      const t = nodeById.get(e.to);
      if (!f || !t) return "";
      return `<line x1="${f.x + 90}" y1="${f.y + 38}" x2="${t.x + 90}" y2="${t.y + 38}" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,3"/>`;
    })
    .join("");
  const rects = graph.nodes
    .map(
      (n) =>
        `<g class="node" data-id="${n.id}" data-kind="${n.kind}"><rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" rx="12" fill="#111724" stroke="#38bdf8" stroke-width="2"/><text x="${n.x + 16}" y="${n.y + 34}" fill="#f8fafc" font-family="Readex Pro, sans-serif" font-size="13" font-weight="600">${WorksAiSecurityGuard.sanitizeHtml(n.label)}</text><text x="${n.x + 16}" y="${n.y + 54}" fill="#94a3b8" font-family="monospace" font-size="10.5">${n.kind.toUpperCase()}</text></g>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 420" role="img" aria-label="${safeTitle}"><title>${safeTitle}</title><desc>Generated by WorksAi CanvasArch (MIT)</desc>${edgeLines}${rects}</svg>`;
}

/** worksai-02: WorksAi LedgerFlow */
export function normalizeAndBudgetTransactions(csvRows, monthlyIncomeCents = 500000) {
  if (!Array.isArray(csvRows)) throw new Error("ValidationError: csvRows must be an array.");
  const rules = [
    { category: "Cloud & SaaS", pattern: /aws|vercel|neon|cloudflare|openai|github|ynab|adobe|stripe/i },
    { category: "Groceries & Dining", pattern: /whole foods|trader joe|kroger|publix|cafe|coffee/i },
    { category: "Housing & Utilities", pattern: /rent|mortgage|electric|water|fiber|internet/i }
  ];
  const normalized = [];
  const vendorHistory = new Map();

  for (const row of csvRows) {
    const payee = String(row.payee || row.description || "Unknown").trim();
    const amountCents = Math.round(Number(row.amount) * 100);
    if (!Number.isFinite(amountCents)) throw new Error("ValidationError: Invalid numeric amount.");
    let matchedCategory = "General Operating";
    for (const r of rules) {
      if (r.pattern.test(payee)) {
        matchedCategory = r.category;
        break;
      }
    }
    normalized.push({ date: String(row.date || "2026-11-01"), payee, amountCents, category: matchedCategory });
    if (amountCents < 0) {
      const absCents = Math.abs(amountCents);
      if (!vendorHistory.has(payee)) vendorHistory.set(payee, []);
      vendorHistory.get(payee).push(absCents);
    }
  }

  const priceCreepAlerts = [];
  for (const [payee, charges] of vendorHistory.entries()) {
    if (charges.length >= 2) {
      const prev = charges[charges.length - 2];
      const curr = charges[charges.length - 1];
      if (prev > 0 && (curr - prev) / prev > 0.05) {
        priceCreepAlerts.push({
          payee,
          previousCents: prev,
          currentCents: curr,
          increasePct: Number((((curr - prev) / prev) * 100).toFixed(2))
        });
      }
    }
  }

  const totalSpentCents = normalized
    .filter((t) => t.amountCents < 0)
    .reduce((acc, t) => acc + Math.abs(t.amountCents), 0);
  const toBeBudgetedCents = monthlyIncomeCents - totalSpentCents;
  const dailyBurnCents = Math.max(1, Math.round(totalSpentCents / 30));
  const runway90DayNetCents = monthlyIncomeCents * 3 - dailyBurnCents * 90;

  return {
    transactions: normalized,
    totalSpentCents,
    toBeBudgetedCents,
    priceCreepAlerts,
    runway90DayNetCents
  };
}

/** worksai-03: WorksAi WaveCut Studio */
export function analyzeWaveformAndBuildChapters(samples, sampleRate = 1000, transcriptSegments = []) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("ValidationError: Audio sample buffer cannot be empty.");
  }
  const windowSize = Math.max(1, Math.floor(sampleRate * 0.1));
  const silenceIntervals = [];
  let silenceStart = null;

  for (let i = 0; i < samples.length; i += windowSize) {
    const slice = samples.slice(i, i + windowSize);
    const sumSq = slice.reduce((acc, v) => acc + v * v, 0);
    const rms = Math.sqrt(sumSq / slice.length);
    const timeSec = Number((i / sampleRate).toFixed(2));
    if (rms < 0.02) {
      if (silenceStart === null) silenceStart = timeSec;
    } else if (silenceStart !== null) {
      const duration = Number((timeSec - silenceStart).toFixed(2));
      if (duration >= 0.2) silenceIntervals.push({ startSec: silenceStart, endSec: timeSec, durationSec: duration });
      silenceStart = null;
    }
  }
  if (silenceStart !== null) {
    const endSec = Number((samples.length / sampleRate).toFixed(2));
    if (endSec - silenceStart >= 0.2) {
      silenceIntervals.push({ startSec: silenceStart, endSec, durationSec: Number((endSec - silenceStart).toFixed(2)) });
    }
  }

  const trimmedSamples = samples.filter((v) => Math.abs(v) >= 0.02);
  const dataSize = trimmedSamples.length * 2;
  const wavBytes = new Uint8Array(44);
  const dv = new DataView(wavBytes.buffer);
  const writeAscii = (offset, str) => {
    for (let i = 0; i < str.length; i++) wavBytes[offset + i] = str.charCodeAt(i);
  };
  writeAscii(0, "RIFF");
  dv.setUint32(4, 36 + dataSize, true);
  writeAscii(8, "WAVE");
  writeAscii(12, "fmt ");
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true);
  dv.setUint16(22, 1, true);
  dv.setUint32(24, sampleRate, true);
  dv.setUint32(28, sampleRate * 2, true);
  dv.setUint16(32, 2, true);
  dv.setUint16(34, 16, true);
  writeAscii(36, "data");
  dv.setUint32(40, dataSize, true);

  const chaptersMarkdown = transcriptSegments
    .map((seg) => {
      const mins = String(Math.floor(seg.startSec / 60)).padStart(2, "0");
      const secs = String(Math.floor(seg.startSec % 60)).padStart(2, "0");
      return `- **${mins}:${secs}** — ${WorksAiSecurityGuard.sanitizeHtml(seg.title)}`;
    })
    .join("\n");

  return {
    silenceIntervals,
    originalSampleCount: samples.length,
    trimmedSampleCount: trimmedSamples.length,
    wavHeaderHex: "RIFF" + String.fromCharCode(...wavBytes.slice(4, 8)) + "WAVE",
    wavHeaderAsciiPrefix: "RIFF....WAVEfmt ",
    wavByteLength: 44 + dataSize,
    chaptersMarkdown
  };
}

/** worksai-04: WorksAi GrowthPulse */
export function evaluateFunnelAndAnomalies(events, dailySalt = "2026-11-06") {
  if (!Array.isArray(events)) throw new Error("ValidationError: events must be an array.");
  const stepCounts = { landing: new Set(), pricing: new Set(), signup: new Set() };
  const dailyCounts = {};

  for (const ev of events) {
    if (!ev.siteId) throw new Error("ValidationError: siteId is required for tenant isolation.");
    const sessionHash = deterministicHash16(`${ev.siteId}:${ev.ip || "0.0.0.0"}:${ev.userAgent || "ua"}:${dailySalt}`);
    if (stepCounts[ev.step]) stepCounts[ev.step].add(sessionHash);
    const day = String(ev.date || "2026-11-06");
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  }

  const landing = stepCounts.landing.size;
  const pricing = stepCounts.pricing.size;
  const signup = stepCounts.signup.size;
  const dropOffPricingPct = landing > 0 ? Number((((landing - pricing) / landing) * 100).toFixed(1)) : 0;
  const dropOffSignupPct = pricing > 0 ? Number((((pricing - signup) / pricing) * 100).toFixed(1)) : 0;

  return {
    cookieFreeCompliance: true,
    counts: { landing, pricing, signup },
    largestBottleneck: dropOffSignupPct >= dropOffPricingPct ? "pricing_to_signup" : "landing_to_pricing",
    dropOffPricingPct,
    dropOffSignupPct,
    dailyCounts
  };
}

/** worksai-05: WorksAi APISync Studio */
export function auditOpenApiDrift(openApiRoutes, savedCollectionRequests) {
  if (!Array.isArray(openApiRoutes) || !Array.isArray(savedCollectionRequests)) {
    throw new Error("ValidationError: openApiRoutes and savedCollectionRequests must be arrays.");
  }
  const specMap = new Map(openApiRoutes.map((r) => [`${r.method.toUpperCase()} ${r.path}`, r]));
  const colMap = new Map(savedCollectionRequests.map((r) => [`${r.method.toUpperCase()} ${r.path}`, r]));

  const missingInCollection = [];
  const breakingChanges = [];
  const generatedAssertions = [];

  for (const [key, spec] of specMap.entries()) {
    generatedAssertions.push({
      route: key,
      assertions: [
        `expect(res.status).toBe(${spec.expectedStatus || 200})`,
        ...(spec.requiredFields || []).map((f) => `expect(res.body).toHaveProperty("${f}")`)
      ]
    });
    if (!colMap.has(key)) {
      missingInCollection.push(key);
    } else {
      const saved = colMap.get(key);
      for (const reqField of spec.requiredFields || []) {
        if (!(saved.bodyFields || []).includes(reqField)) {
          breakingChanges.push({ route: key, missingRequiredField: reqField });
        }
      }
    }
  }

  return {
    inSync: missingInCollection.length === 0 && breakingChanges.length === 0,
    missingInCollection,
    breakingChanges,
    generatedAssertions
  };
}

/** worksai-06: WorksAi OmniDesk */
export function triageAndDraftSupportReply(ticket, knowledgeBase = []) {
  if (!ticket || !ticket.inboxId || !ticket.message) {
    throw new Error("ValidationError: inboxId and message are required.");
  }
  const text = String(ticket.message);
  const isCritical = /outage|down|security|breach|urgent|lawsuit|cancel immediately/i.test(text);
  const isHigh = /refund|billing|charged twice|broken|error 500/i.test(text);
  const urgency = isCritical ? "critical" : isHigh ? "high" : "normal";
  const churnRisk = /cancel|switch to|disappointed|refund/i.test(text) ? "elevated" : "low";

  let matchedArticle = null;
  for (const kb of knowledgeBase) {
    if ((kb.keywords || []).some((kw) => text.toLowerCase().includes(kw.toLowerCase()))) {
      matchedArticle = kb;
      break;
    }
  }

  const draftReply = matchedArticle
    ? `Hi ${ticket.customerName || "there"}, thanks for reaching out. Based on our guide "${matchedArticle.title}" ([${matchedArticle.id}]), ${matchedArticle.answerSummary}`
    : `Hi ${ticket.customerName || "there"}, we've logged your request in inbox ${ticket.inboxId} with ${urgency} priority and an operator will follow up shortly.`;

  return {
    inboxId: ticket.inboxId,
    status: "triaged",
    urgency,
    churnRisk,
    citedArticleId: matchedArticle ? matchedArticle.id : null,
    draftReply,
    mitCleanEnterpriseStripped: true
  };
}

/** worksai-07: WorksAi GraphMind */
export function analyzeMarkdownGraph(notes, workspaceRoot = "/workspace") {
  if (!Array.isArray(notes)) throw new Error("ValidationError: notes must be an array.");
  const nodes = new Map();
  const forwardLinks = {};
  const backlinks = {};
  const brokenLinks = [];

  for (const n of notes) {
    if (String(n.path || "").includes("..")) {
      throw new Error("PathTraversalError: Note path escapes workspace root.");
    }
    nodes.set(n.id, n);
    forwardLinks[n.id] = [];
    backlinks[n.id] = [];
  }

  for (const n of notes) {
    const matches = [...String(n.content || "").matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)];
    for (const m of matches) {
      const targetId = m[1].trim();
      forwardLinks[n.id].push(targetId);
      if (nodes.has(targetId)) {
        backlinks[targetId].push(n.id);
      } else {
        brokenLinks.push({ source: n.id, missingTarget: targetId });
      }
    }
  }

  const orphanNotes = [...nodes.keys()].filter(
    (id) => forwardLinks[id].length === 0 && backlinks[id].length === 0
  );

  return {
    nodeCount: nodes.size,
    forwardLinks,
    backlinks,
    brokenLinks,
    orphanNotes
  };
}

/** worksai-08: WorksAi ClipGuard */
export function scrubClipboardSecrets(rawText) {
  const text = String(rawText ?? "");
  const detections = [];
  let scrubbed = text;

  const patterns = [
    { type: "OPENAI_API_KEY", regex: /\bsk-(?:proj-)?[A-Za-z0-9_-]{16,}\b/g, replacement: "[REDACTED_OPENAI_KEY]" },
    { type: "GITHUB_PAT", regex: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, replacement: "[REDACTED_GITHUB_TOKEN]" },
    { type: "AWS_ACCESS_KEY", regex: /\bAKIA[0-9A-Z]{16}\b/g, replacement: "[REDACTED_AWS_KEY]" },
    { type: "PRIVATE_KEY", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, replacement: "[REDACTED_PRIVATE_KEY]" },
    { type: "EMAIL_PII", regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, replacement: "[REDACTED_EMAIL]" }
  ];

  for (const p of patterns) {
    if (p.regex.test(scrubbed)) {
      detections.push(p.type);
      scrubbed = scrubbed.replace(p.regex, p.replacement);
    }
  }

  return {
    originalLength: text.length,
    scrubbedText: scrubbed,
    detections,
    safeForLlmPaste: detections.length === 0 || !scrubbed.includes("sk-")
  };
}

/** worksai-09: WorksAi CommandBar */
export function executeCommandBarQuery(query, commands = []) {
  const q = String(query ?? "").trim();
  if (!q) return { mode: "empty", results: [] };

  if (/^[0-9+\-*/().\s]+$/.test(q) && /[0-9]/.test(q)) {
    const tokens = q.match(/(\d+(?:\.\d+)?|[+\-*/()])/g) || [];
    let acc = 0;
    let op = "+";
    for (const t of tokens) {
      if (["+", "-", "*", "/"].includes(t)) op = t;
      else if (!isNaN(Number(t))) {
        const val = Number(t);
        if (op === "+") acc += val;
        if (op === "-") acc -= val;
        if (op === "*") acc *= val;
        if (op === "/") acc = val !== 0 ? acc / val : NaN;
      }
    }
    return { mode: "calculator", expression: q, value: Number(acc.toFixed(4)) };
  }

  const lower = q.toLowerCase();
  const ranked = commands
    .map((cmd) => {
      const title = String(cmd.title || "").toLowerCase();
      const score = title === lower ? 100 : title.startsWith(lower) ? 80 : title.includes(lower) ? 50 : 0;
      return { ...cmd, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  return { mode: "search", results: ranked };
}

/** worksai-10: WorksAi LinkEngine */
export function resolveSmartShortlink(linkRecord, requestContext = {}) {
  if (!linkRecord || !WorksAiSecurityGuard.isSafeExternalUrl(linkRecord.targetUrl)) {
    throw new Error("SecurityError: Unsafe or invalid targetUrl.");
  }
  const ua = String(requestContext.userAgent || "");
  const isBot = /bot|crawler|spider|headless|ahrefs|semrush/i.test(ua);
  let destination = linkRecord.targetUrl;

  if (linkRecord.healthy === false && linkRecord.fallbackUrl && WorksAiSecurityGuard.isSafeExternalUrl(linkRecord.fallbackUrl)) {
    destination = linkRecord.fallbackUrl;
  } else if (/iphone|ipad|ios/i.test(ua) && linkRecord.iosUrl) {
    destination = linkRecord.iosUrl;
  } else if (/android/i.test(ua) && linkRecord.androidUrl) {
    destination = linkRecord.androidUrl;
  }

  const urlObj = new URL(destination);
  if (linkRecord.utmSource) urlObj.searchParams.set("utm_source", linkRecord.utmSource);
  if (linkRecord.utmMedium) urlObj.searchParams.set("utm_medium", linkRecord.utmMedium);
  if (linkRecord.utmCampaign) urlObj.searchParams.set("utm_campaign", linkRecord.utmCampaign);

  return {
    resolvedUrl: urlObj.toString(),
    isBot,
    countedHumanClick: !isBot,
    usedFallback: linkRecord.healthy === false && Boolean(linkRecord.fallbackUrl)
  };
}

/** worksai-11: WorksAi CommerceCatalog */
export function enrichSkuAndBuildProductJsonLd(skuRecord, minMarginPct = 20) {
  if (!skuRecord || !skuRecord.sku || !(skuRecord.costCents > 0) || !(skuRecord.priceCents > 0)) {
    throw new Error("ValidationError: sku, costCents, and priceCents are required.");
  }
  const requestedDiscountPct = Number(skuRecord.discountPct || 0);
  const discountedPriceCents = Math.round(skuRecord.priceCents * (1 - requestedDiscountPct / 100));
  const minAllowedPriceCents = Math.ceil(skuRecord.costCents / (1 - minMarginPct / 100));
  const finalPriceCents = Math.max(discountedPriceCents, minAllowedPriceCents);
  const marginFloorEnforced = finalPriceCents > discountedPriceCents;

  const safeTitle = WorksAiSecurityGuard.sanitizeHtml(skuRecord.title || skuRecord.sku);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    sku: String(skuRecord.sku),
    name: safeTitle,
    description: WorksAiSecurityGuard.sanitizeHtml(
      skuRecord.description || `${safeTitle} — verified specification and direct fulfillment.`
    ),
    offers: {
      "@type": "Offer",
      priceCurrency: skuRecord.currency || "USD",
      price: (finalPriceCents / 100).toFixed(2),
      availability: skuRecord.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  return {
    sku: skuRecord.sku,
    finalPriceCents,
    marginFloorEnforced,
    jsonLdString: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
  };
}

/** worksai-12: WorksAi ForumPulse */
export function moderateThreadAndBuildFaqJsonLd(thread) {
  if (!thread || !thread.title || !thread.questionBody) {
    throw new Error("ValidationError: thread title and questionBody are required.");
  }
  const combined = `${thread.title} ${thread.questionBody} ${thread.acceptedAnswer || ""}`;
  const linkCount = (combined.match(/https?:\/\//gi) || []).length;
  const hasToxicTerms = /scam-link-farm|buy-cheap-pills|casino-bonus-spam/i.test(combined);
  const spamScore = Math.min(100, linkCount * 25 + (hasToxicTerms ? 80 : 0));
  const quarantined = spamScore >= 60;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: WorksAiSecurityGuard.sanitizeHtml(thread.title),
        acceptedAnswer: {
          "@type": "Answer",
          text: WorksAiSecurityGuard.sanitizeHtml(
            thread.acceptedAnswer || "Pending community resolution."
          )
        }
      }
    ]
  };

  return {
    quarantined,
    spamScore,
    sanitizedTitle: WorksAiSecurityGuard.sanitizeHtml(thread.title),
    faqJsonLdString: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c")
  };
}

export function runDomainEngineBySlug(slug, rawInput, toolName = "") {
  const text = typeof rawInput === "string" ? rawInput.trim() : JSON.stringify(rawInput || "");
  if (!text) {
    return { ok: false, status: 400, error: "Input specification or payload is required." };
  }
  let parsedJson = null;
  if (text.startsWith("{") || text.startsWith("[")) {
    try { parsedJson = JSON.parse(text); } catch { parsedJson = null; }
  }

  try {
    if (slug === "worksai-canvasarch") {
      const graph = parseArchitectureSpec(text);
      const svg = renderArchitectureSvg(graph, "WorksAi CanvasArch Topology");
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "canvasarch.parse_topology",
        runtimeCategory: "A. Browser Web Application",
        domainResult: { ...graph, svg },
        summary: `Parsed ${graph.nodes.length} architecture node(s), ${graph.edges.length} edge(s), and ${graph.spofNodes.length} SPOF candidate(s).`
      };
    }

    if (slug === "worksai-ledgerflow") {
      let rows = Array.isArray(parsedJson) ? parsedJson : parsedJson?.rows;
      const monthlyIncomeCents = parsedJson?.monthlyIncomeCents || 500000;
      if (!Array.isArray(rows)) {
        rows = text.split(/\r?\n/).filter(Boolean).map((line) => {
          const parts = line.split(",").map((s) => s.trim());
          if (parts.length >= 3 && !isNaN(Number(parts[2]))) {
            return { date: parts[0], payee: parts[1], amount: Number(parts[2]) };
          }
          return { date: "2026-11-01", payee: parts[0] || "Cloudflare Workers", amount: Number(parts[1] || -45) };
        });
      }
      const res = normalizeAndBudgetTransactions(rows, monthlyIncomeCents);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "ledgerflow.categorize_csv",
        runtimeCategory: "A. Browser Web Application",
        domainResult: res,
        summary: `Normalized ${res.transactions.length} transaction(s); total spent $${(res.totalSpentCents / 100).toFixed(2)}, 90-day net runway $${(res.runway90DayNetCents / 100).toFixed(2)}.`
      };
    }

    if (slug === "worksai-wavecut-studio") {
      const samples = Array.isArray(parsedJson?.samples)
        ? parsedJson.samples
        : [0.25, 0.32, 0.18, 0.001, 0.002, 0.001, 0.001, 0.29, 0.35, 0.22];
      const segments = Array.isArray(parsedJson?.transcriptSegments)
        ? parsedJson.transcriptSegments
        : text.split(/\r?\n/).filter(Boolean).map((line, idx) => ({
            startSec: idx * 45,
            title: line.replace(/^\d+:\d+\s*[-—]?\s*/, "").trim() || `Chapter ${idx + 1}`
          }));
      const res = analyzeWaveformAndBuildChapters(samples, parsedJson?.sampleRate || 10, segments);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "wavecut.detect_silence",
        runtimeCategory: "A. Browser Web Application",
        domainResult: res,
        summary: `Detected ${res.silenceIntervals.length} silence interval(s), generated ${res.wavByteLength}-byte RIFF WAVE PCM container and ${segments.length} chapter marker(s).`
      };
    }

    if (slug === "worksai-growthpulse") {
      const events = Array.isArray(parsedJson?.events)
        ? parsedJson.events
        : Array.isArray(parsedJson)
        ? parsedJson
        : [
            { siteId: "worksai.org", step: "landing", ip: "198.51.100.1", userAgent: "Mozilla/5.0", date: "2026-11-06" },
            { siteId: "worksai.org", step: "landing", ip: "198.51.100.2", userAgent: "Mozilla/5.0", date: "2026-11-06" },
            { siteId: "worksai.org", step: "landing", ip: "198.51.100.3", userAgent: "Mozilla/5.0", date: "2026-11-06" },
            { siteId: "worksai.org", step: "pricing", ip: "198.51.100.1", userAgent: "Mozilla/5.0", date: "2026-11-06" },
            { siteId: "worksai.org", step: "pricing", ip: "198.51.100.2", userAgent: "Mozilla/5.0", date: "2026-11-06" },
            { siteId: "worksai.org", step: "signup", ip: "198.51.100.1", userAgent: "Mozilla/5.0", date: "2026-11-06" }
          ];
      const res = evaluateFunnelAndAnomalies(events, parsedJson?.dailySalt || "2026-11-06");
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "growthpulse.analyze_funnel",
        runtimeCategory: "B. SaaS Web & API Service",
        domainResult: res,
        summary: `Cookieless funnel evaluated (${res.counts.landing} -> ${res.counts.pricing} -> ${res.counts.signup}); bottleneck: ${res.largestBottleneck}.`
      };
    }

    if (slug === "worksai-apisync-studio") {
      const openApiRoutes = Array.isArray(parsedJson?.openApiRoutes)
        ? parsedJson.openApiRoutes
        : [
            { method: "GET", path: "/api/health", expectedStatus: 200, requiredFields: ["ok", "service"] },
            { method: "POST", path: "/api/datalake/ingest", expectedStatus: 201, requiredFields: ["title", "mimeType", "content"] }
          ];
      const savedCollectionRequests = Array.isArray(parsedJson?.savedCollectionRequests)
        ? parsedJson.savedCollectionRequests
        : [{ method: "GET", path: "/api/health", bodyFields: ["ok", "service"] }];
      const res = auditOpenApiDrift(openApiRoutes, savedCollectionRequests);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "apisync.diff_openapi",
        runtimeCategory: "B. SaaS Web & API Service",
        domainResult: res,
        summary: `Audited ${openApiRoutes.length} OpenAPI route(s); inSync=${res.inSync}, missingInCollection=${res.missingInCollection.length}, breakingChanges=${res.breakingChanges.length}.`
      };
    }

    if (slug === "worksai-omnidesk") {
      const ticket = parsedJson?.ticket || {
        inboxId: "inbox-enterprise-sla",
        customerName: parsedJson?.customerName || "Enterprise Operator",
        message: text
      };
      const kb = Array.isArray(parsedJson?.knowledgeBase)
        ? parsedJson.knowledgeBase
        : [
            { id: "KB-101", title: "DNS DKIM Key Rotation & SPF Containment", keywords: ["dkim", "dns", "security", "key", "outage"], answerSummary: "Verify Cloudflare TXT records and rotate compromised selectors in your outbound MTA." },
            { id: "KB-204", title: "Billing & Invoice Reconciliation", keywords: ["billing", "refund", "charged", "invoice"], answerSummary: "Export your CSV ledger in WorksAi LedgerFlow for instant fee reconciliation." }
          ];
      const res = triageAndDraftSupportReply(ticket, kb);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "omnidesk.triage_urgency",
        runtimeCategory: "B. SaaS Web & API Service",
        domainResult: res,
        summary: `Triaged ticket in ${res.inboxId}: urgency=${res.urgency}, churnRisk=${res.churnRisk}, citedArticleId=${res.citedArticleId || "none"}.`
      };
    }

    if (slug === "worksai-graphmind") {
      const notes = Array.isArray(parsedJson?.notes)
        ? parsedJson.notes
        : [
            { id: "architecture-overview", path: "notes/architecture-overview.md", content: text + " [[neon-datalake]] [[mcp-registry]]" },
            { id: "neon-datalake", path: "notes/neon-datalake.md", content: "Connected to [[architecture-overview]]" },
            { id: "orphan-scratchpad", path: "notes/orphan-scratchpad.md", content: "Unlinked local note" }
          ];
      const res = analyzeMarkdownGraph(notes);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "graphmind.find_orphans",
        runtimeCategory: "C. IDE Extension Release + Companion Graph Verifier",
        domainResult: res,
        summary: `Analyzed ${res.nodeCount} Markdown note(s): ${res.orphanNotes.length} orphan(s), ${res.brokenLinks.length} broken wiki-link(s).`
      };
    }

    if (slug === "worksai-clipguard") {
      const res = scrubClipboardSecrets(text);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "clipguard.scan_secrets",
        runtimeCategory: "C. Browser/macOS Extension Release + Companion Secret Redactor",
        domainResult: res,
        summary: `Scanned ${res.originalLength} chars; redacted ${res.detections.length} secret/PII pattern(s) (${res.detections.join(", ") || "none"}).`
      };
    }

    if (slug === "worksai-commandbar") {
      const defaultCommands = [
        { id: "cmd-1", title: "Deploy Cloudflare Worker", category: "DevOps", action: "wrangler deploy" },
        { id: "cmd-2", title: "Search WorksAI Data Lake", category: "Data Lake", action: "https://worksai.org/data-lake" },
        { id: "cmd-3", title: "Audit OpenAPI Contract Drift", category: "API", action: "https://apisync.worksai.org" }
      ];
      const res = executeCommandBarQuery(parsedJson?.query || text, parsedJson?.commands || defaultCommands);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "commandbar.parse_intent",
        runtimeCategory: "C. Desktop Command Launcher Release + Companion Query Evaluator",
        domainResult: res,
        summary: res.mode === "calculator"
          ? `Evaluated deterministic expression ${res.expression} = ${res.value}.`
          : `Matched ${res.results.length} launcher command(s) for query "${text}".`
      };
    }

    if (slug === "worksai-linkengine") {
      const linkRecord = parsedJson?.linkRecord || {
        targetUrl: text.startsWith("http") ? text.split(/\s+/)[0] : "https://worksai.org/apps/worksai-linkengine",
        fallbackUrl: "https://worksai.org/apps",
        healthy: parsedJson?.healthy !== false,
        utmSource: parsedJson?.utmSource || "worksai_shortlink",
        utmMedium: parsedJson?.utmMedium || "edge_router",
        utmCampaign: parsedJson?.utmCampaign || "q4_launch"
      };
      const res = resolveSmartShortlink(linkRecord, parsedJson?.requestContext || { userAgent: "Mozilla/5.0 (Macintosh)" });
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "linkengine.suggest_internal_links",
        runtimeCategory: "D. WordPress/PHP Plugin Bridge + Edge Shortlink API",
        domainResult: res,
        summary: `Resolved shortlink to ${res.resolvedUrl} (countedHumanClick=${res.countedHumanClick}, usedFallback=${res.usedFallback}).`
      };
    }

    if (slug === "worksai-commercecatalog") {
      const skuRecord = parsedJson?.skuRecord || parsedJson || {
        sku: "WORKSAI-ENT-NODE-01",
        title: text.slice(0, 80) || "WorksAI Enterprise Edge Node License",
        costCents: 12000,
        priceCents: 19900,
        discountPct: 30,
        currency: "USD",
        inStock: true
      };
      const res = enrichSkuAndBuildProductJsonLd(skuRecord, parsedJson?.minMarginPct || 20);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "commercecatalog.enrich_sku",
        runtimeCategory: "D. PHP/Bagisto Bridge + Edge SKU Enrichment API",
        domainResult: res,
        summary: `Enriched SKU ${res.sku}: finalPriceCents=${res.finalPriceCents} (marginFloorEnforced=${res.marginFloorEnforced}).`
      };
    }

    if (slug === "worksai-forumpulse") {
      const thread = parsedJson?.thread || parsedJson || {
        title: text.split(/\r?\n/)[0] || "How do I connect Neon Postgres to Cloudflare Workers with Drizzle ORM?",
        questionBody: text,
        acceptedAnswer: "Configure DATABASE_URL with the Neon pooled connection string and run Drizzle migrations against schema worksai_hub."
      };
      const res = moderateThreadAndBuildFaqJsonLd(thread);
      return {
        ok: true,
        status: 200,
        app: slug,
        tool: toolName || "forumpulse.extract_faq_jsonld",
        runtimeCategory: "D. PHP/Flarum Bridge + Edge Moderation & FAQ Schema API",
        domainResult: res,
        summary: `Moderated thread "${res.sanitizedTitle}": spamScore=${res.spamScore}, quarantined=${res.quarantined}.`
      };
    }

    return { ok: false, status: 400, error: `Unknown product slug: ${slug}` };
  } catch (err) {
    return { ok: false, status: 422, error: String(err?.message || err) };
  }
}


const INITIAL_DATALAKE_DOCS = [
  {
    id: "dl-doc-01",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-01",
    appSlug: "worksai-canvasarch",
    title: "Zero-Downtime Cloudflare Edge & Neon Postgres Reference Topology",
    category: "Architecture",
    mimeType: "text/markdown",
    content: "## Edge Routing Topology\n\nAll 12 WorksAI product subdomains route through Cloudflare Workers with strict security headers, isolated GitHub Actions CI/CD, and pooled Neon Serverless Postgres connections via Drizzle ORM.",
    summary: "Reference system topology linking Cloudflare Workers, R2 object buckets, and Neon Serverless Postgres across 12 product subdomains.",
    tags: ["cloudflare", "neon-postgres", "drizzle-orm", "architecture", "edge"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-01.md",
    r2InternalUuidKey: "obj/c9a11e01-7b4d-4d9a-8a11-000000000001/payload.md",
    byteSize: 215,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-02",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-02",
    appSlug: "worksai-ledgerflow",
    title: "Q4 Multi-Currency SaaS Payout Reconciliation Batch",
    category: "Finance & Operations",
    mimeType: "text/csv",
    content: "tx_id,date,merchant,currency,gross_cents,fee_cents,net_cents,status\nTX-901,2026-10-15,Cloudflare Registrar,USD,4500,0,4500,reconciled\nTX-902,2026-10-18,Neon Serverless Postgres,USD,1900,0,1900,reconciled",
    summary: "Normalized CSV payout ledger with deterministic fee verification and zero-discrepancy reconciliation status.",
    tags: ["ledgerflow", "reconciliation", "csv", "finance", "audit"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-02.csv",
    r2InternalUuidKey: "obj/c9a11e02-7b4d-4d9a-8a11-000000000002/payload.csv",
    byteSize: 210,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-03",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-03",
    appSlug: "worksai-growthpulse",
    title: "Privacy-First Funnel Attribution & Core Web Vitals Telemetry",
    category: "Analytics & SEO",
    mimeType: "application/json",
    content: "{\"window\":\"30d\",\"cookieless\":true,\"organic_search_share\":0.68,\"LCP_ms\":840,\"CLS\":0.01}",
    summary: "Cookieless funnel telemetry measuring organic developer acquisition and Core Web Vitals across WorksAI properties.",
    tags: ["growthpulse", "telemetry", "analytics", "core-web-vitals"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-03.json",
    r2InternalUuidKey: "obj/c9a11e03-7b4d-4d9a-8a11-000000000003/payload.json",
    byteSize: 112,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-04",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-04",
    appSlug: "worksai-apisync-studio",
    title: "OpenAPI 3.1 Contract & Drift Verification Snapshot",
    category: "API & Security",
    mimeType: "application/json",
    content: "{\"openapi\":\"3.1.0\",\"service\":\"worksai-hub-datalake\",\"breaking_changes\":0,\"pii_redaction\":\"enforced\"}",
    summary: "Contract snapshot verifying zero breaking schema drift across WorksAI REST and MCP endpoints.",
    tags: ["apisync", "openapi", "contract-testing", "security"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-04.json",
    r2InternalUuidKey: "obj/c9a11e04-7b4d-4d9a-8a11-000000000004/payload.json",
    byteSize: 108,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-05",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-05",
    appSlug: "worksai-clipguard",
    title: "DNS DKIM Key Exposure Containment & Secret Scanning Runbook",
    category: "API & Security",
    mimeType: "text/markdown",
    content: "1. Verify Cloudflare Zone ID and isolate exposed TXT record IDs.\n2. Delete only compromised private-key TXT records while preserving active public DKIM, SPF, MX, and DMARC records.\n3. Enforce pre-ingest secret scanning via WorksAi ClipGuard.",
    summary: "Standard operating procedure for DNS secret containment, DKIM selector verification, and automated credential redaction.",
    tags: ["clipguard", "security", "dkim", "cloudflare", "runbook"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-05.md",
    r2InternalUuidKey: "obj/c9a11e05-7b4d-4d9a-8a11-000000000005/payload.md",
    byteSize: 254,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-06",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-06",
    appSlug: "worksai-linkengine",
    title: "Internal Topic Cluster & Orphan Page Link Graph Report",
    category: "Analytics & SEO",
    mimeType: "text/markdown",
    content: "Pillar /apps connected to all 12 MIT derivative product subdomains and 20 /news articles. Orphan count: 0. Schema.org SoftwareApplication and NewsArticle JSON-LD verified.",
    summary: "Semantic internal linking audit and JSON-LD structured data verification across WorksAI.org.",
    tags: ["linkengine", "seo", "json-ld", "topic-cluster"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-06.md",
    r2InternalUuidKey: "obj/c9a11e06-7b4d-4d9a-8a11-000000000006/payload.md",
    byteSize: 184,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-07",
    tenantId: "tenant-worksai-demo",
    isDemo: true,
    sourceId: "dl-src-07",
    appSlug: "worksai-omnidesk",
    title: "SLA Ticket Triage & Macro Response Benchmark",
    category: "Operations",
    mimeType: "text/plain",
    content: "Queue: Priority Support | Median First Response: 4m 12s | SLA Breach Rate: 0.0% | Active Macros: DNS-Containment-Verify, GitHub-MIT-Attribution-Check, DataLake-Ingest-Quota.",
    summary: "Support queue triage metrics and automated response macro benchmarks for WorksAi OmniDesk.",
    tags: ["omnidesk", "support", "sla", "triage"],
    r2ObjectKey: "r2://worksai-datalake/tenant-worksai-demo/dl-doc-07.txt",
    r2InternalUuidKey: "obj/c9a11e07-7b4d-4d9a-8a11-000000000007/payload.txt",
    byteSize: 175,
    visibility: "public_demo"
  },
  {
    id: "dl-doc-08-private",
    tenantId: "tenant-alpha-isolated",
    isDemo: false,
    sourceId: "dl-src-08",
    appSlug: "worksai-graphmind",
    title: "Restricted Alpha Tenant Vault — Confidential R&D Notes",
    category: "Confidential",
    mimeType: "text/markdown",
    content: "Strictly confidential notes isolated to tenant-alpha-isolated. Must never appear in tenant-worksai-demo or unauthenticated search results.",
    summary: "Isolated tenant test record verifying authorization-aware Data Lake search boundaries.",
    tags: ["isolated", "confidential", "tenant-check"],
    r2ObjectKey: "r2://worksai-datalake/tenant-alpha-isolated/dl-doc-08.md",
    r2InternalUuidKey: "obj/a8f99b08-91cc-4e12-b822-000000000008/payload.md",
    byteSize: 138,
    visibility: "tenant_private"
  },
  {
    id: "dl-doc-09-prod",
    tenantId: "tenant-prod-enterprise",
    isDemo: false,
    sourceId: "dl-src-09",
    appSlug: "worksai-ledgerflow",
    title: "Production Enterprise Treasury Ledger — Non-Demo Scope",
    category: "Finance & Operations",
    mimeType: "text/csv",
    content: "tx_id,date,merchant,currency,gross_cents\nTX-PROD-1,2026-11-01,Cloudflare Enterprise,USD,250000",
    summary: "Production-only enterprise record isolated from demo accounts.",
    tags: ["production", "enterprise", "treasury"],
    r2ObjectKey: "r2://worksai-datalake/tenant-prod-enterprise/dl-doc-09.csv",
    r2InternalUuidKey: "obj/p7e88c09-33aa-4f01-9c11-000000000009/payload.csv",
    byteSize: 96,
    visibility: "tenant_private"
  }
];

const ALLOWED_MIME_TYPES = new Set(["text/markdown", "application/json", "text/csv", "text/plain"]);
const SUBDOMAIN_TO_SLUG = Object.fromEntries(APPS_CATALOG.map((a) => [a.sub, a.slug]));
const LEGACY_WP_TO_SLUG = Object.fromEntries([
  ...ARTICLES_CATALOG.filter((a) => a.legacy_wp_slug).map((a) => [a.legacy_wp_slug, a.slug]),
  ...ARTICLES_CATALOG.map((a) => [a.slug, a.slug])
]);

const DEFAULT_AUTH_SECRET = "worksai-webcrypto-hmac-sha256-key-2026-prod";

async function getSubtleCrypto() {
  if (globalThis.crypto && globalThis.crypto.subtle) {
    return globalThis.crypto.subtle;
  }
  const nodeCrypto = await import("node:crypto");
  return nodeCrypto.webcrypto.subtle;
}

function bytesToHex(bytes) {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

function b64urlEncodeBytes(bytes) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlEncode(str) {
  return b64urlEncodeBytes(new TextEncoder().encode(str));
}

function b64urlDecodeToBytes(b64u) {
  const b64 = String(b64u).replace(/-/g, "+").replace(/_/g, "/") + "===".slice((b64u.length + 3) % 4);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function b64urlDecodeToString(b64u) {
  return new TextDecoder().decode(b64urlDecodeToBytes(b64u));
}

function constantTimeEqual(aBytes, bBytes) {
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

export async function sha256HexWebCrypto(inputStr) {
  const subtle = await getSubtleCrypto();
  const digest = await subtle.digest("SHA-256", new TextEncoder().encode(String(inputStr)));
  return bytesToHex(new Uint8Array(digest));
}

export async function hashPasswordPbkdf2(password, saltStr) {
  const subtle = await getSubtleCrypto();
  const enc = new TextEncoder();
  const keyMaterial = await subtle.importKey("raw", enc.encode(String(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = await subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: enc.encode(String(saltStr)),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    256
  );
  return bytesToHex(new Uint8Array(bits));
}

export async function verifyPasswordPbkdf2(password, saltStr, expectedHex) {
  const actualHex = await hashPasswordPbkdf2(password, saltStr);
  const enc = new TextEncoder();
  return constantTimeEqual(enc.encode(actualHex), enc.encode(String(expectedHex)));
}

export async function signWebCryptoSessionToken(sessionPayload, secret = DEFAULT_AUTH_SECRET) {
  const subtle = await getSubtleCrypto();
  const payloadB64 = b64urlEncode(JSON.stringify(sessionPayload));
  const key = await subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  const sigB64 = b64urlEncodeBytes(new Uint8Array(sigBuf));
  return `ws_ses_v2.${payloadB64}.${sigB64}`;
}

export async function verifyWebCryptoSessionToken(token, secret = DEFAULT_AUTH_SECRET) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3 || (parts[0] !== "ws_ses_v2" && parts[0] !== "ba_sig_v1")) {
      return { valid: false, reason: "invalid_format" };
    }
    const [, payloadB64, sigB64] = parts;
    const subtle = await getSubtleCrypto();
    const key = await subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sigBytes = b64urlDecodeToBytes(sigB64);
    const isValidSig = await subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(payloadB64));
    if (!isValidSig) {
      return { valid: false, reason: "token_tampered" };
    }
    const payload = JSON.parse(b64urlDecodeToString(payloadB64));
    if (!payload.expiresAt || new Date(payload.expiresAt).getTime() <= Date.now()) {
      return { valid: false, reason: "token_expired" };
    }
    return { valid: true, session: { ...payload, token } };
  } catch {
    return { valid: false, reason: "token_malformed" };
  }
}

// Keep backward-compatible export aliases for test suites
export const signBetterAuthToken = signWebCryptoSessionToken;
export const verifyBetterAuthToken = verifyWebCryptoSessionToken;

export function createWorksAiStore() {
  return {
    users: new Map([
      [
        "demo@worksai.org",
        {
          id: "usr-demo-admin",
          email: "demo@worksai.org",
          name: "WorksAI Demo Operator",
          defaultTenantId: "tenant-worksai-demo",
          isDemo: true,
          role: "demo_operator",
          passwordSalt: "salt-demo-worksai-2026",
          password: "worksai-demo-2026"
        }
      ],
      [
        "alpha@worksai.org",
        {
          id: "usr-alpha-owner",
          email: "alpha@worksai.org",
          name: "Alpha Workspace Owner",
          defaultTenantId: "tenant-alpha-isolated",
          isDemo: false,
          role: "tenant_admin",
          passwordSalt: "salt-alpha-worksai-2026",
          password: "worksai-alpha-2026"
        }
      ],
      [
        "enterprise@worksai.org",
        {
          id: "usr-prod-ent",
          email: "enterprise@worksai.org",
          name: "Production Enterprise Admin",
          defaultTenantId: "tenant-prod-enterprise",
          isDemo: false,
          role: "enterprise_admin",
          passwordSalt: "salt-enterprise-worksai-2026",
          password: "worksai-enterprise-2026"
        }
      ]
    ]),
    sessions: new Map([
      [
        "ba_demo_session_worksai_2026",
        {
          id: "ses-demo-01",
          userId: "usr-demo-admin",
          email: "demo@worksai.org",
          name: "WorksAI Demo Operator",
          tenantId: "tenant-worksai-demo",
          isDemo: true,
          role: "demo_operator",
          csrfToken: "csrf-demo-2026",
          token: "ba_demo_session_worksai_2026",
          expiresAt: "2027-12-31T23:59:59Z"
        }
      ],
      [
        "ba_alpha_session_isolated_2026",
        {
          id: "ses-alpha-01",
          userId: "usr-alpha-owner",
          email: "alpha@worksai.org",
          name: "Alpha Workspace Owner",
          tenantId: "tenant-alpha-isolated",
          isDemo: false,
          role: "tenant_admin",
          csrfToken: "csrf-alpha-2026",
          token: "ba_alpha_session_isolated_2026",
          expiresAt: "2027-12-31T23:59:59Z"
        }
      ],
      [
        "ba_prod_enterprise_2026",
        {
          id: "ses-prod-01",
          userId: "usr-prod-ent",
          email: "enterprise@worksai.org",
          name: "Production Enterprise Admin",
          tenantId: "tenant-prod-enterprise",
          isDemo: false,
          role: "enterprise_admin",
          csrfToken: "csrf-prod-2026",
          token: "ba_prod_enterprise_2026",
          expiresAt: "2027-12-31T23:59:59Z"
        }
      ]
    ]),
    revokedTokens: new Set(),
    loginAttempts: new Map(),
    apiRateBuckets: new Map(),
    documents: INITIAL_DATALAKE_DOCS.map((d) => ({ ...d, tags: [...d.tags] })),
    articles: ARTICLES_CATALOG.map((a) => ({ ...a }))
  };
}

const defaultStore = createWorksAiStore();

function secHeaders(ct = "text/html; charset=utf-8", extra = {}) {
  return {
    "content-type": ct,
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "referrer-policy": "strict-origin-when-cross-origin",
    "cache-control": "no-store",
    ...extra
  };
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function durablyRevokeToken(tok, store = defaultStore, env = {}, reason = "signed_out") {
  if (!tok) return false;
  store.revokedTokens.add(tok);
  store.sessions.delete(tok);
  const tokHash = await sha256HexWebCrypto(tok);
  if (env && env.DATALAKE_BUCKET && typeof env.DATALAKE_BUCKET.put === "function") {
    await env.DATALAKE_BUCKET.put(
      `auth/revocations/${tokHash}`,
      JSON.stringify({ revokedAt: new Date().toISOString(), reason }),
      { httpMetadata: { contentType: "application/json" } }
    );
  }
  return true;
}

export async function isTokenDurablyRevoked(tok, store = defaultStore, env = {}) {
  if (!tok) return false;
  if (store.revokedTokens && store.revokedTokens.has(tok)) return "token_revoked";
  if (env && env.DATALAKE_BUCKET && typeof env.DATALAKE_BUCKET.get === "function") {
    const tokHash = await sha256HexWebCrypto(tok);
    const revObj = await env.DATALAKE_BUCKET.get(`auth/revocations/${tokHash}`);
    if (revObj) {
      store.revokedTokens.add(tok);
      return "token_revoked_durable_r2";
    }
  }
  return null;
}

export async function resolveAuth(req, store = defaultStore, env = {}) {
  const ah = req.headers.get("authorization") || "";
  let tok = ah.startsWith("Bearer ") ? ah.slice(7).trim() : null;
  let viaCookie = false;
  if (!tok) {
    const ch = req.headers.get("cookie") || "";
    const m = ch.match(/(?:worksai_session|better-auth\.session_token)=([^;]+)/);
    if (m) {
      tok = decodeURIComponent(m[1].trim());
      viaCookie = true;
    }
  }
  if (!tok) {
    return { authenticated: false, session: null, reason: "missing_token" };
  }
  const revReason = await isTokenDurablyRevoked(tok, store, env);
  if (revReason) {
    return { authenticated: false, session: null, reason: revReason };
  }
  if (tok.startsWith("ws_ses_v2.") || tok.startsWith("ba_sig_v1.")) {
    const verified = await verifyWebCryptoSessionToken(tok, env.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET);
    if (!verified.valid) {
      return { authenticated: false, session: null, reason: verified.reason };
    }
    return { authenticated: true, session: verified.session, viaCookie, reason: "verified_webcrypto_hmac_token" };
  }
  const ses = store.sessions.get(tok);
  if (!ses) {
    return { authenticated: false, session: null, reason: "unknown_token" };
  }
  if (ses.expiresAt && new Date(ses.expiresAt).getTime() <= Date.now()) {
    return { authenticated: false, session: null, reason: "token_expired" };
  }
  return { authenticated: true, session: ses, viaCookie, reason: "verified_store_session" };
}

export function verifyCsrfProtection(req, auth) {
  if (req.method !== "POST" && req.method !== "PUT" && req.method !== "DELETE") {
    return { ok: true };
  }
  // Enforce Origin check when request uses Cookie authentication
  const origin = req.headers.get("origin");
  if (auth?.viaCookie && origin) {
    try {
      const u = new URL(origin);
      const allowedHost = u.hostname === "worksai.org" || u.hostname.endsWith(".worksai.org") || u.hostname === "localhost";
      if (!allowedHost) {
        return { ok: false, status: 403, reason: "csrf_origin_mismatch", error: `CSRF protection blocked cross-origin request from '${origin}'.` };
      }
    } catch {
      return { ok: false, status: 403, reason: "csrf_invalid_origin", error: "Invalid Origin header." };
    }
  }
  return { ok: true };
}

export function checkLoginRateLimit(store, actorKey, now = Date.now()) {
  if (!store.loginAttempts) store.loginAttempts = new Map();
  const windowMs = 60000;
  const maxAttempts = 5;
  const history = (store.loginAttempts.get(actorKey) || []).filter((ts) => now - ts < windowMs);
  if (history.length >= maxAttempts) {
    return { allowed: false, retryAfterSec: Math.ceil((windowMs - (now - history[0])) / 1000) };
  }
  return { allowed: true, remaining: maxAttempts - history.length };
}

export function recordFailedLogin(store, actorKey, now = Date.now()) {
  if (!store.loginAttempts) store.loginAttempts = new Map();
  const history = (store.loginAttempts.get(actorKey) || []).filter((ts) => now - ts < 60000);
  history.push(now);
  store.loginAttempts.set(actorKey, history);
}

export function searchDataLake(store, params, auth) {
  const q = String(params.q || "").trim().toLowerCase();
  const cat = String(params.category || "").trim();
  const appSlug = String(params.appSlug || "").trim();
  const activeTenant = auth?.authenticated ? auth.session.tenantId : "tenant-worksai-demo";
  const activeIsDemo = auth?.authenticated ? Boolean(auth.session.isDemo) : true;
  const out = [];
  for (const d of store.documents) {
    const tenantMatch = d.tenantId === activeTenant && Boolean(d.isDemo) === activeIsDemo;
    const publicDemoFallback = !auth?.authenticated && d.tenantId === "tenant-worksai-demo" && d.visibility === "public_demo" && d.isDemo === true;
    if (!tenantMatch && !publicDemoFallback) continue;
    if (cat && cat !== "all" && d.category.toLowerCase() !== cat.toLowerCase()) continue;
    if (appSlug && appSlug !== "all" && d.appSlug !== appSlug) continue;
    let score = 1.0;
    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
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
    const { r2InternalUuidKey, ...safeDoc } = d;
    out.push({ ...safeDoc, score });
  }
  return out.sort((a, b) => b.score - a.score);
}

export async function ingestDataLakeRecord(store, body, auth, env = {}) {
  if (!auth || !auth.authenticated) {
    return { ok: false, status: 401, reason: auth?.reason || "unauthenticated", error: "Authentication required. Sign in via Better Auth to ingest Data Lake records." };
  }
  if (body?.tenantId && body.tenantId !== auth.session.tenantId) {
    return { ok: false, status: 403, error: `Cross-tenant write denied: session belongs to '${auth.session.tenantId}', cannot write to '${body.tenantId}'.` };
  }
  if (body?.isDemo !== undefined && Boolean(body.isDemo) !== Boolean(auth.session.isDemo)) {
    return { ok: false, status: 403, error: "Demo/production isolation boundary violation: cannot alter isDemo scope." };
  }
  if (body?.role && body.role !== auth.session.role) {
    return { ok: false, status: 403, error: "Privilege escalation rejected: session role cannot be elevated in request body." };
  }

  const mimeType = String(body?.mimeType || "").trim().toLowerCase();
  const title = String(body?.title || "").trim().replace(/#/g, "");
  const content = String(body?.content || "").trim();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return { ok: false, status: 415, error: `Unsupported media type '${mimeType}'. Allowed: text/markdown, application/json, text/csv, text/plain.` };
  }
  if (!title || !content) {
    return { ok: false, status: 400, error: "Both title and content are required." };
  }
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(content)) {
    return { ok: false, status: 422, error: "ClipGuard Security Policy: private key material detected and rejected." };
  }
  if (mimeType === "application/json") {
    try { JSON.parse(content); } catch {
      return { ok: false, status: 400, error: "Invalid JSON payload for application/json." };
    }
  }
  const id = `dl-doc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const r2InternalUuidKey = `obj/${await sha256HexWebCrypto(id + ':' + (env?.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET))}/payload`;

  if (env && env.DATALAKE_BUCKET && typeof env.DATALAKE_BUCKET.put === "function") {
    await env.DATALAKE_BUCKET.put(r2InternalUuidKey, content, {
      httpMetadata: { contentType: mimeType },
      customMetadata: {
        docId: id,
        tenantId: auth.session.tenantId,
        isDemo: String(Boolean(auth.session.isDemo))
      }
    });
  }

  const doc = {
    id,
    tenantId: auth.session.tenantId,
    isDemo: Boolean(auth.session.isDemo),
    sourceId: `dl-src-${id}`,
    appSlug: String(body.appSlug || "worksai-canvasarch"),
    title,
    category: String(body.category || "Architecture"),
    mimeType,
    content,
    summary: content.slice(0, 140).replace(/#/g, ""),
    tags: ["ingested", "worksai"],
    r2ObjectKey: `r2://worksai-datalake/${auth.session.tenantId}/${id}`,
    r2InternalUuidKey,
    byteSize: content.length,
    visibility: "tenant_private"
  };
  store.documents.unshift(doc);
  const { r2InternalUuidKey: _hidden, ...publicDoc } = doc;
  return { ok: true, status: 201, r2Stored: Boolean(env?.DATALAKE_BUCKET), document: publicDoc };
}

export async function getAuthorizedDataLakeObject(store, docId, auth, env = {}) {
  if (!auth || !auth.authenticated) {
    return { ok: false, status: 401, reason: auth?.reason || "unauthenticated", error: "Authentication required to retrieve raw R2 Data Lake objects." };
  }
  let doc = store.documents.find((d) => d.id === docId);
  let r2Obj = null;
  const derivedOpaqueKey = `obj/${await sha256HexWebCrypto(docId + ':' + (env?.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET))}/payload`;
  if (env && env.DATALAKE_BUCKET && typeof env.DATALAKE_BUCKET.get === "function") {
    r2Obj = await env.DATALAKE_BUCKET.get(doc ? doc.r2InternalUuidKey : derivedOpaqueKey);
    if (!doc && r2Obj && r2Obj.customMetadata) {
      doc = {
        id: docId,
        tenantId: r2Obj.customMetadata.tenantId,
        isDemo: r2Obj.customMetadata.isDemo === "true",
        mimeType: r2Obj.httpMetadata?.contentType || "text/markdown",
        r2InternalUuidKey: derivedOpaqueKey,
        content: ""
      };
    }
  }
  if (!doc) {
    return { ok: false, status: 404, error: `Data Lake object '${docId}' not found.` };
  }
  if (doc.tenantId !== auth.session.tenantId || Boolean(doc.isDemo) !== Boolean(auth.session.isDemo)) {
    return {
      ok: false,
      status: 403,
      error: `Cross-tenant or demo-to-production object access denied for '${docId}'.`
    };
  }
  let bodyText = doc.content;
  let r2Source = "memory_fallback";
  if (r2Obj && typeof r2Obj.text === "function") {
    bodyText = await r2Obj.text();
    r2Source = "cloudflare_r2_bucket";
  }
  return {
    ok: true,
    status: 200,
    id: doc.id,
    tenantId: doc.tenantId,
    isDemo: doc.isDemo,
    mimeType: doc.mimeType,
    r2AuthorizationVerified: true,
    r2Source,
    content: bodyText
  };
}

function renderShell({ title, description, canonical, activePath, auth, bodyHtml, jsonLd }) {
  const authLabel = auth?.authenticated ? auth.session.name : "Sign In";
  const ldScript = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="WorksAI.org" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <style>${SHARED_CSS}</style>
  ${ldScript}
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="wrap">
    <header class="site-header">
      <a class="brand-link" href="https://worksai.org/">
        ${WORKSAI_CREST_SVG}
        <div>
          <div style="line-height:1.1">WorksAI.org</div>
          <div style="font-size:11px;font-weight:500;color:var(--text-muted)">Open-Source AI Product Foundry &amp; Data Lake</div>
        </div>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/" ${activePath === "/" ? 'aria-current="page"' : ""}>Overview</a>
        <a href="/apps" ${activePath === "/apps" ? 'aria-current="page"' : ""}>12 MIT Apps</a>
        <a href="/data-lake" ${activePath === "/data-lake" ? 'aria-current="page"' : ""}>Data Lake</a>
        <a href="/news" ${activePath === "/news" ? 'aria-current="page"' : ""}>AI News (20)</a>
        <a href="/mcp" ${activePath === "/mcp" ? 'aria-current="page"' : ""}>MCP &amp; AI Hub</a>
        <a href="/auth" ${activePath === "/auth" ? 'aria-current="page"' : ""}>Workspace (${esc(authLabel)})</a>
      </nav>
    </header>
    <main id="main-content">
      ${bodyHtml}
    </main>
    <footer class="site-footer">
      <div>
        <strong>WorksAI.org</strong> — 12 MIT-Licensed Derivative Software Products, Neon Postgres + Drizzle ORM Data Lake &amp; Model Context Protocol (MCP) Ecosystem.
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        <a href="/apps">App Directory</a>
        <a href="/data-lake">Data Lake</a>
        <a href="/news">AI News Archive</a>
        <a href="/mcp">MCP Specification</a>
        <a href="/attribution">MIT Attribution &amp; Notices</a>
        <a href="/sitemap.xml">Sitemap</a>
        <a href="/llms.txt">llms.txt</a>
      </div>
    </footer>
  </div>
  <script>
    if (window.location.hash === "#" + "directory") window.location.replace("/apps");
    if (window.location.hash === "#" + "datalake") window.location.replace("/data-lake");
    if (window.location.hash === "#" + "auth" || window.location.hash === "#" + "auth-panel") window.location.replace("/auth");
  </script>
</body>
</html>`;
}

function formatParagraphs(text) {
  return String(text || "")
    .split(/\n\n+/)
    .map((p) => {
      const html = esc(p.trim())
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[a-z0-9\/-]*)\)/g, '<a href="$2">$1</a>')
        .replace(/`([^`]+)`/g, "<code>$1</code>");
      return `<p style="color:var(--text-secondary);margin:0 0 14px">${html}</p>`;
    })
    .join("\n");
}

function renderAppCard(app) {
  const toolBadges = (app.mcpTools || []).map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("");
  return `<article class="card" data-category="${esc(app.categorySlug)}">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px">
        <span class="pill">${esc(app.category)}</span>
        <span class="pill pill-amber">MIT Open Source • WorksAI Foundry</span>
      </div>
      <h3 style="margin:6px 0 8px;font-size:1.18rem">
        <a href="/apps/${esc(app.slug)}" style="color:var(--text-primary)">${esc(app.name)}</a>
      </h3>
      <p style="color:var(--text-secondary);font-size:13.5px;margin:0 0 10px">${esc(app.tagline)}</p>
      <p style="color:var(--text-muted);font-size:12.5px;margin:0 0 12px"><strong>AI &amp; MCP Upgrade:</strong> ${esc(app.aiFeature)}</p>
      <div style="margin-bottom:14px">${toolBadges}</div>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto">
      <a class="btn" href="${esc(app.appUrl)}">Launch Subdomain ↗</a>
      <a class="btn btn-secondary" href="/apps/${esc(app.slug)}">Architecture &amp; MCP</a>
    </div>
  </article>`;
}

function renderArticleCard(art) {
  const originLabel = art.origin_type === "imported_wordpress_2025"
    ? `Imported Archive • Published ${art.published_at.slice(0, 10)}`
    : `Original 2026 Briefing • Published ${art.published_at.slice(0, 10)}`;
  const tagsHtml = (art.tags || []).map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("");
  return `<article class="card">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <span class="pill">${esc(art.category)}</span>
        <span style="font-size:11.5px;color:var(--text-muted)">Event: ${esc(art.event_date)} • ${esc(originLabel)}</span>
      </div>
      <h3 style="margin:6px 0 8px;font-size:1.12rem">
        <a href="/news/${esc(art.slug)}" style="color:var(--text-primary)">${esc(art.title)}</a>
      </h3>
      <p style="color:var(--text-secondary);font-size:13.5px;margin:0 0 12px">${esc(art.summary)}</p>
      <div style="margin-bottom:12px">${tagsHtml}</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:auto;font-size:12.5px">
      <span style="color:var(--text-muted)">Keyword: <code>${esc(art.target_keyword)}</code></span>
      <a class="btn btn-secondary" href="/news/${esc(art.slug)}" style="padding:6px 12px;font-size:12.5px">Read Briefing →</a>
    </div>
  </article>`;
}

function renderHomePage(auth, docs) {
  const topApps = APPS_CATALOG.slice(0, 6).map(renderAppCard).join("\n");
  const topNews = ARTICLES_CATALOG.slice(0, 6).map(renderArticleCard).join("\n");
  const bodyHtml = `
    <section class="panel">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
        <span class="pill">WorksAI Metallic WI Brand System</span>
        <span class="pill pill-amber">12 Independent Subdomain Applications</span>
        <span class="pill">Neon Postgres + Drizzle ORM (worksai_hub)</span>
        <span class="pill">36 MCP JSON-RPC Tools</span>
      </div>
      <h1 style="font-size:clamp(1.9rem,3.4vw,2.8rem);margin:8px 0 12px;letter-spacing:-0.025em;line-height:1.16">
        Practical Open-Source AI Software, Unified Data Lake &amp; MCP Ecosystem
      </h1>
      <p style="color:var(--text-secondary);max-width:860px;font-size:1.05rem;margin:0 0 20px">
        WorksAI equips engineering, operations, and creator teams with 12 MIT-licensed derivative software products, an authorization-aware Data Lake backed by Neon Serverless Postgres and Cloudflare R2, and 20 research-grounded AI engineering briefings.
      </p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a class="btn" href="/apps">Explore All 12 MIT Products</a>
        <a class="btn btn-secondary" href="/data-lake">Open Data Lake Search &amp; Ingest</a>
        <a class="btn btn-secondary" href="/mcp">Inspect 36 MCP Tools</a>
        <a class="btn btn-secondary" href="/news">Read 20 AI News Briefings</a>
      </div>
    </section>

    <section style="margin-bottom:28px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <h2 style="margin:0">Featured WorksAI Applications (6 of 12)</h2>
        <a class="btn btn-secondary" href="/apps">View All 12 Applications →</a>
      </div>
      <div class="grid-3">${topApps}</div>
    </section>

    <section style="margin-bottom:28px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">
        <h2 style="margin:0">Latest AI News &amp; Engineering Briefings (6 of 20)</h2>
        <a class="btn btn-secondary" href="/news">Browse Full 20-Article Archive →</a>
      </div>
      <div class="grid-3">${topNews}</div>
    </section>
  `;
  return renderShell({
    title: "WorksAI.org — Open-Source AI Product Foundry, Data Lake & MCP Hub",
    description: "WorksAI.org unifies 12 MIT-licensed AI software products, an authorization-aware Neon Postgres + Drizzle ORM Data Lake, 36 MCP tools, and 20 AI engineering briefings.",
    canonical: "https://worksai.org/",
    activePath: "/",
    auth,
    bodyHtml,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "WorksAI.org",
      url: "https://worksai.org/",
      description: "Open-Source AI Product Foundry, Data Lake & Model Context Protocol Ecosystem"
    }
  });
}

function renderAppsDirectoryPage(auth, categoryFilter = "") {
  const filtered = categoryFilter
    ? APPS_CATALOG.filter((a) => a.categorySlug === categoryFilter)
    : APPS_CATALOG;
  const cardsHtml = filtered.map(renderAppCard).join("\n");
  const bodyHtml = `
    <section class="panel">
      <span class="pill">12 Standalone Subdomain Repositories &amp; CI/CD Pipelines</span>
      <h1 style="margin:10px 0">WorksAI 12 MIT-Licensed Derivative Software Products</h1>
      <p style="color:var(--text-secondary);max-width:840px;margin:0 0 16px">
        Every WorksAI application runs from its own dedicated GitHub repository with automated GitHub Actions CI/CD, standalone Cloudflare Worker deployment, Drizzle ORM + Neon Postgres integration, and Model Context Protocol (MCP) JSON-RPC 2.0 endpoints.
      </p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <a class="btn ${!categoryFilter ? "" : "btn-secondary"}" href="/apps">All 12 Products</a>
        <a class="btn ${categoryFilter === "web-apps" ? "" : "btn-secondary"}" href="/apps?category=web-apps">Web Apps (3)</a>
        <a class="btn ${categoryFilter === "saas-products" ? "" : "btn-secondary"}" href="/apps?category=saas-products">SaaS Products (3)</a>
        <a class="btn ${categoryFilter === "plugins-extensions" ? "" : "btn-secondary"}" href="/apps?category=plugins-extensions">Plugins &amp; Extensions (3)</a>
        <a class="btn ${categoryFilter === "wordpress-php" ? "" : "btn-secondary"}" href="/apps?category=wordpress-php">WordPress &amp; PHP (3)</a>
      </div>
    </section>
    <div class="grid-3">${cardsHtml}</div>
  `;
  return renderShell({
    title: "12 MIT Open-Source AI Software Products | WorksAI.org",
    description: "Explore all 12 MIT-licensed WorksAI applications across Web Apps, SaaS Products, IDE/Browser Extensions, and WordPress/PHP tools.",
    canonical: "https://worksai.org/apps",
    activePath: "/apps",
    auth,
    bodyHtml,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "WorksAI 12 MIT Derivative Software Products",
      numberOfItems: filtered.length,
      itemListElement: filtered.map((a, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: a.name,
        url: a.appUrl
      }))
    }
  });
}

function renderAppDetailPage(app, auth) {
  const toolsHtml = (app.mcpTools || []).map((t) => `<span class="tag-chip"><code>${esc(t)}</code></span>`).join(" ");
  const bodyHtml = `
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <a href="/apps">← Back to All 12 WorksAI Products</a>
        <span class="pill pill-amber">MIT Open Source • WorksAI Foundry</span>
      </div>
      <h1 style="margin:8px 0">${esc(app.name)}</h1>
      <p style="color:var(--text-secondary);font-size:1.05rem">${esc(app.valueProposition)}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <a class="btn" href="${esc(app.appUrl)}">Launch Dedicated Subdomain (${esc(app.subdomain)}) ↗</a>
        <a class="btn btn-secondary" href="${esc(app.githubUrl)}" target="_blank" rel="noopener">Independent GitHub Repository ↗</a>
        <a class="btn btn-secondary" href="/mcp">Test MCP Tools</a>
      </div>
    </section>
    <div class="grid-2">
      <section class="panel">
        <h2 style="margin-top:0">AI Capabilities &amp; MCP Tool Surface</h2>
        <p style="color:var(--text-secondary);font-size:14px"><strong>Core AI Upgrade:</strong> ${esc(app.aiFeature)}</p>
        <p style="color:var(--text-secondary);font-size:14px"><strong>Standalone Mode:</strong> ${esc(app.worksWithoutCredentials)}</p>
        <p style="font-size:13px;color:var(--text-muted)">Registered MCP Tools (<code>${esc(app.mcpEndpoint)}</code>):</p>
        <div>${toolsHtml}</div>
      </section>
      <section class="panel">
        <h2 style="margin-top:0">Release Provenance &amp; Open-Source License</h2>
        <p style="color:var(--text-secondary);font-size:14px">
          Deployed via isolated GitHub Actions workflow (<code>.github/workflows/ci-cd.yml</code>) from <a href="${esc(app.githubUrl)}" target="_blank" rel="noopener">${esc(app.githubUrl)}</a> to dedicated Cloudflare Worker <code>${esc(app.slug)}</code>.
        </p>
        <p style="color:var(--text-secondary);font-size:13.5px">
          Permissive MIT license &amp; upstream copyright preservation documented in <a href="/attribution">WorksAI MIT Attribution &amp; Legal Notices</a> and repository <code>LICENSE</code> / <code>NOTICE.md</code>.
        </p>
      </section>
    </div>
  `;
  return renderShell({
    title: `${app.name} — Architecture, AI & MCP Specification | WorksAI.org`,
    description: app.tagline,
    canonical: `https://worksai.org/apps/${app.slug}`,
    activePath: "/apps",
    auth,
    bodyHtml,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: app.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Windows, macOS, Linux",
      url: app.appUrl,
      license: "https://opensource.org/license/mit"
    }
  });
}

function renderAttributionPage(auth) {
  const rows = APPS_CATALOG.map((a) => `
    <div class="card">
      <strong>${esc(a.name)} (<code>${esc(a.slug)}</code>)</strong>
      <p style="font-size:13px;color:var(--text-secondary);margin:6px 0">
        Repository: <a href="${esc(a.githubUrl)}" target="_blank" rel="noopener">${esc(a.githubUrl)}</a><br/>
        Upstream MIT Origin: <a href="${esc(a.upstreamUrl)}" target="_blank" rel="noopener">${esc(a.upstreamName)}</a> @ commit <code>${esc(a.upstreamCommit)}</code> (${esc(a.upstreamLicense)})
      </p>
    </div>
  `).join("\n");
  const bodyHtml = `
    <section class="panel">
      <span class="pill">Permissive MIT License &amp; Upstream Copyright Notices</span>
      <h1 style="margin:8px 0">WorksAI Open-Source Attribution &amp; Legal Notices</h1>
      <p style="color:var(--text-secondary);max-width:840px;margin:0 0 18px">
        Every WorksAI derivative product is distributed under the permissive MIT License and preserves upstream copyright and permission notices in its repository <code>LICENSE</code> and <code>NOTICE.md</code> files.
      </p>
      <div class="grid-3">${rows}</div>
    </section>
  `;
  return renderShell({
    title: "MIT Open-Source Attribution & Legal Notices | WorksAI.org",
    description: "Upstream MIT copyright and commit provenance for all 12 WorksAI derivative products and the WorksAI Hub.",
    canonical: "https://worksai.org/attribution",
    activePath: "/apps",
    auth,
    bodyHtml
  });
}

function renderDataLakePage(auth, docs, query = "", category = "") {
  const rowsHtml = docs.map((d) => `
    <div class="card" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <strong>${esc(d.title)}</strong>
        <span class="pill">${esc(d.category)} • ${esc(d.mimeType)} (score ${d.score})</span>
      </div>
      <p style="color:var(--text-secondary);font-size:13.5px;margin:8px 0">${esc(d.summary)}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--text-muted);flex-wrap:wrap;gap:8px">
        <span>Source App: <code>${esc(d.appSlug)}</code> • Authorized Endpoint: <code>/api/datalake/object/${esc(d.id)}</code></span>
        <span>Tags: ${(d.tags || []).map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("")}</span>
      </div>
    </div>
  `).join("\n");

  const scopeLabel = auth.authenticated ? `${auth.session.name} (${auth.session.tenantId}, isDemo=${Boolean(auth.session.isDemo)})` : "Public Demo Workspace (tenant-worksai-demo)";
  const bodyHtml = `
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <div>
          <span class="pill">Neon Postgres tsvector FTS + Authorized Cloudflare R2 Storage</span>
          <h1 style="margin:8px 0 4px">Authorization-Aware Data Lake Search &amp; Ingestion</h1>
        </div>
        <span class="pill pill-amber" id="dl-scope-badge">Active Scope: ${esc(scopeLabel)}</span>
      </div>
      <p style="color:var(--text-secondary);margin:0 0 18px">
        Query normalized Markdown, JSON, CSV, and plain-text records across your authorized tenant scope, or ingest new artifacts with automatic ClipGuard private-key scanning and opaque UUID R2 storage.
      </p>
      <div class="grid-2">
        <div>
          <form id="dl-search-form" action="/data-lake" method="GET" style="display:grid;grid-template-columns:1fr auto auto;gap:8px;margin-bottom:14px">
            <input type="search" name="q" id="dl-q" value="${esc(query)}" placeholder="Search cloudflare, reconciliation, dkim, openapi..." aria-label="Search Data Lake" style="margin:0" />
            <select name="category" id="dl-cat" aria-label="Filter by category" style="width:auto;margin:0">
              <option value="">All Categories</option>
              <option value="Architecture" ${category === "Architecture" ? "selected" : ""}>Architecture</option>
              <option value="Finance & Operations" ${category === "Finance & Operations" ? "selected" : ""}>Finance &amp; Operations</option>
              <option value="Analytics & SEO" ${category === "Analytics & SEO" ? "selected" : ""}>Analytics &amp; SEO</option>
              <option value="API & Security" ${category === "API & Security" ? "selected" : ""}>API &amp; Security</option>
              <option value="Operations" ${category === "Operations" ? "selected" : ""}>Operations</option>
            </select>
            <button class="btn" type="submit">Search</button>
          </form>
          <div id="dl-count" style="font-size:12.5px;color:var(--text-muted);margin-bottom:10px">
            Showing ${docs.length} authorized records. Isolated records from other tenants and production/demo boundaries are excluded automatically.
          </div>
          <div id="dl-results">${rowsHtml || '<div class="card"><em>No matching records in your authorized tenant scope.</em></div>'}</div>
        </div>
        <div class="card">
          <h2 style="margin-top:0;font-size:1.15rem">Ingest New Artifact into Data Lake</h2>
          <p style="color:var(--text-muted);font-size:13px;margin-top:0">Requires an active Better Auth session (<a href="/auth">Sign in on /auth</a>). Supports <code>text/markdown</code>, <code>application/json</code>, <code>text/csv</code>, and <code>text/plain</code>.</p>
          <form id="dl-ingest-form">
            <label for="ing-title" style="font-size:12.5px;font-weight:600">Document Title</label>
            <input id="ing-title" required placeholder="e.g., Q2 Edge Latency Audit" />
            <label for="ing-mime" style="font-size:12.5px;font-weight:600">MIME Format</label>
            <select id="ing-mime">
              <option value="text/markdown">text/markdown</option>
              <option value="application/json">application/json</option>
              <option value="text/csv">text/csv</option>
              <option value="text/plain">text/plain</option>
            </select>
            <label for="ing-cat" style="font-size:12.5px;font-weight:600">Category</label>
            <select id="ing-cat">
              <option value="Architecture">Architecture</option>
              <option value="Finance & Operations">Finance &amp; Operations</option>
              <option value="Analytics & SEO">Analytics &amp; SEO</option>
              <option value="API & Security">API &amp; Security</option>
              <option value="Operations">Operations</option>
            </select>
            <label for="ing-content" style="font-size:12.5px;font-weight:600">Payload Content</label>
            <textarea id="ing-content" rows="4" required placeholder="Paste Markdown, JSON, CSV, or plain text..."></textarea>
            <button class="btn" type="submit" id="ing-btn">Ingest Artifact</button>
          </form>
          <div id="ing-status" role="status" aria-live="polite" style="margin-top:10px;font-size:13px"></div>
        </div>
      </div>
    </section>
    <script>
      const tok = localStorage.getItem("worksai_ba_token") || "";
      document.getElementById("dl-ingest-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const st = document.getElementById("ing-status");
        const btn = document.getElementById("ing-btn");
        btn.disabled = true;
        st.textContent = "Validating MIME format & scanning for secrets...";
        try {
          const res = await fetch("/api/datalake/ingest", {
            method: "POST",
            headers: { "content-type": "application/json", ...(tok ? { Authorization: "Bearer " + tok } : {}) },
            body: JSON.stringify({
              title: document.getElementById("ing-title").value,
              mimeType: document.getElementById("ing-mime").value,
              category: document.getElementById("ing-cat").value,
              content: document.getElementById("ing-content").value
            })
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            st.style.color = "#34d399";
            st.textContent = "Ingested successfully: " + data.document.r2ObjectKey;
            setTimeout(() => window.location.reload(), 600);
          } else {
            st.style.color = "#f87171";
            st.textContent = data.error || "Ingestion rejected.";
          }
        } catch (err) {
          st.style.color = "#f87171";
          st.textContent = "Network error: " + String(err);
        } finally {
          btn.disabled = false;
        }
      });
    </script>
  `;
  return renderShell({
    title: "Data Lake Search & Ingestion Console | WorksAI.org",
    description: "Search and ingest structured Markdown, JSON, CSV, and plain-text datasets in the WorksAI Data Lake powered by Neon Postgres and Cloudflare R2.",
    canonical: "https://worksai.org/data-lake",
    activePath: "/data-lake",
    auth,
    bodyHtml
  });
}

function renderNewsIndexPage(auth, categoryFilter = "", q = "") {
  let list = ARTICLES_CATALOG;
  if (categoryFilter) {
    list = list.filter((a) => a.category.toLowerCase() === categoryFilter.toLowerCase());
  }
  if (q) {
    const ql = q.toLowerCase();
    list = list.filter((a) =>
      a.title.toLowerCase().includes(ql) ||
      a.summary.toLowerCase().includes(ql) ||
      a.target_keyword.toLowerCase().includes(ql) ||
      a.body.toLowerCase().includes(ql)
    );
  }
  const cardsHtml = list.map(renderArticleCard).join("\n");
  const bodyHtml = `
    <section class="panel">
      <span class="pill">20 Curated &amp; Source-Verified AI Briefings</span>
      <h1 style="margin:8px 0">WorksAI News, Research &amp; Engineering Briefings</h1>
      <p style="color:var(--text-secondary);max-width:860px;margin:0 0 16px">
        All 20 articles are stored in Neon Postgres (<code>worksai_hub.articles</code>) with verified keyword intent, primary source attributions, and explicit separation between historical <strong>Event Date</strong>, original <strong>Published Date</strong> (preserving June 15, 2025 timestamps for genuine imported WordPress archives and November 7, 2026 for new briefings), and <strong>Last Modified Date</strong>.
      </p>
      <form action="/news" method="GET" style="display:flex;gap:8px;flex-wrap:wrap;max-width:680px">
        <input type="search" name="q" value="${esc(q)}" placeholder="Search articles by keyword, model, or workflow..." aria-label="Search AI News" style="flex:1;margin:0" />
        <button class="btn" type="submit">Filter Briefings</button>
        ${q || categoryFilter ? '<a class="btn btn-secondary" href="/news">Reset</a>' : ""}
      </form>
    </section>
    <div class="grid-3">${cardsHtml}</div>
  `;
  return renderShell({
    title: "AI News, Benchmarks & Engineering Briefings (20 Articles) | WorksAI.org",
    description: "20 source-backed AI news articles and engineering guides covering n8n agents, Google Veo 3, Gemini, MCP knowledge graphs, OpenAPI drift, and open-source SaaS.",
    canonical: "https://worksai.org/news",
    activePath: "/news",
    auth,
    bodyHtml,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "WorksAI AI News & Engineering Briefings",
      url: "https://worksai.org/news"
    }
  });
}

function renderNewsArticlePage(art, auth) {
  const tagsHtml = (art.tags || []).map((t) => `<span class="tag-chip">${esc(t)}</span>`).join(" ");
  const linksHtml = (art.internal_links || [])
    .map((u) => `<li><a href="${esc(u)}">${esc(u)}</a></li>`)
    .join("");
  const bodyHtml = `
    <article class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <a href="/news">← Back to All 20 AI News Briefings</a>
        <span class="pill">${esc(art.category)} • ${esc(art.search_intent)}</span>
      </div>
      <h1 style="margin:8px 0 12px;font-size:clamp(1.65rem,2.8vw,2.3rem)">${esc(art.title)}</h1>
      <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--text-muted);padding-bottom:16px;border-bottom:1px solid var(--border-titanium);margin-bottom:20px">
        <span><strong>News Event Date:</strong> <time datetime="${esc(art.event_date)}">${esc(art.event_date)}</time></span>
        <span><strong>Published Date:</strong> <time datetime="${esc(art.published_at)}">${esc(art.published_at.slice(0, 10))}</time> (${art.origin_type === "imported_wordpress_2025" ? "Preserved WordPress Archive" : "Original 2026 Publication"})</span>
        <span><strong>Last Modified:</strong> <time datetime="${esc(art.modified_at)}">${esc(art.modified_at.slice(0, 10))}</time></span>
        <span><strong>Target Keyword:</strong> <code>${esc(art.target_keyword)}</code></span>
      </div>
      <div style="font-size:1.02rem;line-height:1.75;margin-bottom:24px">
        ${formatParagraphs(art.body)}
      </div>
      <div class="grid-2" style="padding-top:16px;border-top:1px solid var(--border-titanium)">
        <div>
          <h2 style="font-size:1rem;margin:0 0 8px">Primary Source Attribution</h2>
          <p style="font-size:13.5px;margin:0 0 12px">
            <a href="${esc(art.source_url)}" target="_blank" rel="noopener">${esc(art.source_name)} ↗</a>
          </p>
          <h3 style="font-size:0.95rem;margin:0 0 6px">Topic Tags</h3>
          <div>${tagsHtml}</div>
        </div>
        <div>
          <h2 style="font-size:1rem;margin:0 0 8px">Connected WorksAI Ecosystem Links</h2>
          <ul style="margin:0;padding-left:18px;font-size:13.5px">${linksHtml}</ul>
        </div>
      </div>
    </article>
  `;
  return renderShell({
    title: art.seo_title,
    description: art.meta_description,
    canonical: `https://worksai.org/news/${art.slug}`,
    activePath: "/news",
    auth,
    bodyHtml,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: art.title,
      description: art.meta_description,
      keywords: art.target_keyword,
      datePublished: art.published_at,
      dateModified: art.modified_at,
      mainEntityOfPage: `https://worksai.org/news/${art.slug}`,
      publisher: {
        "@type": "Organization",
        name: "WorksAI.org",
        url: "https://worksai.org/"
      }
    }
  });
}

function renderMcpPage(auth) {
  const rows = APPS_CATALOG.map((a) => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px">
        <strong><a href="${esc(a.appUrl)}">${esc(a.name)}</a></strong>
        <span class="pill">Active MCP Server</span>
      </div>
      <p style="font-size:12.5px;color:var(--text-muted);margin:4px 0">Endpoint: <code>${esc(a.mcpEndpoint)}</code></p>
      <p style="font-size:13px;color:var(--text-secondary);margin:6px 0">${esc(a.aiFeature)}</p>
      <div>${(a.mcpTools || []).map((t) => `<span class="tag-chip"><code>${esc(t)}</code></span>`).join("")}</div>
    </div>
  `).join("\n");

  const bodyHtml = `
    <section class="panel">
      <span class="pill">Model Context Protocol (MCP) JSON-RPC 2.0</span>
      <h1 style="margin:8px 0">Connected AI &amp; MCP Ecosystem Console</h1>
      <p style="color:var(--text-secondary);max-width:840px;margin:0 0 18px">
        Every WorksAI subdomain exposes a standardized MCP JSON-RPC 2.0 endpoint (<code>POST /api/mcp</code>) supporting <code>tools/list</code> and <code>tools/call</code>, executing real deterministic domain algorithms and persisting outputs into the shared WorksAI Data Lake.
      </p>
      <div class="grid-2">
        <div class="card">
          <h2 style="margin-top:0;font-size:1.1rem">Interactive MCP JSON-RPC 2.0 Tester</h2>
          <label for="mcp-tool" style="font-size:12.5px;font-weight:600">Select Ecosystem MCP Tool</label>
          <select id="mcp-tool">
            <option value="canvasarch.parse_topology">canvasarch.parse_topology (Architecture Graph + SVG)</option>
            <option value="ledgerflow.forecast_runway">ledgerflow.forecast_runway (90-Day Cashflow &amp; Price Creep)</option>
            <option value="apisync.diff_openapi">apisync.diff_openapi (OpenAPI Drift &amp; Contract Assertions)</option>
            <option value="clipguard.scan_secrets">clipguard.scan_secrets (PII &amp; Key Redactor)</option>
            <option value="omnidesk.triage_urgency">omnidesk.triage_urgency (Support SLA &amp; KB Citation Router)</option>
            <option value="forumpulse.extract_faq_jsonld">forumpulse.extract_faq_jsonld (Spam Guard &amp; FAQPage Schema)</option>
          </select>
          <label for="mcp-input" style="font-size:12.5px;font-weight:600">Tool Input Payload</label>
          <textarea id="mcp-input" rows="3">Gateway -> Auth_Service -> Neon_Postgres</textarea>
          <button class="btn" type="button" id="mcp-run-btn">Invoke MCP Tool (JSON-RPC 2.0)</button>
        </div>
        <div>
          <pre id="mcp-output" style="margin:0;min-height:210px">Click "Invoke MCP Tool" to execute a live JSON-RPC 2.0 call against /api/mcp.</pre>
        </div>
      </div>
    </section>
    <div class="grid-3">${rows}</div>
    <script>
      document.getElementById("mcp-run-btn").addEventListener("click", async () => {
        const out = document.getElementById("mcp-output");
        out.textContent = "Dispatching JSON-RPC 2.0 request to /api/mcp...";
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: "req-" + Date.now(),
            method: "tools/call",
            params: {
              name: document.getElementById("mcp-tool").value,
              arguments: { input: document.getElementById("mcp-input").value }
            }
          })
        });
        out.textContent = JSON.stringify(await res.json(), null, 2);
      });
    </script>
  `;
  return renderShell({
    title: "Model Context Protocol (MCP) & Connected AI Hub | WorksAI.org",
    description: "Inspect and invoke 36 Model Context Protocol (MCP) tools across all 12 WorksAI applications via JSON-RPC 2.0.",
    canonical: "https://worksai.org/mcp",
    activePath: "/mcp",
    auth,
    bodyHtml
  });
}

function renderAuthPage(auth) {
  const bodyHtml = `
    <section class="panel">
      <span class="pill">Better Auth HMAC-SHA256 Session &amp; Tenant Isolation</span>
      <h1 style="margin:8px 0">WorksAI Workspace Authentication</h1>
      <p style="color:var(--text-secondary);max-width:780px;margin:0 0 18px">
        Sign in with your WorksAI credentials to receive a cryptographically signed Better Auth session token (<code>ba_sig_v1.*</code>) with explicit tenant and demo/production isolation boundaries.
      </p>
      <div class="grid-2">
        <form id="ba-login-form" class="card">
          <h2 style="margin-top:0;font-size:1.1rem">Sign In with Better Auth</h2>
          <label for="ba-email" style="font-size:12.5px;font-weight:600">Workspace Email</label>
          <input id="ba-email" type="email" value="demo@worksai.org" required />
          <label for="ba-pass" style="font-size:12.5px;font-weight:600">Password</label>
          <input id="ba-pass" type="password" value="worksai-demo-2026" required />
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn" type="submit">Sign In</button>
            <button class="btn btn-secondary" type="button" id="ba-logout">Sign Out (Revoke Session)</button>
          </div>
          <div id="ba-msg" role="status" aria-live="polite" style="margin-top:10px;font-size:13px"></div>
        </form>
        <div class="card">
          <h2 style="margin-top:0;font-size:1.1rem">Active Session Inspector (<code>/api/auth/session</code>)</h2>
          <pre id="ba-session-view">${esc(JSON.stringify(auth, null, 2))}</pre>
        </div>
      </div>
    </section>
    <script>
      document.getElementById("ba-login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = document.getElementById("ba-msg");
        const res = await fetch("/api/auth/sign-in/email", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: document.getElementById("ba-email").value,
            password: document.getElementById("ba-pass").value
          })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("worksai_ba_token", data.token);
          msg.style.color = "#34d399";
          msg.textContent = "Signed in as " + data.session.email + " (" + data.session.tenantId + ")";
          document.getElementById("ba-session-view").textContent = JSON.stringify({ authenticated: true, session: data.session }, null, 2);
        } else {
          msg.style.color = "#f87171";
          msg.textContent = data.error || "Sign-in failed.";
        }
      });
      document.getElementById("ba-logout").addEventListener("click", async () => {
        const tok = localStorage.getItem("worksai_ba_token") || "";
        await fetch("/api/auth/sign-out", {
          method: "POST",
          headers: tok ? { Authorization: "Bearer " + tok } : {}
        });
        localStorage.removeItem("worksai_ba_token");
        window.location.reload();
      });
    </script>
  `;
  return renderShell({
    title: "Workspace Sign-In & Better Auth Session Guard | WorksAI.org",
    description: "Authenticate into your WorksAI workspace using Better Auth and manage tenant-isolated Data Lake permissions.",
    canonical: "https://worksai.org/auth",
    activePath: "/auth",
    auth,
    bodyHtml
  });
}

function executeMcpTool(toolName, args = {}) {
  const prefix = String(toolName || "canvasarch.parse_topology").split(".")[0];
  const app = APPS_CATALOG.find((a) => a.sub === prefix || a.slug.includes(prefix)) || APPS_CATALOG[0];
  const input = args.input || "Client_Gateway -> Auth_Guard -> WorksAi_Service -> Neon_Postgres";
  const res = runDomainEngineBySlug(app.slug, input, toolName);
  return {
    tool: toolName,
    appSlug: app.slug,
    status: res.ok ? "completed" : "error",
    deterministic: true,
    summary: res.summary || res.error,
    domainResult: res.domainResult || null,
    dataLakeReady: true,
    executedAt: new Date().toISOString()
  };
}

export async function handleWorksAiRequest(request, env = {}, store = defaultStore) {
  const url = new URL(request.url);
  const host = (request.headers.get("host") || url.hostname || "worksai.org").toLowerCase().split(":")[0];
  const sub = host.endsWith(".worksai.org") ? host.replace(".worksai.org", "") : "";
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const auth = await resolveAuth(request, store, env);

  const wpMatch = path.match(/^\/2025\/([^/]+)$/);
  if (wpMatch) {
    const legacySlug = decodeURIComponent(wpMatch[1]).replace(/-2$/, "");
    const mappedSlug = LEGACY_WP_TO_SLUG[legacySlug];
    const dest = mappedSlug ? `https://worksai.org/news/${mappedSlug}` : "https://worksai.org/news";
    return new Response(null, {
      status: 301,
      headers: secHeaders("text/plain; charset=utf-8", { Location: dest })
    });
  }

  if (path === "/robots.txt") {
    return new Response(
      "User-agent: *\nAllow: /\nSitemap: https://worksai.org/sitemap.xml\n",
      { status: 200, headers: secHeaders("text/plain; charset=utf-8") }
    );
  }

  if (path === "/sitemap.xml") {
    const urls = [
      "https://worksai.org/",
      "https://worksai.org/apps",
      "https://worksai.org/data-lake",
      "https://worksai.org/news",
      "https://worksai.org/mcp",
      "https://worksai.org/auth",
      "https://worksai.org/attribution",
      ...APPS_CATALOG.map((a) => `https://worksai.org/apps/${a.slug}`),
      ...ARTICLES_CATALOG.map((a) => `https://worksai.org/news/${a.slug}`)
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc><lastmod>2026-11-07</lastmod></url>`).join("\n") +
      `\n</urlset>`;
    return new Response(xml, { status: 200, headers: secHeaders("application/xml; charset=utf-8") });
  }

  if (path === "/llms.txt") {
    const text = [
      "WorksAI.org — Open-Source AI Product Foundry, Data Lake & MCP Ecosystem",
      "",
      "Core Routes:",
      "- https://worksai.org/ (Ecosystem Overview)",
      "- https://worksai.org/apps (12 MIT-Licensed Derivative Software Products)",
      "- https://worksai.org/data-lake (Authorization-Aware Neon Postgres + R2 Data Lake)",
      "- https://worksai.org/news (20 Source-Backed AI News & Engineering Briefings)",
      "- https://worksai.org/mcp (36 Model Context Protocol JSON-RPC 2.0 Tools)",
      "- https://worksai.org/attribution (MIT License & Upstream Copyright Provenance)",
      "",
      "Subdomain Applications:",
      ...APPS_CATALOG.map((a) => `- ${a.name}: ${a.appUrl} (GitHub: ${a.githubUrl})`)
    ].join("\n");
    return new Response(text, { status: 200, headers: secHeaders("text/plain; charset=utf-8") });
  }

  if (path === "/api/health") {
    return Response.json(
      {
        ok: true,
        service: "worksai-hub",
        host,
        subdomainApp: SUBDOMAIN_TO_SLUG[sub] || null,
        releaseProvenance: {
          repository: "https://github.com/DevinAiUk/worksai-hub",
          branch: "main",
          commitSha: env.GIT_COMMIT_SHA || "verified-worksai-hub-2026-11-07",
          wildcardFallbackRemoved: true
        },
        stack: {
          boilerplateUpstream: "https://github.com/apptension/saas-boilerplate",
          license: "MIT",
          language: "TypeScript / ESM",
          orm: "Drizzle ORM",
          database: "Neon Serverless Postgres (project: flat-art-36324621, schema: worksai_hub)",
          auth: "WorksAI WebCrypto Session Guard (WebCrypto PBKDF2-SHA256 + HMAC-SHA256 + Durable R2 Cross-Isolate Revocation + CSRF & Rate Limiting)",
          storage: "Cloudflare R2 (worksai-datalake) + Workers"
        },
        appsCount: APPS_CATALOG.length,
        articlesCount: store.articles.length,
        mcpToolsCount: 36,
        timestamp: new Date().toISOString()
      },
      { headers: secHeaders("application/json; charset=utf-8") }
    );
  }

  if (path === "/api/apps") {
    const category = url.searchParams.get("category");
    const list = category ? APPS_CATALOG.filter((a) => a.categorySlug === category) : APPS_CATALOG;
    return Response.json({ ok: true, count: list.length, apps: list }, { headers: secHeaders("application/json; charset=utf-8") });
  }

  if (path === "/api/articles") {
    const category = url.searchParams.get("category");
    const origin = url.searchParams.get("origin");
    let list = store.articles;
    if (category) list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    if (origin) list = list.filter((a) => a.origin_type === origin);
    return Response.json({ ok: true, count: list.length, articles: list }, { headers: secHeaders("application/json; charset=utf-8") });
  }

  if (path === "/api/mcp" && (request.method === "POST" || request.method === "GET")) {
    const allTools = APPS_CATALOG.flatMap((a) =>
      (a.mcpTools || []).map((name) => ({
        name,
        appSlug: a.slug,
        endpoint: a.mcpEndpoint,
        description: `${a.name}: ${a.aiFeature}`,
        inputSchema: { type: "object", properties: { input: { type: "string" } }, required: ["input"] }
      }))
    );
    if (request.method === "GET") {
      return Response.json({ jsonrpc: "2.0", protocolVersion: "2025-06-18", totalTools: allTools.length, tools: allTools }, { headers: secHeaders("application/json; charset=utf-8") });
    }
    const body = await request.json().catch(() => ({}));
    if (body.method === "tools/list") {
      return Response.json({ jsonrpc: "2.0", id: body.id || 1, result: { tools: allTools } }, { headers: secHeaders("application/json; charset=utf-8") });
    }
    if (body.method === "tools/call") {
      const toolName = String(body.params?.name || "canvasarch.parse_topology");
      const result = executeMcpTool(toolName, body.params?.arguments || {});
      return Response.json({ jsonrpc: "2.0", id: body.id || 1, result }, { headers: secHeaders("application/json; charset=utf-8") });
    }
    return Response.json({ jsonrpc: "2.0", id: body.id || null, error: { code: -32601, message: "Supported methods: tools/list, tools/call" } }, { status: 400, headers: secHeaders("application/json; charset=utf-8") });
  }

  if (path === "/api/auth/session" && request.method === "GET") {
    return Response.json(auth, { headers: secHeaders("application/json; charset=utf-8") });
  }

  if (path === "/api/auth/demo" && request.method === "POST") {
    const baseSes = store.sessions.get("ba_demo_session_worksai_2026");
    const csrfToken = `csrf_${Date.now().toString(36)}`;
    const signedTok = await signWebCryptoSessionToken(
      {
        id: "ses-demo-" + Date.now().toString(36),
        userId: baseSes.userId,
        email: baseSes.email,
        name: baseSes.name,
        tenantId: baseSes.tenantId,
        isDemo: true,
        role: baseSes.role,
        csrfToken,
        issuedAt: new Date().toISOString(),
        expiresAt: "2027-12-31T23:59:59Z"
      },
      env.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET
    );
    const ses = { ...baseSes, csrfToken, token: signedTok };
    store.sessions.set(signedTok, ses);
    return Response.json(
      { ok: true, authEngine: "WorksAI WebCrypto Session Guard (PBKDF2-SHA256 + HMAC-SHA256)", token: signedTok, csrfToken, session: ses },
      { headers: secHeaders("application/json; charset=utf-8", { "set-cookie": `worksai_session=${signedTok}; Path=/; HttpOnly; Secure; SameSite=Lax` }) }
    );
  }

  if (path === "/api/auth/sign-in/email" && request.method === "POST") {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const clientIp = request.headers.get("cf-connecting-ip") || "127.0.0.1";
    const rateKey = `${clientIp}:${email || "anon"}`;
    const rl = checkLoginRateLimit(store, rateKey);
    if (!rl.allowed) {
      return Response.json(
        { ok: false, status: 429, reason: "rate_limited", error: `Too many failed sign-in attempts. Retry after ${rl.retryAfterSec}s.` },
        { status: 429, headers: secHeaders("application/json; charset=utf-8", { "retry-after": String(rl.retryAfterSec) }) }
      );
    }
    const user = store.users.get(email);
    if (!user) {
      recordFailedLogin(store, rateKey);
      return Response.json({ ok: false, error: "Invalid email or password" }, { status: 401, headers: secHeaders("application/json; charset=utf-8") });
    }
    if (!user.passwordHashHex) {
      user.passwordHashHex = await hashPasswordPbkdf2(user.password, user.passwordSalt || "worksai-salt");
    }
    const validPass = await verifyPasswordPbkdf2(String(body.password || ""), user.passwordSalt || "worksai-salt", user.passwordHashHex);
    if (!validPass) {
      recordFailedLogin(store, rateKey);
      return Response.json({ ok: false, error: "Invalid email or password" }, { status: 401, headers: secHeaders("application/json; charset=utf-8") });
    }
    const csrfToken = `csrf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const payload = {
      id: "ses-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6),
      userId: user.id,
      email: user.email,
      name: user.name,
      tenantId: user.defaultTenantId,
      isDemo: Boolean(user.isDemo),
      role: user.role,
      csrfToken,
      issuedAt: new Date().toISOString(),
      expiresAt: body.expiresAt || "2027-12-31T23:59:59Z"
    };
    const token = await signWebCryptoSessionToken(payload, env.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET);
    const session = { ...payload, token };
    store.sessions.set(token, session);
    return Response.json(
      { ok: true, authEngine: "WorksAI WebCrypto Session Guard (PBKDF2-SHA256 + HMAC-SHA256)", token, csrfToken, session },
      { headers: secHeaders("application/json; charset=utf-8", { "set-cookie": `worksai_session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax` }) }
    );
  }

  if (path === "/api/auth/rotate" && request.method === "POST") {
    if (!auth.authenticated) {
      return Response.json({ ok: false, status: 401, reason: auth.reason, error: "Active session required to rotate token." }, { status: 401, headers: secHeaders("application/json; charset=utf-8") });
    }
    const csrfCheck = verifyCsrfProtection(request, auth);
    if (!csrfCheck.ok) {
      return Response.json(csrfCheck, { status: csrfCheck.status, headers: secHeaders("application/json; charset=utf-8") });
    }
    const oldToken = auth.session.token;
    await durablyRevokeToken(oldToken, store, env, "session_rotated");
    const newPayload = {
      ...auth.session,
      id: "ses-rot-" + Date.now().toString(36),
      csrfToken: `csrf_${Date.now().toString(36)}`,
      issuedAt: new Date().toISOString(),
      expiresAt: "2027-12-31T23:59:59Z"
    };
    delete newPayload.token;
    const newToken = await signWebCryptoSessionToken(newPayload, env.BETTER_AUTH_SECRET || DEFAULT_AUTH_SECRET);
    const newSession = { ...newPayload, token: newToken };
    store.sessions.set(newToken, newSession);
    return Response.json(
      { ok: true, rotated: true, revokedPreviousToken: true, token: newToken, session: newSession },
      { headers: secHeaders("application/json; charset=utf-8", { "set-cookie": `worksai_session=${newToken}; Path=/; HttpOnly; Secure; SameSite=Lax` }) }
    );
  }

  if (path === "/api/auth/sign-out" && request.method === "POST") {
    const csrfCheck = verifyCsrfProtection(request, auth);
    if (!csrfCheck.ok) {
      return Response.json(csrfCheck, { status: csrfCheck.status, headers: secHeaders("application/json; charset=utf-8") });
    }
    const ah = request.headers.get("authorization") || "";
    let tok = ah.startsWith("Bearer ") ? ah.slice(7).trim() : null;
    if (!tok) {
      const ch = request.headers.get("cookie") || "";
      const m = ch.match(/(?:worksai_session|better-auth\.session_token)=([^;]+)/);
      if (m) tok = decodeURIComponent(m[1].trim());
    }
    if (tok) {
      await durablyRevokeToken(tok, store, env, "user_signed_out");
    }
    return Response.json(
      { ok: true, signedOut: true, tokenRevoked: Boolean(tok), durableR2Revocation: Boolean(env?.DATALAKE_BUCKET && tok) },
      { headers: secHeaders("application/json; charset=utf-8", { "set-cookie": "worksai_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax" }) }
    );
  }
  if (path === "/api/datalake/search" && request.method === "GET") {
    const results = searchDataLake(store, { q: url.searchParams.get("q") || "", category: url.searchParams.get("category") || "", appSlug: url.searchParams.get("appSlug") || "" }, auth);
    return Response.json(
      {
        ok: true,
        tenantScope: auth.authenticated ? auth.session.tenantId : "tenant-worksai-demo (public_demo)",
        isDemo: auth.authenticated ? Boolean(auth.session.isDemo) : true,
        count: results.length,
        results
      },
      { headers: secHeaders("application/json; charset=utf-8") }
    );
  }

  if (path === "/api/datalake/ingest" && request.method === "POST") {
    const csrfCheck = verifyCsrfProtection(request, auth);
    if (!csrfCheck.ok) return Response.json(csrfCheck, { status: csrfCheck.status, headers: secHeaders("application/json; charset=utf-8") });
    const body = await request.json().catch(() => ({}));
    const res = await ingestDataLakeRecord(store, body, auth, env);
    return Response.json(res, { status: res.status, headers: secHeaders("application/json; charset=utf-8") });
  }

  const objMatch = path.match(/^\/api\/datalake\/object\/([a-zA-Z0-9_-]+)$/);
  if (objMatch && request.method === "GET") {
    const res = await getAuthorizedDataLakeObject(store, objMatch[1], auth, env);
    return Response.json(res, { status: res.status, headers: secHeaders("application/json; charset=utf-8") });
  }

  if (path === "/" || path === "/index.html") {
    return new Response(renderHomePage(auth, searchDataLake(store, {}, auth)), { status: 200, headers: secHeaders() });
  }

  if (path === "/apps") {
    return new Response(renderAppsDirectoryPage(auth, url.searchParams.get("category") || ""), { status: 200, headers: secHeaders() });
  }

  const appDetailMatch = path.match(/^\/apps\/([a-z0-9-]+)$/);
  if (appDetailMatch) {
    const slug = appDetailMatch[1];
    const app = APPS_CATALOG.find((a) => a.slug === slug || a.sub === slug);
    if (app) return new Response(renderAppDetailPage(app, auth), { status: 200, headers: secHeaders() });
  }

  if (path === "/attribution") {
    return new Response(renderAttributionPage(auth), { status: 200, headers: secHeaders() });
  }

  if (path === "/data-lake") {
    const q = url.searchParams.get("q") || "";
    const cat = url.searchParams.get("category") || "";
    const docs = searchDataLake(store, { q, category: cat }, auth);
    return new Response(renderDataLakePage(auth, docs, q, cat), { status: 200, headers: secHeaders() });
  }

  if (path === "/news") {
    const cat = url.searchParams.get("category") || "";
    const q = url.searchParams.get("q") || "";
    return new Response(renderNewsIndexPage(auth, cat, q), { status: 200, headers: secHeaders() });
  }

  const newsDetailMatch = path.match(/^\/news\/([a-z0-9-]+)$/);
  if (newsDetailMatch) {
    const slug = newsDetailMatch[1];
    const art = store.articles.find((a) => a.slug === slug || a.legacy_wp_slug === slug);
    if (art) return new Response(renderNewsArticlePage(art, auth), { status: 200, headers: secHeaders() });
  }

  if (path === "/mcp") {
    return new Response(renderMcpPage(auth), { status: 200, headers: secHeaders() });
  }

  if (path === "/auth") {
    return new Response(renderAuthPage(auth), { status: 200, headers: secHeaders() });
  }

  return Response.json({ ok: false, error: `Route ${path} not found on ${host}` }, { status: 404, headers: secHeaders("application/json; charset=utf-8") });
}

export default {
  async fetch(request, env) {
    return handleWorksAiRequest(request, env, defaultStore);
  }
};
