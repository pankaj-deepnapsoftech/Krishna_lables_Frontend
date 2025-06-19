
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare as MessageSquareQuote, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

const quickQuotesData = [
  { id: 1, name: "Alice Wonderland", email: "alice@example.com", phone: "555-1234", message: "Need 1000 custom clothing labels urgently. Dimensions 2x5cm, woven.", date: "2025-06-17", status: "New" },
  { id: 2, name: "John Doe", email: "john.doe@example.com", phone: "555-5678", message: "Quote for 500 hang tags, glossy finish, full color.", date: "2025-06-16", status: "Contacted" },
  { id: 3, name: "Jane Smith", email: "jane.smith@example.com", phone: "555-8765", message: "Enquiry about price for 2000 printed satin labels.", date: "2025-06-15", status: "Converted" },
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
    case 'Contacted': return 'status-contacted';
    case 'Converted': return 'status-converted';
    default: return 'text-muted-foreground bg-muted';
  }
};

const AdminQuickQuotes = () => {
  const { toast } = useToast();

  const handleActionClick = (action, id) => {
    toast({
      title: `${action} Clicked`,
      description: `🚧 Action '${action}' for Quick Quote ID ${id} isn't implemented yet. You can request it! 🚀`,
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
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell">Phone</TableHead>
                  <TableHead className="text-muted-foreground">Message Preview</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-center text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {quickQuotesData.map((quote, index) => (
                  <motion.tr
                    key={quote.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors whitespace-nowrap"
                  >
                    <TableCell className="font-medium text-foreground py-3 pr-2">{quote.name}</TableCell>
                    <TableCell className="text-muted-foreground py-3 pr-2">{quote.email}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell py-3 pr-2">{quote.phone}</TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-xs truncate py-3 pr-2">{quote.message}</TableCell>
                    <TableCell className="text-muted-foreground text-sm py-3 pr-2">{quote.date}</TableCell>

                    <TableCell className="hidden sm:table-cell py-3 pr-2">
                      <span
                        className={cn(
                          'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                          getStatusClass(quote.status)
                        )}
                      >
                        {quote.status}
                      </span>
                    </TableCell>

                    <TableCell className="py-3 pl-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-accent hover:bg-transparent focus:bg-transparent active:bg-transparent transition-none"
                        onClick={() => handleActionClick('View', quote.id)}
                      >
                        <Eye size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 text-secondary hover:text-yellow-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-none"
                        onClick={() => handleActionClick('Edit', quote.id)}
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-1 text-destructive hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-none"
                        onClick={() => handleActionClick('Delete', quote.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>


                  </motion.tr>
                ))}
              </TableBody>
            </Table>

          </div>
          {quickQuotesData.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No quick quote requests found.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminQuickQuotes;
