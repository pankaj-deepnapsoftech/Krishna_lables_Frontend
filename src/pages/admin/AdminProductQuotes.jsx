
import React from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

const productQuotesData = [
  { id: 1, productName: "Woven Labels - Model X", quantity: 5000, customerName: "Fashion Co.", email: "orders@fashionco.com", date: "2025-06-17", status: "Pending" },
  { id: 2, productName: "Printed Satin Labels", quantity: 10000, customerName: "Luxury Brands Inc.", email: "procurement@luxury.com", date: "2025-06-15", status: "Approved" },
  { id: 3, productName: "Custom Hang Tags", quantity: 2000, customerName: "Boutique Store", email: "info@boutiquestore.com", date: "2025-06-14", status: "Shipped" },
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
    case 'Pending': return 'status-pending';
    case 'Approved': return 'status-approved';
    case 'Shipped': return 'status-shipped';
    default: return 'text-muted-foreground bg-muted';
  }
};

const AdminProductQuotes = () => {
  const { toast } = useToast();

  const handleActionClick = (action, id) => {
    toast({
      title: `${action} Clicked`,
      description: `🚧 Action '${action}' for Product Quote ID ${id} isn't implemented yet. You can request it! 🚀`,
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
          <PackageSearch className="w-7 h-7 md:w-8 md:h-8 mr-3 text-primary" />
          Product Quote Requests
        </h1>
      </div>

      <Card className="admin-card overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl font-semibold text-text-charcoal">All Product Quotes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-muted/20">
                  <TableHead className="text-muted-foreground font-semibold">Product Name</TableHead>
                  <TableHead className="text-muted-foreground text-center font-semibold">Quantity</TableHead>
                  <TableHead className="text-muted-foreground hidden md:table-cell font-semibold">Customer</TableHead>
                  <TableHead className="text-muted-foreground hidden lg:table-cell font-semibold">Email</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Date</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                  <TableHead className=" text-center text-muted-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {productQuotesData.map((quote, index) => (
                  <motion.tr
                    key={quote.id}
                    custom={index}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    className="border-b last:border-b-0 transition-colors hover:bg-muted/40 whitespace-nowrap"
                  >
                    <TableCell className="font-medium text-foreground py-4 pr-2">{quote.productName}</TableCell>
                    <TableCell className="text-muted-foreground text-center py-4 pr-2">{quote.quantity}</TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell py-4 pr-2">{quote.customerName}</TableCell>
                    <TableCell className="text-muted-foreground hidden lg:table-cell py-4 pr-2">{quote.email}</TableCell>
                    <TableCell className="text-muted-foreground text-sm py-4 pr-2">{quote.date}</TableCell>
                    <TableCell className="py-4 pr-2">
                      <span className={cn(
                        'px-2 py-1 text-xs font-semibold rounded-full capitalize',
                        getStatusClass(quote.status)
                      )}>
                        {quote.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 pl-2">
                      <div className="flex justify-end items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-accent hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('View', quote.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-secondary hover:text-yellow-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('Edit', quote.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-red-400 hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors"
                          onClick={() => handleActionClick('Delete', quote.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>

          </div>
           {productQuotesData.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No product quote requests found.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminProductQuotes;
