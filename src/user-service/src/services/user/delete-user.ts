import { SpanStatusCode } from "@opentelemetry/api";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";

import { logger } from "@nexura/common/utils";
import { api } from "@nexura/common/utils";
import { DeleteUserResponse, DeleteUserRequest } from "@nexura/grpc_gateway/protos";
import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'

const tracer = api.trace.getTracer('deleteUser')
const prisma = new PrismaClient()

export const DeleteUser = async (
    call: ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>,
    callback: sendUnaryData<DeleteUserResponse>
) => {
    console.log('DeleteUser request received', { userId: call.request });
    const span = tracer.startSpan('Request received');
    try {
        
        const deleteSpan = tracer.startSpan("deleteUser")
        logger.debug('Deleting user from database', { userId: call.request.id });
        await prisma.user.update({
            where: { id: call.request.id },
            data: {
                isActive: false
            }
        });

        logger.info('User deleted successfully', { userId: call.request.id });
        deleteSpan.setStatus({ code: SpanStatusCode.OK });

        callback(null, {
            success: true,
            message: 'User deleted successfully',
        });
        deleteSpan.end();
    } catch (error) {
        logger.error('Error in DeleteUser' + error, {
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
