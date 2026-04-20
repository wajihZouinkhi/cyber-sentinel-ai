"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Bot, Play, Square, Brain, Search, Target, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AGENTS = [
  { id: "supervisor", name: "Supervisor", icon: Brain, color: "text-cyber-purple" },
  { id: "threat_intel", name: "Threat Intel", icon: Search, color: "text-cyber-cyan" },
  { id: "cve_triage", name: "CVE Triage", icon: Target, color: "text-cyber-amber" },
  { id: "mitre_mapper", name: "MITRE Mapper", icon: Bot, color: "text-accent" },
  { id: "report_writer", name: "Report Writer", icon: FileText, color: "text-primary" },
];

type Event = { agent: string; message: string; ts: string };

export function AgentStream() {
  const [query, setQuery] = useState("Analyze recent Log4j exploitation attempts against internal Java services");
  const [running, setRunning] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const esRef = useRef<EventSource | null>(null);

  const stop = () => { esRef.current?.close(); setRunning(false); setActive(null); };

  const start = () => {
    setEvents([]); setProgress(0); setRunning(true);
    const url = `/api/stream/${encodeURIComponent(query)}?session_id=ui-${Date.now()}`;
    const seq = ["supervisor", "threat_intel", "cve_triage", "mitre_mapper", "report_writer"];
    let i = 0;
    const mock = setInterval(() => {
      if (i >= seq.length) { clearInterval(mock); setRunning(false); setActive(null); setProgress(100); return; }
      const a = seq[i];
      setActive(a);
      setEvents(prev => [...prev, { agent: a, message: `${a} processing query…`, ts: new Date().toLocaleTimeString() }]);
      setProgress(((i + 1) / seq.length) * 100);
      i++;
    }, 1200);
    esRef.current = { close: () => clearInterval(mock) } as any;
  };

  return (
    <Card className="scanline">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />Agent Orchestration</CardTitle>
          <Badge variant={running ? "warning" : "secondary"} className="gap-1.5">
            {running ? <><Loader2 className="h-3 w-3 animate-spin" />running</> : <><CheckCircle2 className="h-3 w-3" />idle</>}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">LangGraph supervisor· 4 specialist agents · SSE</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask the agents…" disabled={running} />
          {!running ? (
            <Button onClick={start}><Play className="h-4 w-4" />Run</Button>
          ) : (
            <Button variant="destructive" onClick={stop}><Square className="h-4 w-4" />Stop</Button>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
            <span>Pipeline</span><span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="grid grid-cols-5 gap-2">
          {AGENTS.map(a => {
            const A = a.icon;
            const isActive = active === a.id;
            const done = AGENTS.findIndex(x => x.id === active) > AGENTS.findIndex(x => x.id === a.id);
            return (
              <div key={a.id} className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all",
                isActive ? "border-primary bg-primary/5 glow-primary" : done ? "border-cyber-green/40 bg-cyber-green/5" : "border-border/40 bg-background/40"
              )}>
                <A className={cn("h-5 w-5", isActive ? a.color + " animate-pulse-glow" : done ? "text-cyber-green" : "text-muted-foreground")} />
                <span className="text-[10px] font-medium text-center">{a.name}</span>
              </div>
            );
          })}
        </div>

        <ScrollArea className="h-[260px] rounded-md border border-border/60 bg-background/60 font-mono text-xs">
          <div className="p-3 space-y-1">
            {events.length === 0 && <div className="text-muted-foreground">{"// waiting for agent events…"}</div>}
            {events.map((e, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-muted-foreground">{e.ts}</span>
                <span className="text-primary">[{e.agent}]</span>
                <span>{e.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
