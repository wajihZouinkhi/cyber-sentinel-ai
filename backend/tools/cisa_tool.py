"""CISA KEV."""
import httpx
from langchain.tools import tool
URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
@tool
def fetch_cisa_kev(limit: int = 10) -> list:
    """Fetch recent CISA KEV entries."""
    try:
        r = httpx.get(URL, timeout=20); r.raise_for_status()
        v = r.json().get("vulnerabilities",[])[-limit:][::-1]
    except Exception:
        return []
    return [{"id":x.get("cveID",""),"source":"CISA-KEV","description":x.get("shortDescription",""),"vendor":x.get("vendorProject",""),"product":x.get("product",""),"cvss":None} for x in v]
