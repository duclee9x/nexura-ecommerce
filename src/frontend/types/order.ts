export enum OrderStatus {
  ORDER_PENDING = 0,
  ORDER_PROCESSING = 1,
  ORDER_SHIPPED = 2,
  ORDER_COMPENSATING = 3,
  ORDER_DELIVERED = 4,
  ORDER_CANCELLED = 5,
  ORDER_COMPLETED = 6,
}

export interface OrderItem {
  variantId: string
  productId: string
  productName: string
  productSlug: string
  variantName: string
  quantity: number
  price: number
  image?: string
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  totalAmount: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
} 