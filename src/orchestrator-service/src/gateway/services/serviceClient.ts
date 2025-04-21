import { CartServiceClient, ValidateAndReserveRequest, OrderServiceClient, PaymentServiceClient, ProductCatalogServiceClient, UserServiceClient, CreateOrderRequest, InitiatePaymentRequest, ReleaseReservationRequest, CommitReservationRequest, GetOrderStatusRequest, CancelOrderRequest, GetCartRequest } from '@nexura/common/protos';
import { createClient, createServiceConfig, promisifyGrpcCall } from './baseAdapter';

export const cartServiceConfig = createServiceConfig('cart', 50054); 
export const cartClient = createClient(CartServiceClient, cartServiceConfig);

export const orderServiceConfig = createServiceConfig('order', 50055);
export const orderClient = createClient(OrderServiceClient, orderServiceConfig);

export const paymentServiceConfig = createServiceConfig('payment', 50056);
export const paymentClient = createClient(PaymentServiceClient, paymentServiceConfig);

export const userServiceConfig = createServiceConfig('user', 50051);
export const userClient = createClient(UserServiceClient, userServiceConfig);

export const productServiceConfig = createServiceConfig('product', 50053);
export const productClient = createClient(ProductCatalogServiceClient, productServiceConfig);

export const cartService = {
    getCart: async (getCartRequest: GetCartRequest) => {
        return promisifyGrpcCall(cartClient, 'getCart', { getCartRequest });
    }
}

export const productService = {
    getVariantsForCart: async (variantIds: string[]) => {
        return promisifyGrpcCall(productClient, 'getVariantsForCart', { variantIds });
    },

    validateAndReserve: async (validateAndReserveRequest: ValidateAndReserveRequest) => {
        return promisifyGrpcCall(productClient, 'validateAndReserve', { validateAndReserveRequest });
    },

    releaseReservation: async (releaseReservationRequest: ReleaseReservationRequest) => {
        return promisifyGrpcCall(productClient, 'releaseReservation', { releaseReservationRequest });
    },

    commitReservation: async (commitReservationRequest: CommitReservationRequest) => {
        return promisifyGrpcCall(productClient, 'commitReservation', { commitReservationRequest });
    }
}

export const orderService = {
    createOrder: async (createOrderRequest: CreateOrderRequest) => {
        return promisifyGrpcCall(orderClient, 'createOrder', { createOrderRequest });
    },

    getOrderStatus: async (getOrderStatusRequest: GetOrderStatusRequest) => {
        return promisifyGrpcCall(orderClient, 'getOrderStatus', { getOrderStatusRequest });
    },

    cancelOrder: async (cancelOrderRequest: CancelOrderRequest) => {
        return promisifyGrpcCall(orderClient, 'cancelOrder', { cancelOrderRequest });
    }
}

export const paymentService = {
    initiatePayment: async (initiatePaymentRequest: InitiatePaymentRequest) => {
        return promisifyGrpcCall(paymentClient, 'initiatePayment', { initiatePaymentRequest });
    }
}
