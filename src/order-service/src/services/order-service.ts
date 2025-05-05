import { createOrder } from './orders/create-order'
import { getOrder } from './orders/get-order'
import { updateOrderStatus } from './orders/update-order-status'
import { getOrderStatus } from './orders/get-order-status'
import { cancelOrder } from './orders/cancel-order'
import { listOrders } from './orders/list-orders'
import { addOrderNote } from './orders/add-note-order'
import { deleteOrderNote } from './orders/delete-note-order'
import { updateTrackingNumber } from './orders/update-tracking-number'
import { listAllOrders } from './orders/list-all-orders'
import { getOrdersForAdmin } from './orders/get-orders-for-admin'
import type { UntypedServiceImplementation } from '@grpc/grpc-js'

export const orderService: UntypedServiceImplementation = {
  createOrder,
  getOrder,
  getOrdersForAdmin,
  updateOrderStatus,
  getOrderStatus,
  cancelOrder,
  listOrders,
  addOrderNote,
  deleteOrderNote,
  updateTrackingNumber,
  listAllOrders
}


