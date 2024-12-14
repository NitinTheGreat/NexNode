'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center glow-text">Our Team Skills</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Skill Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsData}>
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  {skillsData.map((entry, index) => (
                    <Bar
                      key={`bar-${index}`}
                      dataKey="level"
                      fill={index === activeIndex ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <motion.rect
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

