
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare as MessageSquareQuote, PackageSearch, HelpCircle, Mail, PlusSquare, ListOrdered, ChevronLeft, ChevronRight, BarChart3, PieChart as PieChartIcon, Activity, LayoutList, Speaker } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Quick Quotes', icon: MessageSquareQuote, path: '/admin/quick-quotes' },
  { name: 'Product Quotes', icon: PackageSearch, path: '/admin/product-quotes' },
  { name: 'Help Enquiries', icon: HelpCircle, path: '/admin/help-enquiries' },
  { name: 'Contact Us', icon: Mail, path: '/admin/contact-enquiries' },
  { name: 'Manage Blog', icon: LayoutList, path: '/admin/manage-blog' },
  { name: 'Manage Products', icon: ListOrdered, path: '/admin/manage-products' },
  {
    name: 'Manage Testimonials', icon: Speaker, path: '/admin/manage-testimonials'
  }
  // Example items for chart section, can be removed if charts are only on dashboard
  // { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
];
const sidebarVariants = {
  open: {
    width: "250px",  // width when open
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    width: "60px",   // width when closed (or 0 if fully hidden)
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 35
    }
  }
};

const navItemTextVariants = {
  open: { opacity: 1, x: 0, display: 'inline-block', transition: { delay: 0.1, duration: 0.2 } },
  closed: { opacity: 0, x: -10, display: 'none', transition: { duration: 0.1 } },
};

const iconVariants = {
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 400, damping: 10 } },
  tap: { scale: 0.95 },
};

const AdminSidebar = ({ isOpen, toggleSidebar, className }) => {
  const location = useLocation();

 const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('tk');
    toast.success("Logout Successful");
    navigate('/signin');
    window.location.reload();
  }


  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className={cn(
        "bg-charcoal-dark text-text-on-dark-bg h-full flex flex-col shadow-xl relative",
        "bg-gradient-to-b from-slate-800 to-slate-700",
        className
      )}
    >
  
      <div className={cn(
        "flex items-center h-16 border-b border-slate-700",
        isOpen ? 'px-6 justify-between' : 'px-0 justify-center'
      )}>
        {isOpen && (
          <motion.h1
            // initial={{ opacity: 0, x: -20 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ delay: 0.1, type: 'spring' }}
            style={{ fontSize: "25px", color: "white", fontWeight: "400" }}
          >
            Admin Panel
          </motion.h1>
        )}
      </div>

 
      <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center py-2.5 transition-colors duration-150 group relative rounded-md mx-3",
                isOpen ? 'px-4' : 'px-0 justify-center',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              )
            }
          >
            <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isOpen ? 'mr-3' : '',
                  location.pathname === item.path ? 'text-primary-foreground' : 'text-slate-400 group-hover:text-secondary'
                )}
              />
            </motion.div>
            <motion.span
              variants={navItemTextVariants}
              animate={isOpen ? 'open' : 'closed'}
              className="font-medium text-sm text-white transition-colors duration-300 admin-sidebar-nav-text"
            >
              {item.name}
            </motion.span>

            {!isOpen && (
              <span className="absolute left-full ml-3 hidden group-hover:block px-2 py-1 text-xs font-medium text-primary-foreground bg-slate-900 rounded-md shadow-lg whitespace-nowrap z-50 border border-slate-700">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>


      {isOpen && (
        <div className="p-4  absolute bottom-8 w-full transition-all duration-500 ease-in-out">
          <Button
            className="w-full text-white bg-blue-500 hover:bg-blue-600"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}

    </motion.aside>

  );
};

export default AdminSidebar;
