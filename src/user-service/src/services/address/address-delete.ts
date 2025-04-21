import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { DeleteAddressRequest, DeleteAddressResponse } from '@nexura/common/protos';
import { PrismaClient } from '../../db/prisma-client'
import { defaultTracer, withTracing } from '@nexura/common/utils';
import { DeleteAddressSchema } from './address-validator';

const prisma = new PrismaClient()

export async function deleteAddress(
  call: ServerUnaryCall<DeleteAddressRequest, DeleteAddressResponse>,
  callback: sendUnaryData<DeleteAddressResponse>
): Promise<void> {
  try {
    const { addressId } = call.request;
    if (!addressId) {
      callback(null, {
        success: false,
        message: 'Address ID is required',
      });
      return;
    }

    const tracer = defaultTracer('deleteAddress');
    const validatedData = await withTracing(tracer, 'Validate Request', async (span) => {
      const result = DeleteAddressSchema.safeParse({
        addressId: addressId
      });

      if (!result.success) {
        callback(null, {
          success: false,
          message: 'Invalid request data: ' + result.error.message,
        });
        return null;
      }
      return result.data;
    });

    if (!validatedData) return;

    const deletedAddress = await prisma.address.delete({
      where: {
        id: validatedData.addressId
      }
    });
    if (!deletedAddress) {
      callback(null, {
        success: false,
        message: 'Address not found',
      });
      return;
    }
    callback(null, {
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting address:', error);
    callback(error as Error, null);
  }
} 