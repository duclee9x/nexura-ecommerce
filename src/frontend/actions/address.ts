'use server'

import { getCountriesGateway, getProvincesByCountryGateway, getWardsByDistrictGateway, getDistrictsByProvinceGateway, addAddressGateway, updateAddressGateway, deleteAddressGateway } from "@/gateway/gateway"
import { getCurrentUserId } from "./auth"
import { Address, DeleteAddressRequest, ExtendedAddress } from "@/protos/nexura"

export async function getCountries() {
    const countries = await getCountriesGateway()
    return countries
}

export async function getProvincesByCountry(countryId: string) {
    const provinces = await getProvincesByCountryGateway(countryId)
    return provinces
}

export async function getDistrictsByProvince(provinceId: string) {
    const districts = await getDistrictsByProvinceGateway(provinceId)
    return districts
}

export async function getWardsByDistrict(districtId: string) {
    const wards = await getWardsByDistrictGateway(districtId)
    return wards
}

export async function addAddress(address: Address, userId: string | undefined) {
    try {
        if (!userId) {
            return { success: false, message: "User not authenticated", address: null }
        }
        const result = await addAddressGateway(userId, address)
        return result
    } catch (error) {
        console.error("Error adding address:", error)
        return { success: false, message: "Failed to add address", address: null }
    }
}

export async function updateAddress(address: ExtendedAddress, userId: string | undefined) {
    try {
        if (!userId) {
            return { success: false, message: "User not authenticated", address: null }
        }
        const result = await updateAddressGateway(userId, address)
        return result
    } catch (error) {
        console.error("Error updating address:", error)
        return { success: false, message: "Failed to update address", address: null }
    }
}

export async function deleteAddress(deleteAddressRequest: DeleteAddressRequest) {
    try {
        if (!deleteAddressRequest.userId) {
            return { success: false, message: "User not authenticated", addressId: "" }
        }
        
        const result = await deleteAddressGateway(deleteAddressRequest)
        return result
    } catch (error) {
        console.error("Error deleting address:", error)
        return { success: false, message: "Failed to delete address", addressId: "" }
    }
}
