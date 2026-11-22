# QuestForge AI — Autonomous Staging Deployment Tracker

**Phase:** 13 — Autonomous Free-Tier Staging Deployment  
**Approved Configuration:** Vercel Hobby (Frontend) + Render Web Service (Backend) — \$0/month Academic Demonstration Hosting  
- **Frontend:** Vercel Hobby (Free Plan) &rarr; `https://questforge-ai-staging.vercel.app` (LIVE)  
- **Backend:** Render Web Service (Free Plan) &rarr; `https://questforge-ai-api-staging.onrender.com` (PENDING DEPLOY)  
- **Database:** Supabase Cloud PostgreSQL 17 (Mumbai `bwllksfjjxmumrrqaifa`, Free Plan)  
- **AI Integrations:** Groq Cloud (`openai/gpt-oss-120b`, live) + NVIDIA NIM (`nvidia/nemotron-3-ultra-550b-a55b`, live); Gemini (`gemini-3.8-flash`, billing restricted)  
- **Domains:** Hosting-provided staging subdomains only (`*.vercel.app` & `*.onrender.com`)  
- **GitHub Repository:** `https://github.com/selfabhijeetkumar/questforge-ai` (Strictly PRIVATE)  
- **Latest Checkpoint:** `3caf4b7`  

---

## Deployment Status Dashboard

```
+-----------------------------------------------------------------------------------------+
|                          QUESTFORGE AI STAGING DEPLOYMENT STATUS                        |
+------------------------------------+-----------------------------+----------------------+
| Stage                              | Target                      | Status               |
+------------------------------------+-----------------------------+----------------------+
| 01. Preflight Verification         | Local suites & clean git    | COMPLETED (PASS)     |
| 02. Private GitHub Repository      | Private GitHub remote       | COMPLETED (PASS)     |
| 03. Vercel Frontend Deployment     | questforge-ai-staging       | COMPLETED (LIVE)     |
| 04. Render Backend Service         | questforge-ai-api-staging   | READY TO DEPLOY      |
| 05. Connectivity & CORS            | Cross-origin HTTPS          | CONFIGURED (PASS)    |
| 06. Supabase Staging Auth          | Staging redirect URLs       | READY TO CONFIGURE   |
| 07. Public Staging Security        | JWT + RLS + 0 secret leaks  | VERIFIED (PASS)      |
| 08. Deployment Execution           | Vercel Live / Render Next   | IN PROGRESS          |
| 09. Live End-to-End Verification   | Live browser & API tests    | PENDING RENDER       |
| 10. Final Staging Documentation    | Report & updated trackers   | IN PROGRESS          |
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
- [x] Check `git remote -v` and GitHub CLI auth (authenticated as `selfabhijeetkumar`).
- [x] Sanitize local Git history via `git-filter-repo` (purged `.env.example` & `server/.env.example` secrets).
- [x] Rescan Git history across all 22 commits: 0 secrets, 0 JWTs, 0 database passwords detected.
- [x] Run full regression tests & build: 31/31 backend tests, 20/20 auth checks, 27 Vite chunks.
- [x] Created private GitHub repository: `gh repo create questforge-ai --private --source=. --remote=origin --push`.
- [x] Confirmed repository is strictly **PRIVATE** (`isPrivate: true`, `visibility: PRIVATE`).
- [x] Pushed clean master branch to `origin/master`.

### Phase 03: Vercel Frontend Deployment (Hobby Plan)
- [x] Authenticated Vercel CLI (`selfabhijeetkumar-9786`).
- [x] Linked project `questforge-ai-staging` to GitHub repo `selfabhijeetkumar/questforge-ai`.
- [x] Created `client/vercel.json` with SPA catch-all rewrite (`/* -> /index.html`) and `X-Robots-Tag: noindex, nofollow`.
- [x] Configured environment variables in Vercel:
  - `VITE_API_URL` = `https://questforge-ai-api-staging.onrender.com`
  - `VITE_SUPABASE_URL` = `https://bwllksfjjxmumrrqaifa.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOi...` (safe public anon token)
- [x] Deployed production build: `https://questforge-ai-staging.vercel.app` (Deployment ID: `dpl_FBGZDgwggJDf2hETfGdwGLTkWMiS`).
- [x] Verified direct route navigation via curl: `/about`, `/scholarships`, `/upload`, `/dashboard` all return HTTP 200 with index.html.

### Phase 04: Render Free Backend Deployment
- [x] Prepared Blueprint specification `render.yaml` with Free plan, Singapore region, root dir `server/`, build `npm install --omit=dev`, start `node src/index.js`, health check `/api/health`.
- [x] Configured `CLIENT_URL=https://questforge-ai-staging.vercel.app` in `render.yaml`.
- [x] Verified server listens on `0.0.0.0:${PORT}` and handles `SIGTERM`.
- [x] Wrapped OCR worker creation in `try...finally { await worker.terminate(); }` to prevent RAM exhaustion on Render 512MB limit.
- [ ] Deploy Web Service via Render Dashboard Blueprint / One-Click Connect.

### Phase 05: Connectivity & CORS Configuration
- [x] Backend CORS allowlist updated:
  - Dynamic matching for `*.vercel.app` origins
  - Dynamic matching for `*.pages.dev` origins
  - Configured `CLIENT_URL` support
  - Localhost `5173` origins preserved for local development
- [x] Preflight `OPTIONS` requests allowed with `Authorization` and `Content-Type` headers.
- [x] Frontend `client/src/services/api.js` updated to resolve `VITE_API_URL || VITE_API_BASE_URL` with `/api` normalization.

### Phase 06: Supabase Staging Auth Configuration
- [ ] Set Supabase Site URL to `https://questforge-ai-staging.vercel.app`.
- [ ] Add redirect URLs:
  - `https://questforge-ai-staging.vercel.app/**`
  - `https://questforge-ai-staging.vercel.app/login`
  - `https://questforge-ai-staging.vercel.app/reset-password`
  - `http://localhost:5173/**` (preserves local development)

### Phase 07: Public Staging Security Audit
- [x] Cryptographic JWT validation on all `/api/*` endpoints.
- [x] Cross-user data isolation verified (20/20 test checks passed).
- [x] Rate limiting active on all API routes (`100 req/15min`).
- [x] Service-role key strictly excluded from frontend bundle.
- [x] Robots `noindex, nofollow` header confirmed on live Vercel responses.

### Phase 08: Live Staging End-to-End Verification
- [x] Live Vercel frontend responds HTTP 200 OK across core SPA routes.
- [ ] Verify Render live health check at `https://questforge-ai-api-staging.onrender.com/api/health`.
- [ ] Run synthetic document upload, OCR, AI extraction, and audit report generation through hosted endpoints.

### Phase 09: Final Documentation
- [x] `GIT_HISTORY_SECURITY_REMEDIATION.md` completed.
- [x] `STAGING_ENV_CONFIG.md` completed.
- [ ] `STAGING_DEPLOYMENT_REPORT.md` authoring.
- [ ] `QUESTFORGE_AI_MASTER_EXECUTION_TRACKER.md` update.
