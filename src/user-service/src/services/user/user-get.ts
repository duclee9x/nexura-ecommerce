import { SpanStatusCode } from "@opentelemetry/api";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";

import { GetUserSchema } from "@nexura/common/validators";

import { logger } from "@nexura/common/utils";

import { defaultTracer } from "@nexura/common/utils";
import { GetUserResponse, GetUserRequest } from "@nexura/grpc_gateway/protos";
import { PrismaClient } from "../../db/prisma-client";

const tracer = defaultTracer('getUser')
const prisma = new PrismaClient()

export const GetUser = async (
    call: ServerUnaryCall<GetUserRequest, GetUserResponse>,
    callback: sendUnaryData<GetUserResponse>
) => {
    const span = tracer.startSpan('Request received');
    try {
        span.addEvent('Request received', {
            id: call.request.id
        });
        logger.info(`GetUser request received`, { userId: call.request.id });
        const validatedData = GetUserSchema.parse(call.request);
        logger.debug('Fetching user from database', { userId: validatedData.id });
        const userSpan = tracer.startSpan("getUserFromDB")
        const user = await prisma.user.findUnique({
            where: { id: validatedData.id },
            include: {
                address: {
                    include: {
                        country: {
                            select: {
                                codeName: true
                            }
                        },
                        vnProvince: {
                            select: {
                                fullName: true
                            }
                        },
                        vnDistrict: {
                            select: {
                                fullName: true
                            }
                        },
                        vnWard: {
                            select: {
                                fullName: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) {
            logger.warn('User not found', { userId: validatedData.id });
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

        logger.info('User found successfully', { userId: user.id });
        userSpan.setStatus({ code: SpanStatusCode.OK });
        callback(null, {
            success: true,
            message: 'User found successfully',
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone || "",
                isActive: user.isActive,
                isVerified: user.isVerified,
                role: user.role,
                permissions: JSON.parse(user.permissions),
                lastLogin: user.lastLogin?.toISOString() || "",
                profilePictureUrl: user.profilePictureUrl || "",
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
                dateOfBirth: user.dateOfBirth?.toISOString() || "",
                gender: user.gender || "",
            }
        });
        userSpan.end();
    } catch (error) {
        console.log(error)
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
