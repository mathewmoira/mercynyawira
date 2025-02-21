import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import type { Project } from '../types/portfolio';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import AnimateIn, { AnimateInStagger } from '../components/AnimateIn';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchProjects();
  }, []);

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
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimateIn type="fade-in" delay={200}>
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        </AnimateIn>
        <AnimateIn type="fade-in" delay={400}>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold/20 rounded-full blur-[150px] opacity-30 animate-pulse delay-1000"></div>
        </AnimateIn>
      </div>

      {/* Grid background */}
      <AnimateIn type="fade-in" delay={100}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
      </AnimateIn>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn type="slide-in-up">
          <h1 className="text-4xl font-bold text-gold mb-8">Portfolio</h1>
        </AnimateIn>
        
        <AnimateInStagger type="scale-in" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article 
              key={project.id} 
              className="bg-black rounded-lg shadow-md overflow-hidden border border-gold/20 hover-scale"
            >
              {project.featured_image && (
                <img
                  src={project.featured_image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gold mb-2">
                  {project.title}
                </h2>
                <div className="text-sm text-gold/60 mb-4">
                  {format(new Date(project.created_at), 'MMMM d, yyyy')}
                </div>
                <p className="text-gold/80 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-gold/10 text-gold rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-2 hover-lift"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-2 hover-lift"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </AnimateInStagger>
      </div>
    </div>
  );
}