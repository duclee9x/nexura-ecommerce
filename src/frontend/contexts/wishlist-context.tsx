"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { WishlistItem } from "@nexura/grpc_gateway/protos"
import { useSession } from "./session-context"
import ProductHooks from "@/hooks/product-hooks"
export type WishlistContextType = {
  wishlistItems:     WishlistItem[]
  isLoading:         boolean
  isWishlistLoading: boolean
}

// Create context with a default value that matches the shape but is obviously not functional
const defaultWishlistContext: WishlistContextType = {
  wishlistItems:     [],
  isLoading:         false,
  isWishlistLoading: false,
}


export const WishlistContext = createContext<WishlistContextType>(defaultWishlistContext)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useSession()
  const { useGetWishlist } = ProductHooks()
  const { data: wishlistItems, isLoading: isWishlistLoading } = useGetWishlist(user?.id || "")
  const [ isReady, setIsReady ] = useState(false)

  useEffect(() => {
    if (!user) return 
    setIsReady(true)
  }, [user])
  
  
 
  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: wishlistItems || [],
        isLoading:     !isReady,
        isWishlistLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

