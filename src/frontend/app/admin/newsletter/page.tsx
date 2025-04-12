"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Search, ChevronDown, Trash2, Plus, Mail, Users, Calendar, Clock, X, Upload, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { RichTextEditor } from "@/components/rich-text-editor"
import type { BlogPost } from "@/types/schema"

// Sample subscribers data
const initialSubscribers = [
  {
    id: 1,
    email: "john.doe@example.com",
    name: "John Doe",
    status: "active",
    dateSubscribed: "2023-01-15T10:30:00",
    source: "website",
    tags: ["customer"],
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    name: "Jane Smith",
    status: "active",
    dateSubscribed: "2023-02-20T14:45:00",
    source: "checkout",
    tags: ["customer", "vip"],
  },
  {
    id: 3,
    email: "michael.brown@example.com",
    name: "Michael Brown",
    status: "active",
    dateSubscribed: "2023-03-05T09:15:00",
    source: "website",
    tags: ["prospect"],
  },
  {
    id: 4,
    email: "sarah.wilson@example.com",
    name: "Sarah Wilson",
    status: "unsubscribed",
    dateSubscribed: "2023-01-10T11:20:00",
    dateUnsubscribed: "2023-04-15T16:30:00",
    source: "website",
    tags: ["customer"],
  },
  {
    id: 5,
    email: "david.johnson@example.com",
    name: "David Johnson",
    status: "active",
    dateSubscribed: "2023-03-18T15:10:00",
    source: "checkout",
    tags: ["customer", "vip"],
  },
  {
    id: 6,
    email: "emily.davis@example.com",
    name: "Emily Davis",
    status: "bounced",
    dateSubscribed: "2023-02-05T13:45:00",
    source: "website",
    tags: ["prospect"],
  },
  {
    id: 7,
    email: "robert.miller@example.com",
    name: "Robert Miller",
    status: "active",
    dateSubscribed: "2023-04-02T10:20:00",
    source: "checkout",
    tags: ["customer"],
  },
  {
    id: 8,
    email: "jennifer.taylor@example.com",
    name: "Jennifer Taylor",
    status: "active",
    dateSubscribed: "2023-03-25T09:30:00",
    source: "website",
    tags: ["prospect"],
  },
  {
    id: 9,
    email: "william.anderson@example.com",
    name: "William Anderson",
    status: "unsubscribed",
    dateSubscribed: "2023-01-20T14:15:00",
    dateUnsubscribed: "2023-04-10T11:45:00",
    source: "checkout",
    tags: ["customer"],
  },
  {
    id: 10,
    email: "olivia.thomas@example.com",
    name: "Olivia Thomas",
    status: "active",
    dateSubscribed: "2023-04-05T16:30:00",
    source: "website",
    tags: ["customer", "vip"],
  },
]

// Sample campaigns data
const initialCampaigns = [
  {
    id: 1,
    name: "Spring Collection Launch",
    subject: "Introducing Our Spring Collection - 20% Off for Early Birds!",
    status: "sent",
    dateSent: "2023-03-15T10:00:00",
    recipients: 1250,
    opens: 680,
    clicks: 320,
    unsubscribes: 5,
  },
  {
    id: 2,
    name: "Summer Travel Essentials",
    subject: "Pack Smart: Must-Have Travel Accessories for Your Summer Adventures",
    status: "sent",
    dateSent: "2023-04-10T09:30:00",
    recipients: 1300,
    opens: 720,
    clicks: 350,
    unsubscribes: 3,
  },
  {
    id: 3,
    name: "Back to School Sale",
    subject: "Get Ready for School: Special Discounts on Backpacks and Accessories",
    status: "draft",
    recipients: 0,
    opens: 0,
    clicks: 0,
    unsubscribes: 0,
  },
  {
    id: 4,
    name: "New Blog: Sustainable Materials",
    subject: "Discover How Eco-Friendly Materials Are Changing the Bag Industry",
    status: "scheduled",
    scheduledDate: "2023-05-20T09:00:00",
    recipients: 1350,
    opens: 0,
    clicks: 0,
    unsubscribes: 0,
  },
  {
    id: 5,
    name: "Holiday Gift Guide",
    subject: "Find the Perfect Gift: Our Holiday Selection for Every Budget",
    status: "draft",
    recipients: 0,
    opens: 0,
    clicks: 0,
    unsubscribes: 0,
  },
]

// Sample blog posts for newsletter
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Choosing the Perfect Backpack",
    slug: "ultimate-guide-choosing-perfect-backpack",
    excerpt:
      "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
    featuredImage: {
      id: "1",
      url: "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
      type: "image",
      fileSize: 1.2,
      filename: "backpack-guide.jpg",
      mimeType: "image/jpeg",
      createdAt: "2023-02-25T09:00:00",
      updatedAt: "2023-02-25T09:00:00",
    },
    publishedAt: "2023-03-15T10:00:00",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
      bio: "John Doe is a backpack expert and founder of NEXURA.",
      email: "john.doe@example.com",
      role: "admin",
    },
    content: "<p>The Ultimate Guide to Choosing the Perfect Backpack</p>",
    categories: ["Travel", "Backpacks"],
    tags: ["Backpacks", "Travel"],
    status: "published",
    seo: {
      title: "The Ultimate Guide to Choosing the Perfect Backpack",
      description: "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
    },
    commentStatus: "open",
    comments: [],
    createdAt: "2023-02-25T09:00:00",
    updatedAt: "2023-02-25T09:00:00",
  },
  {
    id: "2",
    title: "5 Essential Travel Accessories for Your Next Adventure",
    slug: "5-essential-travel-accessories-next-adventure",
    excerpt:
      "Prepare for your next journey with these must-have travel accessories that combine style, functionality, and convenience.",
    featuredImage: {
      id: "2",
      url: "/placeholder.svg?height=600&width=1200&text=Travel+Accessories",
      type: "image",
      fileSize: 1.2,
      filename: "travel-accessories.jpg",
      mimeType: "image/jpeg",
      createdAt: "2023-02-25T09:00:00",
      updatedAt: "2023-02-25T09:00:00",
    },
    publishedAt: "2023-02-25T09:00:00",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
      bio: "John Doe is a backpack expert and founder of NEXURA.",
      email: "john.doe@example.com",
      role: "admin",
    },
    content: "<p>5 Essential Travel Accessories for Your Next Adventure</p>",
    categories: ["Travel", "Accessories"],
    tags: ["Travel", "Accessories"],
    status: "published",
    seo: {
      title: "5 Essential Travel Accessories for Your Next Adventure",
      description: "Prepare for your next journey with these must-have travel accessories that combine style, functionality, and convenience.",
    },
    commentStatus: "open",
    comments: [],
    createdAt: "2023-02-25T09:00:00",
    updatedAt: "2023-02-25T09:00:00",
  },
  {
    id: "3",
    title: "How to Pack Efficiently for a Weekend Getaway",
    slug: "how-to-pack-efficiently-weekend-getaway",
    excerpt: "Master the art of packing light with our expert tips for organizing your weekend bag efficiently.",
    featuredImage: {
      id: "3",
      url: "/placeholder.svg?height=600&width=1200&text=Packing+Tips",
      type: "image",
      fileSize: 1.2,
      filename: "packing-tips.jpg",
      mimeType: "image/jpeg",
      createdAt: "2023-02-25T09:00:00",
      updatedAt: "2023-02-25T09:00:00",
    },
    publishedAt: "2023-01-20T10:30:00",
    content: "<p>How to Pack Efficiently for a Weekend Getaway</p>",
    categories: ["Travel", "Packing"],
    tags: ["Travel", "Packing"],
    status: "published",
    seo: {
      title: "How to Pack Efficiently for a Weekend Getaway",
      description: "Master the art of packing light with our expert tips for organizing your weekend bag efficiently.",
    },
    commentStatus: "open",
    comments: [],
    createdAt: "2023-02-25T09:00:00",
    updatedAt: "2023-02-25T09:00:00",
    author: {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
      bio: "John Doe is a backpack expert and founder of NEXURA.",
      email: "john.doe@example.com",
      role: "admin",
    },
  },
]

export default function NewsletterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("subscribers")
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    content: "<p>Write your newsletter content here...</p>",
    selectedBlogPost: "",
    includeBlogPost: false,
    sendToAll: true,
    selectedSegment: "all",
    scheduleLater: false,
    scheduleDate: "",
    scheduleTime: "",
  })

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Filter subscribers based on search and filters
  const filteredSubscribers = subscribers.filter((subscriber) => {
    // Filter by search query
    if (
      searchQuery &&
      !subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && subscriber.status !== selectedStatus) {
      return false
    }

    // Filter by tag
    if (selectedTag !== "all" && !subscriber.tags.includes(selectedTag)) {
      return false
    }

    return true
  })

  // Pagination for subscribers
  const indexOfLastSubscriber = currentPage * itemsPerPage
  const indexOfFirstSubscriber = indexOfLastSubscriber - itemsPerPage
  const currentSubscribers = filteredSubscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber)
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle newsletter edit
  const handleNewsletterEdit = (id: number) => {
    toast({
      title: "Not implemented yet",
      description: "This feature is not yet implemented.",
      variant: "destructive",
    })
  }

  // Handle delete subscriber
  const handleDeleteSubscriber = (id: number) => {
    setSubscribers((prevSubscribers) => prevSubscribers.filter((subscriber) => subscriber.id !== id))

    toast({
      title: "Subscriber Deleted",
      description: "Subscriber has been permanently removed from your list.",
    })
  }

  // Handle status change
  const handleStatusChange = (id: number, newStatus: string) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.map((subscriber) => {
        if (subscriber.id === id) {
          return {
            ...subscriber,
            status: newStatus,
            ...(newStatus === "unsubscribed" ? { dateUnsubscribed: new Date().toISOString() } : {}),
          }
        }
        return subscriber
      }),
    )

    toast({
      title: "Status Updated",
      description: `Subscriber status has been updated to ${newStatus}.`,
    })
  }

  // Handle campaign content change
  const handleCampaignContentChange = (content: string) => {
    setNewCampaign((prev) => ({ ...prev, content }))
  }

  // Handle campaign input change
  const handleCampaignInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCampaign((prev) => ({ ...prev, [name]: value }))
  }

  // Handle blog post selection
  const handleBlogPostSelection = (postId: string) => {
    setNewCampaign((prev) => ({ ...prev, selectedBlogPost: postId }))

    if (postId && newCampaign.includeBlogPost) {
      const selectedPost = blogPosts.find((post) => post.id.toString() === postId)
      if (selectedPost) {
        // Add blog post content to the newsletter
        const blogContent = `
          <div style="margin-bottom: 20px;">
            <h2>${selectedPost.title}</h2>
            <p>${selectedPost.excerpt}</p>
            <p><a href="https://nexura.com/blog/${selectedPost.slug}">Read more</a></p>
          </div>
        `
        setNewCampaign((prev) => ({
          ...prev,
          content: prev.content + blogContent,
        }))
      }
    }
  }

  // Handle send campaign
  const handleSendCampaign = () => {
    // Validate campaign
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      toast({
        title: "Incomplete Campaign",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newCampaignData = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      subject: newCampaign.subject,
      status: newCampaign.scheduleLater ? "scheduled" : "sent",
      ...(newCampaign.scheduleLater
        ? {
            scheduledDate: `${newCampaign.scheduleDate}T${newCampaign.scheduleTime || "09:00:00"}`,
          }
        : {
            dateSent: new Date().toISOString(),
          }),
      recipients: 1350, // Sample data
      opens: 0,
      clicks: 0,
      unsubscribes: 0,
    }

    setCampaigns((prevCampaigns) => [newCampaignData, ...prevCampaigns])

    // Reset form
    setNewCampaign({
      name: "",
      subject: "",
      content: "<p>Write your newsletter content here...</p>",
      selectedBlogPost: "",
      includeBlogPost: false,
      sendToAll: true,
      selectedSegment: "all",
      scheduleLater: false,
      scheduleDate: "",
      scheduleTime: "",
    })

    setShowNewCampaign(false)

    toast({
      title: newCampaign.scheduleLater ? "Campaign Scheduled" : "Campaign Sent",
      description: newCampaign.scheduleLater
        ? "Your newsletter has been scheduled for delivery."
        : "Your newsletter has been sent to subscribers.",
    })
  }

  // Get unique tags
  const uniqueTags = Array.from(new Set(subscribers.flatMap((subscriber) => subscriber.tags))).sort()

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Newsletter Management</h1>
            <p className="text-muted-foreground">Manage subscribers and send newsletters</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="subscribers" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Subscribers
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                Campaigns
              </TabsTrigger>
            </TabsList>

            {/* Subscribers Tab */}
            <TabsContent value="subscribers">
              <Card>
                <CardHeader className="flex flex-col md:flex-row items-center justify-between">
                  <div>
                    <CardTitle>Subscribers</CardTitle>
                    <CardDescription>Manage your newsletter subscribers</CardDescription>
                  </div>

                  <div className="flex gap-2 flex-col md:flex-row">
                    <div className="flex gap-2">
                    <Button variant="outline" onClick={() => router.push("/admin/newsletter/import")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    </div>
                    <Button onClick={() => router.push("/admin/newsletter/add-subscriber")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Subscriber
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search subscribers..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-4 flex-col md:flex-row items-center">
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                          <SelectItem value="bounced">Bounced</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedTag} onValueChange={setSelectedTag}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Tag" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Tags</SelectItem>
                          {uniqueTags.map((tag) => (
                            <SelectItem key={tag} value={tag}>
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("")
                          setSelectedStatus("all")
                          setSelectedTag("all")
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Subscribed</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentSubscribers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              No subscribers found
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentSubscribers.map((subscriber) => (
                            <TableRow key={subscriber.id}>
                              <TableCell className="font-medium">{subscriber.email}</TableCell>
                              <TableCell>{subscriber.name || "—"}</TableCell>
                              <TableCell>
                                <Badge
                                  className={`${
                                    subscriber.status === "active"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : subscriber.status === "unsubscribed"
                                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  }`}
                                >
                                  {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  {formatDate(subscriber.dateSubscribed)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {subscriber.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="capitalize">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleNewsletterEdit(subscriber.id)}
                                    >
                                      Edit
                                    </DropdownMenuItem>
                                    {subscriber.status === "active" ? (
                                      <DropdownMenuItem
                                        onClick={() => handleStatusChange(subscriber.id, "unsubscribed")}
                                      >
                                        Unsubscribe
                                      </DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem onClick={() => handleStatusChange(subscriber.id, "active")}>
                                        Reactivate
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete
                                        </DropdownMenuItem>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete this subscriber. This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction
                                            onClick={() => handleDeleteSubscriber(subscriber.id)}
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-4">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>

                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                              <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {indexOfFirstSubscriber + 1}-{Math.min(indexOfLastSubscriber, filteredSubscribers.length)}{" "}
                    of {filteredSubscribers.length} subscribers
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns">
              {showNewCampaign ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Campaign</CardTitle>
                    <CardDescription>Compose and send a newsletter to your subscribers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Campaign Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={newCampaign.name}
                          onChange={handleCampaignInputChange}
                          placeholder="e.g., Spring Collection Announcement"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Email Subject <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={newCampaign.subject}
                          onChange={handleCampaignInputChange}
                          placeholder="e.g., Introducing Our Spring Collection - 20% Off!"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email Content</Label>
                      <RichTextEditor initialContent={newCampaign.content} onChange={handleCampaignContentChange} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="includeBlogPost"
                          checked={newCampaign.includeBlogPost}
                          onCheckedChange={(checked) =>
                            setNewCampaign((prev) => ({ ...prev, includeBlogPost: checked }))
                          }
                        />
                        <Label htmlFor="includeBlogPost">Include blog post</Label>
                      </div>

                      {newCampaign.includeBlogPost && (
                        <div className="mt-2">
                          <Select value={newCampaign.selectedBlogPost} onValueChange={handleBlogPostSelection}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a blog post" />
                            </SelectTrigger>
                            <SelectContent>
                              {blogPosts.map((post) => (
                                <SelectItem key={post.id} value={post.id.toString()}>
                                  {post.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Recipients</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sendToAll"
                          checked={newCampaign.sendToAll}
                          onCheckedChange={(checked) => setNewCampaign((prev) => ({ ...prev, sendToAll: checked }))}
                        />
                        <Label htmlFor="sendToAll">Send to all subscribers</Label>
                      </div>

                      {!newCampaign.sendToAll && (
                        <div className="mt-2">
                          <Select
                            value={newCampaign.selectedSegment}
                            onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, selectedSegment: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select segment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Subscribers</SelectItem>
                              <SelectItem value="customers">Customers Only</SelectItem>
                              <SelectItem value="vip">VIP Customers</SelectItem>
                              <SelectItem value="prospects">Prospects</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="scheduleLater"
                          checked={newCampaign.scheduleLater}
                          onCheckedChange={(checked) => setNewCampaign((prev) => ({ ...prev, scheduleLater: checked }))}
                        />
                        <Label htmlFor="scheduleLater">Schedule for later</Label>
                      </div>

                      {newCampaign.scheduleLater && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="space-y-2">
                            <Label htmlFor="scheduleDate">Date</Label>
                            <Input
                              id="scheduleDate"
                              name="scheduleDate"
                              type="date"
                              value={newCampaign.scheduleDate}
                              onChange={handleCampaignInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="scheduleTime">Time</Label>
                            <Input
                              id="scheduleTime"
                              name="scheduleTime"
                              type="time"
                              value={newCampaign.scheduleTime}
                              onChange={handleCampaignInputChange}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendCampaign}>
                      {newCampaign.scheduleLater ? "Schedule Campaign" : "Send Campaign"}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Email Campaigns</CardTitle>
                      <CardDescription>Manage your newsletter campaigns</CardDescription>
                    </div>

                    <Button onClick={() => setShowNewCampaign(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Campaign
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead>Opens</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {campaigns.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                No campaigns found
                              </TableCell>
                            </TableRow>
                          ) : (
                            campaigns.map((campaign) => (
                              <TableRow key={campaign.id}>
                                <TableCell className="font-medium">
                                  <div>
                                    {campaign.name}
                                    <div className="text-xs text-muted-foreground mt-1 truncate max-w-[250px]">
                                      {campaign.subject}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={`${
                                      campaign.status === "sent"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                        : campaign.status === "scheduled"
                                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    }`}
                                  >
                                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {campaign.status === "sent" ? (
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                      {formatDate(campaign.dateSent ?? "")}
                                    </div>
                                  ) : campaign.status === "scheduled" ? (
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                      {formatDate(campaign.scheduledDate ?? "")}
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell>{campaign.recipients}</TableCell>
                                <TableCell>
                                  {campaign.status === "sent" ? (
                                    <div className="flex items-center">
                                      {campaign.opens} ({((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {campaign.status === "sent" ? (
                                    <div className="flex items-center">
                                      {campaign.clicks} ({((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <ChevronDown className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={() => router.push(`/admin/newsletter/campaigns/${campaign.id}`)}
                                      >
                                        View Report
                                      </DropdownMenuItem>
                                      {campaign.status === "draft" && (
                                        <DropdownMenuItem
                                          onClick={() => router.push(`/admin/newsletter/campaigns/edit/${campaign.id}`)}
                                        >
                                          Edit
                                        </DropdownMenuItem>
                                      )}
                                      {campaign.status === "scheduled" && (
                                        <DropdownMenuItem>Cancel Schedule</DropdownMenuItem>
                                      )}
                                      {campaign.status === "sent" && <DropdownMenuItem>Duplicate</DropdownMenuItem>}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

