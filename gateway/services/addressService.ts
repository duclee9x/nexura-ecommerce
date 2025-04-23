import { AddressServiceClient, Address, ExtendedAddress, Country, Province, District, DeleteAddressRequest } from '@nexura/grpc_gateway/protos';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const addressConfig = createServiceConfig('AddressService', 50051);
const addressClient = createClient(AddressServiceClient, addressConfig);

export const addressService = {
    getCountries: async (): Promise<DefaultResponse & { countries: Country[] }> => {
        return promisifyGrpcCall(addressClient, 'getCountries', {});
    },

    getProvincesByCountry: async (countryId: string): Promise<DefaultResponse & { provinces: Province[] }> => {
        return promisifyGrpcCall(addressClient, 'getProvincesByCountry', { countryId });
    },

    getDistrictsByProvince: async (provinceId: string): Promise<DefaultResponse & { districts: District[] }> => {
        return promisifyGrpcCall(addressClient, 'getDistrictsByProvince', { provinceId });
    },

    getWardsByDistrict: async (districtId: string): Promise<DefaultResponse & { wards: any[] }> => {
        return promisifyGrpcCall(addressClient, 'getWardsByDistrict', { districtId });
    },

    addAddress: async (address: Address, userId: string): Promise<DefaultResponse & { address: ExtendedAddress }> => {
        return promisifyGrpcCall(addressClient, 'addAddress', { address, userId });
    },

    updateAddress: async (address: ExtendedAddress, userId: string): Promise<DefaultResponse & { address: ExtendedAddress }> => {
        return promisifyGrpcCall(addressClient, 'updateAddress', { address, userId });
    },

    deleteAddress: async (deleteAddressRequest: DeleteAddressRequest): Promise<DefaultResponse> => {
        return promisifyGrpcCall(addressClient, 'deleteAddress', { deleteAddressRequest });
    },

    getAddresses: async (userId: string): Promise<DefaultResponse & { addresses: ExtendedAddress[] }> => {
        return promisifyGrpcCall(addressClient, 'getAddresses', { userId });
    }
}; 