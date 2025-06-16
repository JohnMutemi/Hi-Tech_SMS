import { type NextRequest, NextResponse } from "next/server"
import { SchoolServiceDrizzle } from "@/lib/services/school-service-drizzle"

export async function GET(request: NextRequest, { params }: { params: { schoolCode: string } }) {
  try {
    const school = await SchoolServiceDrizzle.getSchoolWithRelations(params.schoolCode)

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    return NextResponse.json({ school })
  } catch (error) {
    console.error("Error fetching school:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}
