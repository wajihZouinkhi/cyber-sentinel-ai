"use client"
import { Bell, Command, Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search threats, agents, IOCs, techniques…" className="pl-9 pr-20 h-10 bg-muted/40 border-border/60 focus-visible:ring-primary/40" />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </Badge>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </Button>
          <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
            <Sparkles className="h-3.5 w-3.5" /> Ask AI
          </Button>
        </div>
      </div>
    </header>
  )
}
