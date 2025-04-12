// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PlaceOrderRequest as _nexuraTelemetry_PlaceOrderRequest, PlaceOrderRequest__Output as _nexuraTelemetry_PlaceOrderRequest__Output } from '../nexuraTelemetry/PlaceOrderRequest';
import type { PlaceOrderResponse as _nexuraTelemetry_PlaceOrderResponse, PlaceOrderResponse__Output as _nexuraTelemetry_PlaceOrderResponse__Output } from '../nexuraTelemetry/PlaceOrderResponse';

export interface CheckoutServiceClient extends grpc.Client {
  PlaceOrder(argument: _nexuraTelemetry_PlaceOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  PlaceOrder(argument: _nexuraTelemetry_PlaceOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  PlaceOrder(argument: _nexuraTelemetry_PlaceOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  PlaceOrder(argument: _nexuraTelemetry_PlaceOrderRequest, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  placeOrder(argument: _nexuraTelemetry_PlaceOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  placeOrder(argument: _nexuraTelemetry_PlaceOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  placeOrder(argument: _nexuraTelemetry_PlaceOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  placeOrder(argument: _nexuraTelemetry_PlaceOrderRequest, callback: grpc.requestCallback<_nexuraTelemetry_PlaceOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CheckoutServiceHandlers extends grpc.UntypedServiceImplementation {
  PlaceOrder: grpc.handleUnaryCall<_nexuraTelemetry_PlaceOrderRequest__Output, _nexuraTelemetry_PlaceOrderResponse>;
  
}

export interface CheckoutServiceDefinition extends grpc.ServiceDefinition {
  PlaceOrder: MethodDefinition<_nexuraTelemetry_PlaceOrderRequest, _nexuraTelemetry_PlaceOrderResponse, _nexuraTelemetry_PlaceOrderRequest__Output, _nexuraTelemetry_PlaceOrderResponse__Output>
}
