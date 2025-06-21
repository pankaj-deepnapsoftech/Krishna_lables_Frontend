
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, Settings, LogOut, UserCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const AdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate()
  const handleLogout =  () =>{
   localStorage.removeItem('tk')
    navigate('/signin')

  }


  const handleSettings = () => {
    toast({
      title: "Settings Clicked",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };
  
  const handleNotifications = () => {
    toast({
      title: "Notifications Clicked",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-card shadow-md sticky top-0 z-40 border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full"> {/* Ensure full width for container */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-muted-foreground   mr-2 md:mr-4"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/admin/dashboard" className="flex-shrink-0 flex items-center">
              <img  className="h-48 pt-2" alt="Krishna Labels Admin Logo" src="/logoCmpny.png" />
              {/* <span className="font-roboto-slab text-lg font-bold text-text-charcoal hidden sm:block">Krishna Labels <span className="text-primary">Admin</span></span> */}
            </Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground " onClick={handleNotifications}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground transform translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full">
                  3
                </span>
              </Button>
            </motion.div> 

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/admin-avatar.jpg" alt="Admin Avatar" />
                    <AvatarFallback className="bg-primary text-white font-semibold text-sm">
                      A
                    </AvatarFallback>
                  </Avatar>
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card shadow-lg rounded-md mt-2 border-border">
                <DropdownMenuLabel className="px-2 py-2 text-sm text-muted-foreground font-medium">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border"/>
                <DropdownMenuItem onClick={handleSettings} className="flex items-center px-2 py-2 text-sm text-foreground hover:bg-muted hover:text-primary cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center px-2 py-2 text-sm text-foreground hover:bg-muted hover:text-primary cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;
