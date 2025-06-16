-- Seed data for testing the school management system

-- Insert academic year
INSERT INTO academic_years (school_id, name, start_date, end_date, is_current) VALUES
(1, '2024-2025', '2024-01-15', '2024-11-30', TRUE);

-- Insert classes
INSERT INTO classes (school_id, name, level, capacity, academic_year_id) VALUES
(1, 'Grade 1A', 1, 30, 1),
(1, 'Grade 1B', 1, 30, 1),
(1, 'Grade 2A', 2, 32, 1),
(1, 'Grade 3A', 3, 35, 1);

-- Insert subjects
INSERT INTO subjects (school_id, name, code) VALUES
(1, 'Mathematics', 'MATH'),
(1, 'English', 'ENG'),
(1, 'Science', 'SCI'),
(1, 'Social Studies', 'SS'),
(1, 'Kiswahili', 'KIS');

-- Insert sample teachers
INSERT INTO users (school_id, email, password_hash, first_name, last_name, role, phone) VALUES
(1, 'mary.teacher@greenfield.ac.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'Mary', 'Wanjiku', 'teacher', '+254701234567'),
(1, 'peter.teacher@greenfield.ac.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'Peter', 'Kimani', 'teacher', '+254702345678');

INSERT INTO teachers (school_id, user_id, employee_number, qualification, specialization, salary) VALUES
(1, 2, 'T001', 'Bachelor of Education', 'Mathematics', 45000.00),
(1, 3, 'T002', 'Bachelor of Education', 'English Literature', 42000.00);

-- Insert sample parents
INSERT INTO users (school_id, email, password_hash, first_name, last_name, role, phone) VALUES
(1, 'jane.parent@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'Jane', 'Muthoni', 'parent', '+254703456789'),
(1, 'david.parent@gmail.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'David', 'Ochieng', 'parent', '+254704567890');

-- Insert sample students
INSERT INTO users (school_id, email, password_hash, first_name, last_name, role) VALUES
(1, 'alice.student@greenfield.ac.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'Alice', 'Muthoni', 'student'),
(1, 'brian.student@greenfield.ac.ke', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'Brian', 'Ochieng', 'student');

INSERT INTO students (school_id, user_id, admission_number, class_id, date_of_birth, gender, parent_id) VALUES
(1, 6, 'GPS001/2024/001', 1, '2017-03-15', 'female', 4),
(1, 7, 'GPS001/2024/002', 1, '2017-07-22', 'male', 5);

-- Assign subjects to classes
INSERT INTO class_subjects (school_id, class_id, subject_id, teacher_id, academic_year_id) VALUES
(1, 1, 1, 1, 1), -- Grade 1A - Mathematics - Mary
(1, 1, 2, 2, 1), -- Grade 1A - English - Peter
(1, 1, 3, 1, 1), -- Grade 1A - Science - Mary
(1, 2, 1, 1, 1), -- Grade 1B - Mathematics - Mary
(1, 2, 2, 2, 1); -- Grade 1B - English - Peter

-- Create sample timetable
INSERT INTO timetable (school_id, class_subject_id, day_of_week, start_time, end_time, room) VALUES
(1, 1, 1, '08:00', '09:00', 'Room 1A'), -- Monday Math
(1, 2, 1, '09:00', '10:00', 'Room 1A'), -- Monday English
(1, 3, 1, '10:30', '11:30', 'Room 1A'), -- Monday Science
(1, 1, 2, '08:00', '09:00', 'Room 1A'), -- Tuesday Math
(1, 2, 2, '09:00', '10:00', 'Room 1A'); -- Tuesday English

-- Create fee structure
INSERT INTO fee_structures (school_id, class_id, fee_type, amount, academic_year_id, due_date) VALUES
(1, 1, 'Tuition Fee', 15000.00, 1, '2024-02-15'),
(1, 1, 'Activity Fee', 2000.00, 1, '2024-02-15'),
(1, 2, 'Tuition Fee', 15000.00, 1, '2024-02-15'),
(1, 2, 'Activity Fee', 2000.00, 1, '2024-02-15');

-- Assign fees to students
INSERT INTO student_fees (school_id, student_id, fee_structure_id, amount_due, due_date) VALUES
(1, 1, 1, 15000.00, '2024-02-15'),
(1, 1, 2, 2000.00, '2024-02-15'),
(1, 2, 3, 15000.00, '2024-02-15'),
(1, 2, 4, 2000.00, '2024-02-15');

-- Sample attendance records
INSERT INTO attendance (school_id, student_id, class_subject_id, date, status, marked_by) VALUES
(1, 1, 1, '2024-01-15', 'present', 2),
(1, 1, 2, '2024-01-15', 'present', 3),
(1, 2, 1, '2024-01-15', 'absent', 2),
(1, 2, 2, '2024-01-15', 'present', 3);

-- Sample grades
INSERT INTO grades (school_id, student_id, class_subject_id, exam_type, marks, max_marks, grade, exam_date, entered_by) VALUES
(1, 1, 1, 'assignment', 85.00, 100.00, 'A', '2024-01-20', 2),
(1, 1, 2, 'quiz', 78.00, 100.00, 'B+', '2024-01-22', 3),
(1, 2, 1, 'assignment', 72.00, 100.00, 'B', '2024-01-20', 2),
(1, 2, 2, 'quiz', 88.00, 100.00, 'A-', '2024-01-22', 3);

-- Sample notice
INSERT INTO notices (school_id, title, content, target_audience, priority, published_by, published_at, status) VALUES
(1, 'Parent-Teacher Meeting', 'Dear parents, we will be holding a parent-teacher meeting on February 10th, 2024 at 2:00 PM. Please confirm your attendance.', 'parents', 'high', 1, CURRENT_TIMESTAMP, 'published');

-- Sample payment
INSERT INTO payments (school_id, student_fee_id, amount, payment_method, transaction_id, received_by) VALUES
(1, 1, 10000.00, 'mpesa', 'MPX123456789', 1);

-- Update student fee balance after payment
UPDATE student_fees SET amount_paid = 10000.00 WHERE id = 1;
