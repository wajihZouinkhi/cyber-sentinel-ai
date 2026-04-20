import { AgentStream } from "@/components/agent-stream"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Brain, Search, Shield, Zap } from "lucide-react"

const agents = [
  { name: "Recon Agent", icon: Search, status: "active", tasks: 12 },
  { name: "Analysis Agent", icon: Brain, status: "active", tasks: 8 },
  { name: "Response Agent", icon: Shield, status: "idle", tasks: 0 },
  { name: "Hunt Agent", icon: Zap, status: "active", tasks: 4 },
]

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agent Stream</h1>
        <p className="text-muted-foreground">Autonomous security agents thinking in real time.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {agents.map((a) => (
          <Card key={a.name} className="glass">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{a.name}</CardTitle>
              <a.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={a.status === "active" ? "default" : "secondary"}>{a.status}</Badge>
                <span className="text-xs text-muted-foreground">{a.tasks} tasks</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> Live Thought Stream</CardTitle>
        </CardHeader>
        <CardContent><AgentStream /></CardContent>
      </Card>
    </div>
  )
}
