"use server"

import { createSession, deleteSession } from "./auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import { mockUsers } from "./school-actions"
import { mockSchoolUsers } from "./user-actions"

// Mock database - replace with actual database queries
const allUsers = [...mockUsers, ...mockSchoolUsers]

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  schoolCode: z.string().optional(),
})

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["admin", "teacher", "student", "parent"]),
    schoolCode: z.string().min(3, "School code is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    schoolCode: formData.get("schoolCode"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, schoolCode } = validatedFields.data

  // Find user in mock database
  const user = allUsers.find((u) => u.email === email)

  if (!user || user.password !== password) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    }
  }

  // Check school code for non-super admin users
  if (user.role !== "super_admin" && schoolCode) {
    // Mock school code validation - replace with actual database query
    const validSchoolCodes = ["GPS001", "SSS002"]
    if (!validSchoolCodes.includes(schoolCode)) {
      return {
        errors: {
          schoolCode: ["Invalid school code"],
        },
      }
    }
  }

  // Create session
  await createSession({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    schoolId: user.schoolId,
    schoolName: user.schoolName,
  })

  // Redirect based on role
  const redirectPath = getRoleBasedRedirect(user.role)
  redirect(redirectPath)
}

export async function signup(prevState: any, formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
    schoolCode: formData.get("schoolCode"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, password, role, schoolCode } = validatedFields.data

  // Check if user already exists
  const existingUser = allUsers.find((u) => u.email === email)
  if (existingUser) {
    return {
      errors: {
        email: ["User with this email already exists"],
      },
    }
  }

  // Validate school code
  const validSchoolCodes = ["GPS001", "SSS002"]
  if (!validSchoolCodes.includes(schoolCode)) {
    return {
      errors: {
        schoolCode: ["Invalid school code"],
      },
    }
  }

  // Create new user (in production, save to database)
  const newUser = {
    id: allUsers.length + 1,
    email,
    password, // In production, hash this password
    firstName,
    lastName,
    role,
    schoolId: 1, // Mock school ID
    schoolName: "Greenfield Primary School",
  }

  allUsers.push(newUser)

  // Create session
  await createSession({
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    role: newUser.role,
    schoolId: newUser.schoolId,
    schoolName: newUser.schoolName,
  })

  // Redirect based on role
  const redirectPath = getRoleBasedRedirect(newUser.role)
  redirect(redirectPath)
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "super_admin":
      return "/super-admin/dashboard"
    case "admin":
      return "/admin/dashboard"
    case "teacher":
      return "/teacher/dashboard"
    case "student":
      return "/student/dashboard"
    case "parent":
      return "/parent/dashboard"
    default:
      return "/dashboard"
  }
}
