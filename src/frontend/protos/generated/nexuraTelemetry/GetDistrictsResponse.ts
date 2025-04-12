// Original file: protos/nexura.proto

import type { District as _nexuraTelemetry_District, District__Output as _nexuraTelemetry_District__Output } from '../nexuraTelemetry/District';

export interface GetDistrictsResponse {
  'success'?: (boolean);
  'message'?: (string);
  'districts'?: (_nexuraTelemetry_District)[];
}

export interface GetDistrictsResponse__Output {
  'success': (boolean);
  'message': (string);
  'districts': (_nexuraTelemetry_District__Output)[];
}
