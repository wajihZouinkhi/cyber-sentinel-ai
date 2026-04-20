"""FastAPI routes with SSE streaming."""
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from .models import ThreatAnalysisRequest, ThreatAnalysisResponse

router = APIRouter()
_REPORTS: dict = {}

def _initial_state(query: str) -> dict:
    return {"query": query, "messages": [], "threats": [], "enriched_threats": [],
            "mitre_mappings": [], "severity_scores": [], "report": "",
            "current_agent": "", "iteration": 0, "error": None}

@router.get("/health")
def health():
    return {"status": "ok", "version": "1.0.0"}

@router.post("/api/analyze", response_model=ThreatAnalysisResponse)
def analyze(req: ThreatAnalysisRequest):
    from agents.graph import graph
    cfg = {"configurable": {"thread_id": req.session_id}}
    final = graph.invoke(_initial_state(req.query), config=cfg)
    resp = ThreatAnalysisResponse(
        session_id=req.session_id,
        report=final.get("report",""),
        threats_count=len(final.get("threats",[])),
        mitre_mappings=final.get("mitre_mappings",[]),
        severity_scores=final.get("severity_scores",[]),
    )
    _REPORTS[req.session_id] = resp
    return resp

@router.get("/api/stream/{query}")
async def stream_analysis(query: str, session_id: str = "default"):
    from agents.graph import graph
    async def gen():
        cfg = {"configurable": {"thread_id": session_id}}
        async for event in graph.astream(_initial_state(query), config=cfg, stream_mode="updates"):
            yield f"data: {json.dumps(event, default=str)}\n\n"
        yield "data: [DONE]\n\n"
    return StreamingResponse(gen(), media_type="text/event-stream")

@router.get("/api/cves")
def cves(keyword: str = "cve"):
    from tools.nvd_tool import search_nvd_cves
    return search_nvd_cves.invoke({"keyword": keyword, "results_per_page": 10})

@router.get("/api/report/{session_id}")
def get_report(session_id: str):
    r = _REPORTS.get(session_id)
    return r.dict() if r else {"error": "no report"}
