/*
  # Create projects table for portfolio

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `slug` (text, unique)
      - `featured_image` (text, optional)
      - `technologies` (text array)
      - `live_url` (text, optional)
      - `github_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for public read access
    - Add policies for authenticated users to manage projects
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  slug text UNIQUE NOT NULL,
  featured_image text,
  technologies text[] NOT NULL DEFAULT '{}',
  live_url text,
  github_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can view all projects
CREATE POLICY "Public can view all projects"
  ON projects
  FOR SELECT
  USING (true);

-- Authenticated users can manage all projects
CREATE POLICY "Authenticated users can manage all projects"
  ON projects
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();