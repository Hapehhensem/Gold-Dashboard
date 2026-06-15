# XAUUSD Intel Dashboard

Gold Trading Intelligence System with MT5 Auto-Entry

## Deploy ke Vercel

### Step 1 — Push ke GitHub
```bash
git init
git add .
git commit -m "XAUUSD Intel Dashboard v1.0"
git remote add origin https://github.com/USERNAME/xauusd-dashboard.git
git push -u origin main
```

### Step 2 — Deploy Vercel
1. Login vercel.com
2. "Add New Project" → Import dari GitHub
3. Select repo `xauusd-dashboard`
4. Click Deploy

### Step 3 — Akses
URL: `https://xauusd-dashboard.vercel.app`

## Setup

1. Buka dashboard
2. Masuk Anthropic API key (dari console.anthropic.com)
3. Masuk MT5 Bridge URL (dari Cloudflare Tunnel kat VPS)
4. Click Launch

## Files

- `index.html` — Full dashboard (React + TA indicators + AI analysis + MT5 control)
- `api/analyze.js` — Serverless proxy untuk Claude API (no CORS)
- `vercel.json` — Routing config
