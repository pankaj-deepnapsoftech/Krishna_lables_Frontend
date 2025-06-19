
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare as MessageSquareText, Package, HelpCircle, Mail, Box, TrendingUp, TrendingDown, Activity, Users, ShoppingBag, BarChart3, PieChart as PieChartIcon, ListChecks } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';

// Placeholder Chart Component
const ChartPlaceholder = ({ title, icon: Icon }) => (
  <Card className="admin-card col-span-1 md:col-span-2 lg:col-span-3">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-base font-medium text-text-charcoal">{title}</CardTitle>
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
    </CardHeader>
    <CardContent>
      <div className="chart-placeholder">
        <BarChart3 className="text-primary opacity-50" />
        <span>{title} Chart - Coming Soon!</span>
      </div>
      <p className="text-xs text-muted-foreground pt-2">Dynamic chart data will be displayed here.</p>
    </CardContent>
  </Card>
);


const summaryCardsData = [
  {
    title: "Quick Quotes",
    value: "125",
    icon: MessageSquareText,
    trend: "up",
    trendValue: "+5%",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-teal-400  to-teal-300",
    // border:"border border-[#e0b35e]"
  },
  {
    title: "Product Quotes",
    value: "88",
    icon: Package,
    trend: "down",
    trendValue: "-2%",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-blue-400  to-blue-300"
  },
  {
    title: "Help Enquiries",
    value: "42",
    icon: HelpCircle,
    trend: "up",
    trendValue: "+10%",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-green-400  to-green-300"
  },
  {
    title: "Contact Enquiries",
    value: "67",
    icon: Mail,
    trend: "neutral",
    trendValue: "0%",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-orange-400  to-orange-300"
  },
  {
    title: "Total Products",
    value: "230",
    icon: Box,
    trend: "up",
    trendValue: "+15",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-purple-400  to-purple-300"
  },
  {
    title: "New Today",
    value: "12",
    icon: Activity,
    trend: "up",
    trendValue: "+3",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-slate-400  to-slate-300"
  }
]


const recentActivityData = [
  { id: 1, icon: MessageSquareText, text: "New Quick Quote from John D.", time: "2 min ago", type: "Quick Quote" },
  { id: 2, icon: Package, text: "Product Quote approved for 'Woven Labels'", time: "15 min ago", type: "Product Quote" },
  { id: 3, icon: HelpCircle, text: "Help Enquiry #42 marked as resolved.", time: "1 hour ago", type: "Help Enquiry" },
  { id: 4, icon: Box, text: "New product 'Premium Hang Tags' added.", time: "3 hours ago", type: "Product" },
  { id: 5, icon: Mail, text: "Contact form submission from Jane S.", time: "5 hours ago", type: "Contact Enquiry" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const DashboardOverview = () => {
  const { toast } = useToast();

  const handleActionClick = (item) => {
    toast({
      title: `Activity Clicked: ${item.type}`,
      description: `🚧 Details for "${item.text}" aren't implemented yet. 🚀`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8"
    >
      <h1 className="text-2xl md:text-3xl font-roboto-slab font-bold text-text-charcoal">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
        {summaryCardsData.map((card, index) => (
          <motion.custom
            key={card.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            component={Card}
            className={`w-full  ${card.bgColor} ${card.border} rounded-md shadow-md hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
              <CardTitle className={`text-sm font-medium ${card.color}`}>{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color} opacity-80`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              <div className="flex items-center text-xs text-muted-foreground pt-1">
                {card.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-green-500 mr-1" />}
                {card.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-500 mr-1" />}
                {card.trend === "neutral" && <Activity className="h-3.5 w-3.5 text-gray-500 mr-1" />}
                <span className=' text-white'>{card.trendValue}</span>
                <span className="ml-1 text-white">vs last period</span>
              </div>
            </CardContent>
          </motion.custom>
        ))}
      </div>

      {/* Charts & Graphs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <ChartPlaceholder title="Enquiry Trends (Last 30 Days)" icon={BarChart3} />
        <ChartPlaceholder title="Product Quotes by Category" icon={ShoppingBag} />
        <ChartPlaceholder title="Enquiry Status Breakdown" icon={PieChartIcon} />
      </motion.div>
      
      {/* Recent Activity Feed */}
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-text-charcoal">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">Latest actions and updates in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recentActivityData.map((activity, index) => (
                <motion.li
                  key={activity.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => handleActionClick(activity)}
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time} - {activity.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs text-primary ">View</Button>
                </motion.li>
              ))}
            </ul>
            {recentActivityData.length === 0 && (
                <p className="text-center text-muted-foreground py-6">No recent activity.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
};

export default DashboardOverview;
