"use client"

import { createContext, useContext, ReactNode } from "react"
import { User } from "@nexura/grpc_gateway/protos"
import UserHooks from "@/hooks/user-hooks"

interface SessionContextType {
  user:            User | null
  isLoading:       boolean
  isAuthenticated: boolean
  error:           Error | null
  refetch:         () => void
  logout:          () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  const { useGetSession, useLogout } = UserHooks()
  const { data: user, isLoading, error, refetch } = useGetSession()
  const { mutateAsync: logout } = useLogout
  const value = {
    user:            user || null,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
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
