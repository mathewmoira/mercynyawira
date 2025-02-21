/*
  # Set up admin authentication

  1. Security
    - Enable email auth
    - Create admin user policy
    - Set up secure authentication

  Note: This migration adds the necessary authentication setup for admin users
*/

-- Enable email auth
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a secure policy for admin access
CREATE POLICY "Enable admin access for authenticated users only"
  ON auth.users
  FOR SELECT
  TO authenticated
  USING (
    role = 'admin'
  );

-- Insert admin user (you'll need to change the email and password through Supabase dashboard)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'admin',
  'admin@mercynyawira.co.ke',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;