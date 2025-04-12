// Original file: protos/nexura.proto

import type { Ward as _nexuraTelemetry_Ward, Ward__Output as _nexuraTelemetry_Ward__Output } from '../nexuraTelemetry/Ward';

export interface GetWardsResponse {
  'success'?: (boolean);
  'message'?: (string);
  'wards'?: (_nexuraTelemetry_Ward)[];
}

export interface GetWardsResponse__Output {
  'success': (boolean);
  'message': (string);
  'wards': (_nexuraTelemetry_Ward__Output)[];
}
