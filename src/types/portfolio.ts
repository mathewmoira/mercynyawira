export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  featured_image?: string;
  live_url?: string;
  github_url?: string;
  technologies: string[];
  created_at: string;
}