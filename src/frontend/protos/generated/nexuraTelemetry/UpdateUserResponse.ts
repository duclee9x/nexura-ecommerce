// Original file: protos/nexura.proto

import type { User as _nexuraTelemetry_User, User__Output as _nexuraTelemetry_User__Output } from '../nexuraTelemetry/User';

export interface UpdateUserResponse {
  'success'?: (boolean);
  'message'?: (string);
  'user'?: (_nexuraTelemetry_User | null);
}

export interface UpdateUserResponse__Output {
  'success': (boolean);
  'message': (string);
  'user': (_nexuraTelemetry_User__Output | null);
}
