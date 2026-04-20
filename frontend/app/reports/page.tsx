import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download } from "lucide-react"

const reports = [
  { id: "RPT-2026-041", title: "Weekly Threat Intel Summary", date: "2026-04-19", severity: "high" },
  { id: "RPT-2026-040", title: "Incident Response - Lateral Movement", date: "2026-04-17", severity: "critical" },
  { id: "RPT-2026-039", title: "MITRE Coverage Gap Analysis", date: "2026-04-15", severity: "medium" },
  { id: "RPT-2026-038", title: "Phishing Campaign Attribution", date: "2026-04-12", severity: "high" },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">AI-generated investigation and intel reports.</p>
      </div>
      <div className="grid gap-4">
        {reports.map((r) => (
          <Card key={r.id} className="glass">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2"><FileText className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.id} - {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={r.severity === "critical" ? "destructive" : "secondary"}>{r.severity}</Badge>
                <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-2" />PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
