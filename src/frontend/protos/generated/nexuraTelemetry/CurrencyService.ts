// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CurrencyConversionRequest as _nexuraTelemetry_CurrencyConversionRequest, CurrencyConversionRequest__Output as _nexuraTelemetry_CurrencyConversionRequest__Output } from '../nexuraTelemetry/CurrencyConversionRequest';
import type { Empty as _nexuraTelemetry_Empty, Empty__Output as _nexuraTelemetry_Empty__Output } from '../nexuraTelemetry/Empty';
import type { GetSupportedCurrenciesResponse as _nexuraTelemetry_GetSupportedCurrenciesResponse, GetSupportedCurrenciesResponse__Output as _nexuraTelemetry_GetSupportedCurrenciesResponse__Output } from '../nexuraTelemetry/GetSupportedCurrenciesResponse';
import type { Money as _nexuraTelemetry_Money, Money__Output as _nexuraTelemetry_Money__Output } from '../nexuraTelemetry/Money';

export interface CurrencyServiceClient extends grpc.Client {
  Convert(argument: _nexuraTelemetry_CurrencyConversionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  Convert(argument: _nexuraTelemetry_CurrencyConversionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  Convert(argument: _nexuraTelemetry_CurrencyConversionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  Convert(argument: _nexuraTelemetry_CurrencyConversionRequest, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  convert(argument: _nexuraTelemetry_CurrencyConversionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  convert(argument: _nexuraTelemetry_CurrencyConversionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  convert(argument: _nexuraTelemetry_CurrencyConversionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  convert(argument: _nexuraTelemetry_CurrencyConversionRequest, callback: grpc.requestCallback<_nexuraTelemetry_Money__Output>): grpc.ClientUnaryCall;
  
  GetSupportedCurrencies(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  GetSupportedCurrencies(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  GetSupportedCurrencies(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  GetSupportedCurrencies(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  getSupportedCurrencies(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  getSupportedCurrencies(argument: _nexuraTelemetry_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  getSupportedCurrencies(argument: _nexuraTelemetry_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  getSupportedCurrencies(argument: _nexuraTelemetry_Empty, callback: grpc.requestCallback<_nexuraTelemetry_GetSupportedCurrenciesResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface CurrencyServiceHandlers extends grpc.UntypedServiceImplementation {
  Convert: grpc.handleUnaryCall<_nexuraTelemetry_CurrencyConversionRequest__Output, _nexuraTelemetry_Money>;
  
  GetSupportedCurrencies: grpc.handleUnaryCall<_nexuraTelemetry_Empty__Output, _nexuraTelemetry_GetSupportedCurrenciesResponse>;
  
}

export interface CurrencyServiceDefinition extends grpc.ServiceDefinition {
  Convert: MethodDefinition<_nexuraTelemetry_CurrencyConversionRequest, _nexuraTelemetry_Money, _nexuraTelemetry_CurrencyConversionRequest__Output, _nexuraTelemetry_Money__Output>
  GetSupportedCurrencies: MethodDefinition<_nexuraTelemetry_Empty, _nexuraTelemetry_GetSupportedCurrenciesResponse, _nexuraTelemetry_Empty__Output, _nexuraTelemetry_GetSupportedCurrenciesResponse__Output>
}
