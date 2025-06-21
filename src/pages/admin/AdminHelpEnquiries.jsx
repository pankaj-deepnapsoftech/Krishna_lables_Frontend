
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Eye, MessageCircle, Archive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import axiosHandler from '../../config/Axioshandler';
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

const getStatusClass = (status) => {
  switch (status) {
    case 'Open': return 'status-open';
    case 'Answered': return 'status-answered';
    case 'Resolved': return 'status-resolved';
    default: return 'text-muted-foreground bg-muted';
  }
};

const AdminHelpEnquiries = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const { token } = useAuthContext()
  const [helpData, setHelpData] = useState([]) 
  const [page, setPage] = useState(1)

  const toggleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };



  const GetHelpData = async () => {
    try {
      const res = await axiosHandler.get(`/api/help/get-help?page=${page}&limit=10`) 
      setHelpData(res?.data?.data) 
    } catch (error) {
      console.log(error)
    }
  }

 const DeleteData = async (_id) =>{
  try {
   if(window.confirm("are you sure you want to delete the data?")){
     const res = await axiosHandler.delete(`/api/help/delete/${_id}`)
     GetHelpData(page);
   }
  } catch (error) {
    console.log(error)
  }
 }

  useEffect(() => {
    if (token) {
      GetHelpData(page);
    }
  }, [token,page]) 

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
          <HelpCircle className="w-7 h-7 md:w-8 md:h-8 mr-3 text-secondary" />
          Help Enquiries
        </h1>
      </div>

      <Card className="admin-card overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl font-semibold text-text-charcoal">All Help Enquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto whitespace-nowrap">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/20">
                  <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-muted-foreground hidden sm:table-cell font-semibold">Mobile No</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Question</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Date</TableHead>
                  <TableHead className=" text-center text-muted-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {helpData?.map((enquiry, index) => (
                  <motion.tr
                    key={enquiry.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b last:border-b-0 transition-colors hover:bg-muted/40"
                  >
                    <TableCell className="font-medium text-foreground max-w-xs truncate py-4 pr-2">
                      {enquiry.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell py-4 pr-2">
                      {enquiry.mobile}
                    </TableCell>

                    <TableCell className="px-6 py-3 w-64 overflow-hidden">
                      <div className="text-sm text-gray-800">
                        {expandedRows[index]
                          ? enquiry.question
                          : `${enquiry.question.slice(0, 20)}${enquiry.question.length > 20 ? '.....' : ''}`}
                        {enquiry.question.length > 10 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="ml-2 text-blue-500 hover:underline text-sm"
                          >
                            {expandedRows[index] ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">{new Date(enquiry.dateAdded).toLocaleDateString()}</TableCell>
                    {/* <TableCell className="py-4 pr-2">
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                          getStatusClass(enquiry.status)
                        )}
                      >
                        {enquiry.status}
                      </span>
                    </TableCell> */}
                    <TableCell className="text-right py-4 pl-2">
                      <div className="flex justify-center items-center gap-1">
                        
                      
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => DeleteData( enquiry._id)}
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
          {helpData?.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No help enquiries found.</p>
          )}
        </CardContent>
      </Card>
      <Paginations page={page} setPage={setPage} hasNextPage={helpData?.length === 10} />
    </motion.div>
  );
};

export default AdminHelpEnquiries;
