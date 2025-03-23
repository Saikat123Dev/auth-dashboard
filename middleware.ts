import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the auth token from cookies
  const authToken = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // For debugging - log the token and path (these will appear in server logs)
  console.log(`Path: ${pathname}, Token exists: ${!!authToken}`)

  // Protected routes - redirect to login if no token
  if (pathname.startsWith("/dashboard")) {
    if (!authToken) {
      console.log("No auth token found, redirecting to login")
      return NextResponse.redirect(new URL("/login", request.url))
    }
    // Token exists, allow access to dashboard
    console.log("Auth token found, allowing access to dashboard")
    return NextResponse.next()
  }

  // Redirect to dashboard if already logged in and trying to access login or home page
  if (pathname === "/login" || pathname === "/") {
    if (authToken) {
      console.log("Auth token found, redirecting to dashboard")
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    // No token, allow access to login
    return NextResponse.next()
  }

  // For all other routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
}

