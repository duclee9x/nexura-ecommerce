"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { CalendarIcon, ChevronLeft, Save, X, Plus, Clock, Globe } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUploader } from "@/components/image-uploader"
import type { BlogPost, MediaItem } from "@/types/schema"

// Sample blog post data
const sampleBlogPost: BlogPost = {
  id: "1",
  title: "The Ultimate Guide to Choosing the Perfect Backpack",
  slug: "ultimate-guide-choosing-perfect-backpack",
  content:
    "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><h2>Consider Your Needs</h2><p>Before purchasing a backpack, think about how you'll use it. Are you commuting to work, hiking in the wilderness, or traveling abroad?</p><h2>Size Matters</h2><p>Backpacks come in various sizes, measured in liters. A 20-30L backpack is suitable for daily use, while 40-50L works well for weekend trips.</p><h2>Material and Durability</h2><p>Look for materials like ripstop nylon or Cordura for durability. Water-resistant coatings are a plus for protecting your belongings.</p>",
  excerpt:
    "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
  author: {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  seo: {
    title: "The Ultimate Guide to Choosing the Perfect Backpack | NEXURA",
    description: "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features",
  },
  featuredImage: {
    id: "1",
    filename: "backpack-guide.jpg",
    url: "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
    type: "image",
    createdAt: "2024-03-15T10:30:00",
    updatedAt: "2024-03-15T10:30:00",
    mimeType: "image/jpeg",
    fileSize: 1.2,
    dimensions: {
      width: 1920,
      height: 1080,
    },
    folder: "products",
    tags: ["hero", "featured"],
  },
  categories: ["guides", "products"],
  tags: ["backpacks", "travel", "gear"],
  status: "published",
  commentStatus: "open",
  allowComments: true,
  sendNewsletter: false,
  isFeatured: true,
  seoTitle: "The Ultimate Guide to Choosing the Perfect Backpack | NEXURA",
  seoDescription: "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features",
  createdAt: "2023-03-10T09:30:00",
  updatedAt: "2023-03-15T10:00:00",
}

// Available categories and tags
const availableCategories = [
  "guides",
  "products",
  "travel",
  "fashion",
  "sustainability",
  "manufacturing",
  "history",
  "lifestyle",
  "technology",
]

const availableTags = [
  "backpacks",
  "travel",
  "gear",
  "accessories",
  "essentials",
  "packing",
  "organization",
  "fashion",
  "history",
  "eco-friendly",
  "materials",
  "sustainability",
]

export default function BlogEditPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const postId = Number.parseInt(params.id)

  // In a real app, you would fetch the blog post data based on the ID
  const [post, setPost] = useState<BlogPost>(sampleBlogPost)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("content")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [publishDate, setPublishDate] = useState<Date | undefined>(
    post.publishedAt ? new Date(post.publishedAt) : undefined,
  )
  const [publishTime, setPublishTime] = useState(
    post.publishedAt
      ? new Date(post.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "",
  )
  const [isScheduled, setIsScheduled] = useState(false)

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  // Handle content change from rich text editor
  const handleContentChange = (content: string) => {
    setPost((prev) => ({ ...prev, content }))
  }

  // Handle featured image change
  const handleFeaturedImageChange = (imageUrl: string) => {
    setPost((prev) => ({ ...prev, featuredImage: { ...prev.featuredImage, url: imageUrl } as MediaItem }))
  }

  // Handle category selection
  const handleAddCategory = () => {
    if (selectedCategory && !post.categories.includes(selectedCategory)) {
      setPost((prev) => ({
        ...prev,
        categories: [...prev.categories, selectedCategory],
      }))
      setSelectedCategory("")
    }
  }

  // Handle tag selection
  const handleAddTag = () => {
    if (selectedTag && !post.tags.includes(selectedTag)) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, selectedTag],
      }))
      setSelectedTag("")
    }
  }

  // Handle removing a category
  const handleRemoveCategory = (category: string) => {
    setPost((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }))
  }

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  // Generate slug from title
  const generateSlug = () => {
    const slug = post.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
    setPost((prev) => ({ ...prev, slug }))
  }

  // Handle save
  const handleSave = (status?: string) => {
    setIsLoading(true)

    // Update status if provided
    const updatedPost = {
      ...post,
      status: status || post.status,
      dateModified: new Date().toISOString(),
    }

    // If publishing or scheduling, update datePublished
    if (status === "published" || (status === "scheduled" && publishDate)) {
      let publishDateTime: Date

      if (isScheduled && publishDate) {
        // Create date from selected date and time
        publishDateTime = new Date(publishDate)
        if (publishTime) {
          const [hours, minutes] = publishTime.split(":").map(Number)
          publishDateTime.setHours(hours, minutes)
        }
        updatedPost.status = "scheduled"
      } else {
        publishDateTime = new Date()
        updatedPost.status = "published"
      }

      updatedPost.publishedAt = publishDateTime.toISOString()
    }

    // In a real app, you would save the post to the database here
    setPost(updatedPost as BlogPost)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Post Saved",
        description: `Your post has been ${status || "saved"}.`,
      })

      if (status === "published") {
        router.push("/admin/blog")
      }
    }, 1000)
  }

  // Handle publish date change
  const handlePublishDateChange = (date: Date | undefined) => {
    setPublishDate(date)
    setIsScheduled(!!date)
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="mr-4" onClick={() => router.push("/admin/blog")}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-3xl font-bold dark:text-white">{postId === 0 ? "Create New Post" : "Edit Post"}</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => handleSave()} disabled={isLoading}>
                Save Draft
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button disabled={isLoading}>
                    {isLoading ? "Saving..." : "Publish"}
                    <ChevronLeft className="h-4 w-4 ml-1 rotate-[-90deg]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Publish Options</h4>
                    <div className="flex items-center space-x-2">
                      <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                      <Label htmlFor="schedule">Schedule for later</Label>
                    </div>

                    {isScheduled && (
                      <div className="space-y-2">
                        <div className="grid gap-2">
                          <Label htmlFor="publishDate">Publish Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                id="publishDate"
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !publishDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {publishDate ? format(publishDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={publishDate}
                                onSelect={handlePublishDateChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="publishTime">Publish Time</Label>
                          <Input
                            id="publishTime"
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => handleSave("draft")} disabled={isLoading}>
                        Save as Draft
                      </Button>
                      <Button
                        onClick={() => handleSave(isScheduled ? "scheduled" : "published")}
                        disabled={isLoading || (isScheduled && !publishDate)}
                      >
                        {isScheduled ? "Schedule" : "Publish Now"}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={post.title}
                      onChange={handleInputChange}
                      placeholder="Enter post title"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="slug">
                        Slug <span className="text-destructive">*</span>
                      </Label>
                      <Button variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                        Generate from title
                      </Button>
                    </div>
                    <Input
                      id="slug"
                      name="slug"
                      value={post.slug}
                      onChange={handleInputChange}
                      placeholder="enter-post-slug"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={post.excerpt}
                      onChange={handleInputChange}
                      placeholder="Brief summary of the post"
                      rows={3}
                    />
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="media">Featured Image</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="pt-4">
                      <RichTextEditor initialContent={post.content} onChange={handleContentChange} />
                    </TabsContent>
                    <TabsContent value="media" className="pt-4">
                      <ImageUploader currentImage={post.featuredImage?.url} onImageSelected={handleFeaturedImageChange} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      name="seoTitle"
                      value={post.seoTitle}
                      onChange={handleInputChange}
                      placeholder="SEO optimized title (for search engines)"
                    />
                    <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Meta Description</Label>
                    <Textarea
                      id="seoDescription"
                      name="seoDescription"
                      value={post.seoDescription}
                      onChange={handleInputChange}
                      placeholder="Brief description for search engines"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                  </div>

                  <div className="p-4 border rounded-md mt-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Search Engine Preview
                    </h4>
                    <div className="space-y-1">
                      <div className="text-blue-600 dark:text-blue-400 text-xl">
                        {post.seoTitle || post.title || "Post Title"}
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-sm">
                        www.nexura.com/blog/{post.slug || "post-slug"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {post.seoDescription || post.excerpt || "Post description will appear here."}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={post.status}
                      onValueChange={(value) => setPost((prev) => ({ ...prev, status: value as "draft" | "published" | "archived" | "scheduled" }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Author</Label>
                    <Select
                      value={post.author.id.toString()}
                      onValueChange={(value) =>
                        setPost((prev) => ({
                          ...prev,
                          author: {
                            id: value,
                            name: value === "1" ? "Sarah Johnson" : "Michael Chen",
                            avatar: `/placeholder.svg?height=40&width=40&text=${value === "1" ? "SJ" : "MC"}`,
                          },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sarah Johnson</SelectItem>
                        <SelectItem value="2">Michael Chen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="capitalize">
                          {category}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => handleRemoveCategory(category)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCategories
                            .filter((category) => !post.categories.includes(category))
                            .map((category) => (
                              <SelectItem key={category} value={category} className="capitalize">
                                {category}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline" onClick={handleAddCategory} disabled={!selectedCategory}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="capitalize">
                          {tag}
                          <button className="ml-1 hover:text-destructive" onClick={() => handleRemoveTag(tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Select value={selectedTag} onValueChange={setSelectedTag}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select tag" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTags
                            .filter((tag) => !post.tags.includes(tag))
                            .map((tag) => (
                              <SelectItem key={tag} value={tag} className="capitalize">
                                {tag}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="outline" onClick={handleAddTag} disabled={!selectedTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dateCreated">Created</Label>
                      <span className="text-sm text-muted-foreground">
                        {post.createdAt ? new Date(post.createdAt).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    {post.updatedAt && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dateModified">Last Modified</Label>
                        <span className="text-sm text-muted-foreground">
                          {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : "N/A"}
                        </span>
                      </div>
                    )}
                    {post.publishedAt && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="datePublished">Published</Label>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleSave()} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="newsletter"
                      checked={post.sendNewsletter}
                      onCheckedChange={(checked) => setPost((prev) => ({ ...prev, sendNewsletter: checked }))}
                    />
                    <Label htmlFor="newsletter">Send to newsletter subscribers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="comments"
                      checked={post.allowComments !== false}
                      onCheckedChange={(checked) => setPost((prev) => ({ ...prev, allowComments: checked }))}
                    />
                    <Label htmlFor="comments">Allow comments</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={post.isFeatured}
                      onCheckedChange={(checked) => setPost((prev) => ({ ...prev, isFeatured: checked }))}
                    />
                    <Label htmlFor="featured">Feature on homepage</Label>
                  </div>

                  {post.status === "scheduled" && (
                    <div className="flex items-center mt-4 p-3 bg-muted rounded-md">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        Scheduled to publish on {post.publishedAt && new Date(post.publishedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

