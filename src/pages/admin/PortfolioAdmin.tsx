import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Project } from '../../types/portfolio';

export default function PortfolioAdmin() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function createSampleProjects() {
    setCreating(true);
    setError('');
    
    try {
      const sampleProjects = [
        {
          title: "Customer Support Dashboard",
          slug: "customer-support-dashboard",
          description: "A comprehensive customer service management system designed to streamline support operations. Features include ticket tracking, response templates, and performance analytics.",
          featured_image: "https://imgur.com/jKDvXwE.jpg",
          live_url: "https://customer-dashboard.example.com",
          github_url: "https://github.com/example/customer-dashboard",
          technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
          created_at: new Date().toISOString()
        },
        {
          title: "Virtual Assistant Automation Suite",
          slug: "virtual-assistant-automation-suite",
          description: "An automated system for managing calendars, emails, and task scheduling. Integrated with popular productivity tools to enhance virtual assistance capabilities.",
          featured_image: "https://imgur.com/QwJK9ph.jpg",
          live_url: "https://va-suite.example.com",
          github_url: "https://github.com/example/va-suite",
          technologies: ["Python", "Django", "React", "Docker", "Redis"],
          created_at: new Date().toISOString()
        },
        {
          title: "Social Media Analytics Platform",
          slug: "social-media-analytics-platform",
          description: "A comprehensive social media management platform with analytics, scheduling, and engagement tracking features. Helps businesses grow their online presence effectively.",
          featured_image: "https://imgur.com/Hn7L4Zx.jpg",
          live_url: "https://social-analytics.example.com",
          github_url: "https://github.com/example/social-analytics",
          technologies: ["Vue.js", "Express.js", "MongoDB", "TensorFlow", "AWS"],
          created_at: new Date().toISOString()
        }
      ];

      // Insert projects one by one to better handle errors
      for (const project of sampleProjects) {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([project]);

        if (insertError) {
          console.error('Error inserting project:', insertError);
          throw new Error(`Failed to insert project "${project.title}": ${insertError.message}`);
        }
      }

      await fetchProjects();
    } catch (err) {
      console.error('Error creating sample projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to create sample projects.');
    } finally {
      setCreating(false);
    }
  }

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
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gold">Manage Portfolio</h1>
          <div className="flex gap-4">
            <button
              onClick={createSampleProjects}
              disabled={creating}
              className="bg-gold/20 text-gold px-4 py-2 rounded-full hover:bg-gold/30 transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Sample Projects
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/admin/portfolio/new')}
              className="bg-gold-gradient text-primary px-4 py-2 rounded-full hover:bg-gold-gradient-hover transition-all duration-300 inline-flex items-center gap-2 hover-lift"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-black rounded-lg shadow-lg border border-gold/20 overflow-hidden">
          <table className="min-w-full divide-y divide-gold/20">
            <thead className="bg-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gold uppercase tracking-wider">
                  Technologies
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
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gold/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-offwhite">
                    {project.title}
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
                  <td className="px-6 py-4 whitespace-nowrap text-offwhite/60">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => navigate(`/admin/portfolio/edit/${project.id}`)}
                        className="text-gold hover:text-gold-light transition-colors"
                        title="Edit Project"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-5 h-5" />
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