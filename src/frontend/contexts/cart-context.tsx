"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useCurrency, type CurrencyCode } from "@/contexts/currency-context"

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  baseCurrency?: CurrencyCode
  sku?: string
  variantId?: string
}

export type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isReady: boolean
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultCartContext: CartContextType = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  isReady: false,
}

export const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const { currency, convertPrice } = useCurrency()

  // Initialize cart from localStorage when component mounts
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("nexura-cart")
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
      setItems([])
    } finally {
      setIsReady(true)
    }
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("nexura-cart", JSON.stringify(items))
    }
  }, [items, isReady])

  const addItem = (newItem: CartItem) => {
    // Always store the base currency (USD) with the item
    const itemWithCurrency: CartItem = {
      ...newItem,
      baseCurrency: "USD",
    }

    setItems((prevItems: CartItem[]) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id && item.color === newItem.color)

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        return updatedItems
      } else {
        // Item doesn't exist, add it
        return [...prevItems, itemWithCurrency]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal in the current currency
  const subtotal = items.reduce((total, item) => {
    // If the item has a baseCurrency that's different from USD, we need to convert it
    const itemPrice = item.price
    return total + itemPrice * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isReady,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

