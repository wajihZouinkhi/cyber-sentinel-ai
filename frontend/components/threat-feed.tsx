"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Bug, Zap } from "lucide-react";
import { cn, severityColor, severityLabel } from "@/lib/utils";

type Threat = { id: string; title: string; source: string; severity: number; time: string; type: string };

const seed: Threat[] = [
  { id: "CVE-2024-49112", title: "Windows LDAP Remote Code Execution", source: "NVD", severity: 9.8, time: "2m", type: "RCE" },
  { id: "CVE-2024-38063", title: "Windows TCP/IP IPv6 RCE", source: "NVD", severity: 9.8, time: "7m", type: "RCE" },
  { id: "KEV-2025-001", title: "Cisco IOS XE Web UI exploited in the wild", source: "CISA KEV", severity: 8.9, time: "14m", type: "KEV" },
  { id: "OTX-44812", title: "APT29 C2 infrastructure observed", source: "AlienVault", severity: 7.5, time: "22m", type: "APT" },
  { id: "CVE-2024-21413", title: "Microsoft Outlook RCE (MonikerLink)", source: "NVD", severity: 9.8, time: "31m", type: "RCE" },
  { id: "CVE-2024-30088", title: "Windows Kernel EoP", source: "NVD", severity: 7.0, time: "48m", type: "EoP" },
  { id: "OTX-44901", title: "Lockbit 3.0 variant IoCs published", source: "OTX", severity: 8.2, time: "1h", type: "Ransomware" },
];

const icons: Record<string, any> = { RCE: Zap, KEV: AlertTriangle, APT: Shield, EoP: Bug, Ransomware: AlertTriangle };

export function ThreatFeed() {
  const [threats, setThreats] = useState<Threat[]>(seed);
  useEffect(() => {
    const i = setInterval(() => {
      setThreats(prev => [{
        id: `LIVE-${Date.now().toString().slice(-5)}`,
        title: ["Suspicious PowerShell encoded payload", "Brute-force against SSH endpoint", "Anomalous DNS tunneling detected", "Credential dump on domain controller"][Math.floor(Math.random()*4)],
        source: ["Sigma", "Zeek", "Wazuh"][Math.floor(Math.random()*3)],
        severity: Math.round((Math.random()*6 + 3) * 10) / 10,
        time: "now",
        type: ["RCE","APT","EoP"][Math.floor(Math.random()*3)]
      }, ...prev.slice(0, 19)]);
    }, 8000);
    return () => clearInterval(i);
  }, []);
  return (
    <Card className="scanline">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-cyber-amber" />Live Threat Feed</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">NVD · CISA KEV · OTX · Sigma</p>
        </div>
        <Badge variant="success" className="gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse" />{threats.length} active</Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[520px] pr-3">
          <div className="space-y-2">
            {threats.map(t => {
              const Icon = icons[t.type] || AlertTriangle;
              return (
                <div key={t.id} className="group flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-background/40 hover:bg-accent/5 hover:border-primary/40 transition-all cursor-pointer">
                  <div className={cn("p-2 rounded-md bg-background border border-border/60", severityColor(t.severity))}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                      <Badge variant="outline" className="text-[10px] py-0 h-4">{t.source}</Badge>
                      <span className={cn("text-[10px] font-bold tracking-wider", severityColor(t.severity))}>{severityLabel(t.severity)} · {t.severity}</span>
                    </div>
                    <p className="text-sm font-medium mt-1 truncate group-hover:text-primary transition-colors">{t.title}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 mt-1">{t.time}</span>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
