"""LangGraph assembly for the Cyber Sentinel multi-agent workflow."""
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

from .state import CyberAgentState
from .supervisor import supervisor_agent
from .threat_intel import threat_intel_agent
from .cve_triage import cve_triage_agent
from .mitre_mapper import mitre_mapper_agent
from .report_writer import report_writer_agent


def build_cyber_agent_graph():
    builder = StateGraph(CyberAgentState)
    builder.add_node("supervisor", supervisor_agent)
    builder.add_node("threat_intel", threat_intel_agent)
    builder.add_node("cve_triage", cve_triage_agent)
    builder.add_node("mitre_mapper", mitre_mapper_agent)
    builder.add_node("report_writer", report_writer_agent)
    builder.add_edge(START, "supervisor")
    builder.add_conditional_edges("supervisor", lambda s: s.get("current_agent", "end"), {"threat_intel":"threat_intel","cve_triage":"cve_triage","mitre_mapper":"mitre_mapper","report_writer":"report_writer","end":END})
    builder.add_edge("threat_intel", "supervisor")
    builder.add_edge("cve_triage", "supervisor")
    builder.add_edge("mitre_mapper", "supervisor")
    builder.add_edge("report_writer", END)
    return builder.compile(checkpointer=MemorySaver())

graph = build_cyber_agent_graph()
