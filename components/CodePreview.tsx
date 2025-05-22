"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

// Code Preview Section Component
export default function CodePreviewSection() {
  // Available programming languages with shortened code snippets (max 20 lines)
  const languages = [
    {
      name: "Next.js",
      icon: "⚛️",
      code: `// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container">
      <Head>
        <title>Next.js App</title>
      </Head>
      
      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </main>
    </div>
  );
}`,
    },
    {
      name: "React.js",
      icon: "⚛️",
      code: `// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <h1>React Data Fetching</h1>
      {loading ? <p>Loading...</p> : <div>{data.length} items</div>}
    </div>
  );
}`,
    },
    {
      name: "JavaScript",
      icon: "🟨",
      code: `// Modern JavaScript Example
async function fetchUserData(userId) {
  try {
    const response = await fetch(
      \`https://api.example.com/users/\${userId}\`
    );
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Using the function with promise chaining
fetchUserData(123)
  .then(user => {
    console.log('User data:', user);
    return fetchUserData(user.friendId);
  })
  .then(friend => console.log('Friend data:', friend))
  .catch(error => console.error('Error:', error));`,
    },
    {
      name: "Python",
      icon: "🐍",
      code: `# Python Data Analysis Example
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Generate sample data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Train a linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

print(f"Model intercept: {model.intercept_}")
print(f"Model coefficient: {model.coef_}")`,
    },
    {
      name: "Java",
      icon: "☕",
      code: `// Java Spring Boot REST API Example
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/products")
class ProductController {
    private final ProductRepository repository;
    
    ProductController(ProductRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping
    List<Product> all() {
        return repository.findAll();
    }
    
    @PostMapping
    Product newProduct(@RequestBody Product product) {
        return repository.save(product);
    }
}`,
    },
    {
      name: "TypeScript",
      icon: "🔷",
      code: `// TypeScript React Component
import React, { useState, useEffect } from 'react';

// Define types for our data
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserListProps {
  initialUsers?: User[];
  onUserSelect?: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ 
  initialUsers = [], 
  onUserSelect 
}) => {
  // State with TypeScript type
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const response = await fetch('/api/users');
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
}`,
    },
  ]

  // State for active language and scroll position
  const [activeLanguage, setActiveLanguage] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const codeRef = useRef<HTMLPreElement>(null)

  // Auto-switch languages every 10 seconds (changed from 5s to 10s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLanguage((prev) => (prev + 1) % languages.length)
      setScrollPosition(0) // Reset scroll position when language changes
    }, 10000) // Changed to 10 seconds

    return () => clearInterval(interval)
  }, [languages.length])

  // Auto-scroll code
  useEffect(() => {
    if (!codeRef.current) return

    const codeElement = codeRef.current
    const totalHeight = codeElement.scrollHeight
    const viewportHeight = codeElement.clientHeight
    const maxScroll = totalHeight - viewportHeight

    if (maxScroll <= 0) return // No need to scroll if content fits

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 0.5 // Slower scrolling
        if (newPosition >= maxScroll) {
          return 0 // Reset to top when reaching bottom
        }
        return newPosition
      })
    }, 50) // Adjust speed as needed

    return () => clearInterval(scrollInterval)
  }, [activeLanguage])

  // Update scroll position
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = scrollPosition
    }
  }, [scrollPosition])

  // Handle manual language selection
  const handleLanguageClick = (index: number) => {
    setActiveLanguage(index)
    setScrollPosition(0) // Reset scroll position
  }

  return (
    <motion.div
      className="mt-24 mb-24"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl font-bold mb-4"
          style={{
            background: "linear-gradient(to right, #00c2ff, #0070f3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Mastering Every Language
        </motion.h2>
        <motion.p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
          Our expert developers are fluent in multiple programming languages and frameworks.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {/* Code Preview Window - Takes 3 columns on large screens */}
        <motion.div
          className="lg:col-span-3 rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(10, 20, 40, 0.95) 0%, rgba(15, 30, 60, 0.95) 100%)",
            boxShadow: "0 20px 80px -10px rgba(0, 112, 243, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Code Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-blue-100/80 font-mono">
              {languages[activeLanguage].name} - code-example.
              {languages[activeLanguage].name === "Python"
                ? "py"
                : languages[activeLanguage].name === "Java"
                  ? "java"
                  : languages[activeLanguage].name === "TypeScript"
                    ? "tsx"
                    : "js"}
            </div>
            <div className="text-blue-100/50 text-xs">NexNode IDE</div>
          </div>

          {/* Line Numbers and Code - REDUCED HEIGHT */}
          <div className="flex text-sm font-mono">
            {/* Line Numbers */}
            <div className="py-3 px-2 text-right text-gray-500 select-none bg-gray-900/30 w-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="leading-5 text-xs">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Content - REDUCED HEIGHT */}
            <pre
              ref={codeRef}
              className="language-javascript py-3 px-4 overflow-hidden flex-1 text-blue-100/90 leading-5"
              style={{ maxHeight: "250px" }} // Reduced height
            >
              <code className="text-xs">{languages[activeLanguage].code}</code>
            </pre>
          </div>
        </motion.div>

        {/* Language Selection - Takes 2 columns on large screens */}
        <motion.div
          className="lg:col-span-2 flex flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Our Tech Stack</h3>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((language, index) => (
              <motion.button
                key={language.name}
                className={`p-3 rounded-lg text-left transition-all duration-300 ${
                  activeLanguage === index
                    ? "bg-blue-600/30 border border-blue-500/50"
                    : "bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/30"
                }`}
                onClick={() => handleLanguageClick(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-2">{language.icon}</span>
                  <span
                    className={`font-medium text-sm ${activeLanguage === index ? "text-blue-300" : "text-blue-100/80"}`}
                  >
                    {language.name}
                  </span>
                </div>
                {activeLanguage === index && (
                  <motion.div
                    className="h-1 bg-blue-500 mt-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-blue-100/70 text-sm">
              Our team excels in building robust applications using the latest technologies and best practices. We
              deliver clean, maintainable code that scales with your business.
            </p>
           
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
