import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axiosHandler from "../config/Axioshandler";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

const ProductDetails = () => {
  const { name } = useParams();

  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch all products without pagination to find the specific product
        const res = await axiosHandler.get("/api/products/?limit=1000");
        const products = res.data || [];
        const matchedProduct = products.find(
          (p) =>
            p.name.toLowerCase().replace(/\s+/g, "-") ===
            decodeURIComponent(name)
        );
        if (matchedProduct) {
          setProduct(matchedProduct);
        } else {
          throw new Error("Not found");
        }
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [name]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div
          className="mb-6"
          onClick={() => {
            const previousPath = document.referrer;

            if (
              previousPath &&
              !previousPath.includes(window.location.hostname)
            ) {
              navigate("/products");
            } else {
              navigate(-1);
            }
          }}
        >
          <Button
            variant="ghost"
            className="flex items-center text-blue-500 hover:bg-blue-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={product.images?.[0] || "/placeholder.jpg"}
              alt={product.name}
              className="w-full max-w-xs h-80 object-cover rounded-lg border"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-blue-700">
                {product.name}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                {product.longDescription}
              </p>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {product.shortDescription}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-extrabold text-blue-600">
                  ₹{product.price}
                </span>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Category: {product.category}
                </span>
              </div>
              {product.popular && (
                <div className="mb-4">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </span>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button
                onClick={() => setShowQuoteForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition-colors duration-200"
              >
                Send Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6 shadow-2xl relative">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Get Custom Assistance
            </h2>
            <QuoteForm
              product={product}
              onClose={() => setShowQuoteForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
