import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetAddressesRequest, GetAddressesResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { api, handleError, SpanStatusCode } from '@nexura/common/utils';

const prisma = new PrismaClient()

export async function getAddresses(
  call: ServerUnaryCall<GetAddressesRequest, GetAddressesResponse>,
  callback: sendUnaryData<GetAddressesResponse>
): Promise<void> {
  try {
    const tracer = api.trace.getTracer('getAddresses');
    const { userId } = call.request;
    if (!userId) {
      callback(null, {
        success:   false,
        message:   'User ID is required',
        addresses: []
      });
      return;
    }
    const GetAddressesSpan = tracer.startSpan("Get Address");
    const addresses = await prisma.address.findMany({
      where: {
        userId: userId
      },
      include: {
        country: {
          select: {
            id:       true,
            codeName: true
          }
        },
        vnProvince: {
          select: {
            id:       true,
            fullName: true
          }
        },
        vnDistrict: {
          select: {
            id:       true,
            fullName: true
          }
        },
        vnWard: {
          select: {
            id:       true,
            fullName: true
          }
        }
      }
    });
    GetAddressesSpan.setStatus({
      code:    SpanStatusCode.OK,
      message: 'Addresses fetched successfully'
    });
    GetAddressesSpan.end();
    if (!addresses) {
      callback(null, {
        success:   false,
        message:   'Address not found',
        addresses: []
      });
      return;
    }
    callback(null, {
      success:   true,
      message:   'Address fetched successfully',
      addresses: addresses.map(address => ({
        id:             address.id,
        name:           address.name,
        street:         address.street,
        city:           address.city || '',
        state:          address.state || '',
        countryId:      address.countryId.toString(),
        zip:            address.zip || '',
        vnProvinceId:   address.vnProvinceId?.toString() || '',
        vnDistrictId:   address.vnDistrictId?.toString() || '',
        vnWardId:       address.vnWardId?.toString() || '',
        isDefault:      address.isDefault,
        createdAt:      address.createdAt.toISOString(),
        updatedAt:      address.updatedAt.toISOString(),
        countryName:    address.country?.codeName || '',
        vnProvinceName: address.vnProvince?.fullName || '',
        vnDistrictName: address.vnDistrict?.fullName || '',
        vnWardName:     address.vnWard?.fullName || ''
      }))
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 