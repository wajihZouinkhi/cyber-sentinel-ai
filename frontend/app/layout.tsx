import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cyber Sentinel AI",
  description: "Multi-agent cybersecurity intelligence platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
