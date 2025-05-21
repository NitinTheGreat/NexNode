"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const allProjects = [
  {
    id: 1,
    title: "WomenTechies'25",
    description:
      "An annual hackathon celebrating women in technology with workshops, mentoring, and collaborative coding challenges.",
    image: "/wt'25.png ",
    tags: ["React", "Node.js", "MongoDB", "Event Management"],
  },
  {
    id: 2,
    title: "StreetGuardian",
    description:
      "A safety application that uses real-time monitoring and alerts to help users navigate urban environments securely.",
    image: "/StreetGuardian.png",
    tags: ["React Native", "Firebase", "Maps API", "Safety"],
  },
  {
    id: 3,
    title: "DealHarbor",
    description:
      "A marketplace platform connecting buyers with sellers offering discounted products and limited-time deals.",
    image: "/DealHarbor.png",
    tags: ["Next.js", "Express", "PostgreSQL", "E-commerce"],
  },
  {
    id: 4,
    title: "Flight Booking",
    description:
      "A comprehensive flight reservation system with search, comparison, and booking capabilities for travelers.",
    image: "/SkyQuest.png",
    tags: ["React", "Node.js", "Travel API", "Payment Gateway"],
  },
  {
    id: 5,
    title: "Diwali",
    description:
      "An interactive cultural experience celebrating the Festival of Lights with stories, traditions, and virtual celebrations.",
    image: "/Diwali.png",
    tags: ["Three.js", "WebGL", "Animation", "Cultural"],
  },
  {
    id: 6,
    title: "JSX Convertor",
    description:
      "A developer tool that transforms HTML to JSX and vice versa, streamlining the process of working with React components.",
    image: "/JSXConverter.png",
    tags: ["JavaScript", "React", "Parser", "Developer Tools"],
  },
]

const technologies = Array.from(new Set(allProjects.flatMap((project) => project.tags)))

export default function AllProjects() {
  const [open, setOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const filteredProjects = selectedTech
    ? allProjects.filter((project) => project.tags.includes(selectedTech))
    : allProjects

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">All Projects</h2>
        <div className="mb-8">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {selectedTech ?? "Filter by technology"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search technology..." />
                <CommandList>
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
                        <Check className={cn("mr-2 h-4 w-4", selectedTech === tech ? "opacity-100" : "opacity-0")} />
                        {tech}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
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
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
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
