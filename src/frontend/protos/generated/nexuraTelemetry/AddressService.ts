// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddAddressRequest as _nexuraTelemetry_AddAddressRequest, AddAddressRequest__Output as _nexuraTelemetry_AddAddressRequest__Output } from '../nexuraTelemetry/AddAddressRequest';
import type { AddressResponse as _nexuraTelemetry_AddressResponse, AddressResponse__Output as _nexuraTelemetry_AddressResponse__Output } from '../nexuraTelemetry/AddressResponse';
import type { DeleteAddressRequest as _nexuraTelemetry_DeleteAddressRequest, DeleteAddressRequest__Output as _nexuraTelemetry_DeleteAddressRequest__Output } from '../nexuraTelemetry/DeleteAddressRequest';
import type { DeleteAddressResponse as _nexuraTelemetry_DeleteAddressResponse, DeleteAddressResponse__Output as _nexuraTelemetry_DeleteAddressResponse__Output } from '../nexuraTelemetry/DeleteAddressResponse';
import type { Empty as _nexuraTelemetry_Empty, Empty__Output as _nexuraTelemetry_Empty__Output } from '../nexuraTelemetry/Empty';
import type { GetAddressesRequest as _nexuraTelemetry_GetAddressesRequest, GetAddressesRequest__Output as _nexuraTelemetry_GetAddressesRequest__Output } from '../nexuraTelemetry/GetAddressesRequest';
import type { GetAddressesResponse as _nexuraTelemetry_GetAddressesResponse, GetAddressesResponse__Output as _nexuraTelemetry_GetAddressesResponse__Output } from '../nexuraTelemetry/GetAddressesResponse';
import type { GetCountriesResponse as _nexuraTelemetry_GetCountriesResponse, GetCountriesResponse__Output as _nexuraTelemetry_GetCountriesResponse__Output } from '../nexuraTelemetry/GetCountriesResponse';
import type { GetDistrictsByProvinceRequest as _nexuraTelemetry_GetDistrictsByProvinceRequest, GetDistrictsByProvinceRequest__Output as _nexuraTelemetry_GetDistrictsByProvinceRequest__Output } from '../nexuraTelemetry/GetDistrictsByProvinceRequest';
import type { GetDistrictsResponse as _nexuraTelemetry_GetDistrictsResponse, GetDistrictsResponse__Output as _nexuraTelemetry_GetDistrictsResponse__Output } from '../nexuraTelemetry/GetDistrictsResponse';
import type { GetProvincesByCountryRequest as _nexuraTelemetry_GetProvincesByCountryRequest, GetProvincesByCountryRequest__Output as _nexuraTelemetry_GetProvincesByCountryRequest__Output } from '../nexuraTelemetry/GetProvincesByCountryRequest';
import type { GetProvincesResponse as _nexuraTelemetry_GetProvincesResponse, GetProvincesResponse__Output as _nexuraTelemetry_GetProvincesResponse__Output } from '../nexuraTelemetry/GetProvincesResponse';
import type { GetWardsByDistrictRequest as _nexuraTelemetry_GetWardsByDistrictRequest, GetWardsByDistrictRequest__Output as _nexuraTelemetry_GetWardsByDistrictRequest__Output } from '../nexuraTelemetry/GetWardsByDistrictRequest';
import type { GetWardsResponse as _nexuraTelemetry_GetWardsResponse, GetWardsResponse__Output as _nexuraTelemetry_GetWardsResponse__Output } from '../nexuraTelemetry/GetWardsResponse';
import type { UpdateAddressRequest as _nexuraTelemetry_UpdateAddressRequest, UpdateAddressRequest__Output as _nexuraTelemetry_UpdateAddressRequest__Output } from '../nexuraTelemetry/UpdateAddressRequest';

export interface AddressServiceClient extends grpc.Client {
  AddAddress(argument: _nexuraTelemetry_AddAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  AddAddress(argument: _nexuraTelemetry_AddAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  AddAddress(argument: _nexuraTelemetry_AddAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  AddAddress(argument: _nexuraTelemetry_AddAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  addAddress(argument: _nexuraTelemetry_AddAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  addAddress(argument: _nexuraTelemetry_AddAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  addAddress(argument: _nexuraTelemetry_AddAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  addAddress(argument: _nexuraTelemetry_AddAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  DeleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  DeleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  DeleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  deleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  deleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  deleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  deleteAddress(argument: _nexuraTelemetry_DeleteAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteAddressResponse__Output>): grpc.ClientUnaryCall;
  
  GetAddresses(argument: _nexuraTelemetry_GetAddressesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  GetAddresses(argument: _nexuraTelemetry_GetAddressesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  GetAddresses(argument: _nexuraTelemetry_GetAddressesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  GetAddresses(argument: _nexuraTelemetry_GetAddressesRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  getAddresses(argument: _nexuraTelemetry_GetAddressesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  getAddresses(argument: _nexuraTelemetry_GetAddressesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  getAddresses(argument: _nexuraTelemetry_GetAddressesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  getAddresses(argument: _nexuraTelemetry_GetAddressesRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetAddressesResponse__Output>): grpc.ClientUnaryCall;
  
  GetCountries(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  GetCountries(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  GetCountries(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  GetCountries(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  getCountries(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  getCountries(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  getCountries(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  getCountries(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_GetCountriesResponse__Output>): grpc.ClientUnaryCall;
  
  GetDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  GetDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  GetDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  GetDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  getDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  getDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  getDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  getDistrictsByProvince(argument: _nexuraTelemetry_GetDistrictsByProvinceRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetDistrictsResponse__Output>): grpc.ClientUnaryCall;
  
  GetProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  GetProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  GetProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  GetProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  getProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  getProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  getProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  getProvincesByCountry(argument: _nexuraTelemetry_GetProvincesByCountryRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetProvincesResponse__Output>): grpc.ClientUnaryCall;
  
  GetWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  GetWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  GetWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  GetWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  getWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  getWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  getWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  getWardsByDistrict(argument: _nexuraTelemetry_GetWardsByDistrictRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetWardsResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  UpdateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  UpdateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  UpdateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  updateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  updateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  updateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  updateAddress(argument: _nexuraTelemetry_UpdateAddressRequest, callback: grpc.requestCallback<_nexuraTelemetry_AddressResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AddressServiceHandlers extends grpc.UntypedServiceImplementation {
  AddAddress: grpc.handleUnaryCall<_nexuraTelemetry_AddAddressRequest__Output, _nexuraTelemetry_AddressResponse>;
  
  DeleteAddress: grpc.handleUnaryCall<_nexuraTelemetry_DeleteAddressRequest__Output, _nexuraTelemetry_DeleteAddressResponse>;
  
  GetAddresses: grpc.handleUnaryCall<_nexuraTelemetry_GetAddressesRequest__Output, _nexuraTelemetry_GetAddressesResponse>;
  
  GetCountries: grpc.handleUnaryCall<_nexuraTelemetry_Empty__Output, _nexuraTelemetry_GetCountriesResponse>;
  
  GetDistrictsByProvince: grpc.handleUnaryCall<_nexuraTelemetry_GetDistrictsByProvinceRequest__Output, _nexuraTelemetry_GetDistrictsResponse>;
  
  GetProvincesByCountry: grpc.handleUnaryCall<_nexuraTelemetry_GetProvincesByCountryRequest__Output, _nexuraTelemetry_GetProvincesResponse>;
  
  GetWardsByDistrict: grpc.handleUnaryCall<_nexuraTelemetry_GetWardsByDistrictRequest__Output, _nexuraTelemetry_GetWardsResponse>;
  
  UpdateAddress: grpc.handleUnaryCall<_nexuraTelemetry_UpdateAddressRequest__Output, _nexuraTelemetry_AddressResponse>;
  
}

export interface AddressServiceDefinition extends grpc.ServiceDefinition {
  AddAddress: MethodDefinition<_nexuraTelemetry_AddAddressRequest, _nexuraTelemetry_AddressResponse, _nexuraTelemetry_AddAddressRequest__Output, _nexuraTelemetry_AddressResponse__Output>
  DeleteAddress: MethodDefinition<_nexuraTelemetry_DeleteAddressRequest, _nexuraTelemetry_DeleteAddressResponse, _nexuraTelemetry_DeleteAddressRequest__Output, _nexuraTelemetry_DeleteAddressResponse__Output>
  GetAddresses: MethodDefinition<_nexuraTelemetry_GetAddressesRequest, _nexuraTelemetry_GetAddressesResponse, _nexuraTelemetry_GetAddressesRequest__Output, _nexuraTelemetry_GetAddressesResponse__Output>
  GetCountries: MethodDefinition<_nexuraTelemetry_Empty, _nexuraTelemetry_GetCountriesResponse, _nexuraTelemetry_Empty__Output, _nexuraTelemetry_GetCountriesResponse__Output>
  GetDistrictsByProvince: MethodDefinition<_nexuraTelemetry_GetDistrictsByProvinceRequest, _nexuraTelemetry_GetDistrictsResponse, _nexuraTelemetry_GetDistrictsByProvinceRequest__Output, _nexuraTelemetry_GetDistrictsResponse__Output>
  GetProvincesByCountry: MethodDefinition<_nexuraTelemetry_GetProvincesByCountryRequest, _nexuraTelemetry_GetProvincesResponse, _nexuraTelemetry_GetProvincesByCountryRequest__Output, _nexuraTelemetry_GetProvincesResponse__Output>
  GetWardsByDistrict: MethodDefinition<_nexuraTelemetry_GetWardsByDistrictRequest, _nexuraTelemetry_GetWardsResponse, _nexuraTelemetry_GetWardsByDistrictRequest__Output, _nexuraTelemetry_GetWardsResponse__Output>
  UpdateAddress: MethodDefinition<_nexuraTelemetry_UpdateAddressRequest, _nexuraTelemetry_AddressResponse, _nexuraTelemetry_UpdateAddressRequest__Output, _nexuraTelemetry_AddressResponse__Output>
}
