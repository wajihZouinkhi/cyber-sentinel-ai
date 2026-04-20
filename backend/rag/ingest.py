"""Ingest MITRE ATT&CK + CVE knowledge into ChromaDB."""
import os, json, httpx, chromadb
from .embeddings import embed

MITRE_URL = "https://raw.githubusercontent.com/mitre/cti/master/enterprise-attack/enterprise-attack.json"

def _client():
    return chromadb.PersistentClient(path=os.getenv("CHROMA_PATH", "./chroma_db"))

def ingest_mitre():
    r = httpx.get(MITRE_URL, timeout=60); r.raise_for_status()
    bundle = r.json()
    techs = []
    for o in bundle.get("objects", []):
        if o.get("type") != "attack-pattern": continue
        ext = next((x for x in o.get("external_references", []) if x.get("source_name") == "mitre-attack"), {})
        tid = ext.get("external_id")
        if not tid: continue
        tactics = ",".join(p.get("phase_name","") for p in o.get("kill_chain_phases", []))
        techs.append({"id": tid, "name": o.get("name",""), "desc": (o.get("description","") or "")[:1200], "tactic": tactics})
    col = _client().get_or_create_collection("mitre_attack")
    col.upsert(ids=[t["id"] for t in techs],
               documents=[t["desc"] or t["name"] for t in techs],
               embeddings=embed([t["desc"] or t["name"] for t in techs]),
               metadatas=[{"name": t["name"], "tactic": t["tactic"]} for t in techs])
    return len(techs)

def ingest_cves(keyword="log4j", limit=20):
    from tools.nvd_tool import search_nvd_cves
    cves = search_nvd_cves.invoke({"keyword": keyword, "results_per_page": limit})
    if not cves: return 0
    col = _client().get_or_create_collection("cve_knowledge")
    col.upsert(ids=[c["id"] for c in cves],
               documents=[c["description"] for c in cves],
               embeddings=embed([c["description"] for c in cves]),
               metadatas=[{"cvss": c.get("cvss") or 0.0, "published": c.get("published") or ""} for c in cves])
    return len(cves)

if __name__ == "__main__":
    print("mitre:", ingest_mitre())
    print("cves:", ingest_cves())
