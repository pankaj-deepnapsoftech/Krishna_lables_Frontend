import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogDetails from "@/pages/BlogDetails";
import ProductDetails from "@/pages/ProductDetails";

import AdminLayout from "@/components/admin/AdminLayout";
import DashboardOverview from "@/pages/admin/DashboardOverview";
import AdminQuickQuotes from "@/pages/admin/AdminQuickQuotes";
import AdminProductQuotes from "@/pages/admin/AdminProductQuotes";
import AdminHelpEnquiries from "@/pages/admin/AdminHelpEnquiries";
import AdminContactEnquiries from "@/pages/admin/AdminContactEnquiries";
import AdminManageProducts from "@/pages/admin/AdminManageProducts";
import SingIn from "./components/Auth/SingIn";
import ManageBlog from "./pages/admin/ManageBlog";
import { useAuthContext } from "./Context/authcontext";
import ScrollToTop from "./pages/ScrollToTop";
import AdminTestimonial from "./pages/admin/AdminTestimonial";

function App() {
  const { token } = useAuthContext();

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Frontend Routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-poppins">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:name" element={<ProductDetails />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetails />} />
                  <Route path="*" element={<Navigate to="/" replace />} />{" "}
                  {/* Catch-all for frontend */}
                </Routes>
              </main>
              <Footer />

              <Toaster />
            </div>
          }
        />

        {/* Admin Routes */}
        {token && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="quick-quotes" element={<AdminQuickQuotes />} />
            <Route path="product-quotes" element={<AdminProductQuotes />} />
            <Route path="help-enquiries" element={<AdminHelpEnquiries />} />
            <Route
              path="contact-enquiries"
              element={<AdminContactEnquiries />}
            />
            <Route path="manage-blog" element={<ManageBlog />} />
            <Route path="manage-products" element={<AdminManageProducts />} />
            <Route path="manage-testimonials" element={<AdminTestimonial />} />
            {/* Catch-all for admin section, redirects to admin dashboard */}
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Route>
        )}
        <Route path="/signin" element={<SingIn />} />
      </Routes>
    </Router>
  );
}

export default App;
