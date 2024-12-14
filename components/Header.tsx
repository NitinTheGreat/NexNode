'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      <header className="fixed w-full z-40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-2xl font-bold glow-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NexNode
          </motion.div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
    </>
  )
}

