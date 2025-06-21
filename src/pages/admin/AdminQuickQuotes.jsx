
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
  const [page, setPage] = useState(1)
  // const { toast } = useToast();


  // const handleActionClick = (action, id) => {
  //   toast({
  //     title: `${action} Clicked`,
  //     description: `🚧 Action '${action}' for Quick Quote ID ${id} isn't implemented yet. You can request it! 🚀`,
  //   });
  // };


  const toggleExpand = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };



  
  const GetQuickQuotesData = async () => {
    try {
      const res = await axiosHandler.get(`/api/help/get-quites?page=${page}&limit=10`)
      setQuickQuotesData(res?.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const hanldeDelete = async (_id) => {
    try {
      if (window.confirm("Are you sure you want to delete the data?")) {
         await axiosHandler.delete(`/api/help/delete/${_id}`)
        }
        GetQuickQuotesData()
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (token) {
      GetQuickQuotesData(page)
    }
  }, [page, token])
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
          <MessageSquareQuote className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
          Quick Quote Requests
        </h1>
      </div>

      <Card className="admin-card overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl font-semibold text-text-charcoal">All Quick Quotes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0">
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Mobile No</TableHead>
                  <TableHead className="text-muted-foreground">Message Preview</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  {/* <TableHead className="text-muted-foreground hidden sm:table-cell">Status</TableHead> */}
                  <TableHead className="text-center text-muted-foreground">Actions</TableHead>
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
                    <TableCell className="font-medium text-foreground py-3 pr-2">{quote.name}</TableCell>
                    <TableCell className="text-muted-foreground py-3 pr-2">{quote.mobile}</TableCell>
                  <TableCell className="px-6 py-3 w-64 overflow-hidden">
                                       <div className="text-sm text-gray-800">
                                         {expandedRows[index]
                                           ? quote.message
                                           : `${quote.message.slice(0, 20)}${quote.message.length > 20 ? '.....' : ''}`}
                                         {quote.message.length > 10 && (
                                           <button
                                             onClick={() => toggleExpand(index)}
                                             className="ml-2 text-blue-500 hover:underline text-sm"
                                           >
                                             {expandedRows[index] ? 'Show less' : 'Show more'}
                                           </button>
                                         )}
                                       </div>
                                     </TableCell>
                 <TableCell className="text-muted-foreground text-sm py-4 px-4 whitespace-nowrap">{new Date(quote.dateAdded).toLocaleDateString()}</TableCell>
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
            <p className="text-center text-muted-foreground py-8">No quick quote requests found.</p>
          )}
        </CardContent>
      </Card>

      <Paginations page={page} setPage={setPage} hasNextPage={quickQuotesData?.length === 10} />
    </motion.div>
  );
};

export default AdminQuickQuotes;
