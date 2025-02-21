import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Input, TextArea } from '../../components/Input';

interface FormData {
  title: string;
  description: string;
  featured_image: string;
  live_url: string;
  github_url: string;
  technologies: string[];
}

export default function PortfolioNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    featured_image: '',
    live_url: '',
    github_url: '',
    technologies: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('projects')
        .insert([{
          ...formData,
          created_at: new Date().toISOString(),
        }]);

      if (submitError) throw submitError;
      navigate('/admin/portfolio');
    } catch (err) {
      console.error('Error creating project:', err);
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTechnologiesChange = (value: string) => {
    // Split by commas and trim whitespace
    const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
    setFormData(prev => ({ ...prev, technologies: techArray }));
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/portfolio')}
          className="text-gold hover:text-gold-light inline-flex items-center gap-2 mb-8 hover-lift"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </button>

        <h1 className="text-3xl font-bold text-gold mb-8">Add New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gold mb-2">
              Title
            </label>
            <Input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gold mb-2">
              Description
            </label>
            <TextArea
              id="description"
              required
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium text-gold mb-2">
              Featured Image URL
            </label>
            <Input
              type="url"
              id="featured_image"
              value={formData.featured_image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="live_url" className="block text-sm font-medium text-gold mb-2">
              Live URL
            </label>
            <Input
              type="url"
              id="live_url"
              value={formData.live_url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="github_url" className="block text-sm font-medium text-gold mb-2">
              GitHub URL
            </label>
            <Input
              type="url"
              id="github_url"
              value={formData.github_url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gold mb-2">
              Technologies (comma-separated)
            </label>
            <Input
              type="text"
              id="technologies"
              value={formData.technologies.join(', ')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTechnologiesChange(e.target.value)}
              placeholder="React, TypeScript, Tailwind CSS"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg hover:shadow-gold/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
} 