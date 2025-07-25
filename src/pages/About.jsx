import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Globe,
  Clock,
  CheckCircle,
  Target,
  Eye,
  Briefcase,
  Zap,
  BarChart,
} from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const About = () => {
  const milestones = [
    {
      year: "2010",
      event: "Krishna Labels Inc Founded",
      description: "",
      icon: <Briefcase className="w-6 h-6 timeline-dot-icon" />,
    },
    {
      year: "2012",
      event: "First Export Order",
      description: "Successfully delivered our first order",
      icon: <Globe className="w-6 h-6 timeline-dot-icon" />,
    },
    {
      year: "2015",
      event: "ISO Certification",
      description: "Achieved ISO certification for quality management systems",
      icon: <Award className="w-6 h-6 timeline-dot-icon" />,
    },
    {
      year: "2018",
      event: "Expanded Product Range",
      description: "Introduced metal badges and promotional key rings",
      icon: <BarChart className="w-6 h-6 timeline-dot-icon" />,
    },
    {
      year: "2020",
      event: "Digital Transformation",
      description: "Implemented advanced manufacturing technologies",
      icon: <Zap className="w-6 h-6 timeline-dot-icon" />,
    },
    {
      year: "2024",
      event: "Global Recognition",
      description: "Serving 50+ countries with premium quality products",
      icon: <CheckCircle className="w-6 h-6 timeline-dot-icon" />,
    },
  ];

  const values = [
    {
      icon: <Award className="w-10 h-10 text-yellow-500" />,
      title: "Quality Excellence",
      description:
        "Committed to delivering products that exceed global quality standards",
    },
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "Customer Focus",
      description:
        "Building lasting relationships through exceptional service and support",
    },
    {
      icon: <Globe className="w-10 h-10 text-green-500" />,
      title: "Global Reach",
      description:
        "Global reach, trusted by clients across India and around the world.",
    },
    {
      icon: <Clock className="w-10 h-10 text-purple-500" />,
      title: "Timely Delivery",
      description:
        "Ensuring on-time delivery with secure packaging and logistics",
    },
  ];

  const stats = [
    { number: "14+", label: "Years of Excellence" },
    { number: "1000+", label: "Satisfied Clients" },
    { number: "50+", label: "Countries Served" },
    { number: "100%", label: "Quality Assurance" },
  ];

  const sectionTitleClasses =
    "text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-navy-blue";
  const sectionSubtitleClasses =
    "text-xl text-dark-gray max-w-3xl mx-auto font-poppins";
  const paragraphClasses = "text-dark-gray leading-relaxed font-poppins";
  const highlightSpanClasses = "text-blue-600";

  return (
    <div className="pt-24 md:pt-28 min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <section className="py-16 bg-gradient-elegant text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-roboto-slab text-gray-500 font-bold mb-6">
              About <span className="text-yellow-400">Krishna Labels Inc</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-poppins">
              Distinguished manufacturer & exporter of premium-quality textile
              accessories since 2010
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`${sectionTitleClasses}`}>
                Our <span className={highlightSpanClasses}>Story</span>
              </h2>
              <div className={`space-y-6 ${paragraphClasses}`}>
                <p>
                  Krishna Labels INC has been incepted in the year 2010 and
                  since then every day efficiently engaged in manufacturing and
                  exporting superior quality in maintaining our line of products
                  which includes Clothing Labels and Tags, Printed and Woven
                  Labels and Barcode Stickers. All these products are served
                  based on clients specification. We have a team of quality
                  analyst to check the quality of our products and we also hold
                  an expertise in the fabrication of all our ranges.
                </p>
                <p>
                  At Krishna Labels INC we follow a strong business ethics and
                  wish to mark a strong position in this sector. With the help
                  of our team of experts that holds rich expertise in this
                  domain we are being assisted in understanding the market norms
                  as well as the requirements of our clients. These labels are
                  made using superior quality materials that are sourced from
                  our vendors and are hence appreciated for its colour fastness,
                  resistance against water and weather, brightness and clarity.
                  Our team keep ourselves abreast with industry standards to
                  meet the changing requirements of our clients in the best
                  possible manner.
                </p>
                <p>
                  With the farsightedness of our mentor Mr. Raja Mallick and
                  with his guidance we have build for ourselves a level of high
                  grade strategies. Our is a group of well experienced staff and
                  their expertise that guide us how to fulfill the client's
                  needs without any obstacles.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-xl"
                alt="Krishna Labels Inc manufacturing facility with modern textile production equipment"
                src="/aboutji.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              We Specialize <span className={highlightSpanClasses}>In</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              Our expertise spans across various textile accessories with
              precision and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Designer Labels & Tags",
              "Woven & Printed Ribbons",
              "Custom Fashion Badges & Metal Badges",
              "Promotional & Functional Key Rings",
            ].map((specialization, index) => (
              <motion.div
                key={specialization}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3
                  className={`text-lg font-semibold ${paragraphClasses} group-hover:text-blue-600 transition-colors`}
                >
                  {specialization}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${sectionTitleClasses}`}>
              Our <span className={highlightSpanClasses}>Values</span>
            </h2>
            <p className={`${sectionSubtitleClasses}`}>
              The principles that guide our commitment to excellence and
              customer satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group p-4"
              >
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-50 transition-colors group-hover:scale-110 transform  shadow-md">
                  {value.icon}
                </div>
                <h3
                  className={`text-xl font-semibold ${paragraphClasses} mb-3 group-hover:text-blue-600 transition-colors`}
                >
                  {value.title}
                </h3>
                <p className={`${paragraphClasses} text-sm`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-elegant text-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-roboto-slab font-bold mb-6 text-gray-500">
              Our <span className="text-yellow-400">Journey</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-poppins">
              Key milestones that shaped Krishna Labels Inc into the industry
              leader we are today
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-400/50 hidden md:block rounded-full"></div>

            <div className="space-y-16 md:space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`md:flex items-center relative mb-12 md:mb-0 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  <div className="md:w-5/12">
                    <div
                      className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#504c4c4d] shadow-xl ${
                        index % 2 === 0 ? "md:ml-10" : "md:mr-10"
                      }`}
                    >
                      <h3 className="text-2xl font-roboto-slab font-bold text-yellow-400 mb-2">
                        {milestone.year}
                      </h3>
                      <h4 className="text-xl font-semibold text-gray-500 mb-3 font-poppins">
                        {milestone.event}
                      </h4>
                      <p className="text-gray-500 font-poppins text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex md:w-2/12 items-center justify-center">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full border-4 border-gray-800 shadow-lg z-10 flex items-center justify-center text-gray-800">
                      {milestone.icon}
                    </div>
                  </div>

                  <div className="md:w-5/12"></div>

                  <div className="md:hidden mt-4 flex items-center">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-gray-800 shadow-lg z-10 flex items-center justify-center text-gray-800 mr-4">
                      {milestone.icon}
                    </div>
                    <hr className="border-yellow-400/50 flex-grow" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-roboto-slab font-bold mb-6">
              Our <span className="text-yellow-400">Achievements</span>
            </h2>
            <p className="text-xl text-blue-100 font-poppins">
              Numbers that reflect our commitment to excellence and customer
              satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className="text-5xl md:text-6xl font-roboto-slab font-bold text-yellow-400 mb-4">
                  <AnimatedCounter targetNumber={stat.number} />
                </div>
                <div className="text-blue-100 text-lg font-poppins">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50 p-8 md:p-12 rounded-xl shadow-lg flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-md">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h3
                className={`text-3xl font-roboto-slab font-bold ${paragraphClasses} mb-6`}
              >
                Our Mission
              </h3>
              <p className={`${paragraphClasses} text-lg`}>
                To be the leading manufacturer and exporter of premium textile
                accessories, delivering innovative solutions that exceed
                customer expectations while maintaining the highest standards of
                quality, sustainability, and ethical practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-yellow-50 p-8 md:p-12 rounded-xl shadow-lg flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto lg:mx-0 mb-8 shadow-md">
                <Eye className="w-12 h-12 text-yellow-600" />
              </div>
              <h3
                className={`text-3xl font-roboto-slab font-bold ${paragraphClasses} mb-6`}
              >
                Our Vision
              </h3>
              <p className={`${paragraphClasses} text-lg`}>
                To become the most trusted global partner for textile
                accessories, recognized for our innovation, quality, and
                commitment to customer success. We envision a future where
                Krishna Labels Inc sets the industry standard for excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
