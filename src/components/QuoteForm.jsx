import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axiosHandler from "../config/Axioshandler";

const QuoteForm = ({ product, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      phone: "",
      email: "",
      address: "",
      status: "",
      product: product?._id || "",
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          quantity: values.quantity,
          productId: product?._id,
          status: values.status,
        };

        await axiosHandler.post("/api/quotes", payload);
        toast.success("Quote submitted successfully!");
        onClose(); // Close modal
        formik.resetForm();
      } catch (error) {
        console.error("Quote submission error:", error);
        toast.error("Something went wrong while submitting the quote.");
      }
    },
  });

  useEffect(() => {
    if (product) {
      formik.setFieldValue("product", product._id);
    }
  }, [product]);

  return (
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      {product && (
        <div className="flex items-center gap-4 mb-4">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-20 h-20 object-cover rounded border shadow"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="name">Customer Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border rounded-md"
          {...formik.getFieldProps("name")}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          required
          className="w-full px-4 py-2 border rounded-md"
          {...formik.getFieldProps("quantity")}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone">Mobile Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-2 border rounded-md"
          {...formik.getFieldProps("phone")}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border rounded-md"
          {...formik.getFieldProps("email")}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          className="w-full px-4 py-2 border rounded-md"
          {...formik.getFieldProps("address")}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          className="px-5 py-2 border rounded-md"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;
