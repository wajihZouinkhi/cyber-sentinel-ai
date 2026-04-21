"use client"
import { useEffect, useState } from "react"
import { Activity, Bot, Radar, ShieldCheck, Sparkles, Target } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { ThreatFeed } from "@/components/threat-feed"
import { AgentStream } from "@/components/agent-stream"
import { SeverityChart } from "@/components/severity-chart"
import { MitreHeatmap } from "@/components/mitre-heatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { api, Stat } from "@/lib/api"

const ICONS = [Activity, Bot, ShieldCheck, Target]

export default function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([])
  useEffect(() => { api.stats().then(setStats) }, [])

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl glass-strong p-8 animate-slide-up">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Badge variant="outline" className="gap-1.5 border-primary/30 bg-primary/10 text-primary w-fit">
              <Sparkles className="h-3 w-3" /> AI-Powered SOC
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Welcome back, <span className="text-gradient">Analyst</span>
            </h1>
            <p className="max-w-xl text-muted-foreground">
              Your autonomous agents are monitoring the environment. Here is what they found in the last 24 hours.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1.5"><Radar className="h-4 w-4" /> Run Hunt</Button>
            <Button className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Sparkles className="h-4 w-4" /> Investigate
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} icon={ICONS[i % ICONS.length]} accent={i % 2 ? "accent" : "primary"} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Live Threat Feed</CardTitle>
            <Badge variant="outline" className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> streaming
            </Badge>
          </CardHeader>
          <CardContent><ThreatFeed /></CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Severity Distribution</CardTitle></CardHeader>
          <CardContent><SeverityChart /></CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="glass">
          <CardHeader><CardTitle className="flex items-center gap-2"><Bot className="h-4 w-4 text-accent" /> Agent Thought Stream</CardTitle></CardHeader>
          <CardContent><AgentStream /></CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>MITRE ATT&CK Coverage</CardTitle></CardHeader>
          <CardContent><MitreHeatmap /></CardContent>
        </Card>
      </section>
    </div>
  )
}
