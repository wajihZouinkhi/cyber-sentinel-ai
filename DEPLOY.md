# Cyber Sentinel AI — Deployment Guide

## Verified local run
Backend: cd backend && uvicorn main:app --host 0.0.0.0 --port 8000  ->  http://localhost:8000
Frontend: cd frontend && npm install --legacy-peer-deps && npm run dev  ->  http://localhost:3000

## Bugs fixed
1. frontend/package.json: eslint ^9.12.0 conflicted with eslint-config-next@14.2.5 (needs 7||8). Changed to ^8.57.0.
2. Next.js 14.2.5 has a published CVE -- recommend: npm i next@^14.2.33 --legacy-peer-deps before production.

## Observations (not blockers)
- main.py gracefully skips the full agent router if heavy deps (langgraph/chroma/...) are missing.
- mitre_mapper silently returns T0000 Unknown when the RAG retriever can't load. Log the error in prod.
- Backend CORS is allow_origins=["*"] -- tighten before going live.

## Hosting
- Backend: Dockerfile in backend/. Deploy to Fly.io/Railway/Render. Env from .env.example.
- Frontend: Deploy to Vercel. Set NEXT_PUBLIC_API_URL to your backend URL.
