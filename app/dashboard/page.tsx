import { Suspense } from "react"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { LatestConsultations } from "@/components/dashboard/latest-consultations"
import { SubscriptionStatus } from "@/components/dashboard/subscription-status"
import { IncompleteAssessments } from "@/components/dashboard/incomplete-assessments"
import { IncompleteEligibilityAssessment } from "@/components/dashboard/incomplete-eligibility"
import { AnimatedPageTransition } from "@/components/animated-page-transition"

export default function DashboardPage() {
  return (
    <AnimatedPageTransition>
      <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
            <UpcomingAppointments delay={0} />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
            <LatestConsultations  />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
            <SubscriptionStatus />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
            <IncompleteAssessments delay={3} />
          </Suspense>
          <Suspense fallback={<div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>}>
            <IncompleteEligibilityAssessment delay={4} />
          </Suspense>
        </div>
      </div>
    </AnimatedPageTransition>
  )
}
