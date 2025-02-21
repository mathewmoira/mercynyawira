import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../types/portfolio';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
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
          <h1 className="text-3xl font-bold text-gold">Manage Portfolio</h1>
          <button
            onClick={() => navigate('/admin/portfolio/new')}
            className="bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
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
                    Technologies
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
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-primary/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-offwhite">
                        {project.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs font-medium bg-gold/10 text-gold rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-offwhite/60">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/portfolio/edit/${project.id}`)}
                          className="text-gold hover:text-gold-light transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this project?')) {
                              deleteProject(project.id);
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