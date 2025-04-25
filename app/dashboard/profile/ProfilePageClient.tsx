"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"
import { HealthAssessmentStatus } from "@/components/profile/health-assessment-status"
import { useSearchParams, useRouter } from "next/navigation"

export default function ProfilePageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "personal")

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/dashboard/profile?tab=${value}`, { scroll: false })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="assessment">Health Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card className="bg-white dark:bg-premium-tealDark">
            <CardHeader >
              <CardTitle className="dark:text-white">Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full bg-outlive-green-500 hover:bg-outlive-green-600 h-8 w-8 p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    <span className="sr-only">Edit profile picture</span>
                  </Button>
                </div>
                <p className="mt-2 text-sm font-medium">Sam Johnson</p>
                <p className="text-xs text-muted-foreground">Member since April 2025</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="dark:text-white">First Name</Label>
                  <Input id="firstName" defaultValue="Sam" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="dark:text-white">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">Email</Label>
                <Input id="email" type="email" defaultValue="sam.johnson@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="dark:text-white">Address</Label>
                <Textarea id="address" defaultValue="123 Main Street, Apt 4B&#10;New York, NY 10001" />
              </div>

              <div className="flex justify-end">
                <Button className="bg-outlive-green-500 hover:bg-outlive-green-600">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Assessment</CardTitle>
              <CardDescription>Complete your comprehensive health assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthAssessmentStatus />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
