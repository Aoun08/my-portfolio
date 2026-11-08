"use client"
import Link from "next/link"
import { Twitter, Linkedin, Github, Instagram } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/LabaikYaHussein?t=Mp7IDmy-SzasjnIIKzK-bg&s=09",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/syed-aoun-raza-b111b9209?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Aoun08",
      color: "hover:text-foreground",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/callmeprofessor08?igsh=ajVsYXpkaXg1a25q",
      color: "hover:text-pink-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <footer className="bg-background border-t border-border py-10 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-[#00FFA3]/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#00FFA3]/15 rounded-full animate-pulse"></div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo and Copyright Section */}
          <motion.div variants={itemVariants}>
            <div className="mb-4 group">
              <img
                src="/images/logo/ar-removebg-preview.png"
                alt="logo"
                width={150}
                className="transition-all duration-300 group-hover:scale-105 dark:brightness-100 brightness-0"
              />
            </div>
            <p className="text-sm text-muted-foreground max-w-md">© {currentYear} Aoun • All rights reserved</p>
          </motion.div>

          {/* Navigation and Social Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Explore Links */}
            <motion.div variants={itemVariants}>
              <h3 className="uppercase text-sm font-medium mb-4 text-[#00FFA3]">Explore</h3>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "#about", label: "About me" },
                  { href: "#services", label: "Services" },
                  { href: "#projects", label: "Projects" },
                  { href: "#contact", label: "Contact me" },
                ].map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[#00FFA3] transition-all duration-300 hover:translate-x-1 inline-block group"
                    >
                      <span className="group-hover:border-b group-hover:border-[#00FFA3] transition-all duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="uppercase text-sm font-medium mb-4 text-[#00FFA3]">Connect</h3>
              <ul className="space-y-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <motion.li
                      key={social.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 text-sm text-muted-foreground ${social.color} transition-all duration-300 hover:translate-x-2 group`}
                        aria-label={social.name}
                      >
                        <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="group-hover:font-medium transition-all duration-300 text-foreground">{social.name}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="text-center pt-6 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">
            "Let's <span className="text-[#00FFA3] animate-pulse inline-block">grow</span> together" --&gt;
          </p>
        </motion.div>
      </motion.div>

      {/* Animated Border Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#00FFA3] to-transparent"
      ></motion.div>
    </footer>
  )
}

export default Footer
