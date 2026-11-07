# WorksAI Product Content & SEO/GEO Specification Template

Use this plain-text / Markdown template before publishing or updating any WorksAI web application, IDE/browser extension, CLI package, or PHP/WordPress integration page.

## 1. Product Identity & Audience
- **Product Name:** 
- **Subdomain & Canonical URL:** 
- **Product Category & Runtime Classification:** (Web Application | SaaS Service | VS Code Extension `.vsix` | Browser MV3 Extension `.zip` | Node CLI `.tgz` | PHP/WordPress Plugin `.zip`)
- **Target Audience:** 
- **Core Problem Solved:** 

## 2. Keyword & Intent Research (Qualitative + Search Console Evidence)
- **Primary Keyword:** 
- **Supporting Keywords (3–5):** 
- **User Search Intent:** (Informational / Transactional / Commercial Investigation)
- **Research Source & Date:** (Google Search Console `sc-domain:worksai.org`, Google SERP/autocomplete analysis, and competitor documentation audit — Date: YYYY-MM-DD; label qualitative research explicitly without inventing search volume numbers)
- **Topic Overlap & Deduplication Strategy:** (How this subdomain page and `/guide` article avoid cannibalizing `worksai.org/apps/<slug>` and `worksai.org/news/*`)

## 3. Metadata & Above-the-Fold Hierarchy (NN/g F-Pattern & CWV Aligned)
- **SEO Title (<60 chars):** 
- **Meta Description (140–160 chars):** 
- **H1 Heading:** 
- **Direct Answer Lead (GEO 40–60 word summary):** 
- **Primary CTA Label & Target:** 
- **Secondary CTA Label & Target:** 

## 4. Product Capabilities, Installation & Honest Boundaries
- **Implemented & Persisted Features (Tenant/User R2 Scope):** 
- **Deterministic Utilities:** 
- **Genuine AI Model Capabilities (`@cf/meta/llama-3.1-8b-instruct-fp8`):** 
- **Supported Platforms, Permissions & Privacy Disclosure:** 
- **Step-by-Step Installation / Usage Instructions:** 
- **Screenshots / Visual Diagrams & Descriptive Alt Text:** 
- **Known Limitations:** 

## 5. Explanatory Article (`/guide`), Citations & FAQs
- **Article Headline:** 
- **Concrete Example / Walkthrough:** 
- **Verified External Sources Cited:** 
- **Internal Ecosystem Links:** 
- **Frequently Asked Questions (3–5 real user questions):** 

## 6. Release Provenance & Acceptance Checklist
- **Version & Release Date:** 
- **Downloadable Binary Artifact Path & Checksum/Size:** 
- [ ] Primary CTA and binary download verified (`HTTP 200`, valid archive structure)
- [ ] Tenant/user-isolated CRUD workflow (`Save`, `Reopen`, `Rename`, `Delete`, `Export`) verified
- [ ] Private workspace endpoints (`/api/workspace/*`) excluded in `/robots.txt`
- [ ] Zero fabricated metrics, testimonials, or unverified compatibility claims
