import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { FileText, Users, Briefcase, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold">Admin Dashboard</h1>
          <p className="text-offwhite/60 mt-2">Welcome back, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management Card */}
          <Link 
            to="/admin/blog"
            className="bg-primary-light p-6 rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 group hover-scale"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <h2 className="text-xl font-semibold text-gold">Blog Posts</h2>
            </div>
            <p className="text-offwhite/60">Manage your blog posts, create new content, and organize categories.</p>
          </Link>

          {/* Portfolio Management Card */}
          <Link 
            to="/admin/portfolio"
            className="bg-primary-light p-6 rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 group hover-scale"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                <Briefcase className="w-6 h-6 text-gold" />
              </div>
              <h2 className="text-xl font-semibold text-gold">Portfolio</h2>
            </div>
            <p className="text-offwhite/60">Update your portfolio projects and showcase your work.</p>
          </Link>

          {/* Contact Management Card */}
          <Link 
            to="/admin/contacts"
            className="bg-primary-light p-6 rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 group hover-scale"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                <Users className="w-6 h-6 text-gold" />
              </div>
              <h2 className="text-xl font-semibold text-gold">Contacts</h2>
            </div>
            <p className="text-offwhite/60">View and manage contact form submissions.</p>
          </Link>

          {/* Settings Card */}
          <Link 
            to="/admin/settings"
            className="bg-primary-light p-6 rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300 group hover-scale"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gold/10 rounded-lg group-hover:bg-gold/20 transition-colors">
                <Settings className="w-6 h-6 text-gold" />
              </div>
              <h2 className="text-xl font-semibold text-gold">Settings</h2>
            </div>
            <p className="text-offwhite/60">Manage your account settings and preferences.</p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-primary-light rounded-lg border border-gold/20 p-6">
          <h2 className="text-xl font-semibold text-gold mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary rounded-lg p-4 border border-gold/10">
              <div className="text-2xl font-bold text-gold mb-1">0</div>
              <div className="text-offwhite/60 text-sm">Published Posts</div>
            </div>
            <div className="bg-primary rounded-lg p-4 border border-gold/10">
              <div className="text-2xl font-bold text-gold mb-1">0</div>
              <div className="text-offwhite/60 text-sm">Portfolio Projects</div>
            </div>
            <div className="bg-primary rounded-lg p-4 border border-gold/10">
              <div className="text-2xl font-bold text-gold mb-1">0</div>
              <div className="text-offwhite/60 text-sm">New Messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}