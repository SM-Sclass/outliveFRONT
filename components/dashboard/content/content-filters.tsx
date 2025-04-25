"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Activity, Brain, FileText, Weight } from "lucide-react"

export function ContentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const filters = [
    { id: "all", name: "All Content", icon: FileText },
    { id: "fitness", name: "Fitness", icon: Activity },
    { id: "mental-health", name: "Mental Health", icon: Brain },
    { id: "weight-management", name: "Weight Management", icon: Weight },
  ]

  const handleFilterChange = (categoryId: string) => {
    if (categoryId === "all") {
      router.push("/dashboard/content")
    } else {
      router.push(`/dashboard/content?category=${categoryId}`)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg" style={{ color: "#005551" }}>
        Categories
      </h3>
      <div className="space-y-1">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = currentCategory === filter.id

          return (
            <Button
              key={filter.id}
              variant="ghost"
              className={`w-full justify-start ${
                isActive
                  ? "bg-outlive-green-100 text-outlive-green-900 hover:bg-outlive-green-200 dark:bg-outlive-green-900/40 dark:text-outlive-green-200"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleFilterChange(filter.id)}
            >
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full mr-2"
                style={{ backgroundColor: isActive ? "#C4D4A5" : "#FFD493" }}
              >
                <Icon className="h-3 w-3" style={{ color: "#005551" }} />
              </div>
              {filter.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
