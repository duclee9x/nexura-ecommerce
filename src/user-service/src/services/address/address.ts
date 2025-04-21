import type { UntypedServiceImplementation } from '@grpc/grpc-js';
import { getCountries } from './address-get-countries';
import { getProvincesByCountry } from './address-get-provinces';
import { getDistrictsByProvince } from './address-get-districts';
import { getWardsByDistrict } from './address-get-wards';
import { addAddress } from './address-add';
import { updateAddress } from './address-update';
import { deleteAddress } from './address-delete';
import { getAddresses } from './address-get-addresses';

export const addressService: UntypedServiceImplementation = {
  getCountries,
  getProvincesByCountry,
  getDistrictsByProvince,
  getWardsByDistrict,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses
} 