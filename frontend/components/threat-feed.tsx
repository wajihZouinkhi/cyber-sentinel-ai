"use client"
import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn, severityColor, severityLabel } from "@/lib/utils"
import { AlertTriangle, ShieldAlert, ShieldCheck, Zap, ChevronRight } from "lucide-react"
import { api, Threat } from "@/lib/api"
import { ThreatDetail } from "@/components/threat-detail"
import { useToast } from "@/components/toast"

const ICON = { low: ShieldCheck, medium: ShieldAlert, high: AlertTriangle, critical: Zap } as const

export function ThreatFeed() {
  const [items, setItems] = useState<Threat[]>([])
  const [selected, setSelected] = useState<Threat | null>(null)
  const { push } = useToast()

  useEffect(() => {
    api.threats().then(setItems)
    const stop = api.streamThreats((t) => {
      setItems((prev) => [t, ...prev].slice(0, 30))
      if (t.severity === "critical") push({ title: "Critical threat", description: t.title, kind: "warn" })
    })
    return stop
  }, [push])

  return (
    <>
      <ScrollArea className="h-[420px] pr-3 scrollbar-thin">
        <ul className="space-y-2">
          {items.map((t) => {
            const Icon = ICON[t.severity]
            return (
              <li key={t.id}>
                <button onClick={() => setSelected(t)}
                  className="group relative flex w-full items-start gap-3 rounded-xl border border-border/50 bg-muted/20 p-3 text-left transition-all hover:border-primary/30 hover:bg-muted/40 animate-slide-up">
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
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
                </button>
              </li>
            )
          })}
        </ul>
      </ScrollArea>
      <ThreatDetail threat={selected} onClose={() => setSelected(null)} />
    </>
  )
}
