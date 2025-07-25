import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PackageSearch, Eye, Edit, Trash2, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axiosHandler from "../../config/Axioshandler";
import { useAuthContext } from "../../Context/authcontext";
import Paginations from "../Paginations";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "status-pending";
    case "Approved":
      return "status-approved";
    case "Shipped":
      return "status-shipped";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const AdminProductQuotes = () => {
  const [productQuoteData, setProductQuoteData] = useState([]);
  const { token } = useAuthContext();
  const [page, setPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  const GetProductQuote = async () => {
    setLoading(true);
    try {
      const res = await axiosHandler.get(`/api/quotes?page=${page}&limit=10`);
      console.log(res?.data);
      setProductQuoteData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const DeleteData = async (_id) => {
    setLoading(true);
    try {
      if (window.confirm("are you sure you want to delete the data?")) {
        const res = await axiosHandler.delete(`/api/quotes/${_id}`);
        GetProductQuote();
        toast.success(res?.data?.message);
        console.log(res?.data);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      GetProductQuote(page);
    }
  }, [token, page]);

  const [remarkModal, setRemarkModal] = useState({
    open: false,
    quoteId: null,
    remark: "",
  });

  const handleOpenRemarkModal = (quoteId, remark) => {
    setRemarkModal({ open: true, quoteId, remark: remark || "" });
  };

  const handleCloseRemarkModal = () => {
    setRemarkModal({ open: false, quoteId: null, remark: "" });
  };
  

  const handleRemarkChange = (e) => {
    setRemarkModal((prev) => ({ ...prev, remark: e.target.value }));
  };

  const handleSaveRemark = async (_id) => {
    setLoading(true);
    try {
      const res = await axiosHandler.patch(`/api/quotes/${_id}`, {
        remark: remarkModal.remark,
      });

      if (res.data) {
        toast.success(res?.data?.message || "Remark updated successfully");
        handleCloseRemarkModal();
        GetProductQuote();
      }
    } catch (error) {
      toast.error(error?.message || "Error updating remark");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-roboto-slab font-bold text-text-charcoal flex items-center">
              <PackageSearch className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
              Product Quote Requests
            </h1>
          </div>

          <Card className="admin-card overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-semibold text-text-charcoal">
                All Product Quotes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-gray-200 shadow-sm bg-white">
                <Table className="min-w-full divide-y divide-gray-200">
                  <TableHeader>
                    <TableRow className="bg-gray-100 border-b border-gray-300">
                      <TableHead className="text-muted-foreground font-semibold text-left px-4 py-3">
                        Product Name
                      </TableHead>
                      <TableHead className="text-muted-foreground text-center font-semibold px-4 py-3">
                        Quantity
                      </TableHead>
                      <TableHead className="text-muted-foreground text-center font-semibold px-4 py-3">
                        Product Image
                      </TableHead>
                      <TableHead className="text-muted-foreground hidden md:table-cell font-semibold px-4 py-3">
                        Customer
                      </TableHead>
                      <TableHead className="text-muted-foreground hidden lg:table-cell font-semibold px-4 py-3">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold px-4 py-3">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold px-4 py-3">
                        Address
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold px-4 py-3">
                        Mobile No
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold px-4 py-3">
                        Remark
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground font-semibold px-4 py-3">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {productQuoteData?.map((quote, index) => (
                      <motion.tr
                        key={quote.id}
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className={`border-b last:border-b-0 transition-colors hover:bg-blue-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <TableCell
                          className="font-medium text-foreground py-4 px-4 max-w-xs truncate"
                          title={quote.productName}
                        >
                          {quote.productName}
                        </TableCell>

                        <TableCell className="text-muted-foreground text-center py-4 px-4">
                          {quote.quantity}
                        </TableCell>

                        <TableCell className="text-muted-foreground text-center py-4 px-4">
                          <img
                            src={quote.image}
                            alt={quote.productName}
                            className="mx-auto h-14 w-14 rounded-md object-cover border border-gray-300 shadow-sm"
                            loading="lazy"
                          />
                        </TableCell>

                        <TableCell
                          className="text-muted-foreground hidden md:table-cell py-4 px-4 max-w-xs truncate"
                          title={quote.name}
                        >
                          {quote.name}
                        </TableCell>

                        <TableCell
                          className="text-muted-foreground hidden lg:table-cell py-4 px-4 max-w-xs truncate"
                          title={quote.email}
                        >
                          {quote.email}
                        </TableCell>

                        <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">
                          {new Date(quote.dateAdded).toLocaleDateString()}
                        </TableCell>

                        <TableCell
                          className="text-muted-foreground lg:table-cell py-4 px-4 "
                          title={quote.address}
                        >
                          <div className="text-sm text-gray-800">
                            {expandedRows[index]
                              ? quote.address
                              : `${quote.address.slice(0, 20)}${
                                  quote.address.length > 20 ? "....." : ""
                                }`}
                            {quote.address.length > 10 && (
                              <button
                                onClick={() => toggleExpand(index)}
                                className="ml-2 text-blue-500 hover:underline text-sm"
                              >
                                {expandedRows[index]
                                  ? "Show less"
                                  : "Show more"}
                              </button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">
                          {quote.phone}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleOpenRemarkModal(
                                quote._id,
                                quote.remark || ""
                              )
                            }
                            className="text-blue-600 border-blue-400"
                          >
                            View Remark
                          </Button>
                        </TableCell>

                        <TableCell className="text-center py-4 px-4">
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-red-500 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                              onClick={() => DeleteData(quote._id)}
                              aria-label={`Delete quote for ${quote.productName}`}
                            >
                              <Archive size={20} />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {productQuoteData?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No product quote requests found.
                </p>
              )}
            </CardContent>
          </Card>
          <Paginations
            page={page}
            setPage={setPage}
            hasNextPage={productQuoteData?.length === 10}
          />
        </motion.div>
      )}

      {remarkModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Add/Edit Remark</h2>
            <textarea
              className="w-full border rounded p-2 min-h-[80px] mb-4"
              value={remarkModal.remark}
              onChange={handleRemarkChange}
              placeholder="Write your remark here..."
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleCloseRemarkModal}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSaveRemark(remarkModal.quoteId)}
                disabled={loading || !remarkModal.remark.trim()}
              >
                Save
              </Button>
            </div>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
                <Loader />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductQuotes;
