"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useCurrency, type CurrencyCode } from "@/contexts/currency-context"
import { VariantCart } from "@/protos/nexura"

export type CartItem = {
  id: string
  product_id: string
  variant_id: string
  quantity: number
  created_at: string
  updated_at: string
  variant?: VariantCart
}

export type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
  isReady: boolean
  updateVariantInfo: (variantId: string, variant: VariantCart) => void
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
  updateVariantInfo: () => {},
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

  const addItem = (newItem: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">) => {
    setItems((prevItems: CartItem[]) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product_id === newItem.product_id && item.variant_id === newItem.variant_id
      )

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        updatedItems[existingItemIndex].updated_at = new Date().toISOString()
        return updatedItems
      } else {
        // Item doesn't exist, add it
        const itemWithMetadata: CartItem = {
          ...newItem,
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        return [...prevItems, itemWithMetadata]
      }
    })
  }

  const removeItem = (productId: string, variantId: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => !(item.product_id === productId && item.variant_id === variantId))
    )
  }

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }

    setItems((prevItems) => 
      prevItems.map((item) => 
        item.product_id === productId && item.variant_id === variantId 
          ? { ...item, quantity, updated_at: new Date().toISOString() } 
          : item
      )
    )
  }

  const updateVariantInfo = (variantId: string, variant: VariantCart) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variant_id === variantId ? { ...item, variant } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  // Calculate subtotal in the current currency
  const subtotal = items.reduce((total, item) => {
    if (!item.variant) return total
    const itemPrice = item.variant.price
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
        updateVariantInfo,
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

