"use client"

import { useEffect, useMemo } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { ChevronLeft, Loader2, Save, LinkIcon, Search } from "lucide-react"
import { CategoryTree, type Category } from "@/components/category-tree"
import { VariantManager } from "@/components/variant-manager"
import { TagCombobox } from "@/components/tag-combobox"
import { ImageGallery, type ProductImage } from "@/components/image-gallery"
import { BrandSelector } from "@/components/brand-selector"
import { AttributesManager } from "@/components/attributes-manager"
import { SizeInstructionEditor, type SizeChart } from "@/components/size-instruction-editor"
import { Product, ProductAttribute, ProductVariant, CreateCategoryRequest, CreateBrandRequest, Brand } from "@nexura/grpc_gateway/protos"
import { Skeleton } from "@/components/ui/skeleton"
import ProductHooks from "@/hooks/product-hooks"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface ProductFormProps {
  productSlug?: string
  mode: "add" | "edit"
}

export function ProductForm({
  productSlug,
  mode,
}: ProductFormProps) {
  const [product, setProduct] = useState<Product>(
    {
      id: "",
      name: "",
      slug: "",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      costPrice: 20,
      sku: "",
      basePrice: 32,
      barcode: "",
      categories: [],
      productTags: [],
      images: [],
      attributes: [],
      variants: [],
      brandId: "",
      featured: false,
      status: "draft",
      sizeCharts: [],
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        weight: 0
      },
      seo: {
        title: "",
        description: "",
        keywords: "",
      },
      taxable: false,
      shippable: false,
      relatedProducts: []
    }
  )
  const [relatedProductIds, setRelatedProductIds] = useState<string[]>([])
  const [sizeCharts, setSizeCharts] = useState<SizeChart[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [relatedProductSearch, setRelatedProductSearch] = useState("")
  const { useGetProduct, useCreateCategory, useUpdateCategory, useCreateBrand, useListProducts, useGetCategories, useGetBrands, useUpdateProduct, useCreateProduct } = ProductHooks()
  const { mutateAsync: createCategory } = useCreateCategory
  const { mutateAsync: updateCategory } = useUpdateCategory
  const { mutateAsync: createBrand } = useCreateBrand
  const { mutateAsync: createProduct } = useCreateProduct
  const { mutateAsync: updateProduct } = useUpdateProduct
  const { data: productData, isLoading: isLoadingProduct } = useGetProduct(productSlug || "", "slug")
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories()
  const { data: brands, isLoading: isLoadingBrands } = useGetBrands()
  const { data: allProducts, isLoading: isLoadingProducts } = useListProducts()
  const router = useRouter()
  useEffect(() => {
    if (productData) {
      setProduct(productData)
    }
  }, [productData])
  useEffect(() => {
    if (product.relatedProducts) {
      setRelatedProductIds(product.relatedProducts.map(product => product.id))
    }
  }, [product.relatedProducts])
  // Get product category names for size chart
  const productCategoryNames = useMemo(() => {
    const getCategoryName = (categoryId: string): string | null => {
      const category = categories?.find(c => c.id === categoryId)
      return category?.name || null
    }

    return product.categories.map(getCategoryName).filter((name): name is string => name !== null)
  }, [product.categories, categories])

  // Get full category path for display
  const getCategoryPath = useMemo(() => {
    const buildPath = (categoryId: string): string => {
      const result: string[] = []
      let currentId = categoryId

      while (currentId) {
        const category = categories?.find(c => c.id === currentId)
        if (category) {
          result.unshift(category.name)
          currentId = category.parentId || ""
        } else {
          currentId = ""
        }
      }

      return result.join(" > ")
    }

    if (product.categories.length === 0) return ""

    // Get the first category path for display
    return buildPath(product.categories[0])
  }, [product.categories, categories])

  // Function to generate a slug from a name
  const generateSlug = () => {
    const slug = product.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(/\s+/g, '-')
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
    setProduct((prev) => ({ ...prev, slug: slug }))
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))

    // Clear error when field becomes valid
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle numeric input changes
  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setProduct((prev) => ({ ...prev, [field]: value }))

      // Clear error when field becomes valid
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    }
  }

  // Handle dimension changes
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setProduct((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions!,
          [field]: value,
        },
      }))

      // Clear error when field becomes valid
      if (errors[`dimensions.${field}`]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[`dimensions.${field}`]
          return newErrors
        })
      }
    }
  }

  // Handle SEO changes
  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setProduct((prev) => ({
      ...prev,
      seo: {
        title: field === "title" ? e.target.value : prev.seo?.title || "",
        description: field === "description" ? e.target.value : prev.seo?.description || "",
        keywords: field === "keywords" ? e.target.value : prev.seo?.keywords || "",
      },
    }))
  }
  // Handle tag selection


  // Handle category selection
  const handleCategorySelect = (categoryIds: string[]) => {
    setProduct((prev) => ({
      ...prev,
      categories: categoryIds,
    }))

    // Clear error when categories are selected
    if (errors.categories) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.categories
        return newErrors
      })
    }
  }

  const handleCategoryCreate = async (category: Category, parentCategoryId: string) => {
    const newCategory: CreateCategoryRequest = {
      category: {
        id: category.id,
        name: category.name,
        parentId: parentCategoryId,
      }
    }
    try {
      createCategory(newCategory)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create category. Please try again.",
        variant: "destructive",
      })
    }
  
  }
  // Handle category update
  const handleCategoryUpdate = async (updatedCategory: Category) => {
    try {
      updateCategory({
        category: {
          id: updatedCategory.id,
          name: updatedCategory.name,
          parentId: updatedCategory.parentId || "",
        }
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update category. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateColorAttribute = (newVariants: ProductVariant[], productAttributes: ProductAttribute[]): ProductAttribute[] => {
    // Find the color attribute in product attributes
    const existingColorAttribute = productAttributes.find(
      (attr) => attr.name.toLowerCase() === "color"
    )

    if (!existingColorAttribute) return productAttributes

    // Get all unique color values from variants
    const colorValues = new Set<string>()
    newVariants.forEach((variant) => {
      const colorAttr = variant.attributes.find(
        (attr) => attr.name.toLowerCase() === "color"
      )
      if (colorAttr?.value) {
        colorValues.add(colorAttr.value)
      }
    })

    // Update the existing color attribute with all unique values
    const updatedAttributes = productAttributes.map((attr) => {
      if (attr.name.toLowerCase() === "color") {
        return {
          ...attr,
          values: Array.from(new Set([...attr.values, ...colorValues]))
        }
      }
      return attr
    })

    return updatedAttributes
  }


  // Handle variants update
  const handleVariantsUpdate = (updatedVariants: ProductVariant[], action: "delete" | "update") => {
    setProduct((prev) => {
      const updatedAttributes = action !== "delete"
        ? updateColorAttribute(updatedVariants, prev.attributes)
        : prev.attributes

      return {
        ...prev,
        attributes: updatedAttributes,
        variants: updatedVariants.map((variant) => ({
          ...variant,
          id: variant.id || "",
          sku: variant.sku || "",
          price: variant.price || 0,
          stock: variant.stock ? {
            ...variant.stock,
            quantity: variant.stock.quantity || 0,
          } : undefined,
          lowStockThreshold: variant.lowStockThreshold || 0,
          warehouseId: variant.warehouseId || "",
          images: variant.imageIds.map((imageId) => ({
            ...product.images.find((image) => image.id === imageId),
            id: imageId,
            url: product.images.find((image) => image.id === imageId)?.url || "",
            isMain: product.images.find((image) => image.id === imageId)?.isMain || false,
            blurhash: product.images.find((image) => image.id === imageId)?.blurhash || ""
          })),
          attributes: variant.attributes?.map((attribute) => ({
            ...attribute,
            id: attribute.id || "",
            name: attribute.name || "",
            value: attribute.value || "",
            extraValue: attribute.extraValue || "",
          })),
        })),
      }
    })
  }

  // Handle brand selection
  const handleBrandSelect = (brandId: string) => {
    setProduct((prev) => ({
      ...prev,
      brandId: brandId,
    }))

    // Clear error when brand is selected
    if (errors.brandId) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.brandId
        return newErrors
      })
    }
  }

  // Handle attributes update
  const handleAttributesUpdate = (updatedAttributes: ProductAttribute[]) => {
    setProduct((prev) => ({
      ...prev,
      attributes: updatedAttributes.map((attribute) => ({
        ...attribute,
        id: attribute.id || "",
        name: attribute.name || "",
        required: attribute.required || false,
        visible: attribute.visible || false,
        values: attribute.values || [],
        variantable: attribute.variantable || false,
        filterable: attribute.filterable || false,
        searchable: attribute.searchable || false,
        displayOrder: attribute.displayOrder || 0,
      })),
    }))
  }

  // Handle size charts update
  const handleSizeChartsUpdate = (updatedSizeCharts: SizeChart[]) => {
    setSizeCharts(updatedSizeCharts)
  }


  const getPriceRange = () => {
    if (product.variants.length === 0) {
      return product.basePrice ? `${product.basePrice.toFixed(2)}` : `${product.costPrice.toFixed(2)}`
    }

    const prices = product.variants.map((v) => v.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    if (minPrice === maxPrice) {
      return `${minPrice.toFixed(2)}`
    }

    return `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`
  }

  const handleImagesUpdate = (updatedImages: ProductImage[]) => {
    setProduct((prev) => ({
      ...prev,
      images: updatedImages,
    }))
  }

  const handleBrandCreate = async (brand: Brand) => {
    try {
      const newBrand: CreateBrandRequest = {
        brand: {
          id: brand.id,
          name: brand.name,
          logo: brand.logo,
        }
      }
      createBrand(newBrand);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create brand. Please try again.",
        variant: "destructive",
      });
    }
  };

  const validateRequiredField = (value: string, field: string): string | null => {
    if (!value.trim()) return `${field} is required`
    return null
  }

  const validateNumericField = (value: number, field: string, min: number = 0): string | null => {

    if (value <= min) return `${field} must be greater than ${min}`
    return null
  }

  const validateDimensions = (dimensions: Product['dimensions']): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (!dimensions) return errors

    const fields = ['length', 'width', 'height', 'weight'] as const
    fields.forEach(field => {
      const error = validateNumericField(dimensions[field], field)
      if (error) errors[`dimensions.${field}`] = error
    })

    return errors
  }

  const validateVariants = (variants: ProductVariant[]): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (variants.length === 0) return errors

    variants.forEach((variant, index) => {
      if (!variant.sku) errors[`variants.${index}.sku`] = "Variant SKU is required"
      if (variant.price <= 0) errors[`variants.${index}.price`] = "Variant price must be greater than 0"
      if (variant.stock?.quantity && variant.stock.quantity < 0) errors[`variants.${index}.stock.quantity`] = "Variant quantity must be greater than or equal to 0"
    })

    return errors
  }

  const validateAttributes = (attributes: ProductAttribute[]): Record<string, string> => {
    const errors: Record<string, string> = {}
    if (attributes.length === 0) return errors

    attributes.forEach((attr, index) => {
      if (!attr.name.trim()) errors[`attributes.${index}.name`] = "Attribute name is required"
      if (attr.required && attr.values.length === 0) {
        errors[`attributes.${index}.values`] = "Required attribute must have at least one value"
      }
    })

    return errors
  }

  const validateProduct = (product: Product): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {}

    // Required fields validation
    const requiredFields = ['name', 'slug', 'sku'] as const
    requiredFields.forEach(field => {
      const error = validateRequiredField(product[field], field)
      if (error) errors[field] = error
    })

    // Numeric fields validation
    if (validateNumericField(product.costPrice, 'Cost price')) {
      errors.costPrice = "Cost price must be greater than 0"
    }
    if (product.basePrice && validateNumericField(product.basePrice, 'Base price')) {
      errors.basePrice = "Base price must be greater than 0"
    }

    // Categories validation
    if (product.categories.length === 0) {
      errors.categories = "At least one category is required"
    }

    // Brand validation
    if (!product.brandId) {
      errors.brandId = "Brand is required"
    }

    // Merge all validation results
    Object.assign(errors, validateDimensions(product.dimensions))
    Object.assign(errors, validateVariants(product.variants))
    Object.assign(errors, validateAttributes(product.attributes))

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }

  // Filter related products based on search
  const filteredRelatedProducts = useMemo(() => {
    if (!allProducts) return []
    const searchTerm = relatedProductSearch.toLowerCase()
    return allProducts
      .filter((product) => product.slug !== productSlug) // Exclude current product
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.sku.toLowerCase().includes(searchTerm)
      )
  }, [allProducts, relatedProductSearch, productSlug])

  // Update handleSave function
  const handleSave = async () => {
    setIsSaving(true)
    setIsLoading(true)

    const { isValid, errors: validationErrors } = validateProduct(product)
    console.log(validationErrors, "validationErrors")
    setErrors(validationErrors)

    if (!isValid) {
      setIsLoading(false)
      setIsSaving(false)
      return
    }

    try {
      if (mode === "add") {
        await createProduct({product, relatedProductIds})
      } else {
        await updateProduct({product, relatedProductIds})
      }
      router.push(`/admin/inventory/`)
      setIsLoading(false)
      setIsSaving(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsSaving(false)
    }
  }

  // Add error display component
  const ErrorMessage = ({ field }: { field: string }) => {
    if (!errors[field]) return null
    return (
      <p className="text-sm text-destructive mt-1">{errors[field]}</p>
    )
  }

  // Handle related product toggle
  const handleRelatedProductToggle = (productId: string) => {
    setRelatedProductIds((prev) => {
      if (prev.includes(productId)) {
        // Remove the product if it's already in the list
        return prev.filter(id => id !== productId);
      } else {
        // Add the product if it's not in the list
        return [...prev, productId];
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/admin/inventory">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <h1 className="text-3xl font-bold dark:text-white">
                {mode === "add" ? "Add New Product" : "Edit Product"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {mode === "edit" && (
                <Button variant="outline" size="sm" onClick={() => window.open(`/products/${product.slug}`, "_blank")}>View Product</Button>
              )}
              {isLoadingProduct ? (
                <Skeleton className="h-10 w-[180px]" />
              ) : (
                
                <Select
                  value={product.status}
                  onValueChange={(value: "draft" | "published" | "archived") =>
                    setProduct((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Product"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingProduct ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-32 w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Product Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={product.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          className={errors.name ? "border-destructive" : ""}
                        />
                        <ErrorMessage field="name" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="slug">
                            Slug <span className="text-destructive">*</span>
                          </Label>
                          <Button variant="ghost" size="sm" onClick={generateSlug} className="h-6 text-xs">
                            Generate from name
                          </Button>
                        </div>
                        <Input
                          id="slug"
                          name="slug"
                          value={product.slug}
                          onChange={handleInputChange}
                          placeholder="product-slug"
                          className={errors.slug ? "border-destructive" : ""}
                        />
                        <ErrorMessage field="slug" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={product.description}
                          onChange={handleInputChange}
                          placeholder="Product description"
                          rows={5}
                          className={errors.description ? "border-destructive" : ""}
                        />
                        <ErrorMessage field="description" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="costPrice">
                            Cost Price <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input
                              id="costPrice"
                              name="costPrice"
                              type="number"
                              value={product.costPrice}
                              onChange={(e) => handleNumericInputChange(e, "costPrice")}
                              className={`pl-8 ${errors.costPrice ? "border-destructive" : ""}`}
                              step="0.01"
                              min="0"
                            />
                          </div>
                          <ErrorMessage field="costPrice" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="basePrice">Base Price</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                            <Input
                              id="basePrice"
                              name="basePrice"
                              type="number"
                              value={product.basePrice || ""}
                              onChange={(e) => handleNumericInputChange(e, "basePrice")}
                              className={`pl-8 ${errors.basePrice ? "border-destructive" : ""}`}
                              step="0.01"
                              min="0"
                              placeholder="Optional"
                            />
                          </div>
                          <ErrorMessage field="basePrice" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sku">
                            SKU <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="sku"
                            name="sku"
                            value={product.sku}
                            onChange={handleInputChange}
                            placeholder="Stock Keeping Unit"
                            className={errors.sku ? "border-destructive" : ""}
                          />
                          <ErrorMessage field="sku" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="barcode">Barcode</Label>
                          <Input
                            id="barcode"
                            name="barcode"
                            value={product.barcode || ""}
                            onChange={handleInputChange}
                            placeholder="Product barcode"
                            className={errors.barcode ? "border-destructive" : ""}
                          />
                          <ErrorMessage field="barcode" />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label>Price Range</Label>
                        <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center">
                          ${getPriceRange()}
                        </div>
                        <p className="text-xs text-muted-foreground">Calculated from variant prices</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                  <TabsTrigger value="size-charts">Size Charts</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isLoadingProduct ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                  <Skeleton className="h-4 w-16" />
                                  <Skeleton className="h-10 w-full" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label>Dimensions & Weight</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="length" className="text-sm">
                                  Length (cm)
                                </Label>
                                <Input
                                  id="length"
                                  type="number"
                                  value={product.dimensions?.length || ""}
                                  onChange={(e) => handleDimensionChange(e, "length")}
                                  min="0"
                                  step="0.1"
                                  className={errors.dimensions ? "border-destructive" : ""}
                                />
                                <ErrorMessage field="dimensions.length" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="width" className="text-sm">
                                  Width (cm)
                                </Label>
                                <Input
                                  id="width"
                                  type="number"
                                  value={product.dimensions?.width || ""}
                                  onChange={(e) => handleDimensionChange(e, "width")}
                                  min="0"
                                  step="0.1"
                                  className={errors.dimensions ? "border-destructive" : ""}
                                />
                                <ErrorMessage field="dimensions.width" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="height" className="text-sm">
                                  Height (cm)
                                </Label>
                                <Input
                                  id="height"
                                  type="number"
                                  value={product.dimensions?.height || ""}
                                  onChange={(e) => handleDimensionChange(e, "height")}
                                  min="0"
                                  step="0.1"
                                  className={errors.dimensions ? "border-destructive" : ""}
                                />
                                <ErrorMessage field="dimensions.height" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="weight" className="text-sm">
                                  Weight (kg)
                                </Label>
                                <Input
                                  id="weight"
                                  type="number"
                                  value={product.dimensions?.weight || ""}
                                  onChange={(e) => handleDimensionChange(e, "weight")}
                                  min="0"
                                  step="0.01"
                                  className={errors.dimensions ? "border-destructive" : ""}
                                />
                                <ErrorMessage field="dimensions.weight" />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <Label>Product Attributes</Label>
                            <div className={errors.attributes ? "border border-destructive rounded-md p-2" : ""}>
                              <AttributesManager
                                attributes={product.attributes}
                                onChange={handleAttributesUpdate}
                                showAdvancedOptions={true}
                              />
                            </div>
                            <ErrorMessage field="attributes" />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="images" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ImageGallery
                        images={product.images || []}
                        onChange={handleImagesUpdate}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="variants" className="space-y-4 pt-4">
                  <Card>
                    <CardContent>
                      <VariantManager
                        attributes={product.attributes}
                        variants={product.variants}
                        onVariantUpdate={handleVariantsUpdate}
                        // onVariantCreate={handleVariantCreate}
                        basePrice={product.basePrice}
                        productImages={product.images || []}
                        baseSku={product.sku}
                        categoryPath={getCategoryPath}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="size-charts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Size Charts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SizeInstructionEditor
                        sizeCharts={sizeCharts}
                        onChange={handleSizeChartsUpdate}
                        productCategories={productCategoryNames}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="seoTitle">SEO Title</Label>
                        <Input
                          id="seoTitle"
                          value={product.seo?.title}
                          onChange={(e) => handleSeoChange(e, "title")}
                          placeholder="SEO optimized title (for search engines)"
                        />
                        <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seoDescription">Meta Description</Label>
                        <Textarea
                          id="seoDescription"
                          value={product.seo?.description}
                          onChange={(e) => handleSeoChange(e, "description")}
                          placeholder="Brief description for search engines"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Related Products</CardTitle>
                      <CardDescription>Select products to show as related items</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search products..."
                            value={relatedProductSearch}
                            onChange={(e) => setRelatedProductSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        {isLoadingProducts ? (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : filteredRelatedProducts.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No products found matching your search
                          </p>
                        ) : (
                          filteredRelatedProducts.map((relatedProduct) => (
                            <div
                              key={relatedProduct.id}
                              className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                            >
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={`related-${relatedProduct.id}`}
                                  checked={relatedProductIds.includes(relatedProduct.id)}
                                  onCheckedChange={() => handleRelatedProductToggle(relatedProduct.id)}
                                />
                                <Label htmlFor={`related-${relatedProduct.id}`} className="font-normal cursor-pointer">
                                  {relatedProduct.name}
                                  <span className="text-sm text-muted-foreground block">
                                    {relatedProduct.sku} • ${relatedProduct.basePrice}
                                  </span>
                                </Label>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/products/${relatedProduct.slug}`, "_blank")}
                              >
                                <LinkIcon className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>


              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingProduct ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-40 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Product Categories</Label>
                          <div className={errors.categories ? "border border-destructive rounded-md p-2" : ""}>
                            {isLoadingCategories ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CategoryTree
                                categories={categories}
                                selectedCategories={product.categories}
                                onCategorySelect={handleCategorySelect}
                                onCategoryUpdate={handleCategoryUpdate}
                                onCategoryCreate={handleCategoryCreate}
                                allowMultipleRoots={false}
                              />
                            )}
                          </div>
                          <ErrorMessage field="categories" />
                        </div>
                        <div className="space-y-2">
                          <Label>Brand</Label>
                          {isLoadingBrands ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <BrandSelector
                              brands={brands}
                              selectedBrandId={product.brandId}
                              onBrandSelect={handleBrandSelect}
                              onBrandCreate={handleBrandCreate}
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label>Tags</Label>
                          <TagCombobox
                            selectedTags={product.productTags}
                            onChange={(tags) => setProduct((prev) => ({
                              ...prev,
                              productTags: tags
                            }))}
                            productId={product.id}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoadingProduct ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Skeleton className="h-6 w-11" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={product.featured}
                          onCheckedChange={(checked) => setProduct((prev) => ({ ...prev, featured: checked }))}
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="taxable"
                          checked={product.taxable}
                          onCheckedChange={(checked) => setProduct((prev) => ({ ...prev, taxable: checked }))}
                        />
                        <Label htmlFor="taxable">Taxable Product</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="shippable"
                          checked={product.shippable !== false}
                          onCheckedChange={(checked) => setProduct((prev) => ({ ...prev, shippable: checked }))}
                        />
                        <Label htmlFor="shippable">Requires Shipping</Label>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleSave} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Product"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {isSaving && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <div className="mx-auto mb-4 h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Saving Product</h3>
            <p className="text-muted-foreground">Please wait while we save your changes...</p>
          </div>
        </div>
      )}
    </div>
  )
} 
