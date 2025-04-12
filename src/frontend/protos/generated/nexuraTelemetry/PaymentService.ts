// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChargeRequest as _nexuraTelemetry_ChargeRequest, ChargeRequest__Output as _nexuraTelemetry_ChargeRequest__Output } from '../nexuraTelemetry/ChargeRequest';
import type { ChargeResponse as _nexuraTelemetry_ChargeResponse, ChargeResponse__Output as _nexuraTelemetry_ChargeResponse__Output } from '../nexuraTelemetry/ChargeResponse';

export interface PaymentServiceClient extends grpc.Client {
  Charge(argument: _nexuraTelemetry_ChargeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  Charge(argument: _nexuraTelemetry_ChargeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  Charge(argument: _nexuraTelemetry_ChargeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  Charge(argument: _nexuraTelemetry_ChargeRequest, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  charge(argument: _nexuraTelemetry_ChargeRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  charge(argument: _nexuraTelemetry_ChargeRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  charge(argument: _nexuraTelemetry_ChargeRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  charge(argument: _nexuraTelemetry_ChargeRequest, callback: grpc.requestCallback<_nexuraTelemetry_ChargeResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PaymentServiceHandlers extends grpc.UntypedServiceImplementation {
  Charge: grpc.handleUnaryCall<_nexuraTelemetry_ChargeRequest__Output, _nexuraTelemetry_ChargeResponse>;
  
}

export interface PaymentServiceDefinition extends grpc.ServiceDefinition {
  Charge: MethodDefinition<_nexuraTelemetry_ChargeRequest, _nexuraTelemetry_ChargeResponse, _nexuraTelemetry_ChargeRequest__Output, _nexuraTelemetry_ChargeResponse__Output>
}
