
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Eye, MessageCircle, ArchiveX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

const contactEnquiriesData = [
  { id: 1, name: "General Inquiry Co.", email: "info@general.com", subject: "Partnership Proposal", message: "We would like to discuss a potential partnership...", date: "2025-06-17", status: "New" },
  { id: 2, name: "Feedback Giver", email: "feedback@example.com", subject: "Website Feedback", message: "Love the new design! One small suggestion...", date: "2025-06-16", status: "Read" },
  { id: 3, name: "Press Contact", email: "media@news.com", subject: "Media Enquiry", message: "Requesting an interview with your CEO.", date: "2025-06-15", status: "Replied" },
];

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
    case 'Read': return 'status-read';
    case 'Replied': return 'status-replied';
    default: return 'text-muted-foreground bg-muted';
  }
};

const AdminContactEnquiries = () => {
  const { toast } = useToast();

  const handleActionClick = (action, id) => {
    toast({
      title: `${action} Clicked`,
      description: `🚧 Action '${action}' for Contact Enquiry ID ${id} isn't implemented yet. You can request it! 🚀`,
    });
  };

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
                {contactEnquiriesData.map((enquiry, index) => (
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

                    <TableCell className="text-muted-foreground text-sm py-4 pr-2">
                      {enquiry.date}
                    </TableCell>

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
                      <div className="flex justify-end items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-accent hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('View', enquiry.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-purple-500 hover:text-purple-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('Reply', enquiry.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('Delete', enquiry.id)}
                        >
                          <ArchiveX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>

          </div>
          {contactEnquiriesData.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No contact enquiries found.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminContactEnquiries;
