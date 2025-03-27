import { trace, SpanStatusCode } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';

import { LoginUserRequest, LoginUserResponse, UserResponse } from "./user-type";
import { LoginUserSchema } from "../utils/user-validator";

import logger from "../utils/logger";
import prisma from "../db/client";
import { hashPassword, verifyPassword } from "../utils/password-utils";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt-utils";

const tracer = trace.getTracer("loginUser")

export const LoginUser: UntypedHandleCall = async (
    call: ServerUnaryCall<LoginUserRequest, UserResponse>,
    callback: sendUnaryData<LoginUserResponse>
) => {
    const span = trace.getActiveSpan();
    try {
        span?.setAttribute('request.email', call.request.email);
        logger.info('LoginUser request received', { email: call.request.email });

        const validateSpan = tracer.startSpan("validateRequest")
        const validatedData = LoginUserSchema.safeParse(call.request);
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

        const findUserSpan = tracer.startSpan("findUser")
        // Find the user by email
        logger.debug('Finding user by email', { email: validatedData.data.email });
        const user = await prisma.user.findUnique({
            where: { email: validatedData.data.email }
        });

        if (!user) {
            logger.warn('Invalid credentials: User not found', {
                email: validatedData.data.email
            });
            findUserSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Invalid credentials'
            });
            findUserSpan.end();
            return callback({
                code: status.UNAUTHENTICATED,
                message: 'Invalid credentials',
            });
        }

        const verifyPasswordSpan = tracer.startSpan("verifyPassword")
        // Verify the password
        logger.debug('Verifying password');
        const isPasswordValid = verifyPassword(validatedData.data.password, user.password);
        if (!isPasswordValid) {
            logger.warn('Invalid credentials: Password mismatch', {
                userId: user.id
            });
            verifyPasswordSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Invalid credentials'
            });
            verifyPasswordSpan.end();
            return callback({
                code: status.UNAUTHENTICATED,
                message: 'Invalid credentials',
            });
        }

        const generateTokensSpan = tracer.startSpan("generateTokens")
        // Generate tokens
        logger.debug('Generating tokens', { userId: user.id });
        const payload = { userId: user.id.toString(), email: user.email };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        if (!accessToken || !refreshToken) {
            logger.error('Failed to generate tokens', { userId: user.id });
            generateTokensSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Failed to generate tokens'
            });
            generateTokensSpan.end();
            return callback({
                code: status.INTERNAL,
                message: 'Failed to generate tokens',
            });
        }

        logger.info('User logged in successfully', { userId: user.id });
        generateTokensSpan.setStatus({ code: SpanStatusCode.OK });
        generateTokensSpan.end();

        callback(null, {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name || '',
                email: user.email,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            }
        });
    } catch (error) {
        logger.error('Error in LoginUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        span?.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span?.recordException(error as Error);
        span?.end();

        callback({
            code: status.INTERNAL,
            message: `Internal server error ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
    }
}