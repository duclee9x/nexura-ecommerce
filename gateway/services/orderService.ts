import { Order, CreateOrderRequest, OrderServiceClient, OrderStatus } from '@nexura/grpc_gateway/protos';
import { DefaultResponse } from '@/lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const productConfig = createServiceConfig('OrderService', 50055);
const productClient = createClient(OrderServiceClient, productConfig);

export const orderService = {
    createOrder: async (order: CreateOrderRequest): Promise<DefaultResponse & { order: Order }> => {
        return promisifyGrpcCall(productClient, 'createOrder', { order });
    },
    getOrderStatus: async (orderId: string): Promise<DefaultResponse & { order: Order }> => {
        return promisifyGrpcCall(productClient, 'getOrderStatus', { orderId });
    },
    getOrder: async (orderId: string): Promise<DefaultResponse & { order: Order }> => {
        return promisifyGrpcCall(productClient, 'getOrder', { orderId });
    },
    cancelOrder: async (orderId: string): Promise<DefaultResponse & { order: Order }> => {
        return promisifyGrpcCall(productClient, 'cancelOrder', { orderId });
    },
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<DefaultResponse & { order: Order }> => {
        return promisifyGrpcCall(productClient, 'updateOrderStatus', { orderId, status });
    },

}; 