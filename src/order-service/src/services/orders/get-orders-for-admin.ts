import { PrismaClient } from '@nexura/order-service/src/db/prisma-client';
import { GetOrdersForAdminResponse, GetOrdersForAdminRequest, OrderStatus as ProtoOrderStatus } from '@nexura/grpc_gateway/protos';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient();


export async function getOrdersForAdmin(call: ServerUnaryCall<GetOrdersForAdminRequest, GetOrdersForAdminResponse>, callback: sendUnaryData<GetOrdersForAdminResponse>) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: { in: call.request.userIds } },
    });

    if (!orders) {
      callback({
        code: Status.NOT_FOUND,
        message: 'Order not found'
      });
      return;
    }
    console.log(orders, "orders");
    const ordersResult = call.request.userIds.map((userId) => ({
      userId: userId,
      totalOrders: orders.filter((order) => order.userId === userId).length,
      totalSpent: orders.filter((order) => order.userId === userId).reduce((acc, order) => acc + order.totalAmount, 0),
      lastOrderDate: orders.filter((order) => order.userId === userId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0]?.createdAt.toISOString() ?? "",
    }));
    callback(null, {
      orders: ordersResult,
    });
    
  } catch (error) {
    console.error('Error getting order:', error);
    callback({
      code: Status.NOT_FOUND,
      message: 'Order not found'
    });
  }
} 