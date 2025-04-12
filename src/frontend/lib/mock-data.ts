import type { Product, ProductAttribute, ProductVariant, AttributeValue } from "@/types/product"

// Mock attribute values
export const mockAttributeValues: AttributeValue[] = [
  // Color values
  { id: "color-red", name: "Red", slug: "red", color: "#FF0000", displayOrder: 0 },
  { id: "color-blue", name: "Blue", slug: "blue", color: "#0000FF", displayOrder: 1 },
  { id: "color-green", name: "Green", slug: "green", color: "#00FF00", displayOrder: 2 },
  { id: "color-black", name: "Black", slug: "black", color: "#000000", displayOrder: 3 },
  { id: "color-white", name: "White", slug: "white", color: "#FFFFFF", displayOrder: 4 },

  // Size values
  { id: "size-s", name: "Small", slug: "small", displayOrder: 0 },
  { id: "size-m", name: "Medium", slug: "medium", displayOrder: 1 },
  { id: "size-l", name: "Large", slug: "large", displayOrder: 2 },
  { id: "size-xl", name: "Extra Large", slug: "extra-large", displayOrder: 3 },

  // Material values
  { id: "material-cotton", name: "Cotton", slug: "cotton", displayOrder: 0 },
  { id: "material-polyester", name: "Polyester", slug: "polyester", displayOrder: 1 },
  { id: "material-wool", name: "Wool", slug: "wool", displayOrder: 2 },
  { id: "material-leather", name: "Leather", slug: "leather", displayOrder: 3 },

  // Style values
  { id: "style-casual", name: "Casual", slug: "casual", displayOrder: 0 },
  { id: "style-formal", name: "Formal", slug: "formal", displayOrder: 1 },
  { id: "style-sport", name: "Sport", slug: "sport", displayOrder: 2 },
]

// Mock attributes
export const mockAttributes: ProductAttribute[] = [
  {
    id: "attr-color",
    name: "Color",
    slug: "color",
    type: "color",
    description: "Product color",
    required: true,
    visible: true,
    filterable: true,
    searchable: true,
    variantable: true,
    displayOrder: 0,
    values: mockAttributeValues.filter((v) => v.id.startsWith("color-")),
  },
  {
    id: "attr-size",
    name: "Size",
    slug: "size",
    type: "select",
    description: "Product size",
    required: true,
    visible: true,
    filterable: true,
    searchable: true,
    variantable: true,
    displayOrder: 1,
    values: mockAttributeValues.filter((v) => v.id.startsWith("size-")),
  },
  {
    id: "attr-material",
    name: "Material",
    slug: "material",
    type: "select",
    description: "Product material",
    required: false,
    visible: true,
    filterable: true,
    searchable: true,
    variantable: true,
    displayOrder: 2,
    values: mockAttributeValues.filter((v) => v.id.startsWith("material-")),
  },
  {
    id: "attr-style",
    name: "Style",
    slug: "style",
    type: "select",
    description: "Product style",
    required: false,
    visible: true,
    filterable: true,
    searchable: true,
    variantable: true,
    displayOrder: 3,
    values: mockAttributeValues.filter((v) => v.id.startsWith("style-")),
  },
]

// Mock variants for a t-shirt product
export const mockTShirtVariants: ProductVariant[] = [
  // Red variants
  {
    id: "var-1",
    productId: "prod-1",
    sku: "TS-RED-S-COT",
    price: 19.99,
    inventory: 25,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-red" },
      { attributeId: "attr-size", valueId: "size-s" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [{ id: "img-1", url: "https://picsum.photos/id/1/500/500", isMain: true }],
    isDefault: false,
    status: "active",
  },
  {
    id: "var-2",
    productId: "prod-1",
    sku: "TS-RED-M-COT",
    price: 19.99,
    inventory: 30,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-red" },
      { attributeId: "attr-size", valueId: "size-m" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [{ id: "img-2", url: "https://picsum.photos/id/2/500/500", isMain: true }],
    isDefault: true,
    status: "active",
  },
  {
    id: "var-3",
    productId: "prod-1",
    sku: "TS-RED-L-COT",
    price: 19.99,
    inventory: 20,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-red" },
      { attributeId: "attr-size", valueId: "size-l" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [{ id: "img-3", url: "https://picsum.photos/id/3/500/500", isMain: true }],
    isDefault: false,
    status: "active",
  },

  // Blue variants
  {
    id: "var-4",
    productId: "prod-1",
    sku: "TS-BLU-S-COT",
    price: 19.99,
    inventory: 15,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-blue" },
      { attributeId: "attr-size", valueId: "size-s" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [{ id: "img-4", url: "https://picsum.photos/id/4/500/500", isMain: true }],
    isDefault: false,
    status: "active",
  },
  {
    id: "var-5",
    productId: "prod-1",
    sku: "TS-BLU-M-COT",
    price: 19.99,
    inventory: 22,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-blue" },
      { attributeId: "attr-size", valueId: "size-m" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [
      { id: "img-5", url: "https://picsum.photos/id/5/500/500", isMain: true },
    ],
    isDefault: false,
    status: "active",
  },
  {
    id: "var-6",
    productId: "prod-1",
    sku: "TS-BLU-L-COT",
    price: 19.99,
    inventory: 18,
    lowStockThreshold: 5,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-blue" },
      { attributeId: "attr-size", valueId: "size-l" },
      { attributeId: "attr-material", valueId: "material-cotton" },
    ],
    images: [{ id: "img-6", url: "https://picsum.photos/id/6/500/500", isMain: true }],
    isDefault: false,
    status: "active",
  },

  // Black polyester variants
  {
    id: "var-7",
    productId: "prod-1",
    sku: "TS-BLK-M-POL",
    price: 24.99,
    inventory: 12,
    lowStockThreshold: 3,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-black" },
      { attributeId: "attr-size", valueId: "size-m" },
      { attributeId: "attr-material", valueId: "material-polyester" },
    ],
    images: [
      { id: "img-7", url: "https://picsum.photos/id/7/500/500", isMain: true },
    ],
    isDefault: false,
    status: "active",
  },
  {
    id: "var-8",
    productId: "prod-1",
    sku: "TS-BLK-L-POL",
    price: 24.99,
    inventory: 10,
    lowStockThreshold: 3,
    attributeValues: [
      { attributeId: "attr-color", valueId: "color-black" },
      { attributeId: "attr-size", valueId: "size-l" },
      { attributeId: "attr-material", valueId: "material-polyester" },
    ],
    images: [
      { id: "img-8", url: "https://picsum.photos/id/8/500/500", isMain: true },
    ],
    isDefault: false,
    status: "active",
  },
]

// Mock products
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Classic T-Shirt",
    slug: "classic-t-shirt",
    description: "A comfortable and versatile t-shirt for everyday wear. Available in multiple colors and sizes.",
    costPrice: 19.99,
    basePrice: 24.99,
    sku: "TS-BASE",
    barcode: "123456789",
    categories: ["cat-1", "cat-2"],
    tags: ["t-shirt", "casual", "essential"],
    images: [
      { id: "img-main", url: "/placeholder.svg?height=600&width=600&text=Classic+TShirt", isMain: true },
      { id: "img-alt-1", url: "/placeholder.svg?height=600&width=600&text=TShirt+Back" },
      { id: "img-alt-2", url: "/placeholder.svg?height=600&width=600&text=TShirt+Detail" },
    ],
    attributes: ["attr-color", "attr-size", "attr-material", "attr-style"],
    variants: mockTShirtVariants,
    brandId: "brand-1",
    featured: true,
    status: "published",
    dimensions: {
      length: 30,
      width: 20,
      height: 2,
      weight: 0.2,
    },
    seo: {
      title: "Classic T-Shirt | NEXURA",
      description: "A comfortable and versatile t-shirt for everyday wear. Available in multiple colors and sizes.",
      keywords: "t-shirt, casual, cotton, polyester, comfortable",
    },
    taxable: true,
    shippable: true,
  },
  // Add more mock products as needed
]
