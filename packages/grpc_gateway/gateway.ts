'use server'

import { userService } from './methods/userService';
import { cartService } from './methods/cartService';
import { productService } from './methods/productService';
import { addressService } from './methods/addressService';

import { AddItemRequest, ClearCartRequest, CreateSagaOrderRequest, DeleteAddressRequest,  ExtendedAddress, GetCartRequest, OrderStatus, Product, RemoveItemRequest, SendWelcomeEmailRequest, SendOTPResetPasswordRequest, UpdateItemRequest, ValidateAndReserveRequest, ReleaseReservationRequest, CommitReservationRequest, CreateOrderRequest, GetOrderStatusResponse, CreateOrderResponse } from '@nexura/grpc_gateway/protos';
import { orderService } from './methods/orderService';
import { orchestratorService } from './methods/orchestratorService';
import { emailService } from './methods/emailService';

export const validateOTPGateway = async (email: string, otp: string) => {
    return userService.validateOTP(email, otp);
};

export const forgotPasswordGateway = async (email: string) => {
    return userService.forgotPassword(email);
};

export const resetPasswordGateway = async (email: string, newPassword: string, token: string) => {
    return userService.resetPassword(email, newPassword, token);
};

export const verifyAccountGateway = async (token: string) => {
    return userService.verifyAccount(token);
};

export const loginUserGateway = async (email: string, password: string) => {
    return userService.loginUser(email, password);
};

export const registerUserGateway = async (firstName: string, lastName: string, email: string, password: string) => {
    return userService.registerUser(firstName, lastName, email, password);
};

export const getUserGateway = async (id: string) => {
    return userService.getUser(id);
};

export const updateUserGateway = async (id: string, user: any, currentPassword: string, newPassword: string) => {
    return userService.updateUser(id, user, currentPassword, newPassword);
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

export const getProvincesByCountryGateway = async (countryId: string) => {
    return addressService.getProvincesByCountry(countryId);
};

export const getDistrictsByProvinceGateway = async (provinceId: string) => {
    return addressService.getDistrictsByProvince(provinceId);
};

export const getWardsByDistrictGateway = async (districtId: string) => {
    return addressService.getWardsByDistrict(districtId);
};

export const addAddressGateway = async (address: ExtendedAddress, userId: string) => {
    return addressService.addAddress(address, userId);
};

export const updateAddressGateway = async (address: ExtendedAddress, userId: string) => {
    return addressService.updateAddress(address, userId);
};

export const deleteAddressGateway = async (deleteAddressRequest: DeleteAddressRequest) => {
    return addressService.deleteAddress(deleteAddressRequest);
};

export const getAddressesGateway = async (userId: string) => {
    return addressService.getAddresses(userId);
};

export const newBrandGateway = async (brand: any) => {
    return productService.newBrand(brand);
};

export const removeBrandGateway = async (id: string) => {
    return productService.removeBrand(id);
};

export const getAllBrandGateway = async () => {
    return productService.getAllBrand();
};

export const createCategoryGateway = async (category: any) => {
    return productService.createCategory(category);
};

export const removeCategoryGateway = async (id: string) => {
    return productService.removeCategory(id);
};

export const getAllCategoryGateway = async () => {
    return productService.getAllCategory();
};

export const updateCategoryGateway = async (category: any) => {
    return productService.updateCategory(category);
};

export const getProductAttributesGateway = async (productId: string) => {
    return productService.getProductAttributes(productId);
};

export const updateProductAttributeGateway = async (attribute: any) => {
    return productService.updateProductAttribute(attribute);
};

export const deleteProductAttributeGateway = async (attributeId: string) => {
    return productService.deleteProductAttribute(attributeId);
};

export const createProductAttributeGateway = async (attribute: any) => {
    return productService.createProductAttribute(attribute);
};

export const updateProductGateway = async (product: Product) => {
    console.log(product, "productgateway")
    return productService.updateProduct(product);
};

export const deleteProductGateway = async (productId: string) => {
    return productService.deleteProduct(productId);
};

export const createProductGateway = async (product: any) => {
    return productService.createProduct(product);
};

export const getProductByIdGateway = async (id: string) => {
    return productService.getProductById(id);
};
export const getProductBySlugGateway = async (slug: string) => {
    return productService.getProductBySlug(slug);
};

export const listProductsGateway = async () => {
    return productService.listProducts();
};

export const getWarehousesGateway = async () => {
    return productService.getWarehouses();
};

export const getVariantsForCartGateway = async (variantIds: string[]) => {
    return productService.getVariantsForCart(variantIds);
};

export const getCartGateway = async ({userId}: GetCartRequest) => {
    return cartService.getCart({userId});
};

export const addItemGateway = async ({userId, productId, variantId, quantity, image, currencyCode}: AddItemRequest) => {
    return cartService.addItem({userId, productId, variantId, quantity, image, currencyCode});
};  

export const updateItemGateway = async ({userId, productId, variantId, quantity, image}: UpdateItemRequest) => {
    return cartService.updateItem({userId, productId, variantId, quantity, image});
};

export const removeItemGateway = async ({userId, productId, variantId}: RemoveItemRequest) => {
    return cartService.removeItem({userId, productId, variantId});
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

export const cancelOrderGateway = async (orderId: string) => {
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
    return orderService.validateAndReserve(request);
};

export const releaseReservationGateway = async (request: ReleaseReservationRequest) => {
    return orderService.releaseReservation(request);
};

export const commitReservationGateway = async (request: CommitReservationRequest) => {
    return orderService.commitReservation(request);
};

export const createOrderGateway = async (request: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return orderService.createOrder(request);
};