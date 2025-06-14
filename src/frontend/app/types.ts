// Define the serialized address type
export type SerializedAddress = {
  id:              string
  name:            string
  street:          string
  city:            string
  state:           string
  zip:             string
  countryId:       string
  isDefault:       boolean
  vnProvinceId:    string
  vnDistrictId:    string
  vnWardId:        string
  createdAt:       string
  updatedAt:       string
  countryName?:    string
  vnProvinceName?: string
  vnDistrictName?: string
  vnWardName?:     string
}

// Define the serialized user type
export type SerializedUser = {
  id:           number
  email:        string
  name:         string
  firstName?:   string
  lastName?:    string
  phone?:       string
  gender?:      string
  dateOfBirth?: string
  createdAt:    string
  updatedAt:    string
  address:      SerializedAddress[]
} 