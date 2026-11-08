"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#00FFA3]/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-[#00FFA3]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-[#00FFA3]/25 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="uppercase text-sm tracking-wider mb-2 text-[#00FFA3]">MY SERVICES</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-teal-400 animate-pulse">Do</span>.
            </h3>
            <p className="text-muted-foreground max-w-md">
              I offer 100% customized fully built responsive websites. Check out some of my services.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <ServiceCard
            title="PORTFOLIO WEBSITE"
            features={["Custom development", "Modern design", "Responsive design", "Private hosting"]}
            index={0}
          />
          <ServiceCard
            title="PORTFOLIO DESIGN"
            features={["Custom development", "Modern design", "Source files", "Unlimited revisions"]}
            index={1}
          />
          <ServiceCard
            title="BLOG WEBSITE"
            features={["Custom development", "Modern design", "Responsive design", "Private hosting"]}
            index={2}
          />
          <ServiceCard
            title="BLOG DESIGN"
            features={["Custom development", "Modern design", "Source files", "Unlimited revisions"]}
            index={3}
          />
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ title, features, index }: { title: string; features: string[]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-[#00FFA3]/50 hover:shadow-xl hover:shadow-[#00FFA3]/5 group relative overflow-hidden"
    >
      {/* Card Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#00FFA3]/5 to-transparent transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <h4 className="text-xl font-medium mb-6 relative z-10 text-foreground">
        {title}
      </h4>

      <ul className="space-y-3 mb-8 relative z-10">
        {features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * featureIndex }}
            className="flex items-start group/item"
          >
            <div
              className={`h-5 w-5 rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 transition-all duration-300 ${
                isHovered
                  ? "bg-[#00FFA3] text-black scale-110"
                  : "bg-muted text-[#00FFA3]"
              }`}
            >
              ✓
            </div>
            <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 relative z-10">
        <Button size="sm" className="bg-foreground text-background hover:bg-[#00FFA3] hover:text-black transition-all group">
          GET IT NOW
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <Button variant="outline" size="sm" className="hover:border-[#00FFA3] hover:text-[#00FFA3] transition-all group">
          GET IT ON FIVERR
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>

      {/* Floating Elements */}
      <div
        className={`absolute top-4 right-4 w-2 h-2 bg-[#00FFA3]/30 rounded-full transition-all duration-1000 ${
          isHovered ? "scale-150 opacity-100" : "scale-100 opacity-0"
        }`}
      ></div>
    </motion.div>
  )
}
