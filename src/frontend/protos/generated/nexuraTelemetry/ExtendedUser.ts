// Original file: protos/nexura.proto

import type { ExtendedAddress as _nexuraTelemetry_ExtendedAddress, ExtendedAddress__Output as _nexuraTelemetry_ExtendedAddress__Output } from '../nexuraTelemetry/ExtendedAddress';

export interface ExtendedUser {
  'id'?: (number);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'createdAt'?: (string);
  'updatedAt'?: (string);
  'isActive'?: (boolean);
  'isVerified'?: (boolean);
  'role'?: (string);
  'lastLogin'?: (string);
  'permissions'?: (string);
  'avatarURL'?: (string);
  'address'?: (_nexuraTelemetry_ExtendedAddress)[];
}

export interface ExtendedUser__Output {
  'id': (number);
  'firstName': (string);
  'lastName': (string);
  'email': (string);
  'createdAt': (string);
  'updatedAt': (string);
  'isActive': (boolean);
  'isVerified': (boolean);
  'role': (string);
  'lastLogin': (string);
  'permissions': (string);
  'avatarURL': (string);
  'address': (_nexuraTelemetry_ExtendedAddress__Output)[];
}
