-- Database Verification Script
-- Run this after the fresh setup to verify everything is working

-- Check if all tables exist
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN (
        'super_admins', 'schools', 'school_profiles', 
        'teachers', 'students', 'subjects', 'classes',
        'subject_classes', 'teacher_subjects', 'teacher_classes'
    )
ORDER BY table_name;

-- Check if all custom types exist
SELECT 
    typname as type_name,
    typtype as type_type
FROM pg_type 
WHERE typname IN ('status', 'school_type', 'gender', 'teacher_status', 'student_status', 'role')
ORDER BY typname;

-- Check super admin accounts
SELECT 
    email,
    first_name,
    last_name,
    role,
    is_active,
    created_at
FROM super_admins
ORDER BY created_at;

-- Check sample school
SELECT 
    school_code,
    name,
    admin_email,
    admin_first_name,
    admin_last_name,
    status,
    created_at
FROM schools
ORDER BY created_at;

-- Check foreign key constraints
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- Check indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
    AND tablename IN (
        'super_admins', 'schools', 'school_profiles', 
        'teachers', 'students', 'subjects', 'classes'
    )
ORDER BY tablename, indexname;

-- Test super admin login credentials
SELECT 
    'Login Test Results:' as test_info;

SELECT 
    email,
    CASE 
        WHEN password = 'admin123' THEN '✅ Password Correct'
        ELSE '❌ Password Incorrect'
    END as password_check,
    CASE 
        WHEN is_active = true THEN '✅ Account Active'
        ELSE '❌ Account Inactive'
    END as status_check
FROM super_admins
ORDER BY email;

-- Summary
SELECT 'DATABASE SETUP VERIFICATION COMPLETE' as summary;
