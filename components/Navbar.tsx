"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useMotionValue, useSpring } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoverItem, setHoverItem] = useState<string | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle cursor movement
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener("mousemove", moveCursor)
    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    // { name: "Featured", href: "#featured" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <motion.nav
        className={`px-4 sm:px-6 py-3 transition-all duration-300 ${
          isScrolled ? "bg-[#050b18]/90 backdrop-blur-lg shadow-lg shadow-blue-900/10" : "bg-transparent"
        }`}
        animate={{
          borderBottom: isScrolled ? "1px solid rgba(0, 112, 243, 0.2)" : "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="NexNode Logo" className="h-8 w-8 rounded-full" />
            <span className="text-xl font-semibold text-blue-100">NexNode</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 rounded-md text-blue-100/80 hover:text-blue-100 transition-colors"
                onClick={() => setActiveSection(item.name.toLowerCase())}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <span className="relative z-10">{item.name}</span>

                {/* Hover effect */}
                <AnimatePresence>
                  {hoverItem === item.name && (
                    <motion.div
                      className="absolute inset-0 rounded-md -z-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute inset-0 rounded-md bg-blue-900/20 backdrop-blur-sm" />
                      <div className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-blue-600/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {activeSection === item.name.toLowerCase() && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* CTA Button */}
            {/* <motion.button
              className="ml-4 px-5 py-2 rounded-full text-sm font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400"
                animate={{
                  background: [
                    "linear-gradient(90deg, #0070f3 0%, #00c2ff 100%)",
                    "linear-gradient(180deg, #0070f3 0%, #00c2ff 100%)",
                    "linear-gradient(270deg, #0070f3 0%, #00c2ff 100%)",
                    "linear-gradient(360deg, #0070f3 0%, #00c2ff 100%)",
                    "linear-gradient(90deg, #0070f3 0%, #00c2ff 100%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              /> */}

            {/* Glow effect on hover */}
            {/* <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 20px 5px rgba(0, 112, 243, 0.7) inset",
                }}
              />

              <span className="relative z-10 text-white">Get Started</span>
            </motion.button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-blue-100/80 hover:text-blue-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full"
                  animate={{
                    top: isMobileMenuOpen ? "10px" : "0px",
                    rotate: isMobileMenuOpen ? "45deg" : "0deg",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full top-[10px]"
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current rounded-full top-[20px]"
                  animate={{
                    top: isMobileMenuOpen ? "10px" : "20px",
                    rotate: isMobileMenuOpen ? "-45deg" : "0deg",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute left-0 right-0 top-full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#050b18]/95 backdrop-blur-lg border-t border-blue-900/20 border-b border-blue-900/20 py-3 px-4 shadow-lg shadow-blue-900/10">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-md ${
                          activeSection === item.name.toLowerCase()
                            ? "bg-blue-900/30 text-blue-300"
                            : "text-blue-100/80 hover:bg-blue-900/20 hover:text-blue-100"
                        }`}
                        onClick={() => {
                          setActiveSection(item.name.toLowerCase())
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  {/* <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <button className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md text-white font-medium">
                      Get Started
                    </button>
                  </motion.div> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Animated glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(to right, transparent, #0070f3, transparent)",
        }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          boxShadow: isScrolled ? "0 1px 10px 0 rgba(0, 112, 243, 0.5)" : "none",
        }}
      />
    </motion.header>
  )
}
