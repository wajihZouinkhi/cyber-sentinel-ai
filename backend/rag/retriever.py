"""ChromaDB retrieval helpers."""
import os, chromadb
from .embeddings import embed

def _client():
    return chromadb.PersistentClient(path=os.getenv("CHROMA_PATH", "./chroma_db"))

def search_mitre_techniques(query: str, n_results: int = 3):
    try:
        col = _client().get_collection("mitre_attack")
    except Exception:
        return []
    res = col.query(query_embeddings=embed([query]), n_results=n_results)
    out = []
    for i, tid in enumerate(res.get("ids", [[]])[0]):
        meta = res.get("metadatas", [[]])[0][i]
        out.append({"technique_id": tid, "name": meta.get("name",""), "tactic": meta.get("tactic",""), "score": 1.0 - float(res.get("distances", [[0]])[0][i])})
    return out

def search_cve_knowledge(query: str, n_results: int = 3):
    try:
        col = _client().get_collection("cve_knowledge")
    except Exception:
        return []
    res = col.query(query_embeddings=embed([query]), n_results=n_results)
    out = []
    for i, cid in enumerate(res.get("ids", [[]])[0]):
        out.append({"id": cid, "description": res.get("documents", [[]])[0][i]})
    return out
