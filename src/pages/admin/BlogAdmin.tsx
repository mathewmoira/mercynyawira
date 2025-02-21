import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Post } from '../../types/blog';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  async function deletePost(id: number) {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Manage Blog Posts</h1>
          <a
            href="/admin/blog/new"
            className="bg-gold-gradient text-black px-4 py-2 rounded-full hover:bg-gold-gradient-hover transition-all duration-300 inline-flex items-center gap-2 hover-lift"
          >
            <Plus className="w-4 h-4" />
            New Post
          </a>
        </div>

        <div className="bg-black rounded-lg shadow-lg border border-gold/20 overflow-hidden">
          <table className="min-w-full divide-y divide-gold/20">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/20">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gold/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-offwhite">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(post)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-gold/10 text-gold'
                          : 'bg-gold/5 text-gold/70'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gold/60">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-gold hover:text-gold-light transition-colors rounded-full hover:bg-gold/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </a>
                      <button
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete this post?')) {
                            await deletePost(post.id);
                          }
                        }}
                        className="p-2 text-gold hover:text-red-400 transition-colors rounded-full hover:bg-gold/10"
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
  );
}