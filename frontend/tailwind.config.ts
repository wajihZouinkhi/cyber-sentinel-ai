import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        cyber: {
          green: "#00ff9f",
          cyan: "#00e5ff",
          red: "#ff3864",
          amber: "#ffb400",
          purple: "#bd00ff"
        }
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "pulse-glow": { "0%,100%": { opacity: "1", filter: "drop-shadow(0 0 6px currentColor)" }, "50%": { opacity: ".6" } },
        "scan": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } }
      },
      animation: { "pulse-glow": "pulse-glow 2s ease-in-out infinite", "scan": "scan 3s linear infinite" }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
export default config;
