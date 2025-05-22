"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // FAQ data
  const faqs = [
    {
      question: "What services does NexNode offer?",
      answer:
        "NexNode specializes in creating custom digital experiences through web development, UI/UX design, mobile app development, e-commerce solutions, CMS integration, and API development. We transform your ideas into immersive digital universes that engage your audience and elevate your brand.",
    },
    {
      question: "How long does a typical project take to complete?",
      answer:
        "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while complex web applications can take 2-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific requirements and project goals.",
    },
    {
      question: "Do you offer ongoing maintenance and support?",
      answer:
        "We provide comprehensive maintenance and support packages to ensure your digital products remain secure, up-to-date, and performing optimally. Our support team is available to address any issues, implement updates, and make improvements as your business evolves.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "Our team is proficient in a wide range of technologies including Next.js, React, TypeScript, Node.js, Python, Java, and more. We stay at the forefront of technological advancements to deliver cutting-edge solutions that leverage the best tools for your specific needs.",
    },
    {
      question: "How do you approach the design process?",
      answer:
        "Our design process is collaborative and user-centered. We begin with thorough research and discovery to understand your users and business goals. We then create wireframes and prototypes, refining the design through iterative feedback. The final design is not just visually stunning but strategically crafted to achieve your objectives.",
    },
  ]

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050b18] to-[#0a1a33] -z-10" />

      {/* Animated background grid */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full grid grid-cols-6 grid-rows-6">
            {Array.from({ length: 36 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-blue-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02, duration: 1 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-20 blur-xl -z-5"
          style={{
            background: `radial-gradient(circle, rgba(0,194,255,0.6) 0%, rgba(0,112,243,0.3) 50%, rgba(0,0,0,0) 70%)`,
            height: `${Math.random() * 200 + 100}px`,
            width: `${Math.random() * 200 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: "linear-gradient(to right, #00c2ff, #0070f3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
            Get answers to common questions about our services and process.
          </motion.p>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <motion.div
                className={`rounded-xl overflow-hidden relative ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-blue-900/30 to-blue-800/30 backdrop-blur-sm"
                    : "bg-[#0a1a33]/50 hover:bg-[#0a1a33]/80 backdrop-blur-sm"
                }`}
                animate={{
                  boxShadow:
                    activeIndex === index
                      ? "0 10px 30px -5px rgba(0, 112, 243, 0.3), 0 0 10px rgba(0, 194, 255, 0.2) inset"
                      : hoverIndex === index
                        ? "0 5px 20px -5px rgba(0, 112, 243, 0.2)"
                        : "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold text-blue-100">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-blue-400 flex-shrink-0 ml-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5">
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="text-blue-100/80"
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated border */}
                {(activeIndex === index || hoverIndex === index) && (
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
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full opacity-10 blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(0,194,255,1) 0%, rgba(0,112,243,0) 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-60 h-60 rounded-full opacity-10 blur-xl"
          style={{
            background: "radial-gradient(circle, rgba(0,194,255,1) 0%, rgba(0,112,243,0) 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  )
}
