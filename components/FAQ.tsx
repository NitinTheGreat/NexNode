'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern web technologies, with a focus on Next.js, React, Node.js, and various databases like MongoDB and PostgreSQL. We also have experience with AI integration, mobile app development, and cloud services."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines can vary greatly depending on the scope and complexity. A simple website might take 2-4 weeks, while a complex web application could take 2-3 months or more. We'll provide a detailed timeline estimate after discussing your specific requirements."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer ongoing support and maintenance packages for all our projects. This includes regular updates, bug fixes, and technical support to ensure your website or application continues to run smoothly."
  },
  {
    question: "Can you work with our existing design or brand guidelines?",
    answer: "We're happy to work with your existing design assets or brand guidelines. We can also provide design services if you need a fresh look or don't have existing guidelines."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on the scope of work, complexity, and timeline. We provide detailed quotes after an initial consultation to understand your needs. We also offer flexible payment plans for larger projects."
  }
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

