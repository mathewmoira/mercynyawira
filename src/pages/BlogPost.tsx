import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/blog';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            categories (
              id,
              name,
              slug
            )
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="text-gold hover:text-gold-light inline-flex items-center gap-2 mb-8 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 animate-fade-in-up"
          />
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-gold mb-4 animate-fade-in-up">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-offwhite/60 mb-8 animate-fade-in-up animate-delay-200">
          <time dateTime={post.created_at}>
            {format(new Date(post.created_at), 'MMMM d, yyyy')}
          </time>
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2">
              {post.categories.map((category) => (
                <span
                  key={category.id}
                  className="px-2 py-1 bg-gold/10 text-gold rounded-full text-xs"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div 
          className="prose prose-invert prose-gold max-w-none animate-fade-in-up animate-delay-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}