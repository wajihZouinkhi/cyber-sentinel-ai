"""Report Writer agent."""
import logging
log = logging.getLogger(__name__)

def report_writer_agent(state: dict) -> dict:
    q = state.get("query","")
    threats = state.get("enriched_threats",[])
    maps = state.get("mitre_mappings",[])
    L = [f"# Incident Report - {q}","","## Executive Summary",f"Detected {len(threats)} threats, mapped {len(maps)} ATT&CK techniques.","","## Threats Detected","| ID | Severity | CVSS | Description |","|---|---|---|---|"]
    for t in threats[:15]:
        L.append(f"| {t.get('id','-')} | {t.get('severity_level','-')} | {t.get('cvss','-')} | {str(t.get('description',''))[:120]} |")
    L += ["","## MITRE ATT&CK Mappings","| Technique | Name | Tactic | Conf |","|---|---|---|---|"]
    for m in maps[:15]:
        L.append(f"| {m.get('technique_id','-')} | {m.get('technique_name','-')} | {m.get('tactic','-')} | {m.get('confidence',0):.2f} |")
    L += ["","## Recommended Remediation","- Patch affected systems.","- Deploy detection rules."]
    return {"report": "\n".join(L), "messages": state.get("messages",[])+[{"role":"report_writer","content":"report ready"}]}
