import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "@/lib/auth"

// Define protected routes and their allowed roles
const protectedRoutes = {
  "/super-admin": ["super_admin"],
  "/admin": ["admin"],
  "/teacher": ["teacher"],
  "/student": ["student"],
  "/parent": ["parent"],
  "/dashboard": ["super_admin", "admin", "teacher", "student", "parent"],
}

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/features",
  "/pricing",
  "/contact",
  "/blog",
  "/login",
  "/signup",
  "/forgot-password",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get the session token
  const session = request.cookies.get("session")?.value

  if (!session) {
    // Redirect to login if no session
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify the session
  const payload = await decrypt(session)

  if (!payload || payload.exp < Date.now() / 1000) {
    // Redirect to login if session is invalid or expired
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("session")
    return response
  }

  // Check role-based access
  const userRole = payload.user.role

  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard if user doesn't have access
        const redirectPath = getRoleBasedRedirect(userRole)
        return NextResponse.redirect(new URL(redirectPath, request.url))
      }
      break
    }
  }

  return NextResponse.next()
}

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "super_admin":
      return "/super-admin/dashboard"
    case "admin":
      return "/admin/dashboard"
    case "teacher":
      return "/teacher/dashboard"
    case "student":
      return "/student/dashboard"
    case "parent":
      return "/parent/dashboard"
    default:
      return "/login"
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
