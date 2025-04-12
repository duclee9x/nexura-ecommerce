// Original file: protos/nexura.proto


export interface ExtendedAddress {
  'id'?: (string);
  'name'?: (string);
  'street'?: (string);
  'city'?: (string);
  'state'?: (string);
  'countryId'?: (string);
  'countryName'?: (string);
  'zip'?: (string);
  'vnProvinceId'?: (string);
  'vnProvinceName'?: (string);
  'vnDistrictId'?: (string);
  'vnDistrictName'?: (string);
  'vnWardId'?: (string);
  'vnWardName'?: (string);
  'isDefault'?: (boolean);
  'createdAt'?: (string);
  'updatedAt'?: (string);
}

export interface ExtendedAddress__Output {
  'id': (string);
  'name': (string);
  'street': (string);
  'city': (string);
  'state': (string);
  'countryId': (string);
  'countryName': (string);
  'zip': (string);
  'vnProvinceId': (string);
  'vnProvinceName': (string);
  'vnDistrictId': (string);
  'vnDistrictName': (string);
  'vnWardId': (string);
  'vnWardName': (string);
  'isDefault': (boolean);
  'createdAt': (string);
  'updatedAt': (string);
}
