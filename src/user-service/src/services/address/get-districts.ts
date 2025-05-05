import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetDistrictsByProvinceRequest, GetDistrictsResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils';

const prisma = new PrismaClient()

export async function getDistrictsByProvince(
  call: ServerUnaryCall<GetDistrictsByProvinceRequest, GetDistrictsResponse>,
  callback: sendUnaryData<GetDistrictsResponse>
): Promise<void> {
  try {
    const { provinceId } = call.request;
    
    const districtsQuery = await prisma.addressDistricts.findMany({
      where: {
        provinceCode: provinceId
      },
      select: {
        id: true,
        name: true,
        nameEn: true,
        fullName: true,
        fullNameEn: true,
        provinceCode: true,
        administrativeUnitId: true
      }
    });

    const districts = districtsQuery.map(district => ({
      id: district.id,
      name: district.name,
      nameEn: district.nameEn,
      fullName: district.fullName,
      fullNameEn: district.fullNameEn,
      provinceId: district.provinceCode,
      administrativeUnitId: district.administrativeUnitId
    }));

    callback(null, { 
      success: true,
      message: 'Districts fetched successfully',
      districts
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 