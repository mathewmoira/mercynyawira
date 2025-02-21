/*
  # Create portfolio projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `slug` (text, unique)
      - `featured_image` (text, optional)
      - `technologies` (text array)
      - `live_url` (text, optional)
      - `github_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public to view projects
    - Add policy for authenticated users to manage projects
*/

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

-- Update trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();