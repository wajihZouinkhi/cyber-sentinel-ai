import { MitreHeatmap } from "@/components/mitre-heatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MitrePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">MITRE ATT&CK</h1>
        <p className="text-muted-foreground">Tactics and techniques observed across your telemetry.</p>
      </div>
      <Card className="glass">
        <CardHeader><CardTitle>Technique Coverage Heatmap</CardTitle></CardHeader>
        <CardContent><MitreHeatmap /></CardContent>
      </Card>
    </div>
  )
}
