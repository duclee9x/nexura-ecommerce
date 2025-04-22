import { AddressServiceClient, Address, ExtendedAddress, DeleteAddressRequest, GetCountriesResponse, GetProvincesResponse, GetDistrictsResponse, GetWardsResponse, AddressResponse, DeleteAddressResponse, GetAddressesResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const addressConfig = createServiceConfig('AddressService', 50051);
const addressClient = createClient(AddressServiceClient, addressConfig);

export const addressService = {
    getCountries: async (): Promise<GetCountriesResponse> => {
        return promisifyGrpcCall(addressClient, 'getCountries', {});
    },

    getProvincesByCountry: async (countryId: string): Promise<GetProvincesResponse> => {
        return promisifyGrpcCall(addressClient, 'getProvincesByCountry', { countryId });
    },

    getDistrictsByProvince: async (provinceId: string): Promise<GetDistrictsResponse> => {
        return promisifyGrpcCall(addressClient, 'getDistrictsByProvince', { provinceId });
    },

    getWardsByDistrict: async (districtId: string): Promise<GetWardsResponse> => {
        return promisifyGrpcCall(addressClient, 'getWardsByDistrict', { districtId });
    },

    addAddress: async (address: Address, userId: string): Promise<AddressResponse> => {
        return promisifyGrpcCall(addressClient, 'addAddress', { address, userId });
    },

    updateAddress: async (address: ExtendedAddress, userId: string): Promise<AddressResponse> => {
        return promisifyGrpcCall(addressClient, 'updateAddress', { address, userId });
    },

    deleteAddress: async (deleteAddressRequest: DeleteAddressRequest): Promise<DeleteAddressResponse> => {
        return promisifyGrpcCall(addressClient, 'deleteAddress', { deleteAddressRequest });
    },

    getAddresses: async (userId: string): Promise<GetAddressesResponse> => {
        return promisifyGrpcCall(addressClient, 'getAddresses', { userId });
    }
}; 