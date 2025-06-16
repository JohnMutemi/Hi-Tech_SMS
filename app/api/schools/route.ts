import { type NextRequest, NextResponse } from "next/server"
import { SchoolService } from "@/lib/services/school-service"
import { generateSchoolCode, generatePassword, generatePortalUrl } from "@/lib/utils/school-generator"

export async function GET() {
  try {
    const schools = await SchoolService.getAllSchools()
    return NextResponse.json({ schools })
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, colorTheme, adminFirstName, adminLastName, adminEmail, description } = body

    // Validate required fields
    if (!name || !adminFirstName || !adminLastName || !adminEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate school data
    const schoolCode = generateSchoolCode(name)
    const adminPassword = generatePassword()
    const portalUrl = generatePortalUrl(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", schoolCode)

    const schoolData = {
      schoolCode,
      name: name.trim(),
      colorTheme: colorTheme || "#3B82F6",
      portalUrl,
      description: description?.trim(),
      adminEmail: adminEmail.trim(),
      adminPassword,
      adminFirstName: adminFirstName.trim(),
      adminLastName: adminLastName.trim(),
      status: "setup" as const,
    }

    const school = await SchoolService.createSchool(schoolData)

    return NextResponse.json({
      school: {
        name: school.name,
        schoolCode: school.schoolCode,
        portalUrl: school.portalUrl,
        colorTheme: school.colorTheme,
      },
      admin: {
        firstName: school.adminFirstName,
        lastName: school.adminLastName,
        email: school.adminEmail,
        password: adminPassword,
      },
    })
  } catch (error) {
    console.error("Error creating school:", error)
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 })
  }
}
