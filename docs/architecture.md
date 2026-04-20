# Architecture

Cyber Sentinel AI uses a supervisor-driven LangGraph to orchestrate specialist agents.

## Components
- **Supervisor** - routes workflow based on current state.
- **Threat Intel Agent** - pulls CVEs (NVD), KEV (CISA), and pulses (OTX).
- **CVE Triage Agent** - enriches threats with CVSS + RAG similarity search.
- **MITRE Mapper Agent** - maps threats to ATT&CK TTPs via ChromaDB RAG.
- **Report Writer Agent** - produces final Markdown incident report.

## Data flow
User query -> FastAPI `/api/stream` -> LangGraph astream -> SSE -> Next.js dashboard.
