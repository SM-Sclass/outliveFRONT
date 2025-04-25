"use client"

import type { FormData } from "../health-assessment-form"
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function FormStep2({ formData, updateFormData }: FormStepProps) {
  const medicalConditions = [
    { id: "type1-diabetes", label: "Type I diabetes" },
    { id: "type2-diabetes", label: "Type II diabetes" },
    { id: "hyperthyroidism", label: "Hyperthyroidism" },
    { id: "hypothyroidism", label: "Hypothyroidism" },
    { id: "endocrine-issues", label: "Other endocrine issues" },
    { id: "pcos", label: "Polycystic ovary syndrome (PCOS)" },
    { id: "bipolar", label: "Bipolar disorder (manic depression)" },
    { id: "depression", label: "Depression" },
    { id: "migraine", label: "Migraine or severe headaches" },
    { id: "lung-disease", label: "Lung disease" },
    { id: "glaucoma", label: "Glaucoma" },
    { id: "kidney-stones", label: "Kidney stones" },
    { id: "anxiety", label: "Anxiety disorder Agitation" },
    { id: "substance-use", label: "Substance use disorder" },
    { id: "insomnia", label: "Insomnia" },
    { id: "medullary-thyroid", label: "Medullary thyroid cancer (or a family history of diagnosis)" },
    { id: "thyroid-cancer", label: "Thyroid cancer" },
    { id: "multiple-endocrine", label: "Multiple endocrine neoplasia syndrome type 2" },
    { id: "diabetic-ketoacidosis", label: "Diabetic ketoacidosis" },
    { id: "diabetic-retinopathy", label: "Diabetic retinopathy" },
    { id: "prediabetes", label: "Prediabetes" },
    { id: "impaired-glucose", label: "Impaired fasting glucose" },
    { id: "gestational-diabetes", label: "Gestational diabetes" },
    { id: "chronic-kidney", label: "Chronic kidney disease" },
    { id: "coronary-artery", label: "Coronary artery disease" },
    { id: "arrhythmias", label: "Arrhythmias" },
    { id: "liver-disease", label: "Liver disease" },
    { id: "seizures", label: "Seizures" },
    { id: "none", label: "None / NA" },
  ]

  const handleMedicalConditionChange = (conditionId: string, checked: boolean) => {
    let updatedConditions = [...formData.medicalConditions]

    if (checked) {
      // If "None" is selected, clear all other selections
      if (conditionId === "none") {
        updatedConditions = ["none"]
      } else {
        // If another option is selected, remove "None" if it exists
        updatedConditions = updatedConditions.filter((id) => id !== "none")
        // Add the new condition
        updatedConditions.push(conditionId)
      }
    } else {
      // Remove the condition
      updatedConditions = updatedConditions.filter((id) => id !== conditionId)
    }

    updateFormData({ medicalConditions: updatedConditions })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Medical History</h2>
        <p className="text-sm text-muted-foreground">
          Please tell us about your medical history to help us provide appropriate care.
        </p>
      </div>

      <FormItem className="space-y-3">
        <FormLabel>Have you ever been treated for or diagnosed with any of the following medical conditions?</FormLabel>
        <FormDescription>
          We're asking again to confirm we've heard you correctly and support your unique needs.
        </FormDescription>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {medicalConditions.map((condition) => (
            <div key={condition.id} className="flex items-center space-x-2">
              <Checkbox
                id={condition.id}
                checked={formData.medicalConditions.includes(condition.id)}
                onCheckedChange={(checked) => handleMedicalConditionChange(condition.id, checked as boolean)}
              />
              <Label htmlFor={condition.id}>{condition.label}</Label>
            </div>
          ))}
        </div>
      </FormItem>
    </div>
  )
}
