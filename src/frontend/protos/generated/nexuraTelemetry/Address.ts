// Original file: protos/nexura.proto


export interface Address {
  'id'?: (string);
  'name'?: (string);
  'street'?: (string);
  'city'?: (string);
  'state'?: (string);
  'countryId'?: (string);
  'zip'?: (string);
  'vnProvinceId'?: (string);
  'vnDistrictId'?: (string);
  'vnWardId'?: (string);
  'isDefault'?: (boolean);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface Address__Output {
  'id': (string);
  'name': (string);
  'street': (string);
  'city': (string);
  'state': (string);
  'countryId': (string);
  'zip': (string);
  'vnProvinceId': (string);
  'vnDistrictId': (string);
  'vnWardId': (string);
  'isDefault': (boolean);
  'createdAt': (string);
  'updatedAt': (string);
}
