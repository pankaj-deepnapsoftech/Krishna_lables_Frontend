import { motion } from "framer-motion";
import { Mail, Archive } from "lucide-react";
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
import { useEffect, useState } from "react";
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

const AdminContactEnquiries = () => {
  const [ContactData, setContactData] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const GetContactData = async () => {
    setLoading(true);
    try {
      const res = await axiosHandler.get(`/api/contacts?page=${page}&limit=10`);
      setContactData(res.data);
      // toast.success(res?.data?.message || "Contact data fetched successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to fetch contact data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      if (window.confirm("Are you sure you want to delete this message?")) {
        const res = await axiosHandler.delete(`/api/contacts/${_id}`);
        toast.success(res?.data?.message || "Contact deleted successfully");
        GetContactData(); // Fetch updated contact data
      }
    } catch (error) {
      toast.error(error?.message || "Failed to delete contact");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "status-new";
      case "Read":
        return "status-read";
      case "Replied":
        return "status-replied";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  useEffect(() => {
    if (token) {
      GetContactData();
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
      const res = await axiosHandler.put(`/api/contacts/${_id}`, {
        remark: remarkModal.remark, // Ensure remark is included
      });
      // toast.success(res?.data?.message || "Remark updated successfully");
      GetContactData(); // Correctly call GetContactData to refresh the contact data
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
              <Mail className="w-7 h-7 md:w-8 md:h-8 mr-3 text-orange-500" />
              Contact Us Enquiries
            </h1>
          </div>

          <Card className="admin-card overflow-hidden">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-semibold text-text-charcoal">
                All Contact Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b bg-muted/20">
                      <TableHead className="text-muted-foreground font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground hidden sm:table-cell font-semibold">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold">
                        Subject
                      </TableHead>
                      <TableHead className="text-muted-foreground hidden md:table-cell font-semibold">
                        Message
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground font-semibold">
                        Remark
                      </TableHead>
                      <TableHead className="text-center text-muted-foreground font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {ContactData?.map((enquiry, index) => (
                      <motion.tr
                        key={enquiry.id}
                        custom={index}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className="border-b whitespace-nowrap last:border-b-0 transition-colors hover:bg-muted/40"
                      >
                        <TableCell className="font-medium text-foreground py-4 pr-2">
                          {enquiry.name}
                        </TableCell>

                        <TableCell className="text-muted-foreground hidden sm:table-cell py-4 pr-2">
                          {enquiry.email}
                        </TableCell>

                        <TableCell className="text-foreground max-w-[180px] truncate py-4 pr-2">
                          {enquiry.subject}
                        </TableCell>
                        <TableCell className="text-muted-foreground hidden md:table-cell text-xs max-w-xs truncate py-4 pr-2">
                          {enquiry.message}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">
                          {new Date(enquiry.dateAdded).toLocaleDateString()}
                        </TableCell>

                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleOpenRemarkModal(
                                enquiry._id,
                                enquiry.remark || ""
                              )
                            }
                            className="text-blue-600 border-blue-400"
                          >
                            View Remark
                          </Button>
                        </TableCell>

                        <TableCell className="text-right py-4 pl-2">
                          <div className="flex justify-center items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                              onClick={() => handleDelete(enquiry._id)}
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
              {ContactData?.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No contact enquiries found.
                </p>
              )}
            </CardContent>
          </Card>
          <Paginations
            page={page}
            setPage={setPage}
            hasNextPage={ContactData?.length === 10}
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

export default AdminContactEnquiries;
