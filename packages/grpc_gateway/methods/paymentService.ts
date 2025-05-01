import { ProductCatalogServiceClient, Product, GetProductResponse, CreateProductResponse, UpdateProductResponse, DeleteProductResponse, NewBrandResponse, RemoveBrandResponse, GetAllBrandResponse, CreateCategoryResponse, DeleteCategoryResponse, GetAllCategoryResponse, UpdateCategoryResponse, GetProductAttributesResponse, UpdateProductAttributesResponse, DeleteProductAttributesResponse, CreateProductAttributeResponse, ListProductsResponse, GetWarehousesResponse, GetVariantsForCartResponse, ValidateAndReserveResponse, ReleaseReservationRequest, ReleaseReservationResponse, ValidateAndReserveRequest, CommitReservationRequest, CommitReservationResponse, CreateCategoryRequest, CreateBrandRequest, CreateBrandResponse, RemoveBrandRequest, DeleteCategoryRequest, UpdateCategoryRequest, GetProductAttributesRequest, CreateProductAttributeRequest, UpdateProductAttributesRequest, UpdateProductRequest, CreateProductRequest, GetProductBySlugRequest, GetProductByIdRequest, DeleteProductRequest, GetVariantsForCartRequest, DeleteProductAttributesRequest, PaymentServiceClient, InitiatePaymentRequest, InitiatePaymentResponse, GetPaymentRequest, GetPaymentResponse, GetBatchPaymentsRequest, GetBatchPaymentsResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const paymentConfig = createServiceConfig('PaymentService', 50057);
const paymentClient = createClient(PaymentServiceClient, paymentConfig);

export const paymentService = {
    initiatePayment: async (request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> => {
        return promisifyGrpcCall(paymentClient, 'initiatePayment', request);
    },
    getPayment: async (request: GetPaymentRequest): Promise<GetPaymentResponse> => {
        return promisifyGrpcCall(paymentClient, 'getPayment', request);
    },
    getBatchPayments: async (request: GetBatchPaymentsRequest): Promise<GetBatchPaymentsResponse> => {
        return promisifyGrpcCall(paymentClient, 'getBatchPayments', request);
    }


}; 