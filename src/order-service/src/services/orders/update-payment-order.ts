import { PrismaClient } from "@nexura/order-service/src/db/prisma-client";
import { UpdateOrderPaymentResponse, UpdateOrderPaymentRequest } from '@nexura/grpc_gateway/protos';
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient();



export async function updateOrderPayment(call: ServerUnaryCall<UpdateOrderPaymentRequest, UpdateOrderPaymentResponse>, callback: sendUnaryData<UpdateOrderPaymentResponse>) {
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

    
    await prisma.order.update({
      where: { id: call.request.orderId },
      data:  {
        paymentId: call.request.paymentId,
      },
    });

    callback(null, {
      success: true
    });
  } catch (error) {
    console.error('Error updating order payment:', error);
    callback({
      code:    Status.INTERNAL,
      message: 'Failed to update order payment'
    });
  }
} 