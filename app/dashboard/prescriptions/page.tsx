import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Prescriptions - Early",
  description: "View and download your prescriptions",
}

export default function PrescriptionsPage() {
  return (
    <div className="space-y-6 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
        <p className="text-muted-foreground">View and download your prescriptions</p>
      </div>

      <Card className="bg-premium-teal dark:bg-premium-tealDark" >
        <CardHeader className="text-premium-dark/70 dark:text-white/90">
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>Your most recent prescriptions from consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 " >
            <div className="rounded-lg border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-medium">General Health Prescription</h3>
                <p className="text-sm text-muted-foreground">Dr. Robert Williams</p>
                <p className="text-sm text-muted-foreground">April 20, 2025</p>
              </div>
              <Button variant="outline" className="flex items-center text-premium-dark/70 dark:text-white/90">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>

            <div className="rounded-lg border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-medium">Nutritional Supplements</h3>
                <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">April 15, 2025</p>
              </div>
              <Button variant="outline" className="flex items-center text-premium-dark/70 dark:text-white/90">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-premium-teal dark:bg-premium-tealDark" >
        <CardHeader className="text-premium-dark/70 dark:text-white/90">
          <CardTitle>Prescription History</CardTitle>
          <CardDescription>All your past prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No additional prescriptions found.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
