import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { slugify } from '../../utils/helpers';

export default function BlogNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    featured_image: '',
    slug: '',
    published: false
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/blog')}
          className="text-gold hover:text-gold-light inline-flex items-center gap-2 mb-8 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <h1 className="text-3xl font-bold text-gold mb-8">Create New Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gold mb-2">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="enter-post-slug"
            />
          </div>

          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium text-gold mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gold mb-2">
              Content
            </label>
            <textarea
              id="content"
              required
              rows={10}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
              className="h-4 w-4 rounded border-gold/20 text-gold focus:ring-gold/50"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gold">
              Publish immediately
            </label>
          </div>

          <button
            type="submit"
            className="bg-gold-gradient text-black px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition-all duration-300 hover-lift"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}