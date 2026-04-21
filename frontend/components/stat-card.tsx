import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, Minus, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: string | number
  delta?: number
  unit?: string
  icon?: LucideIcon
  accent?: "primary" | "accent" | "destructive"
}

export function StatCard({ label, value, delta = 0, unit, icon: Icon, accent = "primary" }: Props) {
  const trendUp = delta > 0, trendDown = delta < 0
  const accentCls = accent === "accent" ? "text-accent" : accent === "destructive" ? "text-destructive" : "text-primary"
  return (
    <Card className="glass gradient-border relative overflow-hidden group transition-all hover:-translate-y-0.5 hover:glow-primary">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          {Icon && (
            <div className={cn("rounded-xl p-2.5 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20", accentCls)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs">
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
            trendUp && "bg-emerald-500/10 text-emerald-400",
            trendDown && "bg-rose-500/10 text-rose-400",
            !trendUp && !trendDown && "bg-muted text-muted-foreground")}>
            {trendUp ? <ArrowUpRight className="h-3 w-3" /> : trendDown ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            {delta > 0 ? "+" : ""}{delta}%
          </span>
          {unit && <span className="text-muted-foreground">{unit}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
