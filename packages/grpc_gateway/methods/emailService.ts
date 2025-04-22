import { EmailServiceClient, SendOTPResetPasswordRequest, SendOTPResetPasswordResponse, SendWelcomeEmailRequest, SendWelcomeEmailResponse } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

type EmailServiceMethods = {
    sendOtpResetPassword: (request: SendOTPResetPasswordRequest, callback: (error: Error | null, response: SendOTPResetPasswordResponse) => void) => void;
    sendWelcomeEmail: (request: SendWelcomeEmailRequest, callback: (error: Error | null, response: SendWelcomeEmailResponse) => void) => void;
};

const emailConfig = createServiceConfig('EmailService', 50050);
const emailClient = createClient(EmailServiceClient, emailConfig);

export const emailService = {
    sendOTPResetPassword: async (request: SendOTPResetPasswordRequest): Promise<SendOTPResetPasswordResponse> => {
        return promisifyGrpcCall<SendOTPResetPasswordResponse, EmailServiceClient & EmailServiceMethods>(
            emailClient,
            'sendOtpResetPassword',
            request
        );
    },
    sendWelcomeEmail: async (request: SendWelcomeEmailRequest): Promise<SendWelcomeEmailResponse> => {
        return promisifyGrpcCall<SendWelcomeEmailResponse, EmailServiceClient & EmailServiceMethods>(
            emailClient,
            'sendWelcomeEmail',
            request
        );
    },
}; 