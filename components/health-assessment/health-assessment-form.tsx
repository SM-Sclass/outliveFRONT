"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, Check, AlertCircle, Edit } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PersonalInfoStep } from "./steps/personal-info-step"
import { QuestionStep } from "./steps/question-step"
import { formQuestions } from "./form-questions"
import { saveFormData, loadFormData } from "@/lib/form-storage"
import * as React from "react"
import { useMutation } from "@tanstack/react-query"

// Define the form data structure
export type FormData = {
  // Personal Info
  name: string
  email: string
  phone: string
  address: string
  age: number
  gender: string
  blood_group: string
  weight: number
  height: number
  bmi: number
  medicalConditions: string[]
  symptoms: string[]
  otherMedicalConditions: string
  takingMedications: string
  medicationsTaken: string[]
  healthConditions: string[]
  hadSurgeries: string
  normalHeartExam: string
  bloodPressure: string
  waistCircumference: string
  triglycerideLevel: string
  fastingGlucose: string
  hdlCholesterol: string
}

// Initialize empty form data
const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  age: 0,
  gender: "",
  blood_group: "",
  weight: 0,
  height: 0,
  bmi: 0,
  medicalConditions: [],
  symptoms: [],
  otherMedicalConditions: "",
  takingMedications: "",
  medicationsTaken: [],
  healthConditions: [],
  hadSurgeries: "",
  normalHeartExam: "",
  bloodPressure: "",
  waistCircumference: "",
  triglycerideLevel: "",
  fastingGlucose: "",
  hdlCholesterol: "",

}

export function HealthAssessmentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const viewMode = searchParams.get("mode") === "view"
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0) // Start with personal info
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSavedData, setHasSavedData] = useState(false)

  // Initialize react-hook-form
  const methods = useForm<FormData>({
    defaultValues: initialFormData,
    mode: "onChange",
  })

  const { handleSubmit, reset, getValues, setValue } = methods

  // Total steps: personal info + all questions
  const totalSteps = formQuestions.length + 1

  // Load saved form data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      setIsLoading(true)
      try {
        const savedData = await loadFormData()
        if (savedData) {
          // Update all form fields with saved data
          Object.entries(savedData.data).forEach(([key, value]) => {
            setValue(key as keyof FormData, value)
          })

          // If there's a saved step, go to that step
          if (savedData.step !== undefined) {
            setCurrentStep(savedData.step)
            setHasSavedData(true)
          }

          // If the assessment is completed and we're not in view mode, redirect to view mode
          if (savedData.completed && !viewMode) {
            toast({
              title: "Assessment Already Completed",
              description: "You can view or update your assessment.",
              variant: "default",
            })
          }

          toast({
            title: "Progress Loaded",
            description: "Your previous answers have been loaded.",
            variant: "default",
          })
        }
      } catch (error) {
        console.error("Error loading saved form data:", error)
        toast({
          title: "Error Loading Progress",
          description: "We couldn't load your previous answers.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSavedData()
  }, [setValue, viewMode])

  // Save progress with debounce
  const saveProgressTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const saveProgress = async () => {
    // Clear any existing timeout
    if (saveProgressTimeoutRef.current) {
      clearTimeout(saveProgressTimeoutRef.current)
    }

    setIsSaving(true)

    // Use a timeout to debounce the save operation
    saveProgressTimeoutRef.current = setTimeout(async () => {
      try {
        const currentFormData = getValues()

        // Ensure we're not saving empty or invalid data
        if (!currentFormData || Object.keys(currentFormData).length === 0) {
          throw new Error("Invalid form data")
        }

        await saveFormData({
          data: currentFormData,
          step: currentStep,
          timestamp: new Date().toISOString(),
        })

        toast({
          title: "Progress Saved",
          description: "Your answers have been saved successfully.",
          variant: "default",
        })
      } catch (error) {
        console.error("Error saving form data:", error)
        toast({
          title: "Error Saving Progress",
          description: "We couldn't save your answers. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSaving(false)
        saveProgressTimeoutRef.current = null
      }
    }, 300) // 300ms debounce
  }

  // Handle next step
  const handleNext = async () => {
    // Save progress automatically when moving to next step
    await saveProgress()

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    } else {
      // Submit the form
      handleFinalSubmit()
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  // Mutation for submitting patient data
  const createPatientMutation = useMutation({
    mutationFn: async (payload: any) => {
      const response = await fetch("/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit health assessment");
      }

      return response.json();
    },
  });
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const finalFormData = getValues();

      const payload = {
        name: finalFormData.name,
        email: finalFormData.email,
        phone: "+91" + finalFormData.phone,
        address: finalFormData.address,
        age: Number(finalFormData.age),
        gender: finalFormData.gender,
        blood_group: finalFormData.blood_group,
        height: Number(finalFormData.height),
        weight: Number(finalFormData.weight),
        bmi: Number(finalFormData.bmi),
        status: "Pending", // Mandatory field
        form_data: {
          medicalConditions: finalFormData.medicalConditions,
          symptoms: finalFormData.symptoms,
          otherMedicalConditions: finalFormData.otherMedicalConditions,
          takingMedications: finalFormData.takingMedications,
          medicationsTaken: finalFormData.medicationsTaken,
          healthConditions: finalFormData.healthConditions,
          hadSurgeries: finalFormData.hadSurgeries,
          normalHeartExam: finalFormData.normalHeartExam,
          bloodPressure: finalFormData.bloodPressure,
          waistCircumference: finalFormData.waistCircumference,
          triglycerideLevel: finalFormData.triglycerideLevel,
          fastingGlucose: finalFormData.fastingGlucose,
          hdlCholesterol: finalFormData.hdlCholesterol,
        },
      };

      await createPatientMutation.mutateAsync(payload);

      toast({
        title: "Assessment Completed",
        description: "Thank you for completing the health assessment.",
        variant: "default",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error Submitting Assessment",
        description: (error as Error).message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };



  // Calculate progress percentage
  const progress = ((currentStep + 1) / totalSteps) * 100

  // Determine if the current step is valid and can proceed
  const canProceed = () => {
    const formData = getValues()

    if (currentStep === 0) {
      // Personal info validation
      return formData.name && formData.email && formData.phone
    }

    // For other steps, check if required fields are filled
    const question = formQuestions[currentStep - 1]

    if (question.required) {
      const fieldValue = formData[question.fieldName as keyof FormData]

      if (Array.isArray(fieldValue)) {
        return fieldValue.length > 0
      }

      return Boolean(fieldValue)
    }

    return true
  }

  // Reset the form and start over
  const handleReset = () => {
    if (window.confirm("Are you sure you want to start over? All your progress will be lost.")) {
      reset(initialFormData)
      setCurrentStep(0)
      localStorage.removeItem("healthAssessmentData")
      window.scrollTo(0, 0)

      toast({
        title: "Assessment Reset",
        description: "Your assessment has been reset. You can start over.",
        variant: "default",
      })
    }
  }

  const isReadOnly = viewMode

  if (isLoading) {
    return (
      <Card className="border-2 border-muted">
        <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-outlive-green-500 mx-auto mb-4"></div>
            <p>Loading your assessment data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <FormProvider {...methods}>
      <Card className="border-2 border-muted">
        <CardContent className="p-6">
          {viewMode && (
            <Alert className="mb-6 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>View Mode</AlertTitle>
              <AlertDescription>
                You're viewing your completed assessment. You can make updates if needed.
              </AlertDescription>
            </Alert>
          )}
          {hasSavedData && (
            <Alert className="mb-6 bg-outlive-green-50 text-outlive-green-800 dark:bg-outlive-green-900/20 dark:text-outlive-green-300">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Continuing from saved progress</AlertTitle>
              <AlertDescription>
                We've loaded your previous answers. You can continue from where you left off.
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Step {currentStep + 1} of {totalSteps}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveProgress}
                  disabled={isSaving}
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Progress"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-destructive hover:text-destructive"
                >
                  Start Over
                </Button>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-muted" />
          </div>

          <div className="min-h-[400px]">
            {currentStep === 0 ? (
              <PersonalInfoStep isReadOnly={isReadOnly} />
            ) : (
              <QuestionStep question={formQuestions[currentStep - 1]} isReadOnly={isReadOnly} />
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-6 pt-0">
          {viewMode ? (
            <>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/profile?tab=assessment")}
                className="flex items-center gap-1"
              >
                Back to Profile
              </Button>
              <Button
                onClick={() => router.push("/health-assessment")}
                className="flex items-center gap-1 bg-outlive-green-500 hover:bg-outlive-green-600 dark:text-white"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Assessment
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={isSubmitting || !canProceed()}
                className="flex items-center gap-1 bg-outlive-green-500 hover:bg-outlive-green-600 text-black"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : currentStep === totalSteps - 1 ? (
                  <>
                    Complete
                    <Check className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  )
}