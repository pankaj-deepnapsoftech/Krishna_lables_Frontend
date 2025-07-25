import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useFormik } from 'formik';
import axiosHandler from '../config/Axioshandler';
import { contactValidationSchema } from '../Validations/ContactFormValidations';
import { toast } from 'react-toastify';

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
   validationSchema: contactValidationSchema,
  onSubmit: async(value) =>{
     try {
       const res = await axiosHandler.post('/api/contacts/', value);
       toast.success("Thanks for reaching out! We'll be in touch soon.");
      formik.resetForm()
     } catch (error) {
      console.log(error)
       toast.error(error?.message)
     }
  }
 })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
          >
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input w-full px-4 py-3 ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
            placeholder="Your full name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
          >
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input w-full px-4 py-3 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
            placeholder="your@email.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input w-full px-4 py-3 ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : ""
            }`}
            placeholder="+91 8750762762"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            id="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-input w-full px-4 py-3 ${
              formik.touched.company && formik.errors.company
                ? "border-red-500"
                : ""
            }`}
            placeholder="Your company name"
          />
          {formik.touched.company && formik.errors.company && (
            <p className="text-xs text-red-500 mt-1">{formik.errors.company}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
        >
          Subject *
        </label>
        <select
          name="subject"
          id="subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-input w-full px-4 py-3 ${
            formik.touched.subject && formik.errors.subject
              ? "border-red-500"
              : ""
          }`}
        >
          <option value="">Select a subject</option>
          <option value="product-inquiry">Product Inquiry</option>
          <option value="custom-quote">Custom Quote Request</option>
          <option value="bulk-order">Bulk Order</option>
          <option value="partnership">Partnership Opportunity</option>
          <option value="support">Technical Support</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.subject && formik.errors.subject && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-dark-gray mb-2 font-poppins"
        >
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={5}
          className={`form-input w-full px-4 py-3 resize-none ${
            formik.touched.message && formik.errors.message
              ? "border-red-500"
              : ""
          }`}
          placeholder="Tell us about your requirements..."
        ></textarea>
        {formik.touched.message && formik.errors.message && (
          <p className="text-xs text-red-500 mt-1">{formik.errors.message}</p>
        )}
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
 