import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "My Appointments - Outlive",
  description: "View and manage your upcoming appointments",
}

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
          <p className="text-muted-foreground">View and manage your upcoming consultations</p>
        </div>
        <Link href="/dashboard/book-appointment">
          <Button className="bg-outlive-teal-600 hover:bg-outlive-teal-700">Book New Appointment</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled consultations with health experts</CardDescription>
        </CardHeader>
        <CardContent>
          <UpcomingAppointments />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Appointments</CardTitle>
          <CardDescription>Your previous consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No past appointments found.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
