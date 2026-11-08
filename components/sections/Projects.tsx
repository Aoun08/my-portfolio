"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { projects } from "@/lib/data"
import { ChevronRight } from "lucide-react"

export default function Projects() {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5, ease: "easeOut" as const } },
  }

  return (
    <section id="projects" className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#00FFA3]/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-[#00FFA3]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-[#00FFA3]/25 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="mb-16 text-center"
        >
          <h2 className="uppercase text-sm tracking-wider mb-2 text-[#00FFA3]">MY RECENT PROJECTS</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            RECENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-blue-500 animate-pulse">PROJECTS</span>.
          </h3>
        </motion.div>

        {/* Projects List - Limited to 2 */}
        <div className="space-y-24 mb-16">
          {projects.slice(0, 2).map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              liveUrl={project.liveUrl}
              codeUrl={project.codeUrl}
              viewUrl={project.viewUrl}
              reverse={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={buttonVariants}
          className="flex justify-center"
        >
          <Link 
            href="/projects" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-background bg-foreground rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,163,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></div>
            <div className="absolute inset-0 w-full h-full transition-all duration-500 ease-out translate-x-full bg-[#00FFA3] group-hover:-translate-x-0"></div>
            <span className="relative flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              VIEW ALL PROJECTS 
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  codeUrl,
  viewUrl,
  reverse = false,
  index,
}: any) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  }

  const contentVariants = {
    hidden: { opacity: 0, x: reverse ? 30 : -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const } },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? -30 : 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" as const } },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-12 items-center`}
    >
      {/* Image Section */}
      <motion.div variants={imageVariants} className="w-full lg:w-1/2">
        <div className="relative rounded-xl overflow-hidden group shadow-2xl shadow-black/20 dark:shadow-[#00FFA3]/5 border border-border">
          {/* Hover Overlay with Link */}
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10"
          >
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
              <span className="px-6 py-3 bg-[#00FFA3] text-black font-medium rounded-full hover:bg-[#00FFA3]/90 transition-colors shadow-lg">
                View Project
              </span>
            </div>
          </a>

          {/* Animated Border */}
          <div className="absolute inset-0 border-2 border-[#00FFA3]/0 group-hover:border-[#00FFA3]/50 transition-all duration-500 rounded-xl z-20 pointer-events-none"></div>

          {/* Image */}
          <div className="aspect-[16/10] relative w-full bg-muted">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transform transition-all duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div variants={contentVariants} className="w-full lg:w-1/2">
        <h4 className="text-3xl font-bold mb-4 text-foreground">{title}</h4>

        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
          {description}
        </p>

        <div className="mb-8 p-4 bg-card rounded-lg border border-border hover:border-[#00FFA3]/30 transition-colors">
          <p className="text-sm text-muted-foreground font-medium">
            <span className="text-[#00FFA3] mr-2">Built using:</span> 
            <span className="text-foreground">{technologies}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#00FFA3] text-black font-medium rounded-full hover:bg-[#00FFA3]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00FFA3]/25 group flex items-center"
          >
            Live Demo
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-border hover:border-[#00FFA3] text-foreground hover:text-[#00FFA3] font-medium rounded-full transition-all duration-300 hover:scale-105 group flex items-center"
          >
            View Code
            <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
