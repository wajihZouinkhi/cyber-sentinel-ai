import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ label, value, delta, icon: Icon, tone = "primary" }: {
  label: string; value: string | number; delta?: number; icon: LucideIcon;
  tone?: "primary" | "accent" | "destructive" | "warning";
}) {
  const toneMap: Record<string, string> = {
    primary: "from-primary/10 to-primary/0 text-primary",
    accent: "from-accent/10 to-accent/0 text-accent",
    destructive: "from-destructive/10 to-destructive/0 text-destructive",
    warning: "from-cyber-amber/10 to-cyber-amber/0 text-cyber-amber"
  };
  return (
    <Card className="relative overflow-hidden group hover:border-primary/40 transition-all">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", toneMap[tone])} />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
            <p className="text-3xl font-bold mt-2 tabular-nums">{value}</p>
            {delta !== undefined && (
              <div className={cn("flex items-center gap-1 mt-2 text-xs font-medium", delta >= 0 ? "text-cyber-green" : "text-cyber-red")}>
                {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(delta)}% vs last 24h
              </div>
            )}
          </div>
          <div className={cn("p-2.5 rounded-lg bg-background/40 backdrop-blur border border-border/60", toneMap[tone].split(" ").pop())}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
