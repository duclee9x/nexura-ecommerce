"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useCurrency } from "@/contexts/currency-context"
import { VariantCart, CartItem } from "@/protos/nexura"
import { useCart as useCartQuery, useCartActions } from "@/hooks/use-query"
import { useSession } from "./session-context"
import { getVariantsForCartGateway } from "@/gateway/gateway"


export type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">, currencyCode: string) => Promise<void>
  removeItem: (productId: string, variantId: string) => Promise<void>
  updateQuantity: (productId: string, variantId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  itemCount: number
  updateVariantInfo: (variantId: string, variant: VariantCart) => void
  isLoading: boolean
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultCartContext: CartContextType = {
  items: [],
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  itemCount: 0,
  updateVariantInfo: () => {},
  isLoading: false
}

export const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { data: cart, isLoading } = useCartQuery(user?.id || "")
  const { addItem: addItemToCart, updateItem, removeItem: removeItemFromCart, clearCart: clearCartItems } = useCartActions()
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

  useEffect(() => {
    if (cart?.items) {
      const mappedItems: CartItem[] = cart.items.map(item => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        image: item.image || "",
      }))
      setItems(mappedItems)
      setIsReady(true)
    }
  }, [cart])

  const addItem = async (newItem: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">, currencyCode: string) => {
    if (!user?.id) return

    try {
      await addItemToCart({
        userId: user.id,
        productId: newItem.productId,
        variantId: newItem.variantId,
        quantity: newItem.quantity,
        image: newItem.image || "",
        currencyCode: currencyCode
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      throw error
    }
  }

  const removeItem = async (productId: string, variantId: string) => {
    if (!user?.id) return

    try {
      await removeItemFromCart({
        userId: user.id,
        productId,
        variantId
      })
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
      throw error
    }
  }

  const updateQuantity = async (productId: string, variantId: string, quantity: number) => {
    if (!user?.id) return

    if (quantity <= 0) {
      await removeItem(productId, variantId)
      return
    }

    try {
      const item = items.find(i => i.productId === productId && i.variantId === variantId)
      if (!item) return

      await updateItem({
        userId: user.id,
        productId,
        variantId,
        quantity,
        image: item.image || "",
      })
    } catch (error) {
      console.error("Failed to update item quantity:", error)
      throw error
    }
  }

  const updateVariantInfo = (variantId: string, variant: VariantCart) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.variantId === variantId ? { ...item, variant } : item
      )
    )
  }

  const clearCart = async () => {
    if (!user?.id) return

    try {
      await clearCartItems({ userId: user.id })
    } catch (error) {
      console.error("Failed to clear cart:", error)
      throw error
    }
  }

  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
        updateVariantInfo,
        isLoading
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

