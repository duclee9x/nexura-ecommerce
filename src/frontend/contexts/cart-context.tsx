"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { CartItem, Product, ProductVariant, UpdateItemRequest } from "@/protos/nexura"
import { useCartActions } from "@/hooks/use-cart"
import { useSession } from "./session-context"
import { toast } from "sonner"

export type CartContextType = {
  items: CartItem[]
 addItem: (item: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">, currencyCode: string) => Promise<void>
  removeItem: (productId: string, variantId: string) => Promise<void>
  clearCart: () => Promise<void>
  setTotalItem: (total: number) => void
  itemCount: number
  // updateVariantInfo: (variantId: string, variant: VariantCart) => void
  isLoading: boolean
  updateQuantity: (updateItemRequest: UpdateItemRequest) => Promise<void>
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultCartContext: CartContextType = {
  items: [],
  setTotalItem: () => {},
  addItem: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  itemCount: 0,
  // updateVariantInfo: () => {},
  isLoading: false,
  updateQuantity: async () => {}
}

export const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { getCart, addItem: addItemToCart, updateItem, removeItem: removeItemFromCart, clearCart: clearCartItems } = useCartActions()
  const { data: cart, isLoading, refetch } = getCart(user?.id || "")
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (cart?.items) {
      const mappedItems: CartItem[] = cart.items.map((item: CartItem) => ({...item}))
      setItems(mappedItems)
    }
  }, [cart])

  const addItem = async (newItem: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">, currencyCode: string) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in to add items to cart.");
    }
    try {
      await addItemToCart.mutate({
        userId: user.id,
        ...newItem,
        currencyCode: currencyCode
      })
      refetch()
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      throw error
    }
  }

  const removeItem = async (productId: string, variantId: string) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in to remove items from cart.");
    }
    try {
      await removeItemFromCart.mutate ({
        userId: user.id,
        productId,
        variantId
      })
      refetch()
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
      throw error
    }
  }

  const updateQuantity = async (updateItemRequest: UpdateItemRequest) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in to update cart item quantity.");
    }
    try {
      await updateItem.mutate({
        ...updateItemRequest,
        userId: user.id
      })
      refetch()
    } catch (error) {
      console.error("Failed to update cart item quantity:", error)
      throw error
    }
  }

  // Hybrid clearCart
  const clearCart = async () => {
    if (!user || !user.id) {
      throw new Error("User must be logged in to clear cart.");
    }
    try {
      await clearCartItems.mutate(user.id)
      refetch()
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
        clearCart,
        itemCount: totalItem,
        setTotalItem,
        // updateVariantInfo,
        isLoading,
        updateQuantity
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

