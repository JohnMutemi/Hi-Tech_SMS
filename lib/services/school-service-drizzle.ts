import { db } from "@/lib/db"
import { schools, schoolProfiles, teachers, students, subjects, classes } from "@/lib/db/schema"
import type {
  School,
  NewSchool,
  SchoolProfile,
  NewSchoolProfile,
  Teacher,
  NewTeacher,
  Student,
  NewStudent,
  Subject,
  NewSubject,
  Class,
  NewClass,
} from "@/lib/db/schema"
import { eq, desc, count, and } from "drizzle-orm"

export class SchoolServiceDrizzle {
  // School CRUD operations
  static async createSchool(schoolData: NewSchool): Promise<School> {
    try {
      const [school] = await db.insert(schools).values(schoolData).returning()
      return school
    } catch (error) {
      console.error("Error creating school:", error)
      throw new Error("Failed to create school")
    }
  }

  static async getSchoolByCode(schoolCode: string): Promise<School | null> {
    try {
      const [school] = await db.select().from(schools).where(eq(schools.schoolCode, schoolCode.toLowerCase())).limit(1)

      return school || null
    } catch (error) {
      console.error("Error getting school by code:", error)
      return null
    }
  }

  static async getSchoolWithRelations(schoolCode: string) {
    try {
      const school = await this.getSchoolByCode(schoolCode)
      if (!school) return null

      const [profile, teachersList, studentsList, subjectsList, classesList] = await Promise.all([
        this.getSchoolProfile(school.id),
        this.getSchoolTeachers(school.id),
        this.getSchoolStudents(school.id),
        this.getSchoolSubjects(school.id),
        this.getSchoolClasses(school.id),
      ])

      return {
        ...school,
        profile,
        teachers: teachersList,
        students: studentsList,
        subjects: subjectsList,
        classes: classesList,
      }
    } catch (error) {
      console.error("Error getting school with relations:", error)
      return null
    }
  }

  static async getAllSchools(): Promise<Array<School & { teacherCount: number; studentCount: number }>> {
    try {
      const schoolsWithCounts = await db
        .select({
          id: schools.id,
          schoolCode: schools.schoolCode,
          name: schools.name,
          logoFilename: schools.logoFilename,
          colorTheme: schools.colorTheme,
          portalUrl: schools.portalUrl,
          description: schools.description,
          adminEmail: schools.adminEmail,
          adminPassword: schools.adminPassword,
          adminFirstName: schools.adminFirstName,
          adminLastName: schools.adminLastName,
          createdBy: schools.createdBy,
          createdAt: schools.createdAt,
          updatedAt: schools.updatedAt,
          status: schools.status,
          teacherCount: count(teachers.id),
          studentCount: count(students.id),
        })
        .from(schools)
        .leftJoin(teachers, and(eq(schools.id, teachers.schoolId), eq(teachers.status, "active")))
        .leftJoin(students, and(eq(schools.id, students.schoolId), eq(students.status, "active")))
        .groupBy(schools.id)
        .orderBy(desc(schools.createdAt))

      return schoolsWithCounts
    } catch (error) {
      console.error("Error getting all schools:", error)
      return []
    }
  }

  static async updateSchool(id: string, updates: Partial<NewSchool>): Promise<School | null> {
    try {
      const [school] = await db
        .update(schools)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schools.id, id))
        .returning()

      return school || null
    } catch (error) {
      console.error("Error updating school:", error)
      throw new Error("Failed to update school")
    }
  }

  static async deleteSchool(id: string): Promise<boolean> {
    try {
      const result = await db.delete(schools).where(eq(schools.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deleting school:", error)
      return false
    }
  }

  // School Profile operations
  static async createOrUpdateSchoolProfile(
    schoolId: string,
    profileData: Omit<NewSchoolProfile, "schoolId">,
  ): Promise<SchoolProfile> {
    try {
      const [profile] = await db
        .insert(schoolProfiles)
        .values({ ...profileData, schoolId })
        .onConflictDoUpdate({
          target: schoolProfiles.schoolId,
          set: { ...profileData, updatedAt: new Date() },
        })
        .returning()

      return profile
    } catch (error) {
      console.error("Error creating/updating school profile:", error)
      throw new Error("Failed to save school profile")
    }
  }

  static async getSchoolProfile(schoolId: string): Promise<SchoolProfile | null> {
    try {
      const [profile] = await db.select().from(schoolProfiles).where(eq(schoolProfiles.schoolId, schoolId)).limit(1)

      return profile || null
    } catch (error) {
      console.error("Error getting school profile:", error)
      return null
    }
  }

  // Teacher operations
  static async createTeacher(teacherData: NewTeacher): Promise<Teacher> {
    try {
      const [teacher] = await db.insert(teachers).values(teacherData).returning()
      return teacher
    } catch (error) {
      console.error("Error creating teacher:", error)
      throw new Error("Failed to create teacher")
    }
  }

  static async getSchoolTeachers(schoolId: string): Promise<Teacher[]> {
    try {
      const teachersList = await db
        .select()
        .from(teachers)
        .where(eq(teachers.schoolId, schoolId))
        .orderBy(desc(teachers.createdAt))

      return teachersList
    } catch (error) {
      console.error("Error getting school teachers:", error)
      return []
    }
  }

  static async updateTeacher(id: string, updates: Partial<NewTeacher>): Promise<Teacher | null> {
    try {
      const [teacher] = await db
        .update(teachers)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(teachers.id, id))
        .returning()

      return teacher || null
    } catch (error) {
      console.error("Error updating teacher:", error)
      throw new Error("Failed to update teacher")
    }
  }

  static async deleteTeacher(id: string): Promise<boolean> {
    try {
      const result = await db.delete(teachers).where(eq(teachers.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deleting teacher:", error)
      return false
    }
  }

  // Student operations
  static async createStudent(studentData: NewStudent): Promise<Student> {
    try {
      const [student] = await db.insert(students).values(studentData).returning()
      return student
    } catch (error) {
      console.error("Error creating student:", error)
      throw new Error("Failed to create student")
    }
  }

  static async getSchoolStudents(schoolId: string): Promise<Student[]> {
    try {
      const studentsList = await db
        .select()
        .from(students)
        .where(eq(students.schoolId, schoolId))
        .orderBy(desc(students.createdAt))

      return studentsList
    } catch (error) {
      console.error("Error getting school students:", error)
      return []
    }
  }

  static async updateStudent(id: string, updates: Partial<NewStudent>): Promise<Student | null> {
    try {
      const [student] = await db
        .update(students)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(students.id, id))
        .returning()

      return student || null
    } catch (error) {
      console.error("Error updating student:", error)
      throw new Error("Failed to update student")
    }
  }

  static async deleteStudent(id: string): Promise<boolean> {
    try {
      const result = await db.delete(students).where(eq(students.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deleting student:", error)
      return false
    }
  }

  // Subject operations
  static async createSubject(subjectData: NewSubject): Promise<Subject> {
    try {
      const [subject] = await db.insert(subjects).values(subjectData).returning()
      return subject
    } catch (error) {
      console.error("Error creating subject:", error)
      throw new Error("Failed to create subject")
    }
  }

  static async getSchoolSubjects(schoolId: string): Promise<Subject[]> {
    try {
      const subjectsList = await db
        .select()
        .from(subjects)
        .where(eq(subjects.schoolId, schoolId))
        .orderBy(desc(subjects.createdAt))

      return subjectsList
    } catch (error) {
      console.error("Error getting school subjects:", error)
      return []
    }
  }

  static async updateSubject(id: string, updates: Partial<NewSubject>): Promise<Subject | null> {
    try {
      const [subject] = await db
        .update(subjects)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(subjects.id, id))
        .returning()

      return subject || null
    } catch (error) {
      console.error("Error updating subject:", error)
      throw new Error("Failed to update subject")
    }
  }

  static async deleteSubject(id: string): Promise<boolean> {
    try {
      const result = await db.delete(subjects).where(eq(subjects.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deleting subject:", error)
      return false
    }
  }

  // Class operations
  static async createClass(classData: NewClass): Promise<Class> {
    try {
      const [schoolClass] = await db.insert(classes).values(classData).returning()
      return schoolClass
    } catch (error) {
      console.error("Error creating class:", error)
      throw new Error("Failed to create class")
    }
  }

  static async getSchoolClasses(schoolId: string): Promise<Class[]> {
    try {
      const classesList = await db
        .select()
        .from(classes)
        .where(eq(classes.schoolId, schoolId))
        .orderBy(desc(classes.createdAt))

      return classesList
    } catch (error) {
      console.error("Error getting school classes:", error)
      return []
    }
  }

  static async updateClass(id: string, updates: Partial<NewClass>): Promise<Class | null> {
    try {
      const [schoolClass] = await db
        .update(classes)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(classes.id, id))
        .returning()

      return schoolClass || null
    } catch (error) {
      console.error("Error updating class:", error)
      throw new Error("Failed to update class")
    }
  }

  static async deleteClass(id: string): Promise<boolean> {
    try {
      const result = await db.delete(classes).where(eq(classes.id, id))
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deleting class:", error)
      return false
    }
  }

  // Authentication
  static async authenticateSchoolAdmin(schoolCode: string, email: string, password: string): Promise<boolean> {
    try {
      const [school] = await db
        .select({ id: schools.id })
        .from(schools)
        .where(
          and(
            eq(schools.schoolCode, schoolCode.toLowerCase()),
            eq(schools.adminEmail, email),
            eq(schools.adminPassword, password),
          ),
        )
        .limit(1)

      return !!school
    } catch (error) {
      console.error("Error authenticating school admin:", error)
      return false
    }
  }
}
