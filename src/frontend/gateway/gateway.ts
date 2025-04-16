'use server'

import { userService } from './services/userService';
import { cartService } from './services/cartService';
import { productService } from './services/productService';
import { addressService } from './services/addressService';
import { AddItemRequest, ClearCartRequest, GetCartRequest, Product, RemoveItemRequest, UpdateItemRequest } from '@/protos/nexura';

export const validateOTPGateway = async (email: string, otp: string) => {
    return userService.validateOTP(email, otp);
};

export const forgotPasswordGateway = async (email: string) => {
    return userService.forgotPassword(email);
};

export const resetPasswordGateway = async (email: string, newPassword: string) => {
    return userService.resetPassword(email, newPassword);
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


export const searchProductsGateway = async (query: string) => {
    return productService.searchProducts(query);
};

export const listRecommendationsGateway = async (userId: string, productIds: string[]) => {
    return productService.listRecommendations(userId, productIds);
};

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

export const addAddressGateway = async (userId: string, address: any) => {
    return addressService.addAddress(userId, address);
};

export const updateAddressGateway = async (userId: string, address: any) => {
    return addressService.updateAddress(userId, address);
};

export const deleteAddressGateway = async (userId: string, addressId: string) => {
    return addressService.deleteAddress(userId, addressId);
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

export const deleteProductGateway = async (id: string) => {
    return productService.deleteProduct(id);
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

