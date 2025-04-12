import { SpanStatusCode, trace } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from "@grpc/grpc-js";

import { GetUserSchema } from "../../utils/user-validator";

import prisma from "../../db/client";
import logger from "../../utils/logger";

import { defaultTracer } from "../../utils/opentelemetry";
import { GetUserResponse, GetUserRequest } from "../../proto/nexura";

const tracer = defaultTracer('getUser')

export const GetUser: UntypedHandleCall = async (
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
