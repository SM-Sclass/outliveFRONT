"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const spinTransition = {
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
    duration: 1.5,
  }

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-premium-dark/10 dark:border-white/10" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-premium-primary dark:border-t-premium-secondary" />
      </div>
    )
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-premium-dark/10 dark:border-white/10" />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-premium-primary dark:border-t-premium-secondary"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  )
}
