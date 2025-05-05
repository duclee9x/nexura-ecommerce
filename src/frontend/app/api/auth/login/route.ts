import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { sessionOptions, SessionData } from "@/config/iron-session"
import UserHooks from "@/hooks/user-hooks"
export async function POST(request: NextRequest) {
  const { useLogin } = UserHooks()
  try {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
    const { email, password } = await request.json()
    const { mutateAsync: login } = useLogin
    const { success, message, user } = await login({ email, password })

    if (!success || !user) {
      return NextResponse.json(
        { message: message || "Invalid credentials" },
        { status: 401 }
      )
    }

    session.user = user
    session.isLoggedIn = true
    await session.save()
    cookieStore.set("isAuthenticated", "true")
    return NextResponse.json({ user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 