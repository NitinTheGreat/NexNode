'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const allProjects = [
  // Include the 3 featured projects
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
  },
  // Add 5 more projects
  {
    id: 4,
    title: "Fitness Tracking App",
    description: "A mobile-first fitness tracking application with personalized workout plans.",
    image: "/placeholder-project-4.jpg", // TODO: Replace with actual project image
    tags: ["React Native", "Firebase", "Node.js"]
  },
  {
    id: 5,
    title: "Real Estate Marketplace",
    description: "A comprehensive platform for buying, selling, and renting properties.",
    image: "/placeholder-project-5.jpg", // TODO: Replace with actual project image
    tags: ["Next.js", "GraphQL", "PostgreSQL"]
  },
  {
    id: 6,
    title: "Online Learning Platform",
    description: "An interactive e-learning platform with live sessions and course management.",
    image: "/placeholder-project-6.jpg", // TODO: Replace with actual project image
    tags: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 7,
    title: "Task Management Tool",
    description: "A collaborative task management tool with real-time updates and integrations.",
    image: "/placeholder-project-7.jpg", // TODO: Replace with actual project image
    tags: ["Vue.js", "Express", "Socket.io"]
  },
  {
    id: 8,
    title: "Weather Forecast App",
    description: "A sleek weather forecast application with location-based services.",
    image: "/placeholder-project-8.jpg", // TODO: Replace with actual project image
    tags: ["React", "Node.js", "OpenWeatherMap API"]
  },
]

const technologies = Array.from(new Set(allProjects.flatMap(project => project.tags)))

export default function AllProjects() {
  const [open, setOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const filteredProjects = selectedTech
    ? allProjects.filter(project => project.tags.includes(selectedTech))
    : allProjects

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">All Projects</h2>
        <div className="mb-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {selectedTech ?? "Filter by technology"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search technology..." />
                <CommandEmpty>No technology found.</CommandEmpty>
                <CommandGroup>
                  {technologies.map((tech) => (
                    <CommandItem
                      key={tech}
                      onSelect={() => {
                        setSelectedTech(selectedTech === tech ? null : tech)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedTech === tech ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {tech}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
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

