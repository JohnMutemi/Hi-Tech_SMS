import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const key = new TextEncoder().encode(secretKey)

export type UserRole = "super_admin" | "admin" | "teacher" | "student" | "parent"

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRole
  schoolId?: number
  schoolName?: string
}

export interface AuthPayload {
  user: User
  exp: number
}

export async function encrypt(payload: AuthPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload as AuthPayload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

export async function getSession(): Promise<User | null> {
  const session = cookies().get("session")?.value
  if (!session) return null

  const payload = await decrypt(session)
  if (!payload || payload.exp < Date.now() / 1000) {
    return null
  }

  return payload.user
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const session = await encrypt({ user, exp: expires.getTime() / 1000 })

  cookies().set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().delete("session")
}

export function hasRole(user: User | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

export function canAccessSchool(user: User | null, schoolId: number): boolean {
  if (!user) return false
  if (user.role === "super_admin") return true
  return user.schoolId === schoolId
}
