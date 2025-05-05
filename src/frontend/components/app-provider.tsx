"use client"

import { type ReactNode, useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/contexts/cart-context"
import { CurrencyProvider } from "@/contexts/currency-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "@/contexts/session-context"
import { scan } from "react-scan"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface AppProviderProps {
  children: ReactNode
}

const ReactScan = () => {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return null
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      }, mutations: {
        retry: 1,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="left" buttonPosition="top-left" />
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="nexura-theme"
        >
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <ReactScan />
                {children}
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </SessionProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

