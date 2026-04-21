"use client"
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type SheetProps = { open: boolean; onClose: () => void; side?: "right" | "left"; children: React.ReactNode; title?: string }

export function Sheet({ open, onClose, side = "right", children, title }: SheetProps) {
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (open) document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={cn(
        "absolute top-0 h-full w-full max-w-md glass-strong border-l border-border/60 shadow-2xl animate-slide-up",
        side === "right" ? "right-0" : "left-0"
      )}>
        <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100%-57px)] scrollbar-thin">{children}</div>
      </div>
    </div>
  )
}
