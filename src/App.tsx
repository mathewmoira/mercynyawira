import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu,
  X,
  Settings,
  LogOut
} from 'lucide-react';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogAdmin from './pages/admin/BlogAdmin';
import BlogNew from './pages/admin/BlogNew';
import BlogEdit from './pages/admin/BlogEdit';
import PortfolioAdmin from './pages/admin/PortfolioAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';
import Login from './pages/Login';
import { RequireAuth, useAuth } from './lib/auth';
import HomePage from './pages/HomePage';

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
        <Route path="/admin/blog/new" element={
          <RequireAuth>
            <BlogNew />
          </RequireAuth>
        } />
        <Route path="/admin/blog/edit/:id" element={
          <RequireAuth>
            <BlogEdit />
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