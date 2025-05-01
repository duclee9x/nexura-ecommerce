import { UserServiceClient, User, ValidateOTPResponse, ForgotPasswordResponse, RegisterUserRequest, ResetPasswordResponse, VerifyAccountResponse, LoginUserResponse, RegisterUserResponse, GetUserResponse, UpdateUserResponse, DeleteUserResponse, UpdateUserRequest, LoginUserRequest, VerifyAccountRequest, ResetPasswordRequest, ForgotPasswordRequest, ValidateOTPRequest, GetAllUsersResponse, RegisterUserForAdminResponse, RegisterUserForAdminRequest, DeleteUserRequest, GetBatchUsersResponse    } from '@nexura/grpc_gateway/protos';
import { createServiceConfig, createClient, promisifyGrpcCall } from './baseAdapter';

const userConfig = createServiceConfig('UserService', 50051);
const userClient = createClient(UserServiceClient, userConfig);

export const userService = {
    validateOTP: async (validateOTPRequest: ValidateOTPRequest): Promise<ValidateOTPResponse> => {
        return promisifyGrpcCall(userClient, 'validateOtp', { validateOTPRequest })
    },

    forgotPassword: async (forgotPasswordRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
        return promisifyGrpcCall(userClient, 'forgotPassword', { forgotPasswordRequest });
    },

    resetPassword: async (resetPasswordRequest: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
        return promisifyGrpcCall(userClient, 'resetPassword', { resetPasswordRequest });
    },

    verifyAccount: async (verifyAccountRequest: VerifyAccountRequest): Promise<VerifyAccountResponse> => {
        return promisifyGrpcCall(userClient, 'verifyAccount', { verifyAccountRequest });
    },

    loginUser: async (loginUserRequest: LoginUserRequest): Promise<LoginUserResponse> => {
        return promisifyGrpcCall(userClient, 'loginUser', { loginUserRequest });
    },

    registerUser: async (registerUserRequest: RegisterUserRequest): Promise<RegisterUserResponse> => {
        return promisifyGrpcCall(userClient, 'registerUser', { registerUserRequest });
    },

    registerUserForAdmin: async (registerUserForAdminRequest: RegisterUserForAdminRequest): Promise<RegisterUserForAdminResponse> => {
        return promisifyGrpcCall(userClient, 'registerUserForAdmin', { registerUserForAdminRequest });
    },

    getUser: async (id: string): Promise<GetUserResponse> => {
        return promisifyGrpcCall(userClient, 'getUser', { id });
    },

    getBatchUsers: async (userIds: string[]): Promise<GetBatchUsersResponse> => {
        return promisifyGrpcCall(userClient, 'getBatchUsers', { userIds });
    },

    getAllUsers: async (): Promise<GetAllUsersResponse & { users: User[] }> => {
        return promisifyGrpcCall(userClient, 'getAllUsers', {});
    },
    updateUser: async (updateUserRequest: UpdateUserRequest): Promise<UpdateUserResponse> => {
        return promisifyGrpcCall(userClient, 'updateUser', { updateUserRequest });
    },

    deleteUser: async (deleteUserRequest: DeleteUserRequest): Promise<DeleteUserResponse> => {
        return promisifyGrpcCall(userClient, 'deleteUser', deleteUserRequest);
    }


}; 