import { AddressServiceClient, GetAddressRequest, GetAddressResponse, DeleteAddressRequest, GetCountriesResponse, GetProvincesResponse, GetDistrictsResponse, GetWardsResponse, AddressResponse, DeleteAddressResponse, GetAddressesResponse, GetProvincesByCountryRequest, GetDistrictsByProvinceRequest, GetWardsByDistrictRequest, AddAddressRequest, UpdateAddressRequest, GetAddressesRequest, GetBatchAddressesResponse, GetBatchAddressesRequest } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const addressConfig = createServiceConfig('AddressService', 50051);
const addressClient = createClient(AddressServiceClient, addressConfig);

export const addressService = {
    getCountries: async (): Promise<GetCountriesResponse> => {
        return promisifyGrpcCall(addressClient, 'getCountries', {});
    },

    getProvincesByCountry: async (getProvincesByCountryRequest: GetProvincesByCountryRequest): Promise<GetProvincesResponse> => {
        return promisifyGrpcCall(addressClient, 'getProvincesByCountry', getProvincesByCountryRequest);
    },

    getDistrictsByProvince: async (getDistrictsByProvinceRequest: GetDistrictsByProvinceRequest): Promise<GetDistrictsResponse> => {
        return promisifyGrpcCall(addressClient, 'getDistrictsByProvince', getDistrictsByProvinceRequest);
    },

    getWardsByDistrict: async (getWardsByDistrictRequest: GetWardsByDistrictRequest): Promise<GetWardsResponse> => {
        return promisifyGrpcCall(addressClient, 'getWardsByDistrict', getWardsByDistrictRequest);
    },

    addAddress: async (addAddressRequest: AddAddressRequest): Promise<AddressResponse> => {
        return promisifyGrpcCall(addressClient, 'addAddress', addAddressRequest);
    },

    updateAddress: async (updateAddressRequest: UpdateAddressRequest): Promise<AddressResponse> => {
        return promisifyGrpcCall(addressClient, 'updateAddress', updateAddressRequest);
    },

    deleteAddress: async (deleteAddressRequest: DeleteAddressRequest): Promise<DeleteAddressResponse> => {
        return promisifyGrpcCall(addressClient, 'deleteAddress', deleteAddressRequest);
    },

    getAddresses: async (getAddressesRequest: GetAddressesRequest): Promise<GetAddressesResponse> => {
        return promisifyGrpcCall(addressClient, 'getAddresses', getAddressesRequest);
    },

    getAddress: async (getAddressRequest: GetAddressRequest): Promise<GetAddressResponse> => {
        return promisifyGrpcCall(addressClient, 'getAddress', getAddressRequest);
    },

    getBatchAddresses: async (getBatchAddressesRequest: GetBatchAddressesRequest): Promise<GetBatchAddressesResponse> => {
        return promisifyGrpcCall(addressClient, 'getBatchAddresses', getBatchAddressesRequest);
    }
}; 