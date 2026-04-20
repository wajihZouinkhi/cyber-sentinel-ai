"""Sigma rule generator (template)."""
from langchain.tools import tool
@tool
def generate_sigma_rule(technique_id: str, technique_name: str = "") -> str:
    """Generate a basic Sigma rule for a MITRE technique."""
    return f"""title: Detect {technique_name or technique_id}
id: {technique_id}-auto
status: experimental
description: Auto-generated stub for {technique_id} ({technique_name})
tags:
  - attack.{technique_id.lower()}
logsource:
  product: windows
detection:
  selection:
    EventID: 1
  condition: selection
level: medium
"""
