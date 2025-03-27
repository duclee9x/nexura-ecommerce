import { SpanStatusCode, trace } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from "@grpc/grpc-js";

import { UserResponse, GetUserRequest } from "./user-type";
import { GetUserSchema } from "../utils/user-validator";
import { validateToken } from "../utils/jwt-utils";

import prisma from "../db/client";
import logger from "../utils/logger";

const tracer = trace.getTracer("getUser")

export const GetUser: UntypedHandleCall = async (
    call: ServerUnaryCall<GetUserRequest, UserResponse>,
    callback: sendUnaryData<UserResponse>
) => {
    const span = trace.getActiveSpan();
    try {
        span?.setAttribute('request.id', call.request.id);
        logger.info(`GetUser request received`, { userId: call.request.id });
        
        const authenticateSpan = tracer.startSpan("authenticateToken")
        const userId = validateToken(call.metadata);
        if (!userId) {
            logger.warn('Authentication failed: Invalid or missing token');
            authenticateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Authentication failed'
            });
            authenticateSpan.end();
            return callback({
                code: status.UNAUTHENTICATED,
                message: 'Invalid or missing token',
            });
        }
        span?.setAttribute('user.id', userId);
        logger.debug('User authenticated');

				const validateSpan = tracer.startSpan("validateToken")
        const validatedData = GetUserSchema.safeParse(call.request);
        if (!validatedData.success) {
            logger.warn('Invalid request data', {
                errors: validatedData.error.errors
            });
            validateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Invalid request data'
            });
            validateSpan.end();
            return callback({
                code: status.INVALID_ARGUMENT,
                message: 'Invalid request data',
            });
        }

        logger.debug('Fetching user from database', { userId: validatedData.data.id });

				const userSpan = tracer.startSpan("getUserFromDB")
        const user = await prisma.user.findUnique({
            where: { id: validatedData.data.id },
        });

        if (!user) {
            logger.warn('User not found', { userId: validatedData.data.id });
            userSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'User not found'
            });
            userSpan.end();
            return callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
        }

        logger.info('User found successfully', { userId: user.id });
        userSpan.end();
				span?.setStatus({ code: SpanStatusCode.OK });
        callback(null, {
            id: user.id,
            name: user.name || '',
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        });
    } catch (error) {
        logger.error('Error in GetUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });
        span?.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span?.recordException(error as Error);
        span?.end();

        callback({
            code: status.INTERNAL,
            message: 'Internal server error',
        });
    }
}
