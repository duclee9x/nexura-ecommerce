// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _nexuraTelemetry_Empty, Empty__Output as _nexuraTelemetry_Empty__Output } from '../nexuraTelemetry/Empty';
import type { SendOTPResetPasswordRequest as _nexuraTelemetry_SendOTPResetPasswordRequest, SendOTPResetPasswordRequest__Output as _nexuraTelemetry_SendOTPResetPasswordRequest__Output } from '../nexuraTelemetry/SendOTPResetPasswordRequest';
import type { SendOTPResetPasswordResponse as _nexuraTelemetry_SendOTPResetPasswordResponse, SendOTPResetPasswordResponse__Output as _nexuraTelemetry_SendOTPResetPasswordResponse__Output } from '../nexuraTelemetry/SendOTPResetPasswordResponse';
import type { SendOrderConfirmationRequest as _nexuraTelemetry_SendOrderConfirmationRequest, SendOrderConfirmationRequest__Output as _nexuraTelemetry_SendOrderConfirmationRequest__Output } from '../nexuraTelemetry/SendOrderConfirmationRequest';
import type { SendWelcomeEmailRequest as _nexuraTelemetry_SendWelcomeEmailRequest, SendWelcomeEmailRequest__Output as _nexuraTelemetry_SendWelcomeEmailRequest__Output } from '../nexuraTelemetry/SendWelcomeEmailRequest';
import type { SendWelcomeEmailResponse as _nexuraTelemetry_SendWelcomeEmailResponse, SendWelcomeEmailResponse__Output as _nexuraTelemetry_SendWelcomeEmailResponse__Output } from '../nexuraTelemetry/SendWelcomeEmailResponse';

export interface EmailServiceClient extends grpc.Client {
  SendOTPResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  SendOTPResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  SendOTPResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  SendOTPResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  sendOtpResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  sendOtpResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  sendOtpResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  sendOtpResetPassword(argument: _nexuraTelemetry_SendOTPResetPasswordRequest, callback: grpc.requestCallback<_nexuraTelemetry_SendOTPResetPasswordResponse__Output>): grpc.ClientUnaryCall;
  
  SendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  SendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  SendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  SendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  sendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  sendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  sendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  sendOrderConfirmation(argument: _nexuraTelemetry_SendOrderConfirmationRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  
  SendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  SendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  SendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  SendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  sendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  sendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  sendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  sendWelcomeEmail(argument: _nexuraTelemetry_SendWelcomeEmailRequest, callback: grpc.requestCallback<_nexuraTelemetry_SendWelcomeEmailResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EmailServiceHandlers extends grpc.UntypedServiceImplementation {
  SendOTPResetPassword: grpc.handleUnaryCall<_nexuraTelemetry_SendOTPResetPasswordRequest__Output, _nexuraTelemetry_SendOTPResetPasswordResponse>;
  
  SendOrderConfirmation: grpc.handleUnaryCall<_nexuraTelemetry_SendOrderConfirmationRequest__Output, _nexuraTelemetry_Empty>;
  
  SendWelcomeEmail: grpc.handleUnaryCall<_nexuraTelemetry_SendWelcomeEmailRequest__Output, _nexuraTelemetry_SendWelcomeEmailResponse>;
  
}

export interface EmailServiceDefinition extends grpc.ServiceDefinition {
  SendOTPResetPassword: MethodDefinition<_nexuraTelemetry_SendOTPResetPasswordRequest, _nexuraTelemetry_SendOTPResetPasswordResponse, _nexuraTelemetry_SendOTPResetPasswordRequest__Output, _nexuraTelemetry_SendOTPResetPasswordResponse__Output>
  SendOrderConfirmation: MethodDefinition<_nexuraTelemetry_SendOrderConfirmationRequest, _nexuraTelemetry_Empty, _nexuraTelemetry_SendOrderConfirmationRequest__Output, _nexuraTelemetry_Empty__Output>
  SendWelcomeEmail: MethodDefinition<_nexuraTelemetry_SendWelcomeEmailRequest, _nexuraTelemetry_SendWelcomeEmailResponse, _nexuraTelemetry_SendWelcomeEmailRequest__Output, _nexuraTelemetry_SendWelcomeEmailResponse__Output>
}
