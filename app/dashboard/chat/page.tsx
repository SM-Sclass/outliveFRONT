import type { Metadata } from "next"
import { ChatProviderSelection } from "@/components/dashboard/chat-provider-selection"

export const metadata: Metadata = {
  title: "Chat with Support - Outlive",
  description: "Chat with our support team for assistance",
}

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat with Support</h1>
        <p className="text-muted-foreground">Get help from our healthcare providers</p>
      </div>

      <ChatProviderSelection />
    </div>
  )
}
