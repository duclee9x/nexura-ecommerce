import { trace, SpanStatusCode } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';

import { UserResponse, validateToken } from "./user-type";
import { UpdateUserRequest } from "./user-type";
import { UpdateUserSchema } from "../utils/user-validator";

import logger from "../utils/logger";
import prisma from "../db/client";

const tracer = trace.getTracer("updateUser")

export const UpdateUser: UntypedHandleCall = async (
    call: ServerUnaryCall<UpdateUserRequest, UserResponse>,
    callback: sendUnaryData<UserResponse>
) => {
    const span = trace.getActiveSpan();
    try {
        span?.setAttribute('request.id', call.request.id);
        if (call.request.name) span?.setAttribute('request.name', call.request.name);
        if (call.request.email) span?.setAttribute('request.email', call.request.email);

        logger.info('UpdateUser request received', {
            userId: call.request.id,
            updateFields: {
                name: call.request.name,
                email: call.request.email
            }
        });

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
        const validatedData = UpdateUserSchema.safeParse(call.request);
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

        const { id, ...updateData } = validatedData.data;

        const updateSpan = tracer.startSpan("updateUserOnDB")
        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
            logger.warn('No fields to update', { userId: id });
            updateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'No fields to update'
            });
            updateSpan.end();
            return callback({
                code: status.INVALID_ARGUMENT,
                message: 'No fields to update',
            });
        }

        logger.debug('Updating user in database', {
            userId: id,
            updateData
        });
        
        const user = await prisma.user.update({
            where: { id },
            data: updateData,
        });

        logger.info('User updated successfully', { userId: user.id });
        updateSpan.setStatus({ code: SpanStatusCode.OK });
        updateSpan.end();

        callback(null, {
            id: user.id,
            name: user.name || '',
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        });
    } catch (error) {
        logger.error('Error in UpdateUser', {
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