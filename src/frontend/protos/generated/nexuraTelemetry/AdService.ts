// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AdRequest as _nexuraTelemetry_AdRequest, AdRequest__Output as _nexuraTelemetry_AdRequest__Output } from '../nexuraTelemetry/AdRequest';
import type { AdResponse as _nexuraTelemetry_AdResponse, AdResponse__Output as _nexuraTelemetry_AdResponse__Output } from '../nexuraTelemetry/AdResponse';

export interface AdServiceClient extends grpc.Client {
  GetAds(argument: _nexuraTelemetry_AdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  GetAds(argument: _nexuraTelemetry_AdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  GetAds(argument: _nexuraTelemetry_AdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  GetAds(argument: _nexuraTelemetry_AdRequest, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  getAds(argument: _nexuraTelemetry_AdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  getAds(argument: _nexuraTelemetry_AdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  getAds(argument: _nexuraTelemetry_AdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  getAds(argument: _nexuraTelemetry_AdRequest, callback: grpc.requestCallback<_nexuraTelemetry_AdResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AdServiceHandlers extends grpc.UntypedServiceImplementation {
  GetAds: grpc.handleUnaryCall<_nexuraTelemetry_AdRequest__Output, _nexuraTelemetry_AdResponse>;
  
}

export interface AdServiceDefinition extends grpc.ServiceDefinition {
  GetAds: MethodDefinition<_nexuraTelemetry_AdRequest, _nexuraTelemetry_AdResponse, _nexuraTelemetry_AdRequest__Output, _nexuraTelemetry_AdResponse__Output>
}
