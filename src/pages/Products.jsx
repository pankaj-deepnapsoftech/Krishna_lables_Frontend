import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Filter, Grid, List, Search, Star, ArrowRight } from "lucide-react";
import { DialogContent } from "../components/ui/dialog";
import axiosHandler from "../config/Axioshandler";
import { useAuthContext } from "../Context/authcontext";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Paginations from "./Paginations";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Products" },
    { id: "woven and printed labels", name: "Woven and Printed Labels" },
    { id: "designer tags", name: "Designer Tags" },
    { id: "fashion badges", name: "Fashion Badges" },
    { id: "hang tags", name: "Hang Tags" },
    { id: "custom labels", name: "Custom Labels" },
    { id: "printed ribbons", name: "Printed Ribbons" },
    { id: "paper bag", name: "Paper Bag" },
    { id: "wrapping papers", name: "Wrapping Papers" },
    { id: "stickers", name: "Stickers" },
    { id: "cotton bag", name: "Cotton Bag" },
    { id: "Promotional Keys rings", name: "Promotional Key Rings" },
  ];

  const location = useLocation();

  const GetProduct = async () => {
    try {
      // Fetch all products without pagination for the products page
      const res = await axiosHandler.get("/api/products/?limit=1000");
      setProductData(res.data || []);
    } catch (err) {
      console.error("GetProduct error:", err);
    }
  };

  const filteredProducts = productData.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      (product.name &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
    // Update the URL with the selected tab
    const params = new URLSearchParams(location.search);
    if (category === "all") {
      params.delete("tab");
    } else {
      params.set("tab", category);
    }
    navigate(
      {
        pathname: location.pathname,
        search: params.toString() ? `?${params.toString()}` : "",
      },
      { replace: true }
    );
  };

  const sectionTitleClasses =
    "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const paragraphClasses = "text-dark-gray leading-relaxed font-poppins";
  const highlightSpanClasses = "text-blue-600";

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      phone: "",
      email: "",
      address: "",
      status: "",
      product: "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          quantity: values.quantity,
          productId: values.product || selectedProduct._id,
          status: values.status,
        };

        const res = await axiosHandler.post("/api/quotes", payload);
        console.log(res.data);
        toast.success(
          "Your request for custom assistance has been submitted successfully."
        );
        setShowForm(false);
        formik.resetForm();
      } catch (error) {
        console.error("Quote submission error:", error);
        toast.error(error?.message);
      }
    },
  });

  useEffect(() => {
    GetProduct();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab");

    if (tab && categories.some((category) => category.id === tab)) {
      setSelectedCategory(tab);
    }
  }, [location.search]);

  const applications = [
    {
      image: "/products/babySocks.png",
      title: "Printed cotton labels for baby socks",
    },
    {
      image: "/products/pillowCase.png",
      title: "Printed satin labels for pillowcase",
    },
    {
      image: "/products/scarf.png",
      title: "Damask woven label for scarf",
    },
    {
      image: "/products/furniture.png",
      title: "Damask woven labels for furniture",
    },
    {
      image: "/products/neckPillow.jpg",
      title: "Printed satin label for neck pillow",
    },
    {
      image: "/products/glassJar.jpg",
      title: "Hangtag for glass jar",
    },
    {
      image: "/products/beanie.png",
      title: "Woven patches for beanie",
    },
    {
      image: "/products/jacket.jpg",
      title: "Woven patches for jacket",
    },
    {
      image: "/products/hemTShirt.jpg",
      title: "Hem tag for T-shirt",
    },
    {
      image: "/products/tShirt.png",
      title: "Hangtag for shirt",
    },
  ];

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <section
        className="py-16 text-white relative top-4"
        style={{
          backgroundImage: "url('/productBackground.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-roboto-slab text-gray-50 font-bold mb-6">
              Our <span className="text-yellow-400">Products</span>
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed font-poppins">
              Discover our comprehensive range of premium textile accessories
              designed to meet global quality standards
            </p>
          </motion.div>
        </div>
      </section>

      <section className="p-8 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-roboto-slab text-gray-500 font-bold mb-6">
              Labels and Hangtags{" "}
              <span className="text-yellow-400">General Applications</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-poppins">
              These are some of the general applications of Labels and Hangtags
            </p>
          </motion.div>

          {/* Modern Carousel for General Applications */}
          <div className="relative max-w-6xl mx-auto mt-4">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="gap-4 py-6 px-2 sm:px-0">
                {applications.map((app, idx) => (
                  <CarouselItem
                    key={idx}
                    className="flex-shrink-0 flex-grow-0 
        basis-1/2 max-w-[50%] 
        sm:basis-1/3 sm:max-w-[33.3333%] 
        md:basis-1/4 md:max-w-[25%] 
        lg:basis-1/5 lg:max-w-[20%] 
        px-2 w-full min-w-0 
        flex flex-col items-center justify-center group"
                  >
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-white to-blue-50 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl border border-blue-100 group-hover:border-blue-400">
                      <img
                        src={app.image || "/placeholder.jpg"}
                        alt={app.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                    </div>
                    <span className="mt-3 text-center text-gray-900 text-base sm:text-lg font-medium font-poppins px-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {app.title}
                    </span>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Buttons */}
              <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md border border-gray-200 shadow-md hover:bg-blue-600 hover:text-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center z-10 transition-colors duration-300" />
              <CarouselNext className="right-3 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md border border-gray-200 shadow-md hover:bg-blue-600 hover:text-white text-blue-600 rounded-full w-10 h-10 flex items-center justify-center z-10 transition-colors duration-300" />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="w-52 pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-dark-gray"
              />
            </div>

            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-2 whitespace-nowrap min-w-full">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleFilter(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 font-poppins text-sm ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="List View"
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Summary */}
          {filteredProducts.length > 0 && (
            <div className="mb-6 text-sm text-gray-600 font-poppins">
              Showing {indexOfFirstProduct + 1}-
              {Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}{" "}
              products
              {selectedCategory !== "all" && (
                <span className="ml-2 text-blue-600 font-medium">
                  in "
                  {categories.find((cat) => cat.id === selectedCategory)?.name}"
                </span>
              )}
              {searchTerm && (
                <span className="ml-2 text-blue-600 font-medium">
                  for "{searchTerm}"
                </span>
              )}
            </div>
          )}

          {currentProducts.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden ${
                    viewMode === "list"
                      ? "flex flex-col md:flex-row items-center"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/products/${encodeURIComponent(
                        product.name.toLowerCase().replace(/\s+/g, "-")
                      )}`
                    )
                  }
                >
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list" ? "md:w-1/3 h-48 md:h-full" : "h-60"
                    }`}
                  >
                    <img
                      src={product.images || "/placeholder.jpg"}
                      alt={product.name || "Product image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {product.popular && (
                      <div className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-md font-poppins">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Popular
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-5 flex flex-col flex-grow ${
                      viewMode === "list" ? "md:w-2/3" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-xl text-blue-600 font-extrabold mb-2">
                        ₹{product.price}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-grow line-clamp-2">
                      {product.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium font-poppins">
                        {product.shortDescription}
                      </span>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ Prevent parent click event (navigation)
                        setSelectedProduct(product);
                        formik.setFieldValue("product", product._id);
                        setShowForm(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors font-poppins"
                    >
                      Send Quote
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className={`text-xl font-semibold ${paragraphClasses} mb-2`}>
                No products found
              </h3>
              <p className={`${paragraphClasses} text-sm`}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}

          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Paginations
                page={currentPage}
                setPage={setCurrentPage}
                hasNextPage={currentPage < totalPages}
              />
            </div>
          )}
        </div>
      </section>

      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-roboto-slab font-bold mb-6">
              Need Custom <span className="text-yellow-400">Solutions</span>?
            </h2>
            <p className="text-xl mb-8 text-blue-100 font-poppins">
              Our team specializes in creating custom textile accessories
              tailored to your specific requirements
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg font-poppins"
              onClick={() =>
                toast({
                  title: "🚧 Feature Coming Soon!",
                  description:
                    "Custom quote request isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })
              }
            >
              Request Custom Quote
            </Button>
          </motion.div>
        </div>
      </section> */}

      <section
        className={`${
          showForm ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed inset-0 flex justify-center  items-center z-50 transition-opacity duration-500 bg-black/70 ease-in-out `}
      >
        <div className="bg-white max-w-md w-full mx-4 rounded-xl shadow-2xl p-6 border border-gray-200 relative">
          <header className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-sky-600">
              Get Custom Assistance
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our team will get back to you with the best options for your
              needs.
            </p>
          </header>

          {showForm && (
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              {/* Selected Product */}
              {selectedProduct && (
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedProduct.images?.[0] || "/placeholder.jpg"}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded border shadow"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedProduct.name}
                  </h3>
                </div>
              )}

              {/* Customer Name */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Enter quantity"
                  required
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your number"
                  required
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
