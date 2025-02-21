import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogAdmin from './pages/admin/BlogAdmin';
import PortfolioAdmin from './pages/admin/PortfolioAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';
import Login from './pages/Login';
import { RequireAuth, useAuth } from './lib/auth';
import { supabase } from './lib/supabase';
import type { Post } from './types/blog';
import type { Project } from './types/portfolio';

function HomePage() {
  const portraitImage = "https://imgur.com/2Vymb7p.jpg";
  const workspaceImage = "https://imgur.com/XIrZhKt.jpg";
  const logoImage = "https://imgur.com/uCUE8K1.jpg";
  const whatsappLink = "https://wa.me/254705107544";
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchRecentContent() {
      try {
        // Fetch recent blog posts
        const { data: posts } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (posts) setRecentPosts(posts);

        // Fetch featured projects
        const { data: projects } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (projects) setFeaturedProjects(projects);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }

    fetchRecentContent();
  }, []);

  return (
    <>
      {/* Hero Section with Grid Background and Blur */}
      <div className="relative min-h-screen bg-primary overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Radial Gradient for Deep Gold Blur */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] opacity-50"></div>
        </div>

        {/* Content Container */}
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-8 relative animate-fade-in-up">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto animate-float">
                  {/* Glow effect behind the image */}
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-[30px] transform scale-110"></div>
                  <img 
                    src={portraitImage}
                    alt="Mercy Nyawira" 
                    className="relative w-full h-full rounded-full object-cover border-4 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    style={{
                      objectPosition: '50% 25%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-offwhite mb-4 md:mb-6 relative animate-fade-in-up animate-delay-200">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-deep via-gold to-gold-light">
                  Mercy Nyawira
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gold mb-6 md:mb-8 px-4 animate-fade-in-up animate-delay-300">
                Customer Service Expert | Virtual Assistant | Social Media Manager
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 px-4 animate-fade-in-up animate-delay-400">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-gradient text-primary px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg w-full md:w-auto hover:shadow-gold/20 hover:shadow-xl hover-lift"
                >
                  Hire Me
                </a>
                <button className="border-2 border-gold text-gold px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gold/10 transition duration-300 w-full md:w-auto hover:shadow-lg hover:shadow-gold/10 hover-lift">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 md:py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-gold animate-fade-in-up">My Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-primary p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20 animate-fade-in-left animate-delay-200 hover-scale">
              <Headphones className="w-10 md:w-12 h-10 md:h-12 text-gold mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-gold">Customer Service Excellence</h3>
              <p className="text-offwhite/80 text-sm md:text-base">Providing exceptional customer support with empathy and efficiency.</p>
            </div>
            <div className="bg-primary p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20 animate-fade-in-up animate-delay-300 hover-scale">
              <MessageSquareText className="w-10 md:w-12 h-10 md:h-12 text-gold mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-gold">Virtual Assistance</h3>
              <p className="text-offwhite/80 text-sm md:text-base">Comprehensive administrative support to streamline your business operations.</p>
            </div>
            <div className="bg-primary p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gold/20 animate-fade-in-right animate-delay-400 hover-scale">
              <Instagram className="w-10 md:w-12 h-10 md:h-12 text-gold mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-gold">Social Media Management</h3>
              <p className="text-offwhite/80 text-sm md:text-base">Strategic content creation and community engagement for brand growth.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Carousel */}
      <div className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gold animate-fade-in-up">Featured Projects</h2>
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="!pb-12"
            >
              {featuredProjects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="bg-primary-light rounded-lg overflow-hidden shadow-lg border border-gold/20 h-full hover-scale">
                    {project.featured_image && (
                      <img
                        src={project.featured_image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gold mb-2">{project.title}</h3>
                      <p className="text-offwhite/80 mb-4 line-clamp-2">{project.description}</p>
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
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-2 hover-lift"
                        >
                          View Project <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-prev !w-10 !h-10 !bg-gold/10 !rounded-full !text-gold hover:!bg-gold/20 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-button-next !w-10 !h-10 !bg-gold/10 !rounded-full !text-gold hover:!bg-gold/20 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16 bg-gold-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="text-primary animate-scale-in animate-delay-200">
              <div className="text-2xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-primary/80 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-primary animate-scale-in animate-delay-300">
              <div className="text-2xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-primary/80 text-sm md:text-base">Satisfaction Rate</div>
            </div>
            <div className="text-primary animate-scale-in animate-delay-400">
              <div className="text-2xl md:text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary/80 text-sm md:text-base">Projects Completed</div>
            </div>
            <div className="text-primary animate-scale-in animate-delay-500">
              <div className="text-2xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary/80 text-sm md:text-base">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gold animate-fade-in-left">Why Choose Me?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 animate-fade-in-left animate-delay-200">
                  <Clock className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Quick Response Time</h3>
                    <p className="text-offwhite/80 text-sm md:text-base">Always available and responsive to urgent requests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-in-left animate-delay-300">
                  <Users className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Professional Communication</h3>
                    <p className="text-offwhite/80 text-sm md:text-base">Clear and effective communication with all stakeholders.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 animate-fade-in-left animate-delay-400">
                  <Star className="w-6 h-6 text-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-gold">Quality Guaranteed</h3>
                    <p className="text-offwhite/80 text-sm md:text-base">Committed to delivering exceptional results every time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group animate-fade-in-right">
              <img 
                src={workspaceImage}
                alt="Professional workspace"
                className="w-full h-[300px] md:h-[500px] rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
              />
              <div className="absolute inset-0 bg-gold/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="py-16 md:py-24 bg-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gold animate-fade-in-up">Recent Blog Posts</h2>
            <Link to="/blog" className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-2 hover-lift animate-fade-in-up">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-primary rounded-lg overflow-hidden shadow-lg border border-gold/20 hover-scale animate-fade-in-up">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gold mb-2">{post.title}</h3>
                  <p className="text-offwhite/80 mb-4 line-clamp-2">{post.content}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-gold hover:text-gold-light font-medium inline-flex items-center gap-2 hover-lift"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-light py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in-up">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto animate-float">
              <img 
                src={portraitImage}
                alt="Mercy Nyawira"
                className="w-full h-full rounded-full object-cover border-4 border-gold"
                style={{
                  objectPosition: '50% 25%',
                  objectFit: 'cover',
                }}
              />
              <div className="absolute inset-0 rounded-full shadow-lg"></div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-6 md:mb-8 animate-fade-in-up animate-delay-200">Ready to Get Started?</h2>
          <p className="text-offwhite/80 mb-8 max-w-2xl mx-auto text-sm md:text-base px-4 animate-fade-in-up animate-delay-300">
            Let's work together to take your business to the next level with professional customer service, 
            virtual assistance, and social media management.
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-gradient text-primary px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-gold-gradient-hover transition duration-300 shadow-lg inline-flex items-center gap-2 animate-fade-in-up animate-delay-400 hover-lift"
          >
            Contact Me <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
}

function App() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const logoImage = "https://imgur.com/uCUE8K1.jpg";

  return (
    <div className="relative">
      {/* Floating Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto">
        <nav className={`
          w-full rounded-full transition-all duration-300 backdrop-blur-md
          ${isHomePage ? 'bg-primary/80 border border-gold/10' : 'bg-primary/90 border border-gold/20'}
          shadow-lg shadow-gold/5
        `}>
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center">
                <img 
                  src={logoImage}
                  alt="MN Logo"
                  className="h-8 md:h-10 w-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gold hover:text-gold-light transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Desktop navigation */}
              <div className="hidden md:flex items-center gap-8">
                <Link 
                  to="/blog" 
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors hover-lift"
                >
                  Blog
                </Link>
                <Link 
                  to="/portfolio" 
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors hover-lift"
                >
                  Portfolio
                </Link>
                <Link 
                  to="/contact"
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors hover-lift"
                >
                  Contact
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/admin"
                      className="flex items-center gap-2 font-medium text-gold hover:text-gold-light transition-colors hover-lift"
                    >
                      <Settings className="w-4 h-4" />
                      Admin
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 font-medium text-red-500 hover:text-red-400 transition-colors hover-lift"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {/* Mobile navigation */}
            <div 
              className={`
                md:hidden absolute left-0 right-0 mt-3 px-6 py-4 
                bg-primary/95 backdrop-blur-md border border-gold/10 
                rounded-2xl transition-all duration-300 transform
                ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
              `}
            >
              <div className="flex flex-col gap-4">
                <Link 
                  to="/blog" 
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/portfolio" 
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link 
                  to="/contact"
                  className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {user ? (
                  <>
                    <Link 
                      to="/admin"
                      className="flex items-center gap-2 font-medium text-gold hover:text-gold-light transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Admin
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 font-medium text-red-500 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        } />
        <Route path="/admin/blog" element={
          <RequireAuth>
            <BlogAdmin />
          </RequireAuth>
        } />
        <Route path="/admin/portfolio" element={
          <RequireAuth>
            <PortfolioAdmin />
          </RequireAuth>
        } />
        <Route path="/admin/contacts" element={
          <RequireAuth>
            <ContactAdmin />
          </RequireAuth>
        } />

        {/* Catch-all route for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;