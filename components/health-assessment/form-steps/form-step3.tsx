"use client"

import type { FormData } from "../health-assessment-form"
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function FormStep3({ formData, updateFormData }: FormStepProps) {
  const symptoms = [
    { id: "fatigue", label: "Fatigue, lethargy, or malaise" },
    { id: "headaches", label: "Headaches" },
    { id: "migraines", label: "Migraines" },
    { id: "walking-difficulty", label: "Difficulty with walking" },
    { id: "balance-difficulty", label: "Difficulty with balance" },
    { id: "unsteadiness", label: "Unsteadiness on feet" },
    { id: "dizziness", label: "Dizziness" },
    { id: "dyspnea", label: "Dyspnea (shortness of breath) on exertion" },
    { id: "insomnia", label: "Insomnia" },
    { id: "agitation", label: "Agitation" },
    { id: "acne", label: "Acne" },
    {
      id: "hyperandrogenism",
      label:
        "Hyperandrogenism (features of acne, irregular periods, deep voice, excessive hair, male pattern hair loss)",
    },
    { id: "irregular-periods", label: "Irregular periods" },
    { id: "perimenopause", label: "Peri-menopause" },
    { id: "none", label: "None / NA" },
  ]

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    let updatedSymptoms = [...formData.symptoms]

    if (checked) {
      // If "None" is selected, clear all other selections
      if (symptomId === "none") {
        updatedSymptoms = ["none"]
      } else {
        // If another option is selected, remove "None" if it exists
        updatedSymptoms = updatedSymptoms.filter((id) => id !== "none")
        // Add the new symptom
        updatedSymptoms.push(symptomId)
      }
    } else {
      // Remove the symptom
      updatedSymptoms = updatedSymptoms.filter((id) => id !== symptomId)
    }

    updateFormData({ symptoms: updatedSymptoms })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Current Symptoms</h2>
        <p className="text-sm text-muted-foreground">
          Please tell us about any symptoms you are currently experiencing.
        </p>
      </div>

      <FormItem className="space-y-3">
        <FormLabel>Do you experience any of the following?</FormLabel>
        <FormDescription>Please check all that apply.</FormDescription>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {symptoms.map((symptom) => (
            <div key={symptom.id} className="flex items-center space-x-2">
              <Checkbox
                id={symptom.id}
                checked={formData.symptoms.includes(symptom.id)}
                onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
              />
              <Label htmlFor={symptom.id}>{symptom.label}</Label>
            </div>
          ))}
        </div>
      </FormItem>
    </div>
  )
}
