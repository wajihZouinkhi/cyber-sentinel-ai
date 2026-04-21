import type { Metadata } from "next"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { Topbar } from "@/components/topbar"
import { AuroraBg } from "@/components/aurora-bg"
import { CommandPalette } from "@/components/command-palette"
import { ToastProvider } from "@/components/toast"

export const metadata: Metadata = {
  title: "Cyber Sentinel AI",
  description: "Autonomous AI-driven Security Operations Center",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <ToastProvider>
          <AuroraBg />
          <CommandPalette />
          <AppSidebar />
          <div className="md:pl-64">
            <Topbar />
            <main className="p-6 lg:p-8 animate-fade-in">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
