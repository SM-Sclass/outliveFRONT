"use client"

import { useState } from "react"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { motion } from "framer-motion"
import { slideUp } from "@/lib/animation-variants"

interface DashboardCardProps {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
  delay?: number
}

export function DashboardCard({ title, description, className, children, footer, delay = 0 }: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const MotionCard = motion(Card)

  return (
    <MotionCard
      className={cn(
        "shadow-sm hover:shadow-md transition-all rounded-xl bg-[#F6F7ED] dark:bg-premium-tealDark",
        className,
      )}
      initial={prefersReducedMotion ? "visible" : "hidden"}
      animate="visible"
      variants={slideUp}
      transition={{ delay: delay * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      whileTap={prefersReducedMotion ? {} : { y: 0 }}
    >
      <CardHeader className="border-b border-premium-dark/10 bg-[#F6F7ED] dark:bg-premium-tealDark rounded-t-xl">
        <CardTitle className="text-premium-dark dark:text-white">{title}</CardTitle>
        {description && (
          <CardDescription className="text-premium-dark/70 dark:text-white/70">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
      {footer && (
        <motion.div
          className="border-t border-premium-dark/10 bg-[#F6F7ED] dark:bg-premium-cardDark p-4 rounded-b-xl"
          animate={isHovered && !prefersReducedMotion ? { backgroundColor: "rgba(196, 212, 165, 0.2)" } : {}}
          transition={{ duration: 0.3 }}
        >
          {footer}
        </motion.div>
      )}
    </MotionCard>
  )
}
