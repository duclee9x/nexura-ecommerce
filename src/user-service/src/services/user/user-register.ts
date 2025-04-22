import { PrismaClient } from '../../db/prisma-client'

import { createToken, SpanStatusCode, hashPassword, withTracing, defaultTracer, logger } from '@nexura/common/utils';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';
import { RegisterUserRequest, RegisterUserResponse } from "@nexura/grpc_gateway/protos";
import { RegisterUserSchema } from "@nexura/common/validators";
import { sendWelcomeEmailGateway } from '@nexura/grpc_gateway/gateway';

const tracer = defaultTracer('UserRegister');
const prisma = new PrismaClient();

const resultMessage = {
    ACTIVE_USER: "ACTIVE_USER",
    NOT_VERIFIED_USER: "NOT_VERIFIED_USER",
    SEND_ACTIVATION_EMAIL: "SEND_ACTIVATION_EMAIL",
    SEND_ACTIVATION_EMAIL_FAILED: "SEND_ACTIVATION_EMAIL_FAILED",
    UNREGISTERED_USER: "UNREGISTERED_USER",
}

export const RegisterUser = async (
    call: ServerUnaryCall<RegisterUserRequest, RegisterUserResponse>,
    callback: sendUnaryData<RegisterUserResponse>
) => {
    try {
        // Validate request
        const validatedData = await withTracing(tracer, 'Validate Request', async (span) => {
            const result = RegisterUserSchema.safeParse(call.request);
            if (!result.success) {
                logger.warn('Invalid request data', {
                    errors: result.error.errors
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid request data'
                });
                callback({
                    code: status.INVALID_ARGUMENT,
                    message: 'Invalid request data',
                });
                return null;
            }
            return result.data;
        });

        if (!validatedData) throw new Error('Invalid request data');
        const { firstName, lastName, email, password } = validatedData;

        // Check if email exists
        const existingUser = await withTracing(tracer, 'Check Email Exists', async (span) => {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
            console.log(user);
            if (user) {
                if (user.isVerified) {
                    logger.warn('Email already in use', { email });
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                        message: 'Email already in use'
                    });
                    callback({
                        code: status.ALREADY_EXISTS,
                        message: 'Email already in use',
                    });
                    return resultMessage.ACTIVE_USER;
                }
                else {
                    const resendActivationEmail = await withTracing(tracer, 'Resend Activation Email', async (span) => {
                        try {
                            const token = createToken(email, "");
                            await sendWelcomeEmailGateway({email, name: `${firstName} ${lastName}`, token});
                            span.setStatus({
                                code: SpanStatusCode.OK,
                                message: 'Activation email sent successfully'
                            });
                            return resultMessage.SEND_ACTIVATION_EMAIL;
                        } catch (error) {
                            logger.error('Failed to send activation email:', error);
                            span.setStatus({
                                code: SpanStatusCode.ERROR,
                                message: 'Failed to send activation email'
                            });
                            return resultMessage.SEND_ACTIVATION_EMAIL_FAILED;
                        }
                    });
                    return resendActivationEmail;
                }
            }
            return resultMessage.UNREGISTERED_USER;
        });
        console.log(existingUser);
        if (existingUser == resultMessage.ACTIVE_USER || existingUser == resultMessage.SEND_ACTIVATION_EMAIL || existingUser == resultMessage.SEND_ACTIVATION_EMAIL_FAILED) {
            callback({
                code: status.ALREADY_EXISTS,
                message: existingUser
            }, {
                success: false,
                message: existingUser
            });
            return;
        }

        // Create user
        const user = await withTracing(tracer, 'Create User', async (span) => {
            const hashedPassword = hashPassword(password);
            span.addEvent('Password hashed');


            const newUser = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hashedPassword,
                    isActive: true,
                    isVerified: false,
                    role: 'user',
                    permissions: '[]',
                    lastLogin: null
                }
            });

            logger.info('User registered successfully', { userId: newUser.id });
            span.setAttribute('user.id', newUser.id.toString());
            return newUser;
        });

        // Send welcome email
        await withTracing(tracer, 'Send Welcome Email', async (span) => {
            try {
                const token = createToken(email, "");
                await sendWelcomeEmailGateway({email, name: `${firstName} ${lastName}`, token});
                span.setStatus({
                    code: SpanStatusCode.OK,
                    message: 'Activation email sent successfully'
                });
            } catch (error) {
                logger.error('Failed to send welcome email:', error);
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Failed to send activation email'
                });
                // Don't fail the registration if email fails
            }
        });

        callback(null, {
            success: true,
            message: 'User registered successfully'
        });

    } catch (error) {
        logger.error('Error in RegisterUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        callback({
            code: status.INTERNAL,
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
