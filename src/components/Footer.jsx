import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, Mail, Phone, MapPin, Globe, Clock, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stitched-wool.png')]"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <Tag className="w-10 h-10 text-yellow-400" />
              <div>
                <span className="text-2xl font-roboto-slab font-bold text-white">
                  Krishna Labels Inc
                </span>
                <p className="text-sm text-gray-400 font-montserrat">
                  Premium Manufacturing
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-poppins">
              Proudly serving as a leading manufacturer and exporter of premium
              labels, tags, ribbons, and metal emblems since 2008
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400 font-poppins">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Established 2010</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <span className="text-xl font-roboto-slab font-semibold text-yellow-400">
              Quick Links
            </span>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Our Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-poppins text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <span className="text-xl font-roboto-slab font-semibold text-yellow-400">
              Our Products
            </span>
            <ul className="space-y-3">
              {[
                "Woven & Printed Labels",
                "Designer Tags",
                "Fancy Ribbons",
                "Fashion Badges",
                "Metal Badges",
                "Promotional Key Rings",
              ].map((product) => (
                <li key={product}>
                  <span className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-poppins text-sm flex items-center group cursor-pointer">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <span className="text-xl font-roboto-slab font-semibold text-yellow-400">
              Contact Info
            </span>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <MapPin className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-poppins">
                  81- A, Vashist Park, Pankha Road, Street No. 12, Vashisht
                  Park, New Delhi, Delhi 110046
                </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <Mail className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-poppins">
                  mallick@krishnalabelsinc.com
                </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <Phone className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-poppins">
                  +91 99110 62762
                </span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700/50 transition-colors">
                <Globe className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm font-poppins">
                  India
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm font-poppins">
              © {new Date().getFullYear()} Krishna Labels Inc. All rights
              reserved.
            </p>
          </div>
        </motion.div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Back to top"
      >
        <ArrowUpCircle className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;