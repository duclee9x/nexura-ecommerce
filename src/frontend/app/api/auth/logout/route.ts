import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { NextResponse, NextRequest } from "next/server"
import { sessionOptions, SessionData } from "@/config/iron-session"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
    
    session.destroy()
    return NextResponse.redirect(new URL('/login', request.url))
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
} 