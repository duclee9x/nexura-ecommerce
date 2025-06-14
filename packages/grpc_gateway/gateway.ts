'use server'

import { userService } from './methods/userService';
import { cartService } from './methods/cartService';
import { productService } from './methods/productService';
import { addressService } from './methods/addressService';
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js"
import { AddItemRequest, ClearCartRequest, UpdateTrackingNumberRequest, UpdateTrackingNumberResponse, CreateSagaOrderRequest, RegisterUserRequest, DeleteAddressRequest,  GetProvincesResponse, GetCartRequest, OrderStatus, Product, RemoveItemRequest, SendWelcomeEmailRequest, SendOTPResetPasswordRequest, UpdateItemRequest, ValidateAndReserveRequest, ReleaseReservationRequest, CommitReservationRequest, CreateOrderRequest, GetOrderStatusResponse, CreateOrderResponse, CancelOrderResponse, CreateCategoryRequest, CreateBrandRequest, UpdateUserRequest, LoginUserRequest, VerifyAccountRequest, ForgotPasswordRequest, ResetPasswordRequest, ValidateOTPRequest, GetProvincesByCountryRequest, GetDistrictsByProvinceRequest, GetWardsByDistrictRequest, AddAddressRequest, UpdateAddressRequest, GetAddressesRequest, RemoveBrandRequest, UpdateCategoryRequest, DeleteCategoryRequest, GetProductAttributesRequest, CreateProductAttributeRequest, UpdateProductRequest, DeleteProductRequest, CreateProductRequest, GetVariantsForCartRequest, UpdateProductAttributesRequest, DeleteProductAttributesRequest, ListOrdersResponse, ListOrdersRequest, GetOrderResponse, InitiatePaymentRequest, InitiatePaymentResponse, GetPaymentRequest, GetPaymentResponse, GetAddressRequest, AddOrderNoteRequest, DeleteOrderNoteResponse, DeleteOrderNoteRequest, AddOrderNoteResponse, ListAllOrdersResponse, GetOrdersForAdminResponse, RegisterUserForAdminRequest, SendNewUserByAdminRequest, SendNewUserByAdminResponse, ChangeProductStatusRequest, DeleteUserRequest, AddWishlistResponse, AddWishlistRequest, RemoveWishlistResponse, RemoveWishlistRequest, GetWishlistResponse, GetWishlistRequest, GetProductRequest, GetBatchPaymentsResponse, GetBatchPaymentsRequest, GetBatchAddressesRequest, GetBatchUsersResponse, GetAllUsersResponse, UpdateUserResponse, DeleteUserResponse, RegisterUserForAdminResponse, RegisterUserResponse, LoginUserResponse, VerifyAccountResponse, ResetPasswordResponse, ForgotPasswordResponse, GetDistrictsResponse, GetWardsResponse, AddressResponse, DeleteAddressResponse, GetAddressesResponse, GetBatchAddressesResponse, GetAddressResponse, CreateBrandResponse, RemoveBrandResponse, GetAllBrandResponse, CreateCategoryResponse, DeleteCategoryResponse, ChangeProductStatusResponse, GetAllCategoryResponse, UpdateCategoryResponse, GetProductAttributesResponse, UpdateProductAttributesResponse, DeleteProductAttributesResponse, CreateProductAttributeResponse, UpdateProductResponse, DeleteProductResponse, CreateProductResponse, GetProductResponse, ListProductsResponse, GetWarehousesResponse, GetVariantsForCartResponse, GetCartResponse, AddItemResponse, UpdateItemResponse, RemoveItemResponse, ClearCartResponse, UpdateOrderStatusResponse, CreateSagaOrderResponse, SendWelcomeEmailResponse, SendOTPResetPasswordResponse, ValidateAndReserveResponse, ReleaseReservationResponse, CommitReservationResponse, GetUserResponse, UpdateOrderStatusRequest, CancelOrderRequest, GetOrdersForAdminRequest, GetOrderRequest, GetOrderStatusRequest, GetBatchUsersRequest, GetUserRequest, UpdateOrderPaymentResponse, UpdateOrderPaymentRequest } from './utils/generated/nexura';
import { orderService } from './methods/orderService';
import { orchestratorService } from './methods/orchestratorService';
import { emailService } from './methods/emailService';
import { paymentService } from './methods/paymentService';
export const validateOTPGateway = async (validateOTPRequest: ValidateOTPRequest) => {
  return userService.validateOTP(validateOTPRequest);
};

export type AsyncUnaryHandler<Request, Response> = (
  call: ServerUnaryCall<Request, Response>,
  callback: sendUnaryData<Response>
) => Promise<void>;

export async function asyncHandler<Request, Response>(fn: AsyncUnaryHandler<Request, Response>) {
  return (call: ServerUnaryCall<Request, Response>, callback: sendUnaryData<Response>) => {
    fn(call, callback).catch(callback);
  };
}


export const forgotPasswordGateway = async (forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  return userService.forgotPassword(forgotPasswordRequest);
};

export const resetPasswordGateway = async (resetPasswordRequest: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  return userService.resetPassword(resetPasswordRequest);
};

export const verifyAccountGateway = async (verifyAccountRequest: VerifyAccountRequest): Promise<VerifyAccountResponse> => {
  return userService.verifyAccount(verifyAccountRequest);
};

export const loginUserGateway = async (loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> => {
  return userService.loginUser(loginUserRequest);
};

export const registerUserGateway = async (registerUserRequest: RegisterUserRequest): Promise<RegisterUserResponse> => {
  return userService.registerUser(registerUserRequest);
};

export const registerUserForAdminGateway = async (registerUserForAdminRequest: RegisterUserForAdminRequest): Promise<RegisterUserForAdminResponse> => {
  return userService.registerUserForAdmin(registerUserForAdminRequest);
};

export const getUserGateway = async (request: GetUserRequest): Promise<GetUserResponse> => {
  return userService.getUser(request);
};

export const getBatchUsersGateway = async (request: GetBatchUsersRequest): Promise<GetBatchUsersResponse> => {
  return userService.getBatchUsers(request);
};

export const getAllUsersGateway = async (): Promise<GetAllUsersResponse> => {
  return userService.getAllUsers();
};

export const updateUserGateway = async (updateUserRequest: UpdateUserRequest): Promise<UpdateUserResponse> => {
  return userService.updateUser(updateUserRequest);
};

export const deleteUserGateway = async (deleteUserRequest: DeleteUserRequest): Promise<DeleteUserResponse> => {
  return userService.deleteUser(deleteUserRequest);
};

// export const searchProductsGateway = async (query: string) => {
//     return productService.searchProducts(query);
// };

// export const listRecommendationsGateway = async (userId: string, productIds: string[]) => {
//     return productService.listRecommendations(userId, productIds);
// };

export const getCountriesGateway = async () => {
  return addressService.getCountries();
};

export const getProvincesByCountryGateway = async (getProvincesByCountryRequest: GetProvincesByCountryRequest): Promise<GetProvincesResponse> => {
  return addressService.getProvincesByCountry(getProvincesByCountryRequest);
};

export const getDistrictsByProvinceGateway = async (getDistrictsByProvinceRequest: GetDistrictsByProvinceRequest): Promise<GetDistrictsResponse> => {
  return addressService.getDistrictsByProvince(getDistrictsByProvinceRequest);
};

export const getWardsByDistrictGateway = async (getWardsByDistrictRequest: GetWardsByDistrictRequest): Promise<GetWardsResponse> => {
  return addressService.getWardsByDistrict(getWardsByDistrictRequest);
};

export const addAddressGateway = async (addAddressRequest: AddAddressRequest): Promise<AddressResponse> => {
  return addressService.addAddress(addAddressRequest);
};

export const updateAddressGateway = async (updateAddressRequest: UpdateAddressRequest): Promise<AddressResponse> => {
  return addressService.updateAddress(updateAddressRequest);
};

export const deleteAddressGateway = async (deleteAddressRequest: DeleteAddressRequest): Promise<DeleteAddressResponse> => {
  return addressService.deleteAddress(deleteAddressRequest);
};

export const getAddressesGateway = async (getAddressesRequest: GetAddressesRequest): Promise<GetAddressesResponse> => {
  return addressService.getAddresses(getAddressesRequest);
};

export const getBatchAddressesGateway = async (getBatchAddressesRequest: GetBatchAddressesRequest): Promise<GetBatchAddressesResponse> => {
  return addressService.getBatchAddresses(getBatchAddressesRequest);
};

export const getAddressGateway = async (getAddressRequest: GetAddressRequest): Promise<GetAddressResponse> => {
  return addressService.getAddress(getAddressRequest);
};

export const createBrandGateway = async (createBrandRequest: CreateBrandRequest): Promise<CreateBrandResponse> => {
  return productService.createBrand(createBrandRequest);
};

export const removeBrandGateway = async (removeBrandRequest: RemoveBrandRequest): Promise<RemoveBrandResponse> => {
  return productService.removeBrand(removeBrandRequest);
};

export const getAllBrandGateway = async (): Promise<GetAllBrandResponse> => {
  return productService.getAllBrand();
};

export const createCategoryGateway = async (createCategoryRequest: CreateCategoryRequest): Promise<CreateCategoryResponse> => {
  return productService.createCategory(createCategoryRequest);
};

export const removeCategoryGateway = async (removeCategoryRequest: DeleteCategoryRequest): Promise<DeleteCategoryResponse> => {
  return productService.removeCategory(removeCategoryRequest);
};
export const changeProductStatusGateway = async (changeProductStatusRequest: ChangeProductStatusRequest): Promise<ChangeProductStatusResponse> => {
  return productService.changeProductStatus(changeProductStatusRequest);
};

export const getAllCategoryGateway = async (): Promise<GetAllCategoryResponse> => {
  return productService.getAllCategory();
};

export const updateCategoryGateway = async (updateCategoryRequest: UpdateCategoryRequest): Promise<UpdateCategoryResponse> => {
  return productService.updateCategory(updateCategoryRequest);
};

export const getProductAttributesGateway = async (getProductAttributesRequest: GetProductAttributesRequest): Promise<GetProductAttributesResponse> => {
  return productService.getProductAttributes(getProductAttributesRequest);
};

export const updateProductAttributeGateway = async (updateProductAttributeRequest: UpdateProductAttributesRequest): Promise<UpdateProductAttributesResponse> => {
  return productService.updateProductAttribute(updateProductAttributeRequest);
};

export const deleteProductAttributeGateway = async (deleteProductAttributeRequest: DeleteProductAttributesRequest): Promise<DeleteProductAttributesResponse> => {
  return productService.deleteProductAttribute(deleteProductAttributeRequest);
};

export const createProductAttributeGateway = async (createProductAttributeRequest: CreateProductAttributeRequest): Promise<CreateProductAttributeResponse> => {
  return productService.createProductAttribute(createProductAttributeRequest);
};

export const updateProductGateway = async (updateProductRequest: UpdateProductRequest): Promise<UpdateProductResponse> => {
  return productService.updateProduct(updateProductRequest);
};

export const deleteProductGateway = async (deleteProductRequest: DeleteProductRequest): Promise<DeleteProductResponse> => {
  return productService.deleteProduct(deleteProductRequest);
};

export const createProductGateway = async (createProductRequest: CreateProductRequest): Promise<CreateProductResponse> => {
  return productService.createProduct(createProductRequest);
};

export const getProductGateway = async (getProductRequest: GetProductRequest): Promise<GetProductResponse> => {
  return productService.getProduct(getProductRequest);
};

export const listProductsGateway = async (): Promise<ListProductsResponse> => {
  return productService.listProducts();
};

export const getWarehousesGateway = async (): Promise<GetWarehousesResponse> => {
  return productService.getWarehouses();
};

export const getVariantsForCartGateway = async (getVariantsForCartRequest: GetVariantsForCartRequest): Promise<GetVariantsForCartResponse> => {
  return productService.getVariantsForCart(getVariantsForCartRequest);
};

export const getCartGateway = async (getCartRequest: GetCartRequest): Promise<GetCartResponse> => {
  return cartService.getCart(getCartRequest);
};

export const addItemGateway = async (addItemRequest: AddItemRequest): Promise<AddItemResponse> => {
  return cartService.addItem(addItemRequest);
};  

export const updateItemGateway = async (updateItemRequest: UpdateItemRequest): Promise<UpdateItemResponse> => {
  return cartService.updateItem(updateItemRequest);
};

export const removeItemGateway = async (removeItemRequest: RemoveItemRequest): Promise<RemoveItemResponse> => {
  return cartService.removeItem(removeItemRequest);
};

export const clearCartGateway = async ({userId}: ClearCartRequest): Promise<ClearCartResponse> => {
  return cartService.clearCart({userId});
};


export const getOrderStatusGateway = async (request: GetOrderStatusRequest): Promise<GetOrderStatusResponse> => {
  return orderService.getOrderStatus(request);
};

export const getOrderGateway = async (request: GetOrderRequest): Promise<GetOrderResponse> => {
  return orderService.getOrder(request);
};

export const getOrdersForAdminGateway = async (request: GetOrdersForAdminRequest): Promise<GetOrdersForAdminResponse> => {
  return orderService.getOrdersForAdmin(request);
};

export const cancelOrderGateway = async (request: CancelOrderRequest): Promise<CancelOrderResponse> => {
  return orderService.cancelOrder(request);
};

export const updateOrderStatusGateway = async (request: UpdateOrderStatusRequest): Promise<UpdateOrderStatusResponse> => {
  return orderService.updateOrderStatus(request);
};

export const createSagaOrderGateway = async (order: CreateSagaOrderRequest): Promise<CreateSagaOrderResponse> => {
  return orchestratorService.createSagaOrder(order);
};

export const sendWelcomeEmailGateway = async (request: SendWelcomeEmailRequest): Promise<SendWelcomeEmailResponse> => {
  return emailService.sendWelcomeEmail(request);
};

export const sendOTPResetPasswordGateway = async (request: SendOTPResetPasswordRequest): Promise<SendOTPResetPasswordResponse> => {
  return emailService.sendOTPResetPassword(request);
};

export const validateAndReserveGateway = async (request: ValidateAndReserveRequest): Promise<ValidateAndReserveResponse> => {
  return productService.validateAndReserve(request);
};

export const releaseReservationGateway = async (request: ReleaseReservationRequest): Promise<ReleaseReservationResponse> => {
  return productService.releaseReservation(request);
};

export const commitReservationGateway = async (request: CommitReservationRequest): Promise<CommitReservationResponse> => {
  return productService.commitReservation(request);
};

export const createOrderGateway = async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
  return orderService.createOrder(request);
};

export const createOrderWorkflowGateway = async (request: CreateOrderRequest): Promise<{ instanceID: string }> => {
  return orderService.createOrderWorkflow(request);
};

export const getOrderWorkflowGateway = async (instanceID: string) => {
  return orderService.getOrderWorkflow(instanceID);
};

export const updateOrderPaymentGateway = async (request: UpdateOrderPaymentRequest): Promise<UpdateOrderPaymentResponse> => {
  return orderService.updateOrderPayment(request);
};


export const listOrdersGateway = async (request: ListOrdersRequest): Promise<ListOrdersResponse> => {
  return orderService.listOrders(request);
};

export const listAllOrdersGateway = async (): Promise<ListAllOrdersResponse> => {
  return orderService.listAllOrders();
};

export const initiatePaymentGateway = async (request: InitiatePaymentRequest): Promise<InitiatePaymentResponse> => {
  return paymentService.initiatePayment(request);
};

export const getPaymentGateway = async (request: GetPaymentRequest): Promise<GetPaymentResponse> => {
  return paymentService.getPayment(request);
};

export const getBatchPaymentsGateway = async (request: GetBatchPaymentsRequest): Promise<GetBatchPaymentsResponse> => {
  return paymentService.getBatchPayments(request);
};

export const addOrderNoteGateway = async (request: AddOrderNoteRequest): Promise<AddOrderNoteResponse> => {
  return orderService.addOrderNote(request);
};

export const deleteOrderNoteGateway = async (request: DeleteOrderNoteRequest): Promise<DeleteOrderNoteResponse> => {
  return orderService.deleteOrderNote(request);
};

export const updateTrackingNumberGateway = async (request: UpdateTrackingNumberRequest): Promise<UpdateTrackingNumberResponse> => {
  return orderService.updateTrackingNumber(request);
};

export const addWishlistGateway = async (request: AddWishlistRequest): Promise<AddWishlistResponse> => {
  return productService.addWishlist(request);
};

export const removeWishlistGateway = async (request: RemoveWishlistRequest): Promise<RemoveWishlistResponse> => {
  return productService.removeWishlist(request);
};

export const getWishlistGateway = async (request: GetWishlistRequest): Promise<GetWishlistResponse> => {
  return productService.getWishlist(request);
};

export const sendNewUserByAdminGateway = async (request: SendNewUserByAdminRequest): Promise<SendNewUserByAdminResponse> => {
  return emailService.sendNewUserByAdmin(request);
};
