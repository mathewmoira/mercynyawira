export interface Project {
  id: number;
  title: string;
  description: string;
  featured_image?: string;
  live_url?: string;
  technologies: string[];
  created_at: string;
}