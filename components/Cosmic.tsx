"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"
import CodePreviewSection from "./CodePreview"

export default function CosmicShowcase() {
  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  // States
  const [isHovering, setIsHovering] = useState(false)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Particles state
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      speed: number
      opacity: number
    }>
  >([])

  // Services offered by NexNode
  const services = [
    { name: "Web Development", icon: "🌐", description: "Creating stunning responsive websites" },
    { name: "UI/UX Design", icon: "🎨", description: "Crafting beautiful user experiences" },
    { name: "Mobile Apps", icon: "📱", description: "Building cross-platform mobile solutions" },
    { name: "E-commerce", icon: "🛒", description: "Developing powerful online stores" },
    { name: "CMS Integration", icon: "⚙️", description: "Seamless content management systems" },
    { name: "API Development", icon: "🔌", description: "Custom API solutions for your business" },
  ]

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    setDimensions({ width, height })

    const newParticles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      color: ["#0070f3", "#00c2ff", "#00f0ff", "#4d9fff", "#2563eb"][Math.floor(Math.random() * 5)],
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.3,
    }))

    setParticles(newParticles)

    const handleResize = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.set(x)
    mouseY.set(y)
  }

  // Animate particles
  useEffect(() => {
    if (particles.length === 0 || !dimensions.width) return

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Move particles
          let newY = particle.y + particle.speed

          // Reset position if particle goes out of bounds
          if (newY > dimensions.height) {
            newY = -10
          }

          // If mouse is active, create a gravitational effect
          let newX = particle.x
          if (isHovering) {
            const mouseXVal = smoothMouseX.get()
            const mouseYVal = smoothMouseY.get()
            const dx = mouseXVal - particle.x
            const dy = mouseYVal - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const force = 0.2 * (1 - distance / 150)
              newX += dx * force
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    const intervalId = setInterval(animateParticles, 16)
    return () => clearInterval(intervalId)
  }, [particles, dimensions, isHovering, smoothMouseX, smoothMouseY])

  // Transform values based on mouse position
  const rotateX = useTransform(smoothMouseY, [0, dimensions.height], [5, -5])
  const rotateY = useTransform(smoothMouseX, [0, dimensions.width], [-5, 5])
  const glowX = useTransform(smoothMouseX, [0, dimensions.width], [0, dimensions.width])
  const glowY = useTransform(smoothMouseY, [0, dimensions.height], [0, dimensions.height])

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#050b18] to-[#0a1a33] py-20"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Particles background */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: `blur(${particle.size > 2 ? 1 : 0}px)`,
          }}
        />
      ))}

      {/* Radial glow that follows mouse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: glowX,
          y: glowY,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,112,243,0.15) 0%, rgba(0,112,243,0) 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{
              background: "linear-gradient(to right, #00c2ff, #0070f3, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(0, 112, 243, 0.5)",
            }}
          >
            We Create Digital Universes
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            NexNode transforms ideas into immersive digital experiences through cutting-edge web development and design.
          </motion.p>
        </motion.div>

        {/* 3D Rotating Card - PARTICLES REMOVED FOR CLEANER LOOK */}
        <motion.div
          className="perspective-1000 mb-24"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="w-full max-w-5xl mx-auto h-64 md:h-80 rounded-3xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(13, 29, 54, 0.8) 0%, rgba(20, 46, 87, 0.6) 100%)",
              boxShadow: "0 20px 80px -10px rgba(0, 112, 243, 0.3), 0 0 20px rgba(0, 194, 255, 0.2) inset",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-px opacity-20">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-blue-400/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02, duration: 0.5 }}
                />
              ))}
            </div>

            {/* Glowing orb */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,194,255,0.4) 0%, rgba(0,112,243,0.1) 50%, rgba(0,0,0,0) 70%)",
                filter: "blur(20px)",
                x: useTransform(smoothMouseX, [0, dimensions.width], [100, dimensions.width - 100]),
                y: useTransform(smoothMouseY, [0, dimensions.height], [50, 200]),
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
              <motion.h3
                className="text-2xl md:text-4xl font-bold mb-4 text-white"
                style={{ textShadow: "0 0 10px rgba(0, 194, 255, 0.5)" }}
              >
                Crafting Digital Excellence
              </motion.h3>
              <motion.p className="text-blue-100/80 max-w-2xl">
                Our team of expert developers and designers create seamless, innovative digital solutions that elevate
                your brand and engage your audience.
              </motion.p>
            </div>

            {/* Animated corner accents */}
            {[0, 1, 2, 3].map((corner) => (
              <motion.div
                key={`corner-${corner}`}
                className="absolute w-16 h-16 pointer-events-none"
                style={{
                  top: corner < 2 ? 0 : "auto",
                  bottom: corner >= 2 ? 0 : "auto",
                  left: corner % 2 === 0 ? 0 : "auto",
                  right: corner % 2 === 1 ? 0 : "auto",
                  borderTop: corner < 2 ? "2px solid rgba(0, 194, 255, 0.5)" : "none",
                  borderBottom: corner >= 2 ? "2px solid rgba(0, 194, 255, 0.5)" : "none",
                  borderLeft: corner % 2 === 0 ? "2px solid rgba(0, 194, 255, 0.5)" : "none",
                  borderRight: corner % 2 === 1 ? "2px solid rgba(0, 194, 255, 0.5)" : "none",
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: corner * 0.5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* NEW CODE PREVIEW SECTION - Now imported from separate file */}
        <CodePreviewSection />

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, zIndex: 20 }}
              onHoverStart={() => setActiveNode(index)}
              onHoverEnd={() => setActiveNode(null)}
            >
              <motion.div
                className="relative h-full rounded-xl overflow-hidden p-6 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(13, 29, 54, 0.8) 0%, rgba(20, 46, 87, 0.6) 100%)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  boxShadow:
                    activeNode === index
                      ? "0 10px 30px -5px rgba(0, 112, 243, 0.5), 0 0 10px rgba(0, 194, 255, 0.3) inset"
                      : "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Animated border */}
                <AnimatePresence>
                  {activeNode === index && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="absolute inset-0 border-2 border-transparent rounded-xl overflow-hidden">
                        <div className="absolute inset-0">
                          <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_270deg,#0070f3_270deg_315deg,#00c2ff_315deg_360deg)]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Service icon */}
                <motion.div
                  className="text-4xl mb-4"
                  animate={{
                    scale: activeNode === index ? 1.2 : 1,
                    y: activeNode === index ? -5 : 0,
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Service name */}
                <motion.h3
                  className="text-xl font-bold mb-2 text-white"
                  animate={{
                    color: activeNode === index ? "#00c2ff" : "#ffffff",
                  }}
                >
                  {service.name}
                </motion.h3>

                {/* Service description */}
                <motion.p className="text-blue-100/70">{service.description}</motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating call to action */}
        <motion.div
          className="mt-20 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 rounded-full text-lg font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background with animated gradient */}
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
            />

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 30px 5px rgba(0, 112, 243, 0.7) inset",
              }}
            />

            {/* Button text */}
            <span className="relative z-10 text-white">Start Your Project</span>

            {/* Animated particles on hover */}
            <AnimatePresence>
              {isHovering && (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                      key={`btn-particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
                      initial={{
                        x: "50%",
                        y: "50%",
                        opacity: 0.8,
                      }}
                      animate={{
                        x: `${50 + (Math.random() * 100 - 50)}%`,
                        y: `${50 + (Math.random() * 100 - 50)}%`,
                        opacity: 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Cosmic connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
        <motion.path
          d="M0,100 Q400,300 800,100 T1600,100"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,300 Q400,100 800,300 T1600,300"
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0070f3" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#00c2ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0070f3" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </motion.section>
  )
}
