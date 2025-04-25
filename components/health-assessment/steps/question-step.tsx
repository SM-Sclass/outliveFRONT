"use client"

import { useFormContext } from "react-hook-form"
import { FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { FormData } from "../health-assessment-form"

interface QuestionStepProps {
  question: {
    id: number
    text: string
    description?: string
    fieldName: string
    type: string
    options?: { value: string; label: string }[]
    required?: boolean
    placeholder?: string
    dependsOn?: {
      field: string
      value: string
    }
  }
  isReadOnly?: boolean
}

// Update the component to accept and handle the isReadOnly prop
export function QuestionStep({ question, isReadOnly = false }: QuestionStepProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>()

  const fieldName = question.fieldName as keyof FormData

  // Get the current value for the field
  const fieldValue = watch(question.fieldName as keyof FormData)

  // Check if this question should be shown based on dependencies
  if (question.dependsOn) {
    const dependentValue = watch(question.dependsOn.field as keyof FormData)
    if (dependentValue !== question.dependsOn.value) {
      return null
    }
  }

  // Handle checkbox change for array fields
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (isReadOnly) return
    const currentValues = Array.isArray(fieldValue) ? [...fieldValue] : []

    if (checked) {
      // If "None" is selected, clear all other selections
      if (value === "none") {
        setValue(question.fieldName as keyof FormData, ["none"] as any)
      } else {
        // If another option is selected, remove "None" if it exists
        const filteredValues = currentValues.filter((v) => v !== "none")
        // Add the new value
        setValue(question.fieldName as keyof FormData, [...filteredValues, value] as any)
      }
    } else {
      // Remove the value
      setValue(question.fieldName as keyof FormData, currentValues.filter((v) => v !== value) as any)
    }
  }

  return (
    <div className="space-y-6">
      

      <FormItem>
        <FormLabel>{question.text}</FormLabel>
        {question.description && <FormDescription>{question.description}</FormDescription>}

        {question.type === "text" && (
          <FormControl>
            <Input
              id={fieldName}
              placeholder={question.placeholder || `Enter your ${question.text?.toLowerCase()}`}
              {...register(question.fieldName as keyof FormData, {
                required: question.required ? `${question.text} is required` : false,
              })}
              disabled={isReadOnly}
              className={isReadOnly ? "bg-muted" : ""}
            />
          </FormControl>
        )}

        {question.type === "textarea" && (
          <FormControl>
            <Textarea
              placeholder={question.placeholder || `Enter your ${question.text.toLowerCase()}`}
              {...register(question.fieldName as keyof FormData, {
                required: question.required ? `${question.text} is required` : false,
              })}
              disabled={isReadOnly}
              className={isReadOnly ? "bg-muted" : ""}
            />
          </FormControl>
        )}

        {question.type === "radio" && question.options && (
          <RadioGroup
            value={fieldValue as string}
            onValueChange={(value) => setValue(question.fieldName as keyof FormData, value as any)}
            disabled={isReadOnly}
            className={isReadOnly ? "opacity-80" : ""}
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${question.fieldName}-${option.value}`}
                  disabled={isReadOnly}
                />
                <Label htmlFor={`${question.fieldName}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === "checkbox" && question.options && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.fieldName}-${option.value}`}
                  checked={Array.isArray(fieldValue) && fieldValue.includes(option.value)}
                  onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                  disabled={isReadOnly}
                  className={isReadOnly ? "opacity-80" : ""}
                />
                <Label htmlFor={`${question.fieldName}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </div>
        )}

        {errors[question.fieldName as keyof FormData] && (
          <FormMessage>{errors[question.fieldName as keyof FormData]?.message}</FormMessage>
        )}
      </FormItem>
      {isReadOnly && (
        <p className="text-sm text-muted-foreground italic mt-4">
          This information is read-only. To make changes, click the Edit Assessment button.
        </p>
      )}
    </div>
  )
}
