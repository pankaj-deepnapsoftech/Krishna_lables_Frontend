
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare as MessageSquareQuote, Eye, Edit, Trash2, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import axiosHandler from '../../config/Axioshandler';
import { useAuthContext } from '../../Context/authcontext';
import Paginations from '../Paginations';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';



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
    case 'New': return 'status-new';
    case 'Contacted': return 'status-contacted';
    case 'Converted': return 'status-converted';
    default: return 'text-muted-foreground bg-muted';
  }
};

const AdminQuickQuotes = () => {
  const [quickQuotesData, setQuickQuotesData] = useState([])
  const { token } = useAuthContext()
  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const toggleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const GetQuickQuotesData = async () => {
    setLoading(true);
    try {
      const res = await axiosHandler.get(`/api/help/get-quites?page=${page}&limit=10`)
      setQuickQuotesData(res?.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const hanldeDelete = async (_id) => {
    setLoading(true);
    try {
      if (window.confirm("Are you sure you want to delete the data?")) {
        const res = await axiosHandler.delete(`/api/help/delete/${_id}`)
         GetQuickQuotesData();
         toast.success(res?.data?.message)

        }
    } catch (error) {
      console.log(error)
      toast.error(error?.message)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (token) {
      GetQuickQuotesData(page)
    }
  }, [page, token])


  // Modal state for remark
  const [remarkModal, setRemarkModal] = useState({ open: false, quoteId: null, remark: "" });

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
      const res = await axiosHandler.put(`/api/help/update-remark/${_id}`, {
       // send the updated remark
      });
      toast.success(res?.data?.message || "Remark updated");
      GetQuickQuotesData();
      handleCloseRemarkModal();
    } catch (error) {
      toast.error(error?.message || "Failed to update remark");
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
              <MessageSquareQuote className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
              Quick Quote Requests
            </h1>
          </div>

          <Card className="admin-card overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-semibold text-text-charcoal">
                All Quick Quotes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-0">
                      <TableHead className="text-muted-foreground">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Mobile No
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Message Preview
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Remark
                      </TableHead>
                      {/* <TableHead className="text-muted-foreground hidden sm:table-cell">Status</TableHead> */}
                      <TableHead className="text-center text-muted-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {quickQuotesData?.map((quote, index) => (
                      <motion.tr
                        key={quote._id}
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors whitespace-nowrap"
                      >
                        <TableCell className="font-medium text-foreground py-3 pr-2">
                          {quote.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3 pr-2">
                          {quote.mobile}
                        </TableCell>
                        <TableCell className="px-6 py-3 w-64 overflow-hidden">
                          <div className="text-sm text-gray-800">
                            {expandedRows[index]
                              ? quote.message
                              : `${quote.message.slice(0, 20)}${
                                  quote.message.length > 20 ? "....." : ""
                                }`}
                            {quote.message.length > 10 && (
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
                          {new Date(quote.dateAdded).toLocaleDateString()}
                        </TableCell>
                        {/* <TableCell className="hidden sm:table-cell py-3 pr-2">
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                          getStatusClass(quote.status)
                        )}
                      >
                        {quote.status}
                      </span>
                    </TableCell> */}

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

                        <TableCell className="py-3 flex justify-center pl-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 text-destructive hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-none"
                            onClick={() => hanldeDelete(quote._id)}
                          >
                            <Archive size={20} />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {quickQuotesData?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No quick quote requests found.
                </p>
              )}
            </CardContent>
          </Card>

          <Paginations
            page={page}
            setPage={setPage}
            hasNextPage={quickQuotesData?.length === 10}
          />
        </motion.div>
      )}
      {/* Remark Modal */}
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
              readOnly={
                remarkModal.quoteId &&
                !quickQuotesData.find((q) => q._id === remarkModal.quoteId)
              }
            />
            {/* Show fetched remark if available and not editing */}
            {remarkModal.quoteId && (
              <div className="text-xs text-gray-500 mb-2">
                Current Remark:{" "}
                {quickQuotesData.find((q) => q._id === remarkModal.quoteId)
                  ?.remark || "No remark yet."}
              </div>
            )}
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

export default AdminQuickQuotes;
