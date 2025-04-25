"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ClipboardCheck, AlertCircle, CheckCircle2, Edit } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { loadFormData } from "@/lib/form-storage"
import { formQuestions } from "@/components/health-assessment/form-questions"

export function HealthAssessmentStatus() {
  const router = useRouter()
  const [status, setStatus] = useState<"not_started" | "in_progress" | "completed">("not_started")
  const [progress, setProgress] = useState(0)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  // Total steps: personal info + all questions
  const totalSteps = formQuestions.length + 1

  useEffect(() => {
    const checkAssessmentStatus = async () => {
      setIsLoading(true)
      setLoadError(false)

      try {
        // Add a small delay to ensure localStorage is accessible
        await new Promise((resolve) => setTimeout(resolve, 100))

        const savedData = await loadFormData()

        if (savedData) {
          if (savedData.completed) {
            setStatus("completed")
            setProgress(100)
          } else {
            setStatus("in_progress")
            // Calculate progress percentage
            const currentStep = savedData.step || 0
            const progressPercentage = Math.min(((currentStep + 1) / totalSteps) * 100, 100)
            setProgress(progressPercentage)
          }

          if (savedData.timestamp) {
            setLastUpdated(new Date(savedData.timestamp).toLocaleString())
          }
        } else {
          setStatus("not_started")
          setProgress(0)
        }
      } catch (error) {
        console.error("Error checking assessment status:", error)
        setLoadError(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkAssessmentStatus()
  }, [totalSteps])

  const handleStartAssessment = () => {
    router.push("/health-assessment")
  }

  const handleContinueAssessment = () => {
    router.push("/health-assessment")
  }

  const handleViewAssessment = () => {
    router.push("/health-assessment?mode=view")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-outlive-green-500"></div>
        <span className="ml-3">Loading assessment data...</span>
      </div>
    )
  }

  if (loadError) {
    return (
      <Alert className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800/30">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading assessment data</AlertTitle>
        <AlertDescription>
          There was a problem loading your assessment data. Please try again.
          <div className="mt-4">
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {status === "not_started" && (
        <div className="text-center py-6">
          <ClipboardCheck className="h-16 w-16 text-outlive-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Complete Your Health Assessment</h3>
          <p className="text-muted-foreground mb-6">
            This comprehensive assessment helps us understand your health needs and personalize your experience.
          </p>
          <Button onClick={handleStartAssessment} className="bg-outlive-green-500 hover:bg-outlive-green-600">
            Start Assessment
          </Button>
        </div>
      )}

      {status === "in_progress" && (
        <div className="space-y-4">
          <Alert className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800/30">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Assessment in progress</AlertTitle>
            <AlertDescription>
              You've started your health assessment but haven't completed it yet.
              {lastUpdated && <span className="block text-sm mt-1">Last updated: {lastUpdated}</span>}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Button onClick={handleContinueAssessment} className="w-full bg-outlive-green-500 hover:bg-outlive-green-600 text-black dark:text-white">
            Continue Assessment
          </Button>
        </div>
      )}

      {status === "completed" && (
        <div className="space-y-4">
          <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800/30">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Assessment completed</AlertTitle>
            <AlertDescription>
              You've successfully completed your health assessment.
              {lastUpdated && <span className="block text-sm mt-1">Completed on: {lastUpdated}</span>}
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={handleViewAssessment} className="flex-1" variant="outline">
              View Assessment
            </Button>
            <Button
              onClick={handleStartAssessment}
              className="flex-1 bg-outlive-green-500 hover:bg-outlive-green-600"
              variant="default"
            >
              <Edit className="h-4 w-4 mr-2" />
              Update Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
