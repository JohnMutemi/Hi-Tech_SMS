-- School Management System Seed Data
-- Run this after the schema to populate initial data

-- Insert sample schools
INSERT INTO schools (name, code, type, address, phone, email, website, description, student_count, teacher_count, status) VALUES
('Greenfield Primary School', 'GPS001', 'Primary School', '123 Education Lane, Nairobi, Kenya', '+254 712 345 678', 'info@greenfield.ac.ke', 'https://greenfield.ac.ke', 'A leading primary school in Nairobi focusing on holistic education', 1234, 89, 'active'),
('Sunrise Secondary School', 'SSS002', 'Secondary School', '456 Learning Avenue, Mombasa, Kenya', '+254 723 456 789', 'admin@sunrise.ac.ke', 'https://sunrise.ac.ke', 'Excellence in secondary education with modern facilities', 856, 67, 'active'),
('Tech Valley College', 'TVC003', 'College', '789 Innovation Street, Kisumu, Kenya', '+254 734 567 890', 'info@techvalley.ac.ke', 'https://techvalley.ac.ke', 'Technical college specializing in IT and engineering', 445, 34, 'active');

-- Insert school administrators
INSERT INTO users (email, password_hash, first_name, last_name, role, school_id, phone, status) VALUES
('admin@greenfield.ac.ke', '$2b$10$example_hash_1', 'John', 'Doe', 'admin', 1, '+254 712 345 678', 'active'),
('mary.admin@sunrise.ac.ke', '$2b$10$example_hash_2', 'Mary', 'Wanjiku', 'admin', 2, '+254 723 456 789', 'active'),
('admin@techvalley.ac.ke', '$2b$10$example_hash_3', 'Peter', 'Kimani', 'admin', 3, '+254 734 567 890', 'active');

-- Update schools with admin_id
UPDATE schools SET admin_id = 1 WHERE id = 1;
UPDATE schools SET admin_id = 2 WHERE id = 2;
UPDATE schools SET admin_id = 3 WHERE id = 3;

-- Insert sample teachers
INSERT INTO users (email, password_hash, first_name, last_name, role, school_id, phone, status) VALUES
('mary.teacher@greenfield.ac.ke', '$2b$10$example_hash_4', 'Mary', 'Wanjiku', 'teacher', 1, '+254 701 234 567', 'active'),
('james.math@sunrise.ac.ke', '$2b$10$example_hash_5', 'James', 'Ochieng', 'teacher', 2, '+254 702 345 678', 'active'),
('sarah.science@techvalley.ac.ke', '$2b$10$example_hash_6', 'Sarah', 'Mutua', 'teacher', 3, '+254 703 456 789', 'active');

-- Insert teacher profiles
INSERT INTO user_profiles (user_id, employee_number, subjects, qualification) VALUES
(4, 'T001', ARRAY['Mathematics', 'Science'], 'Bachelor of Education (Mathematics)'),
(5, 'T002', ARRAY['Mathematics', 'Physics'], 'Master of Science (Mathematics)'),
(6, 'T003', ARRAY['Computer Science', 'Programming'], 'Bachelor of Computer Science');

-- Insert sample students
INSERT INTO users (email, password_hash, first_name, last_name, role, school_id, phone, status) VALUES
('alice.student@greenfield.ac.ke', '$2b$10$example_hash_7', 'Alice', 'Muthoni', 'student', 1, '+254 702 345 678', 'active'),
('bob.student@sunrise.ac.ke', '$2b$10$example_hash_8', 'Bob', 'Kiprotich', 'student', 2, '+254 703 456 789', 'active'),
('carol.student@techvalley.ac.ke', '$2b$10$example_hash_9', 'Carol', 'Akinyi', 'student', 3, '+254 704 567 890', 'active');

-- Insert student profiles
INSERT INTO user_profiles (user_id, admission_number, class, date_of_birth, parent_email) VALUES
(7, 'GPS001/2024/001', 'Grade 5A', '2017-03-15', 'jane.parent@gmail.com'),
(8, 'SSS002/2024/001', 'Form 2B', '2010-07-22', 'robert.parent@gmail.com'),
(9, 'TVC003/2024/001', 'Year 1 IT', '2006-11-08', 'grace.parent@gmail.com');

-- Insert sample parents
INSERT INTO users (email, password_hash, first_name, last_name, role, school_id, phone, status) VALUES
('jane.parent@gmail.com', '$2b$10$example_hash_10', 'Jane', 'Muthoni', 'parent', 1, '+254 703 456 789', 'active'),
('robert.parent@gmail.com', '$2b$10$example_hash_11', 'Robert', 'Kiprotich', 'parent', 2, '+254 704 567 890', 'active'),
('grace.parent@gmail.com', '$2b$10$example_hash_12', 'Grace', 'Akinyi', 'parent', 3, '+254 705 678 901', 'active');

-- Insert parent profiles
INSERT INTO user_profiles (user_id, occupation, address, emergency_contact) VALUES
(10, 'Business Owner', 'Nairobi, Kenya', '+254 704 567 890'),
(11, 'Engineer', 'Mombasa, Kenya', '+254 705 678 901'),
(12, 'Doctor', 'Kisumu, Kenya', '+254 706 789 012');

-- Insert sample classes
INSERT INTO classes (school_id, name, grade_level, section, teacher_id, student_count) VALUES
(1, 'Grade 5A', 'Grade 5', 'A', 4, 35),
(1, 'Grade 5B', 'Grade 5', 'B', 4, 32),
(2, 'Form 2A', 'Form 2', 'A', 5, 40),
(2, 'Form 2B', 'Form 2', 'B', 5, 38),
(3, 'Year 1 IT', 'Year 1', 'IT', 6, 25),
(3, 'Year 1 Engineering', 'Year 1', 'ENG', 6, 28);

-- Insert sample subjects
INSERT INTO subjects (school_id, name, code, description) VALUES
(1, 'Mathematics', 'MATH', 'Primary level mathematics'),
(1, 'English', 'ENG', 'English language and literature'),
(1, 'Science', 'SCI', 'General science for primary level'),
(1, 'Social Studies', 'SS', 'Social studies and geography'),
(2, 'Mathematics', 'MATH', 'Secondary level mathematics'),
(2, 'Physics', 'PHY', 'Physics for secondary students'),
(2, 'Chemistry', 'CHEM', 'Chemistry for secondary students'),
(2, 'Biology', 'BIO', 'Biology for secondary students'),
(2, 'English', 'ENG', 'English language and literature'),
(3, 'Computer Programming', 'PROG', 'Introduction to programming'),
(3, 'Database Systems', 'DB', 'Database design and management'),
(3, 'Web Development', 'WEB', 'HTML, CSS, JavaScript fundamentals'),
(3, 'Network Administration', 'NET', 'Computer networking basics');

-- Insert sample email logs
INSERT INTO email_logs (recipient_email, subject, email_type, status) VALUES
('admin@greenfield.ac.ke', 'Welcome to Greenfield Primary School - Your Admin Account is Ready', 'admin_welcome', 'delivered'),
('mary.admin@sunrise.ac.ke', 'Welcome to Sunrise Secondary School - Your Admin Account is Ready', 'admin_welcome', 'delivered'),
('mary.teacher@greenfield.ac.ke', 'Welcome to Greenfield Primary School - Your Teacher Account', 'user_welcome', 'delivered'),
('alice.student@greenfield.ac.ke', 'Welcome to Greenfield Primary School - Your Student Account', 'user_welcome', 'delivered'),
('jane.parent@gmail.com', 'Welcome to Greenfield Primary School - Your Parent Account', 'user_welcome', 'delivered');

-- Create some blog posts for the system
INSERT INTO users (email, password_hash, first_name, last_name, role, status) VALUES
('blogger@edumanage.co.ke', '$2b$10$example_hash_13', 'Content', 'Manager', 'super_admin', 'active')
ON CONFLICT (email) DO NOTHING;

COMMENT ON TABLE schools IS 'Sample schools with different types and locations';
COMMENT ON TABLE users IS 'Sample users including admins, teachers, students, and parents';
COMMENT ON TABLE user_profiles IS 'Extended profiles with role-specific information';
COMMENT ON TABLE classes IS 'Sample classes organized by school and grade level';
COMMENT ON TABLE subjects IS 'Subjects offered by each school';
COMMENT ON TABLE email_logs IS 'Sample email delivery logs';
