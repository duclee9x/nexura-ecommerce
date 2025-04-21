"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { CartItem,  UpdateItemRequest, User, VariantCart } from "@/protos/nexura"
import { useCartActions } from "@/hooks/use-cart"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getUserGateway } from "@/gateway/gateway"
import { useSession } from "./session-context"

export type CartContextType = {
  items: CartItem[]
  cartId: string | undefined
  addItem: (item: Omit<CartItem, "id" | "created_at" | "updated_at" | "variant">, currencyCode: string) => Promise<void>
  removeItem: (productId: string, variantId: string) => Promise<void>
  clearCart: () => Promise<void>
  setTotalItem: (total: number) => void
  itemCount: number
  // updateVariantInfo: (variantId: string, variant: VariantCart) => void
  isLoading: boolean
  updateQuantity: (updateItemRequest: UpdateItemRequest) => Promise<void>
  getVariants: (variantIds: string[]) => UseQueryResult<VariantCart[], Error>
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultCartContext: CartContextType = {
  items: [],
  cartId: undefined,
  setTotalItem: () => {},
  addItem: async () => {},
  removeItem: async () => {},
  clearCart: async () => {},
  itemCount: 0,
  // updateVariantInfo: () => {},
  isLoading: false,
  updateQuantity: async () => {},
  getVariants: () => ({ 
    data: undefined, 
    isLoading: false, 
    isError: false,
    error: null,
    refetch: async () => ({ data: undefined, isSuccess: false }),
  } as UseQueryResult<VariantCart[], Error>),
}

export const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { getCart, addItem: addItemToCart, updateItem, removeItem: removeItemFromCart, clearCart: clearCartItems, getVariants } = useCartActions()
  const { data: cart, isLoading: isCartLoading, refetch } = getCart(user?.id || "")
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    // Only set ready when we have processed the user session AND initial cart load
    if (user === undefined) return // user is still loading
    if (user && isCartLoading) return // cart is still loading for logged in user
    setIsReady(true)
  }, [user, isCartLoading])
  useEffect(() => {
    if (!user) {
      // Reset cart state when no user
      setItems([])
      setTotalItem(0)
      return
    }

    if (cart?.items) {
      const mappedItems: CartItem[] = cart.items.map((item: CartItem) => ({...item}))
      setItems(mappedItems)
      setTotalItem(cart.items.reduce((acc, item) => acc + item.quantity, 0) || 0)
    }
  }, [cart, user])

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
        cartId: cart?.id,
        addItem,
        removeItem,
        clearCart,
        getVariants,
        itemCount: totalItem,
        setTotalItem,
        isLoading: !isReady || (!!user && isCartLoading), // Consider loading until ready and cart data is loaded
        updateQuantity,
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

