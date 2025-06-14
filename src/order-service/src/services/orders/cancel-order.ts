import { PrismaClient } from "@nexura/order-service/src/db/prisma-client";
import { CancelOrderRequest, CancelOrderResponse, OrderStatus } from '@nexura/grpc_gateway/protos';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient();

// Helper function to convert string to OrderStatus
function toOrderStatus(status: string): OrderStatus {
  return OrderStatus[status as keyof typeof OrderStatus]
}


export async function cancelOrder(call: ServerUnaryCall<CancelOrderRequest, CancelOrderResponse>, callback: sendUnaryData<CancelOrderResponse>) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: call.request.orderId }
    });

    if (!order) {
      callback({
        code:    Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }

    const currentStatus = toOrderStatus(order.status);

    // Check if order can be cancelled
    if (currentStatus === OrderStatus.ORDER_COMPLETED || 
      currentStatus === OrderStatus.ORDER_CANCELLED) {
      callback({
        code:    Status.INVALID_ARGUMENT,
        message: `Order cannot be cancelled in current status: ${order.status}`
      });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: call.request.orderId },
      data:  {
        status: OrderStatus.ORDER_CANCELLED
      },
      include: {
        statusHistory: true
      }
    });

    callback(null, {
      orderId: updatedOrder.id,
      status:  OrderStatus.ORDER_CANCELLED,
      message: 'Order cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling order:', error);
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to cancel order'
    });
  }
} 