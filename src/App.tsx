import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
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
import PortfolioAdmin from './pages/admin/PortfolioAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';
import Login from './pages/Login';
import { RequireAuth, useAuth } from './lib/auth';
import HomePage from './pages/HomePage';
import BlogNew from './pages/admin/BlogNew';
import BlogEdit from './pages/admin/BlogEdit';
import PortfolioNew from './pages/admin/PortfolioNew';
import PortfolioEdit from './pages/admin/PortfolioEdit';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const logoImage = "https://imgur.com/uCUE8K1.jpg";

  // Handle scroll direction for navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    if (direction === "down" && latest > 50) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
    setLastScrollY(latest);
  });

  // Handle initial load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Shorter duration for page transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hidden: { 
      y: -100,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      {/* Floating Navigation */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50"
        initial="visible"
        animate={isNavVisible ? "visible" : "hidden"}
        variants={navVariants}
      >
        <div className="absolute inset-0 bg-black/5 backdrop-blur-xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.nav 
            className={`
              mx-auto mt-4 rounded-full 
              bg-black/20 backdrop-blur-xl
              border border-gold/10
              transition-all duration-300
            `}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/" className="flex items-center">
                    <img 
                      src={logoImage}
                      alt="MN Logo"
                      className="h-8 md:h-10 w-auto"
                    />
                  </Link>
                </motion.div>

                {/* Mobile menu button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-gold hover:text-gold-light transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-8">
                  {/* Navigation Links */}
                  {[
                    { to: "/blog", text: "Blog" },
                    { to: "/portfolio", text: "Portfolio" },
                    { to: "/contact", text: "Contact" }
                  ].map((link) => (
                    <motion.div
                      key={link.to}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={link.to}
                        className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors"
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {user ? (
                    <>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link 
                          to="/admin"
                          className="flex items-center gap-2 font-medium text-gold hover:text-gold-light transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          Admin
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-2 font-medium text-red-500 hover:text-red-400 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Mobile navigation */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden absolute left-0 right-0 mt-3 px-6 py-4 bg-black/40 backdrop-blur-xl border border-gold/10 rounded-2xl"
                  >
                    <motion.div 
                      className="flex flex-col gap-4"
                      variants={{
                        open: {
                          transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                        },
                        closed: {
                          transition: { staggerChildren: 0.05, staggerDirection: -1 }
                        }
                      }}
                      initial="closed"
                      animate="open"
                    >
                      {/* Mobile Navigation Links */}
                      {[
                        { to: "/blog", text: "Blog" },
                        { to: "/portfolio", text: "Portfolio" },
                        { to: "/contact", text: "Contact" }
                      ].map((link) => (
                        <motion.div
                          key={link.to}
                          variants={{
                            open: { y: 0, opacity: 1 },
                            closed: { y: 20, opacity: 0 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link 
                            to={link.to}
                            className="flex items-center gap-2 font-medium text-offwhite hover:text-gold transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.text}
                          </Link>
                        </motion.div>
                      ))}
                      
                      {user ? (
                        <>
                          <motion.div
                            variants={{
                              open: { y: 0, opacity: 1 },
                              closed: { y: 20, opacity: 0 }
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link 
                              to="/admin"
                              className="flex items-center gap-2 font-medium text-gold hover:text-gold-light transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" />
                              Admin
                            </Link>
                          </motion.div>
                          <motion.div
                            variants={{
                              open: { y: 0, opacity: 1 },
                              closed: { y: 20, opacity: 0 }
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
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
                          </motion.div>
                        </>
                      ) : null}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Routes with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Routes location={location}>
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
            <Route path="/admin/portfolio/new" element={
              <RequireAuth>
                <PortfolioNew />
              </RequireAuth>
            } />
            <Route path="/admin/portfolio/edit/:id" element={
              <RequireAuth>
                <PortfolioEdit />
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;