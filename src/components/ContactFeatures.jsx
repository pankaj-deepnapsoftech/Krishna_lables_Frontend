import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, MessageCircle } from 'lucide-react';

const FeatureItem = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    className="text-center group p-4"
  >
    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 transition-colors group-hover:scale-110 transform transition-transform shadow-md">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-navy-blue mb-3 group-hover:text-blue-600 transition-colors font-poppins">
      {title}
    </h3>
    <p className="text-dark-gray font-poppins">
      {description}
    </p>
  </motion.div>
);

const ContactFeatures = () => {
  const features = [
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: 'Quality Assurance',
      description: 'ISO certified manufacturing processes'
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-500" />,
      title: 'Worldwide Shipping',
      description: 'Delivery with secure packaging'
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-green-500" />,
      title: 'Dedicated Support',
      description: 'Prompt assistance for all your queries'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-roboto-slab font-bold text-navy-blue mb-4">
            Why Choose <span className="text-blue-600">Krishna Labels Inc</span>
          </h2>
          <p className="text-dark-gray max-w-2xl mx-auto font-poppins text-lg">
            Experience the difference with our commitment to quality, service, and customer satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} {...feature} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactFeatures;