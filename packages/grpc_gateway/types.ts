// import type { UserServiceClient } from '@nexura/grpc_gateway/protos/generated/nexuraTelemetry/UserService';
// import type { CartServiceClient } from '@nexura/grpc_gateway/protos/generated/nexuraTelemetry/CartService';
// import type { ProductCatalogServiceClient } from '@nexura/grpc_gateway/protos/generated/nexuraTelemetry/ProductCatalogService';
// import type { AddressServiceClient } from '@nexura/grpc_gateway/protos/generated/nexuraTelemetry/AddressService';


// import {
//     LoginUserResponse,
//     ValidateOTPResponse,
//     ForgotPasswordResponse,
//     ResetPasswordResponse,
//     DeleteUserResponse,
//     VerifyAccountResponse,
//     GetCountriesResponse,
//     GetProvincesResponse,
//     GetDistrictsResponse,
//     GetWardsResponse,
//     Address,
//     GetUserResponse,
//     UpdateUserResponse,
//     RegisterUserResponse,
//     ExtendedAddress,
//     User
// } from '@nexura/grpc_gateway/protos';

// // Type for the gRPC client methods
// type GrpcClientMethod<TRequest, TResponse> = (
//     request: TRequest,
//     callback: (error: Error | null, response: TResponse) => void
// ) => void;

// // Type for service method names
// export type ServiceMethod = 
//     | 'validateOTP' | 'forgotPassword' | 'resetPassword' | 'loginUser' | 'registerUser' | 'getUser' | 'updateUser' | 'deleteUser'
//     | 'addItem' | 'emptyCart' | 'getCart'
//     | 'listProducts' | 'getProduct' | 'searchProducts' | 'listRecommendations'
//     | 'getCountries' | 'getProvincesByCountry' | 'getDistrictsByProvince' | 'getWardsByDistrict'
//     | 'addAddress' | 'updateAddress' | 'deleteAddress' | 'getAddresses';

// // Type for the gRPC client with all possible methods
// export type GrpcClient = {
//     [K in ServiceMethod]: GrpcClientMethod<any, any>;
// } & (UserServiceClient | CartServiceClient | ProductCatalogServiceClient | AddressServiceClient);

// // Type for the base adapter
// export type BaseAdapter = {
//     makeRequest: <T>(method: ServiceMethod, request: any) => Promise<T>;
// };

// export interface UserService {
//     validateOTP(email: string, otp: string): Promise<ValidateOTPResponse>;
//     forgotPassword(email: string): Promise<ForgotPasswordResponse>;
//     resetPassword(email: string, newPassword: string): Promise<ResetPasswordResponse>;
//     loginUser(email: string, password: string): Promise<LoginUserResponse>;
//     registerUser(firstName: string, lastName: string, email: string, password: string): Promise<RegisterUserResponse>;
//     getUser(id: number): Promise<GetUserResponse>;
//     updateUser(id: number, user: User, currentPassword: string, newPassword: string): Promise<UpdateUserResponse>;
//     deleteUser(id: number): Promise<DeleteUserResponse>;
//     verifyAccount(token: string): Promise<VerifyAccountResponse>;
// }

// export interface CartService {
//     addItem(userId: string, item: any): Promise<any>;
//     emptyCart(userId: string): Promise<any>;
//     getCart(userId: string): Promise<any>;
// }

// export interface ProductCatalogService {
//     listProducts(): Promise<any>;
//     getProduct(id: string): Promise<any>;
//     searchProducts(query: string): Promise<any>;
//     listRecommendations(userId: string, productIds: string[]): Promise<any>;
// }

// export interface VerifyEmailResponse {
//   success: boolean;
//   message: string;
// }

// export interface AddressService {
//     getCountries(): Promise<GetCountriesResponse>;
//     getProvincesByCountry(countryId: number): Promise<GetProvincesResponse>;
//     getDistrictsByProvince(provinceId: number): Promise<GetDistrictsResponse>;
//     getWardsByDistrict(districtId: number): Promise<GetWardsResponse>;
//     addAddress(userId: number, address: Address): Promise<{ success: boolean; message: string; address: Address }>;
//     updateAddress(userId: number, address: Address): Promise<{ success: boolean; message: string; address: Address }>;
//     deleteAddress(userId: number, addressId: string): Promise<{ success: boolean; message: string; addressId: string }>;
//     getAddresses(userId: number): Promise<{ success: boolean; message: string; addresses: ExtendedAddress[] }>;
// }
