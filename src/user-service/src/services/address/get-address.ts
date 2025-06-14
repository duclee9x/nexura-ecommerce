import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetAddressRequest, GetAddressResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { api, handleError, SpanStatusCode } from '@nexura/common/utils';
import { Status } from '@grpc/grpc-js/build/src/constants';

const prisma = new PrismaClient()

export async function getAddress(
  call: ServerUnaryCall<GetAddressRequest, GetAddressResponse>,
  callback: sendUnaryData<GetAddressResponse>
): Promise<void> {
  try {
    const tracer = api.trace.getTracer('getAddresses');
    const { addressId } = call.request;
    if (!addressId) {
      callback({
        code:    Status.INVALID_ARGUMENT,
        message: 'Address ID is required'
      });
      return;
    }
    const GetAddressesSpan = tracer.startSpan("Get Address");
    const address = await prisma.address.findUnique({
      where: {
        id: addressId
      },
      include: {
        country: {
          select: {
            id:   true,
            name: true
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
    if (!address) {
      callback({
        code:    Status.NOT_FOUND,
        message: 'Address not found'
      });
      return;
    }
    callback(null, {
      address: {
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
        countryName:    address.country?.name || '',
        vnProvinceName: address.vnProvince?.fullName || '',
        vnDistrictName: address.vnDistrict?.fullName || '',
        vnWardName:     address.vnWard?.fullName || ''
      }
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 