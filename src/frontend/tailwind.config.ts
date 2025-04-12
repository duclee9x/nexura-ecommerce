import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        // Base system colors (original system)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Semantic color system
        // Text colors
        "text-base": "hsl(var(--text-base))",
        "text-muted": "hsl(var(--text-muted))",
        "text-inverted": "hsl(var(--text-inverted))",
        "text-selected": "hsl(var(--text-selected))",
        "text-disabled": "hsl(var(--text-disabled))",
        "text-error": "hsl(var(--text-error))",
        "text-success": "hsl(var(--text-success))",
        "text-warning": "hsl(var(--text-warning))",
        "text-info": "hsl(var(--text-info))",

        // Background colors
        "bg-base": "hsl(var(--bg-base))",
        "bg-muted": "hsl(var(--bg-muted))",
        "bg-subtle": "hsl(var(--bg-subtle))",
        "bg-inverted": "hsl(var(--bg-inverted))",
        "bg-highlighted": "hsl(var(--bg-highlighted))",
        "bg-selected": "hsl(var(--bg-selected))",
        "bg-error": "hsl(var(--bg-error))",
        "bg-success": "hsl(var(--bg-success))",
        "bg-warning": "hsl(var(--bg-warning))",
        "bg-info": "hsl(var(--bg-info))",

        // Border colors
        "border-base": "hsl(var(--border-base))",
        "border-muted": "hsl(var(--border-muted))",
        "border-strong": "hsl(var(--border-strong))",
        "border-inverted": "hsl(var(--border-inverted))",
        "border-error": "hsl(var(--border-error))",
        "border-success": "hsl(var(--border-success))",

        // Button colors
        "button-primary": "hsl(var(--button-primary))",
        "button-primary-hover": "hsl(var(--button-primary-hover))",
        "button-primary-text": "hsl(var(--button-primary-text))",
        "button-secondary": "hsl(var(--button-secondary))",
        "button-secondary-hover": "hsl(var(--button-secondary-hover))",
        "button-secondary-text": "hsl(var(--button-secondary-text))",
        "button-accent": "hsl(var(--button-accent))",
        "button-accent-hover": "hsl(var(--button-accent-hover))",
        "button-accent-text": "hsl(var(--button-accent-text))",
        "button-muted": "hsl(var(--button-muted))",
        "button-muted-hover": "hsl(var(--button-muted-hover))",
        "button-muted-text": "hsl(var(--button-muted-text))",
        "button-destructive": "hsl(var(--button-destructive))",
        "button-destructive-hover": "hsl(var(--button-destructive-hover))",
        "button-destructive-text": "hsl(var(--button-destructive-text))",
        "button-disabled": "hsl(var(--button-disabled))",
        "button-disabled-text": "hsl(var(--button-disabled-text))",

        // Form element colors
        "input-base": "hsl(var(--input-base))",
        "input-focus": "hsl(var(--input-focus))",
        "input-disabled": "hsl(var(--input-disabled))",
        "input-placeholder": "hsl(var(--input-placeholder))",
        "input-border": "hsl(var(--input-border))",
        "input-border-focus": "hsl(var(--input-border-focus))",

        // Status colors
        "status-error": "hsl(var(--status-error))",
        "status-success": "hsl(var(--status-success))",
        "status-warning": "hsl(var(--status-warning))",
        "status-info": "hsl(var(--status-info))",

        // Brand colors
        "brand-primary": "hsl(var(--brand-primary))",
        "brand-secondary": "hsl(var(--brand-secondary))",
        "brand-accent": "hsl(var(--brand-accent))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

