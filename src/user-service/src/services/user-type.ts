import { validateToken, verifyAccessToken } from '../utils/jwt-utils';

interface GetUserRequest {
    id: number;
}

interface UpdateUserRequest {
    id: number;
    name?: string;
    email?: string;
}

interface DeleteUserRequest {
    id: number;
}

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
}

interface LoginUserRequest {
    email: string;
    password: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface DeleteUserResponse {
    success: boolean;
    message: string;
}

interface LoginUserResponse {
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
}


export { GetUserRequest, UpdateUserRequest, DeleteUserRequest, RegisterUserRequest, LoginUserRequest, UserResponse, DeleteUserResponse, LoginUserResponse, validateToken };
