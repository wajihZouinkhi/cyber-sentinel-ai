"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BookOpen, Bot, FileText, LayoutDashboard, Shield, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/",          label: "Overview",      icon: LayoutDashboard },
  { href: "/threats",   label: "Threat Feed",   icon: Activity },
  { href: "/agents",    label: "Agent Stream",  icon: Bot },
  { href: "/mitre",     label: "MITRE ATT&CK",  icon: Target },
  { href: "/reports",   label: "Reports",       icon: FileText },
  { href: "/knowledge", label: "Knowledge",     icon: BookOpen },
]

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border/50 bg-background/60 backdrop-blur-xl md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border/50 px-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent blur-md opacity-60" />
          <div className="relative rounded-lg bg-gradient-to-br from-primary to-accent p-1.5">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Cyber Sentinel</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">AI SOC</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-to-r from-primary/15 to-accent/10 text-foreground border border-primary/20"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}>
              <item.icon className={cn("h-4 w-4 transition-colors", active && "text-primary")} />
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border/50 p-4">
        <div className="glass rounded-xl p-3">
          <p className="text-xs font-medium">System Health</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[92%] bg-gradient-to-r from-primary to-accent animate-shimmer bg-[linear-gradient(90deg,hsl(160_100%_50%),hsl(189_100%_50%),hsl(160_100%_50%))]" />
            </div>
            <span className="text-[10px] font-semibold text-primary">92%</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
