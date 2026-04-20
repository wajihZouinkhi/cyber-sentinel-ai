# Agent Design

Each agent is a pure function `(state) -> partial_state` using LangGraph's
`StateGraph`. The supervisor sets `state["current_agent"]` and conditional
edges route accordingly. A `MemorySaver` checkpointer persists runs per
`thread_id` so streaming + resume work.
