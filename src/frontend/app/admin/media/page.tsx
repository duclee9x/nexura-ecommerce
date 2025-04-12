"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Search, Grid, LayoutList, Upload, Trash2, Copy, X, FolderPlus, ImageIcon, Filter } from 'lucide-react'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Sample media items
const sampleMedia = [
  {
    id: 1,
    name: "product-hero-image.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Product+Hero",
    type: "image",
    size: "1.2 MB",
    dimensions: "1920x1080",
    uploadedAt: "2024-03-15T10:30:00",
    folder: "products",
    tags: ["hero", "featured"],
  },
  {
    id: 2,
    name: "backpack-blue.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Backpack+Blue",
    type: "image",
    size: "0.8 MB",
    dimensions: "1200x800",
    uploadedAt: "2024-03-14T14:45:00",
    folder: "products",
    tags: ["backpack", "blue"],
  },
  {
    id: 3,
    name: "banner-summer-sale.jpg",
    url: "/placeholder.svg?height=600&width=1200&text=Summer+Sale+Banner",
    type: "image",
    size: "1.5 MB",
    dimensions: "1920x600",
    uploadedAt: "2024-03-12T09:15:00",
    folder: "banners",
    tags: ["banner", "sale", "summer"],
  },
  {
    id: 4,
    name: "travel-guide-cover.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Travel+Guide+Cover",
    type: "image",
    size: "0.9 MB",
    dimensions: "1400x900",
    uploadedAt: "2024-03-10T16:20:00",
    folder: "blog",
    tags: ["blog", "travel", "cover"],
  },
  {
    id: 5,
    name: "product-lifestyle.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Product+Lifestyle",
    type: "image",
    size: "1.1 MB",
    dimensions: "1600x1000",
    uploadedAt: "2024-03-08T11:30:00",
    folder: "products",
    tags: ["lifestyle", "outdoor"],
  },
  {
    id: 6,
    name: "team-photo.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Team+Photo",
    type: "image",
    size: "1.3 MB",
    dimensions: "1800x1200",
    uploadedAt: "2024-03-05T13:45:00",
    folder: "about",
    tags: ["team", "company"],
  },
  {
    id: 7,
    name: "product-detail-1.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Product+Detail",
    type: "image",
    size: "0.7 MB",
    dimensions: "1000x1000",
    uploadedAt: "2024-03-03T09:10:00",
    folder: "products",
    tags: ["detail", "closeup"],
  },
  {
    id: 8,
    name: "blog-post-image.jpg",
    url: "/placeholder.svg?height=600&width=800&text=Blog+Post+Image",
    type: "image",
    size: "0.9 MB",
    dimensions: "1200x800",
    uploadedAt: "2024-03-01T15:20:00",
    folder: "blog",
    tags: ["blog", "article"],
  },
]

// Available folders
const folders = ["All", "Products", "Banners", "Blog", "About"]

// Available tags
const availableTags = ["hero", "featured", "backpack", "blue", "banner", "sale", "summer", "blog", "travel", "cover", "lifestyle", "outdoor", "team", "company", "detail", "closeup", "article"]

export default function MediaLibraryPage() {
  const router = useRouter()
  const [media, setMedia] = useState(sampleMedia)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [showTagFilter, setShowTagFilter] = useState(false)

  // Filter media based on search, folder, and tags
  const filteredMedia = media.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Filter by folder
    if (selectedFolder !== "All" && item.folder.toLowerCase() !== selectedFolder.toLowerCase()) {
      return false
    }

    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some((tag) => item.tags.includes(tag))) {
      return false
    }

    return true
  })

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle item selection
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(currentItems.map((item) => item.id))
    }
  }

  // Handle delete selected
  const handleDeleteSelected = () => {
    setMedia((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
    setSelectedItems([])
    
    toast({
      title: "Media Deleted",
      description: `${selectedItems.length} item(s)
have
been
deleted.`,
    })
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Add new media items
      const newMedia = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "file",
        size: `
$
{
  ;(file.size / (1024 * 1024)).toFixed(1)
}
MB`,
        dimensions: "1200x800", // This would be determined from the actual image
        uploadedAt: new Date().toISOString(),
        folder: selectedFolder === "All" ? "uploads" : selectedFolder.toLowerCase(),
        tags: [],
      }))

      setMedia((prev) => [...newMedia, ...prev])
      setIsUploading(false)
      setUploadProgress(0)

      toast({
        title: "Upload Complete",
        description: `
$
{
  files.length
}
file(s)
uploaded
successfully.`,
      })
    }, 3000)
  }

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Copy URL to clipboard
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL Copied",
      description: "Image URL has been copied to clipboard.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">Media Library</h1>
            <p className="text-muted-foreground">Manage your images and media files</p>
          </div>

          <Card>
            <CardHeader className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <CardTitle>Media Files</CardTitle>
                <CardDescription>Upload and manage your media assets</CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Media</DialogTitle>
                      <DialogDescription>
                        Upload images and other media files to your library.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="media-upload">Upload Files</Label>
                        <Input
                          id="media-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum file size: 5MB. Supported formats: JPEG, PNG, GIF, SVG.
                        </p>
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="folder-select">Folder</Label>
                        <Select
                          value={selectedFolder}
                          onValueChange={setSelectedFolder}
                          disabled={isUploading}
                        >
                          <SelectTrigger id="folder-select">
                            <SelectValue placeholder="Select folder" />
                          </SelectTrigger>
                          <SelectContent>
                            {folders.filter(folder => folder !== "All").map((folder) => (
                              <SelectItem key={folder} value={folder}>
                                {folder}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Upload Progress</Label>
                            <span className="text-sm">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <Button variant="outline" disabled={isUploading}>
                        Cancel
                      </Button>
                      <Button disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload Files"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FolderPlus className="h-4 w-4 mr-2" />
                      New Folder
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Folder</DialogTitle>
                      <DialogDescription>
                        Create a new folder to organize your media files.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="folder-name">Folder Name</Label>
                        <Input id="folder-name" placeholder="Enter folder name" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Create Folder</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder} value={folder}>
                          {folder}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowTagFilter(!showTagFilter)}
                    className={showTagFilter ? "bg-secondary" : ""}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Tags
                  </Button>

                  <div className="flex border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`
rounded - r - none
$
{
  viewMode === "grid" ? "bg-secondary" : ""
}
;`}
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`
rounded - l - none
$
{
  viewMode === "list" ? "bg-secondary" : ""
}
`}
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {showTagFilter && (
                <div className="mb-6 p-4 border rounded-md bg-muted/50 dark:bg-muted/20">
                  <h3 className="font-medium mb-2">Filter by Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer capitalize"
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedItems.length > 0 && (
                <div className="mb-4 p-3 bg-muted/50 dark:bg-muted/20 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="select-all"
                      checked={selectedItems.length === currentItems.length}
                      onCheckedChange={handleSelectAll}
                      className="mr-2"
                    />
                    <Label htmlFor="select-all" className="text-sm">
                      {selectedItems.length} item(s) selected
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Selected
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the selected media files. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteSelected}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button variant="outline" size="sm" onClick={() => setSelectedItems([])}>
                      <X className="h-4 w-4 mr-2" />
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}

              {currentItems.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-md">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No media found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload some files or try a different search.
                  </p>
                  <Button className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {currentItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="relative aspect-video bg-muted">
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                            className="bg-background/80 backdrop-blur-sm"
                          />
                        </div>
                        <Image
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div className="truncate">
                            <h3 className="font-medium truncate">{item.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {item.dimensions} • {item.size}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="12" cy="5" r="1" />
                                  <circle cx="12" cy="19" r="1" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ImageIcon className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs capitalize">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-xs">
                          <Checkbox
                            checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="p-3 text-left font-medium text-xs">Preview</th>
                        <th className="p-3 text-left font-medium text-xs">Name</th>
                        <th className="p-3 text-left font-medium text-xs">Dimensions</th>
                        <th className="p-3 text-left font-medium text-xs">Size</th>
                        <th className="p-3 text-left font-medium text-xs">Uploaded</th>
                        <th className="p-3 text-left font-medium text-xs">Tags</th>
                        <th className="p-3 text-left font-medium text-xs">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id} className="border-b last:border-b-0">
                          <td className="p-3">
                            <Checkbox
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={() => handleSelectItem(item.id)}
                            />
                          </td>
                          <td className="p-3">
                            <div className="relative w-12 h-12 rounded overflow-hidden">
                              <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                            </div>
                          </td>
                          <td className="p-3 font-medium">{item.name}</td>
                          <td className="p-3 text-sm">{item.dimensions}</td>
                          <td className="p-3 text-sm">{item.size}</td>
                          <td className="p-3 text-sm">{formatDate(item.uploadedAt)}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs capitalize">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{item.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy URL
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ImageIcon className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredMedia.length)} of {filteredMedia.length} items
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}

