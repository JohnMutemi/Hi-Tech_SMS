import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { schools, users } from "@/lib/db/schema"
import { eq, count } from "drizzle-orm"

export async function GET() {
  try {
    const allSchools = await db
      .select({
        id: schools.id,
        name: schools.name,
        code: schools.code,
        address: schools.address,
        phone: schools.phone,
        email: schools.email,
        isActive: schools.isActive,
        createdAt: schools.createdAt,
        updatedAt: schools.updatedAt,
      })
      .from(schools)
      .orderBy(schools.createdAt)

    // Get user counts for each school
    const schoolsWithCounts = await Promise.all(
      allSchools.map(async (school) => {
        const userCount = await db.select({ count: count() }).from(users).where(eq(users.schoolId, school.id))

        return {
          ...school,
          schoolCode: school.code,
          status: school.isActive ? "active" : "inactive",
          teachers: Array(userCount[0]?.count || 0).fill(null),
          students: Array(0).fill(null), // Will be updated when we add student management
          totalUsers: userCount[0]?.count || 0,
        }
      }),
    )

    return NextResponse.json({ schools: schoolsWithCounts })
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
  }
}
