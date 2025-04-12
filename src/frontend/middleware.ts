import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { cookies } from "next/headers"
import { SessionData } from "./config/iron-session"
import { sessionOptions } from "./config/iron-session"
import { getIronSession } from "iron-session"
const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"]
const authRoutes = ["/admin", "/profile", "/orders", "/api/user/avatar"]

// This is a simplified middleware example
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  const cookieStore = await cookies()
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions)
  const isLoggedIn = session.isLoggedIn

  // if (isLoggedIn && pathname === '/logout') {
  //   request.cookies.delete(sessionOptions.cookieName)
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  if (!isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

 

  return NextResponse.next()
}


export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}
