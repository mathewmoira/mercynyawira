export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  featured_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface PostCategory {
  post_id: string;
  category_id: string;
}