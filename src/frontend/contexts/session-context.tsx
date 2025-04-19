"use client"

import { createContext, useContext, ReactNode } from "react"
import { User } from "@/protos/nexura"
import { useUserHooks } from "@/hooks/use-user"
import { UseMutationResult } from "@tanstack/react-query"
interface SessionContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: UseMutationResult<void, Error, { email: string; password: string; }, unknown>
  logout: UseMutationResult<void, Error, void, unknown>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const { getSession, login, logout } = useUserHooks()
  const { data: user, isLoading } = getSession()
  
  const value = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
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
