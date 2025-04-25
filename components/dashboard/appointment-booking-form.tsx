"use client"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define form schema
const formSchema = z.object({
  specialist: z.string({
    required_error: "Please select a specialist",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot",
  }),
  details: z.string().optional(),
})

// Example specialists
const specialists = [
  {
    id: "dr-johnson",
    name: "Dr. Sarah Johnson",
    role: "Nutritionist",
    avatar: "/placeholder.svg?height=40&width=40",
    availability: ["morning", "afternoon"],
  },
  {
    id: "dr-patel",
    name: "Dr. Raj Patel",
    role: "General Practitioner",
    avatar: "/placeholder.svg?height=40&width=40",
    availability: ["morning", "evening"],
  },
  {
    id: "dr-rodriguez",
    name: "Dr. Maria Rodriguez",
    role: "Therapist",
    avatar: "/placeholder.svg?height=40&width=40",
    availability: ["afternoon", "evening"],
  },
  {
    id: "dr-chen",
    name: "Dr. Michael Chen",
    role: "Nutritionist",
    avatar: "/placeholder.svg?height=40&width=40",
    availability: ["morning", "afternoon"],
  },
  {
    id: "dr-williams",
    name: "Dr. Emily Williams",
    role: "Fitness Coach",
    avatar: "/placeholder.svg?height=40&width=40",
    availability: ["afternoon"],
  },
]

// Example time slots
const timeSlots = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
  evening: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"],
}

export function AppointmentBookingForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialist: "",
      details: "",
    },
  })

  const watchDate = form.watch("date")

  // Get available time slots based on selected specialist and date
  const getAvailableTimeSlots = () => {
    if (!selectedSpecialistId || !watchDate) return []

    const specialist = specialists.find((s) => s.id === selectedSpecialistId)
    if (!specialist) return []

    // Combine all time slots from available periods (morning, afternoon, evening)
    return specialist.availability.flatMap((period) => timeSlots[period as keyof typeof timeSlots])
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect or show success message
      setStep(2) // Show confirmation
    }, 1500)
  }

  const handleSpecialistSelect = (specialistId: string) => {
    setSelectedSpecialistId(specialistId)
    form.setValue("specialist", specialistId)
  }

  return (
    <Card className="border-2 border-muted bg-white dark:bg-premium-tealDark">
      <CardHeader>
        <CardTitle className="text-premium-dark/70 dark:text-white">Book an Appointment</CardTitle>
        <CardDescription>
          {step === 1 && "Schedule a consultation with one of our specialists"}
          {step === 2 && "Your appointment has been scheduled"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="specialist"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Specialist</FormLabel>
                        <FormControl>
                          <div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                              {specialists.map((specialist) => (
                                <div
                                  key={specialist.id}
                                  className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-colors ${selectedSpecialistId === specialist.id
                                      ? "border-outlive-green-400 bg-outlive-green-50 dark:bg-outlive-green-900/10"
                                      : "hover:border-outlive-green-400 hover:bg-outlive-green-50 dark:hover:bg-outlive-green-900/10"
                                    }`}
                                  onClick={() => handleSpecialistSelect(specialist.id)}
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-10 w-10 border">
                                      <AvatarImage src={specialist.avatar || "/placeholder.svg"} alt={specialist.name} />
                                      <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <h3 className="font-medium">{specialist.name}</h3>
                                      <p className="text-sm text-muted-foreground">{specialist.role}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <input type="hidden" {...form.register("specialist")} value={selectedSpecialistId || ""} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="dark:text-white">Appointment Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date)
                                form.setValue("timeSlot", "") // Reset time slot when date changes
                              }}
                              disabled={(date) =>
                                date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>Select your preferred appointment date</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-white">Appointment Time</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {getAvailableTimeSlots().map((slot) => (
                              <Button
                                key={slot}
                                type="button"
                                variant={field.value === slot ? "default" : "outline"}
                                className={cn(
                                  "flex items-center justify-center h-10",
                                  field.value === slot ? "bg-outlive-green-400 hover:bg-outlive-green-500" : "",
                                )}
                                onClick={() => field.onChange(slot)}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>Select your preferred time slot</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Consultation Details (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide any specific details or concerns you'd like to discuss during your consultation"
                          className="min-h-[100px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This information will help the specialist prepare for your consultation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="rounded-full bg-outlive-green-200 p-3 dark:bg-outlive-green-900/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-outlive-green-600 dark:text-outlive-green-400"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="mt-6 text-2xl font-bold">Appointment Confirmed</h2>
                <p className="mt-2 text-muted-foreground">Your appointment has been successfully scheduled</p>

                <div className="mt-6 w-full max-w-md rounded-lg border p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {form.getValues("date") ? format(form.getValues("date"), "PPP") : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{form.getValues("timeSlot")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Specialist</p>
                      <p className="font-medium">
                        {specialists.find((s) => s.id === form.getValues("specialist"))?.name || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Role</p>
                      <p className="font-medium">
                        {specialists.find((s) => s.id === form.getValues("specialist"))?.role || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  A confirmation email has been sent to your registered email address. You'll receive a reminder 24
                  hours before your appointment.
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 1 && (
          <>
            <Button variant="outline" disabled className="dark:text-white">
              Back
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-outlive-green-400 hover:bg-outlive-green-500 text-black dark:text-white"
              disabled={isSubmitting || !selectedSpecialistId || !form.getValues("date") || !form.getValues("timeSlot")}
            >
              {isSubmitting ? "Scheduling..." : "Book Appointment"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div /> {/* Empty div for spacing */}
            <Button
              type="button"
              onClick={() => {
                form.reset()
                setStep(1)
                setSelectedSpecialistId(null)
              }}
              className="bg-outlive-green-400 hover:bg-outlive-green-500 text-black dark:text-white"
            >
              Book Another Appointment
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
