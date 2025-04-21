import { SpanStatusCode } from "@opentelemetry/api";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";

import { DeleteUserSchema } from "@nexura/common/validators";
import { validateToken } from "@nexura/common/utils";

import { logger } from "@nexura/common/utils";
import { defaultTracer } from "@nexura/common/utils";
import { DeleteUserResponse, DeleteUserRequest } from "@nexura/common/protos";
import { PrismaClient } from "@prisma/client";

const tracer = defaultTracer('deleteUser')
const prisma = new PrismaClient()

export const DeleteUser = async (
    call: ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>,
    callback: sendUnaryData<DeleteUserResponse>
) => {
    const span = tracer.startSpan('Request received');
    try {
        span.addEvent('Request received', {
            id: call.request.id
        });
        logger.info('DeleteUser request received', { userId: call.request.id });

        const authenticateSpan = tracer.startSpan("authenticateToken")
        const authHeader = call.metadata.get('authorization');
        if (!authHeader || authHeader.length === 0) {
            logger.warn('Authentication failed: Missing token');
            authenticateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Missing token'
            });
            callback({
                code: status.UNAUTHENTICATED,
                message: 'Missing token',
            });
            return authenticateSpan.end();
        }
        const token = authHeader[0]?.toString();
        if (!token) {
            logger.warn('Authentication failed: Missing token');
            authenticateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Missing token'
            });
            callback({
                code: status.UNAUTHENTICATED,
                message: 'Missing token',
            });
            return authenticateSpan.end();
        }
        const userId = validateToken(token);
        if (!userId) {
            logger.warn('Authentication failed: Invalid token');
            authenticateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Invalid token'
            });
            callback({
                code: status.UNAUTHENTICATED,
                message: 'Invalid token',
            });
            return authenticateSpan.end();
        }

        span?.setAttribute('user.id', userId.userIdFromToken);
        logger.debug('User authenticated', { authenticatedUserId: userId.userIdFromToken });

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
            
            callback({
                code: status.INVALID_ARGUMENT,
                message: 'Invalid request data',
            });
            return validateSpan.end();
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

        callback(null, {
            success: true,
            message: 'User deleted successfully',
        });
        deleteSpan.end();
    } catch (error) {
        logger.error('Error in DeleteUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span.recordException(error as Error);
        
        span.end();

        if ((error as any).code === 'P2025') {
            return callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
        }

        callback({
            code: status.INTERNAL,
            message: 'An error occurred while processing your request.',
        });
    }
}
