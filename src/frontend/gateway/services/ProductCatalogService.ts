// import { GrpcClient, ProductCatalogService, ServiceMethod } from './types';
// import {
//     Product,
//     ListProductsResponse,
//     SearchProductsResponse,
//     ListRecommendationsResponse
// } from '../../protos/nexura';

// // Factory pattern: Creates product service instances
// export const productCatalogServiceFactory = (client: GrpcClient): ProductCatalogService => {
//     const adapter = grpcClientAdapter(client);

//     // Facade pattern: Provides simplified interface to product operations
//     const productCatalogServiceFacade = {
//         listProducts: async (): Promise<ListProductsResponse> => {
//             return adapter.makeRequest('listProducts' as ServiceMethod, {});
//         },

//         getProduct: async (id: string): Promise<Product> => {
//             return adapter.makeRequest('getProduct' as ServiceMethod, {id});
//         },
 

//         searchProducts: async (query: string): Promise<SearchProductsResponse> => {
//             return adapter.makeRequest('searchProducts' as ServiceMethod, {query});
//         },

//         listRecommendations: async (userId: string, productIds: string[]): Promise<ListRecommendationsResponse> => {
//             return adapter.makeRequest('listRecommendations' as ServiceMethod, {userId, productIds});
//         }
        
//     };

//     return productCatalogServiceFacade;
// }; 