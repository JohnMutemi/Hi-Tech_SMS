"use server"

import { getSession } from "./auth"
import { z } from "zod"
import { sendAdminWelcomeEmail } from "./email-service"

// Mock database - replace with actual database queries
const mockSchools: any[] = [
  {
    id: 1,
    name: "Greenfield Primary School",
    type: "Primary School",
    code: "GPS001",
    address: "Nairobi, Kenya",
    phone: "+254 712 345 678",
    email: "info@greenfield.ac.ke",
    website: "",
    description: "A leading primary school in Nairobi",
    adminName: "John Doe",
    adminEmail: "admin@greenfield.ac.ke",
    studentCount: 1234,
    teacherCount: 89,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sunrise Secondary School",
    type: "Secondary School",
    code: "SSS002",
    address: "Mombasa, Kenya",
    phone: "+254 723 456 789",
    email: "admin@sunrise.ac.ke",
    website: "https://sunrise.ac.ke",
    description: "Excellence in secondary education",
    adminName: "Mary Wanjiku",
    adminEmail: "mary.admin@sunrise.ac.ke",
    studentCount: 856,
    teacherCount: 67,
    status: "active",
    createdAt: "2024-01-10",
  },
]

let mockUsers: any[] = [
  {
    id: 1,
    email: "admin@greenfield.ac.ke",
    password: "admin123",
    firstName: "John",
    lastName: "Doe",
    role: "admin",
    schoolId: 1,
    schoolName: "Greenfield Primary School",
    schoolCode: "GPS001",
    phone: "+254 712 345 678",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    email: "mary.admin@sunrise.ac.ke",
    password: "admin123",
    firstName: "Mary",
    lastName: "Wanjiku",
    role: "admin",
    schoolId: 2,
    schoolName: "Sunrise Secondary School",
    schoolCode: "SSS002",
    phone: "+254 723 456 789",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: 5,
    email: "superadmin@edumanage.co.ke",
    password: "super123",
    firstName: "Super",
    lastName: "Admin",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-01",
  },
]

const createSchoolSchema = z.object({
  schoolName: z.string().min(3, "School name must be at least 3 characters"),
  schoolType: z.string().min(1, "School type is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().optional(),
  description: z.string().optional(),
  adminFirstName: z.string().min(2, "First name must be at least 2 characters"),
  adminLastName: z.string().min(2, "Last name must be at least 2 characters"),
  adminEmail: z.string().email("Valid admin email is required"),
  adminPhone: z.string().min(10, "Valid admin phone number is required"),
})

function generateSchoolCode(schoolName: string, schoolType: string): string {
  const nameInitials = schoolName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 3)

  const typeCode =
    schoolType === "primary"
      ? "P"
      : schoolType === "secondary"
        ? "S"
        : schoolType === "college"
          ? "C"
          : schoolType === "university"
            ? "U"
            : "T"

  const randomNum = Math.floor(Math.random() * 900) + 100
  return `${nameInitials}${typeCode}${randomNum}`
}

function generateTempPassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function createSchool(prevState: any, formData: FormData) {
  const user = await getSession()

  if (!user || user.role !== "super_admin") {
    return {
      errors: {
        general: ["Unauthorized access"],
      },
    }
  }

  const validatedFields = createSchoolSchema.safeParse({
    schoolName: formData.get("schoolName"),
    schoolType: formData.get("schoolType"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    website: formData.get("website"),
    description: formData.get("description"),
    adminFirstName: formData.get("adminFirstName"),
    adminLastName: formData.get("adminLastName"),
    adminEmail: formData.get("adminEmail"),
    adminPhone: formData.get("adminPhone"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data

  // Check if school email already exists
  const existingSchool = mockSchools.find((school) => school.email === data.email)
  if (existingSchool) {
    return {
      errors: {
        email: ["A school with this email already exists"],
      },
    }
  }

  // Check if admin email already exists
  const existingAdmin = mockUsers.find((user) => user.email === data.adminEmail)
  if (existingAdmin) {
    return {
      errors: {
        adminEmail: ["A user with this email already exists"],
      },
    }
  }

  try {
    // Generate school code and temporary password
    const schoolCode = generateSchoolCode(data.schoolName, data.schoolType)
    const tempPassword = generateTempPassword()

    // Create new school
    const newSchoolId = mockSchools.length + 1
    const newSchool = {
      id: newSchoolId,
      name: data.schoolName,
      type: data.schoolType.charAt(0).toUpperCase() + data.schoolType.slice(1) + " School",
      code: schoolCode,
      address: data.address,
      phone: data.phone,
      email: data.email,
      website: data.website || "",
      description: data.description || "",
      adminName: `${data.adminFirstName} ${data.adminLastName}`,
      adminEmail: data.adminEmail,
      studentCount: 0,
      teacherCount: 0,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    // Create admin user
    const newAdminId = mockUsers.length + 1
    const newAdmin = {
      id: newAdminId,
      email: data.adminEmail,
      password: tempPassword, // In production, this should be hashed
      firstName: data.adminFirstName,
      lastName: data.adminLastName,
      role: "admin",
      schoolId: newSchoolId,
      schoolName: data.schoolName,
      schoolCode: schoolCode, // Add school code to admin user
      phone: data.adminPhone,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    }

    // Add to mock databases
    mockSchools.push(newSchool)
    mockUsers.push(newAdmin)

    // Send welcome email to admin
    try {
      await sendAdminWelcomeEmail({
        adminEmail: data.adminEmail,
        adminName: `${data.adminFirstName} ${data.adminLastName}`,
        schoolName: data.schoolName,
        schoolCode: schoolCode,
        tempPassword: tempPassword,
      })

      console.log("✅ Welcome email sent successfully to:", data.adminEmail)
    } catch (emailError) {
      console.error("❌ Failed to send welcome email:", emailError)
      // Don't fail the entire operation if email fails
    }

    console.log("School created successfully:", newSchool)
    console.log("Admin created with credentials:", {
      email: data.adminEmail,
      tempPassword,
      schoolCode,
    })

    return {
      success: true,
      message: `School created successfully! Welcome email with login credentials sent to ${data.adminEmail}`,
      schoolCode,
      tempPassword, // Still show in UI for immediate reference
      adminEmail: data.adminEmail,
    }
  } catch (error) {
    console.error("Error creating school:", error)
    return {
      errors: {
        general: ["Failed to create school. Please try again."],
      },
    }
  }
}

export async function getSchools() {
  const user = await getSession()

  if (!user || user.role !== "super_admin") {
    return []
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockSchools
}

export async function deleteSchool(schoolId: number) {
  const user = await getSession()

  if (!user || user.role !== "super_admin") {
    return {
      success: false,
      message: "Unauthorized access",
    }
  }

  try {
    // Remove school
    const schoolIndex = mockSchools.findIndex((school) => school.id === schoolId)
    if (schoolIndex === -1) {
      return {
        success: false,
        message: "School not found",
      }
    }

    const deletedSchool = mockSchools[schoolIndex]
    mockSchools.splice(schoolIndex, 1)

    // Remove associated users
    mockUsers = mockUsers.filter((user) => user.schoolId !== schoolId)

    return {
      success: true,
      message: `${deletedSchool.name} deleted successfully`,
    }
  } catch (error) {
    console.error("Error deleting school:", error)
    return {
      success: false,
      message: "Failed to delete school",
    }
  }
}

export async function updateSchoolStatus(schoolId: number, status: string) {
  const user = await getSession()

  if (!user || user.role !== "super_admin") {
    return {
      success: false,
      message: "Unauthorized access",
    }
  }

  try {
    const school = mockSchools.find((school) => school.id === schoolId)
    if (!school) {
      return {
        success: false,
        message: "School not found",
      }
    }

    school.status = status

    return {
      success: true,
      message: `School status updated to ${status}`,
    }
  } catch (error) {
    console.error("Error updating school status:", error)
    return {
      success: false,
      message: "Failed to update school status",
    }
  }
}

// Export mock data for auth actions to use
export { mockUsers, mockSchools }
