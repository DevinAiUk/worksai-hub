# WorksAI v4.3.0 Release Package — Multi-Modal Composer, Intent-to-Skill Router, Per-Bot Composio MCP & Account-Level Token Tracking

## 1. Global Emblem & Brand Navigation + Admin Disclaimer Redaction
- All header emblems (`#wai-metal-slate`) and brand logos across `it.worksai.org`, `translate.worksai.org`, `/admin`, `/wordpress-onboarding`, and `worksai.org` point directly to `https://worksai.org/`.
- Internal owner security disclaimers (`"This console is restricted exclusively to the WorksAI owner Google account..."`) are redacted from public login buttons and UI surfaces and restricted strictly to authenticated `HTTP 403 FORBIDDEN_NOT_OWNER` JSON responses on `/api/admin/auth/google`.

## 2. Chatbot Input Component Rehabilitation (`.wai-composer-bar`)
- Unfrozen multi-modal input bar supporting:
  - **Text**: Unlocked `.wai-composer-bar` textarea and submit triggers (`POST /api/chat/completions`).
  - **Image**: Inline image drag-and-drop and attachment file picker (`<input type="file" accept="image/*" multiple>`).
  - **Audio**: 60-second voice note recording and audio file ingestion powered by `cohere-transcribe-03-2026` (`POST /api/audio/transcribe`).

## 3. Human-Centric App Names & Natural Language Intent-to-Skill Router (`POST /api/skills/route`)
- `translate.worksai.org` -> **WorksAI Translate App**
- `it.worksai.org` -> **WorksAI ITs Workspace**
- Natural language intent mappings:
  - `"Verify Google OAuth login origin for translate.worksai.org..."` -> **OAuth Origin & Single-Use Code Verifier**
  - `"Summarize customer voice notes using cohere-transcribe-03-2026..."` -> **Cohere Audio Transcriber (60s Cap)**
  - `"Prepare customer follow-up email via Gmail -> Send email..."` -> **Gmail MCP & Human Approval Card**

## 4. Custom MCP Connections & Composio Integration (`POST /api/its/mcp-config`)
- Per-bot MCP toolset customization toggles (`Gmail`, `Google Drive`, `Cohere`, `Slack`, `Jira`, `GitHub`, `Google Calendar`, `Resend`) across `Pip`, `Scout`, `Mira`, `Patch`, and `Sage` with authentic multi-color Composio brand vector SVGs.
- Relocated Self-Service API Key management to **User Settings -> Connections**.

## 5. Account-Level Token Tracking Architecture (`usr_89210f`)
- Token consumption (`1,420,000 / 2,000,000 tokens`) and rate limits are bound directly to `[User Account ID: usr_89210f]`.
- `POST /api/keys/rotate` invalidates the previous key, appends it to `revokedKeys`, mints a new 76-character `wai_sk_live_<64-hex>` key bound to `usr_89210f`, and preserves cumulative token usage (`quotaResetOnRotation: false`).

## 6. WordPress PHP Plugin (`v4.3.0`)
- Un-greyed all `options.php` controls, added checkable RAG selection trees (**Post Types**: `post`, `page`, `custom_portfolio`; **Categories & Tags**; **Individual Pages** include/exclude IDs), and added the editable WorksAI Self-Service API Key input field (`POST /api/wordpress/config`).

## 7. Main Landing Page Revision (`worksai.org`)
- Updated hero section and feature matrices to highlight Multi-Modal Workspace Agents, Human-in-the-Loop Approvals, Composio-Grade MCP Integrations, and Scoped Self-Service API Access.
