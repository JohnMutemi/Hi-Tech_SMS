-- Migration 001: Create core tables (schools, school_profiles)
-- Created: 2024-01-01

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  logo_filename VARCHAR(255),
  color_theme VARCHAR(7) NOT NULL DEFAULT '#3B82F6',
  portal_url VARCHAR(500) NOT NULL,
  description TEXT,
  admin_email VARCHAR(255) NOT NULL,
  admin_password VARCHAR(255) NOT NULL,
  admin_first_name VARCHAR(100) NOT NULL,
  admin_last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'setup' CHECK (status IN ('active', 'setup', 'suspended'))
);

-- Create school_profiles table
CREATE TABLE IF NOT EXISTS school_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  principal_name VARCHAR(255),
  established_year VARCHAR(4),
  email VARCHAR(255),
  motto TEXT,
  school_type VARCHAR(20) DEFAULT 'primary' CHECK (school_type IN ('primary', 'secondary', 'mixed', 'college')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for core tables
CREATE INDEX IF NOT EXISTS idx_schools_school_code ON schools(school_code);
CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);
CREATE INDEX IF NOT EXISTS idx_school_profiles_school_id ON school_profiles(school_id);

-- Insert success message
SELECT 'Core tables (schools, school_profiles) created successfully' as migration_status;
