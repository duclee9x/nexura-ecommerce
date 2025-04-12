import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { GetProvincesByCountryRequest, GetProvincesResponse, Province } from '../../proto/nexura';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getProvincesByCountry(
  call: ServerUnaryCall<GetProvincesByCountryRequest, GetProvincesResponse>,
  callback: sendUnaryData<GetProvincesResponse>
): Promise<void> {
  try {
    const { countryId } = call.request;
    
    const provincesQuery = await prisma.addressProvinces.findMany({
      where: {
        countryId
      },
      select: {
        id: true,
        name: true,
        nameEn: true,
        fullName: true,
        fullNameEn: true,
        administrativeUnitId: true,
        administrativeRegionId: true,
        countryId: true
      }
    });

    const provinces = provincesQuery.map(province => ({
      id: province.id,
      name: province.name,
      nameEn: province.nameEn,
      fullName: province.fullName,
      fullNameEn: province.fullNameEn,
      administrativeUnitId: province.administrativeUnitId,
      administrativeRegionId: province.administrativeRegionId,
      countryId: province.countryId
    }));

    callback(null, { 
      success: true,
      message: 'Provinces fetched successfully',
      provinces
    });
  } catch (error) {
    console.error('Error fetching provinces:', error);
    callback(error as Error, null);
  }
} 