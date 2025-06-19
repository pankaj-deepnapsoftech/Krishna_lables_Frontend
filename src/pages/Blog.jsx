import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 min-h-[calc(100vh-20rem)]" // Ensure content pushes footer down
    >
      <div className="text-center pt-10">
        <h1 className="text-5xl font-bold font-roboto-slab mb-8 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
          Our Blog
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Stay tuned for insightful articles, industry news, and updates from Krishna Labels!
        </p>
        <div className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg">
          <img 
            alt="Coming Soon Illustration"
            className="w-full h-auto object-contain rounded-md mb-6"
           src="https://images.unsplash.com/photo-1691169892368-9145102feb0a" />
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Content Coming Soon!</h2>
          <p className="text-gray-600">
            We're working hard to bring you valuable content. Check back later!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;