"use client"
import { Sheet } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { severityColor, severityLabel } from "@/lib/utils"
import { Threat } from "@/lib/api"
import { Clock, Fingerprint, MapPin, Shield, Target } from "lucide-react"

export function ThreatDetail({ threat, onClose }: { threat: Threat | null; onClose: () => void }) {
  return (
    <Sheet open={!!threat} onClose={onClose} title="Threat Details">
      {threat && (
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={severityColor(threat.severity)}>{severityLabel(threat.severity)}</Badge>
              {threat.mitre && <Badge variant="outline" className="font-mono">{threat.mitre}</Badge>}
            </div>
            <h2 className="text-xl font-semibold">{threat.title}</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">{threat.id}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Fingerprint, label: "Source",    value: threat.source },
              { icon: Clock,       label: "Detected",  value: new Date(threat.ts).toLocaleString() },
              { icon: Target,      label: "Technique", value: threat.mitre || "—" },
              { icon: MapPin,      label: "Asset",     value: "EP-2241" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border/50 bg-muted/20 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <f.icon className="h-3 w-3" /> {f.label}
                </div>
                <p className="mt-1 text-sm font-medium truncate">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">AI Analysis</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Behavior is consistent with known adversary tradecraft. Recommend isolating the host, collecting volatile memory,
              and pivoting on the parent process tree. Confidence: <span className="text-primary font-semibold">high</span>.
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground"><Shield className="h-4 w-4" />Contain</Button>
            <Button variant="outline" className="flex-1">Escalate</Button>
          </div>
        </div>
      )}
    </Sheet>
  )
}
