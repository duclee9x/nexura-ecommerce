import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { GetBatchAddressesRequest, GetBatchAddressesResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '../../db/prisma-client'
import { defaultTracer, handleError, SpanStatusCode } from '@nexura/common/utils';

const prisma = new PrismaClient()

export async function getBatchAddresses(
  call: ServerUnaryCall<GetBatchAddressesRequest, GetBatchAddressesResponse>,
  callback: sendUnaryData<GetBatchAddressesResponse>
): Promise<void> {
  try {
    const tracer = defaultTracer('getAddresses');
    const { addressIds } = call.request;
    if (!addressIds) {
      callback(null, {
        addresses: []
      });
      return;
    }
    const GetAddressesSpan = tracer.startSpan("Get Address");
    const addresses = await prisma.address.findMany({
      where: {
        id: { in: addressIds }
      },
      include: {
        country: {
            select: {
                id: true,
                codeName: true
            }
        },
        vnProvince: {
            select: {
                id: true,
                fullName: true
            }
        },
        vnDistrict: {
            select: {
                id: true,
                fullName: true
            }
        },
        vnWard: {
            select: {
                id: true,
                fullName: true
            }
        }
      }
    });
    GetAddressesSpan.setStatus({
      code: SpanStatusCode.OK,
      message: 'Addresses fetched successfully'
    });
    GetAddressesSpan.end();
    if (!addresses) {
      callback(null, {
        addresses: []
      });
      return;
    }
    callback(null, {
      addresses: addresses.map((address) => ({
        id: address.id,
        name: address.name,
        street: address.street,
        city: address.city || '',
        state: address.state || '',
        countryId: address.countryId.toString(),
        zip: address.zip || '',
        vnProvinceId: address.vnProvinceId?.toString() || '',
        vnDistrictId: address.vnDistrictId?.toString() || '',
        vnWardId: address.vnWardId?.toString() || '',
        isDefault: address.isDefault,
        createdAt: address.createdAt.toISOString(),
        updatedAt: address.updatedAt.toISOString(),
        countryName: address.country?.codeName || '',
        vnProvinceName: address.vnProvince?.fullName || '',
        vnDistrictName: address.vnDistrict?.fullName || '',
        vnWardName: address.vnWard?.fullName || ''
      }))
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 