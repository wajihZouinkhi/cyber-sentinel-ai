"""CVE Triage agent."""
import logging
log = logging.getLogger(__name__)

def _sev(s):
    if s is None: return 0.0, "unknown"
    if s >= 9.0: return s, "critical"
    if s >= 7.0: return s, "high"
    if s >= 4.0: return s, "medium"
    return s, "low"

def cve_triage_agent(state: dict) -> dict:
    en, sc = [], []
    for t in state.get("threats", []):
        sc0, lvl = _sev(t.get("cvss"))
        en.append({**t, "severity_level": lvl})
        sc.append(sc0)
    return {"enriched_threats": en, "severity_scores": sc, "messages": state.get("messages",[])+[{"role":"cve_triage","content":f"triaged {len(en)}"}]}
