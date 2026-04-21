"""MITRE Mapper agent."""
import logging

log = logging.getLogger(__name__)

try:
    from rag.retriever import search_mitre_techniques  # type: ignore
    _RETRIEVER_ERROR: Exception | None = None
except Exception as _e:  # pragma: no cover - optional RAG deps
    search_mitre_techniques = None  # type: ignore
    _RETRIEVER_ERROR = _e
    log.warning(
        "mitre_mapper: RAG retriever unavailable (%s). Falling back to T0000 Unknown. "
        "Install sentence-transformers + chromadb to enable real mapping.", _e,
    )


def mitre_mapper_agent(state: dict) -> dict:
    mappings = []
    for t in state.get("enriched_threats", []):
        tid = t.get("id", "")
        if search_mitre_techniques is None:
            mappings.append({
                "threat_id": tid,
                "technique_id": "T0000",
                "technique_name": "Unknown (RAG retriever unavailable)",
                "tactic": "Unknown",
                "confidence": 0.0,
            })
            continue
        try:
            hits = search_mitre_techniques(t.get("description", ""), n_results=1)
            if hits:
                h = hits[0]
                mappings.append({
                    "threat_id": tid,
                    "technique_id": h.get("technique_id", ""),
                    "technique_name": h.get("name", ""),
                    "tactic": h.get("tactic", ""),
                    "confidence": float(h.get("score", 0.7)),
                })
            else:
                mappings.append({
                    "threat_id": tid,
                    "technique_id": "T0000",
                    "technique_name": "No match",
                    "tactic": "Unknown",
                    "confidence": 0.0,
                })
        except Exception as e:
            log.exception("mitre_mapper failed for threat %s: %s", tid, e)
            mappings.append({
                "threat_id": tid,
                "technique_id": "T0000",
                "technique_name": f"Error: {e.__class__.__name__}",
                "tactic": "Unknown",
                "confidence": 0.0,
            })
    return {
        "mitre_mappings": mappings,
        "messages": state.get("messages", []) + [
            {"role": "mitre_mapper", "content": f"mapped {len(mappings)}"}
        ],
    }
