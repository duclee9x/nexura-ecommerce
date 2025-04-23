'use server'

import { userService } from './methods/userService';
import { cartService } from './methods/cartService';
import { productService } from './methods/productService';
import { addressService } from './methods/addressService';

import { AddItemRequest, ClearCartRequest,  CreateSagaOrderRequest, RegisterUserRequest, DeleteAddressRequest,  ExtendedAddress, GetCartRequest, OrderStatus, Product, RemoveItemRequest, SendWelcomeEmailRequest, SendOTPResetPasswordRequest, UpdateItemRequest, ValidateAndReserveRequest, ReleaseReservationRequest, CommitReservationRequest, CreateOrderRequest, GetOrderStatusResponse, CreateOrderResponse, CancelOrderResponse, CreateCategoryRequest, CreateBrandRequest, UpdateUserRequest, LoginUserRequest, VerifyAccountRequest, ForgotPasswordRequest, ResetPasswordRequest, ValidateOTPRequest, GetProvincesByCountryRequest, GetDistrictsByProvinceRequest, GetWardsByDistrictRequest, AddAddressRequest, UpdateAddressRequest, GetAddressesRequest, RemoveBrandRequest, UpdateCategoryRequest, DeleteCategoryRequest, GetProductAttributesRequest, CreateProductAttributeRequest, UpdateProductRequest, DeleteProductRequest, CreateProductRequest, GetProductByIdRequest, GetVariantsForCartRequest, GetProductBySlugRequest, UpdateProductAttributesRequest, DeleteProductAttributesRequest } from '@nexura/grpc_gateway/protos';
import { orderService } from './methods/orderService';
import { orchestratorService } from './methods/orchestratorService';
import { emailService } from './methods/emailService';

export const validateOTPGateway = async (validateOTPRequest: ValidateOTPRequest) => {
    return userService.validateOTP(validateOTPRequest);
};

export const forgotPasswordGateway = async (forgotPasswordRequest: ForgotPasswordRequest) => {
    return userService.forgotPassword(forgotPasswordRequest);
};

export const resetPasswordGateway = async (resetPasswordRequest: ResetPasswordRequest) => {
    return userService.resetPassword(resetPasswordRequest);
};

export const verifyAccountGateway = async (verifyAccountRequest: VerifyAccountRequest) => {
    return userService.verifyAccount(verifyAccountRequest);
};

export const loginUserGateway = async (loginUserRequest: LoginUserRequest) => {
    return userService.loginUser(loginUserRequest);
};

export const registerUserGateway = async (registerUserRequest: RegisterUserRequest) => {
    return userService.registerUser(registerUserRequest);
};

export const getUserGateway = async (id: string) => {
    return userService.getUser(id);
};

export const updateUserGateway = async (updateUserRequest: UpdateUserRequest) => {
    return userService.updateUser(updateUserRequest);
};

export const deleteUserGateway = async (id: string) => {
    return userService.deleteUser(id);
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

export const getProvincesByCountryGateway = async (getProvincesByCountryRequest: GetProvincesByCountryRequest) => {
    return addressService.getProvincesByCountry(getProvincesByCountryRequest);
};

export const getDistrictsByProvinceGateway = async (getDistrictsByProvinceRequest: GetDistrictsByProvinceRequest) => {
    return addressService.getDistrictsByProvince(getDistrictsByProvinceRequest);
};

export const getWardsByDistrictGateway = async (getWardsByDistrictRequest: GetWardsByDistrictRequest) => {
    return addressService.getWardsByDistrict(getWardsByDistrictRequest);
};

export const addAddressGateway = async (addAddressRequest: AddAddressRequest) => {
    return addressService.addAddress(addAddressRequest);
};

export const updateAddressGateway = async (updateAddressRequest: UpdateAddressRequest) => {
    return addressService.updateAddress(updateAddressRequest);
};

export const deleteAddressGateway = async (deleteAddressRequest: DeleteAddressRequest) => {
    return addressService.deleteAddress(deleteAddressRequest);
};

export const getAddressesGateway = async (getAddressesRequest: GetAddressesRequest) => {
    return addressService.getAddresses(getAddressesRequest);
};

export const createBrandGateway = async (createBrandRequest: CreateBrandRequest) => {
    return productService.createBrand(createBrandRequest);
};

export const removeBrandGateway = async (removeBrandRequest: RemoveBrandRequest) => {
    return productService.removeBrand(removeBrandRequest);
};

export const getAllBrandGateway = async () => {
    return productService.getAllBrand();
};

export const createCategoryGateway = async (createCategoryRequest: CreateCategoryRequest) => {
    return productService.createCategory(createCategoryRequest);
};

export const removeCategoryGateway = async (removeCategoryRequest: DeleteCategoryRequest) => {
    return productService.removeCategory(removeCategoryRequest);
};

export const getAllCategoryGateway = async () => {
    return productService.getAllCategory();
};

export const updateCategoryGateway = async (updateCategoryRequest: UpdateCategoryRequest) => {
    return productService.updateCategory(updateCategoryRequest);
};

export const getProductAttributesGateway = async (getProductAttributesRequest: GetProductAttributesRequest) => {
    return productService.getProductAttributes(getProductAttributesRequest);
};

export const updateProductAttributeGateway = async (updateProductAttributeRequest: UpdateProductAttributesRequest) => {
    return productService.updateProductAttribute(updateProductAttributeRequest);
};

export const deleteProductAttributeGateway = async (deleteProductAttributeRequest: DeleteProductAttributesRequest) => {
    return productService.deleteProductAttribute(deleteProductAttributeRequest);
};

export const createProductAttributeGateway = async (createProductAttributeRequest: CreateProductAttributeRequest) => {
    return productService.createProductAttribute(createProductAttributeRequest);
};

export const updateProductGateway = async (updateProductRequest: UpdateProductRequest) => {
    return productService.updateProduct(updateProductRequest);
};

export const deleteProductGateway = async (deleteProductRequest: DeleteProductRequest) => {
    return productService.deleteProduct(deleteProductRequest);
};

export const createProductGateway = async (createProductRequest: CreateProductRequest) => {
    return productService.createProduct(createProductRequest);
};

export const getProductByIdGateway = async (getProductByIdRequest: GetProductByIdRequest) => {
    return productService.getProductById(getProductByIdRequest);
};
export const getProductBySlugGateway = async (getProductBySlugRequest: GetProductBySlugRequest) => {
    return productService.getProductBySlug(getProductBySlugRequest);
};

export const listProductsGateway = async () => {
    return productService.listProducts();
};

export const getWarehousesGateway = async () => {
    return productService.getWarehouses();
};

export const getVariantsForCartGateway = async (getVariantsForCartRequest: GetVariantsForCartRequest) => {
    return productService.getVariantsForCart(getVariantsForCartRequest);
};

export const getCartGateway = async (getCartRequest: GetCartRequest) => {
    return cartService.getCart(getCartRequest);
};

export const addItemGateway = async (addItemRequest: AddItemRequest) => {
    return cartService.addItem(addItemRequest);
};  

export const updateItemGateway = async (updateItemRequest: UpdateItemRequest) => {
    return cartService.updateItem(updateItemRequest);
};

export const removeItemGateway = async (removeItemRequest: RemoveItemRequest) => {
    return cartService.removeItem(removeItemRequest);
};

export const clearCartGateway = async ({userId}: ClearCartRequest) => {
    return cartService.clearCart({userId});
};


export const getOrderStatusGateway = async (orderId: string): Promise<GetOrderStatusResponse> => {
    return orderService.getOrderStatus(orderId);
};

export const getOrderGateway = async (orderId: string) => {
    return orderService.getOrder(orderId);
};

export const cancelOrderGateway = async (orderId: string): Promise<CancelOrderResponse> => {
    return orderService.cancelOrder(orderId);
};

export const updateOrderStatusGateway = async (orderId: string, status: OrderStatus) => {
    return orderService.updateOrderStatus(orderId, status);
};

export const createSagaOrderGateway = async (order: CreateSagaOrderRequest) => {
    return orchestratorService.createSagaOrder(order);
};

export const sendWelcomeEmailGateway = async (request: SendWelcomeEmailRequest) => {
    return emailService.sendWelcomeEmail(request);
};

export const sendOTPResetPasswordGateway = async (request: SendOTPResetPasswordRequest) => {
    return emailService.sendOTPResetPassword(request);
};

export const validateAndReserveGateway = async (request: ValidateAndReserveRequest) => {
    return productService.validateAndReserve(request);
};

export const releaseReservationGateway = async (request: ReleaseReservationRequest) => {
    return productService.releaseReservation(request);
};

export const commitReservationGateway = async (request: CommitReservationRequest) => {
    return productService.commitReservation(request);
};

export const createOrderGateway = async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return orderService.createOrder(request);
};