import { PrismaClient, Prisma } from '../../db/prisma-client'
import { generateOTP, logger, SpanStatusCode, api, withTracing, defaultTracer, createToken } from '@nexura/common/utils'
import type { LoginUserRequest, ResetPasswordResponse } from '@nexura/grpc_gateway/protos'
import type { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { sendOTPResetPasswordGateway } from '@nexura/grpc_gateway/gateway'
import { isServiceError } from '@nexura/common/utils'

const tracer = defaultTracer('forgotPassword')
const prisma = new PrismaClient()


export const forgotPassword = async (
    call: ServerUnaryCall<LoginUserRequest, ResetPasswordResponse>,
    callback: sendUnaryData<ResetPasswordResponse>
) => {
    try {
        // Find user
        const user = await withTracing(tracer, 'Find Existing User', async (span) => {
            const userDB = await prisma.user.findUnique({
                where: { email: call.request.email },
                select: { id: true, email: true }
            })
            if (!userDB) {
                span.addEvent('User not found', { email: call.request.email })
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'User not found'
                })
                callback(null, {
                    success: false,
                    message: 'If an account exists with this email, you will receive a password reset link.'
                })
                return null
            }
            return userDB
        })

        if (!user) return

        // Generate OTP
        const otp = generateOTP()
        const resetToken = createToken(user.email, otp)
        // Check recent OTP attempts
        const recentOTP = await withTracing(tracer, 'Check Recent OTP Attempts', async (span) => {
            const recentOTP = await prisma.oTP.findFirst({
                where: {
                    email: call.request.email,
                    type: 'reset',
                },
                select: {
                    id: true,
                    otp: true,
                    attemptCount: true,
                    lastAttempt: true,
                    createdAt: true,
                }
            })

            if (recentOTP) {
                const last_attempt = new Date(recentOTP.lastAttempt)
                const diffMinutes = Math.abs(Date.now() - last_attempt.getTime()) / (1000 * 60)
                const lastEmailSent = new Date(recentOTP.createdAt)
                const diffMinutesSinceLastEmail = Math.abs(Date.now() - lastEmailSent.getTime()) / (1000 * 60)

                // Check if less than 1 minute has passed since last email
                if (diffMinutesSinceLastEmail < 1) {
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                        message: 'Email cooldown period'
                    })
                    span.addEvent('Email cooldown period', {
                        email: call.request.email,
                        lastEmailSent: lastEmailSent.toISOString(),
                        diffMinutesSinceLastEmail
                    })
                    callback(null, {
                        success: false,
                        message: 'Please wait 1 minute before requesting another reset link.'
                    })
                    return null
                }

                if (diffMinutes < 3) {
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                        message: 'Too many attempts'
                    })
                    span.addEvent('Too many attempts', { email: call.request.email, last_attempt: last_attempt.toISOString(), diffMinutes: diffMinutes, attempt_count: recentOTP.attemptCount })
                    callback(null, {
                        success: false,
                        message: 'Please wait a minute before requesting another reset link.'
                    })
                    return null
                }

                const attempt_count = recentOTP.attemptCount
                if (attempt_count >= 5) {
                    span.addEvent('attempts count', { email: call.request.email, last_attempt: last_attempt.toISOString(), attempt_count: attempt_count })
                    if (diffMinutes < 24 * 60 * 1000) {
                        span.setStatus({
                            code: SpanStatusCode.ERROR,
                            message: 'Maximum attempts reached'
                        })
                        span.addEvent('Maximum attempts reached', { email: call.request.email, last_attempt: last_attempt.toISOString(), diffMinutes: diffMinutes })
                        callback(null, {
                            success: false,
                            message: 'Maximum attempts reached, please try again 24 hours later.'
                        })
                        return null
                    }
                }

                // Update existing OTP
                await withTracing(tracer, 'Update OTP', async (updateSpan) => {
                    await prisma.oTP.update({
                        where: {
                            id: recentOTP.id,
                            email: call.request.email,
                            type: 'reset',
                        },
                        data: {
                            attemptCount: attempt_count + 1,
                            lastAttempt: new Date(),
                            otp: otp,
                            isUsed: false,
                        }
                    })
                    updateSpan.addEvent('OTP updated', { email: call.request.email, attemptCount: attempt_count + 1, otp: otp })
                })

                return recentOTP
            }

            // Create new OTP
            await withTracing(tracer, 'Create OTP Record', async (createSpan) => {
                await prisma.oTP.create({
                    data: {
                        email: call.request.email,
                        type: 'reset',
                        otp,
                        attemptCount: 0,
                        isUsed: false,
                        createdAt: new Date(),
                        lastAttempt: new Date(),
                    }
                })
            })

            return null
        })
        if (!recentOTP) return
        // Send OTP email
        try { await sendOTPToEmail(user.email, otp, resetToken) }
        catch (error) {
            if (isServiceError(error)) {
                logger.error('forgot_password_error', {
                    error: error.details,
                    email: call.request.email
                })
            }
            
            callback(null, {
                success: false,
                message: 'An error occurred while sending the OTP email.'
            })
            return
        }
        callback(null, {
            success: true,
            message: 'If an account exists with this email, you will receive a password reset link.'
        })

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientInitializationError) {
            logger.error('forgot_password_error', {
                error: error.message,
                email: call.request.email
            })
        }
        else {
            logger.error('forgot_password_error', {
                error: error instanceof Error ? error.message : 'Unknown error',
                email: call.request.email
            })
        }
        callback(null, {
            success: false,
            message: 'An error occurred while processing your request.'
        })
    }
}

const sendOTPToEmail = async (email: string, otp: string, resetToken: string) => {
    await withTracing(tracer, 'sendOTPToEmail', async (span) => {
        api.context.with(api.trace.setSpan(api.context.active(), span), () => {
            logger.info('Sending OTP to email', { traceId: span.spanContext().traceId });
            span.setAttribute('client.request.email', email);
            sendOTPResetPasswordGateway({ email, verificationCode: otp, resetToken: resetToken })
        });
    })
}
