import { User } from "@nexura/grpc_gateway/protos"
import { SessionOptions } from "iron-session"

export interface SessionData {
  user?:         User
  accessToken?:  string
  refreshToken?: string
  isLoggedIn?:   boolean
}

export const sessionOptions: SessionOptions = {
  cookieName:    "nexura_session",
  password:      process.env.NEXT_PUBLIC_SESSION_SECRET || "complex_password_at_least_32_characters_long_here_now",
  cookieOptions: {
    secure:   process.env.NODE_ENV === "production",
    maxAge:   30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
    sameSite: "lax" as const,
  },
} 