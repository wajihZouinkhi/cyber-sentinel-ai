import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/topbar";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityChart } from "@/components/severity-chart";
import { MitreHeatmap } from "@/components/mitre-heatmap";
import { ThreatFeed } from "@/components/threat-feed";
import { AgentStream } from "@/components/agent-stream";
import { ShieldAlert, Bug, Zap, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Threat Intelligence Overview</h2>
            <p className="text-sm text-muted-foreground">Real-time multi-agent analysis of your attack surface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Active Threats" value={47} delta={12} icon={ShieldAlert} tone="destructive" />
            <StatCard label="CVEs Triaged" value={238} delta={-4} icon={Bug} tone="warning" />
            <StatCard label="MITRE TTPs Mapped" value={31} delta={8} icon={Target} tone="accent" />
            <StatCard label="Agent Runs (24h)" value={"1.2k"} delta={23} icon={Zap} tone="primary" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Severity Distribution (24h)</CardTitle>
                  <p className="text-xs text-muted-foreground">Stacked by critical · high · medium · low</p>
                </CardHeader>
                <CardContent><SeverityChart /></CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>MITRE ATT&CK Coverage Matrix</CardTitle>
                  <p className="text-xs text-muted-foreground">Observed technique activity across tactics</p>
                </CardHeader>
                <CardContent><MitreHeatmap /></CardContent>
              </Card>

              <AgentStream />
            </div>

            <div className="space-y-6">
              <ThreatFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
