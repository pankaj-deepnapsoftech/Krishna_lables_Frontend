import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'


import axiosHandler from '../../config/Axioshandler';
import { Archive, Edit, LayoutList, Trash2 } from 'lucide-react';
import { useAuthContext } from '../../Context/authcontext';
import Paginations from '../Paginations';
import AddBlogValidation from '../../Validations/AddBlogValidations';


const ManageBlog = () => {

    const [showForm, setShowForm] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [blogData, setBlogData] = useState([])
    const [expandedRows, setExpandedRows] = useState({});
    const [editTable, setEditTable] = useState(null)
    const { token } = useAuthContext()
    const [page, setPage] = useState(1)
    const toggleExpand = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };


    const formik = useFormik({
        initialValues: {
            title: editTable?.title || '',
            author: editTable?.author || 'Admin',
            content: editTable?.content || '',
            coverImage: editTable?.coverImage || '',
            tags: editTable?.tags || '',
            status: editTable?.status || 'New',
            _id: editTable?._id || ''
        },
        enableReinitialize: true,
        // validationSchema: AddBlogValidation,
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
                if (editTable) {

                    await axiosHandler.put(`/api/blogs/${values._id}`, formData);
                } else {
                    await axiosHandler.post(`/api/blogs`, formData);
                }

                setShowForm(false);
                setEditTable(null);
                setSelectedFile(null);
                formik.resetForm();
                getData();

            } catch (error) {
                console.log('Upload error:', error.response?.data || error.message);
            }
        }



    });

    const getData = async () => {

        try {
            const res = await axiosHandler.get(`/api/blogs?page=${page}&limit=10`)
            setBlogData(res?.data)
        } catch (error) {
            console.log(error)
        }
    }


    const DeleteBlogData = async (_id) => {
        try {
            if (window.confirm("Are you sure you want to delete the blog data?")) {
                const res = await axiosHandler.delete(`/api/blogs/${_id}`)
                getData()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            getData(page);
        }
    }, [page, token])

 console.log(blogData)
    return (
        <section className=" bg-gray-50">
            <div className="w-full px-6 pb-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3"><LayoutList className='text-sky-600' />  Manage Blog</h1>
                    <button
                        onClick={() => { setShowForm(true); setEditTable(null) }}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        + Add Blog
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="min-w-full bg-white border border-gray-200 whitespace-nowrap">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Author</th>
                                <th className="px-6 py-3 text-left">Content</th>
                                <th className="px-6 py-3 text-left">Cover Image</th>
                                <th className="px-6 py-3 text-left">Tags</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData?.map((blog, index) => (
                                <tr key={blog._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-3">{blog.title}</td>
                                    <td className="px-6 py-3">{blog.author}</td>
                                    <td className="px-6 py-3 w-64 overflow-hidden">
                                        <div className="text-sm text-gray-800">
                                            {expandedRows[index]
                                                ? blog.content
                                                : `${blog.content.slice(0, 20)}${blog.content.length > 20 ? '.....' : ''}`}
                                            {blog.content.length > 10 && (
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className="ml-2 text-blue-500 hover:underline text-sm"
                                                >
                                                    {expandedRows[index] ? 'Show less' : 'Show more'}
                                                </button>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-3">
                                        {blog.coverImage ? (
                                            <img
                                                src={blog.coverImage}
                                                alt="Cover"
                                                className="w-20 h-14 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">No Image</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-3">{blog.tags}</td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${blog.status === 'Published'
                                                ? 'bg-green-100 text-green-700'
                                                : blog.status === 'Draft'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {blog.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button
                                            className="text-sm text-blue-600 hover:underline"
                                            onClick={() => { setEditTable(blog); setShowForm(true); setSelectedFile(null); }}
                                        >
                                            <Edit size={20} />
                                        </button>
                                        <button
                                            className="ml-4 text-sm text-red-600 hover:underline"
                                            onClick={() => DeleteBlogData(blog._id)}
                                        >
                                            <Archive size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <div className={`   ${showForm ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 ease-in-out fixed inset-0 z-50 flex justify-end`}>
                    <div className="relative bg-white w-full max-w-md h-screen overflow-y-auto shadow-lg transform transition-transform duration-500 ease-in-out translate-x-0">


                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-500 hover:text-gray-800 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="p-6 space-y-8 mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Blog</h2>


                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter blog title"
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                                )}
                            </div>


                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Author</label>
                                <input
                                    id="author"
                                    name="author"
                                    type="text"
                                    value={formik.values.author}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Author name"
                                />
                            </div>


                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="4"
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Write your blog content here..."
                                />
                                {formik.touched.content && formik.errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
                                )}
                            </div>


                            <div>
                                <label className="block font-semibold text-gray-800 mb-2">Cover Image</label>

                                {/* Upload Box */}
                                <div className="relative border-2 border-dashed border-blue-300 rounded-lg p-4 flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition cursor-pointer">
                                    <input
                                        id="coverImage"
                                        name="coverImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedFile(e.currentTarget.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={!!selectedFile || !!editTable?.coverImage} 
                                    />
                                    <p className={`text-sm font-medium ${selectedFile || editTable?.coverImage ? 'text-gray-400' : 'text-blue-600'}`}>
                                        {selectedFile || editTable?.coverImage
                                            ? 'Image already uploaded'
                                            : 'Click or drag & drop to upload image'}
                                    </p>
                                </div>



                                {(selectedFile || editTable?.coverImage) && (
                                    <div className="mt-4 relative group">
                                        <img
                                            src={
                                                selectedFile
                                                    ? URL.createObjectURL(selectedFile)
                                                    : editTable.coverImage
                                            }
                                            alt="Preview"
                                            className="w-full max-w-xs h-48 object-cover rounded-lg shadow-lg border"
                                        />
                                        <button
                                            onClick={() => {
                                                setSelectedFile(null);
                                                setEditTable((prev) => ({ ...prev, coverImage: '' }));
                                            }}
                                            type="button"
                                            className="absolute top-2 right-2 bg-white hover:bg-red-100 text-red-500 border border-red-300 rounded-full w-8 h-8 shadow transition opacity-0 group-hover:opacity-100"
                                            title="Remove image"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                            </div>


                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Tags</label>
                                <input
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    value={formik.values.tags}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. tech, react"
                                />
                            </div>


                            <div>
                                <label className="block font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="New">New</option>
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>


                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded shadow font-semibold transition"
                                >
                                    Submit Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {blogData?.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                        No blog data found.
                    </p>
                )}

            </div>
            <Paginations page={page} setPage={setPage} hasNextPage={blogData?.length === 10} />
        </section>


    );
};


export default ManageBlog