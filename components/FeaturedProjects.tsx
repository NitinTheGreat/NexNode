'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce solution with real-time inventory management.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    tags: ["Next.js", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "An intuitive dashboard for managing multiple social media accounts.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Express", "PostgreSQL"]
  },
  {
    id: 3,
    title: "AI-powered Chatbot",
    description: "An intelligent chatbot for customer support with natural language processing.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80",
    tags: ["Next.js", "TensorFlow.js", "Node.js"]
  }
]

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="projects" ref={ref} className="py-20 overflow-hidden bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              style={{ y }}
            >
              <Card className="overflow-hidden h-full bg-gradient-to-br from-background/50 to-background backdrop-blur-sm border-primary/20">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center text-primary"
                      >
                        <span className="mr-2">View Project</span>
                        <ChevronRight size={20} />
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

