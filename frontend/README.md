# Cyber Sentinel AI — Frontend

A modern, Dribbble-style dashboard for the Cyber Sentinel autonomous SOC. Next.js 14 App Router, Tailwind, shadcn-style primitives, dark cyber theme with aurora gradients.

## Features

- 🎨 **Modern design system** — glass morphism, aurora mesh gradients, gradient borders, animated shimmer
- ⚡ **Pluggable API layer** — `lib/api.ts` auto-switches between rich mocks and your real FastAPI via `NEXT_PUBLIC_API_URL`
- 📡 **Live streams** — SSE for threats & agent thoughts; simulated fallback when offline
- 🧭 **Command palette** — ⌘K / Ctrl+K for navigation and actions
- 🔔 **Toast system** — built-in `useToast()` hook
- 🧩 **Pages** — Overview, Threats, Agents, MITRE ATT&CK, Reports, Knowledge, Login, 404
- 🌈 **Tailwind tokens** — HSL CSS variables, ready for theming

## Quick start

```bash
cd frontend
npm install
cp .env.example .env.local   # leave NEXT_PUBLIC_API_URL empty to use mocks
npm run dev
```

Open http://localhost:3000.

## Wiring the real backend

Only `lib/api.ts` needs changes. Set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Expected endpoints (adjust in `api.ts` if your routes differ):

| Method | Path | Shape |
|---|---|---|
| GET | `/stats` | `Stat[]` |
| GET | `/threats?limit=20` | `Threat[]` |
| GET | `/agents/events?limit=50` | `AgentEvent[]` |
| GET | `/threats/stream` | SSE of `Threat` |
| GET | `/agents/stream` | SSE of `AgentEvent` |

## Docker

```bash
docker-compose up --build
```

## Stack

Next.js 14 · React 18 · Tailwind CSS · Radix UI · lucide-react · TypeScript
