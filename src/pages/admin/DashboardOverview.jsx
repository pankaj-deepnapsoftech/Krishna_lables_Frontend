import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare as MessageSquareText,
  Package,
  HelpCircle,
  Mail,
  Box,
  TrendingUp,
  TrendingDown,
  Activity,
  ShoppingBag,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import axiosHandler from '../../config/Axioshandler';
import { useAuthContext } from '../../Context/authcontext';

// Icon mapping
const iconMap = {
  MessageSquareText,
  Package,
  HelpCircle,
  Mail,
  Box,
  Activity
};

// Key-to-UI mapping
const keyMap = {
  Quick_Quotes: {
    title: "Quick Quotes",
    icon: "MessageSquareText",
    bgColor: "bg-gradient-to-r from-teal-400 to-teal-300",
    color: "text-white",
  },
  product_quotes: {
    title: "Product Quotes",
    icon: "Package",
    bgColor: "bg-gradient-to-r from-blue-400 to-blue-300",
    color: "text-white",
  },
  Help_Enquiries: {
    title: "Help Enquiries",
    icon: "HelpCircle",
    bgColor: "bg-gradient-to-r from-green-400 to-green-300",
    color: "text-white",
  },
  contacts: {
    title: "Contact Enquiries",
    icon: "Mail",
    bgColor: "bg-gradient-to-r from-orange-400 to-orange-300",
    color: "text-white",
  },
  products: {
    title: "Total Products",
    icon: "Box",
    bgColor: "bg-gradient-to-r from-purple-400 to-purple-300",
    color: "text-white",
  },
  blog: {
    title: "Blog Posts",
    icon: "Activity",
    bgColor: "bg-gradient-to-r from-slate-400 to-slate-300",
    color: "text-white",
  },
};

// Animation variant
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

// Chart placeholder component
const ChartPlaceholder = ({ title, icon: Icon }) => (
  <Card className="admin-card col-span-1 md:col-span-2 lg:col-span-3">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-base font-medium text-text-charcoal">{title}</CardTitle>
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
    </CardHeader>
    <CardContent>
      <div className="chart-placeholder flex flex-col items-center justify-center py-8">
        <BarChart3 className="text-primary opacity-50 mb-2 h-8 w-8" />
        <span className="text-sm text-muted-foreground">{title} Chart - Coming Soon!</span>
      </div>
      <p className="text-xs text-muted-foreground pt-2">Dynamic chart data will be displayed here.</p>
    </CardContent>
  </Card>
);

const DashboardOverview = () => {
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState([]);
  const { token } = useAuthContext();

  const GetDashboardData = async () => {
    try {
      const res = await axiosHandler.get("/api/dashboard");
      const rawData = res?.data?.data || {};

      const transformed = Object.entries(rawData).map(([key, value]) => {
        const config = keyMap[key] || {
          title: key,
          icon: "Activity",
          bgColor: "bg-muted",
          color: "text-muted-foreground",
        };

        return {
          title: config.title,
          value,
          icon: config.icon,
          trend: "up", 
          trendValue: "+0%", 
          bgColor: config.bgColor,
          color: config.color,
        };
      });

      setDashboardData(transformed);
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      GetDashboardData();
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 md:space-y-8"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-text-charcoal">Dashboard Overview</h1>

     
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
        {dashboardData.map((card, index) => {
          const Icon = iconMap[card.icon] || Activity;
          return (
            <motion.div
              key={card.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className={`rounded-md  shadow-md hover:scale-105 transition-transform duration-300 ${card.bgColor || ''}`}>
                <CardHeader className="flex flex-row justify-between items-start pb-1.5">
                  <div className={`text-3xl font-bold ${card.color || ''} text-right`}>{card.value}</div>
                  <div className='flex gap-2 items-center'>
                    <CardTitle className={`text-sm font-medium ${card.color || ''}`}>{card.title}</CardTitle>
                    <Icon className={`h-5 w-5 mt-1 ${card.color || 'text-muted-foreground'} opacity-80`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-end text-xs text-white pt-1">
                    {card.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
                    {card.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
                    {card.trend === "neutral" && <Activity className="h-4 w-4 text-gray-500 mr-1" />}
                    <span className="font-semibold">{card.trendValue}</span>
                    <span className="ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>


      {/* Charts Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <ChartPlaceholder title="Enquiry Trends (Last 30 Days)" icon={BarChart3} />
        <ChartPlaceholder title="Product Quotes by Category" icon={ShoppingBag} />
        <ChartPlaceholder title="Enquiry Status Breakdown" icon={PieChartIcon} />
      </motion.div> */}

      {/* Recent Activity */}
      {/* <motion.div
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
              {[
                { id: 1, icon: MessageSquareText, text: "New Quick Quote from John D.", time: "2 min ago", type: "Quick Quote" },
                { id: 2, icon: Package, text: "Product Quote approved for 'Woven Labels'", time: "15 min ago", type: "Product Quote" },
                { id: 3, icon: HelpCircle, text: "Help Enquiry #42 marked as resolved.", time: "1 hour ago", type: "Help Enquiry" },
                { id: 4, icon: Box, text: "New product 'Premium Hang Tags' added.", time: "3 hours ago", type: "Product" },
                { id: 5, icon: Mail, text: "Contact form submission from Jane S.", time: "5 hours ago", type: "Contact Enquiry" },
              ].map((activity, index) => (
                <motion.li
                  key={activity.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center p-3 -m-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
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
                  <Button variant="ghost" size="sm" className="ml-auto text-xs text-primary">View</Button>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div> */}
    </motion.div>
  );
};

export default DashboardOverview;
