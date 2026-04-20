"""OTX."""
import os, httpx
from langchain.tools import tool
@tool
def search_otx_pulses(query: str, limit: int=5) -> list:
    """Search OTX pulses."""
    key = os.getenv("OTX_API_KEY","")
    if not key: return []
    try:
        r = httpx.get("https://otx.alienvault.com/api/v1/search/pulses", params={"q":query,"limit":limit}, headers={"X-OTX-API-KEY":key}, timeout=15)
        r.raise_for_status(); res = r.json().get("results",[])
    except Exception:
        return []
    return [{"id":p.get("id",""),"source":"OTX","description":(p.get("name","")+" - "+p.get("description",""))[:300],"iocs":len(p.get("indicators",[])),"cvss":None} for p in res]
