import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-2xl opacity-40" />
        <div className="relative rounded-2xl bg-gradient-to-br from-primary to-accent p-5"><ShieldX className="h-10 w-10 text-primary-foreground" /></div>
      </div>
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-muted-foreground max-w-sm">This route was not detected in our perimeter. Perhaps it was contained.</p>
      <Link href="/" className="mt-6"><Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Back to command center</Button></Link>
    </div>
  )
}
