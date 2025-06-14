"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, X, Send, Paperclip, ImageIcon, Smile, Loader2, MinusCircle } from "lucide-react"
import type { ChatMessage, ChatConversation } from "@/types/schema"

// Sample conversation
const initialConversation: ChatConversation = {
  id:              1,
  customerId:      1,
  customerName:    "John Doe",
  status:          "active",
  lastMessageDate: new Date().toISOString(),
  dateCreated:     new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  messages:        [
    {
      id:             1,
      conversationId: 1,
      sender:         "customer",
      senderId:       1,
      content:        "Hello, I have a question about the Pro Traveler Backpack. Does it have a laptop compartment?",
      read:           true,
      dateCreated:    new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id:             2,
      conversationId: 1,
      sender:         "admin",
      senderId:       1,
      content:
        "Hi John! Yes, the Pro Traveler Backpack has a padded laptop compartment that can fit laptops up to 15.6 inches. It's located in the back section for better weight distribution and protection.",
      read:        true,
      dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 23.9).toISOString(), // 23.9 hours ago
    },
    {
      id:             3,
      conversationId: 1,
      sender:         "customer",
      senderId:       1,
      content:        "That's perfect! One more question - is it water resistant?",
      read:           true,
      dateCreated:    new Date(Date.now() - 1000 * 60 * 60 * 23.8).toISOString(), // 23.8 hours ago
    },
    {
      id:             4,
      conversationId: 1,
      sender:         "admin",
      senderId:       1,
      content:
        "Yes, it's made with water-resistant materials and includes a rain cover for heavy downpours. Your laptop and other belongings will stay dry!",
      read:        true,
      dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 23.7).toISOString(), // 23.7 hours ago
    },
    {
      id:             5,
      conversationId: 1,
      sender:         "customer",
      senderId:       1,
      content:        "Great! I think I'll place an order today. Thanks for your help!",
      read:           true,
      dateCreated:    new Date(Date.now() - 1000 * 60 * 60 * 23.6).toISOString(), // 23.6 hours ago
    },
  ],
}

export function ChatBubble() {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isMinimized, setIsMinimized ] = useState(false)
  const [ conversation, setConversation ] = useState<ChatConversation | null>(null)
  const [ message, setMessage ] = useState("")
  const [ isLoading, setIsLoading ] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate loading conversation
  useEffect(() => {
    if (isOpen && !conversation) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setConversation(initialConversation)
        setIsLoading(false)
      }, 1000)
    }
  }, [ isOpen, conversation ])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [ conversation?.messages, isOpen ])

  // Format time
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Format date
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  // Group messages by date
  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { date: string; messages: ChatMessage[] }[] = []

    messages.forEach((message) => {
      const messageDate = formatMessageDate(message.dateCreated)
      const existingGroup = groups.find(group => group.date === messageDate)

      if (existingGroup) {
        existingGroup.messages.push(message)
      } else {
        groups.push({
          date:     messageDate,
          messages: [message],
        })
      }
    })

    return groups
  }

  // Handle send message
  const handleSendMessage = () => {
    if (!message.trim() || !conversation) return

    const newMessage: ChatMessage = {
      id:             Date.now(),
      conversationId: conversation.id,
      sender:         "customer",
      senderId:       1,
      content:        message,
      read:           false,
      dateCreated:    new Date().toISOString(),
    }

    setConversation((prev) => {
      if (!prev) return null
      return {
        ...prev,
        messages:        [ ...prev.messages, newMessage ],
        lastMessageDate: newMessage.dateCreated,
      }
    })

    setMessage("")

    // Simulate admin response after a delay
    setTimeout(() => {
      const adminResponses = [
        "Thank you for your message! Our team will get back to you shortly.",
        "We've received your inquiry and will respond as soon as possible.",
        "Thanks for reaching out! We'll review your question and respond soon.",
        "Your message has been received. Our customer service team will contact you shortly.",
      ]

      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)]

      const adminMessage: ChatMessage = {
        id:             Date.now(),
        conversationId: conversation.id,
        sender:         "admin",
        senderId:       1,
        content:        randomResponse,
        read:           true,
        dateCreated:    new Date().toISOString(),
      }

      setConversation((prev) => {
        if (!prev) return null
        return {
          ...prev,
          messages:        [ ...prev.messages, adminMessage ],
          lastMessageDate: adminMessage.dateCreated,
        }
      })
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-[360px] rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-muted p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">Support</div>
                <div className="text-xs text-muted-foreground">Typically replies within a few hours</div>
              </div>
            </div>
            <div>
              <Button size="icon" variant="ghost" onClick={() => setIsMinimized(true)}>
                <MinusCircle className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized ? (
            <div className="flex-grow flex flex-col justify-between">
              <ScrollArea className="flex-grow">
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : conversation ? (
                    groupMessagesByDate(conversation.messages).map((group, index) => (
                      <div key={index}>
                        <div className="text-xs text-center text-muted-foreground py-2">{group.date}</div>
                        {group.messages.map(message => (
                          <div
                            key={message.id}
                            className={`mb-2 flex flex-col ${message.sender === "admin" ? "items-start" : "items-end"}`}
                          >
                            <div
                              className={`rounded-xl px-3 py-2 text-sm ${message.sender === "admin" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                            >
                              {message.content}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatMessageTime(message.dateCreated)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : null}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Textarea
                    rows={1}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="resize-none flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button size="icon" variant="ghost" onClick={() => handleSendMessage()}>
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Chat is minimized.{" "}
              <Button variant="link" onClick={() => setIsMinimized(false)}>
                Restore
              </Button>
            </div>
          )}
        </div>
      )}
      {!isOpen && (
        <Button className="rounded-full" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-4 w-4 mr-2" /> Open Chat
        </Button>
      )}
    </div>
  )
}

