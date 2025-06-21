import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Store, Tag, HeartHandshake as Handshake, MessageSquare as MessageSquareText, Users, FileText, Phone, ChevronLeft, ChevronRight, LogIn } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Input } from '@/components/ui/input'; // Assuming Input component exists or will be created
import { useAuthContext } from '../Context/authcontext';
import { useFormik } from 'formik';
import axiosHandler from '../config/Axioshandler';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAuthContext()
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Shop',
      path: '/products',
      icon: Store,
      color: 'text-blue-600',
      action: () => navigate('/products'),
    },
    {
      name: 'Our Product',
      path: '/products#product-section',
      icon: Tag,
      color: 'text-violet-500',
      action: () => scrollToSection('/products', 'product-section'),
    },
    {
      name: 'Help',
      icon: Handshake,
      color: 'text-emerald-500',
      isDialog: true,
      dialogType: 'help', // custom flag for rendering a different form
    },
    {
      name: 'Quick Quote',
      icon: MessageSquareText,
      color: 'text-slate-700',
      isDialog: true,
      dialogType: 'quote', // same logic, clearer intent
    },
    {
      name: 'About Us',
      path: '/about',
      icon: Users,
      color: 'text-amber-500',
      action: () => navigate('/about'),
    },
    {
      name: 'Blog',
      path: '/blog',
      icon: FileText,
      color: 'text-blue-700',
      action: () => navigate('/blog'),
    },
    {
      name: 'Contact Us',
      path: '/contact',
      icon: Phone,
      color: 'text-violet-600',
      action: () => navigate('/contact'),
    },
    token
      ? {
        name: 'Dashboard',
        path: '/admin',
        icon: LogIn,
        color: 'text-sky-600',
        action: () => navigate('/admin'),
      }
      : {
        name: 'Sign In',
        path: '/signin',
        icon: LogIn,
        color: 'text-sky-600',
        action: () => navigate('/signin'),
      },
  ];


  const scrollToSection = (pagePath, sectionId, toastMessage) => {
    if (location.pathname !== pagePath && pagePath !== '/') {
      navigate(pagePath, { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else if (toastMessage) {
        toast({
          title: "🚧 Feature Coming Soon!",
          description: toastMessage,
          variant: "default",
          duration: 3000,
        });
      } else if (sectionId === 'product-section' && pagePath === '/products') {
        // If already on products page, try to scroll. If no section, it's fine.
        // This case is for when "Our Product" is clicked while on /products page.
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state to prevent re-scrolling on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);


  const handleQuickQuoteSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Quote Form Submitted (Demo)",
      description: "This feature isn't fully implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      variant: "default",
      duration: 5000,
    });
  };

  const NavItemContent = ({ item }) => (
    <div className="flex flex-col items-center text-center">
      <item.icon className={`w-7 h-7 mb-1 ${item.color}`} strokeWidth={2} />
      <span className={`text-xs font-semibold ${item.color === 'text-black' ? 'text-gray-700' : item.color}`}>{item.name}</span>
    </div>
  );

  const NavLink = ({ item, index }) => {
    const isActive = location.pathname === item.path || (item.path?.includes('#') && location.pathname === item.path.split('#')[0]);

    const commonProps = {
      initial: { opacity: 0, y: -20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { delay: index * 0.05 + 0.2, type: 'spring', stiffness: 200, damping: 15 },
      whileHover: { scale: 1.1, boxShadow: "0px 0px 15px rgba(81, 112, 140)" },
      className: `nav-icon-item p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out flex-shrink-0 ${isActive ? 'bg-sky-100 shadow-inner' : 'bg-white hover:bg-gray-50'}`,
    };

    const formik = useFormik({
      initialValues: {
        name: '',
        mobile: '',
        type: item.dialogType === 'help' ? 'Help' : 'Quites',
        question: '',
        message: '',
      },
      validate: (values) => {
        const errors = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.mobile) errors.mobile = 'Mobile number is required';
        if (item.dialogType === 'help' && !values.question) {
          errors.question = 'Question is required';
        }
        if (item.dialogType === 'quote' && !values.message) {
          errors.message = 'Message is required';
        }
        return errors;
      },
      onSubmit: async (values, { resetForm }) => {
        const payload = {
          name: values.name,
          mobile: values.mobile,
          type: values.type,
          ...(item.dialogType === 'help'
            ? { question: values.question }
            : { message: values.message }),
        };

        try {
          const res = await axiosHandler.post('/api/help/create', payload);
          console.log(res?.data);
          toast({
            title: '✅ Submitted Successfully!',
            description: `Thanks for your ${values.type.toLowerCase() === 'help' ? 'question' : 'quote request'}!`,
            variant: 'default',
            duration: 4000,
          });
          formik.resetForm(); // Clear form after success
        } catch (error) {
          toast({
            title: '❌ Submission Failed',
            description: error?.response?.data?.message || 'Please try again later.',
            variant: 'destructive',
          });
          console.error(error);
        }
      },
    });

    if (item.isDialog) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <motion.div {...commonProps}>
              <NavItemContent item={item} />
            </motion.div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-roboto-slab text-center text-sky-600">
                {item.dialogType === 'help' ? 'Need Help? Ask Us!' : 'Request a Quick Quote'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit} className="grid gap-5 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="col-span-3 form-input px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="col-span-4 text-red-500 text-sm">{formik.errors.name}</div>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="mobile" className="text-right text-sm text-gray-700">
                  Mobile No
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  onChange={formik.handleChange}
                  value={formik.values.mobile}
                  className="col-span-3 form-input px-3 py-2 border border-gray-300 rounded-md"
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="col-span-4 text-red-500 text-sm">{formik.errors.mobile}</div>
                )}
              </div>

              
              {item.dialogType === 'help' ? (
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="question" className="text-right text-sm text-gray-700 pt-1">
                    Question
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md resize-none h-24"
                  />
                  {formik.touched.question && formik.errors.question && (
                    <div className="col-span-4 text-red-500 text-sm">{formik.errors.question}</div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-4 items-start gap-4">
                  <label htmlFor="message" className="text-right text-sm text-gray-700 pt-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    className="col-span-3 px-3 py-2 border border-gray-300 rounded-md resize-none h-24"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="col-span-4 text-red-500 text-sm">{formik.errors.message}</div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <DialogClose asChild>
                  <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </DialogClose>

                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
                >
                  {item.dialogType === 'help' ? 'Submit Question' : 'Send Quote Request'}
                </button>
              </div>

            </form>
          </DialogContent>
        </Dialog>
      );
    }


    return (
      <motion.div
        {...commonProps}
        onClick={() => { item.action(); setIsMenuOpen(false); }}
      >
        <NavItemContent item={item} />
      </motion.div>
    );
  };

  const scrollNav = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 md:bg-transparent' // Keep white background on mobile initially for better nav visibility
        }`}
    >
      <div className="container mx-auto w-full">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative -left-5 top-2">
              <img src="/logoCmpny.png" alt="Krishna Labels Logo" className="md:w-48 md:h-52 w-40  " />
            </div>
            {/* <div>
              <h1 className="text-xl md:text-2xl font-roboto-slab font-bold bg-gradient-to-r from-sky-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Krishna Labels
              </h1>
              <p className="text-xs text-gray-500 -mt-1 font-montserrat hidden md:block">Premium Textile Manufacturing</p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center  space-x-2">
            {navItems.map((item, index) => (
              <NavLink key={item.name} item={item} index={index} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/70 hover:bg-gray-100 transition-all z-20"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 text-sky-500" />
            ) : (
              <Menu className="w-7 h-7 text-sky-500" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Horizontal Scroll */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg pb-3 pt-1 overflow-hidden"
            >
              <div className="relative px-2">
                <button
                  onClick={() => scrollNav('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/50 hover:bg-white rounded-full shadow"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-sky-500" />
                </button>
                <div ref={scrollContainerRef} className="flex items-center space-x-2 overflow-x-auto py-2 px-8 scrollbar-hide">
                  {navItems.map((item, index) => (
                    <NavLink key={item.name} item={item} index={index} />
                  ))}
                </div>
                <button
                  onClick={() => scrollNav('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/50 hover:bg-white rounded-full shadow"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-sky-500" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Dummy AnimatePresence for environments where it might not be globally available
// In a real setup, ensure Framer Motion's AnimatePresence is correctly imported and used.
const AnimatePresence = ({ children }) => <>{children}</>;


export default Header;