"use client";
import { Bell, Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function TopBar() {
  return (
    <header className="h-16 border-b border-border/60 glass sticky top-0 z-20 flex items-center px-6 gap-4">
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search CVEs, TTPs, IOCs…" className="pl-9 pr-16" />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5 flex items-center gap-1"><Command className="h-3 w-3" />K</kbd>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <Badge variant="success" className="gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse" />LIVE</Badge>
        <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
        <div className="flex items-center gap-2 pl-3 border-l border-border/60">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent" />
          <div className="text-xs">
            <div className="font-medium">SOC Analyst</div>
            <div className="text-muted-foreground">Tier 3</div>
          </div>
        </div>
      </div>
    </header>
  );
}
