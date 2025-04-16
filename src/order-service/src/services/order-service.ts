import { createOrder } from './orders/create-order'
import { getOrder } from './orders/get-order'
import { updateOrderStatus } from './orders/update-order-status'
import { getOrderStatus } from './orders/get-order-status'
import { cancelOrder } from './orders/cancel-order'


export const orderService = {
  createOrder,
  getOrder,
  updateOrderStatus,
  getOrderStatus,
  cancelOrder,
}


