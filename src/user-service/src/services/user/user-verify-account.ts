import { PrismaClient } from '../../db/prisma-client'
import { SpanStatusCode, logger, defaultTracer, withTracing, verifyToken } from "@nexura/common/utils";
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';
import { VerifyAccountRequest, VerifyAccountResponse } from "@nexura/grpc_gateway/protos";

const tracer = defaultTracer('verifyAccount')
const prisma = new PrismaClient()

export const verifyAccount = async (
    call: ServerUnaryCall<VerifyAccountRequest, VerifyAccountResponse>,
    callback: sendUnaryData<VerifyAccountResponse>
) => {
    try {
        // Verify token
        const tokenData = await withTracing(tracer, 'Verify Token', async (span) => {
            const data = verifyToken(call.request.token);
            if (!data) {
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'Invalid token'
                });
                callback({
                    code: status.UNAUTHENTICATED,
                    message: 'Invalid verification token',
                });
                return null;
            }
            return data;
        });

        if (!tokenData) return;

        const isVerified = await withTracing(tracer, 'Find User', async (span) => {
            const userExists = await prisma.user.findUnique({
                where: { email: tokenData.email },
            });
            if (userExists?.isVerified === true) {
                callback({
                    code: status.ALREADY_EXISTS,
                    message: 'User already verified',
                }, {
                    success: false,
                    message: 'User already verified',
                });
                return;
            }
            return userExists;
        })
        
        if (!isVerified) return;

        await withTracing(tracer, 'Update User Verification', async (span) => {
            const user = await prisma.user.update({
                where: { email: tokenData.email },
                data: {
                    isVerified: true,
                }
            });

            logger.info('Email verified successfully', { userId: user.id });
            span.setStatus({ code: SpanStatusCode.OK });
        });

        callback(null, {
            success: true,
            message: 'Email verified successfully'
        });

    } catch (error) {
        logger.error('Error in VerifyEmail', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        });

        if ((error as any).code === 'P2025') {
            return callback({
                code: status.NOT_FOUND,
                message: 'User not found',
            });
        }

        callback({
            code: status.INTERNAL,
            message: 'An error occurred while verifying your email',
        });
    }
} 