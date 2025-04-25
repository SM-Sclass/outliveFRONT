"use client"

import { BadgeCheck, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function SubscriptionStatus() {
  // Example subscription data
  const subscription = {
    plan: "Metabolic Reset",
    status: "Active",
    renewalDate: "May 15, 2025",
    daysLeft: 20,
    totalDays: 30,
    features: ["Unlimited Consultations", "Priority Booking", "24/7 Support"],
  }

  // Calculate percentage of subscription period left
  const percentLeft = (subscription.daysLeft / subscription.totalDays) * 100

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-premium-teal dark:bg-premium-tealDark p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-lg font-medium text-premium-primary dark:text-white">{subscription.plan}</span>
              <Badge className="ml-2 bg-premium-highlight text-premium-dark dark:bg-premium-highlightDark dark:text-white">
                {subscription.status}
              </Badge>
            </div>
            <p className="text-sm text-premium-dark/70 dark:text-white/70">Renews on {subscription.renewalDate}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-premium-dark/70 dark:text-white/70">Time Remaining</span>
          <span className="font-medium dark:text-white">{subscription.daysLeft} days left</span>
        </div>
        <Progress value={percentLeft} className="h-2 bg-premium-teal/30 dark:bg-premium-tealDark">
          <div
            className="h-full bg-premium-primary dark:bg-premium-secondary rounded-full"
            style={{ width: `${percentLeft}%` }}
          ></div>
        </Progress>
      </div>

      <ul className="space-y-2">
        {subscription.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm dark:text-white">
            <BadgeCheck className="mr-2 h-4 w-4 text-premium-primary dark:text-premium-secondary" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        className="w-full justify-between border-premium-primary text-premium-primary hover:bg-premium-teal dark:border-premium-secondary dark:text-premium-secondary dark:hover:bg-premium-tealDark"
      >
        <span>Manage Subscription</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
