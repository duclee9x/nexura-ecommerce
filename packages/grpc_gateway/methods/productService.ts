import { ProductServiceClient, Product, GetProductResponse, CreateProductResponse, UpdateProductResponse, DeleteProductResponse, NewBrandResponse, RemoveBrandResponse, GetAllBrandResponse, CreateCategoryResponse, DeleteCategoryResponse, GetAllCategoryResponse, UpdateCategoryResponse, GetProductAttributesResponse, UpdateProductAttributesResponse, DeleteProductAttributesResponse, CreateProductAttributeResponse, ListProductsResponse, GetWarehousesResponse, GetVariantsForCartResponse, ValidateAndReserveResponse, ReleaseReservationRequest, ReleaseReservationResponse, ValidateAndReserveRequest, CommitReservationRequest, CommitReservationResponse, CreateCategoryRequest, CreateBrandRequest, CreateBrandResponse, RemoveBrandRequest, DeleteCategoryRequest, UpdateCategoryRequest, GetProductAttributesRequest, CreateProductAttributeRequest, UpdateProductAttributesRequest, UpdateProductRequest, CreateProductRequest, DeleteProductRequest, GetVariantsForCartRequest, DeleteProductAttributesRequest, ChangeProductStatusResponse, ChangeProductStatusRequest, GetWishlistResponse, AddWishlistRequest, GetWishlistRequest, AddWishlistResponse, RemoveWishlistResponse, RemoveWishlistRequest, GetProductRequest } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';
const DAPR_PORT = process.env.DAPR_PORT;
if (!DAPR_PORT){
  throw Error("not found port");
}
const productConfig = createServiceConfig('ProductService', DAPR_PORT);
const productClient = createClient(ProductServiceClient, productConfig);

export const productService = {
  // searchProducts: async (query: string): Promise<SearchProductsResponse> => {
  //     return promisifyGrpcCall(productClient, 'searchProducts', { query });
  // },

  // listRecommendations: async (userId: string, productIds: string[]): Promise<ListRecommendationsResponse> => {
  //     return promisifyGrpcCall(productClient, 'listRecommendations', { userId, productIds });
  // },

  getProduct: async (getProductRequest: GetProductRequest): Promise<GetProductResponse> => {
    return promisifyGrpcCall(productClient, 'getProduct', getProductRequest);
  },

  createProduct: async (createProductRequest: CreateProductRequest): Promise<CreateProductResponse> => {
    return promisifyGrpcCall(productClient, 'createProduct', createProductRequest);
  },

  updateProduct: async (updateProductRequest: UpdateProductRequest): Promise<UpdateProductResponse> => {
    return promisifyGrpcCall(productClient, 'updateProduct', updateProductRequest);
  },

  deleteProduct: async (deleteProductRequest: DeleteProductRequest): Promise<DeleteProductResponse> => {
    return promisifyGrpcCall(productClient, 'deleteProduct', deleteProductRequest);
  },

  createBrand: async (createBrandRequest: CreateBrandRequest): Promise<CreateBrandResponse> => {
    return promisifyGrpcCall(productClient, 'createBrand', createBrandRequest);
  },

  removeBrand: async (removeBrandRequest: RemoveBrandRequest): Promise<RemoveBrandResponse> => {
    return promisifyGrpcCall(productClient, 'removeBrand', removeBrandRequest);
  },

  getAllBrand: async (): Promise<GetAllBrandResponse> => {
    return promisifyGrpcCall(productClient, 'getAllBrand', {});
  },

  createCategory: async (createCategoryRequest: CreateCategoryRequest): Promise<CreateCategoryResponse> => {
    return promisifyGrpcCall(productClient, 'createCategory', createCategoryRequest);
  },

  removeCategory: async (deleteCategoryRequest: DeleteCategoryRequest): Promise<DeleteCategoryResponse> => {
    return promisifyGrpcCall(productClient, 'deleteCategory', deleteCategoryRequest);
  },

  getAllCategory: async (): Promise<GetAllCategoryResponse> => {
    return promisifyGrpcCall(productClient, 'getAllCategory', {});
  },

  updateCategory: async (updateCategoryRequest: UpdateCategoryRequest): Promise<UpdateCategoryResponse> => {
    return promisifyGrpcCall(productClient, 'updateCategory', updateCategoryRequest);
  },

  getProductAttributes: async (getProductAttributesRequest: GetProductAttributesRequest): Promise<GetProductAttributesResponse> => {
    return promisifyGrpcCall(productClient, 'getProductAttributes', getProductAttributesRequest);
  },

  updateProductAttribute: async (updateProductAttributeRequest: UpdateProductAttributesRequest): Promise<UpdateProductAttributesResponse> => {
    return promisifyGrpcCall(productClient, 'updateProductAttributes', updateProductAttributeRequest);
  },

  deleteProductAttribute: async (deleteProductAttributeRequest: DeleteProductAttributesRequest): Promise<DeleteProductAttributesResponse> => {
    return promisifyGrpcCall(productClient, 'deleteProductAttributes', deleteProductAttributeRequest);
  },

  createProductAttribute: async (createProductAttributeRequest: CreateProductAttributeRequest): Promise<CreateProductAttributeResponse> => {
    return promisifyGrpcCall(productClient, 'createProductAttribute', createProductAttributeRequest);
  },

  listProducts: async (): Promise<ListProductsResponse> => {
    return promisifyGrpcCall(productClient, 'listProducts', {});
  },

  getWarehouses: async (): Promise<GetWarehousesResponse> => {
    return promisifyGrpcCall(productClient, 'getWarehouses', {});
  },

  getVariantsForCart: async (getVariantsForCartRequest: GetVariantsForCartRequest): Promise<GetVariantsForCartResponse> => {
    return promisifyGrpcCall(productClient, 'getVariantsForCart', getVariantsForCartRequest);
  },

  validateAndReserve: async (request: ValidateAndReserveRequest): Promise<ValidateAndReserveResponse> => {
    return promisifyGrpcCall(productClient, 'validateAndReserve', request);
  },

  releaseReservation: async (request: ReleaseReservationRequest): Promise<ReleaseReservationResponse> => {
    return promisifyGrpcCall(productClient, 'releaseReservation', request);
  },

  commitReservation: async (request: CommitReservationRequest): Promise<CommitReservationResponse> => {
    return promisifyGrpcCall(productClient, 'commitReservation', request);
  },

  changeProductStatus: async (request: ChangeProductStatusRequest): Promise<ChangeProductStatusResponse> => {
    return promisifyGrpcCall(productClient, 'changeProductStatus', request);
  },

  addWishlist: async (request: AddWishlistRequest): Promise<AddWishlistResponse> => {
    return promisifyGrpcCall(productClient, 'addWishlist', request);
  },

  getWishlist: async (request: GetWishlistRequest): Promise<GetWishlistResponse> => {
    return promisifyGrpcCall(productClient, 'getWishlist', request);
  },

  removeWishlist: async (request: RemoveWishlistRequest): Promise<RemoveWishlistResponse> => {
    return promisifyGrpcCall(productClient, 'removeWishlist', request);
  },
}; 