"use client"

import { Download, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const completedConsultations = [
  {
    id: 1,
    doctorName: "Dr. Robert Williams",
    specialty: "General Practitioner",
    date: "April 20, 2025",
    hasPrescription: true,
    hasRecording: true,
    image: "/compassionate-doctor-consultation.png",
  },
  {
    id: 2,
    doctorName: "Dr. Emily Taylor",
    specialty: "Therapist",
    date: "April 8, 2025",
    hasPrescription: false,
    hasRecording: true,
    image: "/confident-female-doctor.png",
  },
]

export function LatestConsultations() {
  return (
    <div className="space-y-4">
      {completedConsultations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="mb-2 h-12 w-12 text-premium-primary dark:text-premium-secondary" />
          <h3 className="mb-1 text-lg font-medium dark:text-white">No Completed Consultations</h3>
          <p className="mb-4 text-sm text-premium-dark/70 dark:text-white/70">
            You don't have any completed consultations yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-premium-dark/5 dark:divide-white/10">
          {completedConsultations.map((consultation) => (
            <div key={consultation.id} className="py-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 border-2 border-premium-teal dark:border-premium-tealDark">
                    <AvatarImage src={consultation.image || "/placeholder.svg"} alt={consultation.doctorName} />
                    <AvatarFallback className="bg-premium-primary text-white dark:bg-premium-secondary">
                      {consultation.doctorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-premium-dark dark:text-white">{consultation.doctorName}</h3>
                    <p className="text-sm text-premium-dark/70 dark:text-white/70">{consultation.specialty}</p>
                    <div className="mt-2 flex items-center text-xs text-premium-dark/70 dark:text-white/70">
                      <Calendar className="mr-1 h-3.5 w-3.5 text-premium-primary dark:text-premium-secondary" />
                      {consultation.date}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {consultation.hasPrescription && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-premium-primary hover:bg-premium-teal dark:text-premium-secondary dark:hover:bg-premium-tealDark"
                      title="Download Prescription"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Download Prescription</span>
                    </Button>
                  )}
                  {consultation.hasRecording && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-premium-primary hover:bg-premium-teal dark:text-premium-secondary dark:hover:bg-premium-tealDark"
                      title="Download Recording"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download Recording</span>
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-premium-primary text-premium-primary hover:bg-premium-teal dark:border-premium-secondary dark:text-premium-secondary dark:hover:bg-premium-tealDark"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
