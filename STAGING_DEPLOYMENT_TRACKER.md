# QuestForge AI — Autonomous Staging Deployment Tracker

**Phase:** 13 — Autonomous Free-Tier Staging Deployment  
**Approved Configuration:** Configuration 1 — \$0/month Academic Demonstration Hosting  
- **Frontend:** Cloudflare Pages (Free Plan)  
- **Backend:** Render Web Service (Free Plan)  
- **Database:** Supabase Cloud PostgreSQL 17 (Mumbai `bwllksfjjxmumrrqaifa`, Free Plan)  
- **AI Integrations:** Groq Cloud (`openai/gpt-oss-120b`) + NVIDIA NIM (`nvidia/nemotron-3-ultra-550b-a55b`)  
- **Domains:** Hosting-provided staging subdomains only (`*.pages.dev` & `*.onrender.com`)  
**Initial Checkpoint:** `b638db2`  
**Tracker Initialized:** November 22, 2026  

---

## Deployment Status Dashboard

```
+-----------------------------------------------------------------------------------------+
|                          QUESTFORGE AI STAGING DEPLOYMENT STATUS                        |
+------------------------------------+-----------------------------+----------------------+
| Stage                              | Target                      | Status               |
+------------------------------------+-----------------------------+----------------------+
| 01. Preflight Verification         | Local suites & clean git    | COMPLETED (PASS)     |
| 02. Private GitHub Repository      | Private GitHub remote       | IN PROGRESS          |
| 03. Cloudflare Pages Frontend      | questforge-ai-staging       | PENDING              |
| 04. Render Backend Service         | questforge-ai-api-staging   | PENDING              |
| 05. Connectivity & CORS            | Cross-origin HTTPS          | PENDING              |
| 06. Supabase Staging Auth          | Staging redirect URLs       | PENDING              |
| 07. Public Staging Security        | JWT + RLS + 0 secret leaks  | PENDING              |
| 08. Deployment Execution           | Cloudflare + Render live    | PENDING              |
| 09. Live End-to-End Verification   | Live browser & API tests    | PENDING              |
| 10. Final Staging Documentation    | Report & updated trackers   | PENDING              |
+------------------------------------+-----------------------------+----------------------+
```

---

## Detailed Step-by-Step Ledger

### Phase 01: Deployment Preflight
- [x] Inspect Git state: Clean working tree at `b638db2`.
- [x] Run Secret Scan: Verified `.gitignore` blocks `.env`, `backups/`, `*.dump`, `*.sql.gpg`. Sanitized `server/.env.example`.
- [x] Run Backend Regression Suite: `31/31` test cases passing (`npm --prefix server test`).
- [x] Run Cross-User Authorization Suite: `20/20` checks passing (`node scripts/verify_backend_authorization.js`).
- [x] Verify Frontend Production Build: Vite 6 builds 27 code-split chunks in 5.6s (`npm --prefix client run build`).
- [x] Verified zero API keys or service role secrets present in `client/dist/`.

### Phase 02: Private GitHub Repository
- [ ] Check `git remote -v` and GitHub CLI auth.
- [ ] Confirm repository is strictly **PRIVATE**.
- [ ] Push clean codebase to remote repository without rewriting history.

### Phase 03: Cloudflare Pages Frontend Deployment
- [ ] Configure `client/public/_redirects` (`/* /index.html 200`) for Single Page Application routing.
- [ ] Configure `client/public/robots.txt` with `User-agent: * Disallow: /` for staging protection.
- [ ] Deploy Vite SPA to Cloudflare Pages (Free plan) under `questforge-ai-staging`.
- [ ] Record live `https://questforge-ai-staging.pages.dev` URL.

### Phase 04: Render Free Backend Deployment
- [ ] Prepare Render service specification (`render.yaml` / dashboard config).
- [ ] Configure environment variables in Render secure vault.
- [ ] Bind server to `process.env.PORT` on `0.0.0.0`.
- [ ] Deploy Web Service (Free compute tier) under `questforge-ai-api-staging`.
- [ ] Verify health probe on `/api/health`.
- [ ] Implement cold-start resilient frontend state for 50–90s wake-up period.

### Phase 05: Connectivity & CORS Configuration
- [ ] Update backend CORS allowlist to include `https://questforge-ai-staging.pages.dev`.
- [ ] Update frontend `VITE_API_URL` to Render backend URL.
- [ ] Verify HTTPS end-to-end communication and preflight OPTIONS handling.

### Phase 06: Supabase Staging Auth Configuration
- [ ] Add staging redirect URLs to Supabase project `bwllksfjjxmumrrqaifa`.
- [ ] Preserve local development redirect URLs.
- [ ] Verify synthetic user registration, login, and session restoration.

### Phase 07: Public Staging Security Audit
- [ ] Verify cryptographic JWT validation on live hosted endpoints.
- [ ] Verify non-owner access rejection (404/401) on live hosted endpoints.
- [ ] Verify rate limiting and input sanitization on hosted backend.

### Phase 08: Live Staging End-to-End Verification
- [ ] Test all 14 core frontend routes on `*.pages.dev`.
- [ ] Test synthetic file upload, OCR, and AI extraction via hosted backend.
- [ ] Test student dashboard persistence in Mumbai PostgreSQL.
- [ ] Test official report generation.

### Phase 09: Final Documentation
- [ ] Author `STAGING_DEPLOYMENT_REPORT.md` with live URLs, cold-start behavior, and limitations.
- [ ] Update `QUESTFORGE_AI_MASTER_EXECUTION_TRACKER.md`.
