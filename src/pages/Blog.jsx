import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosHandler from "../config/Axioshandler";
import { Trash2 } from "lucide-react";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  const getData = async () => {
    try {
      const res = await axiosHandler.get("/api/blogs");
      setBlogData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData?.map((blog, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300 relative cursor-pointer"
            onClick={() => {
              // Use blog._id or blog.id for navigation
              const blogId = blog._id || blog.id || index;
              window.location.href = `/blog/${blogId}`;
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
    </motion.div>
  );
};

export default Blog;
