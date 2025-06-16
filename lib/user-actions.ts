"use server"

import { getSession } from "./auth"
import { z } from "zod"
import { mockSchools } from "./school-actions"
import { sendUserWelcomeEmail } from "./email-service"

interface SchoolUser {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "teacher" | "student" | "parent"
  status: "active" | "inactive" | "pending"
  schoolId: number
  schoolName: string
  schoolCode: string
  password: string
  joinedAt: string
  additionalInfo?: {
    employeeNumber?: string
    admissionNumber?: string
    class?: string
    subjects?: string[]
    children?: string[]
    qualification?: string
    dateOfBirth?: string
    parentEmail?: string
    occupation?: string
    address?: string
    emergencyContact?: string
  }
}

const mockSchoolUsers: SchoolUser[] = [
  {
    id: 100,
    firstName: "Mary",
    lastName: "Wanjiku",
    email: "mary.teacher@greenfield.ac.ke",
    phone: "+254 701 234 567",
    role: "teacher",
    status: "active",
    schoolId: 1,
    schoolName: "Greenfield Primary School",
    schoolCode: "GPS001",
    password: "teacher123",
    joinedAt: "2024-01-15",
    additionalInfo: {
      employeeNumber: "T001",
      subjects: ["Mathematics", "Science"],
      qualification: "Bachelor of Education",
    },
  },
  {
    id: 101,
    firstName: "Alice",
    lastName: "Muthoni",
    email: "alice.student@greenfield.ac.ke",
    phone: "+254 702 345 678",
    role: "student",
    status: "active",
    schoolId: 1,
    schoolName: "Greenfield Primary School",
    schoolCode: "GPS001",
    password: "student123",
    joinedAt: "2024-01-20",
    additionalInfo: {
      admissionNumber: "GPS001/2024/001",
      class: "Grade 5A",
      dateOfBirth: "2017-03-15",
      parentEmail: "jane.parent@gmail.com",
    },
  },
  {
    id: 102,
    firstName: "Jane",
    lastName: "Muthoni",
    email: "jane.parent@gmail.com",
    phone: "+254 703 456 789",
    role: "parent",
    status: "active",
    schoolId: 1,
    schoolName: "Greenfield Primary School",
    schoolCode: "GPS001",
    password: "parent123",
    joinedAt: "2024-01-20",
    additionalInfo: {
      children: ["Alice Muthoni"],
      occupation: "Business Owner",
      address: "Nairobi, Kenya",
      emergencyContact: "+254 704 567 890",
    },
  },
]

const createUserSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  role: z.enum(["teacher", "student", "parent"]),
  // Teacher fields
  employeeNumber: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  qualification: z.string().optional(),
  // Student fields
  admissionNumber: z.string().optional(),
  class: z.string().optional(),
  dateOfBirth: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal("")),
  // Parent fields
  occupation: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
})

function generateTempPassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function createUser(prevState: any, formData: FormData) {
  const user = await getSession()

  if (!user || user.role !== "admin") {
    return {
      errors: {
        general: ["Unauthorized access"],
      },
    }
  }

  // Parse subjects array from form data
  const subjects: string[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("subject_") && value === "on") {
      subjects.push(key.replace("subject_", "").replace(/_/g, " "))
    }
  }

  const validatedFields = createUserSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    employeeNumber: formData.get("employeeNumber"),
    subjects: subjects.length > 0 ? subjects : undefined,
    qualification: formData.get("qualification"),
    admissionNumber: formData.get("admissionNumber"),
    class: formData.get("class"),
    dateOfBirth: formData.get("dateOfBirth"),
    parentEmail: formData.get("parentEmail"),
    occupation: formData.get("occupation"),
    address: formData.get("address"),
    emergencyContact: formData.get("emergencyContact"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data

  // Check if email already exists
  const existingUser = mockSchoolUsers.find((u) => u.email === data.email)
  if (existingUser) {
    return {
      errors: {
        email: ["A user with this email already exists"],
      },
    }
  }

  // Role-specific validation
  if (data.role === "teacher" && !data.employeeNumber) {
    return {
      errors: {
        employeeNumber: ["Employee number is required for teachers"],
      },
    }
  }

  if (data.role === "student" && !data.admissionNumber) {
    return {
      errors: {
        admissionNumber: ["Admission number is required for students"],
      },
    }
  }

  try {
    const tempPassword = generateTempPassword()
    const newUserId = Math.max(...mockSchoolUsers.map((u) => u.id), 0) + 1

    // Get school info for the user
    const school = mockSchools.find((s) => s.id === user.schoolId)
    const schoolCode = school?.code || "UNKNOWN"

    // Build additional info based on role
    let additionalInfo: any = {}

    if (data.role === "teacher") {
      additionalInfo = {
        employeeNumber: data.employeeNumber,
        subjects: data.subjects || [],
        qualification: data.qualification || "",
      }
    } else if (data.role === "student") {
      additionalInfo = {
        admissionNumber: data.admissionNumber,
        class: data.class || "",
        dateOfBirth: data.dateOfBirth || "",
        parentEmail: data.parentEmail || "",
      }
    } else if (data.role === "parent") {
      additionalInfo = {
        children: [], // This would be populated when linking to students
        occupation: data.occupation || "",
        address: data.address || "",
        emergencyContact: data.emergencyContact || "",
      }
    }

    const newUser: SchoolUser = {
      id: newUserId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: "active",
      schoolId: user.schoolId!,
      schoolName: user.schoolName!,
      schoolCode: schoolCode,
      password: tempPassword,
      joinedAt: new Date().toISOString().split("T")[0],
      additionalInfo,
    }

    mockSchoolUsers.push(newUser)

    // Update school user counts
    if (school) {
      if (data.role === "teacher") {
        school.teacherCount += 1
      } else if (data.role === "student") {
        school.studentCount += 1
      }
    }

    // Send welcome email to new user
    try {
      await sendUserWelcomeEmail({
        userEmail: data.email,
        userName: `${data.firstName} ${data.lastName}`,
        userRole: data.role,
        schoolName: user.schoolName!,
        schoolCode: schoolCode,
        tempPassword: tempPassword,
        adminName: `${user.firstName} ${user.lastName}`,
      })

      console.log("✅ Welcome email sent successfully to:", data.email)
    } catch (emailError) {
      console.error("❌ Failed to send welcome email:", emailError)
      // Don't fail the entire operation if email fails
    }

    console.log("User created successfully:", newUser)
    console.log("User credentials:", {
      email: data.email,
      tempPassword,
      schoolCode,
    })

    return {
      success: true,
      message: `${data.role.charAt(0).toUpperCase() + data.role.slice(1)} created successfully! Welcome email with login credentials sent to ${data.email}`,
      tempPassword, // Still show in UI for immediate reference
      schoolCode,
      userEmail: data.email,
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return {
      errors: {
        general: ["Failed to create user. Please try again."],
      },
    }
  }
}

export async function getSchoolUsers(schoolId: number) {
  const user = await getSession()

  if (!user || (user.role !== "admin" && user.role !== "super_admin")) {
    return []
  }

  // For admin users, only return users from their school
  if (user.role === "admin" && user.schoolId !== schoolId) {
    return []
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockSchoolUsers.filter((u) => u.schoolId === schoolId)
}

export async function deleteUser(userId: number) {
  const user = await getSession()

  if (!user || user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized access",
    }
  }

  try {
    const userIndex = mockSchoolUsers.findIndex((u) => u.id === userId && u.schoolId === user.schoolId)
    if (userIndex === -1) {
      return {
        success: false,
        message: "User not found",
      }
    }

    const deletedUser = mockSchoolUsers[userIndex]
    mockSchoolUsers.splice(userIndex, 1)

    // Update school user counts
    const school = mockSchools.find((s) => s.id === user.schoolId)
    if (school) {
      if (deletedUser.role === "teacher") {
        school.teacherCount = Math.max(0, school.teacherCount - 1)
      } else if (deletedUser.role === "student") {
        school.studentCount = Math.max(0, school.studentCount - 1)
      }
    }

    return {
      success: true,
      message: `${deletedUser.firstName} ${deletedUser.lastName} deleted successfully`,
    }
  } catch (error) {
    console.error("Error deleting user:", error)
    return {
      success: false,
      message: "Failed to delete user",
    }
  }
}

// Export for auth actions to use
export { mockSchoolUsers }
