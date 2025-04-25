"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon } from "lucide-react"

type Provider = {
  id: string
  name: string
  role: string
  status?: string
  avatar: string
  lastActive?: string
  type?: string
}

type Message = {
  id: string
  sender: "user" | "provider"
  text: string
  timestamp: Date
}

export function ChatInterface({ provider }: { provider: Provider }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "provider",
      text: `Hello! I'm ${provider.name}. How can I help you today?`,
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate provider response after a delay
    setTimeout(() => {
      const providerMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "provider",
        text: getRandomResponse(provider),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, providerMessage])
    }, 1000)
  }

  const getRandomResponse = (provider: Provider) => {
    const responses = [
      `I understand your concern. Let me help you with that.`,
      `That's a good question. Based on your health profile, I would suggest...`,
      `Thank you for sharing that information. Have you noticed any other symptoms?`,
      `I'd like to know more about your experience with this issue.`,
      `Let me check your records and get back to you with more specific advice.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="border-b flex flex-row items-center gap-3 p-4">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={provider.avatar} alt={provider.name} />
          <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.role}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user" ? "bg-outlive-green-400 text-white" : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type your message..."
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button
            size="icon"
            className="shrink-0 bg-outlive-green-400 hover:bg-outlive-green-500"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
