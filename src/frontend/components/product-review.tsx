"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Star, ImageIcon, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle, X } from "lucide-react"
import type { Review } from "@/types/schema"

export interface ProductReviewProps {
  reviews: Review[]
}

export function ProductReview({ reviews = [] }: ProductReviewProps) {
  const [ activeTab, setActiveTab ] = useState("reviews")
  const [ newReview, setNewReview ] = useState({
    rating:  0,
    title:   "",
    content: "",
    images:  [] as string[],
  })
  const [ hoveredStar, setHoveredStar ] = useState(0)
  const [ helpfulReviews, setHelpfulReviews ] = useState<string[]>([])
  const [ unhelpfulReviews, setUnhelpfulReviews ] = useState<string[]>([])

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  // Rating distribution
  const ratingDistribution = [
    5, 4, 3, 2, 1
  ].map((rating) => {
    const count = reviews.filter(review => review.rating === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  // Handle star rating
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }))
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewReview(prev => ({ ...prev, [name]: value }))
  }

  // Handle image upload
  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    const newImage = `/placeholder.svg?height=200&width=200&text=Review+Image+${newReview.images.length + 1}`

    setNewReview(prev => ({
      ...prev,
      images: [ ...prev.images, newImage ],
    }))

    toast({
      title:       "Image Added",
      description: "Your image has been added to the review.",
    })
  }

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    setNewReview(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  // Handle submit review
  const handleSubmitReview = () => {
    // Validate form
    if (newReview.rating === 0) {
      toast({
        title:       "Rating Required",
        description: "Please select a star rating for your review.",
        variant:     "destructive",
      })
      return
    }

    if (!newReview.title || !newReview.content) {
      toast({
        title:       "Information Required",
        description: "Please provide both a title and content for your review.",
        variant:     "destructive",
      })
      return
    }


    // Reset form
    setNewReview({
      rating:  0,
      title:   "",
      content: "",
      images:  [],
    })

    toast({
      title:       "Review Submitted",
      description: "Your review has been submitted and is pending approval.",
    })

    // Switch to reviews tab
    setActiveTab("reviews")
  }

  // Handle helpful/unhelpful
  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(prev => prev.filter(id => id !== reviewId))
    } else {
      setHelpfulReviews(prev => [ ...prev, reviewId ])
      setUnhelpfulReviews(prev => prev.filter(id => id !== reviewId))
    }
  }

  const handleUnhelpful = (reviewId: string) => {
    if (unhelpfulReviews.includes(reviewId)) {
      setUnhelpfulReviews(prev => prev.filter(id => id !== reviewId))
    } else {
      setUnhelpfulReviews(prev => [ ...prev, reviewId ])
      setHelpfulReviews(prev => prev.filter(id => id !== reviewId))
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          <TabsTrigger value="write">Write a Review</TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>
                {reviews.length > 0
                  ? `${reviews.length} reviews with an average rating of ${averageRating.toFixed(1)} out of 5`
                  : "No reviews yet. Be the first to review this product!"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <div className="flex items-center justify-center flex-col">
                      <div className="text-5xl font-bold mb-2 dark:text-white">{averageRating.toFixed(1)}</div>
                      <div className="flex items-center mb-2">
                        {[
                          1, 2, 3, 4, 5
                        ].map(star => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= Math.round(averageRating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
                    </div>

                    <div className="space-y-2">
                      {ratingDistribution.map(item => (
                        <div key={item.rating} className="flex items-center">
                          <div className="w-12 text-sm">{item.rating} stars</div>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                          <div className="w-8 text-sm text-right">{item.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium dark:text-white">{review.customerName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[
                                1, 2, 3, 4, 5
                              ].map(star => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h4 className="font-medium mb-2 dark:text-white">{review.title}</h4>
                          <p className="text-sm mb-4 dark:text-gray-300">{review.content}</p>

                          {review.images && review.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {review.images.map((image, index) => (
                                <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Review image ${index + 1}`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {review.reply && (
                            <div className="bg-muted p-3 rounded-md mb-4">
                              <div className="flex items-center mb-2">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback>N</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium dark:text-white">NEXURA</div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(review.reply.dateCreated).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm dark:text-gray-300">{review.reply.content}</p>
                            </div>
                          )}

                          <div className="flex items-center text-sm text-muted-foreground">
                            <div className="mr-4">Was this review helpful?</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center ${
                                helpfulReviews.includes(review.id) ? "text-green-600 dark:text-green-400" : ""
                              }`}
                              onClick={() => handleHelpful(review.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>Yes ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`flex items-center ${
                                unhelpfulReviews.includes(review.id) ? "text-red-600 dark:text-red-400" : ""
                              }`}
                              onClick={() => handleUnhelpful(review.id)}
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              <span>No ({review.notHelpful + (unhelpfulReviews.includes(review.id) ? 1 : 0)})</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {reviews.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2 dark:text-white">No Reviews Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to review this product and help others with your feedback.
                  </p>
                  <Button onClick={() => setActiveTab("write")}>Write a Review</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Write a Review Tab */}
        <TabsContent value="write" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your experience with this product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rating">
                  Rating <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-center">
                  {[
                    1, 2, 3, 4, 5
                  ].map(star => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer transition-colors ${
                        star <= (hoveredStar || newReview.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleRatingChange(star)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {newReview.rating > 0
                      ? newReview.rating === 5
                        ? "Excellent"
                        : newReview.rating === 4
                          ? "Very Good"
                          : newReview.rating === 3
                            ? "Good"
                            : newReview.rating === 2
                              ? "Fair"
                              : "Poor"
                      : "Select a rating"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">
                  Review Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Summarize your experience"
                  value={newReview.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Review Content <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={6}
                  placeholder="What did you like or dislike about this product? How was the quality? Would you recommend it to others?"
                  value={newReview.content}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Add Photos (Optional)</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {newReview.images.map((image, index) => (
                    <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black/90 transition-colors"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    className="w-24 h-24 border border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                    onClick={handleImageUpload}
                  >
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add Photo</span>
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  You can upload up to 5 images to show the product in use.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Review Guidelines</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Focus on the product and your experience with it</li>
                    <li>Provide specific details about what you liked or disliked</li>
                    <li>Be honest and respectful in your feedback</li>
                    <li>Reviews are moderated and will be published within 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("reviews")}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

