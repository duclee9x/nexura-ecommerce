'use server'

import { getSession } from "@/app/api/auth/route"

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const session = await getSession()
    return session?.userId || null
  } catch (error) {
    console.error("Error getting current user ID:", error)
    return null
  }
} 