"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AnimatedLogo({ size = "md", className }: AnimatedLogoProps) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  const polylineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, ease: "easeInOut", delay: 1 },
        opacity: { duration: 0.3, delay: 1 },
      },
    },
  }

  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-premium-primary dark:bg-premium-primaryDark ${sizeClasses[size]} ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-md bg-premium-primary dark:bg-premium-primaryDark ${sizeClasses[size]} ${className}`}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-white"
        initial="hidden"
        animate="visible"
      >
        <motion.path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" variants={pathVariants} />
        <motion.polyline points="9 22 9 12 15 12 15 22" variants={polylineVariants} />
      </motion.svg>
    </div>
  )
}
