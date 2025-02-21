import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, User, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }]);

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gold/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-gold/20 rounded-full blur-[150px] opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gold mb-4 animate-fade-in-up">Contact Me</h1>
        <p className="text-gold/60 mb-8 animate-fade-in-up animate-delay-200">Let's discuss how I can help you achieve your goals.</p>
        
        <div className="bg-black rounded-lg p-8 shadow-lg border border-gold/20 animate-fade-in-up animate-delay-300">
          {success ? (
            <div className="text-center py-8">
              <div className="text-gold mb-4">
                <Send className="w-12 h-12 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gold mb-4">Message Sent Successfully!</h2>
              <p className="text-gold/60 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg hover:shadow-gold/20 hover:shadow-xl hover-lift"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gold mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full bg-black border border-gold/20 rounded-lg py-3 px-10 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="John"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gold mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full bg-black border border-gold/20 rounded-lg py-3 px-10 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gold mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black border border-gold/20 rounded-lg py-3 px-10 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gold mb-2">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/40" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-black border border-gold/20 rounded-lg py-3 px-10 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="How can I help you?"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient text-primary px-6 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg hover:shadow-gold/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}