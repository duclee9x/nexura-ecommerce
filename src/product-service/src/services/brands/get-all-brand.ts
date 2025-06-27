import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import { GetAllBrandResponse, Empty } from '@nexura/grpc_gateway/protos'
import type { ServerUnaryCall, sendUnaryData, ServiceError } from '@grpc/grpc-js'
import { status } from '@grpc/grpc-js'
const prisma = new PrismaClient()

export const getAllBrand = async (call: ServerUnaryCall<Empty, GetAllBrandResponse>, callback: sendUnaryData<GetAllBrandResponse>) => {
  try {
    

    // Fetch brands with error handling for the query
    const brands = await prisma.brand.findMany({
      select: {
        id: true,
        name: true,
        logo: true,
      },
      orderBy: {
        name: 'asc',
      },
    }).catch((error) => {
      console.error('Database query failed:', error);
      throw new Error('Failed to fetch brands from database');
    });

    // Handle empty result (not an error, just no brands found)
    if (!brands || brands.length === 0) {
      return callback(null, {
        success: true,
        message: 'No brands found',
        brands: [],
      });
    }

    // Prepare response
    const response = {
      success: true,
      message: 'Brands retrieved successfully',
      brands: brands.map(brand => ({
        id: brand.id,
        name: brand.name,
        logo: brand.logo || '',
      })),
    };

    console.log("response", response);
    callback(null, response);
  } catch (error) {
    console.error('Error in getAllBrand:', error);
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('database')) {
        return callback({
          code: status.UNAVAILABLE,
          message: 'Database service unavailable',
        });
      }
    }
    
    // Fallback error handling
    handleError(error as ServiceError, callback);
  }
}