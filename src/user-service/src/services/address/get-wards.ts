import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetWardsByDistrictRequest, GetWardsResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils';

const prisma = new PrismaClient()

export async function getWardsByDistrict(
  call: ServerUnaryCall<GetWardsByDistrictRequest, GetWardsResponse>,
  callback: sendUnaryData<GetWardsResponse>
): Promise<void> {
  try {
    const { districtId } = call.request;

    const wardsQuery = await prisma.addressWards.findMany({
      where: {
        districtId
      },
      select: {
        id:                   true,
        name:                 true,
        nameEn:               true,
        fullName:             true,
        fullNameEn:           true,
        districtId:           true,
        administrativeUnitId: true
      }
    });

    const wards = wardsQuery.map(ward => ({
      id:                   ward.id,
      name:                 ward.name,
      nameEn:               ward.nameEn,
      fullName:             ward.fullName,
      fullNameEn:           ward.fullNameEn,
      districtId:           ward.districtId,
      administrativeUnitId: ward.administrativeUnitId
    }));

    callback(null, { 
      success: true,
      message: 'Wards fetched successfully',
      wards
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 