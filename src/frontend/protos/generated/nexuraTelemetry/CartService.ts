// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddItemRequest as _nexuraTelemetry_AddItemRequest, AddItemRequest__Output as _nexuraTelemetry_AddItemRequest__Output } from '../nexuraTelemetry/AddItemRequest';
import type { Cart as _nexuraTelemetry_Cart, Cart__Output as _nexuraTelemetry_Cart__Output } from '../nexuraTelemetry/Cart';
import type { Empty as _nexuraTelemetry_Empty, Empty__Output as _nexuraTelemetry_Empty__Output } from '../nexuraTelemetry/Empty';
import type { EmptyCartRequest as _nexuraTelemetry_EmptyCartRequest, EmptyCartRequest__Output as _nexuraTelemetry_EmptyCartRequest__Output } from '../nexuraTelemetry/EmptyCartRequest';
import type { GetCartRequest as _nexuraTelemetry_GetCartRequest, GetCartRequest__Output as _nexuraTelemetry_GetCartRequest__Output } from '../nexuraTelemetry/GetCartRequest';

export interface CartServiceClient extends grpc.Client {
  AddItem(argument: _nexuraTelemetry_AddItemRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  AddItem(argument: _nexuraTelemetry_AddItemRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  AddItem(argument: _nexuraTelemetry_AddItemRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  AddItem(argument: _nexuraTelemetry_AddItemRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  addItem(argument: _nexuraTelemetry_AddItemRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  addItem(argument: _nexuraTelemetry_AddItemRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  addItem(argument: _nexuraTelemetry_AddItemRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  addItem(argument: _nexuraTelemetry_AddItemRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  
  EmptyCart(argument: _nexuraTelemetry_EmptyCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  EmptyCart(argument: _nexuraTelemetry_EmptyCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  EmptyCart(argument: _nexuraTelemetry_EmptyCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  EmptyCart(argument: _nexuraTelemetry_EmptyCartRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _nexuraTelemetry_EmptyCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _nexuraTelemetry_EmptyCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _nexuraTelemetry_EmptyCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _nexuraTelemetry_EmptyCartRequest, callback: grpc.requestCallback<_nexuraTelemetry_Empty__Output>): grpc.ClientUnaryCall;
  
  GetCart(argument: _nexuraTelemetry_GetCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _nexuraTelemetry_GetCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _nexuraTelemetry_GetCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  GetCart(argument: _nexuraTelemetry_GetCartRequest, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  getCart(argument: _nexuraTelemetry_GetCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  getCart(argument: _nexuraTelemetry_GetCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  getCart(argument: _nexuraTelemetry_GetCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  getCart(argument: _nexuraTelemetry_GetCartRequest, callback: grpc.requestCallback<_nexuraTelemetry_Cart__Output>): grpc.ClientUnaryCall;
  
}

export interface CartServiceHandlers extends grpc.UntypedServiceImplementation {
  AddItem: grpc.handleUnaryCall<_nexuraTelemetry_AddItemRequest__Output, _nexuraTelemetry_Empty>;
  
  EmptyCart: grpc.handleUnaryCall<_nexuraTelemetry_EmptyCartRequest__Output, _nexuraTelemetry_Empty>;
  
  GetCart: grpc.handleUnaryCall<_nexuraTelemetry_GetCartRequest__Output, _nexuraTelemetry_Cart>;
  
}

export interface CartServiceDefinition extends grpc.ServiceDefinition {
  AddItem: MethodDefinition<_nexuraTelemetry_AddItemRequest, _nexuraTelemetry_Empty, _nexuraTelemetry_AddItemRequest__Output, _nexuraTelemetry_Empty__Output>
  EmptyCart: MethodDefinition<_nexuraTelemetry_EmptyCartRequest, _nexuraTelemetry_Empty, _nexuraTelemetry_EmptyCartRequest__Output, _nexuraTelemetry_Empty__Output>
  GetCart: MethodDefinition<_nexuraTelemetry_GetCartRequest, _nexuraTelemetry_Cart, _nexuraTelemetry_GetCartRequest__Output, _nexuraTelemetry_Cart__Output>
}
