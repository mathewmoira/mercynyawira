import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  Headphones, 
  MessageSquareText, 
  Instagram, 
  Calendar, 
  Mail,
  ArrowRight,
  Star,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/blog';
import type { Project } from '../types/portfolio';

export default function HomePage() {
  const portraitImage = "https://imgur.com/2Vymb7p.jpg";
  const workspaceImage = "https://imgur.com/XIrZhKt.jpg";
  const whatsappLink = "https://wa.me/254705107544";
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchRecentContent() {
      try {
        const { data: posts } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (posts) setRecentPosts(posts);

        const { data: projects } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (projects) setFeaturedProjects(projects);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchRecentContent();
  }, []);

  return (
    <div className="min-h-screen bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gold mb-8">Welcome</h1>
        <p className="text-offwhite/80">Your homepage content here.</p>
      </div>
    </div>
  );
} 