# Cyber Sentinel AI

Multi-agent cybersecurity platform for autonomous threat detection, CVE triage, MITRE ATT&CK mapping, and incident response automation using **LangGraph + RAG**.

## Architecture

```
                 User Query
                     |
                     v
               +-------------+
               | Supervisor  |<-----+
               +------+------+      |
                      |             |
      +---------------+-------------+
      |               |             |
      v               v             v
+-------------+  +------------+  +-----------+
|Threat Intel |->| CVE Triage |->| MITRE Map |
+-------------+  +------------+  +-----+-----+
                                     |
                                     v
                                +-------------+
                                |Report Writer|
                                +-------------+
```

## Features
- **LangGraph** multi-agent orchestration with supervisor routing
- **ChromaDB** RAG pipeline on MITRE ATT&CK STIX data
- Real-time **SSE streaming** of agent steps
- Integrations: NVD, CISA KEV, AlienVault OTX, VirusTotal, Shodan
- **Next.js 14** dashboard with dark GitHub-style theme

## Quickstart

```bash
cp .env.example .env         # add your API keys
docker-compose up --build
```

- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API docs: http://localhost:8000/docs

## Tech Stack

| Layer | Tech |
|---|---|
| Agents | LangGraph 0.2+, LangChain |
| LLM | OpenAI GPT-4o / Groq Llama 3.3 |
| Embeddings | sentence-transformers MiniLM |
| Vector DB | ChromaDB |
| Backend | FastAPI + SSE |
| Frontend | Next.js 14 + TS + Tailwind |

## Project layout

```
backend/     FastAPI app, LangGraph agents, RAG, tools
frontend/    Next.js 14 dashboard
data/        Sample alerts and logs
docs/        Architecture, agent design, API reference
```

See `docs/` for architecture, agent design, and API reference.

## License
MIT
