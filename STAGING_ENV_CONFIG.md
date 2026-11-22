# QuestForge AI — Staging Deployment Configuration Guide

**Environment:** Academic Demonstration Staging (\$0/month)  
**Frontend Platform:** Cloudflare Pages (Free Plan)  
**Backend Platform:** Render Web Service (Free Plan)  
**Database:** Supabase Cloud PostgreSQL 17 (Mumbai `bwllksfjjxmumrrqaifa`)  
**Repository:** [https://github.com/selfabhijeetkumar/questforge-ai](https://github.com/selfabhijeetkumar/questforge-ai) (PRIVATE)  

---

## 1. Render Backend Deployment (`questforge-ai-api-staging`)

### Step-by-Step via Render Dashboard:
1. Go to [dashboard.render.com](https://dashboard.render.com) and sign in.
2. Click **New +** &rarr; **Blueprint** (or **Web Service**).
3. Connect your GitHub account and select repository `selfabhijeetkumar/questforge-ai`.
4. If using **Blueprint**, Render will automatically detect `render.yaml` at the root of the repository.
5. If creating manually as a **Web Service**:
   - **Name:** `questforge-ai-api-staging`
   - **Region:** `Singapore` (closest free tier region to Mumbai database)
   - **Branch:** `master`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install --omit=dev`
   - **Start Command:** `node src/index.js`
   - **Instance Type:** `Free`
   - **Health Check Path:** `/api/health`
6. Under **Environment Variables**, configure the following (exact values are in your local `server/.env`):

| Key | Recommended Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Enables production security & logging |
| `PORT` | `5000` | Render dynamically routes traffic to this port |
| `CLIENT_URL` | `https://questforge-ai-staging.pages.dev` | Staging Cloudflare Pages origin |
| `SUPABASE_URL` | `https://bwllksfjjxmumrrqaifa.supabase.co` | Supabase Cloud Mumbai endpoint |
| `SUPABASE_ANON_KEY` | *(copy from server/.env)* | Supabase public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | *(copy from server/.env)* | Supabase confidential service role key |
| `GROQ_API_KEY` | *(copy from server/.env)* | Groq Cloud operational API key |
| `NVIDIA_API_KEY` | *(copy from server/.env)* | NVIDIA NIM operational API key |
| `GEMINI_API_KEY` | *(copy from server/.env)* | Google AI Studio authenticated key |

7. Click **Create Web Service**.
8. Once deployment finishes, verify health check at:  
   `https://questforge-ai-api-staging.onrender.com/api/health`

---

## 2. Cloudflare Pages Frontend Deployment (`questforge-ai-staging`)

### Step-by-Step via Cloudflare Dashboard:
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign in.
2. Navigate to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
3. Select your GitHub account `selfabhijeetkumar` and repository `questforge-ai`.
4. Set up the build configuration:
   - **Project Name:** `questforge-ai-staging`
   - **Production Branch:** `master`
   - **Framework Preset:** `Vite`
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Build Output Directory:** `dist`
5. Under **Environment Variables**, add:

| Variable Name | Value |
|---|---|
| `VITE_API_URL` | `https://questforge-ai-api-staging.onrender.com` |
| `VITE_SUPABASE_URL` | `https://bwllksfjjxmumrrqaifa.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | *(copy from client/.env)* |

6. Click **Save and Deploy**.
7. Cloudflare Pages will build the SPA and deploy to:  
   `https://questforge-ai-staging.pages.dev`
   *(SPA routing fallback `/* /index.html 200` is already configured in `client/public/_redirects`).*

---

## 3. Supabase Auth Configuration (`bwllksfjjxmumrrqaifa`)

In the Supabase Dashboard ([supabase.com/dashboard/project/bwllksfjjxmumrrqaifa](https://supabase.com/dashboard/project/bwllksfjjxmumrrqaifa)):
1. Navigate to **Authentication** &rarr; **URL Configuration**.
2. Set **Site URL** to:
   `https://questforge-ai-staging.pages.dev`
3. In **Redirect URLs**, ensure the following are listed:
   - `https://questforge-ai-staging.pages.dev/**`
   - `https://questforge-ai-staging.pages.dev/login`
   - `https://questforge-ai-staging.pages.dev/reset-password`
   - `http://localhost:5173/**` (preserves local development)
4. Click **Save**.

---

## 4. Alternative: Autonomous Deployment via CLI Tokens

If you prefer autonomous CLI deployment without using the browser:
- Provide `CLOUDFLARE_API_TOKEN` & `CLOUDFLARE_ACCOUNT_ID` -> Deploys frontend immediately via `wrangler pages deploy`.
- Provide `RENDER_API_KEY` -> Provisions backend immediately via Render REST API.
