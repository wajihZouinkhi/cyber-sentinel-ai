"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search } from "lucide-react"
import { useState } from "react"

const entries = [
  { title: "APT29 - Cozy Bear", tags: ["threat-actor", "russia", "apt"], excerpt: "Russian state-sponsored group known for stealthy, long-term intrusions." },
  { title: "LockBit 3.0 Ransomware", tags: ["ransomware", "malware"], excerpt: "Ransomware-as-a-Service with fast encryption and double extortion." },
  { title: "T1566 - Phishing", tags: ["mitre", "initial-access"], excerpt: "Adversaries send phishing messages to gain access to victim systems." },
  { title: "Living off the Land Binaries", tags: ["technique", "evasion"], excerpt: "Use of built-in OS binaries to evade detection (LOLBins)." },
]

export default function KnowledgePage() {
  const [q, setQ] = useState("")
  const filtered = entries.filter(e =>
    e.title.toLowerCase().includes(q.toLowerCase()) ||
    e.tags.some(t => t.includes(q.toLowerCase()))
  )
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground">Threat actors, malware, and TTP intelligence.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search intel..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((e) => (
          <Card key={e.title} className="glass">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="rounded-lg bg-accent/10 p-2"><BookOpen className="h-5 w-5 text-accent" /></div>
              <CardTitle className="text-base">{e.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{e.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
