import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js';
import type { Empty, GetCountriesResponse, Country } from '@nexura/grpc_gateway/protos';
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { handleError } from '@nexura/common/utils';

const prisma = new PrismaClient()

export async function getCountries(
  call: ServerUnaryCall<Empty, GetCountriesResponse>,
  callback: sendUnaryData<GetCountriesResponse>
): Promise<void> {
  try {
    const countriesQuery = await prisma.country.findMany({
      select: {
        id:       true,
        name:     true,
        codeName: true
      }
    });

    const countries = countriesQuery.map((country) => {
      const countryObj: Country = {
        id:       country.id,
        name:     country.name,
        codeName: country.codeName
      };
      return countryObj;
    });

    callback(null, {
      success: true,
      message: 'Countries fetched successfully',
      countries
    });
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
} 