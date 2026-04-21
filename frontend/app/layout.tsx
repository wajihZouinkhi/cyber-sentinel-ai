import type { Metadata } from "next"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import { AuroraBg } from "@/components/aurora-bg"

export const metadata: Metadata = {
  title: "Cyber Sentinel AI",
  description: "Autonomous AI-driven Security Operations Center",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <AuroraBg />
        <AppSidebar />
        <div className="md:pl-64">
          <Topbar />
          <main className="p-6 lg:p-8 animate-fade-in">{children}</main>
        </div>
      </body>
    </html>
  )
}
