"use client"

import Link from "next/link"
import { ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface IncompleteAssessmentsProps {
  delay?: number
}

export function IncompleteAssessments({ delay = 0 }: IncompleteAssessmentsProps) {
  const prefersReducedMotion = useReducedMotion()

  const progressVariants = {
    initial: { width: "0%" },
    animate: { width: "35%", transition: { duration: 1, delay: 0.5 } },
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 10, transition: { duration: 0.3 } },
  }

  return (
    <DashboardCard title="Health Assessment" description="Complete your health profile" delay={delay}>
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="mb-4 rounded-full bg-premium-teal dark:bg-premium-tealDark p-3"
          whileHover={prefersReducedMotion ? {} : iconVariants.hover}
          initial={iconVariants.initial}
        >
          <ClipboardList className="h-6 w-6 text-premium-primary dark:text-white" />
        </motion.div>
        <h3 className="text-lg font-medium">Assessment Incomplete</h3>
        <p className="mt-1 text-sm text-premium-dark/70 dark:text-white/70">
          Your health assessment is incomplete. Complete it to get personalized recommendations.
        </p>

        <div className="mt-4 w-full">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>35%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full rounded-full bg-premium-primary dark:bg-premium-secondary"
              initial={prefersReducedMotion ? {} : progressVariants.initial}
              animate={prefersReducedMotion ? {} : progressVariants.animate}
            />
          </div>
        </div>

        <Link href="/health-assessment" className="mt-6 w-full">
          <Button variant="green" className="w-full">
            Continue Assessment
          </Button>
        </Link>
      </div>
    </DashboardCard>
  )
}
