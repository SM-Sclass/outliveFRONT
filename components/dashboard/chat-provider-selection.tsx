"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatInterface } from "./chat-interface"
import { ArrowLeft } from "lucide-react"

// Sample data for healthcare providers
const healthcareProviders = [
  {
    id: "3",
    name: "Nurse Rebecca Wilson",
    role: "Registered Nurse",
    avatar: "/placeholder.svg?height=40&width=40",
    hasUnread: true,
  },
  {
    id: "5",
    name: "Nurse David Miller",
    role: "Nurse Practitioner",
    avatar: "/placeholder.svg?height=40&width=40",
    hasUnread: false,
  },
  {
    id: "6",
    name: "Admin Support",
    role: "Customer Service",
    avatar: "/placeholder.svg?height=40&width=40",
    hasUnread: true,
  },
]

export function ChatProviderSelection() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  if (selectedProvider) {
    const provider = healthcareProviders.find((p) => p.id === selectedProvider)

    return (
      <div className="space-y-4">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setSelectedProvider(null)}>
          <ArrowLeft className="h-4 w-4" />
          Back to chat list
        </Button>

        <ChatInterface provider={provider!} />
      </div>
    )
  }

  return (
    <Card className="bg-white dark:bg-premium-tealDark" >
        <CardHeader className="text-premium-dark/70 dark:text-white/90">
        <CardTitle>Your Conversations</CardTitle>
        <CardDescription>Select a healthcare provider to chat with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {healthcareProviders.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center p-4 rounded-lg border cursor-pointer hover:border-outlive-green-400 hover:bg-outlive-green-50 dark:hover:bg-outlive-green-900/10 transition-colors"
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border ">
                  <AvatarImage src={provider.avatar} alt={provider.name} />
                  <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {provider.hasUnread && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-outlive-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-outlive-green-500"></span>
                  </span>
                )}
              </div>
              <div className="ml-4 flex-1 text-premium-dark/70 dark:text-white/90">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{provider.name}</h3>
                  {provider.hasUnread && (
                    <span className="inline-flex items-center rounded-full bg-outlive-green-100 px-2.5 py-0.5 text-xs font-medium text-outlive-green-800 dark:bg-outlive-green-900/30 dark:text-outlive-green-300">
                      New message
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{provider.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
