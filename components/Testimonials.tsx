'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Innovators Inc.",
    quote: "NexNode delivered an outstanding e-commerce platform that exceeded our expectations. Their expertise in Next.js and Node.js resulted in a lightning-fast, scalable solution.",
    image: "/placeholder-avatar-1.jpg" // TODO: Replace with actual testimonial image
  },
  {
    id: 2,
    name: "Jane Smith",
    company: "Digital Solutions Co.",
    quote: "Working with NexNode was a game-changer for our startup. They built a robust, user-friendly dashboard that streamlined our operations and delighted our clients.",
    image: "/placeholder-avatar-2.jpg" // TODO: Replace with actual testimonial image
  },
  {
    id: 3,
    name: "Alex Johnson",
    company: "AI Ventures",
    quote: "The AI-powered chatbot NexNode developed for us revolutionized our customer support. It's intelligent, efficient, and has significantly improved our user satisfaction rates.",
    image: "/placeholder-avatar-3.jpg" // TODO: Replace with actual testimonial image
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Clients Say</h2>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-card text-card-foreground p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
                  <p className="text-muted-foreground">{testimonials[currentIndex].company}</p>
                </div>
              </div>
              <p className="text-lg italic">"{testimonials[currentIndex].quote}"</p>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

