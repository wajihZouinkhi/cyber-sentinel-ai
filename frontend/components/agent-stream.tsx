"use client"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Brain, Cog, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { api, AgentEvent } from "@/lib/api"

const KIND = {
  thought: { icon: Brain,    color: "text-accent",   bg: "bg-accent/10 border-accent/20" },
  action:  { icon: Cog,      color: "text-primary",  bg: "bg-primary/10 border-primary/20" },
  result:  { icon: Sparkles, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
} as const

export function AgentStream() {
  const [events, setEvents] = useState<AgentEvent[]>([])
  useEffect(() => {
    api.agents().then(setEvents)
    const stop = api.streamAgents((e) => setEvents((p) => [e, ...p].slice(0, 40)))
    return stop
  }, [])
  return (
    <ScrollArea className="h-[420px] pr-3 scrollbar-thin">
      <ul className="space-y-2">
        {events.map((e) => {
          const K = KIND[e.kind]
          return (
            <li key={e.id} className={cn("flex items-start gap-3 rounded-xl border p-3 animate-slide-up", K.bg)}>
              <div className={cn("mt-0.5 rounded-lg bg-background/40 p-1.5", K.color)}>
                <K.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{e.agent}</span>
                  <Badge variant="outline" className="text-[10px] capitalize">{e.kind}</Badge>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground">{new Date(e.ts).toLocaleTimeString()}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.thought}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </ScrollArea>
  )
}
