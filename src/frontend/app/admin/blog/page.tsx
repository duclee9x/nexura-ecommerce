"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Search, ChevronDown, Eye, Edit, Trash2, Plus, Calendar, FileText, ArrowUpDown, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
import type { BlogPost } from "@/types/schema"

// Sample blog posts
const initialBlogPosts: BlogPost[] = [
  {
    id:    "1",
    title: "The Ultimate Guide to Choosing the Perfect Backpack",
    slug:  "ultimate-guide-choosing-perfect-backpack",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt:
      "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
    author: {
      id:     "1",
      name:   "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featuredImage: {
      id:        "1",
      url:       "/placeholder.svg?height=600&width=1200&text=Backpack+Guide",
      alt:       "Backpack Guide",
      filename:  "backpack-guide.jpg",
      type:      "image",
      fileSize:  123456,
      mimeType:  "image/jpeg",
      createdAt: "2023-03-10T09:30:00",
      updatedAt: "2023-03-10T09:30:00",
    },
    seo: {
      title: "The Ultimate Guide to Choosing the Perfect Backpack | NEXURA",
      description:
        "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
    },
    commentStatus: "open",
    categories:    [ "guides", "products" ],
    tags:          [
      "backpacks", "travel", "gear"
    ],
    status:        "published",
    createdAt:     "2023-03-10T09:30:00",
    publishedAt:   "2023-03-15T10:00:00",
    updatedAt:     "2023-03-15T10:00:00",
    seoTitle:      "The Ultimate Guide to Choosing the Perfect Backpack | NEXURA",
    seoDescription:
      "Find the perfect backpack for your needs with our comprehensive guide covering materials, sizes, and features.",
  },
  {
    id:    "2",
    title: "5 Essential Travel Accessories for Your Next Adventure",
    slug:  "5-essential-travel-accessories-next-adventure",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt:
      "Prepare for your next journey with these must-have travel accessories that combine style, functionality, and convenience.",
    author: {
      id:     "1",
      name:   "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featuredImage: {
      id:        "1",
      url:       "/placeholder.svg?height=600&width=1200&text=Travel+Accessories",
      alt:       "Travel Accessories",
      filename:  "travel-accessories.jpg",
      type:      "image",
      fileSize:  123456,
      mimeType:  "image/jpeg",
      createdAt: "2023-02-20T14:45:00",
      updatedAt: "2023-02-20T14:45:00",
    },
    categories:  [ "travel", "products" ],
    tags:        [
      "accessories", "travel", "essentials"
    ],
    status:      "published",
    createdAt:   "2023-02-20T14:45:00",
    publishedAt: "2023-02-25T09:00:00",
    updatedAt:   "2023-02-25T09:00:00",
    seo:         {
      title: "5 Essential Travel Accessories for Your Next Adventure | NEXURA",
      description:
        "Prepare for your next journey with these must-have travel accessories that combine style, functionality, and convenience.",
    },
    commentStatus: "open",
  },
  {
    id:    "3",
    title: "How to Pack Efficiently for a Weekend Getaway",
    slug:  "how-to-pack-efficiently-weekend-getaway",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt: "Master the art of packing light with our expert tips for organizing your weekend bag efficiently.",
    author:  {
      id:     "2",
      name:   "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featuredImage: {
      id:        "1",
      url:       "/placeholder.svg?height=600&width=1200&text=Packing+Tips",
      alt:       "Packing Tips",
      filename:  "packing-tips.jpg",
      type:      "image",
      fileSize:  123456,
      mimeType:  "image/jpeg",
      createdAt: "2023-01-15T11:20:00",
      updatedAt: "2023-01-15T11:20:00",
    },
    categories:  [ "guides", "travel" ],
    tags:        [
      "packing", "travel", "organization"
    ],
    status:      "published",
    createdAt:   "2023-01-15T11:20:00",
    publishedAt: "2023-01-20T10:30:00",
    updatedAt:   "2023-01-20T10:30:00",
    seo:         {
      title:       "How to Pack Efficiently for a Weekend Getaway | NEXURA",
      description: "Master the art of packing light with our expert tips for organizing your weekend bag efficiently.",
    },
    commentStatus: "open",
  },
  {
    id:    "4",
    title: "The History of Backpacks: From Practical to Fashionable",
    slug:  "history-backpacks-practical-fashionable",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt:
      "Explore the fascinating evolution of backpacks from simple utility items to fashion statements and everyday essentials.",
    author: {
      id:     "1",
      name:   "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featuredImage: {
      id:        "1",
      url:       "/placeholder.svg?height=600&width=1200&text=Backpack+History",
      alt:       "Backpack History",
      filename:  "backpack-history.jpg",
      type:      "image",
      fileSize:  123456,
      mimeType:  "image/jpeg",
      createdAt: "2023-03-18T15:10:00",
      updatedAt: "2023-03-18T15:10:00",
    },
    categories:  [ "history", "fashion" ],
    tags:        [
      "backpacks", "fashion", "history"
    ],
    status:      "draft",
    createdAt:   "2023-03-18T15:10:00",
    publishedAt: "",
    updatedAt:   "2023-03-18T15:10:00",
    seo:         {
      title: "The History of Backpacks: From Practical to Fashionable | NEXURA",
      description:
        "Explore the fascinating evolution of backpacks from simple utility items to fashion statements and everyday essentials.",
    },
    commentStatus: "open",
  },
  {
    id:    "5",
    title: "Sustainable Materials in Modern Bag Manufacturing",
    slug:  "sustainable-materials-modern-bag-manufacturing",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    excerpt:
      "Discover how eco-friendly materials are revolutionizing the bag industry and creating a more sustainable future.",
    author: {
      id:     "2",
      name:   "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    featuredImage: {
      id:        "1",
      url:       "/placeholder.svg?height=600&width=1200&text=Sustainable+Materials",
      alt:       "Sustainable Materials",
      filename:  "sustainable-materials.jpg",
      type:      "image",
      fileSize:  123456,
      mimeType:  "image/jpeg",
      createdAt: "2023-03-05T09:45:00",
      updatedAt: "2023-03-05T09:45:00",
    },
    categories:  [ "sustainability", "manufacturing" ],
    tags:        [
      "eco-friendly", "materials", "sustainability"
    ],
    status:      "draft",
    createdAt:   "2023-03-05T09:45:00",
    publishedAt: "",
    updatedAt:   "2023-03-05T09:45:00",
    seo:         {
      title: "Sustainable Materials in Modern Bag Manufacturing | NEXURA",
      description:
        "Discover how eco-friendly materials are revolutionizing the bag industry and creating a more sustainable future.",
    },
    commentStatus: "open",
  },
]

export default function BlogManagementPage() {
  const router = useRouter()
  const [ blogPosts, setBlogPosts ] = useState(initialBlogPosts)
  const [ searchQuery, setSearchQuery ] = useState("")
  const [ selectedStatus, setSelectedStatus ] = useState("all")
  const [ selectedCategory, setSelectedCategory ] = useState("all")
  const [ sortField, setSortField ] = useState("dateCreated")
  const [ sortDirection, setSortDirection ] = useState<"asc" | "desc">("desc")
  const [ currentPage, setCurrentPage ] = useState(1)
  const [itemsPerPage] = useState(5)

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.flatMap(post => post.categories))).sort()

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "—"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    }).format(date)
  }

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Filter blog posts based on search and filters
  const filteredPosts = blogPosts.filter((post) => {
    // Filter by search query
    if (
      searchQuery &&
      !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && post.status !== selectedStatus) {
      return false
    }

    // Filter by category
    if (selectedCategory !== "all" && !post.categories.includes(selectedCategory)) {
      return false
    }

    return true
  })

  // Sort blog posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortField === "author") {
      return sortDirection === "asc"
        ? a.author.name.localeCompare(b.author.name)
        : b.author.name.localeCompare(a.author.name)
    } else if (sortField === "dateCreated") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortField === "datePublished") {
      // Handle empty datePublished values
      if (!a.publishedAt && !b.publishedAt) return 0
      if (!a.publishedAt) return sortDirection === "asc" ? -1 : 1
      if (!b.publishedAt) return sortDirection === "asc" ? 1 : -1

      return sortDirection === "asc"
        ? new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    return 0
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedPosts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle delete post
  const handleDeletePost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id))

    toast({
      title:       "Post Deleted",
      description: "Blog post has been permanently deleted.",
    })
  }

  // Handle publish/unpublish post
  const handlePublishPost = (id: string) => {
    setBlogPosts(prev =>
      prev.map((post) => {
        if (post.id === id) {
          const newStatus = post.status === "published" ? "draft" : "published"
          const datePublished = newStatus === "published" ? new Date().toISOString() : ""

          return {
            ...post,
            status:       newStatus,
            datePublished,
            dateModified: new Date().toISOString(),
          }
        }
        return post
      }),
    )

    const post = blogPosts.find(post => post.id === id)
    const action = post?.status === "published" ? "unpublished" : "published"

    toast({
      title:       `Post ${action}`,
      description: `Blog post has been ${action}.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Blog Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage your blog posts</p>
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
              </div>

              <Button onClick={() => router.push("/admin/blog/new")}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-4">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedStatus("all")
                      setSelectedCategory("all")
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
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                          Title
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("author")}>
                          Author
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("createdAt")}>
                          Created
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center cursor-pointer" onClick={() => handleSort("publishedAt")}>
                          Published
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No blog posts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentItems.map(post => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div
                                className="w-10 h-10 rounded-md overflow-hidden mr-3 bg-muted flex-shrink-0"
                                style={{ backgroundImage: `url(${post.featuredImage})`, backgroundSize: "cover" }}
                              >
                              </div>
                              <div className="truncate max-w-[250px]">
                                {post.title}
                                <div className="text-xs text-muted-foreground mt-1 truncate">{post.slug}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-muted">
                                <Image
                                  src={post.author.avatar || "/placeholder.svg"}
                                  alt={post.author.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {post.author.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {post.categories.map(category => (
                                <Badge key={category} variant="outline" className="capitalize">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formatDate(post.createdAt)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {post.publishedAt ? (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                {formatDate(post.publishedAt)}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                post.status === "published"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : post.status === "draft"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                            </Badge>
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
                                <DropdownMenuItem onClick={() => router.push(`/blog/${post.slug}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/blog/edit/${post.id}`)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePublishPost(post.id)}>
                                  <FileText className="h-4 w-4 mr-2" />
                                  {post.status === "published" ? "Unpublish" : "Publish"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem onSelect={e => e.preventDefault()}>
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently delete this blog post. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeletePost(post.id)}
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

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedPosts.length)} of {sortedPosts.length}{" "}
                posts
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}

