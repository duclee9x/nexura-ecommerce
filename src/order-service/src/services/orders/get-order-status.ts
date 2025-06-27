import { PrismaClient } from '../../db/prisma-client';
import { GetOrderStatusRequest, GetOrderStatusResponse, OrderStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient();

export async function getOrderStatus(call: ServerUnaryCall<GetOrderStatusRequest, GetOrderStatusResponse>, callback: sendUnaryData<GetOrderStatusResponse>) {
  try {
    const order = await prisma.order.findUnique({
      where:  { id: call.request.orderId },
      select: { status: true }
    });

    if (!order) {
      callback({
        code:    Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }

    callback(null, {
      status: order.status as unknown as OrderStatus
    });
  } catch (error) {
    console.error('Error getting order status:', error);
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to get order status'
    });
  }
} 