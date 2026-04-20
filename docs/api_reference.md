# API Reference

| Method | Path | Description |
|---|---|---|
| GET  | `/health` | Liveness probe |
| POST | `/api/analyze` | Run full agent graph synchronously |
| GET  | `/api/stream/{query}` | SSE stream of agent steps |
| GET  | `/api/cves?keyword=...` | Latest NVD CVEs |
| GET  | `/api/report/{session_id}` | Last generated report |
