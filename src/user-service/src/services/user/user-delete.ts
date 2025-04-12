import { trace, SpanStatusCode } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';

import { DeleteUserSchema } from "../../utils/user-validator";
import { validateToken } from "../../utils/jwt-utils";

import logger from "../../utils/logger";
import prisma from "../../db/client";
import { defaultTracer } from "../../utils/opentelemetry";
import { DeleteUserResponse, DeleteUserRequest } from "../../proto/nexura";

const tracer = defaultTracer('deleteUser')

export const DeleteUser: UntypedHandleCall = async (
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
        const token = authHeader[0].toString();
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
