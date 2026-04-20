from pydantic import BaseModel
from typing import List, Optional, Any

class ThreatAnalysisRequest(BaseModel):
    query: str
    session_id: str = "default"
    stream: bool = True

class ThreatAnalysisResponse(BaseModel):
    session_id: str
    report: str
    threats_count: int
    mitre_mappings: List[Any]
    severity_scores: List[float]
