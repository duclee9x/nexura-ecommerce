import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { AddAddressRequest, AddressResponse } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '../../db/prisma-client';
import { defaultTracer, handleError, withTracing } from '@nexura/common/utils';
import { AddAndUpdateAddressSchema } from './validator-address';

const prisma = new PrismaClient()

export async function addAddress(
  call: ServerUnaryCall<AddAddressRequest, AddressResponse>,
  callback: sendUnaryData<AddressResponse>
): Promise<void> {
  try {
    const { userId, address } = call.request;
    if (!address) {
      callback(null, {
        success: false,
        message: 'Address is required',
        address: undefined
      });
      return;
    }
    const tracer = defaultTracer('addAddress');
    const validatedData = await withTracing(tracer, 'Validate Request', async (span) => {
      const result = AddAndUpdateAddressSchema.safeParse({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        countryId: address.countryId,
        zip: address.zip,
        vnProvinceId: address.vnProvinceId,
        vnDistrictId: address.vnDistrictId,
        vnWardId: address.vnWardId,
        isDefault: address.isDefault,
        createdAt: address.createdAt,
        updatedAt: address.updatedAt
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
    const newAddress = await prisma.address.create({
      data: {
        userId: userId,
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
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    callback(null, {
      success: true,
      message: 'Address added successfully',
      address: {
        id: newAddress.id,
        name: newAddress.name,
        street: newAddress.street,
        city: newAddress.city || '',
        state: newAddress.state || '',
        countryId: newAddress.countryId,
        zip: newAddress.zip || '',
        vnProvinceId: newAddress.vnProvinceId || '',
        vnDistrictId: newAddress.vnDistrictId || '',
        vnWardId: newAddress.vnWardId || '',
        isDefault: newAddress.isDefault,
        createdAt: newAddress.createdAt.toISOString(),
        updatedAt: newAddress.updatedAt.toISOString()
      }
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 