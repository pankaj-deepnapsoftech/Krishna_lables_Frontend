
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={cn(isSidebarOpen ? "w-64" : "w-20", "transition-all duration-500 ease-in-out whitespace-nowrap", {"admin-sidebar-auto-collapse": !isSidebarOpen && window.innerWidth <= 768})} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-6 lg:p-8 admin-outlet-container">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
};

export default AdminLayout;
