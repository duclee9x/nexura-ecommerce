// Original file: protos/nexura.proto

import type { User as _nexuraTelemetry_User, User__Output as _nexuraTelemetry_User__Output } from '../nexuraTelemetry/User';

export interface UpdateUserRequest {
  'id'?: (string);
  'user'?: (_nexuraTelemetry_User | null);
  'currentPassword'?: (string);
  'newPassword'?: (string);
}

export interface UpdateUserRequest__Output {
  'id': (string);
  'user': (_nexuraTelemetry_User__Output | null);
  'currentPassword': (string);
  'newPassword': (string);
}
