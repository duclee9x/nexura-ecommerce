import { PrismaClient } from '../../db/prisma-client';
import { GetOrderRequest, GetOrderResponse } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData, ServiceError } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient();

export async function getOrder(call: ServerUnaryCall<GetOrderRequest, GetOrderResponse>, callback: sendUnaryData<GetOrderResponse>) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: call.request.orderId },
      include: {
        items: true,
        shipping: true
      }
    });

    if (!order) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }

    callback(null, {
      order: {
        id: order.id,
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        shippingAddressId: order.shippingAddressId,
        items: order.items.map(item => ({
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId,
          createdAt: item.createdAt.toISOString(),
          updatedAt: item.updatedAt.toISOString()
        })),
        paymentId: order.paymentId || '',
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting order:', error);
    callback({
      code: Status.NOT_FOUND,
      message: 'Order not found'
    });
  }
} 