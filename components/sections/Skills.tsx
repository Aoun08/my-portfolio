"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const skills = [
    { name: "JavaScript", icon: "JS" },
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "TS" },
    { name: "WordPress", icon: "W" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00FFA3]/20 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#00FFA3]/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#00FFA3]/25 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="uppercase text-sm tracking-wider mb-2 text-[#00FFA3]">MY SKILLS</h2>
          <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-16 h-16 relative flex items-center justify-center cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.1, rotate: 12 }}
              >
                <div
                  className={`absolute inset-0 bg-[#00FFA3]/10 rounded-lg transition-all duration-300 ${
                    hoveredIndex === index ? "opacity-100 scale-110" : "opacity-0 scale-100"
                  }`}
                ></div>
                <div
                  className={`h-14 w-14 bg-card border border-border rounded-xl flex items-center justify-center text-xl font-bold text-foreground transition-all duration-300 shadow-sm ${
                    hoveredIndex === index ? "border-[#00FFA3]/50 text-[#00FFA3] shadow-[#00FFA3]/20 shadow-lg" : ""
                  }`}
                >
                  {skill.icon}
                </div>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap font-medium"
                  >
                    {skill.name}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[...Array(4)].map((_, i) => (
            <SkillCard key={i} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ index }: { index: number }) {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  }

  const skills = [
    {
      title: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React", "jQuery", "TypeScript", "Next.js", "WordPress"],
    },
    {
      title: "Design",
      items: ["Figma", "Photoshop", "UI/UX", "Prototyping"],
    },
    {
      title: "Frameworks",
      items: ["React.js", "Next js", "Tailwind CSS", "Material UI", "Bootstrap"],
    },
    {
      title: "Tools",
      items: ["Git", "VS Code", "Webpack", "Terminal"],
    },
  ]

  const skill = skills[index]

  return (
    <motion.div
      variants={itemVariants}
      className="bg-card rounded-xl p-6 border border-border hover:border-[#00FFA3]/50 transition-all duration-500 group hover:shadow-xl hover:shadow-[#00FFA3]/5"
      whileHover={{ y: -5 }}
    >
      <div className="h-12 w-12 mb-6 bg-muted rounded-lg flex items-center justify-center text-[#00FFA3] group-hover:bg-[#00FFA3]/10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
        <SkillIcon index={index} />
      </div>

      <h3 className="text-xl font-medium mb-4 text-foreground">{skill.title}</h3>

      <ul className="space-y-2">
        {skill.items.map((item, i) => (
          <motion.li
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { x: -10, opacity: 0 },
              visible: { x: 0, opacity: 1, transition: { delay: i * 0.1 } },
            }}
            className="text-sm text-muted-foreground flex items-center transition-all duration-300 hover:text-foreground group/item"
          >
            <span className="h-1.5 w-1.5 bg-[#00FFA3]/50 rounded-full mr-3 group-hover/item:bg-[#00FFA3] group-hover/item:scale-150 transition-all"></span>
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function SkillIcon({ index }: { index: number }) {
  const icons = [
    <svg key="icon1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9L12 12L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="icon2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 4H9C7.11438 4 6.17157 4 5.58579 4.58579C5 5.17157 5 6.11438 5 8V16C5 17.8856 5 18.8284 5.58579 19.4142C6.17157 20 7.11438 20 9 20H15C16.8856 20 17.8284 20 18.4142 19.4142C19 18.8284 19 17.8856 19 16V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 16H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    <svg key="icon3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 13V15C21 17.8284 21 19.2426 20.1213 20.1213C19.2426 21 17.8284 21 15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3V15M12 3L16 7M12 3L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="icon4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5.5V16.5M12 5.5L8 9.5M12 5.5L16 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 19.5L12 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
  ]

  return icons[index]
}
