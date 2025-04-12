// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateBrandRequest as _nexuraTelemetry_CreateBrandRequest, CreateBrandRequest__Output as _nexuraTelemetry_CreateBrandRequest__Output } from '../nexuraTelemetry/CreateBrandRequest';
import type { CreateBrandResponse as _nexuraTelemetry_CreateBrandResponse, CreateBrandResponse__Output as _nexuraTelemetry_CreateBrandResponse__Output } from '../nexuraTelemetry/CreateBrandResponse';
import type { CreateCategoryRequest as _nexuraTelemetry_CreateCategoryRequest, CreateCategoryRequest__Output as _nexuraTelemetry_CreateCategoryRequest__Output } from '../nexuraTelemetry/CreateCategoryRequest';
import type { CreateCategoryResponse as _nexuraTelemetry_CreateCategoryResponse, CreateCategoryResponse__Output as _nexuraTelemetry_CreateCategoryResponse__Output } from '../nexuraTelemetry/CreateCategoryResponse';
import type { CreateColorRequest as _nexuraTelemetry_CreateColorRequest, CreateColorRequest__Output as _nexuraTelemetry_CreateColorRequest__Output } from '../nexuraTelemetry/CreateColorRequest';
import type { CreateColorResponse as _nexuraTelemetry_CreateColorResponse, CreateColorResponse__Output as _nexuraTelemetry_CreateColorResponse__Output } from '../nexuraTelemetry/CreateColorResponse';
import type { CreateImageRequest as _nexuraTelemetry_CreateImageRequest, CreateImageRequest__Output as _nexuraTelemetry_CreateImageRequest__Output } from '../nexuraTelemetry/CreateImageRequest';
import type { CreateImageResponse as _nexuraTelemetry_CreateImageResponse, CreateImageResponse__Output as _nexuraTelemetry_CreateImageResponse__Output } from '../nexuraTelemetry/CreateImageResponse';
import type { CreateMaterialRequest as _nexuraTelemetry_CreateMaterialRequest, CreateMaterialRequest__Output as _nexuraTelemetry_CreateMaterialRequest__Output } from '../nexuraTelemetry/CreateMaterialRequest';
import type { CreateMaterialResponse as _nexuraTelemetry_CreateMaterialResponse, CreateMaterialResponse__Output as _nexuraTelemetry_CreateMaterialResponse__Output } from '../nexuraTelemetry/CreateMaterialResponse';
import type { CreateProductRequest as _nexuraTelemetry_CreateProductRequest, CreateProductRequest__Output as _nexuraTelemetry_CreateProductRequest__Output } from '../nexuraTelemetry/CreateProductRequest';
import type { CreateProductResponse as _nexuraTelemetry_CreateProductResponse, CreateProductResponse__Output as _nexuraTelemetry_CreateProductResponse__Output } from '../nexuraTelemetry/CreateProductResponse';
import type { CreateSizeRequest as _nexuraTelemetry_CreateSizeRequest, CreateSizeRequest__Output as _nexuraTelemetry_CreateSizeRequest__Output } from '../nexuraTelemetry/CreateSizeRequest';
import type { CreateSizeResponse as _nexuraTelemetry_CreateSizeResponse, CreateSizeResponse__Output as _nexuraTelemetry_CreateSizeResponse__Output } from '../nexuraTelemetry/CreateSizeResponse';
import type { CreateVariantRequest as _nexuraTelemetry_CreateVariantRequest, CreateVariantRequest__Output as _nexuraTelemetry_CreateVariantRequest__Output } from '../nexuraTelemetry/CreateVariantRequest';
import type { CreateVariantResponse as _nexuraTelemetry_CreateVariantResponse, CreateVariantResponse__Output as _nexuraTelemetry_CreateVariantResponse__Output } from '../nexuraTelemetry/CreateVariantResponse';
import type { DeleteProductRequest as _nexuraTelemetry_DeleteProductRequest, DeleteProductRequest__Output as _nexuraTelemetry_DeleteProductRequest__Output } from '../nexuraTelemetry/DeleteProductRequest';
import type { DeleteProductResponse as _nexuraTelemetry_DeleteProductResponse, DeleteProductResponse__Output as _nexuraTelemetry_DeleteProductResponse__Output } from '../nexuraTelemetry/DeleteProductResponse';
import type { Empty as _nexuraTelemetry_Empty, Empty__Output as _nexuraTelemetry_Empty__Output } from '../nexuraTelemetry/Empty';
import type { GetProductRequest as _nexuraTelemetry_GetProductRequest, GetProductRequest__Output as _nexuraTelemetry_GetProductRequest__Output } from '../nexuraTelemetry/GetProductRequest';
import type { ListProductsResponse as _nexuraTelemetry_ListProductsResponse, ListProductsResponse__Output as _nexuraTelemetry_ListProductsResponse__Output } from '../nexuraTelemetry/ListProductsResponse';
import type { Product as _nexuraTelemetry_Product, Product__Output as _nexuraTelemetry_Product__Output } from '../nexuraTelemetry/Product';
import type { SearchProductsRequest as _nexuraTelemetry_SearchProductsRequest, SearchProductsRequest__Output as _nexuraTelemetry_SearchProductsRequest__Output } from '../nexuraTelemetry/SearchProductsRequest';
import type { SearchProductsResponse as _nexuraTelemetry_SearchProductsResponse, SearchProductsResponse__Output as _nexuraTelemetry_SearchProductsResponse__Output } from '../nexuraTelemetry/SearchProductsResponse';
import type { UpdateProductRequest as _nexuraTelemetry_UpdateProductRequest, UpdateProductRequest__Output as _nexuraTelemetry_UpdateProductRequest__Output } from '../nexuraTelemetry/UpdateProductRequest';
import type { UpdateProductResponse as _nexuraTelemetry_UpdateProductResponse, UpdateProductResponse__Output as _nexuraTelemetry_UpdateProductResponse__Output } from '../nexuraTelemetry/UpdateProductResponse';

export interface ProductCatalogServiceClient extends grpc.Client {
  CreateBrand(argument: _nexuraTelemetry_CreateBrandRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  CreateBrand(argument: _nexuraTelemetry_CreateBrandRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  CreateBrand(argument: _nexuraTelemetry_CreateBrandRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  CreateBrand(argument: _nexuraTelemetry_CreateBrandRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  createBrand(argument: _nexuraTelemetry_CreateBrandRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  createBrand(argument: _nexuraTelemetry_CreateBrandRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  createBrand(argument: _nexuraTelemetry_CreateBrandRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  createBrand(argument: _nexuraTelemetry_CreateBrandRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateBrandResponse__Output>): grpc.ClientUnaryCall;
  
  CreateCategory(argument: _nexuraTelemetry_CreateCategoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  CreateCategory(argument: _nexuraTelemetry_CreateCategoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  CreateCategory(argument: _nexuraTelemetry_CreateCategoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  CreateCategory(argument: _nexuraTelemetry_CreateCategoryRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  createCategory(argument: _nexuraTelemetry_CreateCategoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  createCategory(argument: _nexuraTelemetry_CreateCategoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  createCategory(argument: _nexuraTelemetry_CreateCategoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  createCategory(argument: _nexuraTelemetry_CreateCategoryRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateCategoryResponse__Output>): grpc.ClientUnaryCall;
  
  CreateColor(argument: _nexuraTelemetry_CreateColorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  CreateColor(argument: _nexuraTelemetry_CreateColorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  CreateColor(argument: _nexuraTelemetry_CreateColorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  CreateColor(argument: _nexuraTelemetry_CreateColorRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  createColor(argument: _nexuraTelemetry_CreateColorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  createColor(argument: _nexuraTelemetry_CreateColorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  createColor(argument: _nexuraTelemetry_CreateColorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  createColor(argument: _nexuraTelemetry_CreateColorRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateColorResponse__Output>): grpc.ClientUnaryCall;
  
  CreateImage(argument: _nexuraTelemetry_CreateImageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  CreateImage(argument: _nexuraTelemetry_CreateImageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  CreateImage(argument: _nexuraTelemetry_CreateImageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  CreateImage(argument: _nexuraTelemetry_CreateImageRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  createImage(argument: _nexuraTelemetry_CreateImageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  createImage(argument: _nexuraTelemetry_CreateImageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  createImage(argument: _nexuraTelemetry_CreateImageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  createImage(argument: _nexuraTelemetry_CreateImageRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateImageResponse__Output>): grpc.ClientUnaryCall;
  
  CreateMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  CreateMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  CreateMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  CreateMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _nexuraTelemetry_CreateMaterialRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateMaterialResponse__Output>): grpc.ClientUnaryCall;
  
  CreateProduct(argument: _nexuraTelemetry_CreateProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  CreateProduct(argument: _nexuraTelemetry_CreateProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  CreateProduct(argument: _nexuraTelemetry_CreateProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  CreateProduct(argument: _nexuraTelemetry_CreateProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  createProduct(argument: _nexuraTelemetry_CreateProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  createProduct(argument: _nexuraTelemetry_CreateProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  createProduct(argument: _nexuraTelemetry_CreateProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  createProduct(argument: _nexuraTelemetry_CreateProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateProductResponse__Output>): grpc.ClientUnaryCall;
  
  CreateSize(argument: _nexuraTelemetry_CreateSizeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  CreateSize(argument: _nexuraTelemetry_CreateSizeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  CreateSize(argument: _nexuraTelemetry_CreateSizeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  CreateSize(argument: _nexuraTelemetry_CreateSizeRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  createSize(argument: _nexuraTelemetry_CreateSizeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  createSize(argument: _nexuraTelemetry_CreateSizeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  createSize(argument: _nexuraTelemetry_CreateSizeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  createSize(argument: _nexuraTelemetry_CreateSizeRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateSizeResponse__Output>): grpc.ClientUnaryCall;
  
  CreateVariant(argument: _nexuraTelemetry_CreateVariantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  CreateVariant(argument: _nexuraTelemetry_CreateVariantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  CreateVariant(argument: _nexuraTelemetry_CreateVariantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  CreateVariant(argument: _nexuraTelemetry_CreateVariantRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  createVariant(argument: _nexuraTelemetry_CreateVariantRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  createVariant(argument: _nexuraTelemetry_CreateVariantRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  createVariant(argument: _nexuraTelemetry_CreateVariantRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  createVariant(argument: _nexuraTelemetry_CreateVariantRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateVariantResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  DeleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  DeleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  DeleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  deleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  deleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  deleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  deleteProduct(argument: _nexuraTelemetry_DeleteProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteProductResponse__Output>): grpc.ClientUnaryCall;
  
  GetProduct(argument: _nexuraTelemetry_GetProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  GetProduct(argument: _nexuraTelemetry_GetProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  GetProduct(argument: _nexuraTelemetry_GetProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  GetProduct(argument: _nexuraTelemetry_GetProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _nexuraTelemetry_GetProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _nexuraTelemetry_GetProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _nexuraTelemetry_GetProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  getProduct(argument: _nexuraTelemetry_GetProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_Product__Output>): grpc.ClientUnaryCall;
  
  ListProducts(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  ListProducts(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  ListProducts(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  ListProducts(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  listProducts(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  listProducts(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  listProducts(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  listProducts(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_ListProductsResponse__Output>): grpc.ClientUnaryCall;
  
  SearchProducts(argument: _nexuraTelemetry_SearchProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  SearchProducts(argument: _nexuraTelemetry_SearchProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  SearchProducts(argument: _nexuraTelemetry_SearchProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  SearchProducts(argument: _nexuraTelemetry_SearchProductsRequest, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  searchProducts(argument: _nexuraTelemetry_SearchProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  searchProducts(argument: _nexuraTelemetry_SearchProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  searchProducts(argument: _nexuraTelemetry_SearchProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  searchProducts(argument: _nexuraTelemetry_SearchProductsRequest, callback: grpc.requestCallback<_nexuraTelemetry_SearchProductsResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateProduct(argument: _nexuraTelemetry_UpdateProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  UpdateProduct(argument: _nexuraTelemetry_UpdateProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  UpdateProduct(argument: _nexuraTelemetry_UpdateProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  UpdateProduct(argument: _nexuraTelemetry_UpdateProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  updateProduct(argument: _nexuraTelemetry_UpdateProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  updateProduct(argument: _nexuraTelemetry_UpdateProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  updateProduct(argument: _nexuraTelemetry_UpdateProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  updateProduct(argument: _nexuraTelemetry_UpdateProductRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateProductResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ProductCatalogServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateBrand: grpc.handleUnaryCall<_nexuraTelemetry_CreateBrandRequest__Output, _nexuraTelemetry_CreateBrandResponse>;
  
  CreateCategory: grpc.handleUnaryCall<_nexuraTelemetry_CreateCategoryRequest__Output, _nexuraTelemetry_CreateCategoryResponse>;
  
  CreateColor: grpc.handleUnaryCall<_nexuraTelemetry_CreateColorRequest__Output, _nexuraTelemetry_CreateColorResponse>;
  
  CreateImage: grpc.handleUnaryCall<_nexuraTelemetry_CreateImageRequest__Output, _nexuraTelemetry_CreateImageResponse>;
  
  CreateMaterial: grpc.handleUnaryCall<_nexuraTelemetry_CreateMaterialRequest__Output, _nexuraTelemetry_CreateMaterialResponse>;
  
  CreateProduct: grpc.handleUnaryCall<_nexuraTelemetry_CreateProductRequest__Output, _nexuraTelemetry_CreateProductResponse>;
  
  CreateSize: grpc.handleUnaryCall<_nexuraTelemetry_CreateSizeRequest__Output, _nexuraTelemetry_CreateSizeResponse>;
  
  CreateVariant: grpc.handleUnaryCall<_nexuraTelemetry_CreateVariantRequest__Output, _nexuraTelemetry_CreateVariantResponse>;
  
  DeleteProduct: grpc.handleUnaryCall<_nexuraTelemetry_DeleteProductRequest__Output, _nexuraTelemetry_DeleteProductResponse>;
  
  GetProduct: grpc.handleUnaryCall<_nexuraTelemetry_GetProductRequest__Output, _nexuraTelemetry_Product>;
  
  ListProducts: grpc.handleUnaryCall<_nexuraTelemetry_Empty__Output, _nexuraTelemetry_ListProductsResponse>;
  
  SearchProducts: grpc.handleUnaryCall<_nexuraTelemetry_SearchProductsRequest__Output, _nexuraTelemetry_SearchProductsResponse>;
  
  UpdateProduct: grpc.handleUnaryCall<_nexuraTelemetry_UpdateProductRequest__Output, _nexuraTelemetry_UpdateProductResponse>;
  
}

export interface ProductCatalogServiceDefinition extends grpc.ServiceDefinition {
  CreateBrand: MethodDefinition<_nexuraTelemetry_CreateBrandRequest, _nexuraTelemetry_CreateBrandResponse, _nexuraTelemetry_CreateBrandRequest__Output, _nexuraTelemetry_CreateBrandResponse__Output>
  CreateCategory: MethodDefinition<_nexuraTelemetry_CreateCategoryRequest, _nexuraTelemetry_CreateCategoryResponse, _nexuraTelemetry_CreateCategoryRequest__Output, _nexuraTelemetry_CreateCategoryResponse__Output>
  CreateColor: MethodDefinition<_nexuraTelemetry_CreateColorRequest, _nexuraTelemetry_CreateColorResponse, _nexuraTelemetry_CreateColorRequest__Output, _nexuraTelemetry_CreateColorResponse__Output>
  CreateImage: MethodDefinition<_nexuraTelemetry_CreateImageRequest, _nexuraTelemetry_CreateImageResponse, _nexuraTelemetry_CreateImageRequest__Output, _nexuraTelemetry_CreateImageResponse__Output>
  CreateMaterial: MethodDefinition<_nexuraTelemetry_CreateMaterialRequest, _nexuraTelemetry_CreateMaterialResponse, _nexuraTelemetry_CreateMaterialRequest__Output, _nexuraTelemetry_CreateMaterialResponse__Output>
  CreateProduct: MethodDefinition<_nexuraTelemetry_CreateProductRequest, _nexuraTelemetry_CreateProductResponse, _nexuraTelemetry_CreateProductRequest__Output, _nexuraTelemetry_CreateProductResponse__Output>
  CreateSize: MethodDefinition<_nexuraTelemetry_CreateSizeRequest, _nexuraTelemetry_CreateSizeResponse, _nexuraTelemetry_CreateSizeRequest__Output, _nexuraTelemetry_CreateSizeResponse__Output>
  CreateVariant: MethodDefinition<_nexuraTelemetry_CreateVariantRequest, _nexuraTelemetry_CreateVariantResponse, _nexuraTelemetry_CreateVariantRequest__Output, _nexuraTelemetry_CreateVariantResponse__Output>
  DeleteProduct: MethodDefinition<_nexuraTelemetry_DeleteProductRequest, _nexuraTelemetry_DeleteProductResponse, _nexuraTelemetry_DeleteProductRequest__Output, _nexuraTelemetry_DeleteProductResponse__Output>
  GetProduct: MethodDefinition<_nexuraTelemetry_GetProductRequest, _nexuraTelemetry_Product, _nexuraTelemetry_GetProductRequest__Output, _nexuraTelemetry_Product__Output>
  ListProducts: MethodDefinition<_nexuraTelemetry_Empty, _nexuraTelemetry_ListProductsResponse, _nexuraTelemetry_Empty__Output, _nexuraTelemetry_ListProductsResponse__Output>
  SearchProducts: MethodDefinition<_nexuraTelemetry_SearchProductsRequest, _nexuraTelemetry_SearchProductsResponse, _nexuraTelemetry_SearchProductsRequest__Output, _nexuraTelemetry_SearchProductsResponse__Output>
  UpdateProduct: MethodDefinition<_nexuraTelemetry_UpdateProductRequest, _nexuraTelemetry_UpdateProductResponse, _nexuraTelemetry_UpdateProductRequest__Output, _nexuraTelemetry_UpdateProductResponse__Output>
}
