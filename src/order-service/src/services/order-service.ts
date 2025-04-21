import { createOrder } from './orders/create-order'
import { getOrder } from './orders/get-order'
import { updateOrderStatus } from './orders/update-order-status'
import { getOrderStatus } from './orders/get-order-status'
import { cancelOrder } from './orders/cancel-order'
import type { UntypedServiceImplementation } from '@grpc/grpc-js'

export const orderService: UntypedServiceImplementation = {
  createOrder,
  getOrder,
  updateOrderStatus,
  getOrderStatus,
  cancelOrder,
}


