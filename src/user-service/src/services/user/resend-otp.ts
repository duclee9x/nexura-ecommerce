import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'

import { SpanStatusCode, withTracing, api, logger } from '@nexura/common/utils';
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { ResendOTPResponse, ResendOTPRequest } from "@nexura/grpc_gateway/protos";
import { sendEmail, createOTP } from '@nexura/common/utils';
import { render, pretty } from '@react-email/components';
import { RegisterEmail } from '@nexura/email-template';

const tracer = api.trace.getTracer('ResendOTP');
const prisma = new PrismaClient();

export const ResendOTP = async (
  call: ServerUnaryCall<ResendOTPRequest, ResendOTPResponse>,
  callback: sendUnaryData<ResendOTPResponse>
) => {
  try {
    const { email, type } = call.request;

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn('User not found for resend OTP', { email });
      callback(null, {
        success: false,
        message: 'User not found',
      });
      return;
    }

    // Check last OTP (type: 'activation', isUsed: false)
    const lastOtp = await prisma.oTP.findFirst({
      where: {
        email,
        type:   type,
        isUsed: false
      },
      orderBy: { createdAt: 'desc' }
    });
    if (lastOtp && lastOtp.createdAt) {
      const now = new Date();
      const diffMs = now.getTime() - lastOtp.createdAt.getTime();
      if (diffMs < 5 * 60 * 1000) { // 5 minutes
        callback(null, {
          success: false,
          message: 'OTP was sent recently. Please wait before requesting again.'
        });
        return;
      }
    }

    // Generate new OTP (e.g. 6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.oTP.create({
      data: {
        email,
        type:         type,
        otp,
        attemptCount: 0,
        isUsed:       false,
        createdAt:    new Date(),
        lastAttempt:  new Date(),
      }
    });
    // Send OTP via Dapr SMTP
    await withTracing(tracer, 'Send Activation OTP Email', async (span) => {
      try {
        const { OTP: resendOTP, token: resendToken } = await createOTP(email, type);
        const resendVerificationLink = `/verify-email?token=${resendToken}`;
        const resendEmailHtml = await render(RegisterEmail({ OTP: resendOTP, verificationLink: resendVerificationLink })); 
        const htmlString = await pretty(resendEmailHtml);
        await sendEmail(email, "Nexura - Welcome", htmlString);

        span.setStatus({
          code:    SpanStatusCode.OK,
          message: 'OTP email sent successfully'
        });
        logger.info('OTP email sent successfully', { email });
      } catch (error) {
        logger.error('Failed to send OTP email:', error);
        span.setStatus({
          code:    SpanStatusCode.ERROR,
          message: 'Failed to send OTP email'
        });
        // Don't fail the resend if email fails
      }
    });

    callback(null, {
      success: true,
      message: 'OTP resent successfully'
    });

  } catch (error) {
    logger.error('Error in ResendOtp', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    callback(null, {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

