import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { schools, users } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest, { params }: { params: { schoolCode: string } }) {
  try {
    const { email, password } = await request.json()
    const schoolCode = params.schoolCode.toLowerCase()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Get school
    const school = await db.select().from(schools).where(eq(schools.code, schoolCode)).limit(1)

    if (school.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    // Get admin user for this school
    const admin = await db
      .select()
      .from(users)
      .where(and(eq(users.schoolId, school[0].id), eq(users.email, email), eq(users.role, "school_admin")))
      .limit(1)

    if (admin.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin[0].password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error authenticating school admin:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
