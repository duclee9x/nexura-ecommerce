import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetProvincesByCountryRequest, GetProvincesResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils';

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
        id:                     true,
        name:                   true,
        nameEn:                 true,
        fullName:               true,
        fullNameEn:             true,
        administrativeUnitId:   true,
        administrativeRegionId: true,
        countryId:              true
      }
    });

    const provinces = provincesQuery.map(province => ({
      id:                     province.id,
      name:                   province.name,
      nameEn:                 province.nameEn,
      fullName:               province.fullName,
      fullNameEn:             province.fullNameEn,
      administrativeUnitId:   province.administrativeUnitId,
      administrativeRegionId: province.administrativeRegionId,
      countryId:              province.countryId
    }));

    callback(null, { 
      success: true,
      message: 'Provinces fetched successfully',
      provinces
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 