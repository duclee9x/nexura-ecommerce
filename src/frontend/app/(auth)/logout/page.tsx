"use client"

import { useSession } from "@/contexts/session-context"

export default function LogoutPage() {
  const {logout} = useSession()
  logout()
  
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <h1>Logging out...</h1>
    </div>
  )
} 