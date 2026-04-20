"""Supervisor agent - routes workflow based on state."""
import os
import logging

log = logging.getLogger(__name__)


def _route(state: dict) -> str:
    if state.get("report"):
        return "end"
    if not state.get("threats"):
        return "threat_intel"
    if not state.get("enriched_threats"):
        return "cve_triage"
    if not state.get("mitre_mappings"):
        return "mitre_mapper"
    return "report_writer"


def supervisor_agent(state: dict) -> dict:
    """Decide which specialist agent runs next."""
    next_agent = _route(state)
    log.info("[supervisor] -> %s", next_agent)
    iteration = state.get("iteration", 0) + 1
    return {
        "current_agent": next_agent,
        "iteration": iteration,
        "messages": state.get("messages", []) + [{"role":"supervisor","content":f"routing to {next_agent}"}],
    }

SUPERVISOR_HAS_LLM = bool(os.getenv("OPENAI_API_KEY") or os.getenv("GROQ_API_KEY"))
