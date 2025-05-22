'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Marquee from "react-fast-marquee"
import { useRef, useEffect, useState } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  // Eye tracking state
  const heroRef = useRef<HTMLDivElement>(null)
  const [eyePos, setEyePos] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const leftEyeCenter = { x: rect.width / 2 - 60, y: rect.height / 2 };
      const rightEyeCenter = { x: rect.width / 2 + 60, y: rect.height / 2 };
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      function getPupilOffset(eye: { x: number; y: number }) {
        const dx = mouseX - eye.x;
        const dy = mouseY - eye.y;
        const angle = Math.atan2(dy, dx);
        const radius = 18;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
      }
      setEyePos({
        left: getPupilOffset(leftEyeCenter),
        right: getPupilOffset(rightEyeCenter),
      });
    }
    const node = heroRef.current;
    if (node) node.addEventListener('mousemove', handleMouseMove);
    return () => { if (node) node.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gradient.svg"
          alt="Gradient Background"
          fill
          priority
          className="object-cover w-full h-full"
        />
        <Image
          src="/stars.png"
          alt="Stars Overlay"
          fill
          priority
          className="object-cover w-full h-full opacity-60 pointer-events-none"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center py-20 gap-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-white font-bold text-center flex flex-wrap items-center justify-center w-full"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>
            We Build <span className="text-blue-500">Stunning</span>&nbsp;
          </span>


          <span className="inline-flex items-center gap-2 mx-2">
            <span>Websites</span>
            {/* Eyes */}
            <div className="pointer-events-none relative flex flex-row items-center justify-center gap-2" style={{ height: '64px' }}>
              {/* Left Eye */}
              <div className="relative w-16 h-16 bg-white rounded-full border-4 border-black flex items-center justify-center mx-1">
                <div
                  className="absolute w-6 h-6 bg-black rounded-full"
                  style={{
                    left: `calc(50% + ${eyePos.left.x * 0.7}px - 12px)`,
                    top: `calc(50% + ${eyePos.left.y * 0.7}px - 12px)`,
                    transition: 'none',
                  }}
                />
              </div>
              {/* Right Eye */}
              <div className="relative w-16 h-16 bg-white rounded-full border-4 border-black flex items-center justify-center mx-1">
                <div
                  className="absolute w-6 h-6 bg-black rounded-full"
                  style={{
                    left: `calc(50% + ${eyePos.right.x * 0.7}px - 12px)`,
                    top: `calc(50% + ${eyePos.right.y * 0.7}px - 12px)`,
                    transition: 'none',
                  }}
                />
              </div>
            </div>
            <span>That</span>
          </span>

          <span>&nbsp;Drive Results</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Custom-designed. Conversion-focused. Built to grow your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <a
            href="#contact"
            className="button-fill text-white font-semibold text-lg px-12 py-4 rounded-full shadow-lg transition-all"
            style={{ backgroundImage: 'linear-gradient(120deg, #e82fa9, #e39a0b)' }}
          >
            Get Started
          </a>
        </motion.div>
      </div>
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
