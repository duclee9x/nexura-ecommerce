import { UserServiceClient, User } from '../../protos/nexura';
import { DefaultResponse } from '../../lib/types';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const userConfig = createServiceConfig('UserService', 50051);
const userClient = createClient(UserServiceClient, userConfig);

export const userService = {
    validateOTP: async (email: string, otp: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'validateOtp', { email, otp });
    },

    forgotPassword: async (email: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'forgotPassword', { email });
    },

    resetPassword: async (email: string, newPassword: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'resetPassword', { email, newPassword });
    },

    verifyAccount: async (token: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'verifyAccount', { token });
    },

    loginUser: async (email: string, password: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'loginUser', { email, password });
    },

    registerUser: async (firstName: string, lastName: string, email: string, password: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'registerUser', { firstName, lastName, email, password });
    },

    getUser: async (id: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'getUser', { id });
    },

    updateUser: async (id: string, user: User, currentPassword: string, newPassword: string): Promise<DefaultResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'updateUser', { id, user, currentPassword, newPassword });
    },

    deleteUser: async (id: string): Promise<DefaultResponse> => {
        return promisifyGrpcCall(userClient, 'deleteUser', { id });
    }
}; 