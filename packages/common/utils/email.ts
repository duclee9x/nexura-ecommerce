import { createEmailServiceClient } from '../grpc/client';
import { logger } from "../utils";

const emailClient = createEmailServiceClient();

const makeEmailRequest = async <T>(method: string, request: any): Promise<T> => {
    try {
        return await new Promise<T>((resolve, reject) => {
            emailClient[method](request, (error: any, response: T) => {
                if (error) {
                    logger.error(`Error in ${method}:`, error);
                    reject(error);
                } else {
                    resolve(response);
                }
            });
        });
    } catch (error) {
        logger.error(`Failed to execute ${method}:`, error);
        throw error;
    }
};

export const sendWelcomeEmail = async (email: string, name: string, token: string) => {
    await makeEmailRequest<void>('sendWelcomeEmail', { email, name, token });
};

export const sendOTPResetPassword = async (email: string, otp: string) => {
    await makeEmailRequest<void>('sendOTPResetPassword', { email, otp });
}; 