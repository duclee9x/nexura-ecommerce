import { createBrandGateway, createCategoryGateway, createProductGateway, deleteProductGateway, getAllCategoryGateway, getProductByIdGateway, getProductBySlugGateway, getWarehousesGateway, listProductsGateway, updateCategoryGateway, updateProductGateway } from "@nexura/grpc_gateway/gateway"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Category, CreateBrandRequest, CreateCategoryRequest, CreateProductRequest, Product, UpdateCategoryRequest, UpdateProductRequest } from "@nexura/grpc_gateway/protos"
import { toast } from "@/components/ui/use-toast"


export const useProductActions = () => {
    const queryClient = useQueryClient()

    return {
        createProduct: useMutation({
            mutationFn: async (product: CreateProductRequest) => {
                try {
                    return await createProductGateway(product)
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to create product")
                }
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["inventory"] })
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
        }),
        updateProduct: useMutation({
            mutationFn: async (product: UpdateProductRequest) => {
                try {
                    return await updateProductGateway(product)
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to update product")
                }
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["inventory"] })
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
        }),
        deleteProduct: useMutation({
            mutationFn: async (productId: string) => {
                try {
                    return await deleteProductGateway({ id: productId })
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to delete product")
                }
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["inventory"] })
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
        }),
        listProducts: () => useQuery({
            queryKey: ["inventory"],
            queryFn: async () => {
                try {
                    const res = await listProductsGateway()
                    return res.products
                } catch (error) {
                    console.error("Error fetching products:", error)
                    throw new Error("Failed to load products. Please try again later.")
                }
            },
        }),
        getCategories: () => useQuery({
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
        }),
        createCategory: useMutation({
            mutationFn: async (category: CreateCategoryRequest) => {
                return await createCategoryGateway(category)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["categories"] })
                toast({
                    title: "SUCCESS",
                    description: "Category created successfully",
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        updateCategory: useMutation({
            mutationFn: async (category: UpdateCategoryRequest) => {
                return await updateCategoryGateway(category)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["categories"] })
                toast({
                    title: "SUCCESS",
                    description: "Category updated successfully",
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        createBrand: useMutation({
            mutationFn: async (brand: CreateBrandRequest) => {
                return await createBrandGateway(brand)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["brands"] })
                toast({
                    title: "SUCCESS",
                    description: "Brand created successfully",
                })
            },
            onError: (error: Error) => {
                toast({
                    title: "ERROR",
                    description: error.message,
                    variant: "destructive",
                })
            },
        }),
        getWarehouses: () => useQuery({
            queryKey: ["warehouses"],
            queryFn: async () => {
                const res = await getWarehousesGateway()
                return res.warehouses
            },
        }),
        getFilteredProducts: (
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
        },
        getProductBySlug: (slug: string) => useQuery({
            queryKey: ["product", slug],
            queryFn: async () => {
                const res = await getProductBySlugGateway({ slug })
                return res.product
            },
            enabled: !!slug,
        }),
        getProductById: (id: string) => useQuery({
            queryKey: ["product", id],
            queryFn: async () => {
                const res = await getProductByIdGateway({ id })
                return res.product
            },
            enabled: !!id,
        }),
        publishProduct: useMutation({
            mutationFn: (product: Product) => updateProductGateway({ product }),
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: ["inventory"] })
            }
        })
    }
}

