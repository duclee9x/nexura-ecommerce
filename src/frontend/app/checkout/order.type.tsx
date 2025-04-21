import { ExtendedAddress, OrderItem, Coupon, PaymentStatus, CreateOrderRequest } from "@/protos/nexura"

export type ExtendedAddressType = ExtendedAddress
export type OrderItemType = OrderItem
export type CouponType = Coupon
export enum ShippingMethodType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}
export enum PaymentStatusType {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
export type CreateOrderRequestType = CreateOrderRequest
