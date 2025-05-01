import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { AddressResponse, UpdateAddressRequest } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '../../db/prisma-client';
import { defaultTracer, handleError, withTracing } from '@nexura/common/utils';
import { AddAndUpdateAddressSchema } from './validator-address';

const prisma = new PrismaClient()

export async function updateAddress(
  call: ServerUnaryCall<UpdateAddressRequest, AddressResponse>,
  callback: sendUnaryData<AddressResponse>
): Promise<void> {
  try {
    const { userId, address } = call.request;
    if (!address || !address.id) {
      callback(null, {
        success: false,
        message: 'Address is required',
        address: undefined
      });
      return;
    }
    const tracer = defaultTracer('updateAddress');
    const validatedData = await withTracing(tracer, 'Validate Request', async (span) => {
      const result = AddAndUpdateAddressSchema.safeParse({
        id: address.id,
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        countryId: address.countryId,
        zip: address.zip,
        vnProvinceId: address.vnProvinceId,
        vnDistrictId: address.vnDistrictId,
        vnWardId: address.vnWardId,
        isDefault: address.isDefault
      });

      if (!result.success) {
        callback(null, {
          success: false,
          message: 'Invalid request data: ' + result.error.message,
          address: undefined
        });
        return null;
      }
      return result.data;
    });
    if (!validatedData) return;
    
    if (validatedData.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: userId
        },
        data: {
          isDefault: false
        }
      });
    }

    const updatedAddress = await prisma.address.update({
      where: {
        id: validatedData.id ? validatedData.id : undefined
      },
      data: {
        name: validatedData.name,
        street: validatedData.street,
        city: validatedData.city || null,
        state: validatedData.state || null,
        zip: validatedData.zip || null,
        countryId: validatedData.countryId,
        vnProvinceId: validatedData.vnProvinceId || null,
        vnDistrictId: validatedData.vnDistrictId || null,
        vnWardId: validatedData.vnWardId || null,
        isDefault: validatedData.isDefault,
        updatedAt: new Date()
      }
    });

    callback(null, {
      success: true,
      message: 'Address updated successfully',
      address: {
        id: updatedAddress.id.toString(),
        name: updatedAddress.name,
        street: updatedAddress.street,
        city: updatedAddress.city || '',
        state: updatedAddress.state || '',
        countryId: updatedAddress.countryId.toString(),
        zip: updatedAddress.zip || '',
        vnProvinceId: updatedAddress.vnProvinceId?.toString() || '',
        vnDistrictId: updatedAddress.vnDistrictId?.toString() || '',
        vnWardId: updatedAddress.vnWardId?.toString() || '',
        isDefault: updatedAddress.isDefault,
        createdAt: updatedAddress.createdAt.toISOString(),
        updatedAt: updatedAddress.updatedAt.toISOString()
      }
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 