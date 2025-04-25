"use client"

import type { FormData } from "../health-assessment-form"
import { FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FormStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export function FormStep1({ formData, updateFormData }: FormStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          Please provide your basic personal information to help us understand your situation better.
        </p>
      </div>

      <div className="space-y-4">
        <FormItem>
          <FormLabel>What is your complete address?</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>What is your occupation? (optional)</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your occupation"
              value={formData.occupation}
              onChange={(e) => updateFormData({ occupation: e.target.value })}
            />
          </FormControl>
        </FormItem>

        <FormItem className="space-y-3">
          <FormLabel>What is your marital status?</FormLabel>
          <RadioGroup
            value={formData.maritalStatus}
            onValueChange={(value) => updateFormData({ maritalStatus: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="marital-single" />
              <Label htmlFor="marital-single">Single (never married) Domestic Partner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="married" id="marital-married" />
              <Label htmlFor="marital-married">Married</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="widowed" id="marital-widowed" />
              <Label htmlFor="marital-widowed">Widowed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="separated" id="marital-separated" />
              <Label htmlFor="marital-separated">Separated</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer-not-to-say" id="marital-prefer-not" />
              <Label htmlFor="marital-prefer-not">I prefer not to answer</Label>
            </div>
          </RadioGroup>
        </FormItem>
      </div>
    </div>
  )
}
