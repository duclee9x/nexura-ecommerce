/**
 * Database Schema Definition
 *
 * This file defines the database schema for the NEXURA e-commerce platform.
 * It's intended for backend reference and database setup.
 */

export const dbSchema = {
  // Users table
  users: {
    id: "uuid PRIMARY KEY",
    email: "varchar(255) UNIQUE NOT NULL",
    firstName: "varchar(100) NOT NULL",
    lastName: "varchar(100) NOT NULL",
    passwordHash: "varchar(255) NOT NULL",
    passwordSalt: "varchar(255) NOT NULL",
    role: "varchar(50) NOT NULL DEFAULT 'customer'",
    status: "varchar(50) NOT NULL DEFAULT 'active'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    lastLogin: "timestamp",
    avatar: "varchar(255)",
    twoFactorEnabled: "boolean DEFAULT false",
    refreshToken: "varchar(255)",
    authToken: "varchar(255)",
  },

  // Customers table (extends users)
  customers: {
    id: "uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE",
    phone: "varchar(50)",
    defaultAddressId: "uuid REFERENCES addresses(id)",
    totalSpent: "decimal(10,2) DEFAULT 0",
    lastOrderDate: "timestamp",
    notes: "text",
    acceptsMarketing: "boolean DEFAULT false",
    marketingOptInLevel: "varchar(50)",
    marketingConsentUpdatedAt: "timestamp",
  },

  // Addresses table
  addresses: {
    id: "uuid PRIMARY KEY",
    customerId: "uuid REFERENCES customers(id) ON DELETE CASCADE",
    firstName: "varchar(100) NOT NULL",
    lastName: "varchar(100) NOT NULL",
    company: "varchar(255)",
    address1: "varchar(255) NOT NULL",
    address2: "varchar(255)",
    city: "varchar(100) NOT NULL",
    province: "varchar(100)",
    country: "varchar(100) NOT NULL",
    zip: "varchar(20) NOT NULL",
    phone: "varchar(50)",
    isDefault: "boolean DEFAULT false",
    isShipping: "boolean DEFAULT true",
    isBilling: "boolean DEFAULT true",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Products table
  products: {
    id: "uuid PRIMARY KEY",
    name: "varchar(255) NOT NULL",
    description: "text",
    price: "decimal(10,2) NOT NULL",
    compareAtPrice: "decimal(10,2)",
    cost: "decimal(10,2)",
    sku: "varchar(100) UNIQUE NOT NULL",
    barcode: "varchar(100)",
    status: "varchar(50) NOT NULL DEFAULT 'draft'",
    visibility: "varchar(50) NOT NULL DEFAULT 'visible'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    publishedAt: "timestamp",
    seoTitle: "varchar(255)",
    seoDescription: "text",
    seoKeywords: "text",
    warehouseId: "uuid REFERENCES warehouses(id)",
  },

  // Product inventory
  product_inventory: {
    productId: "uuid PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE",
    quantity: "integer NOT NULL DEFAULT 0",
    lowStockThreshold: "integer DEFAULT 5",
    trackInventory: "boolean DEFAULT true",
    allowBackorders: "boolean DEFAULT false",
  },

  // Product images
  product_images: {
    id: "uuid PRIMARY KEY",
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    url: "varchar(255) NOT NULL",
    alt: "varchar(255)",
    position: "integer NOT NULL DEFAULT 0",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Product categories (many-to-many)
  product_categories: {
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    category: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(productId, category)",
  },

  // Product tags (many-to-many)
  product_tags: {
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    tag: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(productId, tag)",
  },

  // Product attributes
  product_attributes: {
    id: "uuid PRIMARY KEY",
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    name: "varchar(100) NOT NULL",
    value: "varchar(255) NOT NULL",
  },

  // Product variants
  product_variants: {
    id: "uuid PRIMARY KEY",
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    name: "varchar(255) NOT NULL",
    sku: "varchar(100) UNIQUE NOT NULL",
    barcode: "varchar(100)",
    price: "decimal(10,2) NOT NULL",
    compareAtPrice: "decimal(10,2)",
    cost: "decimal(10,2)",
    isDefault: "boolean DEFAULT false",
    status: "varchar(50) NOT NULL DEFAULT 'active'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    imageId: "uuid REFERENCES product_images(id)",
    weight: "decimal(10,2)",
    length: "decimal(10,2)",
    width: "decimal(10,2)",
    height: "decimal(10,2)",
    dimensionUnit: "varchar(10) DEFAULT 'cm'",
  },

  // Variant inventory
  variant_inventory: {
    variantId: "uuid PRIMARY KEY REFERENCES product_variants(id) ON DELETE CASCADE",
    quantity: "integer NOT NULL DEFAULT 0",
    lowStockThreshold: "integer DEFAULT 5",
    trackInventory: "boolean DEFAULT true",
  },

  // Variant attributes
  variant_attributes: {
    id: "uuid PRIMARY KEY",
    variantId: "uuid REFERENCES product_variants(id) ON DELETE CASCADE",
    name: "varchar(100) NOT NULL",
    value: "varchar(255) NOT NULL",
  },

  // Orders table
  orders: {
    id: "uuid PRIMARY KEY",
    customerId: "uuid REFERENCES customers(id)",
    orderNumber: "varchar(50) UNIQUE NOT NULL",
    email: "varchar(255) NOT NULL",
    phone: "varchar(50)",
    currency: "varchar(10) NOT NULL DEFAULT 'USD'",
    subtotal: "decimal(10,2) NOT NULL",
    shippingCost: "decimal(10,2) NOT NULL DEFAULT 0",
    tax: "decimal(10,2) NOT NULL DEFAULT 0",
    discount: "decimal(10,2) NOT NULL DEFAULT 0",
    total: "decimal(10,2) NOT NULL",
    paymentStatus: "varchar(50) NOT NULL DEFAULT 'pending'",
    fulfillmentStatus: "varchar(50) NOT NULL DEFAULT 'unfulfilled'",
    shippingMethod: "varchar(100) NOT NULL",
    paymentMethod: "varchar(100) NOT NULL",
    notes: "text",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    cancelledAt: "timestamp",
    cancelReason: "text",
  },

  // Order items
  order_items: {
    id: "uuid PRIMARY KEY",
    orderId: "uuid REFERENCES orders(id) ON DELETE CASCADE",
    productId: "uuid REFERENCES products(id)",
    variantId: "uuid REFERENCES product_variants(id)",
    name: "varchar(255) NOT NULL",
    sku: "varchar(100) NOT NULL",
    price: "decimal(10,2) NOT NULL",
    compareAtPrice: "decimal(10,2)",
    quantity: "integer NOT NULL",
    requiresShipping: "boolean DEFAULT true",
    taxable: "boolean DEFAULT true",
    fulfillmentStatus: "varchar(50) NOT NULL DEFAULT 'unfulfilled'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    warehouseId: "uuid REFERENCES warehouses(id)",
  },

  // Order addresses
  order_addresses: {
    id: "uuid PRIMARY KEY",
    orderId: "uuid REFERENCES orders(id) ON DELETE CASCADE",
    type: "varchar(50) NOT NULL", // 'shipping' or 'billing'
    firstName: "varchar(100) NOT NULL",
    lastName: "varchar(100) NOT NULL",
    company: "varchar(255)",
    address1: "varchar(255) NOT NULL",
    address2: "varchar(255)",
    city: "varchar(100) NOT NULL",
    province: "varchar(100)",
    country: "varchar(100) NOT NULL",
    zip: "varchar(20) NOT NULL",
    phone: "varchar(50)",
  },

  // Order tracking
  order_tracking: {
    orderId: "uuid PRIMARY KEY REFERENCES orders(id) ON DELETE CASCADE",
    carrier: "varchar(100)",
    trackingNumber: "varchar(100)",
    trackingUrl: "varchar(255)",
    estimatedDelivery: "timestamp",
    shippedAt: "timestamp",
    deliveredAt: "timestamp",
    status: "varchar(50) DEFAULT 'pending'",
  },

  // Tracking events
  tracking_events: {
    id: "uuid PRIMARY KEY",
    orderTrackingId: "uuid REFERENCES order_tracking(orderId) ON DELETE CASCADE",
    timestamp: "timestamp NOT NULL",
    status: "varchar(100) NOT NULL",
    location: "varchar(255)",
    description: "text NOT NULL",
  },

  // Blog posts
  blog_posts: {
    id: "uuid PRIMARY KEY",
    title: "varchar(255) NOT NULL",
    slug: "varchar(255) UNIQUE NOT NULL",
    content: "text NOT NULL",
    excerpt: "text",
    authorId: "uuid REFERENCES users(id)",
    featuredImageId: "uuid REFERENCES media(id)",
    status: "varchar(50) NOT NULL DEFAULT 'draft'",
    commentStatus: "varchar(50) NOT NULL DEFAULT 'open'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    publishedAt: "timestamp",
    scheduledFor: "timestamp",
    seoTitle: "varchar(255)",
    seoDescription: "text",
    allowComments: "boolean DEFAULT true",
    sendNewsletter: "boolean DEFAULT false",
    isFeatured: "boolean DEFAULT false",
  },

  // Blog categories (many-to-many)
  blog_categories: {
    postId: "uuid REFERENCES blog_posts(id) ON DELETE CASCADE",
    category: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(postId, category)",
  },

  // Blog tags (many-to-many)
  blog_tags: {
    postId: "uuid REFERENCES blog_posts(id) ON DELETE CASCADE",
    tag: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(postId, tag)",
  },

  // Comments
  comments: {
    id: "uuid PRIMARY KEY",
    postId: "uuid REFERENCES blog_posts(id) ON DELETE CASCADE",
    parentId: "uuid REFERENCES comments(id)",
    authorName: "varchar(100) NOT NULL",
    authorEmail: "varchar(255) NOT NULL",
    authorWebsite: "varchar(255)",
    authorIp: "varchar(50)",
    authorUserAgent: "varchar(255)",
    content: "text NOT NULL",
    status: "varchar(50) NOT NULL DEFAULT 'pending'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Media library
  media: {
    id: "uuid PRIMARY KEY",
    filename: "varchar(255) NOT NULL",
    url: "varchar(255) NOT NULL",
    alt: "varchar(255)",
    type: "varchar(50) NOT NULL",
    fileSize: "integer NOT NULL",
    width: "integer",
    height: "integer",
    mimeType: "varchar(100) NOT NULL",
    folder: "varchar(255) DEFAULT 'uploads'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    userId: "uuid REFERENCES users(id)",
  },

  // Media tags (many-to-many)
  media_tags: {
    mediaId: "uuid REFERENCES media(id) ON DELETE CASCADE",
    tag: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(mediaId, tag)",
  },

  // Notifications
  notifications: {
    id: "uuid PRIMARY KEY",
    userId: "uuid REFERENCES users(id) ON DELETE CASCADE",
    type: "varchar(50) NOT NULL",
    title: "varchar(255) NOT NULL",
    content: "text NOT NULL",
    link: "varchar(255)",
    read: "boolean DEFAULT false",
    priority: "varchar(50) DEFAULT 'medium'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    expiresAt: "timestamp",
  },

  // Chat conversations
  chat_conversations: {
    id: "uuid PRIMARY KEY",
    customerId: "uuid REFERENCES customers(id)",
    customerName: "varchar(255) NOT NULL",
    customerEmail: "varchar(255)",
    status: "varchar(50) NOT NULL DEFAULT 'active'",
    lastMessageDate: "timestamp",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    closedAt: "timestamp",
    assignedToId: "uuid REFERENCES users(id)",
  },

  // Chat messages
  chat_messages: {
    id: "uuid PRIMARY KEY",
    conversationId: "uuid REFERENCES chat_conversations(id) ON DELETE CASCADE",
    senderId: "uuid NOT NULL",
    senderType: "varchar(50) NOT NULL", // 'customer' or 'admin'
    senderName: "varchar(255) NOT NULL",
    content: "text NOT NULL",
    read: "boolean DEFAULT false",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Chat attachments
  chat_attachments: {
    id: "uuid PRIMARY KEY",
    messageId: "uuid REFERENCES chat_messages(id) ON DELETE CASCADE",
    url: "varchar(255) NOT NULL",
    type: "varchar(50) NOT NULL",
    name: "varchar(255) NOT NULL",
    size: "integer NOT NULL",
  },

  // Email templates
  email_templates: {
    id: "uuid PRIMARY KEY",
    name: "varchar(255) NOT NULL",
    subject: "varchar(255) NOT NULL",
    content: "text NOT NULL",
    type: "varchar(50) NOT NULL",
    variables: "text", // JSON array of variable names
    active: "boolean DEFAULT true",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Reviews
  reviews: {
    id: "uuid PRIMARY KEY",
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    customerId: "uuid REFERENCES customers(id)",
    customerName: "varchar(255) NOT NULL",
    rating: "integer NOT NULL",
    title: "varchar(255) NOT NULL",
    content: "text NOT NULL",
    status: "varchar(50) NOT NULL DEFAULT 'pending'",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    helpful: "integer DEFAULT 0",
    notHelpful: "integer DEFAULT 0",
    verifiedPurchase: "boolean DEFAULT false",
  },

  // Review images
  review_images: {
    reviewId: "uuid REFERENCES reviews(id) ON DELETE CASCADE",
    imageUrl: "varchar(255) NOT NULL",
    PRIMARY_KEY: "(reviewId, imageUrl)",
  },

  // Review replies
  review_replies: {
    reviewId: "uuid PRIMARY KEY REFERENCES reviews(id) ON DELETE CASCADE",
    content: "text NOT NULL",
    staffId: "uuid REFERENCES users(id)",
    staffName: "varchar(255) NOT NULL",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Warehouses
  warehouses: {
    id: "uuid PRIMARY KEY",
    name: "varchar(255) NOT NULL",
    code: "varchar(50) UNIQUE NOT NULL",
    isDefault: "boolean DEFAULT false",
    status: "varchar(50) NOT NULL DEFAULT 'active'",
    contactEmail: "varchar(255)",
    contactPhone: "varchar(50)",
    notes: "text",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Warehouse addresses
  warehouse_addresses: {
    warehouseId: "uuid PRIMARY KEY REFERENCES warehouses(id) ON DELETE CASCADE",
    address1: "varchar(255) NOT NULL",
    address2: "varchar(255)",
    city: "varchar(100) NOT NULL",
    province: "varchar(100)",
    country: "varchar(100) NOT NULL",
    zip: "varchar(20) NOT NULL",
    phone: "varchar(50)",
  },

  // Warehouse inventory
  warehouse_inventory: {
    id: "uuid PRIMARY KEY",
    warehouseId: "uuid REFERENCES warehouses(id) ON DELETE CASCADE",
    productId: "uuid REFERENCES products(id)",
    variantId: "uuid REFERENCES product_variants(id)",
    quantity: "integer NOT NULL DEFAULT 0",
    sku: "varchar(100) NOT NULL",
    location: "varchar(255)",
    reorderPoint: "integer",
    lastUpdated: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    UNIQUE: "(warehouseId, productId, variantId)",
  },

  // Coupons
  coupons: {
    id: "uuid PRIMARY KEY",
    code: "varchar(100) UNIQUE NOT NULL",
    type: "varchar(50) NOT NULL",
    value: "decimal(10,2) NOT NULL",
    minimumPurchase: "decimal(10,2)",
    usageLimit: "integer",
    usageCount: "integer DEFAULT 0",
    startDate: "timestamp NOT NULL",
    endDate: "timestamp",
    status: "varchar(50) NOT NULL DEFAULT 'active'",
    customerEligibility: "varchar(50) NOT NULL DEFAULT 'all'",
    description: "text",
    createdAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },

  // Coupon product restrictions (many-to-many)
  coupon_products: {
    couponId: "uuid REFERENCES coupons(id) ON DELETE CASCADE",
    productId: "uuid REFERENCES products(id) ON DELETE CASCADE",
    type: "varchar(50) NOT NULL", // 'include' or 'exclude'
    PRIMARY_KEY: "(couponId, productId, type)",
  },

  // Coupon category restrictions (many-to-many)
  coupon_categories: {
    couponId: "uuid REFERENCES coupons(id) ON DELETE CASCADE",
    category: "varchar(100) NOT NULL",
    PRIMARY_KEY: "(couponId, category)",
  },

  // Coupon customer restrictions (many-to-many)
  coupon_customers: {
    couponId: "uuid REFERENCES coupons(id) ON DELETE CASCADE",
    customerId: "uuid REFERENCES customers(id) ON DELETE CASCADE",
    PRIMARY_KEY: "(couponId, customerId)",
  },

  // Settings
  settings: {
    key: "varchar(100) PRIMARY KEY",
    value: "text NOT NULL",
    type: "varchar(50) NOT NULL DEFAULT 'string'", // string, number, boolean, json
    updatedAt: "timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP",
  },
}

