import { PrismaClient } from '../../db/prisma-client';
import { UpdateOrderStatusRequest, UpdateOrderStatusResponse, OrderStatus, StepStatus } from '@nexura/common/protos';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
const prisma = new PrismaClient();

// Helper function to convert string to OrderStatus
function toOrderStatus(status: string): OrderStatus {
  return OrderStatus[status as keyof typeof OrderStatus] || OrderStatus.ORDER_FAILED;
}

// Helper function to convert OrderStatus to string
function fromOrderStatus(status: OrderStatus): string {
  return OrderStatus[status];
}

export async function updateOrderStatus(call: ServerUnaryCall<UpdateOrderStatusRequest, UpdateOrderStatusResponse>, callback: sendUnaryData<UpdateOrderStatusResponse>) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: call.request.orderId }
    });

    if (!order) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }

    const currentStatus = toOrderStatus(order.status);

    // Validate status transition
    if (!isValidStatusTransition(currentStatus, call.request.status)) {
      callback({
        code: Status.INVALID_ARGUMENT,
        message: `Invalid status transition from ${order.status} to ${OrderStatus[call.request.status]}`
      });
      return;
    }

    const updatedOrder = await prisma.order.update({
      where: { id: call.request.orderId },
      data: {
        status: fromOrderStatus(call.request.status)
      }
    });

    // Create order step for status update
    const step = {
      service: 'order-service',
      status: StepStatus.STEP_COMPLETED,
      error: '',
      timestamp: new Date().toISOString()
    };

    callback(null, {
      orderId: updatedOrder.id,
      status: call.request.status,
      steps: [step],
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    callback({
      code: Status.INTERNAL,
      message: 'Failed to update order status'
    });
  }
}

function isValidStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
  // Handle unrecognized status
  if (currentStatus === OrderStatus.UNRECOGNIZED || newStatus === OrderStatus.UNRECOGNIZED) {
    return false;
  }

  const validTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
    [OrderStatus.ORDER_PENDING]: [OrderStatus.ORDER_PROCESSING, OrderStatus.ORDER_CANCELLED],
    [OrderStatus.ORDER_PROCESSING]: [OrderStatus.ORDER_COMPLETED, OrderStatus.ORDER_FAILED, OrderStatus.ORDER_CANCELLED],
    [OrderStatus.ORDER_COMPLETED]: [],
    [OrderStatus.ORDER_FAILED]: [OrderStatus.ORDER_PROCESSING, OrderStatus.ORDER_CANCELLED],
    [OrderStatus.ORDER_CANCELLED]: [],
    [OrderStatus.ORDER_COMPENSATING]: [OrderStatus.ORDER_CANCELLED]
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
} 