-- Fresh Database Setup Script
-- This script will drop all existing tables and recreate them with proper structure
-- WARNING: This will delete all existing data!

-- Drop all tables in correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS teacher_classes CASCADE;
DROP TABLE IF EXISTS teacher_subjects CASCADE;
DROP TABLE IF EXISTS subject_classes CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS school_profiles CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS super_admins CASCADE;

-- Drop all custom types/enums
DROP TYPE IF EXISTS status CASCADE;
DROP TYPE IF EXISTS school_type CASCADE;
DROP TYPE IF EXISTS gender CASCADE;
DROP TYPE IF EXISTS teacher_status CASCADE;
DROP TYPE IF EXISTS student_status CASCADE;
DROP TYPE IF EXISTS role CASCADE;

-- Drop all functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create custom types/enums
CREATE TYPE status AS ENUM('active', 'setup', 'suspended');
CREATE TYPE school_type AS ENUM('primary', 'secondary', 'mixed', 'college');
CREATE TYPE gender AS ENUM('male', 'female');
CREATE TYPE teacher_status AS ENUM('active', 'inactive');
CREATE TYPE student_status AS ENUM('active', 'inactive', 'graduated');
CREATE TYPE role AS ENUM('super_admin', 'admin');

-- Create super_admins table
CREATE TABLE super_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role role DEFAULT 'super_admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schools table
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255),
    color_theme VARCHAR(7) DEFAULT '#3B82F6' NOT NULL,
    portal_url VARCHAR(500) NOT NULL,
    description TEXT,
    admin_email VARCHAR(255) NOT NULL,
    admin_password VARCHAR(255) NOT NULL,
    admin_first_name VARCHAR(100) NOT NULL,
    admin_last_name VARCHAR(100) NOT NULL,
    created_by UUID REFERENCES super_admins(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status status DEFAULT 'setup'
);

-- Create school_profiles table
CREATE TABLE school_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE UNIQUE NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    website VARCHAR(255),
    principal_name VARCHAR(255),
    established_year VARCHAR(4),
    email VARCHAR(255),
    motto TEXT,
    school_type school_type DEFAULT 'primary',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    employee_id VARCHAR(50),
    qualification VARCHAR(255),
    date_joined DATE,
    status teacher_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(20) NOT NULL,
    parent_email VARCHAR(255),
    admission_number VARCHAR(50),
    class VARCHAR(100),
    date_of_birth DATE,
    gender gender,
    address TEXT,
    date_admitted DATE,
    status student_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subjects table
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL,
    description TEXT,
    teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create classes table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(100) NOT NULL,
    capacity INTEGER DEFAULT 30,
    current_students INTEGER DEFAULT 0,
    class_teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction tables
CREATE TABLE subject_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(subject_id, class_id)
);

CREATE TABLE teacher_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(teacher_id, subject_id)
);

CREATE TABLE teacher_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(teacher_id, class_id)
);

-- Create indexes for better performance
CREATE INDEX idx_super_admins_email ON super_admins(email);
CREATE INDEX idx_super_admins_is_active ON super_admins(is_active);
CREATE INDEX idx_schools_school_code ON schools(school_code);
CREATE INDEX idx_schools_status ON schools(status);
CREATE INDEX idx_schools_created_by ON schools(created_by);
CREATE INDEX idx_school_profiles_school_id ON school_profiles(school_id);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_teachers_email ON teachers(email);
CREATE INDEX idx_teachers_employee_id ON teachers(employee_id);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_admission_number ON students(admission_number);
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_subjects_school_id ON subjects(school_id);
CREATE INDEX idx_subjects_teacher_id ON subjects(teacher_id);
CREATE INDEX idx_classes_school_id ON classes(school_id);
CREATE INDEX idx_classes_class_teacher_id ON classes(class_teacher_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_super_admins_updated_at 
    BEFORE UPDATE ON super_admins 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at 
    BEFORE UPDATE ON schools 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_school_profiles_updated_at 
    BEFORE UPDATE ON school_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at 
    BEFORE UPDATE ON teachers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at 
    BEFORE UPDATE ON students 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at 
    BEFORE UPDATE ON subjects 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at 
    BEFORE UPDATE ON classes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default super admin users
INSERT INTO super_admins (email, password, first_name, last_name, role, is_active) VALUES
('admin@hitechsms.co.ke', 'admin123', 'Super', 'Admin', 'super_admin', true),
('superadmin@schoolms.com', 'superadmin123', 'System', 'Administrator', 'super_admin', true),
('admin@schoolms.com', 'admin123', 'Default', 'Admin', 'super_admin', true);

-- Insert sample school for testing (optional)
INSERT INTO schools (
    school_code, 
    name, 
    color_theme, 
    portal_url, 
    description,
    admin_email, 
    admin_password, 
    admin_first_name, 
    admin_last_name, 
    status
) VALUES (
    'DEMO2024',
    'Demo High School',
    '#3B82F6',
    'http://localhost:3000/schools/demo2024',
    'A demo school for testing the platform',
    'admin@demoschool.edu',
    'demo123',
    'Demo',
    'Administrator',
    'setup'
);

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
SELECT 'Super Admin Accounts Created:' as info;
SELECT email, first_name, last_name, role, is_active 
FROM super_admins 
ORDER BY created_at;

SELECT 'Sample School Created:' as info;
SELECT school_code, name, admin_email, status 
FROM schools 
ORDER BY created_at;

-- Display table counts
SELECT 
    'super_admins' as table_name, 
    COUNT(*) as record_count 
FROM super_admins
UNION ALL
SELECT 
    'schools' as table_name, 
    COUNT(*) as record_count 
FROM schools
UNION ALL
SELECT 
    'school_profiles' as table_name, 
    COUNT(*) as record_count 
FROM school_profiles
UNION ALL
SELECT 
    'teachers' as table_name, 
    COUNT(*) as record_count 
FROM teachers
UNION ALL
SELECT 
    'students' as table_name, 
    COUNT(*) as record_count 
FROM students
UNION ALL
SELECT 
    'subjects' as table_name, 
    COUNT(*) as record_count 
FROM subjects
UNION ALL
SELECT 
    'classes' as table_name, 
    COUNT(*) as record_count 
FROM classes;
