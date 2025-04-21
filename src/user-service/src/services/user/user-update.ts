import { SpanStatusCode, logger, verifyPassword, hashPassword, defaultTracer } from "@nexura/common/utils";
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';
import { UpdateUserRequest, UpdateUserResponse } from "@nexura/common/protos";
import { UpdateUserSchema } from "@nexura/common/validators";

import { PrismaClient } from "@prisma/client";

const tracer = defaultTracer('updateUser')
const prisma = new PrismaClient()

export const UpdateUser = async (
    call: ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>,
    callback: sendUnaryData<UpdateUserResponse>
) => {
    const span = tracer.startSpan('Request received');
    try {
        span.addEvent('Request received', {
            id: call.request.user?.id
        });
        if (call.request.user?.id) span.addEvent('Request id', {
            id: call.request.user?.id
        });

        logger.info('UpdateUser request received', {
            updateFields: {
                ...call.request
            }
        });

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
            
             callback({
                code: status.INVALID_ARGUMENT,
                message: 'Invalid request data',
            });
            return validateSpan.end();
        }
        const { id, ...updateData } = validatedData.data;
        const { currentPassword, newPassword, ...userData } = updateData;

        const updateSpan = tracer.startSpan("updateUserOnDB")
        // Check if there's anything to update
        if (Object.keys(userData).length === 0 && !newPassword) {
            logger.warn('No fields to update', { userId: id });
            updateSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'No fields to update'
            });
            
             callback({
                code: status.INVALID_ARGUMENT,
                message: 'No fields to update',
            });
            return updateSpan.end();
        }
        if (currentPassword && newPassword) {
            const user = await prisma.user.findUnique({
                where: { id },
            });
            if (!user) {
                logger.warn('User not found', { userId: id });
                updateSpan.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'User not found',
                });
                callback({
                    code: status.NOT_FOUND,
                    message: 'User not found',
                });
                return updateSpan.end();
            }
            logger.debug('Verifying password', { userId: id });
            const isPasswordCorrect = verifyPassword(currentPassword, user.password);
            if (!isPasswordCorrect) {
                logger.warn('Invalid current password', { userId: id });
                updateSpan.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid current password',
                });
                callback({
                    code: status.NOT_FOUND,
                    message: 'Invalid current password',
                });
                return updateSpan.end();
            }
            const hashedNewPassword = hashPassword(newPassword);
            await prisma.user.update({
                where: { id },
                data: { password: hashedNewPassword },
            });
            logger.info('Password updated successfully', { userId: id });
            updateSpan.setStatus({ code: SpanStatusCode.OK });
            callback(null, {
                success: true,
                message: 'Password updated successfully',
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone ?? '',
                    gender: user.gender ?? '',
                    dateOfBirth: user.dateOfBirth?.toISOString() ?? '',
                    role: user.role ?? '',
                    lastLogin: user.lastLogin?.toISOString() ?? '',
                    permissions: user.permissions ?? [],
                    profilePictureUrl: user.profilePictureUrl ?? '',
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                    isActive: user.isActive,
                    isVerified: user.isVerified,
                },
            });
            return updateSpan.end();
        }
        logger.debug('Updating user in database', {
            userId: id,
            userData
        });
        console.log(userData.user, "userData.user")
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...userData.user,
            },
        });
        
        logger.info('User updated successfully', { userId: user.id });
        updateSpan.setStatus({ code: SpanStatusCode.OK });

        callback(null, {
            success: true,
            message: 'User updated successfully',
            user: {
                id: user?.id ?? 0,
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                dateOfBirth: user?.dateOfBirth?.toISOString() ?? '',
                gender: user?.gender ?? '',
                phone: user?.phone ?? '', 
                createdAt: user?.createdAt.toISOString() ?? '',
                updatedAt: user?.updatedAt.toISOString() ?? '',
                isActive: user?.isActive ?? false,
                isVerified: user?.isVerified ?? false,
                role: user?.role ?? '',
                permissions: JSON.parse(user?.permissions ?? '[]'),
                profilePictureUrl: user?.profilePictureUrl ?? '',
                lastLogin: user?.lastLogin?.toISOString() ?? ''
            }
        });
        updateSpan.end();
    } catch (error) {
        logger.error('Error in UpdateUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span.recordException(error as Error);
        

        if ((error as any).code === 'P2025') {
             callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
            return span.end();

        }

        callback({
            code: status.INTERNAL,
            message: `Internal server error ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        span.end();

    }

}