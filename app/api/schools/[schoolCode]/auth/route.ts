import { type NextRequest, NextResponse } from "next/server"
import { SchoolServiceDrizzle } from "@/lib/services/school-service-drizzle"

export async function POST(request: NextRequest, { params }: { params: { schoolCode: string } }) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const isValid = await SchoolServiceDrizzle.authenticateSchoolAdmin(params.schoolCode, email, password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error authenticating school admin:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
