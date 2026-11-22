# QUESTFORGE AI — PRODUCTION DEPLOYMENT & DOMAIN SETUP GUIDE

**Document Version:** 1.0.0  
**Effective Date:** November 2026  
**Status:** BLOCKED PENDING USER CUSTOM DOMAIN SELECTION  

---

## 1. CUSTOM DOMAIN CONFIGURATION CHECKLIST

QuestForge AI requires a custom production domain prior to public release. Until the user registers a domain, this phase remains marked **BLOCKED**.

### 1.1 DNS Configuration Guide

When your custom domain (e.g., `questforge.ai` or `questforge.edu`) is registered:

| Record Type | Host / Name | Target / Value | Purpose |
|---|---|---|---|
| **A** | `@` (Apex) | `<Production Server IP>` or `<Vercel/Cloudflare Anycast IP>` | Routes root domain traffic |
| **CNAME** | `www` | `questforge.ai.` | Canonical alias redirect |
| **CNAME** | `api` (optional) | `<Backend Server CNAME>` | Dedicated API gateway routing |
| **TXT** | `@` | `v=spf1 ...` (if email service configured) | SPF email delivery validation |

---

## 2. HTTPS & TLS CERTIFICATION REQUIREMENTS

1. **Automatic Certificate Management:**
   - If deployed on **Vercel**, **Cloudflare Pages**, or **AWS CloudFront**, TLS 1.3 certificates are provisioned automatically via Let's Encrypt / DigiCert.
   - If deployed on a dedicated Linux VPS (Ubuntu/Debian) with Nginx:
     ```bash
     sudo apt install certbot python3-certbot-nginx
     sudo certbot --nginx -d questforge.ai -d www.questforge.ai
     ```
2. **HSTS Header:**
   The Express backend Helmet configuration enforces HTTP Strict Transport Security (`max-age=31536000; includeSubDomains`).
3. **Redirect Enforcement:**
   Ensure all incoming HTTP traffic on port 80 automatically redirects to HTTPS port 443 with a 301 Permanent Redirect.

---

## 3. PRODUCTION NGINX REVERSE PROXY TEMPLATE

For full-stack self-hosted deployment:

```nginx
server {
    listen 80;
    server_name questforge.ai www.questforge.ai;
    return 301 https://questforge.ai$request_uri;
}

server {
    listen 443 ssl http2;
    server_name questforge.ai;

    ssl_certificate /etc/letsencrypt/live/questforge.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/questforge.ai/privkey.pem;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Frontend Single-Page Application (Vite Build)
    location / {
        root /var/www/questforge-ai/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend Express REST API
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 15M;
    }
}
```

---

## 4. PRODUCTION ENVIRONMENT VARIABLES AUDIT

Before starting production processes, verify these variables in production secret managers (never commit to Git):

### Backend (`server/.env.production`):
```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=https://questforge.ai
AI_PRIMARY_PROVIDER=groq
AI_FAILOVER_ENABLED=true
AI_REQUEST_TIMEOUT_MS=45000
GROQ_API_KEY=<PROD_GROQ_KEY>
NVIDIA_API_KEY=<PROD_NVIDIA_KEY>
GEMINI_API_KEY=<PROD_GEMINI_KEY_WITH_BILLING>
SUPABASE_URL=https://<PROD_PROJECT>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<PROD_SERVICE_ROLE_SECRET>
```

### Frontend (`client/.env.production`):
```bash
VITE_API_URL=https://questforge.ai
VITE_SUPABASE_URL=https://<PROD_PROJECT>.supabase.co
VITE_SUPABASE_ANON_KEY=<PROD_ANON_PUBLIC_KEY>
```
