"use client"
import { cn } from "@/lib/utils"

const TACTICS = [
  "Initial Access", "Execution", "Persistence", "Privilege Esc.",
  "Defense Evasion", "Credential Access", "Discovery", "Lateral Mov.",
  "Collection", "Exfiltration", "Impact",
]

function seeded(a: number, b: number) {
  const x = Math.sin(a * 9301 + b * 49297) * 233280
  return x - Math.floor(x)
}

export function MitreHeatmap() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-11 gap-1">
        {TACTICS.map((t, col) => (
          <div key={t} className="space-y-1">
            <div className="truncate text-[9px] uppercase tracking-wider text-muted-foreground" title={t}>{t}</div>
            <div className="space-y-1">
              {Array.from({ length: 8 }).map((_, row) => {
                const v = seeded(col + 1, row + 1)
                const intensity = v > 0.85 ? "bg-rose-500/80" : v > 0.65 ? "bg-orange-400/70" : v > 0.4 ? "bg-primary/50" : v > 0.2 ? "bg-primary/20" : "bg-muted/60"
                return <div key={row} className={cn("h-4 rounded-sm transition-all hover:scale-110 hover:ring-1 hover:ring-primary", intensity)} />
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Low activity</span>
        <div className="flex gap-1">
          <div className="h-2 w-4 rounded-sm bg-muted/60" />
          <div className="h-2 w-4 rounded-sm bg-primary/20" />
          <div className="h-2 w-4 rounded-sm bg-primary/50" />
          <div className="h-2 w-4 rounded-sm bg-orange-400/70" />
          <div className="h-2 w-4 rounded-sm bg-rose-500/80" />
        </div>
        <span>High activity</span>
      </div>
    </div>
  )
}
