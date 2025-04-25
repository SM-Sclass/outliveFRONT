"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface IncompleteEligibilityAssessmentProps {
  delay?: number
}

export function IncompleteEligibilityAssessment({ delay = 0 }: IncompleteEligibilityAssessmentProps) {
  const prefersReducedMotion = useReducedMotion()

  const iconVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
  }

  return (
    <DashboardCard title="Eligibility Check" description="Verify your treatment eligibility" delay={delay}>
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="mb-4 rounded-full bg-premium-highlight dark:bg-premium-highlightDark p-3"
          variants={iconVariants}
          initial="initial"
          animate={prefersReducedMotion ? "initial" : "animate"}
        >
          <CheckCircle className="h-6 w-6 text-premium-primary dark:text-white" />
        </motion.div>
        <h3 className="text-lg font-medium">Eligibility Assessment Required</h3>
        <p className="mt-1 text-sm text-premium-dark/70 dark:text-white/70">
          Complete a quick assessment to check if you're eligible for our premium treatments.
        </p>

        <div className="mt-6 w-full">
          <Link href="/eligibility-assessment" className="w-full">
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover={prefersReducedMotion ? {} : "hover"}
              whileTap={prefersReducedMotion ? {} : "tap"}
            >
              <Button variant="amber" className="w-full">
                Start Eligibility Check
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </DashboardCard>
  )
}
