import { ThreatFeed } from "@/components/threat-feed"
import { SeverityChart } from "@/components/severity-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThreatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Threat Feed</h1>
        <p className="text-muted-foreground">Real-time detections across your environment.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader><CardTitle>Live Threats</CardTitle></CardHeader>
          <CardContent><ThreatFeed /></CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Severity Distribution</CardTitle></CardHeader>
          <CardContent><SeverityChart /></CardContent>
        </Card>
      </div>
    </div>
  )
}
