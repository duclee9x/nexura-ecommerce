import { PrismaClient } from '../../db/prisma-client'
import { handleError } from '@nexura/common/utils'
import type { sendUnaryData, ServerUnaryCall, ServiceError } from '@grpc/grpc-js'
import { Empty, GetWarehousesResponse } from '@nexura/grpc_gateway/protos'

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
        createdAt: warehouse.createdAt.toISOString(),
        updatedAt: warehouse.updatedAt.toISOString(),
      })),
    }

    callback(null, response)
  } catch (error) {
    handleError(error as ServiceError, callback)
  }
}