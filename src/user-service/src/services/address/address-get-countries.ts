import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import type { Empty, GetCountriesResponse } from '@nexura/common/protos';
import type { Country } from '@prisma/client'
import { PrismaClient } from '../../db/prisma-client';

const prisma = new PrismaClient()

export async function getCountries(
  call: ServerUnaryCall<Empty, GetCountriesResponse>,
  callback: sendUnaryData<GetCountriesResponse>
): Promise<void> {
  try {
    const countriesQuery = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
        codeName: true
      }
    });

    const countries = countriesQuery.map(country => {
      const countryObj: Country = {
        id: country.id,
        name: country.name,
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
    console.error('Error fetching countries:', error);
    callback(error as Error, null);
  }
} 