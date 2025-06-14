"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define supported currencies with their symbols and conversion rates (relative to USD)
export const currencies = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.93, name: "Euro" },
  JPY: { symbol: "¥", rate: 150.59, name: "Japanese Yen" },
  VND: { symbol: "₫", rate: 23000, name: "Việt Nam đồng" },
}

export type CurrencyCode = keyof typeof currencies

type CurrencyContextType = {
  currency:     CurrencyCode
  setCurrency:  (currency: CurrencyCode) => void
  formatPrice:  (price: number) => string
  convertPrice: (price: number) => number
  formatDate:   (dateString: string, short?: boolean) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Default to USD, but try to detect user's locale
  const [ currency, setCurrency ] = useState<CurrencyCode>("USD")
  const [ mounted, setMounted ] = useState(false)

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
        if (userLocale.includes("vi-VN")) setCurrency("VND")
        else if (userLocale.includes("ja")) setCurrency("JPY")
        else if (
          userLocale.includes("de") ||
          userLocale.includes("fr") ||
          userLocale.includes("it") ||
          userLocale.includes("es")
        )
          setCurrency("EUR")
        else setCurrency("USD")
        
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
  }, [ currency, mounted ])

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
  const formatDate = (dateString: string, short?: boolean): string => {
    const date = new Date(dateString);
    let locale;
    if (currency === "VND") {
      locale = "vi-VN";
    } else {
      locale = "en-US";
    }

    const datePart = date.toLocaleDateString(locale, {
      year:  "numeric",
      month: "long",
      day:   "numeric",
    });
    const timePart = date.toLocaleTimeString(locale, {
      hour:   "numeric",
      minute: "2-digit",
      hour12: true,
    });
    if (short) {
      return `${date.toLocaleDateString(locale, {
        year:  "numeric",
        month: "numeric",
        day:   "numeric",
      })}`;
    }
    return `${datePart} - ${timePart}`;
  }
  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price)
    const { symbol } = currencies[currency]

    // Format based on currency
    if (currency === "JPY") {
      return `${symbol}${convertedPrice.toLocaleString()}`
    }
    if (currency === "VND") {
      return `${convertedPrice.toLocaleString()} đồng`
    }
    // For currencies that show symbol before the amount (most currencies)
    return `${symbol}${convertedPrice.toFixed(2)}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice, formatDate }}>
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

const currencySymbol = (currency: CurrencyCode) => {
  return currencies[currency].symbol
}

export { currencySymbol }