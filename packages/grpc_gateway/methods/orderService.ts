import { Order, CreateOrderRequest, OrderServiceClient, OrderStatus, CreateOrderResponse, GetOrderStatusResponse, GetOrderResponse, CancelOrderResponse, UpdateOrderStatusResponse, ReleaseReservationRequest, ValidateAndReserveRequest, ValidateAndReserveResponse, ReleaseReservationResponse, CommitReservationRequest, CommitReservationResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const orderConfig = createServiceConfig('OrderService', 50055);
const orderClient = createClient(OrderServiceClient, orderConfig);

export const orderService = {
    createOrder: async (order: CreateOrderRequest): Promise<CreateOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'createOrder', { order });
    },
    getOrderStatus: async (orderId: string): Promise<GetOrderStatusResponse> => {
        return promisifyGrpcCall(orderClient, 'getOrderStatus', { orderId });
    },
    getOrder: async (orderId: string): Promise<GetOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'getOrder', { orderId });
    },
    cancelOrder: async (orderId: string): Promise<CancelOrderResponse> => {
        return promisifyGrpcCall(orderClient, 'cancelOrder', { orderId });
    },
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<UpdateOrderStatusResponse> => {
        return promisifyGrpcCall(orderClient, 'updateOrderStatus', { orderId, status });
    },
}; 