import type { Metadata } from "next"
import { AppointmentBookingForm } from "@/components/dashboard/appointment-booking-form"

export const metadata: Metadata = {
  title: "Book Appointment - Outlive",
  description: "Book a consultation with Outlive health experts",
}

export default function BookAppointmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
        <p className="text-muted-foreground">Schedule a consultation with one of our health experts</p>
      </div>

      <AppointmentBookingForm />
    </div>
  )
}
