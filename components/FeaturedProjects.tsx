"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredProjects = [
  {
    id: 1,
    title: "WomenTechies'25",
    description:
      "An annual hackathon celebrating women in technology with workshops, mentoring, and collaborative coding challenges.",
    image: "/wt'25.png",
    tags: ["React", "Node.js", "MongoDB", "Event Management"],
    link: "https://womentechies.dscvit.com/",
  },
  {
    id: 2,
    title: "StreetGuardian",
    description:
      "A safety application that uses real-time monitoring and alerts to help users navigate urban environments securely.",
    image: "/StreetGuardian.png",
    tags: ["React Native", "Firebase", "Maps API", "Safety"],
    link: "https://www.streetguardian.tech/",
  },
  {
    id: 3,
    title: "DealHarbor",
    description:
      "A marketplace platform connecting buyers with sellers offering discounted products and limited-time deals.",
    image: "/DealHarbor.png",
    tags: ["Next.js", "Express", "PostgreSQL", "E-commerce"],
    link: "https://deal-harbor.vercel.app/",
  },
]

export default function FeaturedProjects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 overflow-hidden bg-gradient-to-b from-background to-background/50"
    >
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
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center text-primary"
                      >
                        <Link
                          href={project.link}
                          className="flex items-center hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="mr-2">View Project</span>
                          <ChevronRight size={20} />
                        </Link>
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
