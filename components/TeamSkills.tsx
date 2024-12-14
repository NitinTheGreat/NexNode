'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const skillsData = [
  { skill: 'Next.js', level: 95 },
  { skill: 'React', level: 90 },
  { skill: 'Node.js', level: 85 },
  { skill: 'TypeScript', level: 80 },
  { skill: 'MongoDB', level: 75 },
  { skill: 'PostgreSQL', level: 70 },
  { skill: 'GraphQL', level: 65 },
  { skill: 'AWS', level: 60 },
]

export default function TeamSkills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Our Team Skills</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-background to-background/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Skill Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={skill.skill}
                    className="relative"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-primary">{skill.skill}</span>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2.5">
                      <motion.div
                        className="bg-primary h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute -top-10 left-0 bg-primary text-primary-foreground px-2 py-1 rounded text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {skill.skill}: {skill.level}%
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

