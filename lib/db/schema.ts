import { pgTable, uuid, varchar, text, timestamp, boolean, integer, pgEnum } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enums
export const statusEnum = pgEnum("status", ["active", "setup", "suspended"])
export const schoolTypeEnum = pgEnum("school_type", ["primary", "secondary", "mixed", "college"])
export const genderEnum = pgEnum("gender", ["male", "female"])
export const teacherStatusEnum = pgEnum("teacher_status", ["active", "inactive"])
export const studentStatusEnum = pgEnum("student_status", ["active", "inactive", "graduated"])
export const roleEnum = pgEnum("role", ["super_admin", "admin"])

// Super Admins table
export const superAdmins = pgTable("super_admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: roleEnum("role").default("super_admin"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Schools table
export const schools = pgTable("schools", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolCode: varchar("school_code", { length: 20 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logoFilename: varchar("logo_filename", { length: 255 }),
  colorTheme: varchar("color_theme", { length: 7 }).default("#3B82F6").notNull(),
  portalUrl: varchar("portal_url", { length: 500 }).notNull(),
  description: text("description"),
  adminEmail: varchar("admin_email", { length: 255 }).notNull(),
  adminPassword: varchar("admin_password", { length: 255 }).notNull(),
  adminFirstName: varchar("admin_first_name", { length: 100 }).notNull(),
  adminLastName: varchar("admin_last_name", { length: 100 }).notNull(),
  createdBy: uuid("created_by").references(() => superAdmins.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  status: statusEnum("status").default("setup"),
})

// School Profiles table
export const schoolProfiles = pgTable("school_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 255 }),
  principalName: varchar("principal_name", { length: 255 }),
  establishedYear: varchar("established_year", { length: 4 }),
  email: varchar("email", { length: 255 }),
  motto: text("motto"),
  schoolType: schoolTypeEnum("school_type").default("primary"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Teachers table
export const teachers = pgTable("teachers", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  employeeId: varchar("employee_id", { length: 50 }),
  qualification: varchar("qualification", { length: 255 }),
  dateJoined: timestamp("date_joined"),
  status: teacherStatusEnum("status").default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Students table
export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  parentPhone: varchar("parent_phone", { length: 20 }).notNull(),
  parentEmail: varchar("parent_email", { length: 255 }),
  admissionNumber: varchar("admission_number", { length: 50 }),
  class: varchar("class", { length: 100 }),
  dateOfBirth: timestamp("date_of_birth"),
  gender: genderEnum("gender"),
  address: text("address"),
  dateAdmitted: timestamp("date_admitted"),
  status: studentStatusEnum("status").default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Subjects table
export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  description: text("description"),
  teacherId: uuid("teacher_id").references(() => teachers.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Classes table
export const classes = pgTable("classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolId: uuid("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  level: varchar("level", { length: 100 }).notNull(),
  capacity: integer("capacity").default(30),
  currentStudents: integer("current_students").default(0),
  classTeacherId: uuid("class_teacher_id").references(() => teachers.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Junction tables
export const subjectClasses = pgTable("subject_classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  subjectId: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  classId: uuid("class_id")
    .references(() => classes.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const teacherSubjects = pgTable("teacher_subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id")
    .references(() => teachers.id, { onDelete: "cascade" })
    .notNull(),
  subjectId: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

export const teacherClasses = pgTable("teacher_classes", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id")
    .references(() => teachers.id, { onDelete: "cascade" })
    .notNull(),
  classId: uuid("class_id")
    .references(() => classes.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Relations
export const schoolsRelations = relations(schools, ({ one, many }) => ({
  profile: one(schoolProfiles, {
    fields: [schools.id],
    references: [schoolProfiles.schoolId],
  }),
  teachers: many(teachers),
  students: many(students),
  subjects: many(subjects),
  classes: many(classes),
  createdBy: one(superAdmins, {
    fields: [schools.createdBy],
    references: [superAdmins.id],
  }),
}))

export const schoolProfilesRelations = relations(schoolProfiles, ({ one }) => ({
  school: one(schools, {
    fields: [schoolProfiles.schoolId],
    references: [schools.id],
  }),
}))

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  school: one(schools, {
    fields: [teachers.schoolId],
    references: [schools.id],
  }),
  subjects: many(teacherSubjects),
  classes: many(teacherClasses),
  assignedSubjects: many(subjects),
  assignedClasses: many(classes),
}))

export const studentsRelations = relations(students, ({ one }) => ({
  school: one(schools, {
    fields: [students.schoolId],
    references: [schools.id],
  }),
}))

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  school: one(schools, {
    fields: [subjects.schoolId],
    references: [schools.id],
  }),
  teacher: one(teachers, {
    fields: [subjects.teacherId],
    references: [teachers.id],
  }),
  classes: many(subjectClasses),
  teacherSubjects: many(teacherSubjects),
}))

export const classesRelations = relations(classes, ({ one, many }) => ({
  school: one(schools, {
    fields: [classes.schoolId],
    references: [schools.id],
  }),
  classTeacher: one(teachers, {
    fields: [classes.classTeacherId],
    references: [teachers.id],
  }),
  subjects: many(subjectClasses),
  teacherClasses: many(teacherClasses),
}))

export const superAdminsRelations = relations(superAdmins, ({ many }) => ({
  createdSchools: many(schools),
}))

// Export types
export type School = typeof schools.$inferSelect
export type NewSchool = typeof schools.$inferInsert
export type SchoolProfile = typeof schoolProfiles.$inferSelect
export type NewSchoolProfile = typeof schoolProfiles.$inferInsert
export type Teacher = typeof teachers.$inferSelect
export type NewTeacher = typeof teachers.$inferInsert
export type Student = typeof students.$inferSelect
export type NewStudent = typeof students.$inferInsert
export type Subject = typeof subjects.$inferSelect
export type NewSubject = typeof subjects.$inferInsert
export type Class = typeof classes.$inferSelect
export type NewClass = typeof classes.$inferInsert
export type SuperAdmin = typeof superAdmins.$inferSelect
export type NewSuperAdmin = typeof superAdmins.$inferInsert
