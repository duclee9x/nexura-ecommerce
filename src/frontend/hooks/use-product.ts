import { createProductGateway, deleteProductGateway, getAllCategoryGateway, listProductsGateway, updateProductGateway } from "@/gateway/gateway"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateProductRequest, Product, UpdateProductRequest } from "@/protos/nexura"
import { toast } from "@/components/ui/use-toast"

const queryClient = useQueryClient()

export const getProduct = (productId: string) => { }

export const createProduct = (product: CreateProductRequest) => useMutation({
    mutationFn: async () => {
        try {
            return await createProductGateway(product)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to create product")
        }
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
        toast({
            title: "SUCCESS",
            description: "Product created successfully",
        })
    },
    onError: (error: Error) => {
        toast({
            title: "ERROR",
            description: error.message,
            variant: "destructive",
        })
    },
})

export const updateProduct = (product: UpdateProductRequest) => useMutation({
    mutationFn: async () => {
        try {
            return await updateProductGateway(product as unknown as Product)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to update product")
        }
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
        queryClient.invalidateQueries({ queryKey: ["product"] })
        toast({
            title: "SUCCESS",
            description: "Product updated successfully",
        })
    },
    onError: (error: Error) => {
        toast({
            title: "ERROR",
            description: error.message,
            variant: "destructive",
        })
    },
})


export const deleteProduct = (productId: string) => useMutation({
    mutationFn: async () => {
        try {
            return await deleteProductGateway(productId)
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to delete product")
        }
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["productsCatalog"] })
        toast({
            title: "SUCCESS",
            description: "Product deleted successfully",
        })
    },
    onError: (error: Error) => {
        toast({
            title: "ERROR",
            description: error.message,
            variant: "destructive",
        })
    },
})

export const listProduct = () => useQuery({
    queryKey: ["productsCatalog"],
    queryFn: async () => {
        try {
            const res = await listProductsGateway()
            return res.products
        } catch (error) {
            console.error("Error fetching products:", error)
            throw new Error("Failed to load products. Please try again later.")
        }
    },
})

export const getCategories = () =>useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
        try {
            const res = await getAllCategoryGateway()
            return res.categories
        } catch (error) {
            console.error("Error fetching categories:", error)
            throw new Error("Failed to load categories. Please try again later.")
        }
    },
})

export const getFilteredProducts = (
    products: Product[] | undefined,
    filters: {
        searchQuery: string
        categories: string[]
        colors: string[]
        features: string[]
        priceRange: [number, number]
    }
) => {
    return products?.filter((product) => {
        // Search filter
        if (
            filters.searchQuery &&
            !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !product.sku.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) {
            return false
        }

        // Category filter
        if (filters.categories.length > 0) {
            const hasMatchingCategory = product.categories.some((category) =>
                filters.categories.includes(category)
            )
            if (!hasMatchingCategory) return false
        }

        // Color filter
        if (filters.colors.length > 0) {
            const hasMatchingColor = product.variants.some((variant) => {
                const colorAttribute = variant.attributes.find(
                    (attr) => attr.name.toLowerCase() === "color"
                )
                return colorAttribute?.extraValue && filters.colors.includes(colorAttribute.extraValue)
            })
            if (!hasMatchingColor) return false
        }

        // Feature filter
        if (filters.features.includes("featured") && !product.featured) {
            return false
        }

        // Price range filter
        const minPrice = product.variants.reduce(
            (min, variant) => Math.min(min, variant.price),
            Infinity
        )
        const maxPrice = product.variants.reduce(
            (max, variant) => Math.max(max, variant.price),
            0
        )
        if (minPrice > filters.priceRange[1] || maxPrice < filters.priceRange[0]) {
            return false
        }

        return true
    })
}

