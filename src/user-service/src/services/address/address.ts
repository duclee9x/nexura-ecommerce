import type { UntypedServiceImplementation } from '@grpc/grpc-js';
import { getCountries } from './get-countries';
import { getProvincesByCountry } from './get-provinces';
import { getDistrictsByProvince } from './get-districts';
import { getWardsByDistrict } from './get-wards';
import { addAddress } from './add-address';
import { updateAddress } from './update-address';
import { deleteAddress } from './delete-address';
import { getAddresses } from './get-addresses';
import { getAddress } from './get-address';
import { getBatchAddresses } from './get-batch-addresses';
export const addressService: UntypedServiceImplementation = {
  getCountries,
  getProvincesByCountry,
  getDistrictsByProvince,
  getWardsByDistrict,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddress,
  getBatchAddresses
} 