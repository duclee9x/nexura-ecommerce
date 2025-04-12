import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { GetWardsByDistrictRequest, GetWardsResponse, Ward } from '../../proto/nexura';
import { PrismaClient } from '@prisma/client'

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
                id: true,
                name: true,
                nameEn: true,
                fullName: true,
                fullNameEn: true,
                districtId: true,
                administrativeUnitId: true
            }
        });

        const wards = wardsQuery.map(ward => ({
            id: ward.id,
            name: ward.name,
            nameEn: ward.nameEn,
            fullName: ward.fullName,
            fullNameEn: ward.fullNameEn,
            districtId: ward.districtId,
            administrativeUnitId: ward.administrativeUnitId
        }));

        callback(null, { 
            success: true,
            message: 'Wards fetched successfully',
            wards
         });
    } catch (error) {
        console.error('Error fetching wards:', error);
        callback(error as Error, null);
    }
} 