import { GetUser } from './user-get';
import { LoginUser } from './user-login';
import { RegisterUser } from './user-register';
import { DeleteUser } from './user-delete';
import { UpdateUser } from './user-update';
import { UntypedServiceImplementation } from '@grpc/grpc-js';
import { forgotPassword } from './user-forgot-password';
import { validateOTP } from './user-validate-otp';
import { updatePassword } from './user-update-password';
import { verifyAccount } from './user-verify-account';

export const userService: UntypedServiceImplementation = {
    getUser: GetUser,
    updateUser: UpdateUser,
    deleteUser: DeleteUser,
    registerUser: RegisterUser,
    loginUser: LoginUser,
    forgotPassword: forgotPassword,
    validateOTP: validateOTP,
    updatePassword: updatePassword,
    verifyAccount: verifyAccount,
}
