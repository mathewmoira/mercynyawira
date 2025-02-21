import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Post } from '../../types/blog';

export default function BlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    content: '',
    featured_image: '',
  });

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          featured_image: data.featured_image,
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/admin/blog');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: formData.title,
          content: formData.content,
          featured_image: formData.featured_image,
        })
        .eq('id', id);

      if (error) throw error;
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/blog')}
          className="text-gold hover:text-gold-light inline-flex items-center gap-2 mb-8 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <h1 className="text-3xl font-bold text-gold mb-8">Edit Post</h1>

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
              className="w-full bg-primary border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
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
              className="w-full bg-primary border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gold mb-2">
              Content
            </label>
            <textarea
              id="content"
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-primary border border-gold/20 rounded-lg py-3 px-4 text-offwhite placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}