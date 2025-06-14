import { NextResponse } from "next/server"
import { paginate } from "@/lib/db"
import type { Product, ApiResponse, PaginatedResponse } from "@/types/schema"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "20")
    const query = searchParams.get("query") || ""
    const category = searchParams.get("category")
    const minPrice = searchParams.get("minPrice") ? Number.parseFloat(searchParams.get("minPrice")!) : undefined
    const maxPrice = searchParams.get("maxPrice") ? Number.parseFloat(searchParams.get("maxPrice")!) : undefined
    const sortBy = searchParams.get("sortBy") || "newest"

    // Build where clause
    const where: Record<string, any> = {
      status:     "active",
      visibility: "visible",
    }

    if (category) {
      // In a real app, you would use a JOIN or subquery
      // For this mock, we'll assume products have a categories array
      where.categories = category
    }

    // Determine sort order
    let orderBy = "createdAt"
    let orderDirection: "asc" | "desc" = "desc"

    if (sortBy === "price_asc") {
      orderBy = "price"
      orderDirection = "asc"
    } else if (sortBy === "price_desc") {
      orderBy = "price"
      orderDirection = "desc"
    } else if (sortBy === "popularity") {
      orderBy = "totalReviews"
      orderDirection = "desc"
    } else if (sortBy === "rating") {
      orderBy = "averageRating"
      orderDirection = "desc"
    }

    // Get paginated results
    const results = await paginate<Product>("products", {
      page,
      pageSize,
      where,
      orderBy,
      orderDirection,
    })

    // Filter by price range (we do this after query since it's a range)
    if (minPrice !== undefined || maxPrice !== undefined) {
      results.items = results.items.filter((product) => {
        if (minPrice !== undefined && product.price < minPrice) return false
        if (maxPrice !== undefined && product.price > maxPrice) return false
        return true
      })
    }

    // Filter by search query (simple contains match)
    if (query) {
      const lowerQuery = query.toLowerCase()
      results.items = results.items.filter(
        product =>
          product.name.toLowerCase().includes(lowerQuery) || product.description.toLowerCase().includes(lowerQuery),
      )
    }

    // Return success response
    const response: ApiResponse<PaginatedResponse<Product>> = {
      success: true,
      data:    results,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return error response
    const response: ApiResponse<null> = {
      success:    false,
      error:      "Failed to fetch products",
      message:    error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    }

    return NextResponse.json(response, { status: 500 })
  }
}

