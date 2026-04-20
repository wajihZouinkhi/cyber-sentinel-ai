"use client";
import Link from "next/link";
import { Shield, Activity, Database, FileText, Radar, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Overview", icon: Radar },
  { href: "/threats", label: "Threat Feed", icon: Activity },
  { href: "/agents", label: "Agent Stream", icon: Zap },
  { href: "/mitre", label: "MITRE ATT&CK", icon: Shield },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/knowledge", label: "Knowledge Base", icon: Database },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r border-border/60 glass h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Shield className="h-7 w-7 text-primary animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">Cyber Sentinel</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">AI · v1.0</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link key={href} href={href} className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              active ? "bg-primary/10 text-primary glow-primary" : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
            )}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border/60">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
          All systems operational
        </div>
      </div>
    </aside>
  );
}
