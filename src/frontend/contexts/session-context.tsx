"use client"

import { createContext, useContext, ReactNode } from "react"
import { User } from "@/protos/nexura"
import { useUserSession, useSessionActions } from "@/hooks/use-query"

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
  const { data: user, isLoading } = useUserSession()
  const { login, logout, refresh } = useSessionActions()
  
  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refresh,
  }

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
