import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ListOrdered, Edit, Trash2, Eye, PlusCircle, Search, CheckSquare, XSquare, UploadCloud, Save, XCircle, Archive } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';
import { useFormik } from 'formik';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { productValidationSchema } from '../../Validations/ProductValidations';
import axiosHandler from '../../config/Axioshandler';
import { useAuthContext } from '../../Context/authcontext';
import Paginations from '../Paginations';

const productCategories = [
  { value: 'woven_labels', label: 'Woven Labels' },
  { value: 'printed_labels', label: 'Printed Labels' },
  { value: 'hang_tags', label: 'Hang Tags' },
  { value: 'patches', label: 'Patches' },
  { value: 'heat_transfer', label: 'Heat Transfer Labels' },
  { value: 'other', label: 'Other Accessories' },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeInOut' } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' } }),
};

const formPanelVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, damping: 25, duration: 0.3 } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.2, ease: 'easeIn' } },
};

const AdminManageProducts = () => {
  const { toast } = useToast();

  // State for products & search
  const [ProductData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // State for form visibility
  const [showForm, setShowForm] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editTable, setEditTable] = useState(null)
  const [page, setPage] = useState(1)
  const {token}  = useAuthContext()
  const GetProduct = async () => {
    try {
      const res = await axiosHandler.get(`/api/products?page=${page}&limit=10`);
      setProductData(res.data || []);
    } catch (err) {
      console.error('GetProduct error:', err);
    }
  };

  const toggleStatus = (productId) => {
    setProductData((prev) => {
      const updated = prev.map((p) =>
        p._id === productId
          ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' }
          : p
      );
      const product = updated.find((p) => p._id === productId);
      toast({
        title: 'Status Updated',
        description: `"${product.name}" is now ${product.status}.`,
      });
      return updated;
    });
  };

  // Formik form handler
  const formik = useFormik({
    initialValues: {
      _id: editTable?._id || '',
      name: editTable?.name || '',
      category: editTable?.category || '',
      shortDescription: editTable?.shortDescription || '',
      longDescription: editTable?.longDescription || '',
      price: editTable?.price || '',
      images: editTable?.images || [],
      status: editTable?.status || 'Active',
      dateAdded: editTable?.dateAdded || new Date().toISOString().split('T')[0],
    },
    enableReinitialize: true,
    validationSchema: productValidationSchema,
    onSubmit: async (values, { resetForm }) => {
    
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('category', values.category);
        formData.append('shortDescription', values.shortDescription);
        formData.append('longDescription', values.longDescription);
        formData.append('price', values.price || '');
        formData.append('status', values.status);
        formData.append('dateAdded', values.dateAdded);

        productImages.forEach((file) => {
          formData.append('images', file);
        });
        if (editTable) {
          const res = await axiosHandler.put(`/api/products/${values._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          const res = await axiosHandler.post('/api/products/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
        
        

        resetForm();
        setProductImages([]);
        setImagePreviews([]);
        setEditTable(null);
        setShowForm(false);
        GetProduct();
     
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to save product.' });
        console.error(error);
      }
    },
  });


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    const allFiles = [...productImages, ...files].slice(0, 1);

    setProductImages(allFiles);
    setImagePreviews(previews.slice(0, 1));
    formik.setFieldValue('images', allFiles);

    
    e.target.value = null;
  };
  

  const removeImage = (idx) => {
    const imgs = [...productImages];
    const pres = [...imagePreviews];
    imgs.splice(idx, 1);
    pres.splice(idx, 1);
    setProductImages(imgs);
    setImagePreviews(pres);
    formik.setFieldValue('images', imgs);
  };

  // Filtered list
  const filteredProducts = ProductData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleDelete = async (_id) => {
    try {
      if (window.confirm("are you sure you want to delete product")) {
        const res = await axiosHandler.delete(`/api/products/${_id}`)
      }
      GetProduct();
      console.log(res?.data)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(filteredProducts)


  useEffect(() => {
  if(token){
    GetProduct(page);
  }
  }, [page,token]);

  console.log(ProductData)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out" className="space-y-6">

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="flex items-center text-2xl font-bold">
          <ListOrdered className="mr-2 text-primary" /> Manage Products
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-56 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => { setShowForm(true); setEditTable(null) }} className="bg-primary text-primary-foreground">
            <PlusCircle className="mr-1" /> Add New
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <Card className="overflow-x-auto">
        <CardHeader className="border-b">
          <CardTitle>Product List</CardTitle>
          <CardDescription>View, edit, delete products.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20">
                <TableHead className="hidden sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell text-center">Price</TableHead>
                <TableHead className="hidden lg:table-cell text-center">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date Added</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredProducts.length ? filteredProducts : []).map((product, i) => (
                <motion.tr key={product._id || i} variants={tableRowVariants} initial="hidden" animate="visible" custom={i}>
                  <TableCell className="hidden sm:table-cell p-2">
                    <img src={product.images?.[0]} alt="" className="h-10 w-10 object-cover rounded" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell className="hidden lg:table-cell text-center">{product.price || 'N/A'}</TableCell>
                  <TableCell className="hidden lg:table-cell text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(product._id)}
                      className={cn(
                        'text-xs px-2 py-0.5 rounded-full',
                        product.status === 'Active'
                          ? 'text-green-600 bg-green-100'
                          : 'text-red-600 bg-red-100'
                      )}
                    >
                      {product.status === 'Active' ? <CheckSquare /> : <XSquare />}
                      {product.status}
                    </Button>
                  </TableCell>
                   <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">{new Date(product.dateAdded).toLocaleDateString()}</TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditTable(product);
                      
                     
                        setImagePreviews(product.images); // Only for display
                        setProductImages([]); // No uploaded file yet
                        formik.setFieldValue('images', []); // Reset images field
                      }}
                      
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:text-blue-600 hover:bg-transparent"
                    >
                      <Edit size={20} />
                    </Button>

                    <Button
                      onClick={() => handleDelete(product._id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-600 hover:bg-transparent"
                    >
                      <Archive size={20} />
                    </Button>
                  </TableCell>

                </motion.tr>
              ))}
              {!filteredProducts.length && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              variants={formPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 top-0 z-40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              variants={formPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 flex flex-col shadow-2xl"
            >
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className=" flex flex-row justify-between items-center border-b p-4">
                  <CardTitle>New Product Details</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => { setShowForm(false); formik.resetForm() }}>
                    <XCircle />
                  </Button>
                </CardHeader>
                <form onSubmit={formik.handleSubmit} className="flex-1 overflow-auto p-4">
                  <CardContent className="space-y-5">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        
                        className={cn({ 'border-red-500': formik.touched.name && formik.errors.name })}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formik.values.category}
                        onValueChange={(val) => formik.setFieldValue('category', val)}
                        onBlur={() => formik.setFieldTouched('category', true)}
                      >
                        <SelectTrigger className={cn({ 'border-red-500': formik.touched.category && formik.errors.category })}>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formik.touched.category && formik.errors.category && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.category}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="shortDescription">Short Description</Label>
                      <Textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={formik.values.shortDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength={150}
                        className={cn("h-20", { 'border-red-500': formik.touched.shortDescription && formik.errors.shortDescription })}
                        
                      />
                      {formik.touched.shortDescription && formik.errors.shortDescription && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.shortDescription}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="longDescription">Long Description</Label>
                      <Textarea
                        id="longDescription"
                        name="longDescription"
                        value={formik.values.longDescription}
                        onChange={formik.handleChange}
                        className="h-28"
                        
                      />
                       {formik.touched.longDescription && formik.errors.longDescription && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.longDescription}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        step="0.01"
                        className={cn({ 'border-red-500': formik.touched.price && formik.errors.price })}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-xs text-red-500 mt-1">{formik.errors.price}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="block text-sm font-medium text-gray-700">Product Images</Label>

                      <div className="relative border-2 border-dashed border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                        <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Click or drag & drop up to <strong>1 image</strong></p>

                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={productImages.length >= 1}
                          className={cn(
                            "absolute inset-0 opacity-0 cursor-pointer",
                            productImages.length >= 1 && "cursor-not-allowed"
                          )}
                        />

                      </div>

                      <p className="text-xs text-gray-500">Only 1 image allowed. Recommended format: JPG, PNG. Max size: 2MB.</p>

                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                          {imagePreviews.map((src, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border">
                              <img src={src} alt="Preview" className="w-full h-32 object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <XSquare className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t p-4">
                    <Button variant="outline" onClick={() => { setShowForm(false); formik.resetForm()}}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary text-white">
                      <Save className="mr-1" /> {editTable ? "Update Product" : "Save Product"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Paginations page={page} setPage={setPage} hasNextPage={ProductData?.length === 10} />
    </motion.div>
  );
};

export default AdminManageProducts;
