
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
  phone: 'phone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isActive: 'isActive',
  isVerified: 'isVerified',
  role: 'role',
  lastLogin: 'lastLogin',
  permissions: 'permissions',
  phoneNumber: 'phoneNumber',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  profilePictureUrl: 'profilePictureUrl'
};

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  street: 'street',
  city: 'city',
  state: 'state',
  vnProvinceId: 'vnProvinceId',
  vnDistrictId: 'vnDistrictId',
  vnWardId: 'vnWardId',
  zip: 'zip',
  countryId: 'countryId',
  isDefault: 'isDefault',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CountryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  codeName: 'codeName'
};

exports.Prisma.AddressProvincesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  administrativeUnitId: 'administrativeUnitId',
  administrativeRegionId: 'administrativeRegionId',
  countryId: 'countryId'
};

exports.Prisma.AddressDistrictsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  provinceCode: 'provinceCode',
  administrativeUnitId: 'administrativeUnitId'
};

exports.Prisma.AddressWardsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  districtId: 'districtId',
  administrativeUnitId: 'administrativeUnitId'
};

exports.Prisma.AddressAdministrativeUnitsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  codeName: 'codeName',
  codeNameEn: 'codeNameEn'
};

exports.Prisma.AddressAdministrativeRegionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  codeName: 'codeName',
  codeNameEn: 'codeNameEn'
};

exports.Prisma.OTPScalarFieldEnum = {
  id: 'id',
  email: 'email',
  type: 'type',
  otp: 'otp',
  createdAt: 'createdAt',
  lastAttempt: 'lastAttempt',
  attemptCount: 'attemptCount',
  isUsed: 'isUsed',
  failedAttempts: 'failedAttempts'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password',
  phone: 'phone',
  role: 'role',
  permissions: 'permissions',
  phoneNumber: 'phoneNumber',
  gender: 'gender',
  profilePictureUrl: 'profilePictureUrl'
};

exports.Prisma.AddressOrderByRelevanceFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  street: 'street',
  city: 'city',
  state: 'state',
  vnProvinceId: 'vnProvinceId',
  vnDistrictId: 'vnDistrictId',
  vnWardId: 'vnWardId',
  zip: 'zip',
  countryId: 'countryId'
};

exports.Prisma.CountryOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  codeName: 'codeName'
};

exports.Prisma.AddressProvincesOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  administrativeUnitId: 'administrativeUnitId',
  administrativeRegionId: 'administrativeRegionId',
  countryId: 'countryId'
};

exports.Prisma.AddressDistrictsOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  provinceCode: 'provinceCode',
  administrativeUnitId: 'administrativeUnitId'
};

exports.Prisma.AddressWardsOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  districtId: 'districtId',
  administrativeUnitId: 'administrativeUnitId'
};

exports.Prisma.AddressAdministrativeUnitsOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  fullName: 'fullName',
  fullNameEn: 'fullNameEn',
  codeName: 'codeName',
  codeNameEn: 'codeNameEn'
};

exports.Prisma.AddressAdministrativeRegionsOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  nameEn: 'nameEn',
  codeName: 'codeName',
  codeNameEn: 'codeNameEn'
};

exports.Prisma.OTPOrderByRelevanceFieldEnum = {
  id: 'id',
  email: 'email',
  type: 'type',
  otp: 'otp'
};


exports.Prisma.ModelName = {
  User: 'User',
  Address: 'Address',
  Country: 'Country',
  AddressProvinces: 'AddressProvinces',
  AddressDistricts: 'AddressDistricts',
  AddressWards: 'AddressWards',
  AddressAdministrativeUnits: 'AddressAdministrativeUnits',
  AddressAdministrativeRegions: 'AddressAdministrativeRegions',
  OTP: 'OTP'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
