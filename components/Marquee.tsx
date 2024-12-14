'use client'

import { motion } from 'framer-motion'
import FastMarquee from 'react-fast-marquee'

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function Marquee({ items, direction = 'left', speed = 50, className = '' }: MarqueeProps) {
  return (
    <FastMarquee direction={direction} speed={speed} className={`py-4 bg-background/50 backdrop-blur-sm ${className}`}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="text-4xl font-bold mx-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          whileHover={{ scale: 1.1 }}
        >
          {item}
        </motion.span>
      ))}
    </FastMarquee>
  )
}

