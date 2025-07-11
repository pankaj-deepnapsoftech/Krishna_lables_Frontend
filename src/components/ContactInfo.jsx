import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactInfoItem = ({ icon, title, details, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-600"
  >
    <div className="flex items-start space-x-4">
      <div className="bg-blue-50 rounded-lg p-3">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-navy-blue mb-2 font-poppins">
          {title}
        </h3>
        <div className="space-y-1 mb-2">
          {details.map((detail, idx) => (
            <p key={idx} className="text-dark-gray font-medium font-poppins">
              {detail}
            </p>
          ))}
        </div>
        <p className="text-dark-gray text-sm font-poppins">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const ContactInfo = () => {
  const { toast } = useToast();
  const contactDetails = [
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: 'Our Location',
      details: ['Manufacturing Unit', 'Industrial Area', 'India'],
      description: 'Visit our state-of-the-art manufacturing facility'
    },
    {
      icon: <Mail className="w-6 h-6 text-green-600" />,
      title: 'Email Us',
      details: ['info@krishnalabels.com', 'sales@krishnalabels.com'],
      description: 'Get in touch via email for detailed inquiries'
    },
    {
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      title: 'Call Us',
      details: ['+91 XXXXX XXXXX', '+91 XXXXX XXXXX'],
      description: 'Speak directly with our sales team'
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM'],
      description: 'We are available during these hours'
    }
  ];

  return (
    <div className="space-y-6">
      {contactDetails.map((info, index) => (
        <ContactInfoItem key={info.title} {...info} delay={index * 0.1} />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: contactDetails.length * 0.1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-green-500 rounded-full p-3">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-navy-blue mb-1 font-poppins">
              WhatsApp Support
            </h3>
            <p className="text-dark-gray text-sm mb-3 font-poppins">
              Get instant support via WhatsApp
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white font-poppins"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "WhatsApp integration isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
              })}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactInfo;