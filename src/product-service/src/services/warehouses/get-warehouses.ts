import { PrismaClient } from '@prisma/client'
import { handleError } from '../../utils/error'
import { sendUnaryData } from '@grpc/grpc-js'
import { Empty, GetAllCategoryResponse, GetWarehousesResponse } from '@/src/proto/nexura'
import { ServerUnaryCall } from '@grpc/grpc-js'

const prisma = new PrismaClient()

export const getWarehouses = async (call: ServerUnaryCall<Empty, GetWarehousesResponse>, callback: sendUnaryData<GetWarehousesResponse>) => {
  try {
    const warehouses = await prisma.warehouse.findMany()

    if (!warehouses) {
      throw new Error("Warehouse not found")
    }

    const response: GetWarehousesResponse = {
      warehouses: warehouses.map((warehouse) => ({
        id: warehouse.id,
        name: warehouse.name,
        code: warehouse.code,
        location: warehouse.location,
        address: warehouse.address,
        manager: warehouse.manager,
        contact: warehouse.contact,
        status: warehouse.status,
        totalProducts: warehouse.totalProducts,
        createdAt: warehouse.createdAt.toISOString(),
        updatedAt: warehouse.updatedAt.toISOString(),
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error, callback)
  }
}