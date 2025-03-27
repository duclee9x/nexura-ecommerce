"use client"

import { type ReactNode, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { CurrencyProvider } from "@/contexts/currency-context"
import { ErrorBoundary } from "@/components/error-boundary"

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="nexura-theme"
    >
      <CurrencyProvider>
        <CartProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  )
}

