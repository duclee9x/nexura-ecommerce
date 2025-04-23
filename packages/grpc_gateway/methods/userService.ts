import { UserServiceClient, User, ValidateOTPResponse, ForgotPasswordResponse, RegisterUserRequest, ResetPasswordResponse, VerifyAccountResponse, LoginUserResponse, RegisterUserResponse, GetUserResponse, UpdateUserResponse, DeleteUserResponse, UpdateUserRequest, LoginUserRequest, VerifyAccountRequest, ResetPasswordRequest, ForgotPasswordRequest, ValidateOTPRequest    } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const userConfig = createServiceConfig('UserService', 50051);
const userClient = createClient(UserServiceClient, userConfig);

export const userService = {
    validateOTP: async (validateOTPRequest: ValidateOTPRequest): Promise<ValidateOTPResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'validateOtp', { validateOTPRequest })
    },

    forgotPassword: async (forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'forgotPassword', { forgotPasswordRequest });
    },

    resetPassword: async (resetPasswordRequest: ResetPasswordRequest): Promise<ResetPasswordResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'resetPassword', { resetPasswordRequest });
    },

    verifyAccount: async (verifyAccountRequest: VerifyAccountRequest): Promise<VerifyAccountResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'verifyAccount', { verifyAccountRequest });
    },

    loginUser: async (loginUserRequest: LoginUserRequest): Promise<LoginUserResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'loginUser', { loginUserRequest });
    },

    registerUser: async (registerUserRequest: RegisterUserRequest): Promise<RegisterUserResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'registerUser', { registerUserRequest });
    },

    getUser: async (id: string): Promise<GetUserResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'getUser', { id });
    },

    updateUser: async (updateUserRequest: UpdateUserRequest): Promise<UpdateUserResponse & { user: User }> => {
        return promisifyGrpcCall(userClient, 'updateUser', { updateUserRequest });
    },

    deleteUser: async (id: string): Promise<DeleteUserResponse> => {
        return promisifyGrpcCall(userClient, 'deleteUser', { id });
    }
}; 