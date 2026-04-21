# Deploying Cyber Sentinel AI

## Architecture
- **Backend**: FastAPI (Python 3.11) on `:8000` — `backend/`
- **Frontend**: Next.js 14 on `:3000` — `frontend/`
- Frontend talks to backend via `NEXT_PUBLIC_API_URL`.

## Quick start (local, Docker)
```bash
cp .env.example .env               # fill in API keys
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:8000/docs
```

## Production hosting

### Frontend → Vercel
1. Import the GitHub repo, set **Root Directory** = `frontend/`.
2. Env vars:
   - `NEXT_PUBLIC_API_URL` = `https://<your-backend-host>`
3. Install command is already set via `frontend/vercel.json` (`npm install --legacy-peer-deps`).

### Backend → Railway / Render / Fly.io
Uses `backend/Dockerfile`. Required env vars:
| var | required | purpose |
|---|---|---|
| `OPENAI_API_KEY` or `GROQ_API_KEY` | yes (for real agents) | LLM calls |
| `CORS_ORIGINS` | **yes in prod** | e.g. `https://cyber-sentinel.vercel.app` |
| `FRONTEND_URL` | alt to `CORS_ORIGINS` | single origin shortcut |
| `NVD_API_KEY`, `OTX_API_KEY`, `VIRUSTOTAL_API_KEY`, `SHODAN_API_KEY` | optional | threat-intel enrichment |
| `LOG_LEVEL` | optional | default `INFO` |

**Health check**: `GET /health` returns `{"status":"ok"}`. Configure the host to probe this endpoint.

## Security checklist (production)
- [x] CORS is env-driven (`CORS_ORIGINS`). Wildcard `*` is only used if explicitly set. `allow_credentials` is auto-disabled when `*`.
- [x] Next.js bumped to `^14.2.33` (patches GHSA-9gr5-c3w2-mv9x SSRF).
- [x] `agents/mitre_mapper.py` no longer swallows RAG errors silently.
- [ ] Add an API key / auth layer before exposing agent endpoints publicly (not implemented — routes are open).
- [ ] Rate-limit `/agents/*` endpoints.
- [ ] Persist `chroma_db/` on a durable volume (`docker-compose.yml` already mounts one).

## Known notes
- Use `npm install --legacy-peer-deps` (`eslint@^8.57` + `eslint-config-next@14.2`).
- Backend RAG deps (chromadb, sentence-transformers) are heavy; plan for ≥1 GB RAM. If they are not installed, the agent router falls back gracefully and `main.py` logs a warning.
