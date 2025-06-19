import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';

const ContactMap = () => {
  const { toast } = useToast();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-roboto-slab font-bold text-navy-blue mb-4">
            Find <span className="text-blue-600">Our Location</span>
          </h2>
          <p className="text-dark-gray font-poppins text-lg">
            Visit our manufacturing facility to see our operations firsthand
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy-blue mb-2 font-poppins">Interactive Map</h3>
              <p className="text-dark-gray mb-4 font-poppins">
                Embedded Google Map will be displayed here.
              </p>
              <Button
                onClick={() => toast({
                  title: "🚧 Feature Coming Soon!",
                  description: "Google Maps integration isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                })}
                className="bg-blue-600 hover:bg-blue-700 font-poppins"
              >
                View on Google Maps
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMap;