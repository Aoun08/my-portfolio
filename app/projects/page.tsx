"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { projects } from "@/lib/data"
import { ChevronLeft, ExternalLink, Github } from "lucide-react"

export default function AllProjectsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FFA3]/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation & Header */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={headerVariants}
          className="mb-16"
        >
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-muted-foreground hover:text-[#00FFA3] transition-colors mb-8 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-teal-500">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A complete collection of my recent web development and design projects. Each project represents a unique challenge and a custom solution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectGridCard key={index} project={project} index={index} />
          ))}
        </motion.div>

      </div>
    </main>
  )
}

function ProjectGridCard({ project, index }: { project: any, index: number }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  }

  return (
    <motion.div 
      variants={cardVariants}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-[#00FFA3]/50 hover:shadow-[0_0_30px_rgba(0,255,163,0.1)] transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted border-b border-border">
        <Image 
          src={project.image || "/placeholder.svg"} 
          alt={project.title}
          fill
          className="object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#00FFA3] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            title="Live Demo"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a 
            href={project.codeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            title="Source Code"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#00FFA3] transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Technologies</p>
          <p className="text-sm text-foreground">
            {project.technologies}
          </p>
        </div>
      </div>

      {/* Interactive Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00FFA3]/20 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
    </motion.div>
  )
}
