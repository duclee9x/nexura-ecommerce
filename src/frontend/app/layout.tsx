import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/components/app-provider"
import { Toaster } from "@/components/ui/sonner"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GlobalLoader } from "@/components/global-loader"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NEXURA - Premium Backpacks & Travel Gear",
  description: "Discover premium quality backpacks and travel gear designed for business travelers and adventurers.",
  generator: 'Đức Lee'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const experimental_ppr: boolean = true

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <GlobalLoader />
          <SiteHeader />
          {children}
          <SiteFooter />
        </AppProvider>
        <Toaster />
      </body>
    </html>
  )
}


