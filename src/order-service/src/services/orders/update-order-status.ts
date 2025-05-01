import { PrismaClient, OrderStatus as PrismaOrderStatus } from '../../db/prisma-client';
import { UpdateOrderStatusRequest, UpdateOrderStatusResponse, OrderStatus as ProtoOrderStatus, StepStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { logger } from '@nexura/common/utils';

const prisma = new PrismaClient();

// Map proto OrderStatus to Prisma OrderStatus
const mapOrderStatus = (status: ProtoOrderStatus): PrismaOrderStatus => {
  switch (status) {
    case ProtoOrderStatus.ORDER_PENDING:
      return PrismaOrderStatus.ORDER_PENDING;
    case ProtoOrderStatus.ORDER_PROCESSING:
      return PrismaOrderStatus.ORDER_PROCESSING;
    case ProtoOrderStatus.ORDER_SHIPPED:
      return PrismaOrderStatus.ORDER_SHIPPED;
    case ProtoOrderStatus.ORDER_COMPENSATING:
      return PrismaOrderStatus.ORDER_COMPENSATING;
    case ProtoOrderStatus.ORDER_DELIVERED:
      return PrismaOrderStatus.ORDER_DELIVERED;
    case ProtoOrderStatus.ORDER_CANCELLED:
      return PrismaOrderStatus.ORDER_CANCELLED;
    case ProtoOrderStatus.ORDER_COMPLETED:
      return PrismaOrderStatus.ORDER_COMPLETED;
    case ProtoOrderStatus.ORDER_FAILED:
      return PrismaOrderStatus.ORDER_FAILED;
    case ProtoOrderStatus.ORDER_REFUNDED:
      return PrismaOrderStatus.ORDER_REFUNDED;
    case ProtoOrderStatus.ORDER_EXPIRED:
      return PrismaOrderStatus.ORDER_EXPIRED;
    case ProtoOrderStatus.ORDER_ON_HOLD:
      return PrismaOrderStatus.ORDER_ON_HOLD;
    default:
      return PrismaOrderStatus.ORDER_PENDING;
  }
};

// Map OrderStatus to StepStatus
const mapOrderStatusToStepStatus = (status: PrismaOrderStatus): StepStatus => {
  switch (status) {
    case PrismaOrderStatus.ORDER_PENDING:
      return StepStatus.STEP_PENDING;
    case PrismaOrderStatus.ORDER_PROCESSING:
      return StepStatus.STEP_STARTED;
    case PrismaOrderStatus.ORDER_SHIPPED:
    case PrismaOrderStatus.ORDER_DELIVERED:
    case PrismaOrderStatus.ORDER_COMPLETED:
      return StepStatus.STEP_COMPLETED;
    case PrismaOrderStatus.ORDER_CANCELLED:
    case PrismaOrderStatus.ORDER_FAILED:
    case PrismaOrderStatus.ORDER_EXPIRED:
      return StepStatus.STEP_FAILED;
    case PrismaOrderStatus.ORDER_COMPENSATING:
    case PrismaOrderStatus.ORDER_REFUNDED:
      return StepStatus.STEP_COMPENSATED;
    case PrismaOrderStatus.ORDER_ON_HOLD:
      return StepStatus.STEP_PENDING;
    default:
      return StepStatus.STEP_PENDING;
  }
};
const mapStatusToReadableStatus = (status: PrismaOrderStatus): string => {
  return status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
}


export async function updateOrderStatus(call: ServerUnaryCall<UpdateOrderStatusRequest, UpdateOrderStatusResponse>, callback: sendUnaryData<UpdateOrderStatusResponse>) {
  try {
    const { orderId, status } = call.request;

    // Get current order status
    const currentOrder = await prisma.order.findUnique({
      where: { id: orderId },
      select: { status: true }
    });

    if (!currentOrder) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }

    // Update order status and create history entry
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Update order status
      const order = await tx.order.update({
        where: { id: orderId },
        data: {
          status: mapOrderStatus(status),
          statusHistory: {
            create: {
              status: mapOrderStatus(status),
              description: `Status changed from ${mapStatusToReadableStatus(currentOrder.status)} to ${mapStatusToReadableStatus(mapOrderStatus(status))}`
            }
          }
        },
        include: {
          statusHistory: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      logger.info("Order status updated", { 
        orderId: order.id, 
        oldStatus: currentOrder.status, 
        newStatus: order.status 
      });

      return order;
    });

    callback(null, {
      orderId: updatedOrder.id,
      status: status,
      steps: updatedOrder.statusHistory.map(history => ({
        service: 'order',
        status: mapOrderStatusToStepStatus(history.status),
        error: '',
        timestamp: history.createdAt.toISOString()
      })),
      message: 'Order status updated successfully'
    });
  } catch (error) {
    logger.error('Error updating order status:', error);
    callback({
      code: Status.INTERNAL,
      message: 'Failed to update order status'
    });
  }
} 