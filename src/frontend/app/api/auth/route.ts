import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export interface SessionData {
  email:        string;
  userId:       string;
  accessToken:  string;
  refreshToken: string;
} 

export async function getSession(): Promise<SessionData | undefined> {
  const sessionStore = await cookies()
  const session = await getIronSession<SessionData>(sessionStore, {
    cookieName: 'nexura-auth-cookie',
    password:   process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  })
  return session
}


// Example authentication API route
export async function POST() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 403 })
    }

    return NextResponse.json({ success: true, message: "Authenticated" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Authentication error" }, { status: 500 })
  }
}

