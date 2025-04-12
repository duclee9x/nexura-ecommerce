// Original file: protos/nexura.proto


export interface User {
  'id'?: (string);
  'firstName'?: (string);
  'lastName'?: (string);
  'email'?: (string);
  'phone'?: (string);
  'createdAt'?: (string);
  'dateOfBirth'?: (string);
  'gender'?: (string);
  'updatedAt'?: (string);
  'isActive'?: (boolean);
  'isVerified'?: (boolean);
  'role'?: (string);
  'lastLogin'?: (string);
  'permissions'?: (string);
  'profilePictureUrl'?: (string);
}

export interface User__Output {
  'id': (string);
  'firstName': (string);
  'lastName': (string);
  'email': (string);
  'phone': (string);
  'createdAt': (string);
  'dateOfBirth': (string);
  'gender': (string);
  'updatedAt': (string);
  'isActive': (boolean);
  'isVerified': (boolean);
  'role': (string);
  'lastLogin': (string);
  'permissions': (string);
  'profilePictureUrl': (string);
}
