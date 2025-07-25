import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosHandler from "../config/Axioshandler";
import { ArrowLeft } from "lucide-react";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosHandler.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!blog) return null;

  return (
    <div className="container mx-auto px-4 py-16 mt-20 min-h-[calc(100vh-20rem)]">
      <button
        className="flex items-center mb-6 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 w-5 h-5" /> Back to Blogs
      </button>

      <div className="md:px-10 overflow-hidden">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="h-64 w-full object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          <span>By {blog.author}</span> ·{" "}
          <span>{new Date(blog.dateAdded).toLocaleDateString()}</span> ·{" "}
          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
            {blog.status}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-6">
          <strong>Tags:</strong>{" "}
          {blog.tags && blog.tags.length > 0 ? blog.tags.join(", ") : "No tags"}
        </div>
        <div
          className="prose max-w-none mb-8 text-gray-700"
          style={{ whiteSpace: "pre-line" }}
        >
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
