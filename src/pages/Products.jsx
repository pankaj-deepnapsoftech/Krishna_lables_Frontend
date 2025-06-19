import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Filter, Grid, List, Search, Star, ArrowRight } from 'lucide-react';
import { DialogContent } from '../components/ui/dialog';

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'labels', name: 'Labels' },
    { id: 'tags', name: 'Tags' },
    { id: 'ribbons', name: 'Ribbons' },
    { id: 'badges', name: 'Badges' },
    { id: 'keyrings', name: 'Key Rings' }
  ];

  const products = [
    {
      id: 1,
      name: 'Woven Labels',
      category: 'labels',
      description: 'Premium quality woven labels with custom designs and superior durability',
      features: ['Custom Designs', 'Fade Resistant', 'Soft Touch'],
      rating: 4.9,
      popular: true
    },
    {
      id: 2,
      name: 'Printed Labels',
      category: 'labels',
      description: 'High-resolution printed labels perfect for detailed graphics and text',
      features: ['High Resolution', 'Vibrant Colors', 'Quick Turnaround'],
      rating: 4.8,
      popular: false
    },
    {
      id: 3,
      name: 'Designer Tags',
      category: 'tags',
      description: 'Elegant designer tags that add premium appeal to your products',
      features: ['Luxury Finish', 'Custom Shapes', 'Premium Materials'],
      rating: 4.9,
      popular: true
    },
    {
      id: 4,
      name: 'Hang Tags',
      category: 'tags',
      description: 'Professional hang tags with various finishing options',
      features: ['Multiple Sizes', 'Various Finishes', 'String Options'],
      rating: 4.7,
      popular: false
    },
    {
      id: 5,
      name: 'Fancy Ribbons',
      category: 'ribbons',
      description: 'Decorative ribbons for packaging and promotional purposes',
      features: ['Satin Finish', 'Custom Colors', 'Various Widths'],
      rating: 4.8,
      popular: true
    },
    {
      id: 6,
      name: 'Grosgrain Ribbons',
      category: 'ribbons',
      description: 'Durable grosgrain ribbons with excellent texture and finish',
      features: ['Textured Surface', 'Strong Hold', 'Color Fast'],
      rating: 4.6,
      popular: false
    },
    {
      id: 7,
      name: 'Fashion Badges',
      category: 'badges',
      description: 'Trendy fashion badges for apparel and accessories',
      features: ['Modern Designs', 'Easy Application', 'Durable'],
      rating: 4.8,
      popular: true
    },
    {
      id: 8,
      name: 'Metal Badges',
      category: 'badges',
      description: 'Premium metal badges with superior finish and durability',
      features: ['Metal Construction', 'Premium Finish', 'Long Lasting'],
      rating: 4.9,
      popular: false
    },
    {
      id: 9,
      name: 'Promotional Key Rings',
      category: 'keyrings',
      description: 'Custom key rings perfect for promotional and branding purposes',
      features: ['Custom Branding', 'Durable Materials', 'Various Styles'],
      rating: 4.7,
      popular: true
    },
    {
      id: 10,
      name: 'Metal Key Rings',
      category: 'keyrings',
      description: 'High-quality metal key rings with premium finish',
      features: ['Metal Construction', 'Engraving Options', 'Premium Quality'],
      rating: 4.8,
      popular: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewMore = (productName) => {
    toast({
      title: "🚧 Feature Coming Soon!",
      description: `Detailed view for ${productName} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
    });
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const sectionTitleClasses = "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const paragraphClasses = "text-dark-gray leading-relaxed font-poppins";
  const highlightSpanClasses = "text-blue-600";

  
  useEffect(() => {
    if (showForm) {

      document.body.style.overflow = 'hidden';
    } else {

      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showForm]);

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <section className="py-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-roboto-slab text-gray-500 font-bold mb-6">
              Our <span className="text-yellow-400">Products</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-poppins">
              Discover our comprehensive range of premium textile accessories designed to meet global quality standards
            </p>
          </motion.div>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-dark-gray"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilter(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 font-poppins text-sm ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                title="List View"
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-gray-200'
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
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
              }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`product-card group ${viewMode === 'list' ? 'flex flex-col md:flex-row items-center' : ''
                    }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-1/3 flex-shrink-0 h-48 md:h-full' : 'h-56'
                    }`}>
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={`${product.name} - Premium quality textile accessory`}
                      src="https://images.unsplash.com/photo-1618749126494-52dd55a238bc" />

                    {product.popular && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-md font-poppins">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Popular
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-md font-poppins text-dark-gray">
                      <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                      {product.rating}
                    </div>
                  </div>

                  <div className={`p-6 flex flex-col flex-grow ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                    <h3 className={`text-xl font-semibold ${paragraphClasses} mb-2 group-hover:text-blue-600 transition-colors`}>
                      {product.name}
                    </h3>
                    <p className={`${paragraphClasses} text-sm mb-4 leading-relaxed flex-grow`}>
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium font-poppins"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => setShowForm(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors group font-poppins mt-auto"
                    >
                      Get Quote
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
              <h3 className={`text-xl font-semibold ${paragraphClasses} mb-2`}>No products found</h3>
              <p className={`${paragraphClasses} text-sm`}>Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
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
              Our team specializes in creating custom textile accessories tailored to your specific requirements
            </p>
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg font-poppins"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "Custom quote request isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
              })}
            >
              Request Custom Quote
            </Button>
          </motion.div>
        </div>
      </section>

      <section
        className={`${showForm ? 'opacity-100 visible' : 'opacity-0 invisible'
          } fixed inset-0 flex justify-center  items-center z-50 transition-opacity duration-500 bg-black/70 ease-in-out `}
      >
        <div className="bg-white max-w-md w-full mx-4 rounded-xl shadow-2xl p-6 border border-gray-200 relative">
          <header className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-sky-600">Get Custom Assistance</h2>
            <p className="text-sm text-gray-500 mt-1">
              Our team will get back to you with the best options for your needs.
            </p>
          </header>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setShowForm(false);
            }}
          >
            <div className="space-y-1">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your number"
                required
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                required
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                Product
              </label>
              <input
                type="text"
                id="product"
                name="product"
                readOnly
                defaultValue="Custom Labels"
                className="w-full px-4 py-2 border rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>

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
        </div>
      </section>



    </div>
  );
};

export default Products;