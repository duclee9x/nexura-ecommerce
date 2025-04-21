import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { GetDistrictsByProvinceRequest, GetDistrictsResponse } from '@nexura/common/protos';
import { PrismaClient } from '../../db/prisma-client'

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
    console.error('Error fetching districts:', error);
    callback(error as Error, null);
  }
} 