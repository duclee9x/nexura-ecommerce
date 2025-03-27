"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define supported currencies with their symbols and conversion rates (relative to USD)
export const currencies = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.93, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australian Dollar" },
  JPY: { symbol: "¥", rate: 150.59, name: "Japanese Yen" },
}

export type CurrencyCode = keyof typeof currencies

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  formatPrice: (price: number) => string
  convertPrice: (price: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default to USD, but try to detect user's locale
  const [currency, setCurrency] = useState<CurrencyCode>("USD")
  const [mounted, setMounted] = useState(false)

  // Initialize currency from localStorage when component mounts
  useEffect(() => {
    setMounted(true)
    const storedCurrency = localStorage.getItem("nexura-currency") as CurrencyCode

    if (storedCurrency && currencies[storedCurrency]) {
      setCurrency(storedCurrency)
    } else {
      // Try to detect user's locale
      try {
        const userLocale = navigator.language
        if (userLocale.includes("en-GB")) setCurrency("GBP")
        else if (userLocale.includes("en-CA")) setCurrency("CAD")
        else if (userLocale.includes("en-AU")) setCurrency("AUD")
        else if (userLocale.includes("ja")) setCurrency("JPY")
        else if (
          userLocale.includes("de") ||
          userLocale.includes("fr") ||
          userLocale.includes("it") ||
          userLocale.includes("es")
        )
          setCurrency("EUR")
      } catch (error) {
        console.error("Failed to detect locale:", error)
      }
    }
  }, [])

  // Update localStorage when currency changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("nexura-currency", currency)
    }
  }, [currency, mounted])

  // Convert price from USD to selected currency
  const convertPrice = (price: number): number => {
    const rate = currencies[currency].rate

    // For JPY, round to whole numbers
    if (currency === "JPY") {
      return Math.round(price * rate)
    }

    // For other currencies, keep 2 decimal places
    return Number.parseFloat((price * rate).toFixed(2))
  }

  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price)
    const { symbol } = currencies[currency]

    // Format based on currency
    if (currency === "JPY") {
      return `${symbol}${convertedPrice.toLocaleString()}`
    }

    // For currencies that show symbol before the amount (most currencies)
    return `${symbol}${convertedPrice.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

