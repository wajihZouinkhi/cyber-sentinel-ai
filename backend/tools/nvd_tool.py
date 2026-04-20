"""NIST NVD."""
import os, httpx
from langchain.tools import tool

@tool
def search_nvd_cves(keyword: str, results_per_page: int = 5) -> list:
    """Search NVD CVEs by keyword."""
    url = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    headers = {"apiKey": os.getenv("NVD_API_KEY","")} if os.getenv("NVD_API_KEY") else {}
    try:
        r = httpx.get(url, params={"keywordSearch": keyword, "resultsPerPage": results_per_page}, headers=headers, timeout=15)
        r.raise_for_status(); items = r.json().get("vulnerabilities",[])
    except Exception:
        return []
    out = []
    for c in items:
        cve = c.get("cve",{})
        descs = cve.get("descriptions",[{}])
        base = cve.get("metrics",{}).get("cvssMetricV31",[{}])[0].get("cvssData",{}).get("baseScore")
        out.append({"id":cve.get("id",""),"source":"NVD","description":(descs[0].get("value","") if descs else "")[:300],"published":cve.get("published"),"cvss":base})
    return out
