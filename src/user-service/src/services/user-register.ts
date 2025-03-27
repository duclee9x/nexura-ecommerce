import { trace, SpanStatusCode, Tracer } from "@opentelemetry/api";
import { ServerUnaryCall, UntypedHandleCall, sendUnaryData, status } from '@grpc/grpc-js';
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base';

import { RegisterUserRequest, UserResponse, validateToken } from "./user-type";
import { RegisterUserSchema } from "../utils/user-validator";

import logger from "../utils/logger";
import prisma from "../db/client";
import { hashPassword } from "../utils/password-utils";
import defaultTracer from "../utils/opentelemetry";

const tracer = defaultTracer('UserRegister');

export const RegisterUser: UntypedHandleCall = async (
    call: ServerUnaryCall<RegisterUserRequest, UserResponse>,
    callback: sendUnaryData<UserResponse>
) => {
    const span = tracer.startSpan('Request received');
    try {
        span.addEvent('Request received', {
            name: call.request.name,
            email: call.request.email
        });
        logger.info('RegisterUser request received', {
            name: call.request.name,
            email: call.request.email
        });
        span.end();
        const validateSpan = tracer.startSpan("validateRequest");
        const validatedData = RegisterUserSchema.safeParse(call.request);
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

        const { name, email, password } = validatedData.data;
        validateSpan.end();

        const checkEmailSpan = tracer.startSpan("checkEmailExists");
        // Check if user with this email already exists
        logger.debug('Checking if email already exists', {
            email: email
        });

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUser) {
            logger.warn('Email already in use', {
                email: email
            });
            checkEmailSpan.setStatus({
                code: SpanStatusCode.ERROR,
                message: 'Email already in use'
            });
            callback({
                code: status.ALREADY_EXISTS,
                message: 'Email already in use',
            });
            return checkEmailSpan.end()
        }
        checkEmailSpan.end();

        const CreateUserSpan = tracer.startSpan("CreateUser");
        // Hash the password
        logger.debug('Hashing password');
        const hashedPassword = hashPassword(password);
        CreateUserSpan.addEvent('Hashed password', {
            hashedPassword: hashedPassword
        });
        // Create the user
        logger.debug('Creating new user', {
            name: name,
            email: email
        });

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                isActive: true
            }
        });

        logger.info('User registered successfully', { userId: user.id });
        CreateUserSpan.setAttribute('user.id', user.id.toString());
        CreateUserSpan.end();
        callback(null, {
            id: user.id,
            name: user.name || '',
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        });
        return CreateUserSpan.end();
    } catch (error) {
        logger.error('Error in RegisterUser', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
        });
        span.recordException(error as Error);

        callback({
            code: status.INTERNAL,
            message: `Internal server error ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        return span.end();
    }
}
