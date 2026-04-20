"""Shared state for the Cyber Sentinel LangGraph."""
from typing import TypedDict, List, Optional


class ThreatData(TypedDict, total=False):
    id: str
    description: str
    cvss_score: Optional[float]
    source: str
    published: Optional[str]


class MitreMapping(TypedDict, total=False):
    technique_id: str
    technique_name: str
    tactic: str
    confidence: float
    threat_id: str


class CyberAgentState(TypedDict, total=False):
    messages: List[dict]
    query: str
    threats: List[ThreatData]
    enriched_threats: List[dict]
    mitre_mappings: List[MitreMapping]
    severity_scores: List[float]
    report: str
    current_agent: str
    iteration: int
    error: Optional[str]
