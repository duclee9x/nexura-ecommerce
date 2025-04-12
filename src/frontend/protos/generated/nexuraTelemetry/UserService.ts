// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DeleteUserRequest as _nexuraTelemetry_DeleteUserRequest, DeleteUserRequest__Output as _nexuraTelemetry_DeleteUserRequest__Output } from '../nexuraTelemetry/DeleteUserRequest';
import type { DeleteUserResponse as _nexuraTelemetry_DeleteUserResponse, DeleteUserResponse__Output as _nexuraTelemetry_DeleteUserResponse__Output } from '../nexuraTelemetry/DeleteUserResponse';
import type { ForgotPasswordRequest as _nexuraTelemetry_ForgotPasswordRequest, ForgotPasswordRequest__Output as _nexuraTelemetry_ForgotPasswordRequest__Output } from '../nexuraTelemetry/ForgotPasswordRequest';
import type { ForgotPasswordResponse as _nexuraTelemetry_ForgotPasswordResponse, ForgotPasswordResponse__Output as _nexuraTelemetry_ForgotPasswordResponse__Output } from '../nexuraTelemetry/ForgotPasswordResponse';
import type { GetUserRequest as _nexuraTelemetry_GetUserRequest, GetUserRequest__Output as _nexuraTelemetry_GetUserRequest__Output } from '../nexuraTelemetry/GetUserRequest';
import type { GetUserResponse as _nexuraTelemetry_GetUserResponse, GetUserResponse__Output as _nexuraTelemetry_GetUserResponse__Output } from '../nexuraTelemetry/GetUserResponse';
import type { LoginUserRequest as _nexuraTelemetry_LoginUserRequest, LoginUserRequest__Output as _nexuraTelemetry_LoginUserRequest__Output } from '../nexuraTelemetry/LoginUserRequest';
import type { LoginUserResponse as _nexuraTelemetry_LoginUserResponse, LoginUserResponse__Output as _nexuraTelemetry_LoginUserResponse__Output } from '../nexuraTelemetry/LoginUserResponse';
import type { RegisterUserRequest as _nexuraTelemetry_RegisterUserRequest, RegisterUserRequest__Output as _nexuraTelemetry_RegisterUserRequest__Output } from '../nexuraTelemetry/RegisterUserRequest';
import type { RegisterUserResponse as _nexuraTelemetry_RegisterUserResponse, RegisterUserResponse__Output as _nexuraTelemetry_RegisterUserResponse__Output } from '../nexuraTelemetry/RegisterUserResponse';
import type { ResetPasswordRequest as _nexuraTelemetry_ResetPasswordRequest, ResetPasswordRequest__Output as _nexuraTelemetry_ResetPasswordRequest__Output } from '../nexuraTelemetry/ResetPasswordRequest';
import type { ResetPasswordResponse as _nexuraTelemetry_ResetPasswordResponse, ResetPasswordResponse__Output as _nexuraTelemetry_ResetPasswordResponse__Output } from '../nexuraTelemetry/ResetPasswordResponse';
import type { UpdateUserRequest as _nexuraTelemetry_UpdateUserRequest, UpdateUserRequest__Output as _nexuraTelemetry_UpdateUserRequest__Output } from '../nexuraTelemetry/UpdateUserRequest';
import type { UpdateUserResponse as _nexuraTelemetry_UpdateUserResponse, UpdateUserResponse__Output as _nexuraTelemetry_UpdateUserResponse__Output } from '../nexuraTelemetry/UpdateUserResponse';
import type { ValidateOTPRequest as _nexuraTelemetry_ValidateOTPRequest, ValidateOTPRequest__Output as _nexuraTelemetry_ValidateOTPRequest__Output } from '../nexuraTelemetry/ValidateOTPRequest';
import type { ValidateOTPResponse as _nexuraTelemetry_ValidateOTPResponse, ValidateOTPResponse__Output as _nexuraTelemetry_ValidateOTPResponse__Output } from '../nexuraTelemetry/ValidateOTPResponse';
import type { VerifyAccountRequest as _nexuraTelemetry_VerifyAccountRequest, VerifyAccountRequest__Output as _nexuraTelemetry_VerifyAccountRequest__Output } from '../nexuraTelemetry/VerifyAccountRequest';
import type { VerifyAccountResponse as _nexuraTelemetry_VerifyAccountResponse, VerifyAccountResponse__Output as _nexuraTelemetry_VerifyAccountResponse__Output } from '../nexuraTelemetry/VerifyAccountResponse';

export interface UserServiceClient extends grpc.Client {
  DeleteUser(argument: _nexuraTelemetry_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _nexuraTelemetry_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _nexuraTelemetry_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  DeleteUser(argument: _nexuraTelemetry_DeleteUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _nexuraTelemetry_DeleteUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _nexuraTelemetry_DeleteUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _nexuraTelemetry_DeleteUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _nexuraTelemetry_DeleteUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteUserResponse__Output>): grpc.ClientUnaryCall;
  
  ForgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  ForgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  ForgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  ForgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  forgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  forgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  forgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  forgotPassword(argument: _nexuraTelemetry_ForgotPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_ForgotPasswordResponse__Output>): grpc.ClientUnaryCall;
  
  GetUser(argument: _nexuraTelemetry_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _nexuraTelemetry_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _nexuraTelemetry_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _nexuraTelemetry_GetUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _nexuraTelemetry_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _nexuraTelemetry_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _nexuraTelemetry_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _nexuraTelemetry_GetUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetUserResponse__Output>): grpc.ClientUnaryCall;
  
  LoginUser(argument: _nexuraTelemetry_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _nexuraTelemetry_LoginUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _nexuraTelemetry_LoginUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  LoginUser(argument: _nexuraTelemetry_LoginUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _nexuraTelemetry_LoginUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _nexuraTelemetry_LoginUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _nexuraTelemetry_LoginUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  loginUser(argument: _nexuraTelemetry_LoginUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_LoginUserResponse__Output>): grpc.ClientUnaryCall;
  
  RegisterUser(argument: _nexuraTelemetry_RegisterUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _nexuraTelemetry_RegisterUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _nexuraTelemetry_RegisterUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  RegisterUser(argument: _nexuraTelemetry_RegisterUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _nexuraTelemetry_RegisterUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _nexuraTelemetry_RegisterUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _nexuraTelemetry_RegisterUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  registerUser(argument: _nexuraTelemetry_RegisterUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_RegisterUserResponse__Output>): grpc.ClientUnaryCall;
  
  ResetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _nexuraTelemetry_ResetPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_ResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateUser(argument: _nexuraTelemetry_UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _nexuraTelemetry_UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _nexuraTelemetry_UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  UpdateUser(argument: _nexuraTelemetry_UpdateUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _nexuraTelemetry_UpdateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _nexuraTelemetry_UpdateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _nexuraTelemetry_UpdateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _nexuraTelemetry_UpdateUserRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateUserResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateOTP(argument: _nexuraTelemetry_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _nexuraTelemetry_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _nexuraTelemetry_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _nexuraTelemetry_ValidateOTPRequest, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _nexuraTelemetry_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _nexuraTelemetry_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _nexuraTelemetry_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _nexuraTelemetry_ValidateOTPRequest, callback: grpc.requestCallback<_nexuraTelemetry_ValidateOTPResponse__Output>): grpc.ClientUnaryCall;
  
  VerifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  VerifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  VerifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  VerifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  verifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  verifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  verifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  verifyAccount(argument: _nexuraTelemetry_VerifyAccountRequest, callback: grpc.requestCallback<_nexuraTelemetry_VerifyAccountResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  DeleteUser: grpc.handleUnaryCall<_nexuraTelemetry_DeleteUserRequest__Output, _nexuraTelemetry_DeleteUserResponse>;
  
  ForgotPassword: grpc.handleUnaryCall<_nexuraTelemetry_ForgotPasswordRequest__Output, _nexuraTelemetry_ForgotPasswordResponse>;
  
  GetUser: grpc.handleUnaryCall<_nexuraTelemetry_GetUserRequest__Output, _nexuraTelemetry_GetUserResponse>;
  
  LoginUser: grpc.handleUnaryCall<_nexuraTelemetry_LoginUserRequest__Output, _nexuraTelemetry_LoginUserResponse>;
  
  RegisterUser: grpc.handleUnaryCall<_nexuraTelemetry_RegisterUserRequest__Output, _nexuraTelemetry_RegisterUserResponse>;
  
  ResetPassword: grpc.handleUnaryCall<_nexuraTelemetry_ResetPasswordRequest__Output, _nexuraTelemetry_ResetPasswordResponse>;
  
  UpdateUser: grpc.handleUnaryCall<_nexuraTelemetry_UpdateUserRequest__Output, _nexuraTelemetry_UpdateUserResponse>;
  
  ValidateOTP: grpc.handleUnaryCall<_nexuraTelemetry_ValidateOTPRequest__Output, _nexuraTelemetry_ValidateOTPResponse>;
  
  VerifyAccount: grpc.handleUnaryCall<_nexuraTelemetry_VerifyAccountRequest__Output, _nexuraTelemetry_VerifyAccountResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  DeleteUser: MethodDefinition<_nexuraTelemetry_DeleteUserRequest, _nexuraTelemetry_DeleteUserResponse, _nexuraTelemetry_DeleteUserRequest__Output, _nexuraTelemetry_DeleteUserResponse__Output>
  ForgotPassword: MethodDefinition<_nexuraTelemetry_ForgotPasswordRequest, _nexuraTelemetry_ForgotPasswordResponse, _nexuraTelemetry_ForgotPasswordRequest__Output, _nexuraTelemetry_ForgotPasswordResponse__Output>
  GetUser: MethodDefinition<_nexuraTelemetry_GetUserRequest, _nexuraTelemetry_GetUserResponse, _nexuraTelemetry_GetUserRequest__Output, _nexuraTelemetry_GetUserResponse__Output>
  LoginUser: MethodDefinition<_nexuraTelemetry_LoginUserRequest, _nexuraTelemetry_LoginUserResponse, _nexuraTelemetry_LoginUserRequest__Output, _nexuraTelemetry_LoginUserResponse__Output>
  RegisterUser: MethodDefinition<_nexuraTelemetry_RegisterUserRequest, _nexuraTelemetry_RegisterUserResponse, _nexuraTelemetry_RegisterUserRequest__Output, _nexuraTelemetry_RegisterUserResponse__Output>
  ResetPassword: MethodDefinition<_nexuraTelemetry_ResetPasswordRequest, _nexuraTelemetry_ResetPasswordResponse, _nexuraTelemetry_ResetPasswordRequest__Output, _nexuraTelemetry_ResetPasswordResponse__Output>
  UpdateUser: MethodDefinition<_nexuraTelemetry_UpdateUserRequest, _nexuraTelemetry_UpdateUserResponse, _nexuraTelemetry_UpdateUserRequest__Output, _nexuraTelemetry_UpdateUserResponse__Output>
  ValidateOTP: MethodDefinition<_nexuraTelemetry_ValidateOTPRequest, _nexuraTelemetry_ValidateOTPResponse, _nexuraTelemetry_ValidateOTPRequest__Output, _nexuraTelemetry_ValidateOTPResponse__Output>
  VerifyAccount: MethodDefinition<_nexuraTelemetry_VerifyAccountRequest, _nexuraTelemetry_VerifyAccountResponse, _nexuraTelemetry_VerifyAccountRequest__Output, _nexuraTelemetry_VerifyAccountResponse__Output>
}
