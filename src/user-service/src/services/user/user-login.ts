import { trace, SpanStatusCode } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';

import { LoginUserRequest, LoginUserResponse, GetUserResponse } from "../../proto/nexura";
import { LoginUserSchema } from "../../utils/user-validator";

import logger from "../../utils/logger";
import prisma from "../../db/client";
import { verifyPassword } from "../../utils/password-utils";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt-utils";

import { defaultTracer, withTracing } from "../../utils/opentelemetry";

const tracer = defaultTracer('loginUser')

export const LoginUser: UntypedHandleCall = async (
    call: ServerUnaryCall<LoginUserRequest, LoginUserResponse>,
    callback: sendUnaryData<LoginUserResponse>
) => {
    try {
        // Validate request
        const validatedData = await withTracing(tracer, 'Validate Request', async (span) => {
            const result = LoginUserSchema.safeParse(call.request);
            if (!result.success) {
                logger.warn('Invalid request data', {
                    errors: result.error.errors
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid request data'
                });
                callback(null, {
                    success: false,
                    message: 'Invalid request data',
                    accessToken: '',
                    refreshToken: '',
                    user: undefined
                });
                return null;
            }
            return result.data;
        });

        if (!validatedData) throw new Error('Invalid request data');

        // Find the user by email
        const user = await withTracing(tracer, 'Find User', async (span) => {
            logger.debug('Finding user by email', { email: validatedData.email });
            const foundUser = await prisma.user.findUnique({
                where: { email: validatedData.email },
                include: {
                    address: true
                }
            });

            if (!foundUser) {
                logger.warn('Invalid credentials: User not found', {
                    email: validatedData.email
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid credentials'
                });
                callback(null, {
                    success: false,
                    message: 'Invalid credentials',
                    accessToken: '',
                    refreshToken: '',
                    user: undefined
                });
                return null;
            }
            
            span.setAttribute('user.email', foundUser.email )
            span.setStatus({ code: SpanStatusCode.OK });
            return foundUser;
        });

        if (!user) return;

        // Verify the password
        const isPasswordValid = await withTracing(tracer, 'Verify Password', async (span) => {
            logger.debug('Verifying password');
            const isValid = verifyPassword(validatedData.password, user.password);
            if (!isValid) {
                logger.warn('Invalid credentials: Password mismatch', {
                    userId: user.id
                });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid credentials'
                });
                callback(null, {
                    success: false,
                    message: 'Invalid credentials',
                    accessToken: '',
                    refreshToken: '',
                    user: undefined
                });
                return false;
            }
            span.setStatus({ code: SpanStatusCode.OK });
            return true
        });

        if (!isPasswordValid) return;


        // Check if user is verified or active
        const isVerified = await withTracing(tracer, 'Check if user is verified', async (span) => {
        if (!user.isVerified || !user.isActive) {
            const message = `User is ${user.isVerified ? 'not finish creating account' : 'deactivated'}`
            logger.warn(message, { userId: user.id });
            span.setStatus({
                code: SpanStatusCode.ERROR,
                message: message
            }); 
            callback(null, {
                success: false,
                message: message,
                accessToken: '',
                refreshToken: '',
                user: undefined
            });
                return false;
            }
            span.setStatus({ code: SpanStatusCode.OK });
            return true;
        });

        if (!isVerified) return;

        // Generate tokens
        const tokens = await withTracing(tracer, 'Generate Tokens', async (span) => {
            logger.debug('Generating tokens', { userId: user.id });
            const payload = { userId: user.id.toString(), email: user.email };
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            if (!accessToken || !refreshToken) {
                logger.error('Failed to generate tokens', { userId: user.id });
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Failed to generate tokens'
                });
                callback(null, {
                    success: false,
                    message: 'Failed to generate tokens',
                    accessToken: '',
                    refreshToken: '',
                    user: undefined
                });
                return null;
            }

            span.setStatus({ code: SpanStatusCode.OK });
            return { accessToken, refreshToken };
        });

        if (!tokens) return;

        logger.info('User logged in successfully', { user: user });
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });
        callback(null, {
            success: true,
            message: 'Login successful',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActive: user.isActive,
                isVerified: user.isVerified,
                role: user.role,
                lastLogin: user.lastLogin?.toISOString() || "",
                profilePictureUrl: user.profilePictureUrl || "",
                phone: user.phone || "",
                permissions: JSON.parse(user.permissions),
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
                dateOfBirth: user.dateOfBirth?.toISOString() || "",
                gender: user.gender || "",
            }
        });

    } catch (error) {
        logger.error('Error in LoginUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        callback({
            code: status.INTERNAL,
            message: `Internal server error ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}