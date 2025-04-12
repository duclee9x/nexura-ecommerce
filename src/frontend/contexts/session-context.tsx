"use client"

import { createContext, useContext, useCallback, ReactNode, useMemo } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/protos/nexura"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserGateway } from "@/gateway/gateway"

interface SessionContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: user, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (!response.ok) {
          throw new Error("Failed to fetch session")
        }
        const data = await response.json()
        const user = await getUserGateway(data.user.id)
        return user.user as User
      } catch (error) {
        console.error("Error fetching session:", error)
        return null
      }
    },
  })

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to login")
      }

      await queryClient.invalidateQueries({ queryKey: ["session"] })
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }, [queryClient, router])

  const logout = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      await queryClient.invalidateQueries({ queryKey: ["session"] })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }, [queryClient, router])

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["session"] })
  }, [queryClient])

  const value = useMemo(() => ({
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refresh,
  }), [user, isLoading, login, logout, refresh])

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
