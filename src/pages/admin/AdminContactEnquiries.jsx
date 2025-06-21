

import { motion } from 'framer-motion';
import { Mail, Eye, MessageCircle, ArchiveX, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import axiosHandler from '../../config/Axioshandler';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../Context/authcontext';
import Paginations from '../Paginations';


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
  const { toast } = useToast();
  const [ContactData, setContactData] = useState([])
  const [page, setPage] = useState(1)
  const { token } = useAuthContext()
  const handleActionClick = (action, id) => {
    toast({
      title: `${action} Clicked`,
      description: `🚧 Action '${action}' for Contact Enquiry ID ${id} isn't implemented yet. You can request it! 🚀`,
    });
  };


  const GetContactData = async () => {
    try {
      const res = await axiosHandler.get(`/api/contacts?page=${page}&limit=10`)
      console.log(res?.data)
      setContactData(res.data)

    } catch (error) {
      console.log(error)
    }
  }


  const handleDelete = async (_id) => {
    try {
      if (window.confirm("are you sure you want to delete this message? ")) {
        const res = await axiosHandler.delete(`/api/contacts/${_id}`)
        GetContactData();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'New': return 'status-new';
      case 'Read': return 'status-read';
      case 'Replied': return 'status-replied';
      default: return 'text-muted-foreground bg-muted';
    }
  };



  useEffect(() => {
    if (token) {
      GetContactData(page);
    }
  }, [token, page]);

  return (
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
          <CardTitle className="text-xl font-semibold text-text-charcoal">All Contact Enquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/20">
                  <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-muted-foreground hidden sm:table-cell font-semibold">Email</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Subject</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell font-semibold">Message</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Date</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                  <TableHead className="text-center text-muted-foreground font-semibold">Actions</TableHead>
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
                    <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">{new Date(enquiry.dateAdded).toLocaleDateString()}</TableCell>

                    <TableCell className="py-4 pr-2">
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                          getStatusClass(enquiry.status)
                        )}
                      >
                        {enquiry.status}
                      </span>
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
            <p className="text-center text-muted-foreground py-8">No contact enquiries found.</p>
          )}
        </CardContent>
      </Card>
      <Paginations page={page} setPage={setPage} hasNextPage={ContactData?.length === 10} />
    </motion.div>
  );
};

export default AdminContactEnquiries;
