import { GetUser } from './get-user.ts';
import { LoginUser } from './login-user.ts';
import { RegisterUser } from './register-user.ts';
import { DeleteUser } from './delete-user.ts';
import { UpdateUser } from './update-user.ts';
import type { UntypedServiceImplementation } from '@grpc/grpc-js';
import { forgotPassword } from './forgot-password-user.ts';
import { validateOTP } from './validate-otp-user.ts';
import { verifyAccount } from './verify-account-user.ts';
import { resetPassword } from './reset-password-user.ts';
import { GetAllUsers } from './get-all-user.ts';
import { RegisterUserForAdmin } from './register-user-for-admin.ts';
import { GetBatchUsers } from './get-batch-users.ts';
export const userService: UntypedServiceImplementation = {
  getUser:              GetUser,
  getAllUsers:          GetAllUsers,
  updateUser:           UpdateUser,
  deleteUser:           DeleteUser,
  registerUser:         RegisterUser,
  loginUser:            LoginUser,
  forgotPassword:       forgotPassword,
  validateOtp:          validateOTP,
  verifyAccount:        verifyAccount,
  resetPassword:        resetPassword,
  registerUserForAdmin: RegisterUserForAdmin,
  getBatchUsers:        GetBatchUsers,
}
