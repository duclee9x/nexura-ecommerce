// Original file: protos/nexura.proto

import type { User as _nexuraTelemetry_User, User__Output as _nexuraTelemetry_User__Output } from '../nexuraTelemetry/User';

export interface UserResponse {
  'success'?: (boolean);
  'message'?: (string);
  'user'?: (_nexuraTelemetry_User | null);
}

export interface UserResponse__Output {
  'success': (boolean);
  'message': (string);
  'user': (_nexuraTelemetry_User__Output | null);
}
