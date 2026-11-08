/* eslint-disable react/no-unescaped-entities */
"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutMe() {
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

  const leftSlideVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  const rightSlideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16"
        >
          <h2 className="uppercase text-sm tracking-wider mb-2 text-[#00FFA3]">About me</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-blue-500 animate-pulse">Aoun</span>.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={leftSlideVariants}
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hi, this is Aoun. I am a freelance front-end developer and designer. I've been in the web development
              industry for over 2 years. I have a solid knowledge and experience in modern web technologies.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              I use these tools to develop websites: HTML, CSS, JavaScript, React.js, jQuery, Next.js, Material UI,
              Tailwind CSS, WordPress, Figma (design), plus a bunch of modern front-end tools. I work hard to deliver
              high-quality, pixel-perfect designs that are also functional.
            </p>

            {/* Skills Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-start gap-6 mt-8"
            >
              {/* Web Development Card */}
              <motion.div variants={itemVariants} className="flex items-center text-[#00FFA3] group cursor-pointer">
                <div className="h-16 w-16 border-2 border-muted-foreground/30 group-hover:border-[#00FFA3] rounded-full flex items-center justify-center mb-4 mr-4 group-hover:bg-[#00FFA3]/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-foreground group-hover:text-[#00FFA3] transition-colors"
                  >
                    <path
                      d="M15.5 8.5V6.5C15.5 5.4 14.6 4.5 13.5 4.5H5.5C4.4 4.5 3.5 5.4 3.5 6.5V17.5C3.5 18.6 4.4 19.5 5.5 19.5H13.5C14.6 19.5 15.5 18.6 15.5 17.5V15.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M19.5 12.5H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 9.5L19.5 12.5L16.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-foreground">Web Development</h4>
                  <p className="text-sm text-muted-foreground">Clean, responsive code</p>
                </div>
              </motion.div>

              {/* Web Design Card */}
              <motion.div variants={itemVariants} className="flex items-center text-[#00FFA3] group cursor-pointer">
                <div className="h-16 w-16 border-2 border-muted-foreground/30 group-hover:border-[#00FFA3] rounded-full flex items-center justify-center mb-4 mr-4 group-hover:bg-[#00FFA3]/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-foreground group-hover:text-[#00FFA3] transition-colors"
                  >
                    <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M17 7L13.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M5 13.5L7.5 16M12.5 11L7.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12.5" cy="11" r="1" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="5" cy="13.5" r="1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-foreground">Web Design</h4>
                  <p className="text-sm text-muted-foreground">Modern, minimal designs</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Button */}
            <motion.div variants={itemVariants} className="mt-10">
              <Button className="hover:bg-[#00FFA3] hover:text-black transition-all duration-300 group bg-foreground text-background" size="lg">
                Contact me
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={rightSlideVariants}
            className="relative"
          >
            <div className="absolute -inset-4 border border-[#00FFA3]/20 rounded-xl animate-pulse"></div>
            <div className="relative rounded-full overflow-hidden group shadow-2xl shadow-[#00FFA3]/5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00FFA3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <Image
                src="/images/my-pic.jpeg"
                alt="Developer workspace"
                width={600}
                height={300}
                className="transform transition-all duration-700 group-hover:scale-105 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFA3]/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#00FFA3]/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-[#00FFA3]/20 rounded-full animate-bounce"></div>
      </div>
    </section>
  )
}
