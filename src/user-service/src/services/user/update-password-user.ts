import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { SpanStatusCode, logger, hashPassword, api } from '@nexura/common/utils'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { UpdateUserRequest, UpdateUserResponse } from '@nexura/grpc_gateway/protos'

const tracer = api.trace.getTracer('updatePassword')
const prisma = new PrismaClient()

export const updatePassword = async (
    call: ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>,
    callback: sendUnaryData<UpdateUserResponse>
) => {
    tracer.startActiveSpan('Update Password', async (parentSpan) => {
        const { user, currentPassword, newPassword } = call.request
        if (!user || !currentPassword || !newPassword) {
            parentSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Invalid request'
            })
            callback(null, { success: false, message: 'Invalid request', user: undefined })
            return parentSpan.end()
        }
        try {
            // Check if current password is correct
            

            const hashedCurrentPassword = hashPassword(currentPassword)
            const userResult = await prisma.user.findUnique({
                where: {
                    email: user?.email,
                    password: hashedCurrentPassword
                }
            })
            if (!userResult) {
                parentSpan.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid current password'
                })
                callback(null, {
                    success: false,
                    message: 'Invalid current password',
                    user: undefined
                })
                return parentSpan.end()
            }
            // Hash new password
            const hashedPassword = hashPassword(newPassword)

            // Update user password
            const updatePasswordSpan = tracer.startSpan('Update User Password')
            await prisma.user.update({
                where: {
                    email: user?.email
                },
                data: {
                    password: hashedPassword
                }
            })
            updatePasswordSpan.end()

            
            parentSpan.setStatus({
                code: SpanStatusCode.OK,
                message: 'Password updated successfully'
            })
            callback(null, {
                success: true,
                message: 'Password updated successfully',
                user: user
            })
            parentSpan.end()

        } catch (error) {
            logger.error('update_password_error', {
                error: error instanceof Error ? error.message : 'Unknown error',
                message: 'An error occurred while updating password'
            })

            parentSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: error instanceof Error ? error.message : 'Unknown error'
            })

            callback(null, {
                success: false,
                message: 'An error occurred while updating password',
                user: undefined
            })
            parentSpan.end()
        }
    })
} 