-- Drizzle Migration: Create all tables with proper enums and constraints

-- Create enums
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('active', 'setup', 'suspended');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "school_type" AS ENUM('primary', 'secondary', 'mixed', 'college');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "teacher_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "student_status" AS ENUM('active', 'inactive', 'graduated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('super_admin', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Create super_admins table
CREATE TABLE IF NOT EXISTS "super_admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"role" "role" DEFAULT 'super_admin',
	"is_active" boolean DEFAULT true,
	"last_login" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "super_admins_email_unique" UNIQUE("email")
);

-- Create schools table
CREATE TABLE IF NOT EXISTS "schools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_code" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"logo_filename" varchar(255),
	"color_theme" varchar(7) DEFAULT '#3B82F6' NOT NULL,
	"portal_url" varchar(500) NOT NULL,
	"description" text,
	"admin_email" varchar(255) NOT NULL,
	"admin_password" varchar(255) NOT NULL,
	"admin_first_name" varchar(100) NOT NULL,
	"admin_last_name" varchar(100) NOT NULL,
	"created_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"status" "status" DEFAULT 'setup',
	CONSTRAINT "schools_school_code_unique" UNIQUE("school_code")
);

-- Create school_profiles table
CREATE TABLE IF NOT EXISTS "school_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"address" text,
	"phone" varchar(20),
	"website" varchar(255),
	"principal_name" varchar(255),
	"established_year" varchar(4),
	"email" varchar(255),
	"motto" text,
	"school_type" "school_type" DEFAULT 'primary',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "school_profiles_school_id_unique" UNIQUE("school_id")
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS "teachers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"employee_id" varchar(50),
	"qualification" varchar(255),
	"date_joined" timestamp,
	"status" "teacher_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"parent_name" varchar(255) NOT NULL,
	"parent_phone" varchar(20) NOT NULL,
	"parent_email" varchar(255),
	"admission_number" varchar(50),
	"class" varchar(100),
	"date_of_birth" timestamp,
	"gender" "gender",
	"address" text,
	"date_admitted" timestamp,
	"status" "student_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(20) NOT NULL,
	"description" text,
	"teacher_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS "classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"level" varchar(100) NOT NULL,
	"capacity" integer DEFAULT 30,
	"current_students" integer DEFAULT 0,
	"class_teacher_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS "subject_classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subject_id" uuid NOT NULL,
	"class_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "teacher_subjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" uuid NOT NULL,
	"subject_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "teacher_classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" uuid NOT NULL,
	"class_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);

-- Add foreign key constraints
DO $$ BEGIN
 ALTER TABLE "schools" ADD CONSTRAINT "schools_created_by_super_admins_id_fk" FOREIGN KEY ("created_by") REFERENCES "super_admins"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "school_profiles" ADD CONSTRAINT "school_profiles_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "teachers" ADD CONSTRAINT "teachers_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "subjects" ADD CONSTRAINT "subjects_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "subjects" ADD CONSTRAINT "subjects_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "classes" ADD CONSTRAINT "classes_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "schools"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "classes" ADD CONSTRAINT "classes_class_teacher_id_teachers_id_fk" FOREIGN KEY ("class_teacher_id") REFERENCES "teachers"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "subject_classes" ADD CONSTRAINT "subject_classes_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "subject_classes" ADD CONSTRAINT "subject_classes_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "teacher_subjects" ADD CONSTRAINT "teacher_subjects_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "teacher_subjects" ADD CONSTRAINT "teacher_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "teacher_classes" ADD CONSTRAINT "teacher_classes_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "teacher_classes" ADD CONSTRAINT "teacher_classes_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_super_admins_email" ON "super_admins" ("email");
CREATE INDEX IF NOT EXISTS "idx_super_admins_is_active" ON "super_admins" ("is_active");
CREATE INDEX IF NOT EXISTS "idx_schools_school_code" ON "schools" ("school_code");
CREATE INDEX IF NOT EXISTS "idx_schools_status" ON "schools" ("status");
CREATE INDEX IF NOT EXISTS "idx_schools_created_by" ON "schools" ("created_by");
CREATE INDEX IF NOT EXISTS "idx_school_profiles_school_id" ON "school_profiles" ("school_id");
CREATE INDEX IF NOT EXISTS "idx_teachers_school_id" ON "teachers" ("school_id");
CREATE INDEX IF NOT EXISTS "idx_students_school_id" ON "students" ("school_id");
CREATE INDEX IF NOT EXISTS "idx_subjects_school_id" ON "subjects" ("school_id");
CREATE INDEX IF NOT EXISTS "idx_classes_school_id" ON "classes" ("school_id");
CREATE INDEX IF NOT EXISTS "idx_students_admission_number" ON "students" ("admission_number");
CREATE INDEX IF NOT EXISTS "idx_teachers_employee_id" ON "teachers" ("employee_id");

-- Insert default super admin
INSERT INTO "super_admins" ("email", "password", "first_name", "last_name", "role") 
VALUES ('admin@schoolms.com', 'admin123', 'Super', 'Admin', 'super_admin')
ON CONFLICT ("email") DO NOTHING;

-- Success message
SELECT 'Drizzle migration completed successfully! Default super admin: admin@schoolms.com / admin123' as migration_status;
