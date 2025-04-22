import { Order, CreateOrderRequest, OrderServiceClient, OrderStatus, CreateOrderResponse, GetOrderStatusResponse, GetOrderResponse, CancelOrderResponse, UpdateOrderStatusResponse, ReleaseReservationRequest, ValidateAndReserveRequest, ValidateAndReserveResponse, ReleaseReservationResponse, CommitReservationRequest, CommitReservationResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const productConfig = createServiceConfig('OrderService', 50055);
const productClient = createClient(OrderServiceClient, productConfig);

export const orderService = {
    createOrder: async (order: CreateOrderRequest): Promise<CreateOrderResponse> => {
        return promisifyGrpcCall(productClient, 'createOrder', { order });
    },
    getOrderStatus: async (orderId: string): Promise<GetOrderStatusResponse> => {
        return promisifyGrpcCall(productClient, 'getOrderStatus', { orderId });
    },
    getOrder: async (orderId: string): Promise<GetOrderResponse> => {
        return promisifyGrpcCall(productClient, 'getOrder', { orderId });
    },
    cancelOrder: async (orderId: string): Promise<CancelOrderResponse> => {
        return promisifyGrpcCall(productClient, 'cancelOrder', { orderId });
    },
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<UpdateOrderStatusResponse> => {
        return promisifyGrpcCall(productClient, 'updateOrderStatus', { orderId, status });
    },
    validateAndReserve: async (request: ValidateAndReserveRequest): Promise<ValidateAndReserveResponse> => {
        return promisifyGrpcCall(productClient, 'validateAndReserve', { request });
    },
    releaseReservation: async (request: ReleaseReservationRequest): Promise<ReleaseReservationResponse> => {
        return promisifyGrpcCall(productClient, 'releaseReservation', { request });
    },
    commitReservation: async (request: CommitReservationRequest): Promise<CommitReservationResponse> => {
        return promisifyGrpcCall(productClient, 'commitReservation', { request });
    },

}; 