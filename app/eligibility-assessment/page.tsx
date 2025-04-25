import type { Metadata } from "next"
import { Suspense } from "react"
import { AssessmentForm } from "@/components/eligibility-assessment/assessment-form"
import { HealthAssessmentForm } from "@/components/health-assessment/health-assessment-form"

import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Eligibility Assessment - Outlive",
  description: "Complete your eligibility assessment to personalize your Outlive experience",
}

export default function EligibilityAssessmentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-outlive-teal-600"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <h1 className="text-xl font-bold">Outlive</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-1 py-8">
        <div className="container max-w-3xl space-y-10 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Eligibility Assessment</h1>
            <p className="text-muted-foreground">
              Please complete this assessment to help us personalize your health journey.
              <br />
              Your answers will be kept confidential and used only to create your personalized plan.
            </p>
          </div>
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <HealthAssessmentForm />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
