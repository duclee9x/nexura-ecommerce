// Core data models for NEXURA e-commerce platform

// Common Types
export type ID = string
export type Timestamp = string // ISO format date string
export type Status = "active" | "inactive" | "draft" | "published" | "archived" | "scheduled"
export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY"

// Base Entity Interface
export interface BaseEntity {
  id: ID
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Product Schema
export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  compareAtPrice?: number
  cost?: number
  sku: string
  barcode?: string
  inventory: ProductInventory
  images: ProductImage[]
  categories: string[]
  tags: string[]
  attributes: ProductAttribute[]
  variants: ProductVariant[]
  status: "draft" | "active" | "archived"
  visibility: "visible" | "hidden"
  seo: SEO
  publishedAt?: Timestamp
  warehouseId?: ID
  reviews?: Review[]
  averageRating?: number
  totalReviews?: number
}

// Product Inventory
export interface ProductInventory {
  quantity: number
  lowStockThreshold: number
  trackInventory: boolean
  allowBackorders: boolean
  warehouseAllocations?: WarehouseAllocation[]
}

// Warehouse Allocation
export interface WarehouseAllocation {
  warehouseId: ID
  quantity: number
}

// Product Image
export interface ProductImage {
  id: ID
  url: string
  alt?: string
  position: number
}

// Product Attribute
export interface ProductAttribute {
  name: string
  value: string
}

// Product Variant Schema
export interface ProductVariant extends BaseEntity {
  productId: ID
  name: string
  sku: string
  barcode?: string
  price: number
  compareAtPrice?: number
  cost?: number
  inventory: ProductInventory
  attributes: ProductAttribute[]
  image?: ProductImage
  weight?: number
  dimensions?: ProductDimensions
  isDefault: boolean
  status: "active" | "inactive"
}

// Product Dimensions
export interface ProductDimensions {
  length: number
  width: number
  height: number
  unit: "cm" | "in"
}

// Customer Schema
export interface Customer extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses: Address[]
  defaultAddressId?: ID
  orders: Order[]
  status: "active" | "inactive" | "blocked"
  tags: string[]
  notes?: string
  marketing: MarketingPreferences
  totalSpent: number
  lastOrderDate?: Timestamp
  passwordHash?: string // Backend only
  passwordSalt?: string // Backend only
  authToken?: string // Backend only
  refreshToken?: string // Backend only
  wishlist?: ID[] // Product IDs
}

// Marketing Preferences
export interface MarketingPreferences {
  acceptsMarketing: boolean
  marketingOptInLevel?: "single_opt_in" | "confirmed_opt_in"
  marketingConsentUpdatedAt?: Timestamp
  emailPreferences?: {
    newsletters: boolean
    productUpdates: boolean
    promotions: boolean
  }
}

// Address Schema
export interface Address extends BaseEntity {
  customerId: ID
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  province?: string
  country: string
  zip: string
  phone?: string
  isDefault: boolean
  isShipping: boolean
  isBilling: boolean
}

// Order Schema
export interface Order extends BaseEntity {
  customerId?: ID
  orderNumber: string
  email: string
  phone?: string
  shippingAddress: Address
  billingAddress: Address
  currency: Currency
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  items: OrderItem[]
  paymentStatus: "pending" | "paid" | "partially_paid" | "refunded" | "partially_refunded" | "failed"
  fulfillmentStatus: "unfulfilled" | "partially_fulfilled" | "fulfilled" | "returned" | "partially_returned"
  shippingMethod: string
  paymentMethod: string
  notes?: string
  tags: string[]
  discountCodes: string[]
  cancelledAt?: Timestamp
  cancelReason?: string
  trackingInfo?: TrackingInfo
}

// Tracking Info
export interface TrackingInfo {
  carrier: string
  trackingNumber: string
  trackingUrl?: string
  estimatedDelivery?: Timestamp
  shippedAt?: Timestamp
  deliveredAt?: Timestamp
  status: "pending" | "shipped" | "in_transit" | "out_for_delivery" | "delivered" | "failed" | "returned"
  events?: TrackingEvent[]
}

// Tracking Event
export interface TrackingEvent {
  timestamp: Timestamp
  status: string
  location?: string
  description: string
}

// Order Item Schema
export interface OrderItem extends BaseEntity {
  orderId: ID
  productId: ID
  variantId?: ID
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  quantity: number
  attributes?: ProductAttribute[]
  image?: ProductImage
  requiresShipping: boolean
  taxable: boolean
  fulfillmentStatus: "unfulfilled" | "fulfilled" | "returned"
  warehouseId?: ID
}

// Blog Post Schema
export interface BlogPost extends BaseEntity {
  title: string
  slug: string
  content: string
  excerpt?: string
  author: Author
  featuredImage?: MediaItem
  categories: string[]
  tags: string[]
  status: "draft" | "published" | "archived" | "scheduled"
  seo: SEO
  commentStatus: "open" | "closed"
  comments?: Comment[]
  publishedAt?: Timestamp
  scheduledFor?: Timestamp
  allowComments?: boolean
  sendNewsletter?: boolean
  isFeatured?: boolean
  seoTitle?: string
  seoDescription?: string
}

// Author
export interface Author {
  id: ID
  name: string
  avatar?: string
  bio?: string
  email?: string // Backend only
  role?: "admin" | "editor" | "author" | "contributor"
}

// Media Item
export interface MediaItem extends BaseEntity {
  filename: string
  url: string
  alt?: string
  type: "image" | "video" | "document" | "audio"
  fileSize: number
  dimensions?: {
    width: number
    height: number
  }
  size?: string
  uploadedAt?: Timestamp
  mimeType: string
  folder?: string
  tags?: string[]
}

// Comment Schema
export interface Comment extends BaseEntity {
  postId: ID
  parentId?: ID
  author: CommentAuthor
  content: string
  status: "pending" | "approved" | "spam" | "trash"
}

// Comment Author
export interface CommentAuthor {
  name: string
  email: string
  website?: string
  avatar?: string
  ip?: string // Backend only
  userAgent?: string // Backend only
}

// SEO
export interface SEO {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  twitterCard?: string
}

// Notification Schema
export interface Notification extends BaseEntity {
  userId: ID
  type: "order" | "inventory" | "customer" | "system" | "chat" | "blog"
  title: string
  content: string
  link?: string
  read: boolean
  priority: "low" | "medium" | "high"
  expiresAt?: Timestamp
}

// Chat Message Schema
export interface ChatMessage extends BaseEntity {
  conversationId: ID
  sender: ChatSender
  content: string
  attachments?: ChatAttachment[]
  read: boolean
}

// Chat Sender
export interface ChatSender {
  id: ID
  type: "customer" | "admin"
  name: string
  avatar?: string
}

// Chat Attachment
export interface ChatAttachment {
  id: ID
  url: string
  type: string
  name: string
  size: number
}

// Chat Conversation Schema
export interface ChatConversation extends BaseEntity {
  customerId?: ID
  customerName: string
  customerEmail?: string
  status: "active" | "closed"
  lastMessageDate?: Timestamp
  messages: ChatMessage[]
  closedAt?: Timestamp
  assignedTo?: ID // Staff ID
  tags?: string[]
}

// Email Template Schema
export interface EmailTemplate extends BaseEntity {
  name: string
  subject: string
  content: string
  type:
    | "order_confirmation"
    | "shipping_update"
    | "password_reset"
    | "welcome"
    | "abandoned_cart"
    | "custom"
    | "newsletter"
  variables: string[]
  active: boolean
}

// Review Schema
export interface Review extends BaseEntity {
  productId: ID
  customerId: ID
  customerName: string
  rating: number
  title: string
  content: string
  images: string[]
  status: "pending" | "approved" | "rejected"
  helpful: number
  notHelpful: number
  reply?: ReviewReply
  verifiedPurchase: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Review Reply
export interface ReviewReply {
  content: string
  dateCreated: Timestamp
  staffId: ID
  staffName: string
}

// Warehouse Schema
export interface Warehouse extends BaseEntity {
  name: string
  code: string
  address: Address
  isDefault: boolean
  status: "active" | "inactive"
  inventory: WarehouseInventory[]
  contactEmail?: string
  contactPhone?: string
  notes?: string
}

// Warehouse Inventory
export interface WarehouseInventory {
  productId: ID
  variantId?: ID
  quantity: number
  sku: string
  location?: string // e.g., "Aisle 5, Shelf B"
  reorderPoint?: number
  lastUpdated: Timestamp
}

// Coupon Schema
export interface Coupon extends BaseEntity {
  code: string
  type: "percentage" | "fixed_amount" | "free_shipping"
  value: number // Percentage or amount
  minimumPurchase?: number
  usageLimit?: number
  usageCount: number
  startDate: Timestamp
  endDate?: Timestamp
  status: "active" | "inactive" | "expired"
  applicableProducts?: ID[] // Product IDs
  applicableCategories?: string[]
  excludedProducts?: ID[] // Product IDs
  customerEligibility: "all" | "specific" | "first_time"
  specificCustomers?: ID[] // Customer IDs
  description?: string
}

// User Schema (Admin/Staff)
export interface User extends BaseEntity {
  email: string
  firstName: string
  lastName: string
  role: "admin" | "manager" | "staff" | "developer"
  permissions: Permission[]
  avatar?: string
  status: "active" | "inactive" | "suspended"
  lastLogin?: Timestamp
  passwordHash?: string // Backend only
  passwordSalt?: string // Backend only
  authToken?: string // Backend only
  refreshToken?: string // Backend only
  twoFactorEnabled: boolean
}

// Permission
export interface Permission {
  resource: string // e.g., "products", "orders", "customers"
  actions: ("view" | "create" | "update" | "delete")[]
}

// Settings Schema
export interface Settings {
  general: {
    storeName: string
    storeEmail: string
    storeLogo?: string
    storeFavicon?: string
    defaultCurrency: Currency
    supportedCurrencies: Currency[]
    timezone: string
    dateFormat: string
    timeFormat: string
  }
  shipping: {
    defaultShippingMethod: string
    shippingMethods: ShippingMethod[]
    freeShippingThreshold?: number
  }
  tax: {
    taxIncludedInPrices: boolean
    defaultTaxRate: number
    taxRates: TaxRate[]
  }
  payment: {
    enabledPaymentMethods: string[]
    paymentProviders: PaymentProvider[]
  }
  email: {
    fromName: string
    fromEmail: string
    replyToEmail?: string
    emailProvider: string
    emailProviderSettings: Record<string, any>
  }
  theme: {
    colorScheme: "light" | "dark" | "system"
    primaryColor: string
    accentColor: string
    fontFamily: string
  }
}

// Shipping Method
export interface ShippingMethod {
  id: ID
  name: string
  description?: string
  price: number
  estimatedDeliveryDays: number
  isDefault: boolean
  status: "active" | "inactive"
  countries?: string[]
}

// Tax Rate
export interface TaxRate {
  id: ID
  name: string
  rate: number
  country: string
  state?: string
  zip?: string
  isDefault: boolean
  status: "active" | "inactive"
}

// Payment Provider
export interface PaymentProvider {
  id: ID
  name: string
  type: "credit_card" | "paypal" | "stripe" | "bank_transfer" | "other"
  isDefault: boolean
  status: "active" | "inactive"
  credentials: Record<string, any> // Backend only
}

// Cart (Frontend only)
export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: Currency
  couponCode?: string
  notes?: string
}

// Cart Item (Frontend only)
export interface CartItem {
  id: ID
  productId: ID
  variantId?: ID
  name: string
  price: number
  quantity: number
  image: string
  attributes?: ProductAttribute[]
  sku?: string
  color?: string
  baseCurrency?: Currency
  maxQuantity?: number // Based on inventory
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode?: number
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasMore: boolean
}

// Search Filters
export interface SearchFilters {
  query?: string
  categories?: string[]
  priceRange?: {
    min?: number
    max?: number
  }
  sortBy?: "price_asc" | "price_desc" | "newest" | "popularity" | "rating"
  page?: number
  pageSize?: number
  tags?: string[]
  attributes?: Record<string, string[]>
  inStock?: boolean
}

// Error Types
export interface AppError extends Error {
  statusCode?: number
  code?: string
  details?: Record<string, any>
}

