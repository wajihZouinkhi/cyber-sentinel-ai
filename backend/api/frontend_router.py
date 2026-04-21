"""Frontend-compatible routes — emits mock-shaped events/lists for the Next.js dashboard.

Endpoints:
  GET  /stats             -> Stat[]
  GET  /threats           -> Threat[]
  GET  /agents/events     -> AgentEvent[]
  GET  /threats/stream    -> SSE of Threat
  GET  /agents/stream     -> SSE of AgentEvent

Swap the generators for real data when live agents are wired in.
"""
from __future__ import annotations
import asyncio, json, random, uuid
from datetime import datetime, timezone
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(tags=["frontend"])

SEVERITIES = ["low", "medium", "high", "critical"]
SOURCES = ["edr-sensor-01", "siem-core", "network-tap", "cloud-trail", "auth-service", "email-gw"]
TITLES = [
    "Suspicious PowerShell encoded command",
    "Credential dump via LSASS access",
    "Anomalous outbound traffic to rare ASN",
    "Privilege escalation attempt",
    "Phishing link clicked by user",
    "Known C2 beacon pattern",
    "Ransomware canary file touched",
    "Kerberoasting activity detected",
]
AGENTS = ["Recon", "Analysis", "Hunt", "Response"]
THOUGHTS = [
    "Correlating IOC with threat intel feeds…",
    "Pivoting on source IP across last 24h",
    "Matched TTP to MITRE T1059.001",
    "Enriching user context from IdP",
    "Drafting containment playbook",
    "Scoring risk: 8.7 (high)",
    "Querying knowledge base for APT29 overlap",
    "Proposing isolation of host EP-2241",
]
KINDS = ["thought", "action", "result"]


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _threat() -> dict:
    return {
        "id": f"T-{uuid.uuid4().hex[:7].upper()}",
        "title": random.choice(TITLES),
        "source": random.choice(SOURCES),
        "severity": random.choice(SEVERITIES),
        "ts": _now(),
        "mitre": f"T{1000 + random.randint(0, 599)}",
    }


def _agent_event() -> dict:
    return {
        "id": f"A-{uuid.uuid4().hex[:7]}",
        "agent": random.choice(AGENTS),
        "thought": random.choice(THOUGHTS),
        "ts": _now(),
        "kind": random.choice(KINDS),
    }


@router.get("/stats")
def stats():
    return [
        {"label": "Active Threats", "value": 47, "delta": 12, "unit": "today"},
        {"label": "Agents Online", "value": "4 / 4", "delta": 0},
        {"label": "MTTR", "value": "3.2m", "delta": -18, "unit": "vs last week"},
        {"label": "Coverage", "value": "92%", "delta": 4, "unit": "MITRE"},
    ]


@router.get("/threats")
def threats(limit: int = 20):
    return [_threat() for _ in range(max(1, min(limit, 100)))]


@router.get("/agents/events")
def agent_events(limit: int = 50):
    return [_agent_event() for _ in range(max(1, min(limit, 100)))]


@router.get("/threats/stream")
async def threats_stream():
    async def gen():
        try:
            while True:
                yield f"data: {json.dumps(_threat())}\n\n"
                await asyncio.sleep(3.5)
        except asyncio.CancelledError:
            return
    return StreamingResponse(gen(), media_type="text/event-stream")


@router.get("/agents/stream")
async def agents_stream():
    async def gen():
        try:
            while True:
                yield f"data: {json.dumps(_agent_event())}\n\n"
                await asyncio.sleep(2.2)
        except asyncio.CancelledError:
            return
    return StreamingResponse(gen(), media_type="text/event-stream")
