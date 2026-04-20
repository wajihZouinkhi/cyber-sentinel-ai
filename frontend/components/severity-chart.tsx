"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "00:00", critical: 2, high: 5, medium: 12, low: 21 },
  { name: "04:00", critical: 1, high: 4, medium: 9, low: 18 },
  { name: "08:00", critical: 4, high: 9, medium: 17, low: 25 },
  { name: "12:00", critical: 6, high: 14, medium: 22, low: 31 },
  { name: "16:00", critical: 3, high: 11, medium: 19, low: 27 },
  { name: "20:00", critical: 5, high: 8, medium: 15, low: 24 },
];

export function SeverityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} stackOffset="sign">
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
        <Bar dataKey="critical" stackId="a" fill="#ff3864" />
        <Bar dataKey="high" stackId="a" fill="#ffb400" />
        <Bar dataKey="medium" stackId="a" fill="#00e5ff" />
        <Bar dataKey="low" stackId="a" fill="#00ff9f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
