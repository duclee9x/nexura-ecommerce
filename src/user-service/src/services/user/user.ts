import { GetUser } from './user-get';
import { LoginUser } from './user-login';
import { RegisterUser } from './user-register';
import { DeleteUser } from './user-delete';
import { UpdateUser } from './user-update';
import type { UntypedServiceImplementation } from '@grpc/grpc-js';
import { forgotPassword } from './user-forgot-password';
import { validateOTP } from './user-validate-otp';
import { verifyAccount } from './user-verify-account';
import { resetPassword } from './user-reset-password.ts';
export const userService: UntypedServiceImplementation = {
    getUser: GetUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser,
    registerUser: RegisterUser,
    loginUser: LoginUser,
    forgotPassword: forgotPassword,
    validateOtp: validateOTP,
    verifyAccount: verifyAccount,
    resetPassword: resetPassword,
}
