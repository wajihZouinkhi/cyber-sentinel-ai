"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Toast = { id: string; title: string; description?: string; kind?: "info" | "success" | "warn" }
const Ctx = createContext<{ push: (t: Omit<Toast, "id">) => void }>({ push: () => {} })
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([])
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2)
    setItems((p) => [...p, { id, ...t }])
    setTimeout(() => setItems((p) => p.filter(i => i.id !== id)), 4500)
  }, [])
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-2 max-w-sm">
        {items.map((t) => {
          const Icon = t.kind === "success" ? CheckCircle2 : t.kind === "warn" ? TriangleAlert : Info
          const color = t.kind === "success" ? "text-emerald-400" : t.kind === "warn" ? "text-amber-400" : "text-accent"
          return (
            <div key={t.id} className="glass-strong rounded-xl border border-border/60 p-3 shadow-xl animate-slide-up flex items-start gap-3">
              <Icon className={cn("h-4 w-4 mt-0.5", color)} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.title}</p>
                {t.description && <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>}
              </div>
              <button onClick={() => setItems((p) => p.filter(i => i.id !== t.id))} className="text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
            </div>
          )
        })}
      </div>
    </Ctx.Provider>
  )
}
