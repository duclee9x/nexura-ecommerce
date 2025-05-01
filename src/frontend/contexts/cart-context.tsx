"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { CartItem } from "@nexura/grpc_gateway/protos"
import CartHooks from "@/hooks/cart-hooks"
import { useSession } from "./session-context"

export type CartContextType = {
  items: CartItem[]
  cartId: string | undefined
  itemCount: number
  isLoading: boolean
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultCartContext: CartContextType = {
  items: [],
  cartId: undefined,
  itemCount: 0,
  isLoading: false,
}
export const CartContext = createContext<CartContextType>(defaultCartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { useGetCart } = CartHooks()
 
  const { data: cart, isLoading: isCartLoading } = useGetCart(user?.id || "")
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

  
  
  return (
    <CartContext.Provider
      value={{
        items,
        cartId: cart?.id,
        itemCount: totalItem,
        isLoading: !isReady || (!!user && isCartLoading), // Consider loading until ready and cart data is loaded
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

