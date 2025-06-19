import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { useFormik } from 'formik';
import axiosHandler from '../config/Axioshandler';

const ContactForm = () => {



 const formik = useFormik({
  initialValues:{
     name: '',
     email: '',
     phone: '',
     company: '',
     subject: '',
     message: ''
  },
  onSubmit: async(value) =>{
     try {
       const res = await axiosHandler.post('/api/contacts/', value);
      formik.resetForm()
     } catch (error) {
      console.log(error)
     }
  }
 })


  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-gray mb-2 font-poppins">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
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
            value={formik.values.email}
            onChange={formik.handleChange}
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
            value={formik.values.phone}
            onChange={formik.handleChange}
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
            value={formik.values.company}
            onChange={formik.handleChange}
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
          value={formik.values.subject}
          onChange={formik.handleChange}
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
          value={formik.values.message}
          onChange={formik.handleChange}
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