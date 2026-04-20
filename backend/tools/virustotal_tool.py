"""VirusTotal."""
import os, httpx
from langchain.tools import tool
@tool
def vt_lookup(indicator: str, kind: str="ip") -> dict:
    """VirusTotal v3 lookup."""
    key = os.getenv("VIRUSTOTAL_API_KEY","")
    if not key: return {"error":"no api key"}
    p = "ip_addresses" if kind=="ip" else "domains"
    try:
        r = httpx.get(f"https://www.virustotal.com/api/v3/{p}/{indicator}", headers={"x-apikey":key}, timeout=15)
        r.raise_for_status()
        return {"indicator":indicator,"stats":r.json().get("data",{}).get("attributes",{}).get("last_analysis_stats",{})}
    except Exception as e:
        return {"error":str(e)}
