'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Marquee from "react-fast-marquee"
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      </div>
      <motion.div 
        className="relative z-10 text-center max-w-4xl px-4"
        style={{ y, opacity }}
      >
        <motion.h1 
          className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to NexNode
        </motion.h1>
        <motion.p 
          className="text-2xl mb-8 text-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafting cutting-edge web experiences with Next.js and Node.js
        </motion.p>
        <motion.a 
          href="#contact"
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-semibold hover:bg-primary/90 transition-colors inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.a>
      </motion.div>
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Digital Network Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </motion.div>
      <BackgroundAnimations />
    </section>
  )
}

function BackgroundAnimations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          y: [0, 100, 200, 100, 0],
          x: [0, -100, 0, 100, 0],
          scale: [1, 1.1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity,
          repeatDelay: 0
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0
        }}
      />
    </div>
  )
}

