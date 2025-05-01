import { PrismaClient } from '../../db/prisma-client'

import { createToken, SpanStatusCode, hashPassword, withTracing, defaultTracer, logger } from '@nexura/common/utils';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';
import { RegisterUserForAdminResponse, RegisterUserForAdminRequest, RegisterUserRequest, RegisterUserResponse } from "@nexura/grpc_gateway/protos";
import { sendNewUserByAdminGateway } from '@nexura/grpc_gateway/gateway';

const tracer = defaultTracer('UserRegister');
const prisma = new PrismaClient();


export const RegisterUserForAdmin = async (
    call: ServerUnaryCall<RegisterUserForAdminRequest, RegisterUserForAdminResponse>,
    callback: sendUnaryData<RegisterUserForAdminResponse>
) => {
    try {
        // Validate request
        console.log('RegisterUserForAdmin', call.request);
        const { firstName, lastName, email, phone } = call.request;
        const randomPassword = Math.random().toString(36).slice(-10)
        // Check if email exists
        await withTracing(tracer, 'Check Email Exists', async (span) => {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });
            if (user) {
                callback({
                    code: status.ALREADY_EXISTS,
                    message: 'Email already in use',
                });
            }
        });
   

        // Create user
        const user = await withTracing(tracer, 'Create User', async (span) => {
            const hashedPassword = hashPassword(randomPassword);
            span.addEvent('Password hashed');


            const newUser = await prisma.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                    isActive: true,
                    isVerified: true,
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
                await sendNewUserByAdminGateway({ email, name: `${firstName} ${lastName}`, password: randomPassword });
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
            message: 'User registered successfully',
            userId: user.id
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
