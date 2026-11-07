# Hostinger DNS Retirement, Worker Custom Domains & Rollback Runbook (`worksai.org`)

## 1. Pre-Cutover DNS Backup
All 37 DNS records in Cloudflare zone `ce9b21157b7b1c0d83eacd3180884f13` (`worksai.org`) were exported and archived prior to modification.

## 2. Retired Hostinger & Compromised Legacy Records (7 Approved Removals)
| Record ID | Name | Type | Former Content | Action Taken |
| :--- | :--- | :--- | :--- | :--- |
| `25a6e398da5eafb1d923ef80892e9c5f` | `default._domainkey.worksai.org` | `TXT` | `v=DKIM1; k=rsa; p=MIIBIjANBg...` | Deleted (retired compromised keypair; private key `c4308403f30a38a2b6819c0b99addc4f` remained permanently deleted) |
| `434af9d78bb98c99d892da2ac6deaca1` | `scph0524._domainkey.worksai.org` | `CNAME` | `scph0524._domainkey.hostingermail.com` | Deleted (retired Hostinger outbound mail dependency) |
| `6c3adc16aeb20a0234298f634be50888` | `worksai.org` | `A` | `82.29.157.6` | Replaced by native Cloudflare Worker Custom Domain (`789a5c0a4a1f8c38db8bceb522f4d3d14a99eb56`) |
| `44efe07e2762e75e9e0bb8decb86510e` | `www.worksai.org` | `A` | `82.29.157.6` | Replaced by native Cloudflare Worker Custom Domain (`a5f9025c3f60859dbc32a949eb85b5ff30f1d887`) |
| `6232eb202221bf7438a47b31c576345b` | `app.worksai.org` | `CNAME` | `worksai.org` | Replaced by native Cloudflare Worker Custom Domain (`63f57b9e1b60ae2b2a89ccb0c7d82ffd257c358d`) |
| `616b0cbf0e40e74fc43d2ee287545e40` | `worksai.org` | `NS` | `ns1.dns-parking.com` | Deleted (retired Hostinger parking NS delegation) |
| `934924935ac24d8d2123005b92c2a5b3` | `worksai.org` | `NS` | `ns2.dns-parking.com` | Deleted (retired Hostinger parking NS delegation) |

## 3. Preserved Active Email & Auth Records
- **Cloudflare Email Routing MX**: `route1.mx.cloudflare.net` (priority 69), `route2.mx.cloudflare.net` (priority 99), `route3.mx.cloudflare.net` (priority 40).
- **SPF (`TXT worksai.org`)**: `v=spf1 include:_spf.mx.cloudflare.net include:spf.mail.obby.io ~all`.
- **DMARC (`TXT _dmarc.worksai.org`)**: `v=DMARC1; p=quarantine; sp=quarantine; adkim=r; aspf=r; pct=100; rua=mailto:dmarc@worksai.org`.
- **Active DKIM Selectors**: `cf2024-1._domainkey.worksai.org` (Cloudflare Email Routing) and `20250620023225pm._domainkey.worksai.org` (transactional mail).
- **Verified Forwarding Rules**: `support@worksai.org`, `admin@worksai.org`, `assistant@worksai.org`, and `dmarc@worksai.org` -> `bowenjdevon@gmail.com` (`verified: 2026-03-08T01:40:28Z`).

## 4. Rollback Procedure
If any origin regression occurs on `worksai.org`, `www.worksai.org`, or `app.worksai.org`, detach the Worker custom domain via `DELETE /accounts/683a27a8cd7efacbb9c6bfccdbcf4d9a/workers/domains/records/{domain_id}` and restore the non-sensitive `A`/`CNAME` record from the pre-cutover snapshot. Never restore `default._domainkey` (`25a6e398da5eafb1d923ef80892e9c5f`) or its compromised private key (`c4308403f30a38a2b6819c0b99addc4f`).
