import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Globe, Clock, Users, CheckCircle, Star, ShieldCheck, MessageSquare } from 'lucide-react';

const Home = () => {
  const productCategories = [
    {
      title: 'Woven & Printed Labels',
      description: 'Premium quality fabric labels with custom designs',
      icon: '🏷️'
    },
    {
      title: 'Designer Tags',
      description: 'Elegant tags for fashion and luxury brands',
      icon: '🎨'
    },
    {
      title: 'Fancy Ribbons',
      description: 'Decorative ribbons for various applications',
      icon: '🎀'
    },
    {
      title: 'Fashion Badges',
      description: 'Custom badges for apparel and accessories',
      icon: '⭐'
    },
    {
      title: 'CUSTOM LABELS',
      description:
        'Premium woven and satin labels tailored to represent your brand identity. Durable, detailed, and fully customizable.',
      icon: '📛'
    },
    {
      title: 'HANG TAG',
      description:
        'Styiish and professional hang tags for garments, accessories, and more — available in various shapes, sizes, and finishes.',
      icon: '🏷️'
    },
    {
      title: 'PRINTED RIBBON',
      description:
        'High-quality printed ribbons perfect for branding, packaging, or decorative uses.',
      icon: '🎀'
    },
    {
      title: 'PAPER BAG',
      description:
        'Eco-friendly, strong, and beautifully printed paper bags suitable for retail, gifting, or promotions.',
      icon: '🛍️'
    },
    {
      title: 'Promotional Key Rings',
      description: 'Custom key rings for marketing and branding',
      icon: '🔑'
    }
  ];

  const highlights = [
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: 'Global Quality Standards',
      description: 'ISO certified manufacturing processes'
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: 'Timely Delivery',
      description: 'On-time delivery guaranteed worldwide'
    },
    {
      icon: <Users className="w-10 h-10 text-green-500" />,
      title: 'Custom Designs',
      description: 'Tailored solutions for every requirement'
    },
    {
      icon: <Globe className="w-10 h-10 text-purple-500" />,
      title: 'Export Reach',
      description: 'Serving Indian Subcontinent & Europe'
    }
  ];

  const testimonials = [
    {
      quote: "Krishna Labels transformed our branding with their high-quality custom tags. Exceptional service and timely delivery!",
      name: "Aarav Sharma",
      company: "CEO, Fashion Forward Ltd.",
      avatar: "AS"
    },
    {
      quote: "The attention to detail on their woven labels is unmatched. Our products now have a premium feel thanks to Krishna Labels.",
      name: "Priya Singh",
      company: "Designer, Aura Collections",
      avatar: "PS"
    },
    {
      quote: "Reliable, innovative, and always exceeding expectations. Krishna Labels is our go-to for all textile accessories.",
      name: "Rajesh Kumar",
      company: "Procurement Head, EuroTextiles Inc.",
      avatar: "RK"
    }
  ];
  
  const sectionTitleClasses = "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const sectionSubtitleClasses = "text-xl text-dark-gray max-w-3xl mx-auto font-poppins";
  const paragraphClasses = "text-dark-gray leading-relaxed font-poppins";
  const highlightSpanClasses = "text-blue-600";


  return (
    <div className="pt-20 md:pt-24">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img  
            className="w-full h-full object-cover" 
            alt="Modern textile manufacturing facility with workers creating premium labels and tags"
           src="https://images.unsplash.com/photo-1610891015188-5369212db097" />
          <div className="hero-overlay absolute inset-0"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-roboto-slab font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Premium <span className="text-yellow-400">Labels</span> & <span className="text-yellow-400">Tags</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed font-poppins"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Distinguished manufacturer & exporter of premium-quality labels, tags, ribbons, badges, and key rings since 2010
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/products">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black  px-8 py-4 text-lg group font-poppins">
                  Explore Our Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-poppins transition-colors duration-300"
                >
                  Request a Quote
                </Button>

              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute top-20 left-10 opacity-20">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 bg-yellow-400/50 rounded-lg "
          ></motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
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
            <h2 className={`${sectionTitleClasses}`}>Our Product <span className={highlightSpanClasses}>Categories</span></h2>
            <p className={`${sectionSubtitleClasses}`}>
              Comprehensive range of premium textile accessories designed to meet global quality standards 
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
                <h3 className={`text-xl font-semibold ${paragraphClasses} mb-3 group-hover:text-blue-600 transition-colors`}>
                  {category.title}
                </h3>
                <p className={`${paragraphClasses} text-sm mb-4`}>
                  {category.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 font-poppins text-sm">
                  View More <ArrowRight className="ml-2 w-4 h-4" />
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
            <h2 className={`${sectionTitleClasses}`}>Why Choose <span className={highlightSpanClasses}>Krishna Labels</span></h2>
            <p className={`${sectionSubtitleClasses}`}>
              Excellence in manufacturing, reliability in delivery, and innovation in design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group p-4"
              >
                <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow group-hover:scale-110 transform transition-transform duration-300">
                  {highlight.icon}
                </div>
                <h3 className={`text-xl font-semibold ${paragraphClasses} mb-3`}>
                  {highlight.title}
                </h3>
                <p className={`${paragraphClasses} text-sm`}>
                  {highlight.description}
                </p>
              </motion.div>
            ))}
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
            <h2 className={`${sectionTitleClasses}`}>Client <span className={highlightSpanClasses}>Testimonials</span></h2>
            <p className={`${sectionSubtitleClasses}`}>
              Hear what our valued clients have to say about their experience with Krishna Labels.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <MessageSquare className="w-10 h-10 text-blue-500 mb-6" />
                <p className={`${paragraphClasses} text-md italic mb-6 flex-grow`}>"{testimonial.quote}"</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className={`font-semibold ${paragraphClasses}`}>{testimonial.name}</p>
                    <p className={`${paragraphClasses} text-sm`}>{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                Since 2010, Krishna Labels has been at the forefront of textile manufacturing innovation, 
                serving clients across the Indian Subcontinent and Europe with unwavering commitment to quality.
              </p>
              <div className="space-y-4">
                {[
                  'Sister concern of Dalmack Auto Electric Pvt. Ltd.',
                  'ISO 9001:2015 Certified Manufacturing',
                  'Global Quality Standards Compliance (OEKO-TEX)',
                  'Timely and Secure Deliveries Worldwide'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <ShieldCheck className="w-7 h-7 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-500 font-poppins">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { number: '14+', label: 'Years Experience' },
                { number: '1000+', label: 'Happy Clients' },
                { number: '50+', label: 'Countries Served' },
                { number: '24/7', label: 'Customer Support' }
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
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm font-poppins">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-roboto-slab font-bold mb-6">
              Ready to Start Your <span className="text-yellow-400">Project</span>?
            </h2>
            <p className="text-xl mb-8 text-blue-100 font-poppins">
              Get in touch with our team to discuss your requirements and receive a customized quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black  px-8 py-4 text-lg font-poppins">
                  Get Quote Now
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-poppins transition-colors duration-300"
                >
                  View Products
                </Button>

              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;