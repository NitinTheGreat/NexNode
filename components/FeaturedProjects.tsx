'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce solution with real-time inventory management.",
    image: "/placeholder-project-1.jpg", // TODO: Replace with actual project image
    tags: ["Next.js", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "An intuitive dashboard for managing multiple social media accounts.",
    image: "/placeholder-project-2.jpg", // TODO: Replace with actual project image
    tags: ["React", "Express", "PostgreSQL"]
  },
  {
    id: 3,
    title: "AI-powered Chatbot",
    description: "An intelligent chatbot for customer support with natural language processing.",
    image: "/placeholder-project-3.jpg", // TODO: Replace with actual project image
    tags: ["Next.js", "TensorFlow.js", "Node.js"]
  }
]

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
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
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
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

