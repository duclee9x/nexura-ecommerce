import { ProductCatalogServiceClient, Product, Brand, Category, ProductAttribute, SearchProductsResponse, ListRecommendationsResponse, GetProductResponse, CreateProductResponse, UpdateProductResponse, DeleteProductResponse, NewBrandResponse, RemoveBrandResponse, GetAllBrandResponse, CreateCategoryResponse, DeleteCategoryResponse, GetAllCategoryResponse, UpdateCategoryResponse, GetProductAttributesResponse, UpdateProductAttributesResponse, DeleteProductAttributesResponse, CreateProductAttributeResponse, ListProductsResponse, GetWarehousesResponse, GetVariantsForCartResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const productConfig = createServiceConfig('ProductCatalogService', 50053);
const productClient = createClient(ProductCatalogServiceClient, productConfig);

export const productService = {
    // searchProducts: async (query: string): Promise<SearchProductsResponse> => {
    //     return promisifyGrpcCall(productClient, 'searchProducts', { query });
    // },

    // listRecommendations: async (userId: string, productIds: string[]): Promise<ListRecommendationsResponse> => {
    //     return promisifyGrpcCall(productClient, 'listRecommendations', { userId, productIds });
    // },

    getProductById: async (id: string): Promise<GetProductResponse> => {
        return promisifyGrpcCall(productClient, 'getProductById', { id });
    },
    getProductBySlug: async (slug: string): Promise<GetProductResponse> => {
        return promisifyGrpcCall(productClient, 'getProductBySlug', { slug });
    },

    createProduct: async (product: Product): Promise<CreateProductResponse> => {
        return promisifyGrpcCall(productClient, 'createProduct', { product });
    },

    updateProduct: async (product: Product): Promise<UpdateProductResponse> => {
        return promisifyGrpcCall(productClient, 'updateProduct', { product });
    },

    deleteProduct: async (productId: string): Promise<DeleteProductResponse> => {
        return promisifyGrpcCall(productClient, 'deleteProduct', { productId });
    },

    newBrand: async (brand: Brand): Promise<NewBrandResponse> => {
        return promisifyGrpcCall(productClient, 'newBrand', { brand });
    },

    removeBrand: async (id: string): Promise<RemoveBrandResponse> => {
        return promisifyGrpcCall(productClient, 'removeBrand', { id });
    },

    getAllBrand: async (): Promise<GetAllBrandResponse> => {
        return promisifyGrpcCall(productClient, 'getAllBrand', {});
    },

    createCategory: async (category: Category): Promise<CreateCategoryResponse> => {
        return promisifyGrpcCall(productClient, 'createCategory', { category });
    },

    removeCategory: async (id: string): Promise<DeleteCategoryResponse> => {
        return promisifyGrpcCall(productClient, 'deleteCategory', { id });
    },

    getAllCategory: async (): Promise<GetAllCategoryResponse> => {
        return promisifyGrpcCall(productClient, 'getAllCategory', {});
    },

    updateCategory: async (category: Category): Promise<UpdateCategoryResponse> => {
        return promisifyGrpcCall(productClient, 'updateCategory', { category });
    },

    getProductAttributes: async (productId: string): Promise<GetProductAttributesResponse> => {
        return promisifyGrpcCall(productClient, 'getProductAttributes', { productId });
    },

    updateProductAttribute: async (attribute: ProductAttribute): Promise<UpdateProductAttributesResponse> => {
        return promisifyGrpcCall(productClient, 'updateProductAttributes', { attribute });
    },

    deleteProductAttribute: async (attributeId: string): Promise<DeleteProductAttributesResponse> => {
        return promisifyGrpcCall(productClient, 'deleteProductAttributes', { attributeId });
    },

    createProductAttribute: async (attribute: ProductAttribute): Promise<CreateProductAttributeResponse> => {
        return promisifyGrpcCall(productClient, 'createProductAttribute', { attribute });
    },

    listProducts: async (): Promise<ListProductsResponse> => {
        return promisifyGrpcCall(productClient, 'listProducts', {});
    },

    getWarehouses: async (): Promise<GetWarehousesResponse> => {
        return promisifyGrpcCall(productClient, 'getWarehouses', {});
    },

    getVariantsForCart: async (variantIds: string[]): Promise<GetVariantsForCartResponse> => {
        return promisifyGrpcCall(productClient, 'getVariantsForCart', { variantIds });
    },
}; 