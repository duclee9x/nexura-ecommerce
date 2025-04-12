// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateFlagRequest as _nexuraTelemetry_CreateFlagRequest, CreateFlagRequest__Output as _nexuraTelemetry_CreateFlagRequest__Output } from '../nexuraTelemetry/CreateFlagRequest';
import type { CreateFlagResponse as _nexuraTelemetry_CreateFlagResponse, CreateFlagResponse__Output as _nexuraTelemetry_CreateFlagResponse__Output } from '../nexuraTelemetry/CreateFlagResponse';
import type { DeleteFlagRequest as _nexuraTelemetry_DeleteFlagRequest, DeleteFlagRequest__Output as _nexuraTelemetry_DeleteFlagRequest__Output } from '../nexuraTelemetry/DeleteFlagRequest';
import type { DeleteFlagResponse as _nexuraTelemetry_DeleteFlagResponse, DeleteFlagResponse__Output as _nexuraTelemetry_DeleteFlagResponse__Output } from '../nexuraTelemetry/DeleteFlagResponse';
import type { GetFlagRequest as _nexuraTelemetry_GetFlagRequest, GetFlagRequest__Output as _nexuraTelemetry_GetFlagRequest__Output } from '../nexuraTelemetry/GetFlagRequest';
import type { GetFlagResponse as _nexuraTelemetry_GetFlagResponse, GetFlagResponse__Output as _nexuraTelemetry_GetFlagResponse__Output } from '../nexuraTelemetry/GetFlagResponse';
import type { ListFlagsRequest as _nexuraTelemetry_ListFlagsRequest, ListFlagsRequest__Output as _nexuraTelemetry_ListFlagsRequest__Output } from '../nexuraTelemetry/ListFlagsRequest';
import type { ListFlagsResponse as _nexuraTelemetry_ListFlagsResponse, ListFlagsResponse__Output as _nexuraTelemetry_ListFlagsResponse__Output } from '../nexuraTelemetry/ListFlagsResponse';
import type { UpdateFlagRequest as _nexuraTelemetry_UpdateFlagRequest, UpdateFlagRequest__Output as _nexuraTelemetry_UpdateFlagRequest__Output } from '../nexuraTelemetry/UpdateFlagRequest';
import type { UpdateFlagResponse as _nexuraTelemetry_UpdateFlagResponse, UpdateFlagResponse__Output as _nexuraTelemetry_UpdateFlagResponse__Output } from '../nexuraTelemetry/UpdateFlagResponse';

export interface FeatureFlagServiceClient extends grpc.Client {
  CreateFlag(argument: _nexuraTelemetry_CreateFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  CreateFlag(argument: _nexuraTelemetry_CreateFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  CreateFlag(argument: _nexuraTelemetry_CreateFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  CreateFlag(argument: _nexuraTelemetry_CreateFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  createFlag(argument: _nexuraTelemetry_CreateFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  createFlag(argument: _nexuraTelemetry_CreateFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  createFlag(argument: _nexuraTelemetry_CreateFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  createFlag(argument: _nexuraTelemetry_CreateFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_CreateFlagResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  DeleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  DeleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  DeleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  deleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  deleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  deleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  deleteFlag(argument: _nexuraTelemetry_DeleteFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_DeleteFlagResponse__Output>): grpc.ClientUnaryCall;
  
  GetFlag(argument: _nexuraTelemetry_GetFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  GetFlag(argument: _nexuraTelemetry_GetFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  GetFlag(argument: _nexuraTelemetry_GetFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  GetFlag(argument: _nexuraTelemetry_GetFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  getFlag(argument: _nexuraTelemetry_GetFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  getFlag(argument: _nexuraTelemetry_GetFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  getFlag(argument: _nexuraTelemetry_GetFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  getFlag(argument: _nexuraTelemetry_GetFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_GetFlagResponse__Output>): grpc.ClientUnaryCall;
  
  ListFlags(argument: _nexuraTelemetry_ListFlagsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  ListFlags(argument: _nexuraTelemetry_ListFlagsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  ListFlags(argument: _nexuraTelemetry_ListFlagsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  ListFlags(argument: _nexuraTelemetry_ListFlagsRequest, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  listFlags(argument: _nexuraTelemetry_ListFlagsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  listFlags(argument: _nexuraTelemetry_ListFlagsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  listFlags(argument: _nexuraTelemetry_ListFlagsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  listFlags(argument: _nexuraTelemetry_ListFlagsRequest, callback: grpc.requestCallback<_nexuraTelemetry_ListFlagsResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  UpdateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  UpdateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  UpdateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  updateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  updateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  updateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  updateFlag(argument: _nexuraTelemetry_UpdateFlagRequest, callback: grpc.requestCallback<_nexuraTelemetry_UpdateFlagResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface FeatureFlagServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateFlag: grpc.handleUnaryCall<_nexuraTelemetry_CreateFlagRequest__Output, _nexuraTelemetry_CreateFlagResponse>;
  
  DeleteFlag: grpc.handleUnaryCall<_nexuraTelemetry_DeleteFlagRequest__Output, _nexuraTelemetry_DeleteFlagResponse>;
  
  GetFlag: grpc.handleUnaryCall<_nexuraTelemetry_GetFlagRequest__Output, _nexuraTelemetry_GetFlagResponse>;
  
  ListFlags: grpc.handleUnaryCall<_nexuraTelemetry_ListFlagsRequest__Output, _nexuraTelemetry_ListFlagsResponse>;
  
  UpdateFlag: grpc.handleUnaryCall<_nexuraTelemetry_UpdateFlagRequest__Output, _nexuraTelemetry_UpdateFlagResponse>;
  
}

export interface FeatureFlagServiceDefinition extends grpc.ServiceDefinition {
  CreateFlag: MethodDefinition<_nexuraTelemetry_CreateFlagRequest, _nexuraTelemetry_CreateFlagResponse, _nexuraTelemetry_CreateFlagRequest__Output, _nexuraTelemetry_CreateFlagResponse__Output>
  DeleteFlag: MethodDefinition<_nexuraTelemetry_DeleteFlagRequest, _nexuraTelemetry_DeleteFlagResponse, _nexuraTelemetry_DeleteFlagRequest__Output, _nexuraTelemetry_DeleteFlagResponse__Output>
  GetFlag: MethodDefinition<_nexuraTelemetry_GetFlagRequest, _nexuraTelemetry_GetFlagResponse, _nexuraTelemetry_GetFlagRequest__Output, _nexuraTelemetry_GetFlagResponse__Output>
  ListFlags: MethodDefinition<_nexuraTelemetry_ListFlagsRequest, _nexuraTelemetry_ListFlagsResponse, _nexuraTelemetry_ListFlagsRequest__Output, _nexuraTelemetry_ListFlagsResponse__Output>
  UpdateFlag: MethodDefinition<_nexuraTelemetry_UpdateFlagRequest, _nexuraTelemetry_UpdateFlagResponse, _nexuraTelemetry_UpdateFlagRequest__Output, _nexuraTelemetry_UpdateFlagResponse__Output>
}
