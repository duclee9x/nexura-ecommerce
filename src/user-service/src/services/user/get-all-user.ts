import { SpanStatusCode } from "@opentelemetry/api";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";


import { logger } from "@nexura/common/utils";

import { api } from "@nexura/common/utils";
import { GetAllUsersResponse, Empty } from "@nexura/grpc_gateway/protos";
import { PrismaClient, Prisma } from '@nexura/user-service/src/db/prisma-client'
import { getOrdersForAdminGateway } from "@nexura/grpc_gateway/gateway";

const tracer = api.trace.getTracer('getUser')
const prisma = new PrismaClient()

export const GetAllUsers = async (
    call: ServerUnaryCall<Empty, GetAllUsersResponse>,
    callback: sendUnaryData<GetAllUsersResponse>
) => {
    const span = tracer.startSpan('Request received');
    try {    
        const userSpan = tracer.startSpan("getUserFromDB")
        const users = await prisma.user.findMany({
            
            include: {
                address: {
                    include: {
                        country: true,
                        vnProvince: true,
                        vnDistrict: true,
                        vnWard: true,
                    }
                }
            },
        });
        if (!users) {
            logger.warn('User not found');
            userSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'User not found'
            });

            callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
            return userSpan.end();
        }
        const usersResult = users.map((user) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone ?? "",
            isActive: user.isActive ? "active" : "inactive",
            address: user.address?.[0]
              ? {
                  ...user.address[0],
                  countryName: user.address[0].country?.codeName ?? "",
                  vnProvinceName: user.address[0].vnProvince?.fullName ?? "",
                  vnDistrictName: user.address[0].vnDistrict?.fullName ?? "",
                  vnWardName: user.address[0].vnWard?.fullName ?? "",
                  city: user.address[0].vnProvince?.fullName ?? "",
                  district: user.address[0].vnDistrict?.fullName ?? "",
                  ward: user.address[0].vnWard?.fullName ?? "",
                  state: user.address[0].vnWard?.fullName ?? "",
                  country: user.address[0].country?.codeName ?? "",
                  isDefault: user.address[0].isDefault,
                  zip: user.address[0].zip ?? "",
                  vnProvinceId: user.address[0].vnProvince?.id ?? "",
                  vnDistrictId: user.address[0].vnDistrict?.id ?? "",
                  vnWardId: user.address[0].vnWard?.id ?? "",
                  countryId: user.address[0].country?.id ?? "",
                  createdAt: user.address[0].createdAt.toISOString(),
                  updatedAt: user.address[0].updatedAt.toISOString(),
                }
              : undefined,
            createdAt: user.createdAt.toISOString(),
        }));

        const orders = await getOrdersForAdminGateway(users.map((user) => user.id));
        const usersWithOrders = usersResult.map((user) => ({
            ...user,
            totalOrders: orders.orders.find((order) => order.userId === user.id)?.totalOrders ?? 0,
            totalSpent: orders.orders.find((order) => order.userId === user.id)?.totalSpent ?? 0,
            lastOrderDate: orders.orders.find((order) => order.userId === user.id)?.lastOrderDate ?? "",
        }));
        userSpan.setStatus({ code: SpanStatusCode.OK });
        callback(null, {
            users: usersWithOrders,
        });
        userSpan.end();
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
            logger.error('Error in Prisma', {
                error: error.message,
                stack: error.stack
            });
        }
        logger.error('Error in GetUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
    });
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span.recordException(error as Error);

        span.end();

        callback({
            code: status.INTERNAL,
            message: 'Internal server error',
        });
    }
}
