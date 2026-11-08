"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#00FFA3]/20 to-transparent blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="max-w-3xl"
        >
          <motion.p variants={itemVariants} className="text-muted-foreground mb-4 text-lg font-medium tracking-wide">
            Hi there,
          </motion.p>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] via-teal-400 to-blue-500">
              Aoun
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
            Passionate Web Developer & Frontend Engineer crafting beautiful, responsive, and user-centric digital experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
            <Button size="lg" className="w-fit rounded-full px-8 bg-gradient-to-r from-[#00FFA3] to-teal-500 text-black hover:opacity-90 transition-opacity border-0">
              About me
            </Button>

            <Button variant="outline" size="lg" className="w-fit rounded-full px-8 border-2 hover:bg-muted transition-colors">
              Contact me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* WhatsApp Icon with Animation */}
      <a
        href="https://wa.me/+923014981629"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          animation: "float 3s ease-in-out infinite",
        }}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 relative z-10" />

        {/* Pulse Ring Animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </a>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground animate-bounce" />
      </motion.a>
    </section>
  )
}
