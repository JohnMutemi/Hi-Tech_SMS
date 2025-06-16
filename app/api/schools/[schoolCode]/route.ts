import { type NextRequest, NextResponse } from "next/server"
import { SchoolService } from "@/lib/services/school-service"

export async function GET(request: NextRequest, { params }: { params: { schoolCode: string } }) {
  try {
    const school = await SchoolService.getSchoolByCode(params.schoolCode)

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    return NextResponse.json({ school })
  } catch (error) {
    console.error("Error fetching school:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}
