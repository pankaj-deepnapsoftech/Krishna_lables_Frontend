import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FloatingWhatsAppButton = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "🚧 WhatsApp Chat Coming Soon!",
      description: "This feature isn't implemented yet—but you can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-20 right-6 md:bottom-6 md:right-20 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-50 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-7 h-7" />
    </motion.button>
  );
};

export default FloatingWhatsAppButton;