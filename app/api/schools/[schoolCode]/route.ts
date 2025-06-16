import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { schools, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { schoolCode: string } }) {
  try {
    const schoolCode = params.schoolCode.toLowerCase()

    const school = await db.select().from(schools).where(eq(schools.code, schoolCode)).limit(1)

    if (school.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    // Get school admin user
    const admin = await db
      .select()
      .from(users)
      .where(eq(users.schoolId, school[0].id))
      .where(eq(users.role, "school_admin"))
      .limit(1)

    // Transform to match the expected format
    const schoolData = {
      id: school[0].id,
      schoolCode: school[0].code,
      name: school[0].name,
      logoUrl: null, // Add logo handling later
      colorTheme: "#3b82f6", // Default blue theme
      portalUrl: `/schools/${school[0].code}`,
      description: null,
      adminEmail: admin[0]?.email || school[0].email,
      adminPassword: admin[0]?.password || "temp123", // This should be hashed
      adminFirstName: admin[0]?.name?.split(" ")[0] || "Admin",
      adminLastName: admin[0]?.name?.split(" ").slice(1).join(" ") || "User",
      status: school[0].isActive ? "active" : "inactive",
      createdAt: school[0].createdAt,
      updatedAt: school[0].updatedAt,
      profile: null,
      teachers: [],
      students: [],
      subjects: [],
      classes: [],
    }

    return NextResponse.json({ school: schoolData })
  } catch (error) {
    console.error("Error fetching school:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}
