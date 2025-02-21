import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Post } from '../../types/blog';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublished(post: Post) {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  async function deletePost(id: string) {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Manage Blog Posts</h1>
          <button
            onClick={() => navigate('/admin/blog/new')}
            className="bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        <div className="bg-primary-light rounded-lg shadow-lg border border-gold/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gold/20">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider bg-primary/50">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider bg-primary/50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider bg-primary/50">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gold uppercase tracking-wider bg-primary/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-primary/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-offwhite">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublished(post)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.published
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-yellow-900/20 text-yellow-400'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-offwhite/60">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                          className="text-gold hover:text-gold-light transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this post?')) {
                              deletePost(post.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}