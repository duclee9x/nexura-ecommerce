import { trace, SpanStatusCode } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';

import { DeleteUserRequest, DeleteUserResponse, UserResponse, validateToken } from "./user-type";
import { DeleteUserSchema } from "../utils/user-validator";

import logger from "../utils/logger";
import prisma from "../db/client";

const tracer = trace.getTracer("deleteUser")

export const DeleteUser: UntypedHandleCall = async (
    call: ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>,
    callback: sendUnaryData<DeleteUserResponse>
) => {
    const span = trace.getActiveSpan();
    try {
        span?.setAttribute('request.id', call.request.id);
        logger.info('DeleteUser request received', { userId: call.request.id });

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
        logger.debug('User authenticated', { authenticatedUserId: userId });

        const validateSpan = tracer.startSpan("validateRequest")
        const validatedData = DeleteUserSchema.safeParse(call.request);
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

        const deleteSpan = tracer.startSpan("deleteUser")
        logger.debug('Deleting user from database', { userId: validatedData.data.id });
        await prisma.user.update({
            where: { id: validatedData.data.id },
            data: {
                isActive: false
            }
        });

        
        logger.info('User deleted successfully', { userId: validatedData.data.id });
        deleteSpan.setStatus({ code: SpanStatusCode.OK });
        deleteSpan.end();

        callback(null, {
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        logger.error('Error in DeleteUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        span?.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span?.recordException(error as Error);
        span?.end();

        if ((error as any).code === 'P2025') {
            return callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
        }

        callback({
            code: status.INTERNAL,
            message: `Internal server error ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}
