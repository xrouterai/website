"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function FloatingPaths({
  position,
  colorScheme = "primary",
}: { position: number; colorScheme?: "primary" | "secondary" }) {
  const getPathColor = () => {
    return colorScheme === "primary" ? "text-purple-600 dark:text-purple-400" : "text-cyan-600 dark:text-cyan-400"
  }

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className={`w-full h-full ${getPathColor()}`} viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Heartbeat animation for text
const HeartbeatText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.span
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.15, 1, 1.05, 1],
        textShadow: [
          "0 0 0px rgba(79, 70, 229, 0)",
          "0 0 15px rgba(79, 70, 229, 0.5)",
          "0 0 0px rgba(79, 70, 229, 0)",
          "0 0 10px rgba(79, 70, 229, 0.3)",
          "0 0 0px rgba(79, 70, 229, 0)",
        ],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  )
}

export default function BackgroundPaths({
  title = "xRouter",
}: {
  title?: string
}) {
  const words = title.split(" ")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay the heartbeat effect until after the initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-900">
      {/* Colorful gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10 dark:from-pink-500/20 dark:to-cyan-500/20"></div>

      {/* Tech pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#3730a3_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="absolute inset-0">
        <FloatingPaths position={1} colorScheme="primary" />
        <FloatingPaths position={-1} colorScheme="secondary" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-indigo-600 to-purple-600 
                                        dark:from-indigo-400 dark:to-purple-400"
                  >
                    {isLoaded ? (
                      <HeartbeatText delay={(wordIndex * 0.2 + letterIndex * 0.05) % 1}>{letter}</HeartbeatText>
                    ) : (
                      letter
                    )}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

        </motion.div>
      </div>
    </div>
  )
}

