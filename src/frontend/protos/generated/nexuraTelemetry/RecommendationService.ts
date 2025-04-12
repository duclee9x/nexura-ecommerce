// Original file: protos/nexura.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ListRecommendationsRequest as _nexuraTelemetry_ListRecommendationsRequest, ListRecommendationsRequest__Output as _nexuraTelemetry_ListRecommendationsRequest__Output } from '../nexuraTelemetry/ListRecommendationsRequest';
import type { ListRecommendationsResponse as _nexuraTelemetry_ListRecommendationsResponse, ListRecommendationsResponse__Output as _nexuraTelemetry_ListRecommendationsResponse__Output } from '../nexuraTelemetry/ListRecommendationsResponse';

export interface RecommendationServiceClient extends grpc.Client {
  ListRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  ListRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  ListRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  ListRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  listRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  listRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  listRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  listRecommendations(argument: _nexuraTelemetry_ListRecommendationsRequest, callback: grpc.requestCallback<_nexuraTelemetry_ListRecommendationsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface RecommendationServiceHandlers extends grpc.UntypedServiceImplementation {
  ListRecommendations: grpc.handleUnaryCall<_nexuraTelemetry_ListRecommendationsRequest__Output, _nexuraTelemetry_ListRecommendationsResponse>;
  
}

export interface RecommendationServiceDefinition extends grpc.ServiceDefinition {
  ListRecommendations: MethodDefinition<_nexuraTelemetry_ListRecommendationsRequest, _nexuraTelemetry_ListRecommendationsResponse, _nexuraTelemetry_ListRecommendationsRequest__Output, _nexuraTelemetry_ListRecommendationsResponse__Output>
}
