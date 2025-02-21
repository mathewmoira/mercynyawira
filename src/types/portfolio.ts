export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  featured_image?: string;
  technologies: string[];
  live_url?: string;
  github_url?: string;
  created_at: string;
  updated_at: string;
}