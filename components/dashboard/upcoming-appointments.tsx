"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { motion, AnimatePresence } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface UpcomingAppointmentsProps {
  delay?: number
}

export function UpcomingAppointments({ delay = 0 }: UpcomingAppointmentsProps) {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Sample data
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2023",
      time: "10:00 AM",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "May 22, 2023",
      time: "2:30 PM",
    },
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(196, 212, 165, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <DashboardCard
      title="Upcoming Appointments"
      description="Your scheduled appointments"
      footer={
        <Link href="/dashboard/book-appointment" className="w-full block">
          <Button variant="green" className="w-full">
            Book New Appointment
          </Button>
        </Link>
      }
      delay={delay}
    >
      {appointments.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence>
            {appointments.map((appointment, i) => (
              <motion.div
                key={appointment.id}
                className="rounded-lg border border-premium-dark/5 p-4 dark:border-white/5"
                initial={prefersReducedMotion ? "visible" : "hidden"}
                animate="visible"
                custom={i}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : "hover"}
                onHoverStart={() => setIsHovered(appointment.id)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-premium-teal dark:bg-premium-tealDark text-premium-primary dark:text-white">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-premium-dark/70 dark:text-white/70">{appointment.doctor}</h4>
                      <p className="text-sm text-premium-dark/70 dark:text-white/70">{appointment.specialty}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={isHovered === appointment.id && !prefersReducedMotion ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button variant="outline" size="sm" className="text-premium-dark/70 dark:text-white/70">
                        View
                      </Button>
                    </Link>
                  </motion.div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-premium-dark/70 dark:text-white/70">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-premium-dark/70 dark:text-white/70">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-premium-dark/10 dark:border-white/10 p-4 text-center">
          <p className="text-premium-dark/70 dark:text-white/70">No upcoming appointments</p>
          <Link href="/dashboard/book-appointment" className="mt-2">
            <Button variant="green" size="sm">
              Book Appointment
            </Button>
          </Link>
        </div>
      )}
    </DashboardCard>
  )
}
