import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { sessionOptions, SessionData } from "@/config/iron-session"
import { getUserGateway } from "@nexura/grpc_gateway/gateway"
export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

    if (!session.user || !session.isLoggedIn) {
      return NextResponse.json({ user: null })
    }
    const { user } = await getUserGateway({ id: session.user.id })

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Session error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 