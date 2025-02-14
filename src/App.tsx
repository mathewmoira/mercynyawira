import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Headphones, 
  MessageSquareText, 
  Instagram, 
  Calendar, 
  Mail,
  ArrowRight,
  Star,
  Users,
  Clock,
  CheckCircle,
  BookOpen
} from 'lucide-react';
import Blog from './pages/Blog';

function HomePage() {
  const portraitImage = "https://i.imgur.com/Qn6PSSa.png"; // Updated professional portrait
  const workspaceImage = "https://i.imgur.com/XIrZhKt.jpg"; // New workspace image

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col justify-center h-full text-center">
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto">
                <img 
                  src={portraitImage}
                  alt="Mercy Nyawira" 
                  className="w-full h-full rounded-full object-cover border-4 border-gold"
                  style={{
                    objectPosition: '50% 25%', // Fine-tuned to center the face
                    objectFit: 'cover',
                  }}
                />
                <div className="absolute inset-0 rounded-full shadow-lg"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-offwhite mb-6">
              Mercy Nyawira
            </h1>
            <p className="text-xl md:text-2xl text-gold mb-8">
              Customer Service Expert | Virtual Assistant | Social Media Manager
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gold-gradient text-primary px-8 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg">
                Hire Me
              </button>
              <button className="border-2 border-gold text-gold px-8 py-3 rounded-full font-semibold hover:bg-gold/10 transition duration-300">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gold">My Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20">
              <Headphones className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gold">Customer Service Excellence</h3>
              <p className="text-offwhite/80">Providing exceptional customer support with empathy and efficiency.</p>
            </div>
            <div className="bg-primary p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20">
              <MessageSquareText className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gold">Virtual Assistance</h3>
              <p className="text-offwhite/80">Comprehensive administrative support to streamline your business operations.</p>
            </div>
            <div className="bg-primary p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20">
              <Instagram className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-gold">Social Media Management</h3>
              <p className="text-offwhite/80">Strategic content creation and community engagement for brand growth.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gold-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-primary">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary/80">Happy Clients</div>
            </div>
            <div className="text-primary">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary/80">Satisfaction Rate</div>
            </div>
            <div className="text-primary">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary/80">Projects Completed</div>
            </div>
            <div className="text-primary">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary/80">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gold">Why Choose Me?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Quick Response Time</h3>
                    <p className="text-offwhite/80">Always available and responsive to urgent requests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Professional Communication</h3>
                    <p className="text-offwhite/80">Clear and effective communication with all stakeholders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Star className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Quality Guaranteed</h3>
                    <p className="text-offwhite/80">Committed to delivering exceptional results every time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <img 
                src={workspaceImage}
                alt="Professional workspace"
                className="w-full h-[500px] rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
              />
              <div className="absolute inset-0 bg-gold/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto">
              <img 
                src={portraitImage}
                alt="Mercy Nyawira"
                className="w-full h-full rounded-full object-cover border-4 border-gold"
                style={{
                  objectPosition: '50% 25%', // Fine-tuned to center the face
                  objectFit: 'cover',
                }}
              />
              <div className="absolute inset-0 rounded-full shadow-lg"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gold mb-8">Ready to Get Started?</h2>
          <p className="text-offwhite/80 mb-8 max-w-2xl mx-auto">
            Let's work together to take your business to the next level with professional customer service, 
            virtual assistance, and social media management.
          </p>
          <button className="bg-gold-gradient text-primary px-8 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg inline-flex items-center gap-2">
            Contact Me <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="relative">
      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage ? 'bg-primary/80 backdrop-blur-sm' : 'bg-primary border-b border-gold/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-bold text-xl text-gold">
              MN
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                to="/blog" 
                className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </Link>
              <a 
                href="#portfolio" 
                className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition"
              >
                <Star className="w-4 h-4" />
                Portfolio
              </a>
              <a 
                href="#contact" 
                className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;