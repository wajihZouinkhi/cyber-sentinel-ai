"use client";
import { cn } from "@/lib/utils";

const tactics = [
  { id: "TA0043", name: "Recon" },
  { id: "TA0001", name: "Initial Access" },
  { id: "TA0002", name: "Execution" },
  { id: "TA0003", name: "Persistence" },
  { id: "TA0004", name: "Privilege Esc." },
  { id: "TA0005", name: "Defense Evasion" },
  { id: "TA0006", name: "Credential Access" },
  { id: "TA0007", name: "Discovery" },
  { id: "TA0008", name: "Lateral Movement" },
  { id: "TA0009", name: "Collection" },
  { id: "TA0011", name: "C2" },
  { id: "TA0010", name: "Exfiltration" },
  { id: "TA0040", name: "Impact" }
];

function intensity(i: number, j: number) {
  const v = (Math.sin(i * 1.7 + j * 0.9) + 1) / 2;
  return v;
}

export function MitreHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-13 gap-1 mb-2" style={{ gridTemplateColumns: `repeat(${tactics.length}, minmax(0, 1fr))` }}>
          {tactics.map(t => (
            <div key={t.id} className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide p-1.5 text-center border-b border-border/40">
              {t.name}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="grid gap-1" style={{ gridTemplateColumns: `repeat(${tactics.length}, minmax(0, 1fr))` }}>
              {tactics.map((_, col) => {
                const v = intensity(row, col);
                const hot = v > 0.7;
                return (
                  <div key={col}
                    className={cn(
                      "h-10 rounded-sm border border-border/40 transition-all hover:scale-105 hover:border-primary cursor-pointer",
                      v < 0.25 && "bg-muted/30",
                      v >= 0.25 && v < 0.5 && "bg-cyber-green/20",
                      v >= 0.5 && v < 0.7 && "bg-cyber-cyan/30",
                      v >= 0.7 && v < 0.85 && "bg-cyber-amber/40",
                      v >= 0.85 && "bg-cyber-red/50 animate-pulse-glow"
                    )}
                    title={`Intensity: ${(v*100).toFixed(0)}%`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span>Activity:</span>
          <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-muted/30 border border-border/40" /><span>None</span></div>
          <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-cyber-green/20" /><span>Low</span></div>
          <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-cyber-cyan/30" /><span>Med</span></div>
          <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-cyber-amber/40" /><span>High</span></div>
          <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-sm bg-cyber-red/50" /><span>Critical</span></div>
        </div>
      </div>
    </div>
  );
}
