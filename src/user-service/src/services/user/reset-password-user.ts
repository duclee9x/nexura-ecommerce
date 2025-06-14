import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { SpanStatusCode, logger, hashPassword, api, verifyToken } from '@nexura/common/utils'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { ResetPasswordRequest, ResetPasswordResponse } from '@nexura/grpc_gateway/protos'
    
const tracer = api.trace.getTracer('updatePassword')
const prisma = new PrismaClient()

export const resetPassword = async (
  call: ServerUnaryCall<ResetPasswordRequest, ResetPasswordResponse>,
  callback: sendUnaryData<ResetPasswordResponse>
) => {
  tracer.startActiveSpan('Reset Password', async (parentSpan) => {
    const { email, newPassword, token } = call.request
    if (!email || !newPassword || !token) {
      parentSpan.setStatus({
        code:    SpanStatusCode.ERROR,
        message: 'Invalid request'
      })
      callback(null, { success: false, message: 'Invalid request' })
      return parentSpan.end()
    }
    try {
      // Check if current password is correct
      const verifyTokenSpan = tracer.startSpan('Verify Token')
      const verified = await verifyToken(token)
      verifyTokenSpan.end()
      if (!verified) {
        parentSpan.setStatus({
          code:    SpanStatusCode.ERROR,
          message: 'Invalid token'
        })
        callback(null, {
          success: false,
          message: 'Invalid token',
        })
        return parentSpan.end()
      }


      const hashedPassword = hashPassword(newPassword)

      // Update user password
      const updatePasswordSpan = tracer.startSpan('Update User Password')
      await prisma.user.update({
        where: {
          email: email
        },
        data: {
          password: hashedPassword
        }
      })
      updatePasswordSpan.end()

            
      parentSpan.setStatus({
        code:    SpanStatusCode.OK,
        message: 'Password updated successfully'
      })
      callback(null, {
        success: true,
        message: 'Password updated successfully',
      })
      parentSpan.end()

    } catch (error) {
      logger.error('update_password_error', {
        error:   error instanceof Error ? error.message : 'Unknown error',
        message: 'An error occurred while updating password'
      })

      parentSpan.setStatus({
        code:    SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      })

      callback(null, {
        success: false,
        message: 'An error occurred while updating password',
      })
      parentSpan.end()
    }
  })
} 