"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { HealthAssessmentForm } from "@/components/health-assessment/health-assessment-form"

export default function HealthAssessmentPage() {
  const [isClient, setIsClient] = useState(false)

  // Use useEffect to ensure we only render the form on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex h-16 items-center justify-between border-b px-4 md:px-8">
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
            className="text-outlive-green-400"
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
            <h1 className="text-3xl font-bold tracking-tight">Health Assessment</h1>
            <p className="text-muted-foreground">
              Please complete this assessment to help us personalize your health journey.
              <br />
              Your answers will be kept confidential and used only to create your personalized plan.
            </p>
          </div>
          {isClient && <HealthAssessmentForm />}
        </div>
      </main>
    </div>
  )
}
