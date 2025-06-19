import { useFormik } from 'formik';
import React, { useState } from 'react'
import { validationSchema } from '../../Validations/AddBlogValidations';
import axiosHandler from '../../config/Axioshandler';

const AddBlog = () => {
    const [selectedFile, setSelectedFile] = useState(null); 

    const formik = useFormik({
        initialValues: {
            title: '',
            author: 'Admin',
            content: '',
            coverImage: '',
            tags: '',
            status: 'New',
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('author', values.author);
                formData.append('content', values.content);
                formData.append('tags', values.tags);
                formData.append('status', values.status);

                if (selectedFile) {
                    formData.append('coverImage', selectedFile);
                }
                const res = await axiosHandler.post('/api/blogs', formData,)
                formik.resetForm()
                console.log(res?.data);
            } catch (error) {
                console.log('Upload error:', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-8">

          
            <div>
                <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">Blog Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block font-medium mb-1 text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter blog title"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="author" className="block font-medium mb-1 text-gray-700">
                            Author
                        </label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Author name"
                        />
                        {formik.touched.author && formik.errors.author && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.author}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="content" className="block font-medium mb-1 text-gray-700">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows="6"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your blog content here..."
                        />
                        {formik.touched.content && formik.errors.content && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.content}</p>
                        )}
                    </div>
                </div>
            </div>

         
            <div>
                <h2 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">Metadata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="coverImage" className="block font-medium mb-1 text-gray-700">
                            Cover Image File
                        </label>
                        <input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.coverImage && formik.errors.coverImage && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.coverImage}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="tags" className="block font-medium mb-1 text-gray-700">
                            Tags (comma separated)
                        </label>
                        <input
                            id="tags"
                            name="tags"
                            type="text"
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. tech, javascript, react"
                        />
                        {formik.touched.tags && formik.errors.tags && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.tags}</p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="status" className="block font-medium mb-1 text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full border px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="New">New</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                        </select>
                        {formik.touched.status && formik.errors.status && (
                            <p className="text-red-600 text-sm mt-1">{formik.errors.status}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition"
                >
                    Submit Blog
                </button>
            </div>
        </form>

    );
};


export default AddBlog