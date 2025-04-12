// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetQuoteRequest as _nexuraTelemetry_GetQuoteRequest, GetQuoteRequest__Output as _nexuraTelemetry_GetQuoteRequest__Output } from '../nexuraTelemetry/GetQuoteRequest';
import type { GetQuoteResponse as _nexuraTelemetry_GetQuoteResponse, GetQuoteResponse__Output as _nexuraTelemetry_GetQuoteResponse__Output } from '../nexuraTelemetry/GetQuoteResponse';
import type { ShipOrderRequest as _nexuraTelemetry_ShipOrderRequest, ShipOrderRequest__Output as _nexuraTelemetry_ShipOrderRequest__Output } from '../nexuraTelemetry/ShipOrderRequest';
import type { ShipOrderResponse as _nexuraTelemetry_ShipOrderResponse, ShipOrderResponse__Output as _nexuraTelemetry_ShipOrderResponse__Output } from '../nexuraTelemetry/ShipOrderResponse';

export interface ShippingServiceClient extends grpc.Client {
  GetQuote(argument: _nexuraTelemetry_GetQuoteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  GetQuote(argument: _nexuraTelemetry_GetQuoteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  GetQuote(argument: _nexuraTelemetry_GetQuoteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  GetQuote(argument: _nexuraTelemetry_GetQuoteRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  getQuote(argument: _nexuraTelemetry_GetQuoteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  getQuote(argument: _nexuraTelemetry_GetQuoteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  getQuote(argument: _nexuraTelemetry_GetQuoteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  getQuote(argument: _nexuraTelemetry_GetQuoteRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetQuoteResponse__Output>): grpc.ClientUnaryCall;
  
  ShipOrder(argument: _nexuraTelemetry_ShipOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  ShipOrder(argument: _nexuraTelemetry_ShipOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  ShipOrder(argument: _nexuraTelemetry_ShipOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  ShipOrder(argument: _nexuraTelemetry_ShipOrderRequest, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  shipOrder(argument: _nexuraTelemetry_ShipOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  shipOrder(argument: _nexuraTelemetry_ShipOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  shipOrder(argument: _nexuraTelemetry_ShipOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  shipOrder(argument: _nexuraTelemetry_ShipOrderRequest, callback: grpc.requestCallback<_nexuraTelemetry_ShipOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ShippingServiceHandlers extends grpc.UntypedServiceImplementation {
  GetQuote: grpc.handleUnaryCall<_nexuraTelemetry_GetQuoteRequest__Output, _nexuraTelemetry_GetQuoteResponse>;
  
  ShipOrder: grpc.handleUnaryCall<_nexuraTelemetry_ShipOrderRequest__Output, _nexuraTelemetry_ShipOrderResponse>;
  
}

export interface ShippingServiceDefinition extends grpc.ServiceDefinition {
  GetQuote: MethodDefinition<_nexuraTelemetry_GetQuoteRequest, _nexuraTelemetry_GetQuoteResponse, _nexuraTelemetry_GetQuoteRequest__Output, _nexuraTelemetry_GetQuoteResponse__Output>
  ShipOrder: MethodDefinition<_nexuraTelemetry_ShipOrderRequest, _nexuraTelemetry_ShipOrderResponse, _nexuraTelemetry_ShipOrderRequest__Output, _nexuraTelemetry_ShipOrderResponse__Output>
}
