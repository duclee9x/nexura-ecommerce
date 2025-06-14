import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { SpanStatusCode, logger, api, withTracing, createToken } from '@nexura/common/utils'
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { ValidateOTPRequest, ValidateOTPResponse } from '@nexura/grpc_gateway/protos'

const tracer = api.trace.getTracer('validateOTP')
const prisma = new PrismaClient()

export const validateOTP = async (
  call: ServerUnaryCall<ValidateOTPRequest, ValidateOTPResponse>,
  callback: sendUnaryData<ValidateOTPResponse>
) => {
  try {
    const { email, otp } = call.request

    // Find OTP record
    const otpRecord = await withTracing(tracer, 'Find OTP Record', async (span) => {
      const record = await prisma.oTP.findFirst({
        where: {
          email,
          type:   'reset',
          isUsed: false
        }
      })

      if (!record) {
        span.setStatus({
          code:    SpanStatusCode.ERROR,
          message: 'OTP not found'
        })
        span.addEvent('OTP not found', { email })
        callback(null, {
          success:    false,
          message:    'Invalid or expired OTP',
          resetToken: ''
        })
        return null
      }

      return record
    })

    if (!otpRecord) return

    // Check if OTP is expired
    const now = new Date()


    // Check failed attempts
    if (otpRecord.attemptCount >= 5) {
      await withTracing(tracer, 'Check Failed Attempts', async (span) => {
        await prisma.oTP.delete({
          where: {
            id: otpRecord.id
          }
        })

        span.setStatus({
          code:    SpanStatusCode.ERROR,
          message: 'Maximum failed attempts reached'
        })
        span.addEvent('Maximum attempts reached', { 
          email, 
          attemptCount: otpRecord.attemptCount 
        })
        callback(null, {
          success:    false,
          message:    'Maximum failed attempts reached. Please request a new OTP.',
          resetToken: ''
        })
      })
      return
    }

    // Validate OTP
    if (otpRecord.otp !== otp) {
      await withTracing(tracer, 'Update Failed Attempt', async (span) => {
        await prisma.oTP.update({
          where: {
            id: otpRecord.id
          },
          data: {
            attemptCount: otpRecord.attemptCount + 1,
            lastAttempt:  now
          }
        })

        span.setStatus({
          code:    SpanStatusCode.ERROR,
          message: 'Invalid OTP'
        })
        span.addEvent('Invalid OTP attempt', { 
          email, 
          attemptCount: otpRecord.attemptCount + 1 
        })
        callback(null, {
          success:    false,
          message:    'Invalid OTP',
          resetToken: ''
        })
      })
      return
    }
    const resetToken = createToken(email, otp)
    // Mark OTP as used
    await withTracing(tracer, 'Mark OTP as Used', async (span) => {
      await prisma.oTP.update({
        where: {
          id: otpRecord.id
        },
        data: {
          isUsed: true
        }
      })

      span.setStatus({
        code:    SpanStatusCode.OK,
        message: 'OTP validated successfully'
      })
      span.addEvent('OTP validated successfully', { email })
      callback(null, {
        success:    true,
        message:    'OTP validated successfully',
        resetToken: resetToken
      })
    })

  } catch (error) {
    logger.error('validate_otp_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      email: call.request.email
    })

    callback(null, {
      success:    false,
      message:    'An error occurred while validating OTP',
      resetToken: ''
    })
  }
} 