import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import ContactFeatures from '@/components/ContactFeatures';
import ContactMap from '@/components/ContactMap';

const Contact = () => {
  const sectionTitleClasses = "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const highlightSpanClasses = "text-blue-600";

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <section className="py-8 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-roboto-slab text-gray-500 font-bold mb-6">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-poppins">
              Get in touch with our team to discuss your requirements and receive a customized quote
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-xl p-8 md:p-10"
            >
              <h2 className={`text-3xl font-roboto-slab font-bold text-navy-blue mb-6`}>
                Send us a <span className={highlightSpanClasses}>Message</span>
              </h2>
              <p className="text-dark-gray mb-8 font-poppins">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className={`text-3xl font-roboto-slab font-bold text-navy-blue mb-6`}>
                  Get in <span className={highlightSpanClasses}>Touch</span>
                </h2>
                <p className="text-dark-gray text-lg leading-relaxed mb-8 font-poppins">
                  We're here to help you with all your textile accessory needs. 
                  Reach out to us through any of the following channels.
                </p>
              </div>
              <ContactInfo />
            </motion.div>
          </div>
        </div>
      </section>

      <ContactFeatures />
      <ContactMap />
    </div>
  );
};

export default Contact;