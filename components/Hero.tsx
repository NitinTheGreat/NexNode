'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Marquee from "react-fast-marquee"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dot-pattern">
      <div className="absolute inset-0 z-0">
        <Marquee gradient={false} speed={50}>
          <div className="flex">
            {['NEXNODE', 'WEB DEVELOPMENT', 'NEXT.JS', 'NODE.JS', 'REACT', 'INNOVATION'].map((text, index) => (
              <span key={index} className="text-9xl font-bold text-gray-100 dark:text-gray-800 opacity-20 mx-4">
                {text}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
      <div className="relative z-10 text-center">
        <motion.h1 
          className="text-6xl font-bold mb-4 glow-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to NexNode
        </motion.h1>
        <motion.p 
          className="text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Crafting cutting-edge web experiences with Next.js and Node.js
        </motion.p>
        <motion.a 
          href="#contact"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.a>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3">
        <Image
          src="/hero-image.png"
          alt="Web Development Illustration"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <BackgroundAnimations />
    </section>
  )
}

function BackgroundAnimations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  )
}

