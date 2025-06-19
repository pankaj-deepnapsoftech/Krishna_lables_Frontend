import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Feature Coming Soon!",
      description: "Contact form submission isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input w-full px-4 py-3"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
          Subject *
        </label>
        <select
          name="subject"
          id="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="form-input w-full px-4 py-3"
        >
          <option value="">Select a subject</option>
          <option value="product-inquiry">Product Inquiry</option>
          <option value="custom-quote">Custom Quote Request</option>
          <option value="bulk-order">Bulk Order</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="support">Technical Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="form-input w-full px-4 py-3 resize-none"
          placeholder="Tell us about your requirements..."
        ></textarea>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 text-lg group font-poppins"
      >
        Send Message
        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
};

export default ContactForm;