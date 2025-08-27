import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosHandler from "../config/Axioshandler";
import { Trash2 } from "lucide-react";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching blogs from:", "/api/blogs");
      console.log("Base URL:", import.meta.env.VITE_BACKEND_URL);

      const res = await axiosHandler.get("/api/blogs");
      console.log("Full response:", res);
      console.log("Response data:", res.data);
      console.log("Response status:", res.status);

      // The backend returns { blogs: [...], totalBlogs, currentPage, totalPages }
      const blogs = res?.data?.blogs || res?.data || [];
      console.log("Extracted blogs:", blogs);
      console.log("Number of blogs:", blogs.length);

      setBlogData(blogs);
      setError(null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      setError(`Failed to load blogs: ${error.message}`);
      setBlogData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test backend connectivity first
    const testBackend = async () => {
      try {
        console.log("Testing backend connectivity...");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
        );
        console.log("Direct fetch response status:", response.status);
        const data = await response.json();
        console.log("Direct fetch data:", data);
      } catch (err) {
        console.error("Direct fetch failed:", err);
      }
    };

    testBackend();
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 mt-20 min-h-[calc(100vh-20rem)]"
    >
      <h1 className="text-[45px] font-bold text-center mb-12 text-gray-500">
        Latest <span className="text-yellow-400">Blogs</span>
      </h1>

      {loading && (
        <div className="text-center py-20">
          <div className="text-xl">Loading blogs...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <div className="text-xl text-red-500">{error}</div>
        </div>
      )}

      {!loading && !error && blogData?.length === 0 && (
        <div className="text-center py-20">
          <div className="text-xl text-gray-500">No blogs found</div>
          <div className="text-sm text-gray-400 mt-2">
            Check the console for debugging information
          </div>
        </div>
      )}

      {/* Debug info - remove this in production */}
      {!loading && (
        <div className="text-center mb-4 p-4 bg-gray-100 rounded text-sm">
          <strong>Debug Info:</strong> Found {blogData?.length || 0} blogs.
          {error && <span className="text-red-500"> Error: {error}</span>}
        </div>
      )}

      {!loading && !error && blogData?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.map((blog, index) => (
            <div
              key={blog._id || blog.id || index}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300 relative cursor-pointer"
              onClick={() => {
                // Use blog slug for SEO-friendly URLs
                const blogSlug =
                  blog.slug ||
                  blog.title
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-");
                window.location.href = `/blog/${blogSlug}`;
              }}
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h2>

                <div className="text-sm text-gray-500 mb-3">
                  <span>By {blog.author}</span> ·{" "}
                  <span>{new Date(blog.dateAdded).toLocaleDateString()}</span> ·{" "}
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                    {blog.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-4 mb-4 flex-grow">
                  {blog.content}
                </p>

                <div className="mt-auto pt-2 text-sm text-gray-600">
                  <strong>Tags:</strong>{" "}
                  {blog.tags && blog.tags.length > 0
                    ? blog.tags.join(", ")
                    : "No tags"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Blog;
