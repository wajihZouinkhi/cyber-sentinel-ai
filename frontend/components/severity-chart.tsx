"use client"
import { useEffect, useState } from "react"
import { api, Threat } from "@/lib/api"

const ORDER = ["critical", "high", "medium", "low"] as const
const COLOR = {
  critical: "from-rose-500 to-rose-600",
  high: "from-orange-400 to-rose-500",
  medium: "from-amber-300 to-orange-400",
  low: "from-emerald-400 to-primary",
} as const

export function SeverityChart() {
  const [threats, setThreats] = useState<Threat[]>([])
  useEffect(() => { api.threats(50).then(setThreats) }, [])
  const counts = ORDER.map((s) => ({ s, n: threats.filter((t) => t.severity === s).length }))
  const total = Math.max(1, threats.length)
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold tracking-tight">{threats.length}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total events</p>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {counts.map(({ s, n }) => (
            <div key={s} className={`w-3 rounded-t-md bg-gradient-to-t ${COLOR[s]}`} style={{ height: `${Math.max(6, (n / total) * 100)}%` }} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {counts.map(({ s, n }) => (
          <div key={s} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="capitalize text-muted-foreground">{s}</span>
              <span className="font-mono font-semibold">{n}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full bg-gradient-to-r ${COLOR[s]}`} style={{ width: `${(n / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
