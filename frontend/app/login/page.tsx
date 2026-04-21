"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Github, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    setTimeout(() => router.push("/"), 700)
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-border/50 p-10">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-primary to-accent p-1.5">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">Cyber Sentinel AI</span>
        </div>
        <div className="relative space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            Autonomous <span className="text-gradient">defense</span><br/>that never sleeps.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Your AI SOC triages, investigates, and responds to threats while your team focuses on what matters.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
            <p className="text-sm text-muted-foreground">Continue to your command center.</p>
          </div>
          <form onSubmit={submit} className="space-y-3">
            <Input type="email" placeholder="you@company.com" required />
            <Input type="password" placeholder="Password" required />
            <Button type="submit" disabled={loading} className="w-full gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              {loading ? "Authenticating…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-wider"><span className="bg-background px-2 text-muted-foreground">or</span></div>
          </div>
          <Button variant="outline" className="w-full gap-2"><Github className="h-4 w-4" /> Continue with GitHub</Button>
          <p className="text-center text-xs text-muted-foreground">Protected by AI anomaly detection.</p>
        </div>
      </div>
    </div>
  )
}
