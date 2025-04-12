// Original file: protos/nexura.proto

import type { User as _nexuraTelemetry_User, User__Output as _nexuraTelemetry_User__Output } from '../nexuraTelemetry/User';

export interface LoginUserResponse {
  'success'?: (boolean);
  'message'?: (string);
  'accessToken'?: (string);
  'refreshToken'?: (string);
  'user'?: (_nexuraTelemetry_User | null);
}

export interface LoginUserResponse__Output {
  'success': (boolean);
  'message': (string);
  'accessToken': (string);
  'refreshToken': (string);
  'user': (_nexuraTelemetry_User__Output | null);
}
