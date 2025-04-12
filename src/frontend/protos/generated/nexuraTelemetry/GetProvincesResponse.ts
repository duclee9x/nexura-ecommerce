// Original file: protos/nexura.proto

import type { Province as _nexuraTelemetry_Province, Province__Output as _nexuraTelemetry_Province__Output } from '../nexuraTelemetry/Province';

export interface GetProvincesResponse {
  'success'?: (boolean);
  'message'?: (string);
  'provinces'?: (_nexuraTelemetry_Province)[];
}

export interface GetProvincesResponse__Output {
  'success': (boolean);
  'message': (string);
  'provinces': (_nexuraTelemetry_Province__Output)[];
}
