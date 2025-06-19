// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { PlusSquare, UploadCloud, XCircle, Save } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
// import { useFormik } from 'formik';

// const productCategories = [
//   { value: "woven_labels", label: "Woven Labels" },
//   { value: "printed_labels", label: "Printed Labels" },
//   { value: "hang_tags", label: "Hang Tags" },
//   { value: "patches", label: "Patches" },
//   { value: "heat_transfer", label: "Heat Transfer Labels" },
//   { value: "other", label: "Other Accessories" },
// ];

// const formPanelVariants = {
//   hidden: { opacity: 0, x: "100%" },
//   visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 150, damping: 25, duration: 0.3 } },
//   exit: { opacity: 0, x: "100%", transition: { duration: 0.2, ease: "easeIn" } },
// };

// const AdminAddProduct = () => {
//   const { toast } = useToast();
//   const [showForm, setShowForm] = useState(false);
//   const [productImages, setProductImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       category: "",
//       shortDescription: "",
//       longDescription: "",
//       price: "",
//       images: [],
//       status: "Active",
//       dateAdded: new Date().toISOString().split("T")[0],
//     },
//     onSubmit: (values) => {
//       toast({
//         title: "Product Saved",
//         description: `Product "${values.name}" added successfully.`,
//       });
//       console.log("Final Submitted Product:", values);
//       setShowForm(false);
//     },
//   });

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map(file => URL.createObjectURL(file));

//     setProductImages(prev => [...prev, ...files].slice(0, 5));
//     setImagePreviews(prev => [...prev, ...previews].slice(0, 5));

//     formik.setFieldValue("images", [...productImages, ...files].slice(0, 5));
//   };

//   const removeImage = (index) => {
//     const newImages = [...productImages];
//     const newPreviews = [...imagePreviews];
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
//     setProductImages(newImages);
//     setImagePreviews(newPreviews);
//     formik.setFieldValue("images", newImages);
//   };

//   return (
  
//   );
// };

// export default AdminAddProduct;
