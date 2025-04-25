"use client"

import { useState } from "react"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Define form schema
const formSchema = z.object({
  consultationType: z.string({
    required_error: "Please select a consultation type",
  }),
  consultationMode: z.string({
    required_error: "Please select a consultation mode",
  }),
  specialistType: z.string({
    required_error: "Please select a specialist type",
  }),
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
const specialists = {
  doctor: [
    { id: "dr-johnson", name: "Dr. Sarah Johnson" },
    { id: "dr-patel", name: "Dr. Raj Patel" },
    { id: "dr-rodriguez", name: "Dr. Maria Rodriguez" },
  ],
  nutritionist: [
    { id: "dr-chen", name: "Dr. Michael Chen" },
    { id: "dr-williams", name: "Dr. Emily Williams" },
  ],
  therapist: [
    { id: "dr-taylor", name: "Dr. James Taylor" },
    { id: "dr-thompson", name: "Dr. Lisa Thompson" },
  ],
  fitnessCoach: [
    { id: "coach-miller", name: "Coach David Miller" },
    { id: "coach-wilson", name: "Coach Jessica Wilson" },
  ],
}

// Example time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export function BookAppointmentForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consultationType: "",
      consultationMode: "",
      specialistType: "",
      specialist: "",
      details: "",
    },
  })

  const watchSpecialistType = form.watch("specialistType")

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect or show success message
      setStep(3) // Show confirmation
    }, 1500)
  }

  return (
    <Card className="border-2 border-muted">
      <CardHeader>
        <CardTitle>Consultation Booking</CardTitle>
        <CardDescription>
          {step === 1 && "Select your consultation type and specialist"}
          {step === 2 && "Choose a date and time for your appointment"}
          {step === 3 && "Your appointment has been scheduled"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="consultationType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Consultation Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="initial" />
                              </FormControl>
                              <FormLabel className="font-normal">Initial Consultation (60 min)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="followup" />
                              </FormControl>
                              <FormLabel className="font-normal">Follow-up Session (30 min)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="emergency" />
                              </FormControl>
                              <FormLabel className="font-normal">Urgent Care (45 min)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consultationMode"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Consultation Mode</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="video" />
                              </FormControl>
                              <FormLabel className="font-normal">Video Call</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="inperson" />
                              </FormControl>
                              <FormLabel className="font-normal">In-Person Visit</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-3">
                              <FormControl>
                                <RadioGroupItem value="phone" />
                              </FormControl>
                              <FormLabel className="font-normal">Phone Call</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="specialistType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialist Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a specialist type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="doctor">General Practitioner</SelectItem>
                            <SelectItem value="nutritionist">Nutritionist</SelectItem>
                            <SelectItem value="therapist">Therapist</SelectItem>
                            <SelectItem value="fitnessCoach">Fitness Coach</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the type of specialist you want to consult with</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchSpecialistType && (
                    <FormField
                      control={form.control}
                      name="specialist"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Specialist</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a specialist" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {specialists[watchSpecialistType as keyof typeof specialists]?.map((specialist) => (
                                <SelectItem key={specialist.id} value={specialist.id}>
                                  {specialist.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>Choose a specific specialist for your consultation</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Details (Optional)</FormLabel>
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
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Appointment Date</FormLabel>
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
                              onSelect={field.onChange}
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
                        <FormLabel>Appointment Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {slot}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Select your preferred time slot</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Appointment Summary</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Consultation Type</p>
                      <p className="font-medium">
                        {form.getValues("consultationType") === "initial" && "Initial Consultation (60 min)"}
                        {form.getValues("consultationType") === "followup" && "Follow-up Session (30 min)"}
                        {form.getValues("consultationType") === "emergency" && "Urgent Care (45 min)"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Consultation Mode</p>
                      <p className="font-medium">
                        {form.getValues("consultationMode") === "video" && "Video Call"}
                        {form.getValues("consultationMode") === "inperson" && "In-Person Visit"}
                        {form.getValues("consultationMode") === "phone" && "Phone Call"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Specialist Type</p>
                      <p className="font-medium">
                        {form.getValues("specialistType") === "doctor" && "General Practitioner"}
                        {form.getValues("specialistType") === "nutritionist" && "Nutritionist"}
                        {form.getValues("specialistType") === "therapist" && "Therapist"}
                        {form.getValues("specialistType") === "fitnessCoach" && "Fitness Coach"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Specialist</p>
                      <p className="font-medium">
                        {specialists[form.getValues("specialistType") as keyof typeof specialists]?.find(
                          (s) => s.id === form.getValues("specialist"),
                        )?.name || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="rounded-full bg-outlive-green-100 p-3 dark:bg-outlive-green-900/30">
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
                        {specialists[form.getValues("specialistType") as keyof typeof specialists]?.find(
                          (s) => s.id === form.getValues("specialist"),
                        )?.name || ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mode</p>
                      <p className="font-medium">
                        {form.getValues("consultationMode") === "video" && "Video Call"}
                        {form.getValues("consultationMode") === "inperson" && "In-Person Visit"}
                        {form.getValues("consultationMode") === "phone" && "Phone Call"}
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
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (
                  form.getValues("consultationType") &&
                  form.getValues("consultationMode") &&
                  form.getValues("specialistType") &&
                  form.getValues("specialist")
                ) {
                  setStep(2)
                } else {
                  form.trigger(["consultationType", "consultationMode", "specialistType", "specialist"])
                }
              }}
              className="bg-outlive-teal-600 hover:bg-outlive-teal-700"
            >
              Continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Button variant="outline" type="button" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-outlive-green-600 hover:bg-outlive-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Confirm Appointment"}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <div /> {/* Empty div for spacing */}
            <Button
              type="button"
              onClick={() => {
                form.reset()
                setStep(1)
              }}
              className="bg-outlive-teal-600 hover:bg-outlive-teal-700"
            >
              Book Another Appointment
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
