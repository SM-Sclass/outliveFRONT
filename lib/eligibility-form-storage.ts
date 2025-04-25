// Define the structure for saved form data
export interface SavedEligibilityData {
  step: number
  formData: {
    step1?: any
    step2?: any
    step3?: any
    step4?: any
  }
  timestamp: string
  completed?: boolean
}

// Function to save form data to localStorage
export function saveEligibilityData(data: SavedEligibilityData): void {
  try {
    localStorage.setItem("eligibilityFormData", JSON.stringify(data))
  } catch (error) {
    console.error("Error saving eligibility form data:", error)
  }
}

// Function to load form data from localStorage
export function loadEligibilityData(): SavedEligibilityData | null {
  try {
    const savedData = localStorage.getItem("eligibilityFormData")
    if (savedData) {
      return JSON.parse(savedData) as SavedEligibilityData
    }
    return null
  } catch (error) {
    console.error("Error loading eligibility form data:", error)
    return null
  }
}

// Function to clear form data from localStorage
export function clearEligibilityData(): void {
  try {
    localStorage.removeItem("eligibilityFormData")
  } catch (error) {
    console.error("Error clearing eligibility form data:", error)
  }
}
