import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  Globe,
  Clock,
  Users,
  CheckCircle,
  Star,
  ShieldCheck,
  MessageSquare,
  StarIcon,
} from "lucide-react";
import { number } from "yup";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import axiosHandler from "@/config/Axioshandler";

const Home = () => {
  const productCategories = [
    {
      title: "Woven & Printed Labels",
      description: "Premium quality fabric labels with custom designs",
      icon: "🏷️",
      url: "woven and printed labels",
    },
    {
      title: "Designer Tags",
      description: "Elegant tags for fashion and luxury brands",
      icon: "🎨",
      url: "designer tags",
    },
    // {
    //   title: "Fancy Ribbons",
    //   description: "Decorative ribbons for various applications",
    //   icon: "🎀",
    //   url: "fancy ribbons",
    // },
    // {
    //   title: "Fashion Badges",
    //   description: "Custom badges for apparel and accessories",
    //   icon: "⭐",
    //   url: "fashion badges",
    // },
    // {
    //   title: "CUSTOM LABELS",
    //   description:
    //     "Premium woven and satin labels tailored to represent your brand identity. Durable, detailed, and fully customizable.",
    //   icon: "📛",
    //   url: "custom labels",
    // },
    {
      title: "HANG TAG",
      description:
        "Stylish and professional hang tags for garments, accessories, and more — available in various shapes, sizes, and finishes.",
      icon: "🏷️",
      url: "hang tag",
    },
    // {
    //   title: "PRINTED RIBBON",
    //   description:
    //     "High quality printed ribbons perfect for branding, packaging, or decorative uses.",
    //   icon: "🎀",
    //   url: "printed ribbon",
    // },
    // {
    //   title: "PAPER BAG",
    //   description:
    //     "Eco friendly, strong, and beautifully printed paper bags suitable for retail, gifting, or promotions.",
    //   icon: "🛍️",
    //   url: "paper bag",
    // },
    // {
    //   title: "Promotional Key Rings",
    //   description: "Custom key rings for marketing and branding",
    //   icon: "🔑",
    //   url: "promotional key rings",
    // },
  ];

  const customOrder = [
    {
      number: "Step 1",
      image: "/process1.png",
      title: "Request a Quote",
      description:
        " Submit details about your product. Remember to include your logo, the quantity, and the size needed.",
    },
    {
      number: "Step 2",
      image: "/process2.jpg",
      title: "Approve Digital Artwork",
      description:
        "We send you the digital artwork together with a price quote for your approval.",
    },
    {
      number: "Step 3",
      image: "/process3.jpg",
      title: "Confirm pre-production Sample",
      description:
        "A pre-production sample is then made to ensure you are happy before going to production. This pre-production sample will be sent to you for your approval.",
    },
    {
      number: "Step 4",
      image: "/process4.jpg",
      title: "Mass Production",
      description:
        "Once approval is received mass production starts which includes weaving printing, cutting, and folding.",
    },
  ];

  const clientLogos = [
    "/brands/brand1.jpeg",
    "/brands/brand2.jpeg",
    "/brands/brand3.jpeg",
    "/brands/brand4.jpeg",
    "/brands/brand5.jpeg",
    "/brands/brand6.jpeg",
    "/brands/brand7.jpeg",
    "/brands/brand8.jpeg",
    "/brands/brand9.jpeg",
    "/brands/brand10.jpeg",
    "/brands/brand11.jpeg",
    "/brands/brand12.jpeg",
    "/brands/brand13.jpeg",
    "/brands/brand14.jpeg",
    "/brands/brand15.jpeg",
    "/brands/brand16.jpeg",
    "/brands/brand17.jpeg",
    "/brands/brand18.jpeg",
    "/brands/brand19.jpeg",
    "/brands/brand20.jpeg",
    "/brands/brand21.jpeg",
    "/brands/brand22.jpeg",
    "/brands/brand23.jpeg",
    "/brands/brand24.jpeg",
    "/brands/brand25.jpeg",
    "/brands/brand26.jpeg",
  ];

  const highlights = [
    {
      image: "/highlight1.jpg",
      title: "Professional Quality",
    },
    {
      image: "/highlight2.jpg",
      title: "Less Quantity",
    },
    {
      image: "/highlight3.jpg",
      title: "Options for Customization",
    },
    {
      image: "/highlight4.webp",
      title: "Handle Urgent Orders",
    },
    {
      image: "/highlight5.jpg",
      title: "Secure Timely Delivery",
    },
    {
      image: "/highlight6.jpg",
      title: "Quality Maintain",
    },
  ];

  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axiosHandler.get("/api/testimonials");
        let data = res.data;
        if (Array.isArray(data)) setTestimonials(data);
        else if (Array.isArray(data.testimonials))
          setTestimonials(data.testimonials);
        else if (Array.isArray(data.data)) setTestimonials(data.data);
        else setTestimonials([]);
      } catch (err) {
        setTestimonials([]);
      }
    };
    fetchTestimonials();
  }, []);

  const sectionTitleClasses =
    "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const sectionSubtitleClasses =
    "text-xl text-dark-gray max-w-3xl mx-auto font-poppins";
  const paragraphClasses = "text-dark-gray leading-relaxed font-poppins";
  const highlightSpanClasses = "text-blue-600";

  const pricing = [
    {
      pcs: "100 pcs",
      price: "₹1300/-",
      originalPrice: "₹1800",
    },
    {
      pcs: "200 pcs",
      price: "₹1600/-",
      originalPrice: "₹2000",
    },
    {
      pcs: "300 pcs",
      price: "₹1800/-",
      originalPrice: "₹2500",
    },
    {
      pcs: "500 pcs",
      price: "₹2500/-",
      originalPrice: "₹2800",
    },
    {
      pcs: "1000 pcs",
      price: "₹3000/-",
      originalPrice: "₹3500",
    },
  ];

  return (
    <div className="pt-20 md:pt-24">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            alt="Modern textile manufacturing facility with workers creating premium labels and tags"
            src="newVideo.webm"
            autoPlay
            muted
            loop
          />
          <div className="hero-overlay absolute inset-0 opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-poppins font-[600] mb-6 leading-relaxed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="font-semibold leading-none mb-6">
                Top Ranked
                <br />
                Manufacturers & Exporters of
              </div>
              <div className="text-yellow-400 font-[1000] text-2xl md:text-3xl mb-2">
                PREMIUM QUALITY WOVEN LABEL
              </div>
              <div className="flex justify-center">
                <div className="bg-black/60 rounded-md w-96">
                  <div className="flex flex-col items-center mb-4 mt-4">
                    <div className="text-lg md:text-xl font-semibold text-white bg-red-500 px-4 py-1 rounded">
                      Custom Woven Labels
                    </div>
                    <div className="text-base md:text-lg font-medium mt-1 text-white px-3 py-0.5 rounded">
                      2.5" x 1" or Less
                    </div>
                    <div className="text-base md:text-lg font-bold mt-1 flex flex-col items-center gap-1">
                      {pricing.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 rounded"
                        >
                          <span className="text-[#fff] font-semibold">
                            {item.pcs}
                          </span>
                          <span className="mx-1 text-[#fff] font-normal">
                            @
                          </span>
                          <span className="line-through text-[#ff6b6b]">
                            {item.originalPrice}
                          </span>
                          <span className="text-[#7fff7f] font-bold">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.h1>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black  px-8 py-4 text-lg group font-poppins"
                >
                  Explore Our Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:8750762762">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg font-poppins transition-colors duration-300 flex items-center gap-2 font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.52l.3 1.2a2 2 0 01-.45 1.95l-1.1 1.1a16.06 16.06 0 006.36 6.36l1.1-1.1a2 2 0 011.95-.45l1.2.3A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"
                    />
                  </svg>
                  Call Now: 8750762762
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="w-12 h-12 bg-blue-400/50 rounded-full "
          ></motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Krishna Labels
              <span className={highlightSpanClasses}> Spotlights</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              Trusted by 4560 brands
            </p>
          </motion.div>
          {/* Slider */}
          <div className="relative w-full py-1 overflow-hidden">
            <div
              className="flex gap-16 animate-client-slide"
              style={{
                width: `${clientLogos.length * 2 * 260}px`,
                animation: `client-slide 50s linear infinite`,
              }}
            >
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center w-64 h-44 bg-white rounded-2xl shadow-lg relative group"
                  style={{
                    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <img
                    src={logo}
                    alt={`Client Logo ${idx + 1}`}
                    className="w-56 h-36 object-cover mx-auto rounded-xl shadow-md group-hover:scale-105 group-hover:shadow-xl transition-transform duration-300 border-4 border-white"
                  />
                </div>
              ))}
            </div>

            {/* Animation style */}
            <style>{`
    @keyframes client-slide {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-client-slide {
      will-change: transform;
    }
  `}</style>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Our Product{" "}
              <span className={highlightSpanClasses}>Categories</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              Comprehensive range of premium textile accessories designed to
              meet global quality standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-card p-6 group cursor-pointer "
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3
                  className={`text-xl font-semibold ${paragraphClasses} mb-3 group-hover:text-blue-600 transition-colors`}
                >
                  {category.title}
                </h3>
                <p className={`${paragraphClasses} text-sm mb-4`}>
                  {category.description}
                </p>
                <div
                  className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 font-poppins text-sm"
                  onClick={() => {
                    window.location.href = `/products?tab=${category.url}`;
                  }}
                >
                  View More <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-poppins rounded-full shadow-lg transition-colors duration-300"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Custom Order <span className={highlightSpanClasses}>Process</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              A step-by-step guide to ordering your custom labels and tags
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {customOrder.map((process, index) => (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="product-card p-6 group cursor-pointer flex items-center gap-6"
              >
                <img
                  src={process.image}
                  alt={process.title}
                  className="w-32 h-32 object-cover rounded-lg shadow-md hidden md:block"
                />
                <div>
                  <div className="text-4xl mb-4 font-semibold group-hover:scale-110 transition-transform duration-300">
                    {process.number}
                  </div>
                  <h3
                    className={`text-xl font-semibold ${paragraphClasses} mb-3 group-hover:text-blue-600 transition-colors`}
                  >
                    {process.title}
                  </h3>
                  <p className={`${paragraphClasses} text-sm mb-4`}>
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Why Choose <span className={highlightSpanClasses}>Us</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              Excellence in manufacturing, reliability in delivery, and
              innovation in design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group p-4"
              >
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="bg-white rounded-lg w-40 h-40 object-cover flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl  group-hover:scale-110 transform transition-transform duration-300"
                />
                <h3
                  className={`text-xl font-semibold ${paragraphClasses} mb-3`}
                >
                  {highlight.title}
                </h3>
                {highlight.description && (
                  <p className={`${paragraphClasses} text-sm`}>
                    {highlight.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Inspiring Customer{" "}
              <span className={highlightSpanClasses}>using our Product</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              Hear what our valued clients have to say about their experience
              with Krishna Labels Inc.
            </p>
          </motion.div>

          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-[26rem] mx-auto bg-white/80 rounded-xl p-4 shadow-md border border-blue-100">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-full shadow-md">
                <img
                  src="/Googlelogo.webp"
                  alt="Krishna Labels Logo"
                  className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                  style={{ borderRadius: "0.75rem" }}
                />
              </div>
              <div className="flex flex-col items-center justify-center sm:items-start flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 text-yellow-400 text-2xl">
                  <div className="flex items-center gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <StarIcon
                        key={i}
                        color="#FFC83D"
                        fill="#FFC83D"
                        className="w-6 h-6 sm:w-7 sm:h-7"
                      />
                    ))}
                    <StarIcon
                      color="#FFC83D"
                      fill="#FFC83D"
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      style={{ clipPath: "inset(0 40% 0 0)" }}
                    />
                  </div>
                  <span className="ml-2 text-lg sm:text-xl text-gray-700 font-bold">
                    4.9
                  </span>
                  <span className="text-base text-gray-500">/ 5.0</span>
                </div>
                <span className="text-xs sm:text-sm text-center text-gray-500 mt-1">
                  Average Customer Rating
                </span>
                <span className="inline-flex items-center bg-blue-50 text-blue-700 font-semibold text-xs px-2.5 py-1 rounded-full mt-2 shadow-sm border border-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-3-3.87m6 5.87v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8z"
                    />
                    re
                  </svg>
                  800+ Reviews
                </span>
              </div>
            </div>
            <div>
              <a
                href="https://www.google.com/search?sca_esv=11f057e0db4ad2a5&rlz=1C1GCEB_enIN1167IN1167&sxsrf=AE3TifNXBRxyITWLRQtSF7mFDO94LuditQ:1752045363974&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1R2OHy4YPw2rsQb06vrNSXYDZllYK5y1jH-PgzoKmcGmLfa_HpHCKEOpEXYi_zkqYl9x7fWLVgyvEIGUdDgMgbB5fKrdenafL2RLhOM4yBqltq0Ng%3D%3D&q=Krishna+Labels+Inc+Reviews&sa=X&ved=2ahUKEwjeg7PMna-OAxW9xzgGHQMsKzgQ0bkNegQIVRAE&biw=1280&bih=897&dpr=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-poppins rounded-full shadow-lg transition-colors duration-300">
                  Write a Review
                </Button>
              </a>
            </div>
          </div>

          <div className="overflow-hidden relative w-full">
            <div
              className="flex gap-8 animate-testimonial-slide"
              style={{
                width: `${testimonials.length * 2 * 400}px`,
                animation: `testimonial-slide ${
                  testimonials.length * 3
                }s linear infinite`,
              }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={`${testimonial._id || testimonial.id || index}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col flex-shrink-0 w-[42rem] h-[850px]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <img
                      src="\Google__G__logo.svg.png"
                      alt="Google Review"
                      className="w-8 h-8 rounded-full object-contain bg-white shadow"
                    />
                    <div className="flex gap-1">
                      {[...Array(Number(testimonial.star) || 5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          color="#FFC83D"
                          fill="#FFC83D"
                          className="w-4 h-4"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-700 flex-grow line-clamp-6 leading-relaxed mb-4">
                    {testimonial.message}
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                      {testimonial.avatar ||
                        (testimonial.name &&
                          testimonial.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase())}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add CSS for testimonial animation */}
            <style>{`
              @keyframes testimonial-slide {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-testimonial-slide {
                will-change: transform;
              }
              .line-clamp-6 {
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            `}</style>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-gray-500">
                <span className="text-yellow-400">14+ Years</span> of Excellence
              </h2>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed font-poppins">
                Since 2008, Krishna Labels Inc has been at the forefront of
                textile manufacturing innovation, serving clients across the
                Indian Subcontinent with unwavering commitment to quality.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { number: "14+", label: "Years Experience" },
                  { number: "1000+", label: "Clients" },
                  { number: "50+", label: "Countries Served" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 hover:bg-white/20 transition-colors duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-roboto-slab font-bold text-yellow-400 mb-2">
                      <AnimatedCounter targetNumber={stat.number} />
                    </div>
                    <div className="text-gray-500 text-sm font-poppins">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-6 pl-12 mt-8"
              >
                <img src="/iso.png" alt="ISO certified" className="w-24" />
                <img
                  src="/oeko.png"
                  alt="Oeko-Tex certified"
                  className="w-40"
                />
              </motion.div>
            </motion.div>

            {/* RIGHT: Image with Logo Overlay */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-2xl">
                {/* <img
                  src=""
                  alt="World Map"
                  className="w-full h-auto"
                />
                <img
                  src=""
                  alt="Company Logo"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-28 md:w-56"
                /> */}
                <img
                  src="/worldmap (1).png"
                  className="w-full h-auto"
                  alt="worldmap"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-roboto-slab font-bold mb-12 text-center">
            Our <span className="text-yellow-400">Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Block 1: ISO Certification */}
            <div className="flex flex-col md:flex-row items-center bg-white/10 rounded-xl p-8 shadow-lg">
              <img
                src="/iso.png"
                alt="ISO Certified"
                className="w-32 h-32 object-contain mb-6 md:mb-0 md:mr-8 rounded-lg bg-white p-2"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                  ISO 9001:2015 Certified
                </h3>
                <p className="mb-4 text-blue-100 font-poppins">
                  Our manufacturing processes are ISO 9001:2015 certified,
                  ensuring the highest standards of quality management and
                  consistency in every product we deliver.
                </p>
                <a
                  href="/isoCertified.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2">
                    View Certification
                  </Button>
                </a>
              </div>
            </div>
            {/* Block 2: OEKO-TEX Certification */}
            <div className="flex flex-col md:flex-row items-center bg-white/10 rounded-xl p-8 shadow-lg">
              <img
                src="/oeko.png"
                alt="OEKO-TEX Certified"
                className="w-32 h-32 object-contain mb-6 md:mb-0 md:mr-8 rounded-lg bg-white p-2"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                  OEKO-TEX® Standard 100
                </h3>
                <p className="mb-4 text-blue-100 font-poppins">
                  Certified to OEKO-TEX® Standard 100, our products are tested
                  for harmful substances and produced in environmentally
                  friendly and socially responsible facilities.
                </p>
                <a
                  href="/oekoCertified.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2">
                    View Certification
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
