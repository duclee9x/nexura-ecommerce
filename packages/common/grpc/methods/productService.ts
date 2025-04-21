import { ProductCatalogServiceClient, Product, Brand, Category, ProductAttribute, Warehouse, Cart, CartItem, VariantCart, DeleteProductRequest } from '../../protos/nexura';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const productConfig = createServiceConfig('ProductCatalogService', 50053);
const productClient = createClient(ProductCatalogServiceClient, productConfig);

export const productService = {
    searchProducts: async (query: string): Promise<DefaultResponse & { products: Product[] }> => {
        return promisifyGrpcCall(productClient, 'searchProducts', { query });
    },

    listRecommendations: async (userId: string, productIds: string[]): Promise<DefaultResponse & { products: Product[] }> => {
        return promisifyGrpcCall(productClient, 'listRecommendations', { userId, productIds });
    },

    getProductById: async (id: string): Promise<DefaultResponse & { product: Product }> => {
        return promisifyGrpcCall(productClient, 'getProductById', { id });
    },
    getProductBySlug: async (slug: string): Promise<DefaultResponse & { product: Product }> => {
        return promisifyGrpcCall(productClient, 'getProductBySlug', { slug });
    },

    createProduct: async (product: Product): Promise<DefaultResponse & { product: Product }> => {
        return promisifyGrpcCall(productClient, 'createProduct', { product });
    },

    updateProduct: async (product: Product): Promise<DefaultResponse & { product: Product }> => {
        return promisifyGrpcCall(productClient, 'updateProduct', { product });
    },

    deleteProduct: async (productId: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(productClient, 'deleteProduct', { productId });
    },

    newBrand: async (brand: Brand): Promise<DefaultResponse & { brand: Brand }> => {
        return promisifyGrpcCall(productClient, 'newBrand', { brand });
    },

    removeBrand: async (id: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(productClient, 'removeBrand', { id });
    },

    getAllBrand: async (): Promise<DefaultResponse & { brands: Brand[] }> => {
        return promisifyGrpcCall(productClient, 'getAllBrand', {});
    },

    createCategory: async (category: Category): Promise<DefaultResponse & { category: Category }> => {
        return promisifyGrpcCall(productClient, 'createCategory', { category });
    },

    removeCategory: async (id: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(productClient, 'removeCategory', { id });
    },

    getAllCategory: async (): Promise<DefaultResponse & { categories: Category[] }> => {
        return promisifyGrpcCall(productClient, 'getAllCategory', {});
    },

    updateCategory: async (category: Category): Promise<DefaultResponse & { category: Category }> => {
        return promisifyGrpcCall(productClient, 'updateCategory', { category });
    },

    getProductAttributes: async (productId: string): Promise<DefaultResponse & { attributes: ProductAttribute[] }> => {
        return promisifyGrpcCall(productClient, 'getProductAttributes', { productId });
    },

    updateProductAttribute: async (attribute: ProductAttribute): Promise<DefaultResponse & { attribute: ProductAttribute }> => {
        return promisifyGrpcCall(productClient, 'updateProductAttribute', { attribute });
    },

    deleteProductAttribute: async (attributeId: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(productClient, 'deleteProductAttribute', { attributeId });
    },

    createProductAttribute: async (attribute: ProductAttribute): Promise<DefaultResponse & { attribute: ProductAttribute }> => {
        return promisifyGrpcCall(productClient, 'createProductAttribute', { attribute });
    },

    listProducts: async (): Promise<DefaultResponse & { products: Product[] }> => {
        return promisifyGrpcCall(productClient, 'listProducts', {});
    },

    getWarehouses: async (): Promise<DefaultResponse & { warehouses: Warehouse[] }> => {
        return promisifyGrpcCall(productClient, 'getWarehouses', {});
    },

    getVariantsForCart: async (variantIds: string[]): Promise<DefaultResponse & { variants: VariantCart[] }> => {
        return promisifyGrpcCall(productClient, 'getVariantsForCart', { variantIds });
    },
}; 