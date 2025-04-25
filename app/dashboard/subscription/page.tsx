import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Subscription - Outlive",
  description: "Manage your subscription plan",
}

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            <Badge className="bg-outlive-green-600">Active</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Trial Plan</h3>
                <p className="text-sm text-muted-foreground">One month trial</p>
                <p className="text-lg font-medium mt-2">₹9,000/month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Renews on May 15, 2025</p>
                <Button variant="outline">Manage Payment Method</Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-2">Your plan includes:</h4>
              <ul className="grid gap-2 md:grid-cols-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-outlive-green-600" />
                  <span>5 Consultations/month</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-outlive-green-600" />
                  <span>Full Health Assessment</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-outlive-green-600" />
                  <span>Personalized Health Plan</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-outlive-green-600" />
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-outlive-green-600" />
                  <span>Full Content Library</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-muted/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Metabolic Reset</h3>
                <p className="text-sm text-muted-foreground">6-month program</p>
                <p className="text-lg font-medium mt-2">₹45,000 (₹7,500/month)</p>
              </div>
              <div>
                <Button className="w-full bg-outlive-teal-600 hover:bg-outlive-teal-700">Upgrade Plan</Button>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Upgrade to our comprehensive 6-month Metabolic Reset program after your trial ends for a complete health
                transformation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
              <div>Date</div>
              <div>Description</div>
              <div>Amount</div>
              <div className="text-right">Invoice</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-4 gap-4 p-4 items-center">
                <div className="text-sm">Apr 15, 2025</div>
                <div className="text-sm">Trial Plan - Monthly</div>
                <div className="text-sm">₹9,000</div>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-outlive-teal-600 hover:text-outlive-teal-700 hover:bg-outlive-teal-50"
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4 items-center">
                <div className="text-sm">Mar 15, 2025</div>
                <div className="text-sm">Trial Plan - Monthly</div>
                <div className="text-sm">₹9,000</div>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-outlive-teal-600 hover:text-outlive-teal-700 hover:bg-outlive-teal-50"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
