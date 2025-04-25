import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LatestConsultations } from "@/components/dashboard/latest-consultations"

export const metadata: Metadata = {
  title: "Consultations History - Outlive",
  description: "View your past consultations and access recordings",
}

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Consultations History</h1>
        <p className="text-muted-foreground">View your past consultations and access recordings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Consultations</CardTitle>
          <CardDescription>Your most recent health consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <LatestConsultations />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Consultations</CardTitle>
          <CardDescription>Complete history of your consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No additional consultations found.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
