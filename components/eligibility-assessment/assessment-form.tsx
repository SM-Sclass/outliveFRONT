"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Check, ArrowLeft, ArrowRight } from "lucide-react"

// Add imports for the form storage utilities
import { saveEligibilityData, loadEligibilityData, clearEligibilityData } from "@/lib/eligibility-form-storage"

// Define different schema for each step
const step1Schema = z.object({
  age: z.coerce
    .number()
    .min(18, {
      message: "You must be at least 18 years old",
    })
    .max(120),
  gender: z.string().min(1, {
    message: "Please select your gender",
  }),
  height: z.coerce
    .number()
    .min(100, {
      message: "Please enter a valid height",
    })
    .max(250),
  weight: z.coerce
    .number()
    .min(30, {
      message: "Please enter a valid weight",
    })
    .max(300),
})

const step2Schema = z.object({
  medicalConditions: z.array(z.string()).optional(),
  medicationsList: z.string().optional(),
  allergies: z.string().optional(),
  familyHistory: z.array(z.string()).optional(),
})

const step3Schema = z.object({
  dietaryPreference: z.string(),
  exerciseFrequency: z.string(),
  smokingStatus: z.string(),
  alcoholConsumption: z.string(),
  sleepQuality: z.string(),
  stressLevel: z.string(),
})

const step4Schema = z.object({
  goals: z.array(z.string()).min(1, {
    message: "Please select at least one goal",
  }),
  otherGoals: z.string().optional(),
  preferredConsultation: z.string(),
  preferredCommunication: z.array(z.string()).min(1, {
    message: "Please select at least one communication method",
  }),
})

// Define a type for saving all form data
type FormData = z.infer<typeof step1Schema> &
  z.infer<typeof step2Schema> &
  z.infer<typeof step3Schema> &
  z.infer<typeof step4Schema>

export function AssessmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<FormData>>({})

  // Initialize a separate form for each step
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      age: 0, // Change from undefined to 0
      gender: "",
      height: 0, // Change from undefined to 0
      weight: 0, // Change from undefined to 0
    },
  })

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      medicalConditions: [],
      medicationsList: "",
      allergies: "",
      familyHistory: [],
    },
  })

  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      dietaryPreference: "",
      exerciseFrequency: "",
      smokingStatus: "",
      alcoholConsumption: "",
      sleepQuality: "",
      stressLevel: "",
    },
  })

  const step4Form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      goals: [],
      otherGoals: "",
      preferredConsultation: "",
      preferredCommunication: [],
    },
  })

  // Add useEffect to load saved data on component mount
  useEffect(() => {
    const savedData = loadEligibilityData()
    if (savedData) {
      // Set the current step
      setStep(savedData.step)

      // Load the form data for each step
      if (savedData.formData.step1) {
        step1Form.reset(savedData.formData.step1)
      }
      if (savedData.formData.step2) {
        step2Form.reset(savedData.formData.step2)
      }
      if (savedData.formData.step3) {
        step3Form.reset(savedData.formData.step3)
      }
      if (savedData.formData.step4) {
        step4Form.reset(savedData.formData.step4)
      }
    }
  }, [])

  // Function to handle step 1 submission
  function onSubmitStep1(values: z.infer<typeof step1Schema>) {
    // Save the current step data
    const currentFormData = {
      step: 2,
      formData: {
        step1: values,
        step2: step2Form.getValues(),
        step3: step3Form.getValues(),
        step4: step4Form.getValues(),
      },
      timestamp: new Date().toISOString(),
    }
    saveEligibilityData(currentFormData)

    // Update the form data state
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(2)
  }

  // Function to handle step 2 submission
  function onSubmitStep2(values: z.infer<typeof step2Schema>) {
    // Save the current step data
    const currentFormData = {
      step: 3,
      formData: {
        step1: step1Form.getValues(),
        step2: values,
        step3: step3Form.getValues(),
        step4: step4Form.getValues(),
      },
      timestamp: new Date().toISOString(),
    }
    saveEligibilityData(currentFormData)

    // Update the form data state
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(3)
  }

  // Function to handle step 3 submission
  function onSubmitStep3(values: z.infer<typeof step3Schema>) {
    // Save the current step data
    const currentFormData = {
      step: 4,
      formData: {
        step1: step1Form.getValues(),
        step2: step2Form.getValues(),
        step3: values,
        step4: step4Form.getValues(),
      },
      timestamp: new Date().toISOString(),
    }
    saveEligibilityData(currentFormData)

    // Update the form data state
    setFormData((prev) => ({ ...prev, ...values }))
    setStep(4)
  }

  // Function to handle step 4 (final) submission
  function onSubmitStep4(values: z.infer<typeof step4Schema>) {
    setIsSubmitting(true)

    // Save the final form data
    const finalFormData = {
      step: 4,
      formData: {
        step1: step1Form.getValues(),
        step2: step2Form.getValues(),
        step3: step3Form.getValues(),
        step4: values,
      },
      timestamp: new Date().toISOString(),
      completed: true,
    }
    saveEligibilityData(finalFormData)

    // Update the form data state
    const finalData = { ...formData, ...values }

    // Simulate API call to submit the form
    setTimeout(() => {
      setIsSubmitting(false)
      clearEligibilityData() // Clear the form data after successful submission

      // Once the assessment is completed, redirect to dashboard
      router.push("/dashboard")
    }, 2000)
  }

  // Calculate progress percentage
  const progress = (step / 4) * 100

  // Medical conditions checkboxes
  const medicalConditionItems = [
    { id: "diabetes", label: "Diabetes" },
    { id: "hypertension", label: "Hypertension" },
    { id: "heartDisease", label: "Heart Disease" },
    { id: "asthma", label: "Asthma" },
    { id: "arthritis", label: "Arthritis" },
    { id: "cancer", label: "Cancer" },
    { id: "depression", label: "Depression/Anxiety" },
    { id: "none", label: "None of the above" },
  ]

  // Family history checkboxes
  const familyHistoryItems = [
    { id: "familyDiabetes", label: "Diabetes" },
    { id: "familyHeartDisease", label: "Heart Disease" },
    { id: "familyHypertension", label: "Hypertension" },
    { id: "familyCancer", label: "Cancer" },
    { id: "familyAutoimmune", label: "Autoimmune Disorders" },
    { id: "familyNone", label: "None of the above" },
  ]

  // Health goals checkboxes
  const healthGoalItems = [
    { id: "weightLoss", label: "Weight Loss" },
    { id: "muscleGain", label: "Muscle Gain" },
    { id: "betterSleep", label: "Better Sleep" },
    { id: "stressReduction", label: "Stress Reduction" },
    { id: "improvedNutrition", label: "Improved Nutrition" },
    { id: "chronicDiseaseManagement", label: "Chronic Disease Management" },
    { id: "mentalHealth", label: "Mental Health Improvement" },
  ]

  // Communication preferences checkboxes
  const communicationItems = [
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "videoCall", label: "Video Call" },
    { id: "inPerson", label: "In-Person" },
  ]

  return (
    <Card className="border-2 border-muted">
      <CardContent className="p-6">
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Step {step} of 4</p>
            <p className="text-sm text-muted-foreground">
              {step === 1 && "Basic Information"}
              {step === 2 && "Medical History"}
              {step === 3 && "Lifestyle Information"}
              {step === 4 && "Goals & Preferences"}
            </p>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>

        {step === 1 && (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(onSubmitStep1)} className="space-y-6">
              <FormField
                control={step1Form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your age"
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === "" ? 0 : e.target.valueAsNumber
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="nonbinary">Non-binary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={step1Form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your height in cm"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === "" ? 0 : e.target.valueAsNumber
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your weight in kg"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value === "" ? 0 : e.target.valueAsNumber
                            field.onChange(value)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" className="bg-outlive-teal-600 hover:bg-outlive-teal-700">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(onSubmitStep2)} className="space-y-6">
              <FormField
                control={step2Form.control}
                name="medicalConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have any of the following medical conditions?</FormLabel>
                    <FormDescription>Select all that apply</FormDescription>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {medicalConditionItems.map((item) => (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), item.id])
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="medicationsList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you currently taking any medications?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any medications you're currently taking (or enter 'None')"
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have any allergies?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any allergies (food, medications, etc.) or enter 'None'"
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Medical History</FormLabel>
                    <FormDescription>Select conditions that run in your immediate family</FormDescription>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {familyHistoryItems.map((item) => (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), item.id])
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="submit" className="bg-outlive-teal-600 hover:bg-outlive-teal-700">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 3 && (
          <Form {...step3Form}>
            <form onSubmit={step3Form.handleSubmit(onSubmitStep3)} className="space-y-6">
              <FormField
                control={step3Form.control}
                name="dietaryPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your dietary preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="omnivore">Omnivore (Meat & Vegetables)</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="pescatarian">Pescatarian</SelectItem>
                        <SelectItem value="keto">Keto</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                        <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step3Form.control}
                name="exerciseFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select how often you exercise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (Little to no exercise)</SelectItem>
                        <SelectItem value="light">Light (1-2 days per week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-4 days per week)</SelectItem>
                        <SelectItem value="active">Active (5+ days per week)</SelectItem>
                        <SelectItem value="very-active">Very Active (Daily intense exercise)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step3Form.control}
                name="smokingStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Smoking Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="never" />
                          </FormControl>
                          <FormLabel className="font-normal">Never smoked</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="former" />
                          </FormControl>
                          <FormLabel className="font-normal">Former smoker</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="current" />
                          </FormControl>
                          <FormLabel className="font-normal">Current smoker</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step3Form.control}
                name="alcoholConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alcohol Consumption</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your alcohol consumption" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="occasional">Occasional (1-2 drinks/month)</SelectItem>
                        <SelectItem value="moderate">Moderate (1-2 drinks/week)</SelectItem>
                        <SelectItem value="regular">Regular (3-5 drinks/week)</SelectItem>
                        <SelectItem value="frequent">Frequent (Daily or almost daily)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step3Form.control}
                name="sleepQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Quality</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your sleep quality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="poor">Poor (Frequent disturbances/insomnia)</SelectItem>
                        <SelectItem value="fair">Fair (Occasional disturbances)</SelectItem>
                        <SelectItem value="good">Good (Usually sleep well)</SelectItem>
                        <SelectItem value="excellent">Excellent (Consistently sleep well)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step3Form.control}
                name="stressLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stress Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your typical stress level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low (Rarely feel stressed)</SelectItem>
                        <SelectItem value="moderate">Moderate (Occasionally stressed)</SelectItem>
                        <SelectItem value="high">High (Frequently stressed)</SelectItem>
                        <SelectItem value="severe">Severe (Constantly stressed)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="submit" className="bg-outlive-teal-600 hover:bg-outlive-teal-700">
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 4 && (
          <Form {...step4Form}>
            <form onSubmit={step4Form.handleSubmit(onSubmitStep4)} className="space-y-6">
              <FormField
                control={step4Form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Goals</FormLabel>
                    <FormDescription>Select all that apply to you</FormDescription>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {healthGoalItems.map((item) => (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), item.id])
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step4Form.control}
                name="otherGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Health Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other specific health goals not listed above?"
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step4Form.control}
                name="preferredConsultation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Consultation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred consultation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="doctor">General Practitioner</SelectItem>
                        <SelectItem value="nutritionist">Nutritionist</SelectItem>
                        <SelectItem value="therapist">Mental Health Therapist</SelectItem>
                        <SelectItem value="fitnessCoach">Fitness Coach</SelectItem>
                        <SelectItem value="sleepSpecialist">Sleep Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step4Form.control}
                name="preferredCommunication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Communication Methods</FormLabel>
                    <FormDescription>Select all that apply</FormDescription>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {communicationItems.map((item) => (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value || []), item.id])
                                } else {
                                  field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-outlive-green-600 hover:bg-outlive-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Complete Assessment
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
