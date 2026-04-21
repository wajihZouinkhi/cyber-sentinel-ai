"use client"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn, severityColor, severityLabel } from "@/lib/utils"
import { AlertTriangle, ShieldAlert, ShieldCheck, Zap } from "lucide-react"
import { api, Threat } from "@/lib/api"

const ICON = { low: ShieldCheck, medium: ShieldAlert, high: AlertTriangle, critical: Zap } as const

export function ThreatFeed() {
  const [items, setItems] = useState<Threat[]>([])
  useEffect(() => {
    api.threats().then(setItems)
    const stop = api.streamThreats((t) => setItems((prev) => [t, ...prev].slice(0, 30)))
    return stop
  }, [])
  return (
    <ScrollArea className="h-[420px] pr-3 scrollbar-thin">
      <ul className="space-y-2">
        {items.map((t) => {
          const Icon = ICON[t.severity]
          return (
            <li key={t.id} className="group relative flex items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-3 transition-all hover:border-primary/30 hover:bg-muted/40 animate-slide-up">
              <div className={cn("mt-0.5 rounded-lg p-2", severityColor(t.severity))}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{t.title}</p>
                  <Badge variant="outline" className="text-[10px]">{severityLabel(t.severity)}</Badge>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  <span className="font-mono text-primary/80">{t.source}</span>
                  {t.mitre && <> · <span className="font-mono">{t.mitre}</span></>}
                  {" · "}{new Date(t.ts).toLocaleTimeString()}
                </p>
              </div>
              <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 animate-pulse-glow" />
            </li>
          )
        })}
      </ul>
    </ScrollArea>
  )
}
