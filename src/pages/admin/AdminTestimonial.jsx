import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Pencil, Trash2, PlusCircle, Speaker, Star } from "lucide-react";
import { toast } from "react-toastify";
import axiosHandler from "@/config/Axioshandler";

const Card = ({ children, ...props }) => (
  <div
    {...props}
    className={"bg-white rounded-lg shadow-lg " + (props.className || "")}
  >
    {children}
  </div>
);
const CardHeader = ({ children, ...props }) => (
  <div {...props} className={"p-4 border-b " + (props.className || "")}>
    {children}
  </div>
);
const CardTitle = ({ children, ...props }) => (
  <div {...props} className={"text-xl font-bold " + (props.className || "")}>
    {children}
  </div>
);
const CardContent = ({ children, ...props }) => (
  <div {...props} className={"p-4 " + (props.className || "")}>
    {children}
  </div>
);
const Table = ({ children, ...props }) => (
  <table
    {...props}
    className={"min-w-full table-auto " + (props.className || "")}
  >
    {children}
  </table>
);
const TableHeader = ({ children, ...props }) => (
  <thead {...props}>{children}</thead>
);
const TableRow = ({ children, ...props }) => <tr {...props}>{children}</tr>;
const TableHead = ({ children, ...props }) => <th {...props}>{children}</th>;
const TableBody = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
);
const TableCell = ({ children, ...props }) => <td {...props}>{children}</td>;
const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
const Loader = () => <div className="text-center py-8">Loading...</div>;

const API_URL = "/api/testimonials";

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    company: "",
    message: "",
    star: "5",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axiosHandler.get(API_URL);
      setTestimonials(res.data.testimonials); // ✅ extract array
    } catch (err) {
      setTestimonials([]);
      toast.error("Failed to fetch testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axiosHandler.put(`${API_URL}/${editingId}`, form);
        toast.success("Testimonial updated successfully");
      } else {
        await axiosHandler.post(API_URL, form);
        toast.success("Testimonial added successfully");
      }
      await fetchTestimonials();
      setShowForm(false);
      setEditingId(null);
      setForm({ name: "", company: "", message: "", star: "5" });
    } catch (err) {
      toast.error("Failed to submit testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setForm({
      name: testimonial.name || "",
      company: testimonial.company || "",
      message: testimonial.message || "",
      star: testimonial.star ? String(testimonial.star) : "5",
    });
    setEditingId(testimonial._id || testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this testimonial? This action cannot be undone."
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      await axiosHandler.delete(`${API_URL}/${id}`);
      toast.success("Testimonial deleted successfully");
      await fetchTestimonials();
    } catch (err) {
      toast.error("Failed to delete testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", company: "", message: "", star: "5" });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <>
      {loading && <Loader />}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={{
          initial: { opacity: 0, y: 20 },
          in: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          },
          out: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3, ease: "easeInOut" },
          },
        }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-roboto-slab font-bold text-text-charcoal flex items-center">
            <Speaker className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
            Manage Testimonials
          </h1>

          <Button
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setForm({
                name: "",   
                company: "", 
                message: "",
                star: "5",
              });
            }}
          >
            <PlusCircle className="w-5 h-5" />
            Add New
          </Button>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 -top-6 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  {editingId ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <Button
                  onClick={handleCancel}
                  className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  ×
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Star</label>
                    <select
                      name="star"
                      value={form.star}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      {[5, 4, 3, 2, 1].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                      Testimonial Content
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end mt-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow"
                  >
                    {editingId ? "Update" : "Add"} Testimonial
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded font-semibold"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Card className="admin-card overflow-hidden">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-semibold text-text-charcoal">
              Manage Testimonial
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-gray-200 shadow-sm bg-white">
              <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader>
                  <TableRow className="bg-gray-100 border-b border-gray-300">
                    <TableHead className="text-muted-foreground font-semibold text-left px-4 py-3">
                      Client name
                    </TableHead>
                    <TableHead className="text-muted-foreground text-center font-semibold px-4 py-3">
                      Star
                    </TableHead>
                    <TableHead className="text-muted-foreground text-center font-semibold px-4 py-3">
                      Message
                    </TableHead>
                    <TableHead className="text-muted-foreground table-cell font-semibold px-4 py-3">
                      Customer
                    </TableHead>
                    <TableHead className="text-muted-foreground table-cell font-semibold px-4 py-3">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center py-8 text-gray-500"
                      >
                        No testimonials found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    testimonials.map((t, index) => {
                      const rowId = t._id || t.id || index;
                      return (
                        <TableRow
                          key={rowId}
                          className={`border-b last:border-b-0 transition-colors hover:bg-blue-50 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <TableCell
                            className="text-muted-foreground table-cell py-4 px-4 max-w-xs truncate"
                            title={t.company}
                          >
                            {t.company}
                          </TableCell>

                          <TableCell className=" text-center py-4 px-4">
                            {[...Array(Number(t.star))].map((_, i) => (
                              <Star
                                key={i}
                                className="inline w-4 h-4 fill-yellow-400"
                              />
                            ))}
                          </TableCell>
                          <TableCell
                            className="text-muted-foreground text-center py-4 px-4 max-w-xs truncate"
                            title={t.message}
                          >
                            {t.message}
                          </TableCell>
                          <TableCell
                            className="text-muted-foreground text-center py-4 px-4 max-w-xs truncate"
                            title={t.name}
                          >
                            {t.name}
                          </TableCell>
                          <TableCell className="text-center py-4 px-4">
                            <div className="flex justify-center items-center gap-2">
                              <Button
                                className="text-blue-600 hover:text-blue-800 p-2"
                                onClick={() => handleEdit(t)}
                                title="Edit"
                              >
                                <Pencil className="w-5 h-5" />
                              </Button>
                              <Button
                                className="text-red-600 hover:text-red-800 p-2"
                                onClick={() => handleDelete(t._id || t.id)}
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default AdminTestimonial;
