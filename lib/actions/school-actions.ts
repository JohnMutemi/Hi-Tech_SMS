"use server"

import { db } from "@/lib/db"
import { schools, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

function generateSchoolCode(schoolName: string): string {
  // Generate a school code based on school name
  const prefix = schoolName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 3)

  const suffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}${suffix}`
}

function generateTempPassword(): string {
  // Generate a temporary password
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function createSchool(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const address = formData.get("address") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const code = (formData.get("code") as string) || generateSchoolCode(name)

    // Validate required fields
    if (!name || !address || !phone || !email) {
      return { error: "All fields are required" }
    }

    // Check if school code already exists
    const existingSchool = await db.select().from(schools).where(eq(schools.code, code)).limit(1)

    if (existingSchool.length > 0) {
      return { error: "School with this code already exists" }
    }

    // Check if email already exists
    const existingEmail = await db.select().from(schools).where(eq(schools.email, email)).limit(1)

    if (existingEmail.length > 0) {
      return { error: "School with this email already exists" }
    }

    // Create school
    const [newSchool] = await db
      .insert(schools)
      .values({
        name,
        code,
        address,
        phone,
        email,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    // Create admin user for the school
    const tempPassword = generateTempPassword()
    const hashedPassword = await bcrypt.hash(tempPassword, 12)

    await db.insert(users).values({
      name: `${name} Admin`,
      email: email,
      password: hashedPassword,
      role: "school_admin",
      schoolId: newSchool.id,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/super-admin/schools")

    return {
      success: true,
      schoolCode: code,
      tempPassword: tempPassword,
      message: "School created successfully",
    }
  } catch (error) {
    console.error("Error creating school:", error)
    return { error: "Failed to create school" }
  }
}

export async function updateSchool(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const address = formData.get("address") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string

    if (!name || !address || !phone || !email) {
      return { error: "All fields are required" }
    }

    await db
      .update(schools)
      .set({
        name,
        address,
        phone,
        email,
        updatedAt: new Date(),
      })
      .where(eq(schools.id, id))

    revalidatePath("/super-admin/schools")
    return { success: true }
  } catch (error) {
    console.error("Error updating school:", error)
    return { error: "Failed to update school" }
  }
}

export async function deleteSchool(id: string) {
  try {
    // First delete all users associated with the school
    await db.delete(users).where(eq(users.schoolId, id))

    // Then delete the school
    await db.delete(schools).where(eq(schools.id, id))

    revalidatePath("/super-admin/schools")
    return { success: true }
  } catch (error) {
    console.error("Error deleting school:", error)
    return { error: "Failed to delete school" }
  }
}

export async function toggleSchoolStatus(id: string) {
  try {
    const school = await db.select().from(schools).where(eq(schools.id, id)).limit(1)

    if (school.length === 0) {
      return { error: "School not found" }
    }

    await db
      .update(schools)
      .set({
        isActive: !school[0].isActive,
        updatedAt: new Date(),
      })
      .where(eq(schools.id, id))

    revalidatePath("/super-admin/schools")
    return { success: true }
  } catch (error) {
    console.error("Error toggling school status:", error)
    return { error: "Failed to update school status" }
  }
}
