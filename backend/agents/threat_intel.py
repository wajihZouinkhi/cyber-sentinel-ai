"""Threat Intel agent."""
import logging
log = logging.getLogger(__name__)

def threat_intel_agent(state: dict) -> dict:
    query = state.get("query", "")
    threats = []
    try:
        from tools.nvd_tool import search_nvd_cves
        threats.extend(search_nvd_cves.invoke({"keyword": query, "results_per_page": 5}))
    except Exception as e:
        log.warning("NVD failed: %s", e)
    try:
        from tools.cisa_tool import fetch_cisa_kev
        threats.extend(fetch_cisa_kev.invoke({"limit": 5}))
    except Exception as e:
        log.warning("CISA failed: %s", e)
    return {"threats": threats, "messages": state.get("messages",[]) + [{"role":"threat_intel","content":f"fetched {len(threats)} threats"}]}
