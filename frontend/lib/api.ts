const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

export type Severity = "low" | "medium" | "high" | "critical"
export type Threat = { id: string; title: string; source: string; severity: Severity; ts: string; mitre?: string }
export type AgentEvent = { id: string; agent: string; thought: string; ts: string; kind: "thought" | "action" | "result" }
export type Stat = { label: string; value: number | string; delta?: number; unit?: string }

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  if (!API_URL) return fallback
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" })
    if (!res.ok) return fallback
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

export const api = {
  threats: (limit = 20) => safeFetch<Threat[]>(`/threats?limit=${limit}`, mockThreats),
  agents:  (limit = 50) => safeFetch<AgentEvent[]>(`/agents/events?limit=${limit}`, mockAgentEvents),
  stats:   ()           => safeFetch<Stat[]>(`/stats`, mockStats),
  streamAgents: (onEvent: (e: AgentEvent) => void): (() => void) => {
    if (!API_URL) {
      const id = setInterval(() => onEvent(randomAgentEvent()), 2200)
      return () => clearInterval(id)
    }
    const es = new EventSource(`${API_URL}/agents/stream`)
    es.onmessage = (m) => { try { onEvent(JSON.parse(m.data)) } catch {} }
    return () => es.close()
  },
  streamThreats: (onEvent: (t: Threat) => void): (() => void) => {
    if (!API_URL) {
      const id = setInterval(() => onEvent(randomThreat()), 3500)
      return () => clearInterval(id)
    }
    const es = new EventSource(`${API_URL}/threats/stream`)
    es.onmessage = (m) => { try { onEvent(JSON.parse(m.data)) } catch {} }
    return () => es.close()
  },
}

const SEVERITIES: Severity[] = ["low", "medium", "high", "critical"]
const SOURCES = ["edr-sensor-01", "siem-core", "network-tap", "cloud-trail", "auth-service", "email-gw"]
const TITLES = [
  "Suspicious PowerShell encoded command",
  "Credential dump via LSASS access",
  "Anomalous outbound traffic to rare ASN",
  "Privilege escalation attempt",
  "Phishing link clicked by user",
  "Known C2 beacon pattern",
  "Ransomware canary file touched",
  "Kerberoasting activity detected",
]
const AGENTS = ["Recon", "Analysis", "Hunt", "Response"]
const THOUGHTS = [
  "Correlating IOC with threat intel feeds…",
  "Pivoting on source IP across last 24h",
  "Matched TTP to MITRE T1059.001",
  "Enriching user context from IdP",
  "Drafting containment playbook",
  "Scoring risk: 8.7 (high)",
  "Querying knowledge base for APT29 overlap",
  "Proposing isolation of host EP-2241",
]
const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const nowIso = () => new Date().toISOString()

function randomThreat(): Threat {
  return {
    id: `T-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    title: rand(TITLES), source: rand(SOURCES), severity: rand(SEVERITIES),
    ts: nowIso(), mitre: `T${1000 + Math.floor(Math.random() * 600)}`,
  }
}
function randomAgentEvent(): AgentEvent {
  return {
    id: `A-${Math.random().toString(36).slice(2, 9)}`,
    agent: rand(AGENTS), thought: rand(THOUGHTS), ts: nowIso(),
    kind: rand(["thought", "action", "result"]) as AgentEvent["kind"],
  }
}

const mockThreats: Threat[] = Array.from({ length: 12 }, randomThreat)
const mockAgentEvents: AgentEvent[] = Array.from({ length: 8 }, randomAgentEvent)
const mockStats: Stat[] = [
  { label: "Active Threats", value: 47, delta: 12, unit: "today" },
  { label: "Agents Online", value: "4 / 4", delta: 0 },
  { label: "MTTR", value: "3.2m", delta: -18, unit: "vs last week" },
  { label: "Coverage", value: "92%", delta: 4, unit: "MITRE" },
]
