"""MITRE Mapper agent."""
import logging
log = logging.getLogger(__name__)

def mitre_mapper_agent(state: dict) -> dict:
    mappings = []
    try:
        from rag.retriever import search_mitre_techniques
    except Exception:
        search_mitre_techniques = None
    for t in state.get("enriched_threats", []):
        if not search_mitre_techniques:
            mappings.append({"threat_id":t.get("id",""),"technique_id":"T0000","technique_name":"Unknown","tactic":"Unknown","confidence":0.0}); continue
        try:
            hits = search_mitre_techniques(t.get("description",""), n_results=1)
            if hits:
                h = hits[0]
                mappings.append({"threat_id":t.get("id",""),"technique_id":h.get("technique_id",""),"technique_name":h.get("name",""),"tactic":h.get("tactic",""),"confidence":float(h.get("score",0.7))})
        except Exception as e:
            log.warning("%s", e)
    return {"mitre_mappings": mappings, "messages": state.get("messages",[])+[{"role":"mitre_mapper","content":f"mapped {len(mappings)}"}]}
