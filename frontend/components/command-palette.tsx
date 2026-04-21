"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Activity, Bot, BookOpen, FileText, LayoutDashboard, Search, Shield, Sparkles, Target } from "lucide-react"
import { cn } from "@/lib/utils"

type Cmd = { id: string; label: string; hint?: string; icon: any; run: () => void; group: string }

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [idx, setIdx] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((v) => !v) }
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
  }, [])

  const commands: Cmd[] = [
    { id: "nav-home", label: "Go to Overview", icon: LayoutDashboard, group: "Navigation", run: () => router.push("/") },
    { id: "nav-threats", label: "Go to Threat Feed", icon: Activity, group: "Navigation", run: () => router.push("/threats") },
    { id: "nav-agents", label: "Go to Agent Stream", icon: Bot, group: "Navigation", run: () => router.push("/agents") },
    { id: "nav-mitre", label: "Go to MITRE ATT&CK", icon: Target, group: "Navigation", run: () => router.push("/mitre") },
    { id: "nav-reports", label: "Go to Reports", icon: FileText, group: "Navigation", run: () => router.push("/reports") },
    { id: "nav-kb", label: "Go to Knowledge Base", icon: BookOpen, group: "Navigation", run: () => router.push("/knowledge") },
    { id: "act-hunt", label: "Run threat hunt", hint: "Launch new hunt", icon: Shield, group: "Actions", run: () => alert("Hunt queued") },
    { id: "act-ask", label: "Ask AI analyst", hint: "Open copilot", icon: Sparkles, group: "Actions", run: () => alert("AI copilot coming soon") },
  ]
  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()))
  const groups = Array.from(new Set(filtered.map(c => c.group)))

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md animate-fade-in" />
      <div className="relative w-full max-w-xl glass-strong rounded-2xl border border-border/60 shadow-2xl animate-slide-up overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setIdx(0) }}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, filtered.length - 1)) }
              if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
              if (e.key === "Enter" && filtered[idx]) { filtered[idx].run(); setOpen(false) }
            }} />
          <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-96 overflow-y-auto scrollbar-thin p-2">
          {groups.map((g) => (
            <div key={g} className="mb-2">
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{g}</p>
              {filtered.filter(c => c.group === g).map((c) => {
                const active = filtered.indexOf(c) === idx
                return (
                  <button key={c.id} onClick={() => { c.run(); setOpen(false) }}
                    className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-left transition",
                      active ? "bg-gradient-to-r from-primary/15 to-accent/10 text-foreground" : "hover:bg-muted/50 text-muted-foreground")}>
                    <c.icon className={cn("h-4 w-4", active && "text-primary")} />
                    <span className="flex-1">{c.label}</span>
                    {c.hint && <span className="text-[10px] text-muted-foreground">{c.hint}</span>}
                  </button>
                )
              })}
            </div>
          ))}
          {filtered.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No results.</p>}
        </div>
      </div>
    </div>
  )
}
