import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AdServiceClient as _nexuraTelemetry_AdServiceClient, AdServiceDefinition as _nexuraTelemetry_AdServiceDefinition } from './nexuraTelemetry/AdService';
import type { AddressServiceClient as _nexuraTelemetry_AddressServiceClient, AddressServiceDefinition as _nexuraTelemetry_AddressServiceDefinition } from './nexuraTelemetry/AddressService';
import type { CartServiceClient as _nexuraTelemetry_CartServiceClient, CartServiceDefinition as _nexuraTelemetry_CartServiceDefinition } from './nexuraTelemetry/CartService';
import type { CheckoutServiceClient as _nexuraTelemetry_CheckoutServiceClient, CheckoutServiceDefinition as _nexuraTelemetry_CheckoutServiceDefinition } from './nexuraTelemetry/CheckoutService';
import type { CurrencyServiceClient as _nexuraTelemetry_CurrencyServiceClient, CurrencyServiceDefinition as _nexuraTelemetry_CurrencyServiceDefinition } from './nexuraTelemetry/CurrencyService';
import type { EmailServiceClient as _nexuraTelemetry_EmailServiceClient, EmailServiceDefinition as _nexuraTelemetry_EmailServiceDefinition } from './nexuraTelemetry/EmailService';
import type { FeatureFlagServiceClient as _nexuraTelemetry_FeatureFlagServiceClient, FeatureFlagServiceDefinition as _nexuraTelemetry_FeatureFlagServiceDefinition } from './nexuraTelemetry/FeatureFlagService';
import type { PaymentServiceClient as _nexuraTelemetry_PaymentServiceClient, PaymentServiceDefinition as _nexuraTelemetry_PaymentServiceDefinition } from './nexuraTelemetry/PaymentService';
import type { ProductCatalogServiceClient as _nexuraTelemetry_ProductCatalogServiceClient, ProductCatalogServiceDefinition as _nexuraTelemetry_ProductCatalogServiceDefinition } from './nexuraTelemetry/ProductCatalogService';
import type { RecommendationServiceClient as _nexuraTelemetry_RecommendationServiceClient, RecommendationServiceDefinition as _nexuraTelemetry_RecommendationServiceDefinition } from './nexuraTelemetry/RecommendationService';
import type { ShippingServiceClient as _nexuraTelemetry_ShippingServiceClient, ShippingServiceDefinition as _nexuraTelemetry_ShippingServiceDefinition } from './nexuraTelemetry/ShippingService';
import type { UserServiceClient as _nexuraTelemetry_UserServiceClient, UserServiceDefinition as _nexuraTelemetry_UserServiceDefinition } from './nexuraTelemetry/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  nexuraTelemetry: {
    Ad: MessageTypeDefinition
    AdRequest: MessageTypeDefinition
    AdResponse: MessageTypeDefinition
    AdService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_AdServiceClient> & { service: _nexuraTelemetry_AdServiceDefinition }
    AddAddressRequest: MessageTypeDefinition
    AddItemRequest: MessageTypeDefinition
    Address: MessageTypeDefinition
    AddressResponse: MessageTypeDefinition
    AddressService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_AddressServiceClient> & { service: _nexuraTelemetry_AddressServiceDefinition }
    Brand: MessageTypeDefinition
    Cart: MessageTypeDefinition
    CartItem: MessageTypeDefinition
    CartService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_CartServiceClient> & { service: _nexuraTelemetry_CartServiceDefinition }
    Category: MessageTypeDefinition
    ChargeRequest: MessageTypeDefinition
    ChargeResponse: MessageTypeDefinition
    CheckoutService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_CheckoutServiceClient> & { service: _nexuraTelemetry_CheckoutServiceDefinition }
    Color: MessageTypeDefinition
    Country: MessageTypeDefinition
    CreateBrandRequest: MessageTypeDefinition
    CreateBrandResponse: MessageTypeDefinition
    CreateCategoryRequest: MessageTypeDefinition
    CreateCategoryResponse: MessageTypeDefinition
    CreateColorRequest: MessageTypeDefinition
    CreateColorResponse: MessageTypeDefinition
    CreateFlagRequest: MessageTypeDefinition
    CreateFlagResponse: MessageTypeDefinition
    CreateImageRequest: MessageTypeDefinition
    CreateImageResponse: MessageTypeDefinition
    CreateMaterialRequest: MessageTypeDefinition
    CreateMaterialResponse: MessageTypeDefinition
    CreateProductRequest: MessageTypeDefinition
    CreateProductResponse: MessageTypeDefinition
    CreateSizeRequest: MessageTypeDefinition
    CreateSizeResponse: MessageTypeDefinition
    CreateVariantRequest: MessageTypeDefinition
    CreateVariantResponse: MessageTypeDefinition
    CreditCardInfo: MessageTypeDefinition
    CurrencyConversionRequest: MessageTypeDefinition
    CurrencyService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_CurrencyServiceClient> & { service: _nexuraTelemetry_CurrencyServiceDefinition }
    DeleteAddressRequest: MessageTypeDefinition
    DeleteAddressResponse: MessageTypeDefinition
    DeleteFlagRequest: MessageTypeDefinition
    DeleteFlagResponse: MessageTypeDefinition
    DeleteProductRequest: MessageTypeDefinition
    DeleteProductResponse: MessageTypeDefinition
    DeleteUserRequest: MessageTypeDefinition
    DeleteUserResponse: MessageTypeDefinition
    District: MessageTypeDefinition
    EmailService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_EmailServiceClient> & { service: _nexuraTelemetry_EmailServiceDefinition }
    Empty: MessageTypeDefinition
    EmptyCartRequest: MessageTypeDefinition
    ExtendedAddress: MessageTypeDefinition
    FeatureFlagService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_FeatureFlagServiceClient> & { service: _nexuraTelemetry_FeatureFlagServiceDefinition }
    Flag: MessageTypeDefinition
    ForgotPasswordRequest: MessageTypeDefinition
    ForgotPasswordResponse: MessageTypeDefinition
    GetAddressesRequest: MessageTypeDefinition
    GetAddressesResponse: MessageTypeDefinition
    GetCartRequest: MessageTypeDefinition
    GetCountriesResponse: MessageTypeDefinition
    GetDistrictsByProvinceRequest: MessageTypeDefinition
    GetDistrictsResponse: MessageTypeDefinition
    GetFlagRequest: MessageTypeDefinition
    GetFlagResponse: MessageTypeDefinition
    GetProductRequest: MessageTypeDefinition
    GetProvincesByCountryRequest: MessageTypeDefinition
    GetProvincesResponse: MessageTypeDefinition
    GetQuoteRequest: MessageTypeDefinition
    GetQuoteResponse: MessageTypeDefinition
    GetSupportedCurrenciesResponse: MessageTypeDefinition
    GetUserRequest: MessageTypeDefinition
    GetUserResponse: MessageTypeDefinition
    GetWardsByDistrictRequest: MessageTypeDefinition
    GetWardsResponse: MessageTypeDefinition
    Image: MessageTypeDefinition
    ListFlagsRequest: MessageTypeDefinition
    ListFlagsResponse: MessageTypeDefinition
    ListProductsResponse: MessageTypeDefinition
    ListRecommendationsRequest: MessageTypeDefinition
    ListRecommendationsResponse: MessageTypeDefinition
    LoginUserRequest: MessageTypeDefinition
    LoginUserResponse: MessageTypeDefinition
    Material: MessageTypeDefinition
    Money: MessageTypeDefinition
    OrderItem: MessageTypeDefinition
    OrderResult: MessageTypeDefinition
    PaymentService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_PaymentServiceClient> & { service: _nexuraTelemetry_PaymentServiceDefinition }
    PlaceOrderRequest: MessageTypeDefinition
    PlaceOrderResponse: MessageTypeDefinition
    Product: MessageTypeDefinition
    ProductCatalogService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_ProductCatalogServiceClient> & { service: _nexuraTelemetry_ProductCatalogServiceDefinition }
    Province: MessageTypeDefinition
    RecommendationService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_RecommendationServiceClient> & { service: _nexuraTelemetry_RecommendationServiceDefinition }
    RegisterUserRequest: MessageTypeDefinition
    RegisterUserResponse: MessageTypeDefinition
    ResetPasswordRequest: MessageTypeDefinition
    ResetPasswordResponse: MessageTypeDefinition
    SearchProductsRequest: MessageTypeDefinition
    SearchProductsResponse: MessageTypeDefinition
    SendOTPResetPasswordRequest: MessageTypeDefinition
    SendOTPResetPasswordResponse: MessageTypeDefinition
    SendOrderConfirmationRequest: MessageTypeDefinition
    SendWelcomeEmailRequest: MessageTypeDefinition
    SendWelcomeEmailResponse: MessageTypeDefinition
    ShipOrderRequest: MessageTypeDefinition
    ShipOrderResponse: MessageTypeDefinition
    ShippingService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_ShippingServiceClient> & { service: _nexuraTelemetry_ShippingServiceDefinition }
    Size: MessageTypeDefinition
    UpdateAddressRequest: MessageTypeDefinition
    UpdateFlagRequest: MessageTypeDefinition
    UpdateFlagResponse: MessageTypeDefinition
    UpdateProductRequest: MessageTypeDefinition
    UpdateProductResponse: MessageTypeDefinition
    UpdateUserRequest: MessageTypeDefinition
    UpdateUserResponse: MessageTypeDefinition
    User: MessageTypeDefinition
    UserService: SubtypeConstructor<typeof grpc.Client, _nexuraTelemetry_UserServiceClient> & { service: _nexuraTelemetry_UserServiceDefinition }
    ValidateOTPRequest: MessageTypeDefinition
    ValidateOTPResponse: MessageTypeDefinition
    Variant: MessageTypeDefinition
    VerifyAccountRequest: MessageTypeDefinition
    VerifyAccountResponse: MessageTypeDefinition
    Ward: MessageTypeDefinition
  }
}

