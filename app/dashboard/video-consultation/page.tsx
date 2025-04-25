import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Mic, VideoOff, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Video Consultation - Outlive",
  description: "Join your video consultation with health experts",
}

export default function VideoConsultationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Consultation</h1>
        <p className="text-muted-foreground">Join your scheduled video consultation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Video Consultation</CardTitle>
          <CardDescription>Your next scheduled video call</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-medium">Dr. Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Nutritionist</p>
                <p className="text-sm mt-1">Tomorrow, 10:30 AM</p>
              </div>
              <Button className="bg-outlive-teal-600 hover:bg-outlive-teal-700">
                <Video className="mr-2 h-4 w-4" />
                Join Call
              </Button>
            </div>
          </div>

          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Video className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Your video will appear here when you join the call</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
              <VideoOff className="h-5 w-5" />
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
