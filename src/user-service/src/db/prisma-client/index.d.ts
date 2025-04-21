
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Country
 * 
 */
export type Country = $Result.DefaultSelection<Prisma.$CountryPayload>
/**
 * Model AddressProvinces
 * 
 */
export type AddressProvinces = $Result.DefaultSelection<Prisma.$AddressProvincesPayload>
/**
 * Model AddressDistricts
 * 
 */
export type AddressDistricts = $Result.DefaultSelection<Prisma.$AddressDistrictsPayload>
/**
 * Model AddressWards
 * 
 */
export type AddressWards = $Result.DefaultSelection<Prisma.$AddressWardsPayload>
/**
 * Model AddressAdministrativeUnits
 * 
 */
export type AddressAdministrativeUnits = $Result.DefaultSelection<Prisma.$AddressAdministrativeUnitsPayload>
/**
 * Model AddressAdministrativeRegions
 * 
 */
export type AddressAdministrativeRegions = $Result.DefaultSelection<Prisma.$AddressAdministrativeRegionsPayload>
/**
 * Model OTP
 * 
 */
export type OTP = $Result.DefaultSelection<Prisma.$OTPPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.CountryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressProvinces`: Exposes CRUD operations for the **AddressProvinces** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressProvinces
    * const addressProvinces = await prisma.addressProvinces.findMany()
    * ```
    */
  get addressProvinces(): Prisma.AddressProvincesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressDistricts`: Exposes CRUD operations for the **AddressDistricts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressDistricts
    * const addressDistricts = await prisma.addressDistricts.findMany()
    * ```
    */
  get addressDistricts(): Prisma.AddressDistrictsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressWards`: Exposes CRUD operations for the **AddressWards** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressWards
    * const addressWards = await prisma.addressWards.findMany()
    * ```
    */
  get addressWards(): Prisma.AddressWardsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressAdministrativeUnits`: Exposes CRUD operations for the **AddressAdministrativeUnits** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressAdministrativeUnits
    * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findMany()
    * ```
    */
  get addressAdministrativeUnits(): Prisma.AddressAdministrativeUnitsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.addressAdministrativeRegions`: Exposes CRUD operations for the **AddressAdministrativeRegions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressAdministrativeRegions
    * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findMany()
    * ```
    */
  get addressAdministrativeRegions(): Prisma.AddressAdministrativeRegionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oTP`: Exposes CRUD operations for the **OTP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OTPS
    * const oTPS = await prisma.oTP.findMany()
    * ```
    */
  get oTP(): Prisma.OTPDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "address" | "country" | "addressProvinces" | "addressDistricts" | "addressWards" | "addressAdministrativeUnits" | "addressAdministrativeRegions" | "oTP"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Country: {
        payload: Prisma.$CountryPayload<ExtArgs>
        fields: Prisma.CountryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findFirst: {
            args: Prisma.CountryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findMany: {
            args: Prisma.CountryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          create: {
            args: Prisma.CountryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          createMany: {
            args: Prisma.CountryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CountryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          update: {
            args: Prisma.CountryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          deleteMany: {
            args: Prisma.CountryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CountryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.CountryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      AddressProvinces: {
        payload: Prisma.$AddressProvincesPayload<ExtArgs>
        fields: Prisma.AddressProvincesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressProvincesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressProvincesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          findFirst: {
            args: Prisma.AddressProvincesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressProvincesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          findMany: {
            args: Prisma.AddressProvincesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>[]
          }
          create: {
            args: Prisma.AddressProvincesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          createMany: {
            args: Prisma.AddressProvincesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressProvincesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          update: {
            args: Prisma.AddressProvincesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          deleteMany: {
            args: Prisma.AddressProvincesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressProvincesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressProvincesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressProvincesPayload>
          }
          aggregate: {
            args: Prisma.AddressProvincesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressProvinces>
          }
          groupBy: {
            args: Prisma.AddressProvincesGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressProvincesGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressProvincesCountArgs<ExtArgs>
            result: $Utils.Optional<AddressProvincesCountAggregateOutputType> | number
          }
        }
      }
      AddressDistricts: {
        payload: Prisma.$AddressDistrictsPayload<ExtArgs>
        fields: Prisma.AddressDistrictsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressDistrictsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressDistrictsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          findFirst: {
            args: Prisma.AddressDistrictsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressDistrictsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          findMany: {
            args: Prisma.AddressDistrictsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>[]
          }
          create: {
            args: Prisma.AddressDistrictsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          createMany: {
            args: Prisma.AddressDistrictsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressDistrictsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          update: {
            args: Prisma.AddressDistrictsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          deleteMany: {
            args: Prisma.AddressDistrictsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressDistrictsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressDistrictsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressDistrictsPayload>
          }
          aggregate: {
            args: Prisma.AddressDistrictsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressDistricts>
          }
          groupBy: {
            args: Prisma.AddressDistrictsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressDistrictsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressDistrictsCountArgs<ExtArgs>
            result: $Utils.Optional<AddressDistrictsCountAggregateOutputType> | number
          }
        }
      }
      AddressWards: {
        payload: Prisma.$AddressWardsPayload<ExtArgs>
        fields: Prisma.AddressWardsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressWardsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressWardsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          findFirst: {
            args: Prisma.AddressWardsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressWardsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          findMany: {
            args: Prisma.AddressWardsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>[]
          }
          create: {
            args: Prisma.AddressWardsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          createMany: {
            args: Prisma.AddressWardsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressWardsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          update: {
            args: Prisma.AddressWardsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          deleteMany: {
            args: Prisma.AddressWardsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressWardsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressWardsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressWardsPayload>
          }
          aggregate: {
            args: Prisma.AddressWardsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressWards>
          }
          groupBy: {
            args: Prisma.AddressWardsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressWardsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressWardsCountArgs<ExtArgs>
            result: $Utils.Optional<AddressWardsCountAggregateOutputType> | number
          }
        }
      }
      AddressAdministrativeUnits: {
        payload: Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>
        fields: Prisma.AddressAdministrativeUnitsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressAdministrativeUnitsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressAdministrativeUnitsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          findFirst: {
            args: Prisma.AddressAdministrativeUnitsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressAdministrativeUnitsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          findMany: {
            args: Prisma.AddressAdministrativeUnitsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>[]
          }
          create: {
            args: Prisma.AddressAdministrativeUnitsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          createMany: {
            args: Prisma.AddressAdministrativeUnitsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressAdministrativeUnitsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          update: {
            args: Prisma.AddressAdministrativeUnitsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          deleteMany: {
            args: Prisma.AddressAdministrativeUnitsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressAdministrativeUnitsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressAdministrativeUnitsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeUnitsPayload>
          }
          aggregate: {
            args: Prisma.AddressAdministrativeUnitsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressAdministrativeUnits>
          }
          groupBy: {
            args: Prisma.AddressAdministrativeUnitsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressAdministrativeUnitsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressAdministrativeUnitsCountArgs<ExtArgs>
            result: $Utils.Optional<AddressAdministrativeUnitsCountAggregateOutputType> | number
          }
        }
      }
      AddressAdministrativeRegions: {
        payload: Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>
        fields: Prisma.AddressAdministrativeRegionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressAdministrativeRegionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressAdministrativeRegionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          findFirst: {
            args: Prisma.AddressAdministrativeRegionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressAdministrativeRegionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          findMany: {
            args: Prisma.AddressAdministrativeRegionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>[]
          }
          create: {
            args: Prisma.AddressAdministrativeRegionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          createMany: {
            args: Prisma.AddressAdministrativeRegionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AddressAdministrativeRegionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          update: {
            args: Prisma.AddressAdministrativeRegionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          deleteMany: {
            args: Prisma.AddressAdministrativeRegionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressAdministrativeRegionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressAdministrativeRegionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressAdministrativeRegionsPayload>
          }
          aggregate: {
            args: Prisma.AddressAdministrativeRegionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressAdministrativeRegions>
          }
          groupBy: {
            args: Prisma.AddressAdministrativeRegionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressAdministrativeRegionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressAdministrativeRegionsCountArgs<ExtArgs>
            result: $Utils.Optional<AddressAdministrativeRegionsCountAggregateOutputType> | number
          }
        }
      }
      OTP: {
        payload: Prisma.$OTPPayload<ExtArgs>
        fields: Prisma.OTPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OTPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OTPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          findFirst: {
            args: Prisma.OTPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OTPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          findMany: {
            args: Prisma.OTPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>[]
          }
          create: {
            args: Prisma.OTPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          createMany: {
            args: Prisma.OTPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OTPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          update: {
            args: Prisma.OTPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          deleteMany: {
            args: Prisma.OTPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OTPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OTPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPPayload>
          }
          aggregate: {
            args: Prisma.OTPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOTP>
          }
          groupBy: {
            args: Prisma.OTPGroupByArgs<ExtArgs>
            result: $Utils.Optional<OTPGroupByOutputType>[]
          }
          count: {
            args: Prisma.OTPCountArgs<ExtArgs>
            result: $Utils.Optional<OTPCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    address?: AddressOmit
    country?: CountryOmit
    addressProvinces?: AddressProvincesOmit
    addressDistricts?: AddressDistrictsOmit
    addressWards?: AddressWardsOmit
    addressAdministrativeUnits?: AddressAdministrativeUnitsOmit
    addressAdministrativeRegions?: AddressAdministrativeRegionsOmit
    oTP?: OTPOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    address: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    address?: boolean | UserCountOutputTypeCountAddressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    provinces: number
    addresses: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | CountryCountOutputTypeCountProvincesArgs
    addresses?: boolean | CountryCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountProvincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressProvincesWhereInput
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressProvincesCountOutputType
   */

  export type AddressProvincesCountOutputType = {
    districts: number
    addresses: number
  }

  export type AddressProvincesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    districts?: boolean | AddressProvincesCountOutputTypeCountDistrictsArgs
    addresses?: boolean | AddressProvincesCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * AddressProvincesCountOutputType without action
   */
  export type AddressProvincesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvincesCountOutputType
     */
    select?: AddressProvincesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressProvincesCountOutputType without action
   */
  export type AddressProvincesCountOutputTypeCountDistrictsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressDistrictsWhereInput
  }

  /**
   * AddressProvincesCountOutputType without action
   */
  export type AddressProvincesCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressDistrictsCountOutputType
   */

  export type AddressDistrictsCountOutputType = {
    wards: number
    addresses: number
  }

  export type AddressDistrictsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wards?: boolean | AddressDistrictsCountOutputTypeCountWardsArgs
    addresses?: boolean | AddressDistrictsCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * AddressDistrictsCountOutputType without action
   */
  export type AddressDistrictsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistrictsCountOutputType
     */
    select?: AddressDistrictsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressDistrictsCountOutputType without action
   */
  export type AddressDistrictsCountOutputTypeCountWardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWardsWhereInput
  }

  /**
   * AddressDistrictsCountOutputType without action
   */
  export type AddressDistrictsCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressWardsCountOutputType
   */

  export type AddressWardsCountOutputType = {
    addresses: number
  }

  export type AddressWardsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | AddressWardsCountOutputTypeCountAddressesArgs
  }

  // Custom InputTypes
  /**
   * AddressWardsCountOutputType without action
   */
  export type AddressWardsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWardsCountOutputType
     */
    select?: AddressWardsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressWardsCountOutputType without action
   */
  export type AddressWardsCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }


  /**
   * Count Type AddressAdministrativeUnitsCountOutputType
   */

  export type AddressAdministrativeUnitsCountOutputType = {
    provinces: number
    districts: number
    wards: number
  }

  export type AddressAdministrativeUnitsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | AddressAdministrativeUnitsCountOutputTypeCountProvincesArgs
    districts?: boolean | AddressAdministrativeUnitsCountOutputTypeCountDistrictsArgs
    wards?: boolean | AddressAdministrativeUnitsCountOutputTypeCountWardsArgs
  }

  // Custom InputTypes
  /**
   * AddressAdministrativeUnitsCountOutputType without action
   */
  export type AddressAdministrativeUnitsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnitsCountOutputType
     */
    select?: AddressAdministrativeUnitsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressAdministrativeUnitsCountOutputType without action
   */
  export type AddressAdministrativeUnitsCountOutputTypeCountProvincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressProvincesWhereInput
  }

  /**
   * AddressAdministrativeUnitsCountOutputType without action
   */
  export type AddressAdministrativeUnitsCountOutputTypeCountDistrictsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressDistrictsWhereInput
  }

  /**
   * AddressAdministrativeUnitsCountOutputType without action
   */
  export type AddressAdministrativeUnitsCountOutputTypeCountWardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWardsWhereInput
  }


  /**
   * Count Type AddressAdministrativeRegionsCountOutputType
   */

  export type AddressAdministrativeRegionsCountOutputType = {
    provinces: number
  }

  export type AddressAdministrativeRegionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | AddressAdministrativeRegionsCountOutputTypeCountProvincesArgs
  }

  // Custom InputTypes
  /**
   * AddressAdministrativeRegionsCountOutputType without action
   */
  export type AddressAdministrativeRegionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegionsCountOutputType
     */
    select?: AddressAdministrativeRegionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AddressAdministrativeRegionsCountOutputType without action
   */
  export type AddressAdministrativeRegionsCountOutputTypeCountProvincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressProvincesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    password: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    isVerified: boolean | null
    role: string | null
    lastLogin: Date | null
    permissions: string | null
    phoneNumber: string | null
    gender: string | null
    dateOfBirth: Date | null
    profilePictureUrl: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    password: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    isVerified: boolean | null
    role: string | null
    lastLogin: Date | null
    permissions: string | null
    phoneNumber: string | null
    gender: string | null
    dateOfBirth: Date | null
    profilePictureUrl: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    password: number
    phone: number
    createdAt: number
    updatedAt: number
    isActive: number
    isVerified: number
    role: number
    lastLogin: number
    permissions: number
    phoneNumber: number
    gender: number
    dateOfBirth: number
    profilePictureUrl: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    isVerified?: true
    role?: true
    lastLogin?: true
    permissions?: true
    phoneNumber?: true
    gender?: true
    dateOfBirth?: true
    profilePictureUrl?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    isVerified?: true
    role?: true
    lastLogin?: true
    permissions?: true
    phoneNumber?: true
    gender?: true
    dateOfBirth?: true
    profilePictureUrl?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    password?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    isVerified?: true
    role?: true
    lastLogin?: true
    permissions?: true
    phoneNumber?: true
    gender?: true
    dateOfBirth?: true
    profilePictureUrl?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    isVerified: boolean
    role: string
    lastLogin: Date | null
    permissions: string
    phoneNumber: string | null
    gender: string | null
    dateOfBirth: Date | null
    profilePictureUrl: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    password?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    isVerified?: boolean
    role?: boolean
    lastLogin?: boolean
    permissions?: boolean
    phoneNumber?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profilePictureUrl?: boolean
    address?: boolean | User$addressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    password?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    isVerified?: boolean
    role?: boolean
    lastLogin?: boolean
    permissions?: boolean
    phoneNumber?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    profilePictureUrl?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "password" | "phone" | "createdAt" | "updatedAt" | "isActive" | "isVerified" | "role" | "lastLogin" | "permissions" | "phoneNumber" | "gender" | "dateOfBirth" | "profilePictureUrl", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    address?: boolean | User$addressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      address: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string
      lastName: string
      password: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      isVerified: boolean
      role: string
      lastLogin: Date | null
      permissions: string
      phoneNumber: string | null
      gender: string | null
      dateOfBirth: Date | null
      profilePictureUrl: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    address<T extends User$addressArgs<ExtArgs> = {}>(args?: Subset<T, User$addressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly permissions: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly profilePictureUrl: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.address
   */
  export type User$addressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    street: string | null
    city: string | null
    state: string | null
    vnProvinceId: string | null
    vnDistrictId: string | null
    vnWardId: string | null
    zip: string | null
    countryId: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    street: string | null
    city: string | null
    state: string | null
    vnProvinceId: string | null
    vnDistrictId: string | null
    vnWardId: string | null
    zip: string | null
    countryId: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    street: number
    city: number
    state: number
    vnProvinceId: number
    vnDistrictId: number
    vnWardId: number
    zip: number
    countryId: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    street?: true
    city?: true
    state?: true
    vnProvinceId?: true
    vnDistrictId?: true
    vnWardId?: true
    zip?: true
    countryId?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    street?: true
    city?: true
    state?: true
    vnProvinceId?: true
    vnDistrictId?: true
    vnWardId?: true
    zip?: true
    countryId?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    street?: true
    city?: true
    state?: true
    vnProvinceId?: true
    vnDistrictId?: true
    vnWardId?: true
    zip?: true
    countryId?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    userId: string
    name: string
    street: string
    city: string | null
    state: string | null
    vnProvinceId: string | null
    vnDistrictId: string | null
    vnWardId: string | null
    zip: string | null
    countryId: string
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    vnProvinceId?: boolean
    vnDistrictId?: boolean
    vnWardId?: boolean
    zip?: boolean
    countryId?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    vnProvince?: boolean | Address$vnProvinceArgs<ExtArgs>
    vnDistrict?: boolean | Address$vnDistrictArgs<ExtArgs>
    vnWard?: boolean | Address$vnWardArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>



  export type AddressSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    vnProvinceId?: boolean
    vnDistrictId?: boolean
    vnWardId?: boolean
    zip?: boolean
    countryId?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "street" | "city" | "state" | "vnProvinceId" | "vnDistrictId" | "vnWardId" | "zip" | "countryId" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["address"]>
  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    vnProvince?: boolean | Address$vnProvinceArgs<ExtArgs>
    vnDistrict?: boolean | Address$vnDistrictArgs<ExtArgs>
    vnWard?: boolean | Address$vnWardArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      vnProvince: Prisma.$AddressProvincesPayload<ExtArgs> | null
      vnDistrict: Prisma.$AddressDistrictsPayload<ExtArgs> | null
      vnWard: Prisma.$AddressWardsPayload<ExtArgs> | null
      country: Prisma.$CountryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      street: string
      city: string | null
      state: string | null
      vnProvinceId: string | null
      vnDistrictId: string | null
      vnWardId: string | null
      zip: string | null
      countryId: string
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vnProvince<T extends Address$vnProvinceArgs<ExtArgs> = {}>(args?: Subset<T, Address$vnProvinceArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    vnDistrict<T extends Address$vnDistrictArgs<ExtArgs> = {}>(args?: Subset<T, Address$vnDistrictArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    vnWard<T extends Address$vnWardArgs<ExtArgs> = {}>(args?: Subset<T, Address$vnWardArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly userId: FieldRef<"Address", 'String'>
    readonly name: FieldRef<"Address", 'String'>
    readonly street: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly vnProvinceId: FieldRef<"Address", 'String'>
    readonly vnDistrictId: FieldRef<"Address", 'String'>
    readonly vnWardId: FieldRef<"Address", 'String'>
    readonly zip: FieldRef<"Address", 'String'>
    readonly countryId: FieldRef<"Address", 'String'>
    readonly isDefault: FieldRef<"Address", 'Boolean'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to update.
     */
    limit?: number
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
    /**
     * Limit how many Addresses to delete.
     */
    limit?: number
  }

  /**
   * Address.vnProvince
   */
  export type Address$vnProvinceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    where?: AddressProvincesWhereInput
  }

  /**
   * Address.vnDistrict
   */
  export type Address$vnDistrictArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    where?: AddressDistrictsWhereInput
  }

  /**
   * Address.vnWard
   */
  export type Address$vnWardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    where?: AddressWardsWhereInput
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryMinAggregateOutputType = {
    id: string | null
    name: string | null
    codeName: string | null
  }

  export type CountryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    codeName: string | null
  }

  export type CountryCountAggregateOutputType = {
    id: number
    name: number
    codeName: number
    _all: number
  }


  export type CountryMinAggregateInputType = {
    id?: true
    name?: true
    codeName?: true
  }

  export type CountryMaxAggregateInputType = {
    id?: true
    name?: true
    codeName?: true
  }

  export type CountryCountAggregateInputType = {
    id?: true
    name?: true
    codeName?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Country to aggregate.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type CountryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountryWhereInput
    orderBy?: CountryOrderByWithAggregationInput | CountryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: CountryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    id: string
    name: string
    codeName: string
    _count: CountryCountAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type CountrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    codeName?: boolean
    provinces?: boolean | Country$provincesArgs<ExtArgs>
    addresses?: boolean | Country$addressesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>



  export type CountrySelectScalar = {
    id?: boolean
    name?: boolean
    codeName?: boolean
  }

  export type CountryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "codeName", ExtArgs["result"]["country"]>
  export type CountryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | Country$provincesArgs<ExtArgs>
    addresses?: boolean | Country$addressesArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CountryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Country"
    objects: {
      provinces: Prisma.$AddressProvincesPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      codeName: string
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type CountryGetPayload<S extends boolean | null | undefined | CountryDefaultArgs> = $Result.GetResult<Prisma.$CountryPayload, S>

  type CountryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface CountryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Country'], meta: { name: 'Country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountryFindUniqueArgs>(args: SelectSubset<T, CountryFindUniqueArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(args: SelectSubset<T, CountryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountryFindFirstArgs>(args?: SelectSubset<T, CountryFindFirstArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(args?: SelectSubset<T, CountryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CountryFindManyArgs>(args?: SelectSubset<T, CountryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends CountryCreateArgs>(args: SelectSubset<T, CountryCreateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countries.
     * @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountryCreateManyArgs>(args?: SelectSubset<T, CountryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends CountryDeleteArgs>(args: SelectSubset<T, CountryDeleteArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountryUpdateArgs>(args: SelectSubset<T, CountryUpdateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountryDeleteManyArgs>(args?: SelectSubset<T, CountryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountryUpdateManyArgs>(args: SelectSubset<T, CountryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends CountryUpsertArgs>(args: SelectSubset<T, CountryUpsertArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Country model
   */
  readonly fields: CountryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provinces<T extends Country$provincesArgs<ExtArgs> = {}>(args?: Subset<T, Country$provincesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends Country$addressesArgs<ExtArgs> = {}>(args?: Subset<T, Country$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Country model
   */
  interface CountryFieldRefs {
    readonly id: FieldRef<"Country", 'String'>
    readonly name: FieldRef<"Country", 'String'>
    readonly codeName: FieldRef<"Country", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Country findUnique
   */
  export type CountryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findFirst
   */
  export type CountryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findMany
   */
  export type CountryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Countries to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country create
   */
  export type CountryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to create a Country.
     */
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>
  }

  /**
   * Country createMany
   */
  export type CountryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Country update
   */
  export type CountryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to update a Country.
     */
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
    /**
     * Choose, which Country to update.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
    /**
     * Limit how many Countries to update.
     */
    limit?: number
  }

  /**
   * Country upsert
   */
  export type CountryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The filter to search for the Country to update in case it exists.
     */
    where: CountryWhereUniqueInput
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     */
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
  }

  /**
   * Country delete
   */
  export type CountryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter which Country to delete.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countries to delete
     */
    where?: CountryWhereInput
    /**
     * Limit how many Countries to delete.
     */
    limit?: number
  }

  /**
   * Country.provinces
   */
  export type Country$provincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    where?: AddressProvincesWhereInput
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    cursor?: AddressProvincesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * Country.addresses
   */
  export type Country$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Country without action
   */
  export type CountryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
  }


  /**
   * Model AddressProvinces
   */

  export type AggregateAddressProvinces = {
    _count: AddressProvincesCountAggregateOutputType | null
    _min: AddressProvincesMinAggregateOutputType | null
    _max: AddressProvincesMaxAggregateOutputType | null
  }

  export type AddressProvincesMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    administrativeUnitId: string | null
    administrativeRegionId: string | null
    countryId: string | null
  }

  export type AddressProvincesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    administrativeUnitId: string | null
    administrativeRegionId: string | null
    countryId: string | null
  }

  export type AddressProvincesCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    fullName: number
    fullNameEn: number
    administrativeUnitId: number
    administrativeRegionId: number
    countryId: number
    _all: number
  }


  export type AddressProvincesMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    administrativeUnitId?: true
    administrativeRegionId?: true
    countryId?: true
  }

  export type AddressProvincesMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    administrativeUnitId?: true
    administrativeRegionId?: true
    countryId?: true
  }

  export type AddressProvincesCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    administrativeUnitId?: true
    administrativeRegionId?: true
    countryId?: true
    _all?: true
  }

  export type AddressProvincesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressProvinces to aggregate.
     */
    where?: AddressProvincesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressProvinces to fetch.
     */
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressProvincesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressProvinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressProvinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressProvinces
    **/
    _count?: true | AddressProvincesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressProvincesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressProvincesMaxAggregateInputType
  }

  export type GetAddressProvincesAggregateType<T extends AddressProvincesAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressProvinces]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressProvinces[P]>
      : GetScalarType<T[P], AggregateAddressProvinces[P]>
  }




  export type AddressProvincesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressProvincesWhereInput
    orderBy?: AddressProvincesOrderByWithAggregationInput | AddressProvincesOrderByWithAggregationInput[]
    by: AddressProvincesScalarFieldEnum[] | AddressProvincesScalarFieldEnum
    having?: AddressProvincesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressProvincesCountAggregateInputType | true
    _min?: AddressProvincesMinAggregateInputType
    _max?: AddressProvincesMaxAggregateInputType
  }

  export type AddressProvincesGroupByOutputType = {
    id: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    countryId: string
    _count: AddressProvincesCountAggregateOutputType | null
    _min: AddressProvincesMinAggregateOutputType | null
    _max: AddressProvincesMaxAggregateOutputType | null
  }

  type GetAddressProvincesGroupByPayload<T extends AddressProvincesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressProvincesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressProvincesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressProvincesGroupByOutputType[P]>
            : GetScalarType<T[P], AddressProvincesGroupByOutputType[P]>
        }
      >
    >


  export type AddressProvincesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    administrativeUnitId?: boolean
    administrativeRegionId?: boolean
    countryId?: boolean
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    administrativeRegion?: boolean | AddressAdministrativeRegionsDefaultArgs<ExtArgs>
    districts?: boolean | AddressProvinces$districtsArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    addresses?: boolean | AddressProvinces$addressesArgs<ExtArgs>
    _count?: boolean | AddressProvincesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressProvinces"]>



  export type AddressProvincesSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    administrativeUnitId?: boolean
    administrativeRegionId?: boolean
    countryId?: boolean
  }

  export type AddressProvincesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameEn" | "fullName" | "fullNameEn" | "administrativeUnitId" | "administrativeRegionId" | "countryId", ExtArgs["result"]["addressProvinces"]>
  export type AddressProvincesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    administrativeRegion?: boolean | AddressAdministrativeRegionsDefaultArgs<ExtArgs>
    districts?: boolean | AddressProvinces$districtsArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    addresses?: boolean | AddressProvinces$addressesArgs<ExtArgs>
    _count?: boolean | AddressProvincesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressProvincesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressProvinces"
    objects: {
      administrativeUnit: Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>
      administrativeRegion: Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>
      districts: Prisma.$AddressDistrictsPayload<ExtArgs>[]
      country: Prisma.$CountryPayload<ExtArgs>
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string
      fullName: string
      fullNameEn: string
      administrativeUnitId: string
      administrativeRegionId: string
      countryId: string
    }, ExtArgs["result"]["addressProvinces"]>
    composites: {}
  }

  type AddressProvincesGetPayload<S extends boolean | null | undefined | AddressProvincesDefaultArgs> = $Result.GetResult<Prisma.$AddressProvincesPayload, S>

  type AddressProvincesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressProvincesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressProvincesCountAggregateInputType | true
    }

  export interface AddressProvincesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressProvinces'], meta: { name: 'AddressProvinces' } }
    /**
     * Find zero or one AddressProvinces that matches the filter.
     * @param {AddressProvincesFindUniqueArgs} args - Arguments to find a AddressProvinces
     * @example
     * // Get one AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressProvincesFindUniqueArgs>(args: SelectSubset<T, AddressProvincesFindUniqueArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressProvinces that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressProvincesFindUniqueOrThrowArgs} args - Arguments to find a AddressProvinces
     * @example
     * // Get one AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressProvincesFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressProvincesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressProvinces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesFindFirstArgs} args - Arguments to find a AddressProvinces
     * @example
     * // Get one AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressProvincesFindFirstArgs>(args?: SelectSubset<T, AddressProvincesFindFirstArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressProvinces that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesFindFirstOrThrowArgs} args - Arguments to find a AddressProvinces
     * @example
     * // Get one AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressProvincesFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressProvincesFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressProvinces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findMany()
     * 
     * // Get first 10 AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressProvincesWithIdOnly = await prisma.addressProvinces.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressProvincesFindManyArgs>(args?: SelectSubset<T, AddressProvincesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressProvinces.
     * @param {AddressProvincesCreateArgs} args - Arguments to create a AddressProvinces.
     * @example
     * // Create one AddressProvinces
     * const AddressProvinces = await prisma.addressProvinces.create({
     *   data: {
     *     // ... data to create a AddressProvinces
     *   }
     * })
     * 
     */
    create<T extends AddressProvincesCreateArgs>(args: SelectSubset<T, AddressProvincesCreateArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressProvinces.
     * @param {AddressProvincesCreateManyArgs} args - Arguments to create many AddressProvinces.
     * @example
     * // Create many AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressProvincesCreateManyArgs>(args?: SelectSubset<T, AddressProvincesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddressProvinces.
     * @param {AddressProvincesDeleteArgs} args - Arguments to delete one AddressProvinces.
     * @example
     * // Delete one AddressProvinces
     * const AddressProvinces = await prisma.addressProvinces.delete({
     *   where: {
     *     // ... filter to delete one AddressProvinces
     *   }
     * })
     * 
     */
    delete<T extends AddressProvincesDeleteArgs>(args: SelectSubset<T, AddressProvincesDeleteArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressProvinces.
     * @param {AddressProvincesUpdateArgs} args - Arguments to update one AddressProvinces.
     * @example
     * // Update one AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressProvincesUpdateArgs>(args: SelectSubset<T, AddressProvincesUpdateArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressProvinces.
     * @param {AddressProvincesDeleteManyArgs} args - Arguments to filter AddressProvinces to delete.
     * @example
     * // Delete a few AddressProvinces
     * const { count } = await prisma.addressProvinces.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressProvincesDeleteManyArgs>(args?: SelectSubset<T, AddressProvincesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressProvinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressProvincesUpdateManyArgs>(args: SelectSubset<T, AddressProvincesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressProvinces.
     * @param {AddressProvincesUpsertArgs} args - Arguments to update or create a AddressProvinces.
     * @example
     * // Update or create a AddressProvinces
     * const addressProvinces = await prisma.addressProvinces.upsert({
     *   create: {
     *     // ... data to create a AddressProvinces
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressProvinces we want to update
     *   }
     * })
     */
    upsert<T extends AddressProvincesUpsertArgs>(args: SelectSubset<T, AddressProvincesUpsertArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressProvinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesCountArgs} args - Arguments to filter AddressProvinces to count.
     * @example
     * // Count the number of AddressProvinces
     * const count = await prisma.addressProvinces.count({
     *   where: {
     *     // ... the filter for the AddressProvinces we want to count
     *   }
     * })
    **/
    count<T extends AddressProvincesCountArgs>(
      args?: Subset<T, AddressProvincesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressProvincesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressProvinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressProvincesAggregateArgs>(args: Subset<T, AddressProvincesAggregateArgs>): Prisma.PrismaPromise<GetAddressProvincesAggregateType<T>>

    /**
     * Group by AddressProvinces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressProvincesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressProvincesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressProvincesGroupByArgs['orderBy'] }
        : { orderBy?: AddressProvincesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressProvincesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressProvincesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressProvinces model
   */
  readonly fields: AddressProvincesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressProvinces.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressProvincesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    administrativeUnit<T extends AddressAdministrativeUnitsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnitsDefaultArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    administrativeRegion<T extends AddressAdministrativeRegionsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeRegionsDefaultArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    districts<T extends AddressProvinces$districtsArgs<ExtArgs> = {}>(args?: Subset<T, AddressProvinces$districtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    addresses<T extends AddressProvinces$addressesArgs<ExtArgs> = {}>(args?: Subset<T, AddressProvinces$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressProvinces model
   */
  interface AddressProvincesFieldRefs {
    readonly id: FieldRef<"AddressProvinces", 'String'>
    readonly name: FieldRef<"AddressProvinces", 'String'>
    readonly nameEn: FieldRef<"AddressProvinces", 'String'>
    readonly fullName: FieldRef<"AddressProvinces", 'String'>
    readonly fullNameEn: FieldRef<"AddressProvinces", 'String'>
    readonly administrativeUnitId: FieldRef<"AddressProvinces", 'String'>
    readonly administrativeRegionId: FieldRef<"AddressProvinces", 'String'>
    readonly countryId: FieldRef<"AddressProvinces", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressProvinces findUnique
   */
  export type AddressProvincesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter, which AddressProvinces to fetch.
     */
    where: AddressProvincesWhereUniqueInput
  }

  /**
   * AddressProvinces findUniqueOrThrow
   */
  export type AddressProvincesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter, which AddressProvinces to fetch.
     */
    where: AddressProvincesWhereUniqueInput
  }

  /**
   * AddressProvinces findFirst
   */
  export type AddressProvincesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter, which AddressProvinces to fetch.
     */
    where?: AddressProvincesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressProvinces to fetch.
     */
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressProvinces.
     */
    cursor?: AddressProvincesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressProvinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressProvinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressProvinces.
     */
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * AddressProvinces findFirstOrThrow
   */
  export type AddressProvincesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter, which AddressProvinces to fetch.
     */
    where?: AddressProvincesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressProvinces to fetch.
     */
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressProvinces.
     */
    cursor?: AddressProvincesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressProvinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressProvinces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressProvinces.
     */
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * AddressProvinces findMany
   */
  export type AddressProvincesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter, which AddressProvinces to fetch.
     */
    where?: AddressProvincesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressProvinces to fetch.
     */
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressProvinces.
     */
    cursor?: AddressProvincesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressProvinces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressProvinces.
     */
    skip?: number
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * AddressProvinces create
   */
  export type AddressProvincesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressProvinces.
     */
    data: XOR<AddressProvincesCreateInput, AddressProvincesUncheckedCreateInput>
  }

  /**
   * AddressProvinces createMany
   */
  export type AddressProvincesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressProvinces.
     */
    data: AddressProvincesCreateManyInput | AddressProvincesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressProvinces update
   */
  export type AddressProvincesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressProvinces.
     */
    data: XOR<AddressProvincesUpdateInput, AddressProvincesUncheckedUpdateInput>
    /**
     * Choose, which AddressProvinces to update.
     */
    where: AddressProvincesWhereUniqueInput
  }

  /**
   * AddressProvinces updateMany
   */
  export type AddressProvincesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressProvinces.
     */
    data: XOR<AddressProvincesUpdateManyMutationInput, AddressProvincesUncheckedUpdateManyInput>
    /**
     * Filter which AddressProvinces to update
     */
    where?: AddressProvincesWhereInput
    /**
     * Limit how many AddressProvinces to update.
     */
    limit?: number
  }

  /**
   * AddressProvinces upsert
   */
  export type AddressProvincesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressProvinces to update in case it exists.
     */
    where: AddressProvincesWhereUniqueInput
    /**
     * In case the AddressProvinces found by the `where` argument doesn't exist, create a new AddressProvinces with this data.
     */
    create: XOR<AddressProvincesCreateInput, AddressProvincesUncheckedCreateInput>
    /**
     * In case the AddressProvinces was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressProvincesUpdateInput, AddressProvincesUncheckedUpdateInput>
  }

  /**
   * AddressProvinces delete
   */
  export type AddressProvincesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    /**
     * Filter which AddressProvinces to delete.
     */
    where: AddressProvincesWhereUniqueInput
  }

  /**
   * AddressProvinces deleteMany
   */
  export type AddressProvincesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressProvinces to delete
     */
    where?: AddressProvincesWhereInput
    /**
     * Limit how many AddressProvinces to delete.
     */
    limit?: number
  }

  /**
   * AddressProvinces.districts
   */
  export type AddressProvinces$districtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    where?: AddressDistrictsWhereInput
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    cursor?: AddressDistrictsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressDistrictsScalarFieldEnum | AddressDistrictsScalarFieldEnum[]
  }

  /**
   * AddressProvinces.addresses
   */
  export type AddressProvinces$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * AddressProvinces without action
   */
  export type AddressProvincesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
  }


  /**
   * Model AddressDistricts
   */

  export type AggregateAddressDistricts = {
    _count: AddressDistrictsCountAggregateOutputType | null
    _min: AddressDistrictsMinAggregateOutputType | null
    _max: AddressDistrictsMaxAggregateOutputType | null
  }

  export type AddressDistrictsMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    provinceCode: string | null
    administrativeUnitId: string | null
  }

  export type AddressDistrictsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    provinceCode: string | null
    administrativeUnitId: string | null
  }

  export type AddressDistrictsCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    fullName: number
    fullNameEn: number
    provinceCode: number
    administrativeUnitId: number
    _all: number
  }


  export type AddressDistrictsMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    provinceCode?: true
    administrativeUnitId?: true
  }

  export type AddressDistrictsMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    provinceCode?: true
    administrativeUnitId?: true
  }

  export type AddressDistrictsCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    provinceCode?: true
    administrativeUnitId?: true
    _all?: true
  }

  export type AddressDistrictsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressDistricts to aggregate.
     */
    where?: AddressDistrictsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressDistricts to fetch.
     */
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressDistrictsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressDistricts
    **/
    _count?: true | AddressDistrictsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressDistrictsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressDistrictsMaxAggregateInputType
  }

  export type GetAddressDistrictsAggregateType<T extends AddressDistrictsAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressDistricts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressDistricts[P]>
      : GetScalarType<T[P], AggregateAddressDistricts[P]>
  }




  export type AddressDistrictsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressDistrictsWhereInput
    orderBy?: AddressDistrictsOrderByWithAggregationInput | AddressDistrictsOrderByWithAggregationInput[]
    by: AddressDistrictsScalarFieldEnum[] | AddressDistrictsScalarFieldEnum
    having?: AddressDistrictsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressDistrictsCountAggregateInputType | true
    _min?: AddressDistrictsMinAggregateInputType
    _max?: AddressDistrictsMaxAggregateInputType
  }

  export type AddressDistrictsGroupByOutputType = {
    id: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    administrativeUnitId: string
    _count: AddressDistrictsCountAggregateOutputType | null
    _min: AddressDistrictsMinAggregateOutputType | null
    _max: AddressDistrictsMaxAggregateOutputType | null
  }

  type GetAddressDistrictsGroupByPayload<T extends AddressDistrictsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressDistrictsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressDistrictsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressDistrictsGroupByOutputType[P]>
            : GetScalarType<T[P], AddressDistrictsGroupByOutputType[P]>
        }
      >
    >


  export type AddressDistrictsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    provinceCode?: boolean
    administrativeUnitId?: boolean
    province?: boolean | AddressProvincesDefaultArgs<ExtArgs>
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    wards?: boolean | AddressDistricts$wardsArgs<ExtArgs>
    addresses?: boolean | AddressDistricts$addressesArgs<ExtArgs>
    _count?: boolean | AddressDistrictsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressDistricts"]>



  export type AddressDistrictsSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    provinceCode?: boolean
    administrativeUnitId?: boolean
  }

  export type AddressDistrictsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameEn" | "fullName" | "fullNameEn" | "provinceCode" | "administrativeUnitId", ExtArgs["result"]["addressDistricts"]>
  export type AddressDistrictsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    province?: boolean | AddressProvincesDefaultArgs<ExtArgs>
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    wards?: boolean | AddressDistricts$wardsArgs<ExtArgs>
    addresses?: boolean | AddressDistricts$addressesArgs<ExtArgs>
    _count?: boolean | AddressDistrictsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressDistrictsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressDistricts"
    objects: {
      province: Prisma.$AddressProvincesPayload<ExtArgs>
      administrativeUnit: Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>
      wards: Prisma.$AddressWardsPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string
      fullName: string
      fullNameEn: string
      provinceCode: string
      administrativeUnitId: string
    }, ExtArgs["result"]["addressDistricts"]>
    composites: {}
  }

  type AddressDistrictsGetPayload<S extends boolean | null | undefined | AddressDistrictsDefaultArgs> = $Result.GetResult<Prisma.$AddressDistrictsPayload, S>

  type AddressDistrictsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressDistrictsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressDistrictsCountAggregateInputType | true
    }

  export interface AddressDistrictsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressDistricts'], meta: { name: 'AddressDistricts' } }
    /**
     * Find zero or one AddressDistricts that matches the filter.
     * @param {AddressDistrictsFindUniqueArgs} args - Arguments to find a AddressDistricts
     * @example
     * // Get one AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressDistrictsFindUniqueArgs>(args: SelectSubset<T, AddressDistrictsFindUniqueArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressDistricts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressDistrictsFindUniqueOrThrowArgs} args - Arguments to find a AddressDistricts
     * @example
     * // Get one AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressDistrictsFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressDistrictsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressDistricts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsFindFirstArgs} args - Arguments to find a AddressDistricts
     * @example
     * // Get one AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressDistrictsFindFirstArgs>(args?: SelectSubset<T, AddressDistrictsFindFirstArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressDistricts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsFindFirstOrThrowArgs} args - Arguments to find a AddressDistricts
     * @example
     * // Get one AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressDistrictsFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressDistrictsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressDistricts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findMany()
     * 
     * // Get first 10 AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressDistrictsWithIdOnly = await prisma.addressDistricts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressDistrictsFindManyArgs>(args?: SelectSubset<T, AddressDistrictsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressDistricts.
     * @param {AddressDistrictsCreateArgs} args - Arguments to create a AddressDistricts.
     * @example
     * // Create one AddressDistricts
     * const AddressDistricts = await prisma.addressDistricts.create({
     *   data: {
     *     // ... data to create a AddressDistricts
     *   }
     * })
     * 
     */
    create<T extends AddressDistrictsCreateArgs>(args: SelectSubset<T, AddressDistrictsCreateArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressDistricts.
     * @param {AddressDistrictsCreateManyArgs} args - Arguments to create many AddressDistricts.
     * @example
     * // Create many AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressDistrictsCreateManyArgs>(args?: SelectSubset<T, AddressDistrictsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddressDistricts.
     * @param {AddressDistrictsDeleteArgs} args - Arguments to delete one AddressDistricts.
     * @example
     * // Delete one AddressDistricts
     * const AddressDistricts = await prisma.addressDistricts.delete({
     *   where: {
     *     // ... filter to delete one AddressDistricts
     *   }
     * })
     * 
     */
    delete<T extends AddressDistrictsDeleteArgs>(args: SelectSubset<T, AddressDistrictsDeleteArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressDistricts.
     * @param {AddressDistrictsUpdateArgs} args - Arguments to update one AddressDistricts.
     * @example
     * // Update one AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressDistrictsUpdateArgs>(args: SelectSubset<T, AddressDistrictsUpdateArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressDistricts.
     * @param {AddressDistrictsDeleteManyArgs} args - Arguments to filter AddressDistricts to delete.
     * @example
     * // Delete a few AddressDistricts
     * const { count } = await prisma.addressDistricts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDistrictsDeleteManyArgs>(args?: SelectSubset<T, AddressDistrictsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressDistrictsUpdateManyArgs>(args: SelectSubset<T, AddressDistrictsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressDistricts.
     * @param {AddressDistrictsUpsertArgs} args - Arguments to update or create a AddressDistricts.
     * @example
     * // Update or create a AddressDistricts
     * const addressDistricts = await prisma.addressDistricts.upsert({
     *   create: {
     *     // ... data to create a AddressDistricts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressDistricts we want to update
     *   }
     * })
     */
    upsert<T extends AddressDistrictsUpsertArgs>(args: SelectSubset<T, AddressDistrictsUpsertArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsCountArgs} args - Arguments to filter AddressDistricts to count.
     * @example
     * // Count the number of AddressDistricts
     * const count = await prisma.addressDistricts.count({
     *   where: {
     *     // ... the filter for the AddressDistricts we want to count
     *   }
     * })
    **/
    count<T extends AddressDistrictsCountArgs>(
      args?: Subset<T, AddressDistrictsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressDistrictsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressDistrictsAggregateArgs>(args: Subset<T, AddressDistrictsAggregateArgs>): Prisma.PrismaPromise<GetAddressDistrictsAggregateType<T>>

    /**
     * Group by AddressDistricts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressDistrictsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressDistrictsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressDistrictsGroupByArgs['orderBy'] }
        : { orderBy?: AddressDistrictsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressDistrictsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressDistrictsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressDistricts model
   */
  readonly fields: AddressDistrictsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressDistricts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressDistrictsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    province<T extends AddressProvincesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressProvincesDefaultArgs<ExtArgs>>): Prisma__AddressProvincesClient<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    administrativeUnit<T extends AddressAdministrativeUnitsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnitsDefaultArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    wards<T extends AddressDistricts$wardsArgs<ExtArgs> = {}>(args?: Subset<T, AddressDistricts$wardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addresses<T extends AddressDistricts$addressesArgs<ExtArgs> = {}>(args?: Subset<T, AddressDistricts$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressDistricts model
   */
  interface AddressDistrictsFieldRefs {
    readonly id: FieldRef<"AddressDistricts", 'String'>
    readonly name: FieldRef<"AddressDistricts", 'String'>
    readonly nameEn: FieldRef<"AddressDistricts", 'String'>
    readonly fullName: FieldRef<"AddressDistricts", 'String'>
    readonly fullNameEn: FieldRef<"AddressDistricts", 'String'>
    readonly provinceCode: FieldRef<"AddressDistricts", 'String'>
    readonly administrativeUnitId: FieldRef<"AddressDistricts", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressDistricts findUnique
   */
  export type AddressDistrictsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter, which AddressDistricts to fetch.
     */
    where: AddressDistrictsWhereUniqueInput
  }

  /**
   * AddressDistricts findUniqueOrThrow
   */
  export type AddressDistrictsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter, which AddressDistricts to fetch.
     */
    where: AddressDistrictsWhereUniqueInput
  }

  /**
   * AddressDistricts findFirst
   */
  export type AddressDistrictsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter, which AddressDistricts to fetch.
     */
    where?: AddressDistrictsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressDistricts to fetch.
     */
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressDistricts.
     */
    cursor?: AddressDistrictsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressDistricts.
     */
    distinct?: AddressDistrictsScalarFieldEnum | AddressDistrictsScalarFieldEnum[]
  }

  /**
   * AddressDistricts findFirstOrThrow
   */
  export type AddressDistrictsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter, which AddressDistricts to fetch.
     */
    where?: AddressDistrictsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressDistricts to fetch.
     */
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressDistricts.
     */
    cursor?: AddressDistrictsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressDistricts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressDistricts.
     */
    distinct?: AddressDistrictsScalarFieldEnum | AddressDistrictsScalarFieldEnum[]
  }

  /**
   * AddressDistricts findMany
   */
  export type AddressDistrictsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter, which AddressDistricts to fetch.
     */
    where?: AddressDistrictsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressDistricts to fetch.
     */
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressDistricts.
     */
    cursor?: AddressDistrictsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressDistricts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressDistricts.
     */
    skip?: number
    distinct?: AddressDistrictsScalarFieldEnum | AddressDistrictsScalarFieldEnum[]
  }

  /**
   * AddressDistricts create
   */
  export type AddressDistrictsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressDistricts.
     */
    data: XOR<AddressDistrictsCreateInput, AddressDistrictsUncheckedCreateInput>
  }

  /**
   * AddressDistricts createMany
   */
  export type AddressDistrictsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressDistricts.
     */
    data: AddressDistrictsCreateManyInput | AddressDistrictsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressDistricts update
   */
  export type AddressDistrictsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressDistricts.
     */
    data: XOR<AddressDistrictsUpdateInput, AddressDistrictsUncheckedUpdateInput>
    /**
     * Choose, which AddressDistricts to update.
     */
    where: AddressDistrictsWhereUniqueInput
  }

  /**
   * AddressDistricts updateMany
   */
  export type AddressDistrictsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressDistricts.
     */
    data: XOR<AddressDistrictsUpdateManyMutationInput, AddressDistrictsUncheckedUpdateManyInput>
    /**
     * Filter which AddressDistricts to update
     */
    where?: AddressDistrictsWhereInput
    /**
     * Limit how many AddressDistricts to update.
     */
    limit?: number
  }

  /**
   * AddressDistricts upsert
   */
  export type AddressDistrictsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressDistricts to update in case it exists.
     */
    where: AddressDistrictsWhereUniqueInput
    /**
     * In case the AddressDistricts found by the `where` argument doesn't exist, create a new AddressDistricts with this data.
     */
    create: XOR<AddressDistrictsCreateInput, AddressDistrictsUncheckedCreateInput>
    /**
     * In case the AddressDistricts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressDistrictsUpdateInput, AddressDistrictsUncheckedUpdateInput>
  }

  /**
   * AddressDistricts delete
   */
  export type AddressDistrictsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    /**
     * Filter which AddressDistricts to delete.
     */
    where: AddressDistrictsWhereUniqueInput
  }

  /**
   * AddressDistricts deleteMany
   */
  export type AddressDistrictsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressDistricts to delete
     */
    where?: AddressDistrictsWhereInput
    /**
     * Limit how many AddressDistricts to delete.
     */
    limit?: number
  }

  /**
   * AddressDistricts.wards
   */
  export type AddressDistricts$wardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    where?: AddressWardsWhereInput
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    cursor?: AddressWardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressWardsScalarFieldEnum | AddressWardsScalarFieldEnum[]
  }

  /**
   * AddressDistricts.addresses
   */
  export type AddressDistricts$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * AddressDistricts without action
   */
  export type AddressDistrictsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
  }


  /**
   * Model AddressWards
   */

  export type AggregateAddressWards = {
    _count: AddressWardsCountAggregateOutputType | null
    _min: AddressWardsMinAggregateOutputType | null
    _max: AddressWardsMaxAggregateOutputType | null
  }

  export type AddressWardsMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    districtId: string | null
    administrativeUnitId: string | null
  }

  export type AddressWardsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    districtId: string | null
    administrativeUnitId: string | null
  }

  export type AddressWardsCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    fullName: number
    fullNameEn: number
    districtId: number
    administrativeUnitId: number
    _all: number
  }


  export type AddressWardsMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    districtId?: true
    administrativeUnitId?: true
  }

  export type AddressWardsMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    districtId?: true
    administrativeUnitId?: true
  }

  export type AddressWardsCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    districtId?: true
    administrativeUnitId?: true
    _all?: true
  }

  export type AddressWardsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressWards to aggregate.
     */
    where?: AddressWardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressWards to fetch.
     */
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressWards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressWards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressWards
    **/
    _count?: true | AddressWardsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressWardsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressWardsMaxAggregateInputType
  }

  export type GetAddressWardsAggregateType<T extends AddressWardsAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressWards]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressWards[P]>
      : GetScalarType<T[P], AggregateAddressWards[P]>
  }




  export type AddressWardsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWardsWhereInput
    orderBy?: AddressWardsOrderByWithAggregationInput | AddressWardsOrderByWithAggregationInput[]
    by: AddressWardsScalarFieldEnum[] | AddressWardsScalarFieldEnum
    having?: AddressWardsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressWardsCountAggregateInputType | true
    _min?: AddressWardsMinAggregateInputType
    _max?: AddressWardsMaxAggregateInputType
  }

  export type AddressWardsGroupByOutputType = {
    id: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
    administrativeUnitId: string
    _count: AddressWardsCountAggregateOutputType | null
    _min: AddressWardsMinAggregateOutputType | null
    _max: AddressWardsMaxAggregateOutputType | null
  }

  type GetAddressWardsGroupByPayload<T extends AddressWardsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressWardsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressWardsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressWardsGroupByOutputType[P]>
            : GetScalarType<T[P], AddressWardsGroupByOutputType[P]>
        }
      >
    >


  export type AddressWardsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    districtId?: boolean
    administrativeUnitId?: boolean
    district?: boolean | AddressDistrictsDefaultArgs<ExtArgs>
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    addresses?: boolean | AddressWards$addressesArgs<ExtArgs>
    _count?: boolean | AddressWardsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressWards"]>



  export type AddressWardsSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    districtId?: boolean
    administrativeUnitId?: boolean
  }

  export type AddressWardsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameEn" | "fullName" | "fullNameEn" | "districtId" | "administrativeUnitId", ExtArgs["result"]["addressWards"]>
  export type AddressWardsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    district?: boolean | AddressDistrictsDefaultArgs<ExtArgs>
    administrativeUnit?: boolean | AddressAdministrativeUnitsDefaultArgs<ExtArgs>
    addresses?: boolean | AddressWards$addressesArgs<ExtArgs>
    _count?: boolean | AddressWardsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressWardsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressWards"
    objects: {
      district: Prisma.$AddressDistrictsPayload<ExtArgs>
      administrativeUnit: Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>
      addresses: Prisma.$AddressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string
      fullName: string
      fullNameEn: string
      districtId: string
      administrativeUnitId: string
    }, ExtArgs["result"]["addressWards"]>
    composites: {}
  }

  type AddressWardsGetPayload<S extends boolean | null | undefined | AddressWardsDefaultArgs> = $Result.GetResult<Prisma.$AddressWardsPayload, S>

  type AddressWardsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressWardsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressWardsCountAggregateInputType | true
    }

  export interface AddressWardsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressWards'], meta: { name: 'AddressWards' } }
    /**
     * Find zero or one AddressWards that matches the filter.
     * @param {AddressWardsFindUniqueArgs} args - Arguments to find a AddressWards
     * @example
     * // Get one AddressWards
     * const addressWards = await prisma.addressWards.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressWardsFindUniqueArgs>(args: SelectSubset<T, AddressWardsFindUniqueArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressWards that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressWardsFindUniqueOrThrowArgs} args - Arguments to find a AddressWards
     * @example
     * // Get one AddressWards
     * const addressWards = await prisma.addressWards.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressWardsFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressWardsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressWards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsFindFirstArgs} args - Arguments to find a AddressWards
     * @example
     * // Get one AddressWards
     * const addressWards = await prisma.addressWards.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressWardsFindFirstArgs>(args?: SelectSubset<T, AddressWardsFindFirstArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressWards that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsFindFirstOrThrowArgs} args - Arguments to find a AddressWards
     * @example
     * // Get one AddressWards
     * const addressWards = await prisma.addressWards.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressWardsFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressWardsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressWards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressWards
     * const addressWards = await prisma.addressWards.findMany()
     * 
     * // Get first 10 AddressWards
     * const addressWards = await prisma.addressWards.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWardsWithIdOnly = await prisma.addressWards.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressWardsFindManyArgs>(args?: SelectSubset<T, AddressWardsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressWards.
     * @param {AddressWardsCreateArgs} args - Arguments to create a AddressWards.
     * @example
     * // Create one AddressWards
     * const AddressWards = await prisma.addressWards.create({
     *   data: {
     *     // ... data to create a AddressWards
     *   }
     * })
     * 
     */
    create<T extends AddressWardsCreateArgs>(args: SelectSubset<T, AddressWardsCreateArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressWards.
     * @param {AddressWardsCreateManyArgs} args - Arguments to create many AddressWards.
     * @example
     * // Create many AddressWards
     * const addressWards = await prisma.addressWards.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressWardsCreateManyArgs>(args?: SelectSubset<T, AddressWardsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddressWards.
     * @param {AddressWardsDeleteArgs} args - Arguments to delete one AddressWards.
     * @example
     * // Delete one AddressWards
     * const AddressWards = await prisma.addressWards.delete({
     *   where: {
     *     // ... filter to delete one AddressWards
     *   }
     * })
     * 
     */
    delete<T extends AddressWardsDeleteArgs>(args: SelectSubset<T, AddressWardsDeleteArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressWards.
     * @param {AddressWardsUpdateArgs} args - Arguments to update one AddressWards.
     * @example
     * // Update one AddressWards
     * const addressWards = await prisma.addressWards.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressWardsUpdateArgs>(args: SelectSubset<T, AddressWardsUpdateArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressWards.
     * @param {AddressWardsDeleteManyArgs} args - Arguments to filter AddressWards to delete.
     * @example
     * // Delete a few AddressWards
     * const { count } = await prisma.addressWards.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressWardsDeleteManyArgs>(args?: SelectSubset<T, AddressWardsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressWards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressWards
     * const addressWards = await prisma.addressWards.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressWardsUpdateManyArgs>(args: SelectSubset<T, AddressWardsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressWards.
     * @param {AddressWardsUpsertArgs} args - Arguments to update or create a AddressWards.
     * @example
     * // Update or create a AddressWards
     * const addressWards = await prisma.addressWards.upsert({
     *   create: {
     *     // ... data to create a AddressWards
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressWards we want to update
     *   }
     * })
     */
    upsert<T extends AddressWardsUpsertArgs>(args: SelectSubset<T, AddressWardsUpsertArgs<ExtArgs>>): Prisma__AddressWardsClient<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressWards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsCountArgs} args - Arguments to filter AddressWards to count.
     * @example
     * // Count the number of AddressWards
     * const count = await prisma.addressWards.count({
     *   where: {
     *     // ... the filter for the AddressWards we want to count
     *   }
     * })
    **/
    count<T extends AddressWardsCountArgs>(
      args?: Subset<T, AddressWardsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressWardsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressWards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressWardsAggregateArgs>(args: Subset<T, AddressWardsAggregateArgs>): Prisma.PrismaPromise<GetAddressWardsAggregateType<T>>

    /**
     * Group by AddressWards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressWardsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressWardsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressWardsGroupByArgs['orderBy'] }
        : { orderBy?: AddressWardsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressWardsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressWardsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressWards model
   */
  readonly fields: AddressWardsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressWards.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressWardsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    district<T extends AddressDistrictsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressDistrictsDefaultArgs<ExtArgs>>): Prisma__AddressDistrictsClient<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    administrativeUnit<T extends AddressAdministrativeUnitsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnitsDefaultArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    addresses<T extends AddressWards$addressesArgs<ExtArgs> = {}>(args?: Subset<T, AddressWards$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressWards model
   */
  interface AddressWardsFieldRefs {
    readonly id: FieldRef<"AddressWards", 'String'>
    readonly name: FieldRef<"AddressWards", 'String'>
    readonly nameEn: FieldRef<"AddressWards", 'String'>
    readonly fullName: FieldRef<"AddressWards", 'String'>
    readonly fullNameEn: FieldRef<"AddressWards", 'String'>
    readonly districtId: FieldRef<"AddressWards", 'String'>
    readonly administrativeUnitId: FieldRef<"AddressWards", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressWards findUnique
   */
  export type AddressWardsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter, which AddressWards to fetch.
     */
    where: AddressWardsWhereUniqueInput
  }

  /**
   * AddressWards findUniqueOrThrow
   */
  export type AddressWardsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter, which AddressWards to fetch.
     */
    where: AddressWardsWhereUniqueInput
  }

  /**
   * AddressWards findFirst
   */
  export type AddressWardsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter, which AddressWards to fetch.
     */
    where?: AddressWardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressWards to fetch.
     */
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressWards.
     */
    cursor?: AddressWardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressWards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressWards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressWards.
     */
    distinct?: AddressWardsScalarFieldEnum | AddressWardsScalarFieldEnum[]
  }

  /**
   * AddressWards findFirstOrThrow
   */
  export type AddressWardsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter, which AddressWards to fetch.
     */
    where?: AddressWardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressWards to fetch.
     */
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressWards.
     */
    cursor?: AddressWardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressWards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressWards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressWards.
     */
    distinct?: AddressWardsScalarFieldEnum | AddressWardsScalarFieldEnum[]
  }

  /**
   * AddressWards findMany
   */
  export type AddressWardsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter, which AddressWards to fetch.
     */
    where?: AddressWardsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressWards to fetch.
     */
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressWards.
     */
    cursor?: AddressWardsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressWards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressWards.
     */
    skip?: number
    distinct?: AddressWardsScalarFieldEnum | AddressWardsScalarFieldEnum[]
  }

  /**
   * AddressWards create
   */
  export type AddressWardsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressWards.
     */
    data: XOR<AddressWardsCreateInput, AddressWardsUncheckedCreateInput>
  }

  /**
   * AddressWards createMany
   */
  export type AddressWardsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressWards.
     */
    data: AddressWardsCreateManyInput | AddressWardsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressWards update
   */
  export type AddressWardsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressWards.
     */
    data: XOR<AddressWardsUpdateInput, AddressWardsUncheckedUpdateInput>
    /**
     * Choose, which AddressWards to update.
     */
    where: AddressWardsWhereUniqueInput
  }

  /**
   * AddressWards updateMany
   */
  export type AddressWardsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressWards.
     */
    data: XOR<AddressWardsUpdateManyMutationInput, AddressWardsUncheckedUpdateManyInput>
    /**
     * Filter which AddressWards to update
     */
    where?: AddressWardsWhereInput
    /**
     * Limit how many AddressWards to update.
     */
    limit?: number
  }

  /**
   * AddressWards upsert
   */
  export type AddressWardsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressWards to update in case it exists.
     */
    where: AddressWardsWhereUniqueInput
    /**
     * In case the AddressWards found by the `where` argument doesn't exist, create a new AddressWards with this data.
     */
    create: XOR<AddressWardsCreateInput, AddressWardsUncheckedCreateInput>
    /**
     * In case the AddressWards was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressWardsUpdateInput, AddressWardsUncheckedUpdateInput>
  }

  /**
   * AddressWards delete
   */
  export type AddressWardsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    /**
     * Filter which AddressWards to delete.
     */
    where: AddressWardsWhereUniqueInput
  }

  /**
   * AddressWards deleteMany
   */
  export type AddressWardsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressWards to delete
     */
    where?: AddressWardsWhereInput
    /**
     * Limit how many AddressWards to delete.
     */
    limit?: number
  }

  /**
   * AddressWards.addresses
   */
  export type AddressWards$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * AddressWards without action
   */
  export type AddressWardsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
  }


  /**
   * Model AddressAdministrativeUnits
   */

  export type AggregateAddressAdministrativeUnits = {
    _count: AddressAdministrativeUnitsCountAggregateOutputType | null
    _min: AddressAdministrativeUnitsMinAggregateOutputType | null
    _max: AddressAdministrativeUnitsMaxAggregateOutputType | null
  }

  export type AddressAdministrativeUnitsMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    codeName: string | null
    codeNameEn: string | null
  }

  export type AddressAdministrativeUnitsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    fullName: string | null
    fullNameEn: string | null
    codeName: string | null
    codeNameEn: string | null
  }

  export type AddressAdministrativeUnitsCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    fullName: number
    fullNameEn: number
    codeName: number
    codeNameEn: number
    _all: number
  }


  export type AddressAdministrativeUnitsMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    codeName?: true
    codeNameEn?: true
  }

  export type AddressAdministrativeUnitsMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    codeName?: true
    codeNameEn?: true
  }

  export type AddressAdministrativeUnitsCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    fullName?: true
    fullNameEn?: true
    codeName?: true
    codeNameEn?: true
    _all?: true
  }

  export type AddressAdministrativeUnitsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressAdministrativeUnits to aggregate.
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeUnits to fetch.
     */
    orderBy?: AddressAdministrativeUnitsOrderByWithRelationInput | AddressAdministrativeUnitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressAdministrativeUnitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressAdministrativeUnits
    **/
    _count?: true | AddressAdministrativeUnitsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressAdministrativeUnitsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressAdministrativeUnitsMaxAggregateInputType
  }

  export type GetAddressAdministrativeUnitsAggregateType<T extends AddressAdministrativeUnitsAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressAdministrativeUnits]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressAdministrativeUnits[P]>
      : GetScalarType<T[P], AggregateAddressAdministrativeUnits[P]>
  }




  export type AddressAdministrativeUnitsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressAdministrativeUnitsWhereInput
    orderBy?: AddressAdministrativeUnitsOrderByWithAggregationInput | AddressAdministrativeUnitsOrderByWithAggregationInput[]
    by: AddressAdministrativeUnitsScalarFieldEnum[] | AddressAdministrativeUnitsScalarFieldEnum
    having?: AddressAdministrativeUnitsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressAdministrativeUnitsCountAggregateInputType | true
    _min?: AddressAdministrativeUnitsMinAggregateInputType
    _max?: AddressAdministrativeUnitsMaxAggregateInputType
  }

  export type AddressAdministrativeUnitsGroupByOutputType = {
    id: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    _count: AddressAdministrativeUnitsCountAggregateOutputType | null
    _min: AddressAdministrativeUnitsMinAggregateOutputType | null
    _max: AddressAdministrativeUnitsMaxAggregateOutputType | null
  }

  type GetAddressAdministrativeUnitsGroupByPayload<T extends AddressAdministrativeUnitsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressAdministrativeUnitsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressAdministrativeUnitsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressAdministrativeUnitsGroupByOutputType[P]>
            : GetScalarType<T[P], AddressAdministrativeUnitsGroupByOutputType[P]>
        }
      >
    >


  export type AddressAdministrativeUnitsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    codeName?: boolean
    codeNameEn?: boolean
    provinces?: boolean | AddressAdministrativeUnits$provincesArgs<ExtArgs>
    districts?: boolean | AddressAdministrativeUnits$districtsArgs<ExtArgs>
    wards?: boolean | AddressAdministrativeUnits$wardsArgs<ExtArgs>
    _count?: boolean | AddressAdministrativeUnitsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressAdministrativeUnits"]>



  export type AddressAdministrativeUnitsSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    fullName?: boolean
    fullNameEn?: boolean
    codeName?: boolean
    codeNameEn?: boolean
  }

  export type AddressAdministrativeUnitsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameEn" | "fullName" | "fullNameEn" | "codeName" | "codeNameEn", ExtArgs["result"]["addressAdministrativeUnits"]>
  export type AddressAdministrativeUnitsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | AddressAdministrativeUnits$provincesArgs<ExtArgs>
    districts?: boolean | AddressAdministrativeUnits$districtsArgs<ExtArgs>
    wards?: boolean | AddressAdministrativeUnits$wardsArgs<ExtArgs>
    _count?: boolean | AddressAdministrativeUnitsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressAdministrativeUnitsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressAdministrativeUnits"
    objects: {
      provinces: Prisma.$AddressProvincesPayload<ExtArgs>[]
      districts: Prisma.$AddressDistrictsPayload<ExtArgs>[]
      wards: Prisma.$AddressWardsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string
      fullName: string
      fullNameEn: string
      codeName: string
      codeNameEn: string
    }, ExtArgs["result"]["addressAdministrativeUnits"]>
    composites: {}
  }

  type AddressAdministrativeUnitsGetPayload<S extends boolean | null | undefined | AddressAdministrativeUnitsDefaultArgs> = $Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload, S>

  type AddressAdministrativeUnitsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressAdministrativeUnitsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressAdministrativeUnitsCountAggregateInputType | true
    }

  export interface AddressAdministrativeUnitsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressAdministrativeUnits'], meta: { name: 'AddressAdministrativeUnits' } }
    /**
     * Find zero or one AddressAdministrativeUnits that matches the filter.
     * @param {AddressAdministrativeUnitsFindUniqueArgs} args - Arguments to find a AddressAdministrativeUnits
     * @example
     * // Get one AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressAdministrativeUnitsFindUniqueArgs>(args: SelectSubset<T, AddressAdministrativeUnitsFindUniqueArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressAdministrativeUnits that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressAdministrativeUnitsFindUniqueOrThrowArgs} args - Arguments to find a AddressAdministrativeUnits
     * @example
     * // Get one AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressAdministrativeUnitsFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressAdministrativeUnitsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressAdministrativeUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsFindFirstArgs} args - Arguments to find a AddressAdministrativeUnits
     * @example
     * // Get one AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressAdministrativeUnitsFindFirstArgs>(args?: SelectSubset<T, AddressAdministrativeUnitsFindFirstArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressAdministrativeUnits that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsFindFirstOrThrowArgs} args - Arguments to find a AddressAdministrativeUnits
     * @example
     * // Get one AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressAdministrativeUnitsFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressAdministrativeUnitsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressAdministrativeUnits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findMany()
     * 
     * // Get first 10 AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressAdministrativeUnitsWithIdOnly = await prisma.addressAdministrativeUnits.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressAdministrativeUnitsFindManyArgs>(args?: SelectSubset<T, AddressAdministrativeUnitsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsCreateArgs} args - Arguments to create a AddressAdministrativeUnits.
     * @example
     * // Create one AddressAdministrativeUnits
     * const AddressAdministrativeUnits = await prisma.addressAdministrativeUnits.create({
     *   data: {
     *     // ... data to create a AddressAdministrativeUnits
     *   }
     * })
     * 
     */
    create<T extends AddressAdministrativeUnitsCreateArgs>(args: SelectSubset<T, AddressAdministrativeUnitsCreateArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsCreateManyArgs} args - Arguments to create many AddressAdministrativeUnits.
     * @example
     * // Create many AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressAdministrativeUnitsCreateManyArgs>(args?: SelectSubset<T, AddressAdministrativeUnitsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsDeleteArgs} args - Arguments to delete one AddressAdministrativeUnits.
     * @example
     * // Delete one AddressAdministrativeUnits
     * const AddressAdministrativeUnits = await prisma.addressAdministrativeUnits.delete({
     *   where: {
     *     // ... filter to delete one AddressAdministrativeUnits
     *   }
     * })
     * 
     */
    delete<T extends AddressAdministrativeUnitsDeleteArgs>(args: SelectSubset<T, AddressAdministrativeUnitsDeleteArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsUpdateArgs} args - Arguments to update one AddressAdministrativeUnits.
     * @example
     * // Update one AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressAdministrativeUnitsUpdateArgs>(args: SelectSubset<T, AddressAdministrativeUnitsUpdateArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsDeleteManyArgs} args - Arguments to filter AddressAdministrativeUnits to delete.
     * @example
     * // Delete a few AddressAdministrativeUnits
     * const { count } = await prisma.addressAdministrativeUnits.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressAdministrativeUnitsDeleteManyArgs>(args?: SelectSubset<T, AddressAdministrativeUnitsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressAdministrativeUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressAdministrativeUnitsUpdateManyArgs>(args: SelectSubset<T, AddressAdministrativeUnitsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressAdministrativeUnits.
     * @param {AddressAdministrativeUnitsUpsertArgs} args - Arguments to update or create a AddressAdministrativeUnits.
     * @example
     * // Update or create a AddressAdministrativeUnits
     * const addressAdministrativeUnits = await prisma.addressAdministrativeUnits.upsert({
     *   create: {
     *     // ... data to create a AddressAdministrativeUnits
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressAdministrativeUnits we want to update
     *   }
     * })
     */
    upsert<T extends AddressAdministrativeUnitsUpsertArgs>(args: SelectSubset<T, AddressAdministrativeUnitsUpsertArgs<ExtArgs>>): Prisma__AddressAdministrativeUnitsClient<$Result.GetResult<Prisma.$AddressAdministrativeUnitsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressAdministrativeUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsCountArgs} args - Arguments to filter AddressAdministrativeUnits to count.
     * @example
     * // Count the number of AddressAdministrativeUnits
     * const count = await prisma.addressAdministrativeUnits.count({
     *   where: {
     *     // ... the filter for the AddressAdministrativeUnits we want to count
     *   }
     * })
    **/
    count<T extends AddressAdministrativeUnitsCountArgs>(
      args?: Subset<T, AddressAdministrativeUnitsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressAdministrativeUnitsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressAdministrativeUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAdministrativeUnitsAggregateArgs>(args: Subset<T, AddressAdministrativeUnitsAggregateArgs>): Prisma.PrismaPromise<GetAddressAdministrativeUnitsAggregateType<T>>

    /**
     * Group by AddressAdministrativeUnits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeUnitsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressAdministrativeUnitsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressAdministrativeUnitsGroupByArgs['orderBy'] }
        : { orderBy?: AddressAdministrativeUnitsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressAdministrativeUnitsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressAdministrativeUnitsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressAdministrativeUnits model
   */
  readonly fields: AddressAdministrativeUnitsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressAdministrativeUnits.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressAdministrativeUnitsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provinces<T extends AddressAdministrativeUnits$provincesArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnits$provincesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    districts<T extends AddressAdministrativeUnits$districtsArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnits$districtsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressDistrictsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wards<T extends AddressAdministrativeUnits$wardsArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeUnits$wardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressWardsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressAdministrativeUnits model
   */
  interface AddressAdministrativeUnitsFieldRefs {
    readonly id: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly name: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly nameEn: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly fullName: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly fullNameEn: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly codeName: FieldRef<"AddressAdministrativeUnits", 'String'>
    readonly codeNameEn: FieldRef<"AddressAdministrativeUnits", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressAdministrativeUnits findUnique
   */
  export type AddressAdministrativeUnitsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeUnits to fetch.
     */
    where: AddressAdministrativeUnitsWhereUniqueInput
  }

  /**
   * AddressAdministrativeUnits findUniqueOrThrow
   */
  export type AddressAdministrativeUnitsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeUnits to fetch.
     */
    where: AddressAdministrativeUnitsWhereUniqueInput
  }

  /**
   * AddressAdministrativeUnits findFirst
   */
  export type AddressAdministrativeUnitsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeUnits to fetch.
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeUnits to fetch.
     */
    orderBy?: AddressAdministrativeUnitsOrderByWithRelationInput | AddressAdministrativeUnitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressAdministrativeUnits.
     */
    cursor?: AddressAdministrativeUnitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressAdministrativeUnits.
     */
    distinct?: AddressAdministrativeUnitsScalarFieldEnum | AddressAdministrativeUnitsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits findFirstOrThrow
   */
  export type AddressAdministrativeUnitsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeUnits to fetch.
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeUnits to fetch.
     */
    orderBy?: AddressAdministrativeUnitsOrderByWithRelationInput | AddressAdministrativeUnitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressAdministrativeUnits.
     */
    cursor?: AddressAdministrativeUnitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeUnits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressAdministrativeUnits.
     */
    distinct?: AddressAdministrativeUnitsScalarFieldEnum | AddressAdministrativeUnitsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits findMany
   */
  export type AddressAdministrativeUnitsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeUnits to fetch.
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeUnits to fetch.
     */
    orderBy?: AddressAdministrativeUnitsOrderByWithRelationInput | AddressAdministrativeUnitsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressAdministrativeUnits.
     */
    cursor?: AddressAdministrativeUnitsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeUnits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeUnits.
     */
    skip?: number
    distinct?: AddressAdministrativeUnitsScalarFieldEnum | AddressAdministrativeUnitsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits create
   */
  export type AddressAdministrativeUnitsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressAdministrativeUnits.
     */
    data: XOR<AddressAdministrativeUnitsCreateInput, AddressAdministrativeUnitsUncheckedCreateInput>
  }

  /**
   * AddressAdministrativeUnits createMany
   */
  export type AddressAdministrativeUnitsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressAdministrativeUnits.
     */
    data: AddressAdministrativeUnitsCreateManyInput | AddressAdministrativeUnitsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressAdministrativeUnits update
   */
  export type AddressAdministrativeUnitsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressAdministrativeUnits.
     */
    data: XOR<AddressAdministrativeUnitsUpdateInput, AddressAdministrativeUnitsUncheckedUpdateInput>
    /**
     * Choose, which AddressAdministrativeUnits to update.
     */
    where: AddressAdministrativeUnitsWhereUniqueInput
  }

  /**
   * AddressAdministrativeUnits updateMany
   */
  export type AddressAdministrativeUnitsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressAdministrativeUnits.
     */
    data: XOR<AddressAdministrativeUnitsUpdateManyMutationInput, AddressAdministrativeUnitsUncheckedUpdateManyInput>
    /**
     * Filter which AddressAdministrativeUnits to update
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * Limit how many AddressAdministrativeUnits to update.
     */
    limit?: number
  }

  /**
   * AddressAdministrativeUnits upsert
   */
  export type AddressAdministrativeUnitsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressAdministrativeUnits to update in case it exists.
     */
    where: AddressAdministrativeUnitsWhereUniqueInput
    /**
     * In case the AddressAdministrativeUnits found by the `where` argument doesn't exist, create a new AddressAdministrativeUnits with this data.
     */
    create: XOR<AddressAdministrativeUnitsCreateInput, AddressAdministrativeUnitsUncheckedCreateInput>
    /**
     * In case the AddressAdministrativeUnits was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressAdministrativeUnitsUpdateInput, AddressAdministrativeUnitsUncheckedUpdateInput>
  }

  /**
   * AddressAdministrativeUnits delete
   */
  export type AddressAdministrativeUnitsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
    /**
     * Filter which AddressAdministrativeUnits to delete.
     */
    where: AddressAdministrativeUnitsWhereUniqueInput
  }

  /**
   * AddressAdministrativeUnits deleteMany
   */
  export type AddressAdministrativeUnitsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressAdministrativeUnits to delete
     */
    where?: AddressAdministrativeUnitsWhereInput
    /**
     * Limit how many AddressAdministrativeUnits to delete.
     */
    limit?: number
  }

  /**
   * AddressAdministrativeUnits.provinces
   */
  export type AddressAdministrativeUnits$provincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    where?: AddressProvincesWhereInput
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    cursor?: AddressProvincesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits.districts
   */
  export type AddressAdministrativeUnits$districtsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressDistricts
     */
    select?: AddressDistrictsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressDistricts
     */
    omit?: AddressDistrictsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressDistrictsInclude<ExtArgs> | null
    where?: AddressDistrictsWhereInput
    orderBy?: AddressDistrictsOrderByWithRelationInput | AddressDistrictsOrderByWithRelationInput[]
    cursor?: AddressDistrictsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressDistrictsScalarFieldEnum | AddressDistrictsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits.wards
   */
  export type AddressAdministrativeUnits$wardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressWards
     */
    select?: AddressWardsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressWards
     */
    omit?: AddressWardsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressWardsInclude<ExtArgs> | null
    where?: AddressWardsWhereInput
    orderBy?: AddressWardsOrderByWithRelationInput | AddressWardsOrderByWithRelationInput[]
    cursor?: AddressWardsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressWardsScalarFieldEnum | AddressWardsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeUnits without action
   */
  export type AddressAdministrativeUnitsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeUnits
     */
    select?: AddressAdministrativeUnitsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeUnits
     */
    omit?: AddressAdministrativeUnitsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeUnitsInclude<ExtArgs> | null
  }


  /**
   * Model AddressAdministrativeRegions
   */

  export type AggregateAddressAdministrativeRegions = {
    _count: AddressAdministrativeRegionsCountAggregateOutputType | null
    _min: AddressAdministrativeRegionsMinAggregateOutputType | null
    _max: AddressAdministrativeRegionsMaxAggregateOutputType | null
  }

  export type AddressAdministrativeRegionsMinAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    codeName: string | null
    codeNameEn: string | null
  }

  export type AddressAdministrativeRegionsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    nameEn: string | null
    codeName: string | null
    codeNameEn: string | null
  }

  export type AddressAdministrativeRegionsCountAggregateOutputType = {
    id: number
    name: number
    nameEn: number
    codeName: number
    codeNameEn: number
    _all: number
  }


  export type AddressAdministrativeRegionsMinAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    codeName?: true
    codeNameEn?: true
  }

  export type AddressAdministrativeRegionsMaxAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    codeName?: true
    codeNameEn?: true
  }

  export type AddressAdministrativeRegionsCountAggregateInputType = {
    id?: true
    name?: true
    nameEn?: true
    codeName?: true
    codeNameEn?: true
    _all?: true
  }

  export type AddressAdministrativeRegionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressAdministrativeRegions to aggregate.
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeRegions to fetch.
     */
    orderBy?: AddressAdministrativeRegionsOrderByWithRelationInput | AddressAdministrativeRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressAdministrativeRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressAdministrativeRegions
    **/
    _count?: true | AddressAdministrativeRegionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressAdministrativeRegionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressAdministrativeRegionsMaxAggregateInputType
  }

  export type GetAddressAdministrativeRegionsAggregateType<T extends AddressAdministrativeRegionsAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressAdministrativeRegions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressAdministrativeRegions[P]>
      : GetScalarType<T[P], AggregateAddressAdministrativeRegions[P]>
  }




  export type AddressAdministrativeRegionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressAdministrativeRegionsWhereInput
    orderBy?: AddressAdministrativeRegionsOrderByWithAggregationInput | AddressAdministrativeRegionsOrderByWithAggregationInput[]
    by: AddressAdministrativeRegionsScalarFieldEnum[] | AddressAdministrativeRegionsScalarFieldEnum
    having?: AddressAdministrativeRegionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressAdministrativeRegionsCountAggregateInputType | true
    _min?: AddressAdministrativeRegionsMinAggregateInputType
    _max?: AddressAdministrativeRegionsMaxAggregateInputType
  }

  export type AddressAdministrativeRegionsGroupByOutputType = {
    id: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
    _count: AddressAdministrativeRegionsCountAggregateOutputType | null
    _min: AddressAdministrativeRegionsMinAggregateOutputType | null
    _max: AddressAdministrativeRegionsMaxAggregateOutputType | null
  }

  type GetAddressAdministrativeRegionsGroupByPayload<T extends AddressAdministrativeRegionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressAdministrativeRegionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressAdministrativeRegionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressAdministrativeRegionsGroupByOutputType[P]>
            : GetScalarType<T[P], AddressAdministrativeRegionsGroupByOutputType[P]>
        }
      >
    >


  export type AddressAdministrativeRegionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    nameEn?: boolean
    codeName?: boolean
    codeNameEn?: boolean
    provinces?: boolean | AddressAdministrativeRegions$provincesArgs<ExtArgs>
    _count?: boolean | AddressAdministrativeRegionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["addressAdministrativeRegions"]>



  export type AddressAdministrativeRegionsSelectScalar = {
    id?: boolean
    name?: boolean
    nameEn?: boolean
    codeName?: boolean
    codeNameEn?: boolean
  }

  export type AddressAdministrativeRegionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "nameEn" | "codeName" | "codeNameEn", ExtArgs["result"]["addressAdministrativeRegions"]>
  export type AddressAdministrativeRegionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provinces?: boolean | AddressAdministrativeRegions$provincesArgs<ExtArgs>
    _count?: boolean | AddressAdministrativeRegionsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AddressAdministrativeRegionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressAdministrativeRegions"
    objects: {
      provinces: Prisma.$AddressProvincesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      nameEn: string
      codeName: string
      codeNameEn: string
    }, ExtArgs["result"]["addressAdministrativeRegions"]>
    composites: {}
  }

  type AddressAdministrativeRegionsGetPayload<S extends boolean | null | undefined | AddressAdministrativeRegionsDefaultArgs> = $Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload, S>

  type AddressAdministrativeRegionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AddressAdministrativeRegionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AddressAdministrativeRegionsCountAggregateInputType | true
    }

  export interface AddressAdministrativeRegionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressAdministrativeRegions'], meta: { name: 'AddressAdministrativeRegions' } }
    /**
     * Find zero or one AddressAdministrativeRegions that matches the filter.
     * @param {AddressAdministrativeRegionsFindUniqueArgs} args - Arguments to find a AddressAdministrativeRegions
     * @example
     * // Get one AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressAdministrativeRegionsFindUniqueArgs>(args: SelectSubset<T, AddressAdministrativeRegionsFindUniqueArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AddressAdministrativeRegions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AddressAdministrativeRegionsFindUniqueOrThrowArgs} args - Arguments to find a AddressAdministrativeRegions
     * @example
     * // Get one AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressAdministrativeRegionsFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressAdministrativeRegionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressAdministrativeRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsFindFirstArgs} args - Arguments to find a AddressAdministrativeRegions
     * @example
     * // Get one AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressAdministrativeRegionsFindFirstArgs>(args?: SelectSubset<T, AddressAdministrativeRegionsFindFirstArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AddressAdministrativeRegions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsFindFirstOrThrowArgs} args - Arguments to find a AddressAdministrativeRegions
     * @example
     * // Get one AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressAdministrativeRegionsFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressAdministrativeRegionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AddressAdministrativeRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findMany()
     * 
     * // Get first 10 AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressAdministrativeRegionsWithIdOnly = await prisma.addressAdministrativeRegions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressAdministrativeRegionsFindManyArgs>(args?: SelectSubset<T, AddressAdministrativeRegionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsCreateArgs} args - Arguments to create a AddressAdministrativeRegions.
     * @example
     * // Create one AddressAdministrativeRegions
     * const AddressAdministrativeRegions = await prisma.addressAdministrativeRegions.create({
     *   data: {
     *     // ... data to create a AddressAdministrativeRegions
     *   }
     * })
     * 
     */
    create<T extends AddressAdministrativeRegionsCreateArgs>(args: SelectSubset<T, AddressAdministrativeRegionsCreateArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsCreateManyArgs} args - Arguments to create many AddressAdministrativeRegions.
     * @example
     * // Create many AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressAdministrativeRegionsCreateManyArgs>(args?: SelectSubset<T, AddressAdministrativeRegionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsDeleteArgs} args - Arguments to delete one AddressAdministrativeRegions.
     * @example
     * // Delete one AddressAdministrativeRegions
     * const AddressAdministrativeRegions = await prisma.addressAdministrativeRegions.delete({
     *   where: {
     *     // ... filter to delete one AddressAdministrativeRegions
     *   }
     * })
     * 
     */
    delete<T extends AddressAdministrativeRegionsDeleteArgs>(args: SelectSubset<T, AddressAdministrativeRegionsDeleteArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsUpdateArgs} args - Arguments to update one AddressAdministrativeRegions.
     * @example
     * // Update one AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressAdministrativeRegionsUpdateArgs>(args: SelectSubset<T, AddressAdministrativeRegionsUpdateArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsDeleteManyArgs} args - Arguments to filter AddressAdministrativeRegions to delete.
     * @example
     * // Delete a few AddressAdministrativeRegions
     * const { count } = await prisma.addressAdministrativeRegions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressAdministrativeRegionsDeleteManyArgs>(args?: SelectSubset<T, AddressAdministrativeRegionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressAdministrativeRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressAdministrativeRegionsUpdateManyArgs>(args: SelectSubset<T, AddressAdministrativeRegionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressAdministrativeRegions.
     * @param {AddressAdministrativeRegionsUpsertArgs} args - Arguments to update or create a AddressAdministrativeRegions.
     * @example
     * // Update or create a AddressAdministrativeRegions
     * const addressAdministrativeRegions = await prisma.addressAdministrativeRegions.upsert({
     *   create: {
     *     // ... data to create a AddressAdministrativeRegions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressAdministrativeRegions we want to update
     *   }
     * })
     */
    upsert<T extends AddressAdministrativeRegionsUpsertArgs>(args: SelectSubset<T, AddressAdministrativeRegionsUpsertArgs<ExtArgs>>): Prisma__AddressAdministrativeRegionsClient<$Result.GetResult<Prisma.$AddressAdministrativeRegionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AddressAdministrativeRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsCountArgs} args - Arguments to filter AddressAdministrativeRegions to count.
     * @example
     * // Count the number of AddressAdministrativeRegions
     * const count = await prisma.addressAdministrativeRegions.count({
     *   where: {
     *     // ... the filter for the AddressAdministrativeRegions we want to count
     *   }
     * })
    **/
    count<T extends AddressAdministrativeRegionsCountArgs>(
      args?: Subset<T, AddressAdministrativeRegionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressAdministrativeRegionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressAdministrativeRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAdministrativeRegionsAggregateArgs>(args: Subset<T, AddressAdministrativeRegionsAggregateArgs>): Prisma.PrismaPromise<GetAddressAdministrativeRegionsAggregateType<T>>

    /**
     * Group by AddressAdministrativeRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAdministrativeRegionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressAdministrativeRegionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressAdministrativeRegionsGroupByArgs['orderBy'] }
        : { orderBy?: AddressAdministrativeRegionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressAdministrativeRegionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressAdministrativeRegionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressAdministrativeRegions model
   */
  readonly fields: AddressAdministrativeRegionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressAdministrativeRegions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressAdministrativeRegionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provinces<T extends AddressAdministrativeRegions$provincesArgs<ExtArgs> = {}>(args?: Subset<T, AddressAdministrativeRegions$provincesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressProvincesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AddressAdministrativeRegions model
   */
  interface AddressAdministrativeRegionsFieldRefs {
    readonly id: FieldRef<"AddressAdministrativeRegions", 'String'>
    readonly name: FieldRef<"AddressAdministrativeRegions", 'String'>
    readonly nameEn: FieldRef<"AddressAdministrativeRegions", 'String'>
    readonly codeName: FieldRef<"AddressAdministrativeRegions", 'String'>
    readonly codeNameEn: FieldRef<"AddressAdministrativeRegions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AddressAdministrativeRegions findUnique
   */
  export type AddressAdministrativeRegionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeRegions to fetch.
     */
    where: AddressAdministrativeRegionsWhereUniqueInput
  }

  /**
   * AddressAdministrativeRegions findUniqueOrThrow
   */
  export type AddressAdministrativeRegionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeRegions to fetch.
     */
    where: AddressAdministrativeRegionsWhereUniqueInput
  }

  /**
   * AddressAdministrativeRegions findFirst
   */
  export type AddressAdministrativeRegionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeRegions to fetch.
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeRegions to fetch.
     */
    orderBy?: AddressAdministrativeRegionsOrderByWithRelationInput | AddressAdministrativeRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressAdministrativeRegions.
     */
    cursor?: AddressAdministrativeRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressAdministrativeRegions.
     */
    distinct?: AddressAdministrativeRegionsScalarFieldEnum | AddressAdministrativeRegionsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeRegions findFirstOrThrow
   */
  export type AddressAdministrativeRegionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeRegions to fetch.
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeRegions to fetch.
     */
    orderBy?: AddressAdministrativeRegionsOrderByWithRelationInput | AddressAdministrativeRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressAdministrativeRegions.
     */
    cursor?: AddressAdministrativeRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressAdministrativeRegions.
     */
    distinct?: AddressAdministrativeRegionsScalarFieldEnum | AddressAdministrativeRegionsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeRegions findMany
   */
  export type AddressAdministrativeRegionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter, which AddressAdministrativeRegions to fetch.
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressAdministrativeRegions to fetch.
     */
    orderBy?: AddressAdministrativeRegionsOrderByWithRelationInput | AddressAdministrativeRegionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressAdministrativeRegions.
     */
    cursor?: AddressAdministrativeRegionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressAdministrativeRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressAdministrativeRegions.
     */
    skip?: number
    distinct?: AddressAdministrativeRegionsScalarFieldEnum | AddressAdministrativeRegionsScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeRegions create
   */
  export type AddressAdministrativeRegionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * The data needed to create a AddressAdministrativeRegions.
     */
    data: XOR<AddressAdministrativeRegionsCreateInput, AddressAdministrativeRegionsUncheckedCreateInput>
  }

  /**
   * AddressAdministrativeRegions createMany
   */
  export type AddressAdministrativeRegionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressAdministrativeRegions.
     */
    data: AddressAdministrativeRegionsCreateManyInput | AddressAdministrativeRegionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressAdministrativeRegions update
   */
  export type AddressAdministrativeRegionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * The data needed to update a AddressAdministrativeRegions.
     */
    data: XOR<AddressAdministrativeRegionsUpdateInput, AddressAdministrativeRegionsUncheckedUpdateInput>
    /**
     * Choose, which AddressAdministrativeRegions to update.
     */
    where: AddressAdministrativeRegionsWhereUniqueInput
  }

  /**
   * AddressAdministrativeRegions updateMany
   */
  export type AddressAdministrativeRegionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressAdministrativeRegions.
     */
    data: XOR<AddressAdministrativeRegionsUpdateManyMutationInput, AddressAdministrativeRegionsUncheckedUpdateManyInput>
    /**
     * Filter which AddressAdministrativeRegions to update
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * Limit how many AddressAdministrativeRegions to update.
     */
    limit?: number
  }

  /**
   * AddressAdministrativeRegions upsert
   */
  export type AddressAdministrativeRegionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * The filter to search for the AddressAdministrativeRegions to update in case it exists.
     */
    where: AddressAdministrativeRegionsWhereUniqueInput
    /**
     * In case the AddressAdministrativeRegions found by the `where` argument doesn't exist, create a new AddressAdministrativeRegions with this data.
     */
    create: XOR<AddressAdministrativeRegionsCreateInput, AddressAdministrativeRegionsUncheckedCreateInput>
    /**
     * In case the AddressAdministrativeRegions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressAdministrativeRegionsUpdateInput, AddressAdministrativeRegionsUncheckedUpdateInput>
  }

  /**
   * AddressAdministrativeRegions delete
   */
  export type AddressAdministrativeRegionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
    /**
     * Filter which AddressAdministrativeRegions to delete.
     */
    where: AddressAdministrativeRegionsWhereUniqueInput
  }

  /**
   * AddressAdministrativeRegions deleteMany
   */
  export type AddressAdministrativeRegionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressAdministrativeRegions to delete
     */
    where?: AddressAdministrativeRegionsWhereInput
    /**
     * Limit how many AddressAdministrativeRegions to delete.
     */
    limit?: number
  }

  /**
   * AddressAdministrativeRegions.provinces
   */
  export type AddressAdministrativeRegions$provincesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressProvinces
     */
    select?: AddressProvincesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressProvinces
     */
    omit?: AddressProvincesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressProvincesInclude<ExtArgs> | null
    where?: AddressProvincesWhereInput
    orderBy?: AddressProvincesOrderByWithRelationInput | AddressProvincesOrderByWithRelationInput[]
    cursor?: AddressProvincesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressProvincesScalarFieldEnum | AddressProvincesScalarFieldEnum[]
  }

  /**
   * AddressAdministrativeRegions without action
   */
  export type AddressAdministrativeRegionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressAdministrativeRegions
     */
    select?: AddressAdministrativeRegionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AddressAdministrativeRegions
     */
    omit?: AddressAdministrativeRegionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressAdministrativeRegionsInclude<ExtArgs> | null
  }


  /**
   * Model OTP
   */

  export type AggregateOTP = {
    _count: OTPCountAggregateOutputType | null
    _avg: OTPAvgAggregateOutputType | null
    _sum: OTPSumAggregateOutputType | null
    _min: OTPMinAggregateOutputType | null
    _max: OTPMaxAggregateOutputType | null
  }

  export type OTPAvgAggregateOutputType = {
    attemptCount: number | null
    failedAttempts: number | null
  }

  export type OTPSumAggregateOutputType = {
    attemptCount: number | null
    failedAttempts: number | null
  }

  export type OTPMinAggregateOutputType = {
    id: string | null
    email: string | null
    type: string | null
    otp: string | null
    createdAt: Date | null
    lastAttempt: Date | null
    attemptCount: number | null
    isUsed: boolean | null
    failedAttempts: number | null
  }

  export type OTPMaxAggregateOutputType = {
    id: string | null
    email: string | null
    type: string | null
    otp: string | null
    createdAt: Date | null
    lastAttempt: Date | null
    attemptCount: number | null
    isUsed: boolean | null
    failedAttempts: number | null
  }

  export type OTPCountAggregateOutputType = {
    id: number
    email: number
    type: number
    otp: number
    createdAt: number
    lastAttempt: number
    attemptCount: number
    isUsed: number
    failedAttempts: number
    _all: number
  }


  export type OTPAvgAggregateInputType = {
    attemptCount?: true
    failedAttempts?: true
  }

  export type OTPSumAggregateInputType = {
    attemptCount?: true
    failedAttempts?: true
  }

  export type OTPMinAggregateInputType = {
    id?: true
    email?: true
    type?: true
    otp?: true
    createdAt?: true
    lastAttempt?: true
    attemptCount?: true
    isUsed?: true
    failedAttempts?: true
  }

  export type OTPMaxAggregateInputType = {
    id?: true
    email?: true
    type?: true
    otp?: true
    createdAt?: true
    lastAttempt?: true
    attemptCount?: true
    isUsed?: true
    failedAttempts?: true
  }

  export type OTPCountAggregateInputType = {
    id?: true
    email?: true
    type?: true
    otp?: true
    createdAt?: true
    lastAttempt?: true
    attemptCount?: true
    isUsed?: true
    failedAttempts?: true
    _all?: true
  }

  export type OTPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTP to aggregate.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OTPS
    **/
    _count?: true | OTPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OTPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OTPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OTPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OTPMaxAggregateInputType
  }

  export type GetOTPAggregateType<T extends OTPAggregateArgs> = {
        [P in keyof T & keyof AggregateOTP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOTP[P]>
      : GetScalarType<T[P], AggregateOTP[P]>
  }




  export type OTPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTPWhereInput
    orderBy?: OTPOrderByWithAggregationInput | OTPOrderByWithAggregationInput[]
    by: OTPScalarFieldEnum[] | OTPScalarFieldEnum
    having?: OTPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OTPCountAggregateInputType | true
    _avg?: OTPAvgAggregateInputType
    _sum?: OTPSumAggregateInputType
    _min?: OTPMinAggregateInputType
    _max?: OTPMaxAggregateInputType
  }

  export type OTPGroupByOutputType = {
    id: string
    email: string
    type: string
    otp: string
    createdAt: Date
    lastAttempt: Date
    attemptCount: number
    isUsed: boolean
    failedAttempts: number
    _count: OTPCountAggregateOutputType | null
    _avg: OTPAvgAggregateOutputType | null
    _sum: OTPSumAggregateOutputType | null
    _min: OTPMinAggregateOutputType | null
    _max: OTPMaxAggregateOutputType | null
  }

  type GetOTPGroupByPayload<T extends OTPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OTPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OTPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OTPGroupByOutputType[P]>
            : GetScalarType<T[P], OTPGroupByOutputType[P]>
        }
      >
    >


  export type OTPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    type?: boolean
    otp?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
    attemptCount?: boolean
    isUsed?: boolean
    failedAttempts?: boolean
  }, ExtArgs["result"]["oTP"]>



  export type OTPSelectScalar = {
    id?: boolean
    email?: boolean
    type?: boolean
    otp?: boolean
    createdAt?: boolean
    lastAttempt?: boolean
    attemptCount?: boolean
    isUsed?: boolean
    failedAttempts?: boolean
  }

  export type OTPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "type" | "otp" | "createdAt" | "lastAttempt" | "attemptCount" | "isUsed" | "failedAttempts", ExtArgs["result"]["oTP"]>

  export type $OTPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OTP"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      type: string
      otp: string
      createdAt: Date
      lastAttempt: Date
      attemptCount: number
      isUsed: boolean
      failedAttempts: number
    }, ExtArgs["result"]["oTP"]>
    composites: {}
  }

  type OTPGetPayload<S extends boolean | null | undefined | OTPDefaultArgs> = $Result.GetResult<Prisma.$OTPPayload, S>

  type OTPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OTPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OTPCountAggregateInputType | true
    }

  export interface OTPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OTP'], meta: { name: 'OTP' } }
    /**
     * Find zero or one OTP that matches the filter.
     * @param {OTPFindUniqueArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OTPFindUniqueArgs>(args: SelectSubset<T, OTPFindUniqueArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OTP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OTPFindUniqueOrThrowArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OTPFindUniqueOrThrowArgs>(args: SelectSubset<T, OTPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindFirstArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OTPFindFirstArgs>(args?: SelectSubset<T, OTPFindFirstArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindFirstOrThrowArgs} args - Arguments to find a OTP
     * @example
     * // Get one OTP
     * const oTP = await prisma.oTP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OTPFindFirstOrThrowArgs>(args?: SelectSubset<T, OTPFindFirstOrThrowArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OTPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OTPS
     * const oTPS = await prisma.oTP.findMany()
     * 
     * // Get first 10 OTPS
     * const oTPS = await prisma.oTP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oTPWithIdOnly = await prisma.oTP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OTPFindManyArgs>(args?: SelectSubset<T, OTPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OTP.
     * @param {OTPCreateArgs} args - Arguments to create a OTP.
     * @example
     * // Create one OTP
     * const OTP = await prisma.oTP.create({
     *   data: {
     *     // ... data to create a OTP
     *   }
     * })
     * 
     */
    create<T extends OTPCreateArgs>(args: SelectSubset<T, OTPCreateArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OTPS.
     * @param {OTPCreateManyArgs} args - Arguments to create many OTPS.
     * @example
     * // Create many OTPS
     * const oTP = await prisma.oTP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OTPCreateManyArgs>(args?: SelectSubset<T, OTPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OTP.
     * @param {OTPDeleteArgs} args - Arguments to delete one OTP.
     * @example
     * // Delete one OTP
     * const OTP = await prisma.oTP.delete({
     *   where: {
     *     // ... filter to delete one OTP
     *   }
     * })
     * 
     */
    delete<T extends OTPDeleteArgs>(args: SelectSubset<T, OTPDeleteArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OTP.
     * @param {OTPUpdateArgs} args - Arguments to update one OTP.
     * @example
     * // Update one OTP
     * const oTP = await prisma.oTP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OTPUpdateArgs>(args: SelectSubset<T, OTPUpdateArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OTPS.
     * @param {OTPDeleteManyArgs} args - Arguments to filter OTPS to delete.
     * @example
     * // Delete a few OTPS
     * const { count } = await prisma.oTP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OTPDeleteManyArgs>(args?: SelectSubset<T, OTPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OTPS
     * const oTP = await prisma.oTP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OTPUpdateManyArgs>(args: SelectSubset<T, OTPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OTP.
     * @param {OTPUpsertArgs} args - Arguments to update or create a OTP.
     * @example
     * // Update or create a OTP
     * const oTP = await prisma.oTP.upsert({
     *   create: {
     *     // ... data to create a OTP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OTP we want to update
     *   }
     * })
     */
    upsert<T extends OTPUpsertArgs>(args: SelectSubset<T, OTPUpsertArgs<ExtArgs>>): Prisma__OTPClient<$Result.GetResult<Prisma.$OTPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OTPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPCountArgs} args - Arguments to filter OTPS to count.
     * @example
     * // Count the number of OTPS
     * const count = await prisma.oTP.count({
     *   where: {
     *     // ... the filter for the OTPS we want to count
     *   }
     * })
    **/
    count<T extends OTPCountArgs>(
      args?: Subset<T, OTPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OTPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OTP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OTPAggregateArgs>(args: Subset<T, OTPAggregateArgs>): Prisma.PrismaPromise<GetOTPAggregateType<T>>

    /**
     * Group by OTP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OTPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OTPGroupByArgs['orderBy'] }
        : { orderBy?: OTPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OTPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOTPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OTP model
   */
  readonly fields: OTPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OTP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OTPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OTP model
   */
  interface OTPFieldRefs {
    readonly id: FieldRef<"OTP", 'String'>
    readonly email: FieldRef<"OTP", 'String'>
    readonly type: FieldRef<"OTP", 'String'>
    readonly otp: FieldRef<"OTP", 'String'>
    readonly createdAt: FieldRef<"OTP", 'DateTime'>
    readonly lastAttempt: FieldRef<"OTP", 'DateTime'>
    readonly attemptCount: FieldRef<"OTP", 'Int'>
    readonly isUsed: FieldRef<"OTP", 'Boolean'>
    readonly failedAttempts: FieldRef<"OTP", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OTP findUnique
   */
  export type OTPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP findUniqueOrThrow
   */
  export type OTPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP findFirst
   */
  export type OTPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPS.
     */
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP findFirstOrThrow
   */
  export type OTPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTP to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPS.
     */
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP findMany
   */
  export type OTPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter, which OTPS to fetch.
     */
    where?: OTPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPS to fetch.
     */
    orderBy?: OTPOrderByWithRelationInput | OTPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OTPS.
     */
    cursor?: OTPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPS.
     */
    skip?: number
    distinct?: OTPScalarFieldEnum | OTPScalarFieldEnum[]
  }

  /**
   * OTP create
   */
  export type OTPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data needed to create a OTP.
     */
    data: XOR<OTPCreateInput, OTPUncheckedCreateInput>
  }

  /**
   * OTP createMany
   */
  export type OTPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OTPS.
     */
    data: OTPCreateManyInput | OTPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OTP update
   */
  export type OTPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The data needed to update a OTP.
     */
    data: XOR<OTPUpdateInput, OTPUncheckedUpdateInput>
    /**
     * Choose, which OTP to update.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP updateMany
   */
  export type OTPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OTPS.
     */
    data: XOR<OTPUpdateManyMutationInput, OTPUncheckedUpdateManyInput>
    /**
     * Filter which OTPS to update
     */
    where?: OTPWhereInput
    /**
     * Limit how many OTPS to update.
     */
    limit?: number
  }

  /**
   * OTP upsert
   */
  export type OTPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * The filter to search for the OTP to update in case it exists.
     */
    where: OTPWhereUniqueInput
    /**
     * In case the OTP found by the `where` argument doesn't exist, create a new OTP with this data.
     */
    create: XOR<OTPCreateInput, OTPUncheckedCreateInput>
    /**
     * In case the OTP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OTPUpdateInput, OTPUncheckedUpdateInput>
  }

  /**
   * OTP delete
   */
  export type OTPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
    /**
     * Filter which OTP to delete.
     */
    where: OTPWhereUniqueInput
  }

  /**
   * OTP deleteMany
   */
  export type OTPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTPS to delete
     */
    where?: OTPWhereInput
    /**
     * Limit how many OTPS to delete.
     */
    limit?: number
  }

  /**
   * OTP without action
   */
  export type OTPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTP
     */
    select?: OTPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTP
     */
    omit?: OTPOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AddressScalarFieldEnum: {
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

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    codeName: 'codeName'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const AddressProvincesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    administrativeUnitId: 'administrativeUnitId',
    administrativeRegionId: 'administrativeRegionId',
    countryId: 'countryId'
  };

  export type AddressProvincesScalarFieldEnum = (typeof AddressProvincesScalarFieldEnum)[keyof typeof AddressProvincesScalarFieldEnum]


  export const AddressDistrictsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    provinceCode: 'provinceCode',
    administrativeUnitId: 'administrativeUnitId'
  };

  export type AddressDistrictsScalarFieldEnum = (typeof AddressDistrictsScalarFieldEnum)[keyof typeof AddressDistrictsScalarFieldEnum]


  export const AddressWardsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    districtId: 'districtId',
    administrativeUnitId: 'administrativeUnitId'
  };

  export type AddressWardsScalarFieldEnum = (typeof AddressWardsScalarFieldEnum)[keyof typeof AddressWardsScalarFieldEnum]


  export const AddressAdministrativeUnitsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    codeName: 'codeName',
    codeNameEn: 'codeNameEn'
  };

  export type AddressAdministrativeUnitsScalarFieldEnum = (typeof AddressAdministrativeUnitsScalarFieldEnum)[keyof typeof AddressAdministrativeUnitsScalarFieldEnum]


  export const AddressAdministrativeRegionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    codeName: 'codeName',
    codeNameEn: 'codeNameEn'
  };

  export type AddressAdministrativeRegionsScalarFieldEnum = (typeof AddressAdministrativeRegionsScalarFieldEnum)[keyof typeof AddressAdministrativeRegionsScalarFieldEnum]


  export const OTPScalarFieldEnum: {
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

  export type OTPScalarFieldEnum = (typeof OTPScalarFieldEnum)[keyof typeof OTPScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
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

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const AddressOrderByRelevanceFieldEnum: {
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

  export type AddressOrderByRelevanceFieldEnum = (typeof AddressOrderByRelevanceFieldEnum)[keyof typeof AddressOrderByRelevanceFieldEnum]


  export const CountryOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    codeName: 'codeName'
  };

  export type CountryOrderByRelevanceFieldEnum = (typeof CountryOrderByRelevanceFieldEnum)[keyof typeof CountryOrderByRelevanceFieldEnum]


  export const AddressProvincesOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    administrativeUnitId: 'administrativeUnitId',
    administrativeRegionId: 'administrativeRegionId',
    countryId: 'countryId'
  };

  export type AddressProvincesOrderByRelevanceFieldEnum = (typeof AddressProvincesOrderByRelevanceFieldEnum)[keyof typeof AddressProvincesOrderByRelevanceFieldEnum]


  export const AddressDistrictsOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    provinceCode: 'provinceCode',
    administrativeUnitId: 'administrativeUnitId'
  };

  export type AddressDistrictsOrderByRelevanceFieldEnum = (typeof AddressDistrictsOrderByRelevanceFieldEnum)[keyof typeof AddressDistrictsOrderByRelevanceFieldEnum]


  export const AddressWardsOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    districtId: 'districtId',
    administrativeUnitId: 'administrativeUnitId'
  };

  export type AddressWardsOrderByRelevanceFieldEnum = (typeof AddressWardsOrderByRelevanceFieldEnum)[keyof typeof AddressWardsOrderByRelevanceFieldEnum]


  export const AddressAdministrativeUnitsOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    fullName: 'fullName',
    fullNameEn: 'fullNameEn',
    codeName: 'codeName',
    codeNameEn: 'codeNameEn'
  };

  export type AddressAdministrativeUnitsOrderByRelevanceFieldEnum = (typeof AddressAdministrativeUnitsOrderByRelevanceFieldEnum)[keyof typeof AddressAdministrativeUnitsOrderByRelevanceFieldEnum]


  export const AddressAdministrativeRegionsOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    nameEn: 'nameEn',
    codeName: 'codeName',
    codeNameEn: 'codeNameEn'
  };

  export type AddressAdministrativeRegionsOrderByRelevanceFieldEnum = (typeof AddressAdministrativeRegionsOrderByRelevanceFieldEnum)[keyof typeof AddressAdministrativeRegionsOrderByRelevanceFieldEnum]


  export const OTPOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    type: 'type',
    otp: 'otp'
  };

  export type OTPOrderByRelevanceFieldEnum = (typeof OTPOrderByRelevanceFieldEnum)[keyof typeof OTPOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    permissions?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    gender?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profilePictureUrl?: StringNullableFilter<"User"> | string | null
    address?: AddressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    permissions?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    address?: AddressOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    role?: StringFilter<"User"> | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    permissions?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    gender?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    profilePictureUrl?: StringNullableFilter<"User"> | string | null
    address?: AddressListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    permissions?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    profilePictureUrl?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    role?: StringWithAggregatesFilter<"User"> | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    permissions?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    profilePictureUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    street?: StringFilter<"Address"> | string
    city?: StringNullableFilter<"Address"> | string | null
    state?: StringNullableFilter<"Address"> | string | null
    vnProvinceId?: StringNullableFilter<"Address"> | string | null
    vnDistrictId?: StringNullableFilter<"Address"> | string | null
    vnWardId?: StringNullableFilter<"Address"> | string | null
    zip?: StringNullableFilter<"Address"> | string | null
    countryId?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vnProvince?: XOR<AddressProvincesNullableScalarRelationFilter, AddressProvincesWhereInput> | null
    vnDistrict?: XOR<AddressDistrictsNullableScalarRelationFilter, AddressDistrictsWhereInput> | null
    vnWard?: XOR<AddressWardsNullableScalarRelationFilter, AddressWardsWhereInput> | null
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    street?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    vnProvinceId?: SortOrderInput | SortOrder
    vnDistrictId?: SortOrderInput | SortOrder
    vnWardId?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    countryId?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    vnProvince?: AddressProvincesOrderByWithRelationInput
    vnDistrict?: AddressDistrictsOrderByWithRelationInput
    vnWard?: AddressWardsOrderByWithRelationInput
    country?: CountryOrderByWithRelationInput
    _relevance?: AddressOrderByRelevanceInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    userId?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    street?: StringFilter<"Address"> | string
    city?: StringNullableFilter<"Address"> | string | null
    state?: StringNullableFilter<"Address"> | string | null
    vnProvinceId?: StringNullableFilter<"Address"> | string | null
    vnDistrictId?: StringNullableFilter<"Address"> | string | null
    vnWardId?: StringNullableFilter<"Address"> | string | null
    zip?: StringNullableFilter<"Address"> | string | null
    countryId?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    vnProvince?: XOR<AddressProvincesNullableScalarRelationFilter, AddressProvincesWhereInput> | null
    vnDistrict?: XOR<AddressDistrictsNullableScalarRelationFilter, AddressDistrictsWhereInput> | null
    vnWard?: XOR<AddressWardsNullableScalarRelationFilter, AddressWardsWhereInput> | null
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    street?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    vnProvinceId?: SortOrderInput | SortOrder
    vnDistrictId?: SortOrderInput | SortOrder
    vnWardId?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    countryId?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    userId?: StringWithAggregatesFilter<"Address"> | string
    name?: StringWithAggregatesFilter<"Address"> | string
    street?: StringWithAggregatesFilter<"Address"> | string
    city?: StringNullableWithAggregatesFilter<"Address"> | string | null
    state?: StringNullableWithAggregatesFilter<"Address"> | string | null
    vnProvinceId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    vnDistrictId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    vnWardId?: StringNullableWithAggregatesFilter<"Address"> | string | null
    zip?: StringNullableWithAggregatesFilter<"Address"> | string | null
    countryId?: StringWithAggregatesFilter<"Address"> | string
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type CountryWhereInput = {
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    id?: StringFilter<"Country"> | string
    name?: StringFilter<"Country"> | string
    codeName?: StringFilter<"Country"> | string
    provinces?: AddressProvincesListRelationFilter
    addresses?: AddressListRelationFilter
  }

  export type CountryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    codeName?: SortOrder
    provinces?: AddressProvincesOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    _relevance?: CountryOrderByRelevanceInput
  }

  export type CountryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codeName?: string
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    name?: StringFilter<"Country"> | string
    provinces?: AddressProvincesListRelationFilter
    addresses?: AddressListRelationFilter
  }, "id" | "codeName">

  export type CountryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    codeName?: SortOrder
    _count?: CountryCountOrderByAggregateInput
    _max?: CountryMaxOrderByAggregateInput
    _min?: CountryMinOrderByAggregateInput
  }

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    OR?: CountryScalarWhereWithAggregatesInput[]
    NOT?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Country"> | string
    name?: StringWithAggregatesFilter<"Country"> | string
    codeName?: StringWithAggregatesFilter<"Country"> | string
  }

  export type AddressProvincesWhereInput = {
    AND?: AddressProvincesWhereInput | AddressProvincesWhereInput[]
    OR?: AddressProvincesWhereInput[]
    NOT?: AddressProvincesWhereInput | AddressProvincesWhereInput[]
    id?: StringFilter<"AddressProvinces"> | string
    name?: StringFilter<"AddressProvinces"> | string
    nameEn?: StringFilter<"AddressProvinces"> | string
    fullName?: StringFilter<"AddressProvinces"> | string
    fullNameEn?: StringFilter<"AddressProvinces"> | string
    administrativeUnitId?: StringFilter<"AddressProvinces"> | string
    administrativeRegionId?: StringFilter<"AddressProvinces"> | string
    countryId?: StringFilter<"AddressProvinces"> | string
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    administrativeRegion?: XOR<AddressAdministrativeRegionsScalarRelationFilter, AddressAdministrativeRegionsWhereInput>
    districts?: AddressDistrictsListRelationFilter
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    addresses?: AddressListRelationFilter
  }

  export type AddressProvincesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    administrativeUnitId?: SortOrder
    administrativeRegionId?: SortOrder
    countryId?: SortOrder
    administrativeUnit?: AddressAdministrativeUnitsOrderByWithRelationInput
    administrativeRegion?: AddressAdministrativeRegionsOrderByWithRelationInput
    districts?: AddressDistrictsOrderByRelationAggregateInput
    country?: CountryOrderByWithRelationInput
    addresses?: AddressOrderByRelationAggregateInput
    _relevance?: AddressProvincesOrderByRelevanceInput
  }

  export type AddressProvincesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressProvincesWhereInput | AddressProvincesWhereInput[]
    OR?: AddressProvincesWhereInput[]
    NOT?: AddressProvincesWhereInput | AddressProvincesWhereInput[]
    name?: StringFilter<"AddressProvinces"> | string
    nameEn?: StringFilter<"AddressProvinces"> | string
    fullName?: StringFilter<"AddressProvinces"> | string
    fullNameEn?: StringFilter<"AddressProvinces"> | string
    administrativeUnitId?: StringFilter<"AddressProvinces"> | string
    administrativeRegionId?: StringFilter<"AddressProvinces"> | string
    countryId?: StringFilter<"AddressProvinces"> | string
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    administrativeRegion?: XOR<AddressAdministrativeRegionsScalarRelationFilter, AddressAdministrativeRegionsWhereInput>
    districts?: AddressDistrictsListRelationFilter
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    addresses?: AddressListRelationFilter
  }, "id">

  export type AddressProvincesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    administrativeUnitId?: SortOrder
    administrativeRegionId?: SortOrder
    countryId?: SortOrder
    _count?: AddressProvincesCountOrderByAggregateInput
    _max?: AddressProvincesMaxOrderByAggregateInput
    _min?: AddressProvincesMinOrderByAggregateInput
  }

  export type AddressProvincesScalarWhereWithAggregatesInput = {
    AND?: AddressProvincesScalarWhereWithAggregatesInput | AddressProvincesScalarWhereWithAggregatesInput[]
    OR?: AddressProvincesScalarWhereWithAggregatesInput[]
    NOT?: AddressProvincesScalarWhereWithAggregatesInput | AddressProvincesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressProvinces"> | string
    name?: StringWithAggregatesFilter<"AddressProvinces"> | string
    nameEn?: StringWithAggregatesFilter<"AddressProvinces"> | string
    fullName?: StringWithAggregatesFilter<"AddressProvinces"> | string
    fullNameEn?: StringWithAggregatesFilter<"AddressProvinces"> | string
    administrativeUnitId?: StringWithAggregatesFilter<"AddressProvinces"> | string
    administrativeRegionId?: StringWithAggregatesFilter<"AddressProvinces"> | string
    countryId?: StringWithAggregatesFilter<"AddressProvinces"> | string
  }

  export type AddressDistrictsWhereInput = {
    AND?: AddressDistrictsWhereInput | AddressDistrictsWhereInput[]
    OR?: AddressDistrictsWhereInput[]
    NOT?: AddressDistrictsWhereInput | AddressDistrictsWhereInput[]
    id?: StringFilter<"AddressDistricts"> | string
    name?: StringFilter<"AddressDistricts"> | string
    nameEn?: StringFilter<"AddressDistricts"> | string
    fullName?: StringFilter<"AddressDistricts"> | string
    fullNameEn?: StringFilter<"AddressDistricts"> | string
    provinceCode?: StringFilter<"AddressDistricts"> | string
    administrativeUnitId?: StringFilter<"AddressDistricts"> | string
    province?: XOR<AddressProvincesScalarRelationFilter, AddressProvincesWhereInput>
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    wards?: AddressWardsListRelationFilter
    addresses?: AddressListRelationFilter
  }

  export type AddressDistrictsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    provinceCode?: SortOrder
    administrativeUnitId?: SortOrder
    province?: AddressProvincesOrderByWithRelationInput
    administrativeUnit?: AddressAdministrativeUnitsOrderByWithRelationInput
    wards?: AddressWardsOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    _relevance?: AddressDistrictsOrderByRelevanceInput
  }

  export type AddressDistrictsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressDistrictsWhereInput | AddressDistrictsWhereInput[]
    OR?: AddressDistrictsWhereInput[]
    NOT?: AddressDistrictsWhereInput | AddressDistrictsWhereInput[]
    name?: StringFilter<"AddressDistricts"> | string
    nameEn?: StringFilter<"AddressDistricts"> | string
    fullName?: StringFilter<"AddressDistricts"> | string
    fullNameEn?: StringFilter<"AddressDistricts"> | string
    provinceCode?: StringFilter<"AddressDistricts"> | string
    administrativeUnitId?: StringFilter<"AddressDistricts"> | string
    province?: XOR<AddressProvincesScalarRelationFilter, AddressProvincesWhereInput>
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    wards?: AddressWardsListRelationFilter
    addresses?: AddressListRelationFilter
  }, "id">

  export type AddressDistrictsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    provinceCode?: SortOrder
    administrativeUnitId?: SortOrder
    _count?: AddressDistrictsCountOrderByAggregateInput
    _max?: AddressDistrictsMaxOrderByAggregateInput
    _min?: AddressDistrictsMinOrderByAggregateInput
  }

  export type AddressDistrictsScalarWhereWithAggregatesInput = {
    AND?: AddressDistrictsScalarWhereWithAggregatesInput | AddressDistrictsScalarWhereWithAggregatesInput[]
    OR?: AddressDistrictsScalarWhereWithAggregatesInput[]
    NOT?: AddressDistrictsScalarWhereWithAggregatesInput | AddressDistrictsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressDistricts"> | string
    name?: StringWithAggregatesFilter<"AddressDistricts"> | string
    nameEn?: StringWithAggregatesFilter<"AddressDistricts"> | string
    fullName?: StringWithAggregatesFilter<"AddressDistricts"> | string
    fullNameEn?: StringWithAggregatesFilter<"AddressDistricts"> | string
    provinceCode?: StringWithAggregatesFilter<"AddressDistricts"> | string
    administrativeUnitId?: StringWithAggregatesFilter<"AddressDistricts"> | string
  }

  export type AddressWardsWhereInput = {
    AND?: AddressWardsWhereInput | AddressWardsWhereInput[]
    OR?: AddressWardsWhereInput[]
    NOT?: AddressWardsWhereInput | AddressWardsWhereInput[]
    id?: StringFilter<"AddressWards"> | string
    name?: StringFilter<"AddressWards"> | string
    nameEn?: StringFilter<"AddressWards"> | string
    fullName?: StringFilter<"AddressWards"> | string
    fullNameEn?: StringFilter<"AddressWards"> | string
    districtId?: StringFilter<"AddressWards"> | string
    administrativeUnitId?: StringFilter<"AddressWards"> | string
    district?: XOR<AddressDistrictsScalarRelationFilter, AddressDistrictsWhereInput>
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    addresses?: AddressListRelationFilter
  }

  export type AddressWardsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    districtId?: SortOrder
    administrativeUnitId?: SortOrder
    district?: AddressDistrictsOrderByWithRelationInput
    administrativeUnit?: AddressAdministrativeUnitsOrderByWithRelationInput
    addresses?: AddressOrderByRelationAggregateInput
    _relevance?: AddressWardsOrderByRelevanceInput
  }

  export type AddressWardsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWardsWhereInput | AddressWardsWhereInput[]
    OR?: AddressWardsWhereInput[]
    NOT?: AddressWardsWhereInput | AddressWardsWhereInput[]
    name?: StringFilter<"AddressWards"> | string
    nameEn?: StringFilter<"AddressWards"> | string
    fullName?: StringFilter<"AddressWards"> | string
    fullNameEn?: StringFilter<"AddressWards"> | string
    districtId?: StringFilter<"AddressWards"> | string
    administrativeUnitId?: StringFilter<"AddressWards"> | string
    district?: XOR<AddressDistrictsScalarRelationFilter, AddressDistrictsWhereInput>
    administrativeUnit?: XOR<AddressAdministrativeUnitsScalarRelationFilter, AddressAdministrativeUnitsWhereInput>
    addresses?: AddressListRelationFilter
  }, "id">

  export type AddressWardsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    districtId?: SortOrder
    administrativeUnitId?: SortOrder
    _count?: AddressWardsCountOrderByAggregateInput
    _max?: AddressWardsMaxOrderByAggregateInput
    _min?: AddressWardsMinOrderByAggregateInput
  }

  export type AddressWardsScalarWhereWithAggregatesInput = {
    AND?: AddressWardsScalarWhereWithAggregatesInput | AddressWardsScalarWhereWithAggregatesInput[]
    OR?: AddressWardsScalarWhereWithAggregatesInput[]
    NOT?: AddressWardsScalarWhereWithAggregatesInput | AddressWardsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressWards"> | string
    name?: StringWithAggregatesFilter<"AddressWards"> | string
    nameEn?: StringWithAggregatesFilter<"AddressWards"> | string
    fullName?: StringWithAggregatesFilter<"AddressWards"> | string
    fullNameEn?: StringWithAggregatesFilter<"AddressWards"> | string
    districtId?: StringWithAggregatesFilter<"AddressWards"> | string
    administrativeUnitId?: StringWithAggregatesFilter<"AddressWards"> | string
  }

  export type AddressAdministrativeUnitsWhereInput = {
    AND?: AddressAdministrativeUnitsWhereInput | AddressAdministrativeUnitsWhereInput[]
    OR?: AddressAdministrativeUnitsWhereInput[]
    NOT?: AddressAdministrativeUnitsWhereInput | AddressAdministrativeUnitsWhereInput[]
    id?: StringFilter<"AddressAdministrativeUnits"> | string
    name?: StringFilter<"AddressAdministrativeUnits"> | string
    nameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    fullName?: StringFilter<"AddressAdministrativeUnits"> | string
    fullNameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    codeName?: StringFilter<"AddressAdministrativeUnits"> | string
    codeNameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    provinces?: AddressProvincesListRelationFilter
    districts?: AddressDistrictsListRelationFilter
    wards?: AddressWardsListRelationFilter
  }

  export type AddressAdministrativeUnitsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
    provinces?: AddressProvincesOrderByRelationAggregateInput
    districts?: AddressDistrictsOrderByRelationAggregateInput
    wards?: AddressWardsOrderByRelationAggregateInput
    _relevance?: AddressAdministrativeUnitsOrderByRelevanceInput
  }

  export type AddressAdministrativeUnitsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codeName?: string
    AND?: AddressAdministrativeUnitsWhereInput | AddressAdministrativeUnitsWhereInput[]
    OR?: AddressAdministrativeUnitsWhereInput[]
    NOT?: AddressAdministrativeUnitsWhereInput | AddressAdministrativeUnitsWhereInput[]
    name?: StringFilter<"AddressAdministrativeUnits"> | string
    nameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    fullName?: StringFilter<"AddressAdministrativeUnits"> | string
    fullNameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    codeNameEn?: StringFilter<"AddressAdministrativeUnits"> | string
    provinces?: AddressProvincesListRelationFilter
    districts?: AddressDistrictsListRelationFilter
    wards?: AddressWardsListRelationFilter
  }, "id" | "codeName">

  export type AddressAdministrativeUnitsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
    _count?: AddressAdministrativeUnitsCountOrderByAggregateInput
    _max?: AddressAdministrativeUnitsMaxOrderByAggregateInput
    _min?: AddressAdministrativeUnitsMinOrderByAggregateInput
  }

  export type AddressAdministrativeUnitsScalarWhereWithAggregatesInput = {
    AND?: AddressAdministrativeUnitsScalarWhereWithAggregatesInput | AddressAdministrativeUnitsScalarWhereWithAggregatesInput[]
    OR?: AddressAdministrativeUnitsScalarWhereWithAggregatesInput[]
    NOT?: AddressAdministrativeUnitsScalarWhereWithAggregatesInput | AddressAdministrativeUnitsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    name?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    nameEn?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    fullName?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    fullNameEn?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    codeName?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
    codeNameEn?: StringWithAggregatesFilter<"AddressAdministrativeUnits"> | string
  }

  export type AddressAdministrativeRegionsWhereInput = {
    AND?: AddressAdministrativeRegionsWhereInput | AddressAdministrativeRegionsWhereInput[]
    OR?: AddressAdministrativeRegionsWhereInput[]
    NOT?: AddressAdministrativeRegionsWhereInput | AddressAdministrativeRegionsWhereInput[]
    id?: StringFilter<"AddressAdministrativeRegions"> | string
    name?: StringFilter<"AddressAdministrativeRegions"> | string
    nameEn?: StringFilter<"AddressAdministrativeRegions"> | string
    codeName?: StringFilter<"AddressAdministrativeRegions"> | string
    codeNameEn?: StringFilter<"AddressAdministrativeRegions"> | string
    provinces?: AddressProvincesListRelationFilter
  }

  export type AddressAdministrativeRegionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
    provinces?: AddressProvincesOrderByRelationAggregateInput
    _relevance?: AddressAdministrativeRegionsOrderByRelevanceInput
  }

  export type AddressAdministrativeRegionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    codeName?: string
    AND?: AddressAdministrativeRegionsWhereInput | AddressAdministrativeRegionsWhereInput[]
    OR?: AddressAdministrativeRegionsWhereInput[]
    NOT?: AddressAdministrativeRegionsWhereInput | AddressAdministrativeRegionsWhereInput[]
    name?: StringFilter<"AddressAdministrativeRegions"> | string
    nameEn?: StringFilter<"AddressAdministrativeRegions"> | string
    codeNameEn?: StringFilter<"AddressAdministrativeRegions"> | string
    provinces?: AddressProvincesListRelationFilter
  }, "id" | "codeName">

  export type AddressAdministrativeRegionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
    _count?: AddressAdministrativeRegionsCountOrderByAggregateInput
    _max?: AddressAdministrativeRegionsMaxOrderByAggregateInput
    _min?: AddressAdministrativeRegionsMinOrderByAggregateInput
  }

  export type AddressAdministrativeRegionsScalarWhereWithAggregatesInput = {
    AND?: AddressAdministrativeRegionsScalarWhereWithAggregatesInput | AddressAdministrativeRegionsScalarWhereWithAggregatesInput[]
    OR?: AddressAdministrativeRegionsScalarWhereWithAggregatesInput[]
    NOT?: AddressAdministrativeRegionsScalarWhereWithAggregatesInput | AddressAdministrativeRegionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressAdministrativeRegions"> | string
    name?: StringWithAggregatesFilter<"AddressAdministrativeRegions"> | string
    nameEn?: StringWithAggregatesFilter<"AddressAdministrativeRegions"> | string
    codeName?: StringWithAggregatesFilter<"AddressAdministrativeRegions"> | string
    codeNameEn?: StringWithAggregatesFilter<"AddressAdministrativeRegions"> | string
  }

  export type OTPWhereInput = {
    AND?: OTPWhereInput | OTPWhereInput[]
    OR?: OTPWhereInput[]
    NOT?: OTPWhereInput | OTPWhereInput[]
    id?: StringFilter<"OTP"> | string
    email?: StringFilter<"OTP"> | string
    type?: StringFilter<"OTP"> | string
    otp?: StringFilter<"OTP"> | string
    createdAt?: DateTimeFilter<"OTP"> | Date | string
    lastAttempt?: DateTimeFilter<"OTP"> | Date | string
    attemptCount?: IntFilter<"OTP"> | number
    isUsed?: BoolFilter<"OTP"> | boolean
    failedAttempts?: IntFilter<"OTP"> | number
  }

  export type OTPOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
    attemptCount?: SortOrder
    isUsed?: SortOrder
    failedAttempts?: SortOrder
    _relevance?: OTPOrderByRelevanceInput
  }

  export type OTPWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OTPWhereInput | OTPWhereInput[]
    OR?: OTPWhereInput[]
    NOT?: OTPWhereInput | OTPWhereInput[]
    email?: StringFilter<"OTP"> | string
    type?: StringFilter<"OTP"> | string
    otp?: StringFilter<"OTP"> | string
    createdAt?: DateTimeFilter<"OTP"> | Date | string
    lastAttempt?: DateTimeFilter<"OTP"> | Date | string
    attemptCount?: IntFilter<"OTP"> | number
    isUsed?: BoolFilter<"OTP"> | boolean
    failedAttempts?: IntFilter<"OTP"> | number
  }, "id">

  export type OTPOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
    attemptCount?: SortOrder
    isUsed?: SortOrder
    failedAttempts?: SortOrder
    _count?: OTPCountOrderByAggregateInput
    _avg?: OTPAvgOrderByAggregateInput
    _max?: OTPMaxOrderByAggregateInput
    _min?: OTPMinOrderByAggregateInput
    _sum?: OTPSumOrderByAggregateInput
  }

  export type OTPScalarWhereWithAggregatesInput = {
    AND?: OTPScalarWhereWithAggregatesInput | OTPScalarWhereWithAggregatesInput[]
    OR?: OTPScalarWhereWithAggregatesInput[]
    NOT?: OTPScalarWhereWithAggregatesInput | OTPScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OTP"> | string
    email?: StringWithAggregatesFilter<"OTP"> | string
    type?: StringWithAggregatesFilter<"OTP"> | string
    otp?: StringWithAggregatesFilter<"OTP"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OTP"> | Date | string
    lastAttempt?: DateTimeWithAggregatesFilter<"OTP"> | Date | string
    attemptCount?: IntWithAggregatesFilter<"OTP"> | number
    isUsed?: BoolWithAggregatesFilter<"OTP"> | boolean
    failedAttempts?: IntWithAggregatesFilter<"OTP"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    isVerified?: boolean
    role?: string
    lastLogin?: Date | string | null
    permissions?: string
    phoneNumber?: string | null
    gender?: string | null
    dateOfBirth?: Date | string | null
    profilePictureUrl?: string | null
    address?: AddressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    isVerified?: boolean
    role?: string
    lastLogin?: Date | string | null
    permissions?: string
    phoneNumber?: string | null
    gender?: string | null
    dateOfBirth?: Date | string | null
    profilePictureUrl?: string | null
    address?: AddressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: AddressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: AddressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    isVerified?: boolean
    role?: string
    lastLogin?: Date | string | null
    permissions?: string
    phoneNumber?: string | null
    gender?: string | null
    dateOfBirth?: Date | string | null
    profilePictureUrl?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressCreateInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressInput
    vnProvince?: AddressProvincesCreateNestedOneWithoutAddressesInput
    vnDistrict?: AddressDistrictsCreateNestedOneWithoutAddressesInput
    vnWard?: AddressWardsCreateNestedOneWithoutAddressesInput
    country: CountryCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressNestedInput
    vnProvince?: AddressProvincesUpdateOneWithoutAddressesNestedInput
    vnDistrict?: AddressDistrictsUpdateOneWithoutAddressesNestedInput
    vnWard?: AddressWardsUpdateOneWithoutAddressesNestedInput
    country?: CountryUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountryCreateInput = {
    id?: string
    name: string
    codeName: string
    provinces?: AddressProvincesCreateNestedManyWithoutCountryInput
    addresses?: AddressCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateInput = {
    id?: string
    name: string
    codeName: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutCountryInput
    addresses?: AddressUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutCountryNestedInput
    addresses?: AddressUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutCountryNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type CountryCreateManyInput = {
    id?: string
    name: string
    codeName: string
  }

  export type CountryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
  }

  export type CountryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
  }

  export type AddressProvincesCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput
    administrativeRegion: AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput
    districts?: AddressDistrictsCreateNestedManyWithoutProvinceInput
    country: CountryCreateNestedOneWithoutProvincesInput
    addresses?: AddressCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUncheckedCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    countryId: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput
    administrativeRegion?: AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput
    districts?: AddressDistrictsUpdateManyWithoutProvinceNestedInput
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
    addresses?: AddressUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesCreateManyInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    countryId: string
  }

  export type AddressProvincesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressProvincesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressDistrictsCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    province: AddressProvincesCreateNestedOneWithoutDistrictsInput
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutDistrictsInput
    wards?: AddressWardsCreateNestedManyWithoutDistrictInput
    addresses?: AddressCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsUncheckedCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    administrativeUnitId: string
    wards?: AddressWardsUncheckedCreateNestedManyWithoutDistrictInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    province?: AddressProvincesUpdateOneRequiredWithoutDistrictsNestedInput
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutDistrictsNestedInput
    wards?: AddressWardsUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    wards?: AddressWardsUncheckedUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsCreateManyInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    administrativeUnitId: string
  }

  export type AddressDistrictsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressDistrictsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressWardsCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    district: AddressDistrictsCreateNestedOneWithoutWardsInput
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutWardsInput
    addresses?: AddressCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsUncheckedCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
    administrativeUnitId: string
    addresses?: AddressUncheckedCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    district?: AddressDistrictsUpdateOneRequiredWithoutWardsNestedInput
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutWardsNestedInput
    addresses?: AddressUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsCreateManyInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
    administrativeUnitId: string
  }

  export type AddressWardsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressWardsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressAdministrativeUnitsCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesCreateNestedManyWithoutAdministrativeUnitInput
    districts?: AddressDistrictsCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsUncheckedCreateInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeUnitInput
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutAdministrativeUnitNestedInput
    districts?: AddressDistrictsUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeUnitsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
    districts?: AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeUnitsCreateManyInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
  }

  export type AddressAdministrativeUnitsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressAdministrativeUnitsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressAdministrativeRegionsCreateInput = {
    id?: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesCreateNestedManyWithoutAdministrativeRegionInput
  }

  export type AddressAdministrativeRegionsUncheckedCreateInput = {
    id?: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeRegionInput
  }

  export type AddressAdministrativeRegionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutAdministrativeRegionNestedInput
  }

  export type AddressAdministrativeRegionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutAdministrativeRegionNestedInput
  }

  export type AddressAdministrativeRegionsCreateManyInput = {
    id?: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
  }

  export type AddressAdministrativeRegionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressAdministrativeRegionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type OTPCreateInput = {
    id?: string
    email: string
    type: string
    otp: string
    createdAt?: Date | string
    lastAttempt?: Date | string
    attemptCount?: number
    isUsed?: boolean
    failedAttempts?: number
  }

  export type OTPUncheckedCreateInput = {
    id?: string
    email: string
    type: string
    otp: string
    createdAt?: Date | string
    lastAttempt?: Date | string
    attemptCount?: number
    isUsed?: boolean
    failedAttempts?: number
  }

  export type OTPUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    failedAttempts?: IntFieldUpdateOperationsInput | number
  }

  export type OTPUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    failedAttempts?: IntFieldUpdateOperationsInput | number
  }

  export type OTPCreateManyInput = {
    id?: string
    email: string
    type: string
    otp: string
    createdAt?: Date | string
    lastAttempt?: Date | string
    attemptCount?: number
    isUsed?: boolean
    failedAttempts?: number
  }

  export type OTPUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    failedAttempts?: IntFieldUpdateOperationsInput | number
  }

  export type OTPUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastAttempt?: DateTimeFieldUpdateOperationsInput | Date | string
    attemptCount?: IntFieldUpdateOperationsInput | number
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    failedAttempts?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    permissions?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profilePictureUrl?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    permissions?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profilePictureUrl?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    permissions?: SortOrder
    phoneNumber?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    profilePictureUrl?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AddressProvincesNullableScalarRelationFilter = {
    is?: AddressProvincesWhereInput | null
    isNot?: AddressProvincesWhereInput | null
  }

  export type AddressDistrictsNullableScalarRelationFilter = {
    is?: AddressDistrictsWhereInput | null
    isNot?: AddressDistrictsWhereInput | null
  }

  export type AddressWardsNullableScalarRelationFilter = {
    is?: AddressWardsWhereInput | null
    isNot?: AddressWardsWhereInput | null
  }

  export type CountryScalarRelationFilter = {
    is?: CountryWhereInput
    isNot?: CountryWhereInput
  }

  export type AddressOrderByRelevanceInput = {
    fields: AddressOrderByRelevanceFieldEnum | AddressOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    vnProvinceId?: SortOrder
    vnDistrictId?: SortOrder
    vnWardId?: SortOrder
    zip?: SortOrder
    countryId?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    vnProvinceId?: SortOrder
    vnDistrictId?: SortOrder
    vnWardId?: SortOrder
    zip?: SortOrder
    countryId?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    vnProvinceId?: SortOrder
    vnDistrictId?: SortOrder
    vnWardId?: SortOrder
    zip?: SortOrder
    countryId?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressProvincesListRelationFilter = {
    every?: AddressProvincesWhereInput
    some?: AddressProvincesWhereInput
    none?: AddressProvincesWhereInput
  }

  export type AddressProvincesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountryOrderByRelevanceInput = {
    fields: CountryOrderByRelevanceFieldEnum | CountryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CountryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    codeName?: SortOrder
  }

  export type CountryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    codeName?: SortOrder
  }

  export type CountryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    codeName?: SortOrder
  }

  export type AddressAdministrativeUnitsScalarRelationFilter = {
    is?: AddressAdministrativeUnitsWhereInput
    isNot?: AddressAdministrativeUnitsWhereInput
  }

  export type AddressAdministrativeRegionsScalarRelationFilter = {
    is?: AddressAdministrativeRegionsWhereInput
    isNot?: AddressAdministrativeRegionsWhereInput
  }

  export type AddressDistrictsListRelationFilter = {
    every?: AddressDistrictsWhereInput
    some?: AddressDistrictsWhereInput
    none?: AddressDistrictsWhereInput
  }

  export type AddressDistrictsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressProvincesOrderByRelevanceInput = {
    fields: AddressProvincesOrderByRelevanceFieldEnum | AddressProvincesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressProvincesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    administrativeUnitId?: SortOrder
    administrativeRegionId?: SortOrder
    countryId?: SortOrder
  }

  export type AddressProvincesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    administrativeUnitId?: SortOrder
    administrativeRegionId?: SortOrder
    countryId?: SortOrder
  }

  export type AddressProvincesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    administrativeUnitId?: SortOrder
    administrativeRegionId?: SortOrder
    countryId?: SortOrder
  }

  export type AddressProvincesScalarRelationFilter = {
    is?: AddressProvincesWhereInput
    isNot?: AddressProvincesWhereInput
  }

  export type AddressWardsListRelationFilter = {
    every?: AddressWardsWhereInput
    some?: AddressWardsWhereInput
    none?: AddressWardsWhereInput
  }

  export type AddressWardsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressDistrictsOrderByRelevanceInput = {
    fields: AddressDistrictsOrderByRelevanceFieldEnum | AddressDistrictsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressDistrictsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    provinceCode?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressDistrictsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    provinceCode?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressDistrictsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    provinceCode?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressDistrictsScalarRelationFilter = {
    is?: AddressDistrictsWhereInput
    isNot?: AddressDistrictsWhereInput
  }

  export type AddressWardsOrderByRelevanceInput = {
    fields: AddressWardsOrderByRelevanceFieldEnum | AddressWardsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressWardsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    districtId?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressWardsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    districtId?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressWardsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    districtId?: SortOrder
    administrativeUnitId?: SortOrder
  }

  export type AddressAdministrativeUnitsOrderByRelevanceInput = {
    fields: AddressAdministrativeUnitsOrderByRelevanceFieldEnum | AddressAdministrativeUnitsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressAdministrativeUnitsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type AddressAdministrativeUnitsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type AddressAdministrativeUnitsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    fullName?: SortOrder
    fullNameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type AddressAdministrativeRegionsOrderByRelevanceInput = {
    fields: AddressAdministrativeRegionsOrderByRelevanceFieldEnum | AddressAdministrativeRegionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AddressAdministrativeRegionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type AddressAdministrativeRegionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type AddressAdministrativeRegionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    nameEn?: SortOrder
    codeName?: SortOrder
    codeNameEn?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OTPOrderByRelevanceInput = {
    fields: OTPOrderByRelevanceFieldEnum | OTPOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OTPCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
    attemptCount?: SortOrder
    isUsed?: SortOrder
    failedAttempts?: SortOrder
  }

  export type OTPAvgOrderByAggregateInput = {
    attemptCount?: SortOrder
    failedAttempts?: SortOrder
  }

  export type OTPMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
    attemptCount?: SortOrder
    isUsed?: SortOrder
    failedAttempts?: SortOrder
  }

  export type OTPMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    otp?: SortOrder
    createdAt?: SortOrder
    lastAttempt?: SortOrder
    attemptCount?: SortOrder
    isUsed?: SortOrder
    failedAttempts?: SortOrder
  }

  export type OTPSumOrderByAggregateInput = {
    attemptCount?: SortOrder
    failedAttempts?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AddressCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAddressInput = {
    create?: XOR<UserCreateWithoutAddressInput, UserUncheckedCreateWithoutAddressInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressInput
    connect?: UserWhereUniqueInput
  }

  export type AddressProvincesCreateNestedOneWithoutAddressesInput = {
    create?: XOR<AddressProvincesCreateWithoutAddressesInput, AddressProvincesUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAddressesInput
    connect?: AddressProvincesWhereUniqueInput
  }

  export type AddressDistrictsCreateNestedOneWithoutAddressesInput = {
    create?: XOR<AddressDistrictsCreateWithoutAddressesInput, AddressDistrictsUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAddressesInput
    connect?: AddressDistrictsWhereUniqueInput
  }

  export type AddressWardsCreateNestedOneWithoutAddressesInput = {
    create?: XOR<AddressWardsCreateWithoutAddressesInput, AddressWardsUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAddressesInput
    connect?: AddressWardsWhereUniqueInput
  }

  export type CountryCreateNestedOneWithoutAddressesInput = {
    create?: XOR<CountryCreateWithoutAddressesInput, CountryUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutAddressesInput
    connect?: CountryWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAddressNestedInput = {
    create?: XOR<UserCreateWithoutAddressInput, UserUncheckedCreateWithoutAddressInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressInput
    upsert?: UserUpsertWithoutAddressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddressInput, UserUpdateWithoutAddressInput>, UserUncheckedUpdateWithoutAddressInput>
  }

  export type AddressProvincesUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutAddressesInput, AddressProvincesUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAddressesInput
    upsert?: AddressProvincesUpsertWithoutAddressesInput
    disconnect?: AddressProvincesWhereInput | boolean
    delete?: AddressProvincesWhereInput | boolean
    connect?: AddressProvincesWhereUniqueInput
    update?: XOR<XOR<AddressProvincesUpdateToOneWithWhereWithoutAddressesInput, AddressProvincesUpdateWithoutAddressesInput>, AddressProvincesUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressDistrictsUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutAddressesInput, AddressDistrictsUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAddressesInput
    upsert?: AddressDistrictsUpsertWithoutAddressesInput
    disconnect?: AddressDistrictsWhereInput | boolean
    delete?: AddressDistrictsWhereInput | boolean
    connect?: AddressDistrictsWhereUniqueInput
    update?: XOR<XOR<AddressDistrictsUpdateToOneWithWhereWithoutAddressesInput, AddressDistrictsUpdateWithoutAddressesInput>, AddressDistrictsUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressWardsUpdateOneWithoutAddressesNestedInput = {
    create?: XOR<AddressWardsCreateWithoutAddressesInput, AddressWardsUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAddressesInput
    upsert?: AddressWardsUpsertWithoutAddressesInput
    disconnect?: AddressWardsWhereInput | boolean
    delete?: AddressWardsWhereInput | boolean
    connect?: AddressWardsWhereUniqueInput
    update?: XOR<XOR<AddressWardsUpdateToOneWithWhereWithoutAddressesInput, AddressWardsUpdateWithoutAddressesInput>, AddressWardsUncheckedUpdateWithoutAddressesInput>
  }

  export type CountryUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<CountryCreateWithoutAddressesInput, CountryUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutAddressesInput
    upsert?: CountryUpsertWithoutAddressesInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutAddressesInput, CountryUpdateWithoutAddressesInput>, CountryUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressProvincesCreateNestedManyWithoutCountryInput = {
    create?: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput> | AddressProvincesCreateWithoutCountryInput[] | AddressProvincesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutCountryInput | AddressProvincesCreateOrConnectWithoutCountryInput[]
    createMany?: AddressProvincesCreateManyCountryInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutCountryInput = {
    create?: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput> | AddressCreateWithoutCountryInput[] | AddressUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCountryInput | AddressCreateOrConnectWithoutCountryInput[]
    createMany?: AddressCreateManyCountryInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressProvincesUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput> | AddressProvincesCreateWithoutCountryInput[] | AddressProvincesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutCountryInput | AddressProvincesCreateOrConnectWithoutCountryInput[]
    createMany?: AddressProvincesCreateManyCountryInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput> | AddressCreateWithoutCountryInput[] | AddressUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCountryInput | AddressCreateOrConnectWithoutCountryInput[]
    createMany?: AddressCreateManyCountryInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressProvincesUpdateManyWithoutCountryNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput> | AddressProvincesCreateWithoutCountryInput[] | AddressProvincesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutCountryInput | AddressProvincesCreateOrConnectWithoutCountryInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutCountryInput | AddressProvincesUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: AddressProvincesCreateManyCountryInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutCountryInput | AddressProvincesUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutCountryInput | AddressProvincesUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutCountryNestedInput = {
    create?: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput> | AddressCreateWithoutCountryInput[] | AddressUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCountryInput | AddressCreateOrConnectWithoutCountryInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCountryInput | AddressUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: AddressCreateManyCountryInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCountryInput | AddressUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCountryInput | AddressUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressProvincesUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput> | AddressProvincesCreateWithoutCountryInput[] | AddressProvincesUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutCountryInput | AddressProvincesCreateOrConnectWithoutCountryInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutCountryInput | AddressProvincesUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: AddressProvincesCreateManyCountryInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutCountryInput | AddressProvincesUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutCountryInput | AddressProvincesUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput> | AddressCreateWithoutCountryInput[] | AddressUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutCountryInput | AddressCreateOrConnectWithoutCountryInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutCountryInput | AddressUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: AddressCreateManyCountryInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutCountryInput | AddressUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutCountryInput | AddressUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutProvincesInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
  }

  export type AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput = {
    create?: XOR<AddressAdministrativeRegionsCreateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: AddressAdministrativeRegionsCreateOrConnectWithoutProvincesInput
    connect?: AddressAdministrativeRegionsWhereUniqueInput
  }

  export type AddressDistrictsCreateNestedManyWithoutProvinceInput = {
    create?: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput> | AddressDistrictsCreateWithoutProvinceInput[] | AddressDistrictsUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutProvinceInput | AddressDistrictsCreateOrConnectWithoutProvinceInput[]
    createMany?: AddressDistrictsCreateManyProvinceInputEnvelope
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
  }

  export type CountryCreateNestedOneWithoutProvincesInput = {
    create?: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutProvincesInput
    connect?: CountryWhereUniqueInput
  }

  export type AddressCreateNestedManyWithoutVnProvinceInput = {
    create?: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput> | AddressCreateWithoutVnProvinceInput[] | AddressUncheckedCreateWithoutVnProvinceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnProvinceInput | AddressCreateOrConnectWithoutVnProvinceInput[]
    createMany?: AddressCreateManyVnProvinceInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput = {
    create?: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput> | AddressDistrictsCreateWithoutProvinceInput[] | AddressDistrictsUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutProvinceInput | AddressDistrictsCreateOrConnectWithoutProvinceInput[]
    createMany?: AddressDistrictsCreateManyProvinceInputEnvelope
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutVnProvinceInput = {
    create?: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput> | AddressCreateWithoutVnProvinceInput[] | AddressUncheckedCreateWithoutVnProvinceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnProvinceInput | AddressCreateOrConnectWithoutVnProvinceInput[]
    createMany?: AddressCreateManyVnProvinceInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutProvincesInput
    upsert?: AddressAdministrativeUnitsUpsertWithoutProvincesInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
    update?: XOR<XOR<AddressAdministrativeUnitsUpdateToOneWithWhereWithoutProvincesInput, AddressAdministrativeUnitsUpdateWithoutProvincesInput>, AddressAdministrativeUnitsUncheckedUpdateWithoutProvincesInput>
  }

  export type AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput = {
    create?: XOR<AddressAdministrativeRegionsCreateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: AddressAdministrativeRegionsCreateOrConnectWithoutProvincesInput
    upsert?: AddressAdministrativeRegionsUpsertWithoutProvincesInput
    connect?: AddressAdministrativeRegionsWhereUniqueInput
    update?: XOR<XOR<AddressAdministrativeRegionsUpdateToOneWithWhereWithoutProvincesInput, AddressAdministrativeRegionsUpdateWithoutProvincesInput>, AddressAdministrativeRegionsUncheckedUpdateWithoutProvincesInput>
  }

  export type AddressDistrictsUpdateManyWithoutProvinceNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput> | AddressDistrictsCreateWithoutProvinceInput[] | AddressDistrictsUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutProvinceInput | AddressDistrictsCreateOrConnectWithoutProvinceInput[]
    upsert?: AddressDistrictsUpsertWithWhereUniqueWithoutProvinceInput | AddressDistrictsUpsertWithWhereUniqueWithoutProvinceInput[]
    createMany?: AddressDistrictsCreateManyProvinceInputEnvelope
    set?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    disconnect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    delete?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    update?: AddressDistrictsUpdateWithWhereUniqueWithoutProvinceInput | AddressDistrictsUpdateWithWhereUniqueWithoutProvinceInput[]
    updateMany?: AddressDistrictsUpdateManyWithWhereWithoutProvinceInput | AddressDistrictsUpdateManyWithWhereWithoutProvinceInput[]
    deleteMany?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
  }

  export type CountryUpdateOneRequiredWithoutProvincesNestedInput = {
    create?: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    connectOrCreate?: CountryCreateOrConnectWithoutProvincesInput
    upsert?: CountryUpsertWithoutProvincesInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutProvincesInput, CountryUpdateWithoutProvincesInput>, CountryUncheckedUpdateWithoutProvincesInput>
  }

  export type AddressUpdateManyWithoutVnProvinceNestedInput = {
    create?: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput> | AddressCreateWithoutVnProvinceInput[] | AddressUncheckedCreateWithoutVnProvinceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnProvinceInput | AddressCreateOrConnectWithoutVnProvinceInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnProvinceInput | AddressUpsertWithWhereUniqueWithoutVnProvinceInput[]
    createMany?: AddressCreateManyVnProvinceInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnProvinceInput | AddressUpdateWithWhereUniqueWithoutVnProvinceInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnProvinceInput | AddressUpdateManyWithWhereWithoutVnProvinceInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput> | AddressDistrictsCreateWithoutProvinceInput[] | AddressDistrictsUncheckedCreateWithoutProvinceInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutProvinceInput | AddressDistrictsCreateOrConnectWithoutProvinceInput[]
    upsert?: AddressDistrictsUpsertWithWhereUniqueWithoutProvinceInput | AddressDistrictsUpsertWithWhereUniqueWithoutProvinceInput[]
    createMany?: AddressDistrictsCreateManyProvinceInputEnvelope
    set?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    disconnect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    delete?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    update?: AddressDistrictsUpdateWithWhereUniqueWithoutProvinceInput | AddressDistrictsUpdateWithWhereUniqueWithoutProvinceInput[]
    updateMany?: AddressDistrictsUpdateManyWithWhereWithoutProvinceInput | AddressDistrictsUpdateManyWithWhereWithoutProvinceInput[]
    deleteMany?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutVnProvinceNestedInput = {
    create?: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput> | AddressCreateWithoutVnProvinceInput[] | AddressUncheckedCreateWithoutVnProvinceInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnProvinceInput | AddressCreateOrConnectWithoutVnProvinceInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnProvinceInput | AddressUpsertWithWhereUniqueWithoutVnProvinceInput[]
    createMany?: AddressCreateManyVnProvinceInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnProvinceInput | AddressUpdateWithWhereUniqueWithoutVnProvinceInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnProvinceInput | AddressUpdateManyWithWhereWithoutVnProvinceInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressProvincesCreateNestedOneWithoutDistrictsInput = {
    create?: XOR<AddressProvincesCreateWithoutDistrictsInput, AddressProvincesUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutDistrictsInput
    connect?: AddressProvincesWhereUniqueInput
  }

  export type AddressAdministrativeUnitsCreateNestedOneWithoutDistrictsInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutDistrictsInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
  }

  export type AddressWardsCreateNestedManyWithoutDistrictInput = {
    create?: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput> | AddressWardsCreateWithoutDistrictInput[] | AddressWardsUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutDistrictInput | AddressWardsCreateOrConnectWithoutDistrictInput[]
    createMany?: AddressWardsCreateManyDistrictInputEnvelope
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutVnDistrictInput = {
    create?: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput> | AddressCreateWithoutVnDistrictInput[] | AddressUncheckedCreateWithoutVnDistrictInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnDistrictInput | AddressCreateOrConnectWithoutVnDistrictInput[]
    createMany?: AddressCreateManyVnDistrictInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressWardsUncheckedCreateNestedManyWithoutDistrictInput = {
    create?: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput> | AddressWardsCreateWithoutDistrictInput[] | AddressWardsUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutDistrictInput | AddressWardsCreateOrConnectWithoutDistrictInput[]
    createMany?: AddressWardsCreateManyDistrictInputEnvelope
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutVnDistrictInput = {
    create?: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput> | AddressCreateWithoutVnDistrictInput[] | AddressUncheckedCreateWithoutVnDistrictInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnDistrictInput | AddressCreateOrConnectWithoutVnDistrictInput[]
    createMany?: AddressCreateManyVnDistrictInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressProvincesUpdateOneRequiredWithoutDistrictsNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutDistrictsInput, AddressProvincesUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutDistrictsInput
    upsert?: AddressProvincesUpsertWithoutDistrictsInput
    connect?: AddressProvincesWhereUniqueInput
    update?: XOR<XOR<AddressProvincesUpdateToOneWithWhereWithoutDistrictsInput, AddressProvincesUpdateWithoutDistrictsInput>, AddressProvincesUncheckedUpdateWithoutDistrictsInput>
  }

  export type AddressAdministrativeUnitsUpdateOneRequiredWithoutDistrictsNestedInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedCreateWithoutDistrictsInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutDistrictsInput
    upsert?: AddressAdministrativeUnitsUpsertWithoutDistrictsInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
    update?: XOR<XOR<AddressAdministrativeUnitsUpdateToOneWithWhereWithoutDistrictsInput, AddressAdministrativeUnitsUpdateWithoutDistrictsInput>, AddressAdministrativeUnitsUncheckedUpdateWithoutDistrictsInput>
  }

  export type AddressWardsUpdateManyWithoutDistrictNestedInput = {
    create?: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput> | AddressWardsCreateWithoutDistrictInput[] | AddressWardsUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutDistrictInput | AddressWardsCreateOrConnectWithoutDistrictInput[]
    upsert?: AddressWardsUpsertWithWhereUniqueWithoutDistrictInput | AddressWardsUpsertWithWhereUniqueWithoutDistrictInput[]
    createMany?: AddressWardsCreateManyDistrictInputEnvelope
    set?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    disconnect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    delete?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    update?: AddressWardsUpdateWithWhereUniqueWithoutDistrictInput | AddressWardsUpdateWithWhereUniqueWithoutDistrictInput[]
    updateMany?: AddressWardsUpdateManyWithWhereWithoutDistrictInput | AddressWardsUpdateManyWithWhereWithoutDistrictInput[]
    deleteMany?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutVnDistrictNestedInput = {
    create?: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput> | AddressCreateWithoutVnDistrictInput[] | AddressUncheckedCreateWithoutVnDistrictInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnDistrictInput | AddressCreateOrConnectWithoutVnDistrictInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnDistrictInput | AddressUpsertWithWhereUniqueWithoutVnDistrictInput[]
    createMany?: AddressCreateManyVnDistrictInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnDistrictInput | AddressUpdateWithWhereUniqueWithoutVnDistrictInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnDistrictInput | AddressUpdateManyWithWhereWithoutVnDistrictInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressWardsUncheckedUpdateManyWithoutDistrictNestedInput = {
    create?: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput> | AddressWardsCreateWithoutDistrictInput[] | AddressWardsUncheckedCreateWithoutDistrictInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutDistrictInput | AddressWardsCreateOrConnectWithoutDistrictInput[]
    upsert?: AddressWardsUpsertWithWhereUniqueWithoutDistrictInput | AddressWardsUpsertWithWhereUniqueWithoutDistrictInput[]
    createMany?: AddressWardsCreateManyDistrictInputEnvelope
    set?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    disconnect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    delete?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    update?: AddressWardsUpdateWithWhereUniqueWithoutDistrictInput | AddressWardsUpdateWithWhereUniqueWithoutDistrictInput[]
    updateMany?: AddressWardsUpdateManyWithWhereWithoutDistrictInput | AddressWardsUpdateManyWithWhereWithoutDistrictInput[]
    deleteMany?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutVnDistrictNestedInput = {
    create?: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput> | AddressCreateWithoutVnDistrictInput[] | AddressUncheckedCreateWithoutVnDistrictInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnDistrictInput | AddressCreateOrConnectWithoutVnDistrictInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnDistrictInput | AddressUpsertWithWhereUniqueWithoutVnDistrictInput[]
    createMany?: AddressCreateManyVnDistrictInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnDistrictInput | AddressUpdateWithWhereUniqueWithoutVnDistrictInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnDistrictInput | AddressUpdateManyWithWhereWithoutVnDistrictInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressDistrictsCreateNestedOneWithoutWardsInput = {
    create?: XOR<AddressDistrictsCreateWithoutWardsInput, AddressDistrictsUncheckedCreateWithoutWardsInput>
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutWardsInput
    connect?: AddressDistrictsWhereUniqueInput
  }

  export type AddressAdministrativeUnitsCreateNestedOneWithoutWardsInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutWardsInput, AddressAdministrativeUnitsUncheckedCreateWithoutWardsInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutWardsInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
  }

  export type AddressCreateNestedManyWithoutVnWardInput = {
    create?: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput> | AddressCreateWithoutVnWardInput[] | AddressUncheckedCreateWithoutVnWardInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnWardInput | AddressCreateOrConnectWithoutVnWardInput[]
    createMany?: AddressCreateManyVnWardInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutVnWardInput = {
    create?: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput> | AddressCreateWithoutVnWardInput[] | AddressUncheckedCreateWithoutVnWardInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnWardInput | AddressCreateOrConnectWithoutVnWardInput[]
    createMany?: AddressCreateManyVnWardInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type AddressDistrictsUpdateOneRequiredWithoutWardsNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutWardsInput, AddressDistrictsUncheckedCreateWithoutWardsInput>
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutWardsInput
    upsert?: AddressDistrictsUpsertWithoutWardsInput
    connect?: AddressDistrictsWhereUniqueInput
    update?: XOR<XOR<AddressDistrictsUpdateToOneWithWhereWithoutWardsInput, AddressDistrictsUpdateWithoutWardsInput>, AddressDistrictsUncheckedUpdateWithoutWardsInput>
  }

  export type AddressAdministrativeUnitsUpdateOneRequiredWithoutWardsNestedInput = {
    create?: XOR<AddressAdministrativeUnitsCreateWithoutWardsInput, AddressAdministrativeUnitsUncheckedCreateWithoutWardsInput>
    connectOrCreate?: AddressAdministrativeUnitsCreateOrConnectWithoutWardsInput
    upsert?: AddressAdministrativeUnitsUpsertWithoutWardsInput
    connect?: AddressAdministrativeUnitsWhereUniqueInput
    update?: XOR<XOR<AddressAdministrativeUnitsUpdateToOneWithWhereWithoutWardsInput, AddressAdministrativeUnitsUpdateWithoutWardsInput>, AddressAdministrativeUnitsUncheckedUpdateWithoutWardsInput>
  }

  export type AddressUpdateManyWithoutVnWardNestedInput = {
    create?: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput> | AddressCreateWithoutVnWardInput[] | AddressUncheckedCreateWithoutVnWardInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnWardInput | AddressCreateOrConnectWithoutVnWardInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnWardInput | AddressUpsertWithWhereUniqueWithoutVnWardInput[]
    createMany?: AddressCreateManyVnWardInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnWardInput | AddressUpdateWithWhereUniqueWithoutVnWardInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnWardInput | AddressUpdateManyWithWhereWithoutVnWardInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutVnWardNestedInput = {
    create?: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput> | AddressCreateWithoutVnWardInput[] | AddressUncheckedCreateWithoutVnWardInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutVnWardInput | AddressCreateOrConnectWithoutVnWardInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutVnWardInput | AddressUpsertWithWhereUniqueWithoutVnWardInput[]
    createMany?: AddressCreateManyVnWardInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutVnWardInput | AddressUpdateWithWhereUniqueWithoutVnWardInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutVnWardInput | AddressUpdateManyWithWhereWithoutVnWardInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type AddressProvincesCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput> | AddressProvincesCreateWithoutAdministrativeUnitInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput | AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressProvincesCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressDistrictsCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput> | AddressDistrictsCreateWithoutAdministrativeUnitInput[] | AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput | AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressDistrictsCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
  }

  export type AddressWardsCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput> | AddressWardsCreateWithoutAdministrativeUnitInput[] | AddressWardsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAdministrativeUnitInput | AddressWardsCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressWardsCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
  }

  export type AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput> | AddressProvincesCreateWithoutAdministrativeUnitInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput | AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressProvincesCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressDistrictsUncheckedCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput> | AddressDistrictsCreateWithoutAdministrativeUnitInput[] | AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput | AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressDistrictsCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
  }

  export type AddressWardsUncheckedCreateNestedManyWithoutAdministrativeUnitInput = {
    create?: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput> | AddressWardsCreateWithoutAdministrativeUnitInput[] | AddressWardsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAdministrativeUnitInput | AddressWardsCreateOrConnectWithoutAdministrativeUnitInput[]
    createMany?: AddressWardsCreateManyAdministrativeUnitInputEnvelope
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
  }

  export type AddressProvincesUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput> | AddressProvincesCreateWithoutAdministrativeUnitInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput | AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressProvincesCreateManyAdministrativeUnitInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressProvincesUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type AddressDistrictsUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput> | AddressDistrictsCreateWithoutAdministrativeUnitInput[] | AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput | AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressDistrictsUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressDistrictsUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressDistrictsCreateManyAdministrativeUnitInputEnvelope
    set?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    disconnect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    delete?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    update?: AddressDistrictsUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressDistrictsUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressDistrictsUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressDistrictsUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
  }

  export type AddressWardsUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput> | AddressWardsCreateWithoutAdministrativeUnitInput[] | AddressWardsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAdministrativeUnitInput | AddressWardsCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressWardsUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressWardsUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressWardsCreateManyAdministrativeUnitInputEnvelope
    set?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    disconnect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    delete?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    update?: AddressWardsUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressWardsUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressWardsUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressWardsUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
  }

  export type AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput> | AddressProvincesCreateWithoutAdministrativeUnitInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput | AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressProvincesCreateManyAdministrativeUnitInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressProvincesUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput> | AddressDistrictsCreateWithoutAdministrativeUnitInput[] | AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput | AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressDistrictsUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressDistrictsUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressDistrictsCreateManyAdministrativeUnitInputEnvelope
    set?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    disconnect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    delete?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    connect?: AddressDistrictsWhereUniqueInput | AddressDistrictsWhereUniqueInput[]
    update?: AddressDistrictsUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressDistrictsUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressDistrictsUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressDistrictsUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
  }

  export type AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput = {
    create?: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput> | AddressWardsCreateWithoutAdministrativeUnitInput[] | AddressWardsUncheckedCreateWithoutAdministrativeUnitInput[]
    connectOrCreate?: AddressWardsCreateOrConnectWithoutAdministrativeUnitInput | AddressWardsCreateOrConnectWithoutAdministrativeUnitInput[]
    upsert?: AddressWardsUpsertWithWhereUniqueWithoutAdministrativeUnitInput | AddressWardsUpsertWithWhereUniqueWithoutAdministrativeUnitInput[]
    createMany?: AddressWardsCreateManyAdministrativeUnitInputEnvelope
    set?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    disconnect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    delete?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    connect?: AddressWardsWhereUniqueInput | AddressWardsWhereUniqueInput[]
    update?: AddressWardsUpdateWithWhereUniqueWithoutAdministrativeUnitInput | AddressWardsUpdateWithWhereUniqueWithoutAdministrativeUnitInput[]
    updateMany?: AddressWardsUpdateManyWithWhereWithoutAdministrativeUnitInput | AddressWardsUpdateManyWithWhereWithoutAdministrativeUnitInput[]
    deleteMany?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
  }

  export type AddressProvincesCreateNestedManyWithoutAdministrativeRegionInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput> | AddressProvincesCreateWithoutAdministrativeRegionInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput | AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput[]
    createMany?: AddressProvincesCreateManyAdministrativeRegionInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeRegionInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput> | AddressProvincesCreateWithoutAdministrativeRegionInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput | AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput[]
    createMany?: AddressProvincesCreateManyAdministrativeRegionInputEnvelope
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
  }

  export type AddressProvincesUpdateManyWithoutAdministrativeRegionNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput> | AddressProvincesCreateWithoutAdministrativeRegionInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput | AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeRegionInput | AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeRegionInput[]
    createMany?: AddressProvincesCreateManyAdministrativeRegionInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeRegionInput | AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeRegionInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutAdministrativeRegionInput | AddressProvincesUpdateManyWithWhereWithoutAdministrativeRegionInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type AddressProvincesUncheckedUpdateManyWithoutAdministrativeRegionNestedInput = {
    create?: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput> | AddressProvincesCreateWithoutAdministrativeRegionInput[] | AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput[]
    connectOrCreate?: AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput | AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput[]
    upsert?: AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeRegionInput | AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeRegionInput[]
    createMany?: AddressProvincesCreateManyAdministrativeRegionInputEnvelope
    set?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    disconnect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    delete?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    connect?: AddressProvincesWhereUniqueInput | AddressProvincesWhereUniqueInput[]
    update?: AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeRegionInput | AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeRegionInput[]
    updateMany?: AddressProvincesUpdateManyWithWhereWithoutAdministrativeRegionInput | AddressProvincesUpdateManyWithWhereWithoutAdministrativeRegionInput[]
    deleteMany?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AddressCreateWithoutUserInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    vnProvince?: AddressProvincesCreateNestedOneWithoutAddressesInput
    vnDistrict?: AddressDistrictsCreateNestedOneWithoutAddressesInput
    vnWard?: AddressWardsCreateNestedOneWithoutAddressesInput
    country: CountryCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutUserInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressCreateManyUserInputEnvelope = {
    data: AddressCreateManyUserInput | AddressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AddressUpsertWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
  }

  export type AddressUpdateManyWithWhereWithoutUserInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutUserInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    name?: StringFilter<"Address"> | string
    street?: StringFilter<"Address"> | string
    city?: StringNullableFilter<"Address"> | string | null
    state?: StringNullableFilter<"Address"> | string | null
    vnProvinceId?: StringNullableFilter<"Address"> | string | null
    vnDistrictId?: StringNullableFilter<"Address"> | string | null
    vnWardId?: StringNullableFilter<"Address"> | string | null
    zip?: StringNullableFilter<"Address"> | string | null
    countryId?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type UserCreateWithoutAddressInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    isVerified?: boolean
    role?: string
    lastLogin?: Date | string | null
    permissions?: string
    phoneNumber?: string | null
    gender?: string | null
    dateOfBirth?: Date | string | null
    profilePictureUrl?: string | null
  }

  export type UserUncheckedCreateWithoutAddressInput = {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    isVerified?: boolean
    role?: string
    lastLogin?: Date | string | null
    permissions?: string
    phoneNumber?: string | null
    gender?: string | null
    dateOfBirth?: Date | string | null
    profilePictureUrl?: string | null
  }

  export type UserCreateOrConnectWithoutAddressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddressInput, UserUncheckedCreateWithoutAddressInput>
  }

  export type AddressProvincesCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput
    administrativeRegion: AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput
    districts?: AddressDistrictsCreateNestedManyWithoutProvinceInput
    country: CountryCreateNestedOneWithoutProvincesInput
  }

  export type AddressProvincesUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    countryId: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput
  }

  export type AddressProvincesCreateOrConnectWithoutAddressesInput = {
    where: AddressProvincesWhereUniqueInput
    create: XOR<AddressProvincesCreateWithoutAddressesInput, AddressProvincesUncheckedCreateWithoutAddressesInput>
  }

  export type AddressDistrictsCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    province: AddressProvincesCreateNestedOneWithoutDistrictsInput
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutDistrictsInput
    wards?: AddressWardsCreateNestedManyWithoutDistrictInput
  }

  export type AddressDistrictsUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    administrativeUnitId: string
    wards?: AddressWardsUncheckedCreateNestedManyWithoutDistrictInput
  }

  export type AddressDistrictsCreateOrConnectWithoutAddressesInput = {
    where: AddressDistrictsWhereUniqueInput
    create: XOR<AddressDistrictsCreateWithoutAddressesInput, AddressDistrictsUncheckedCreateWithoutAddressesInput>
  }

  export type AddressWardsCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    district: AddressDistrictsCreateNestedOneWithoutWardsInput
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutWardsInput
  }

  export type AddressWardsUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
    administrativeUnitId: string
  }

  export type AddressWardsCreateOrConnectWithoutAddressesInput = {
    where: AddressWardsWhereUniqueInput
    create: XOR<AddressWardsCreateWithoutAddressesInput, AddressWardsUncheckedCreateWithoutAddressesInput>
  }

  export type CountryCreateWithoutAddressesInput = {
    id?: string
    name: string
    codeName: string
    provinces?: AddressProvincesCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateWithoutAddressesInput = {
    id?: string
    name: string
    codeName: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryCreateOrConnectWithoutAddressesInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutAddressesInput, CountryUncheckedCreateWithoutAddressesInput>
  }

  export type UserUpsertWithoutAddressInput = {
    update: XOR<UserUpdateWithoutAddressInput, UserUncheckedUpdateWithoutAddressInput>
    create: XOR<UserCreateWithoutAddressInput, UserUncheckedCreateWithoutAddressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddressInput, UserUncheckedUpdateWithoutAddressInput>
  }

  export type UserUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutAddressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    role?: StringFieldUpdateOperationsInput | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profilePictureUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AddressProvincesUpsertWithoutAddressesInput = {
    update: XOR<AddressProvincesUpdateWithoutAddressesInput, AddressProvincesUncheckedUpdateWithoutAddressesInput>
    create: XOR<AddressProvincesCreateWithoutAddressesInput, AddressProvincesUncheckedCreateWithoutAddressesInput>
    where?: AddressProvincesWhereInput
  }

  export type AddressProvincesUpdateToOneWithWhereWithoutAddressesInput = {
    where?: AddressProvincesWhereInput
    data: XOR<AddressProvincesUpdateWithoutAddressesInput, AddressProvincesUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressProvincesUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput
    administrativeRegion?: AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput
    districts?: AddressDistrictsUpdateManyWithoutProvinceNestedInput
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
  }

  export type AddressProvincesUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput
  }

  export type AddressDistrictsUpsertWithoutAddressesInput = {
    update: XOR<AddressDistrictsUpdateWithoutAddressesInput, AddressDistrictsUncheckedUpdateWithoutAddressesInput>
    create: XOR<AddressDistrictsCreateWithoutAddressesInput, AddressDistrictsUncheckedCreateWithoutAddressesInput>
    where?: AddressDistrictsWhereInput
  }

  export type AddressDistrictsUpdateToOneWithWhereWithoutAddressesInput = {
    where?: AddressDistrictsWhereInput
    data: XOR<AddressDistrictsUpdateWithoutAddressesInput, AddressDistrictsUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressDistrictsUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    province?: AddressProvincesUpdateOneRequiredWithoutDistrictsNestedInput
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutDistrictsNestedInput
    wards?: AddressWardsUpdateManyWithoutDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    wards?: AddressWardsUncheckedUpdateManyWithoutDistrictNestedInput
  }

  export type AddressWardsUpsertWithoutAddressesInput = {
    update: XOR<AddressWardsUpdateWithoutAddressesInput, AddressWardsUncheckedUpdateWithoutAddressesInput>
    create: XOR<AddressWardsCreateWithoutAddressesInput, AddressWardsUncheckedCreateWithoutAddressesInput>
    where?: AddressWardsWhereInput
  }

  export type AddressWardsUpdateToOneWithWhereWithoutAddressesInput = {
    where?: AddressWardsWhereInput
    data: XOR<AddressWardsUpdateWithoutAddressesInput, AddressWardsUncheckedUpdateWithoutAddressesInput>
  }

  export type AddressWardsUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    district?: AddressDistrictsUpdateOneRequiredWithoutWardsNestedInput
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutWardsNestedInput
  }

  export type AddressWardsUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type CountryUpsertWithoutAddressesInput = {
    update: XOR<CountryUpdateWithoutAddressesInput, CountryUncheckedUpdateWithoutAddressesInput>
    create: XOR<CountryCreateWithoutAddressesInput, CountryUncheckedCreateWithoutAddressesInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutAddressesInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutAddressesInput, CountryUncheckedUpdateWithoutAddressesInput>
  }

  export type CountryUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type AddressProvincesCreateWithoutCountryInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput
    administrativeRegion: AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput
    districts?: AddressDistrictsCreateNestedManyWithoutProvinceInput
    addresses?: AddressCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUncheckedCreateWithoutCountryInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesCreateOrConnectWithoutCountryInput = {
    where: AddressProvincesWhereUniqueInput
    create: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput>
  }

  export type AddressProvincesCreateManyCountryInputEnvelope = {
    data: AddressProvincesCreateManyCountryInput | AddressProvincesCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutCountryInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressInput
    vnProvince?: AddressProvincesCreateNestedOneWithoutAddressesInput
    vnDistrict?: AddressDistrictsCreateNestedOneWithoutAddressesInput
    vnWard?: AddressWardsCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutCountryInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutCountryInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput>
  }

  export type AddressCreateManyCountryInputEnvelope = {
    data: AddressCreateManyCountryInput | AddressCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type AddressProvincesUpsertWithWhereUniqueWithoutCountryInput = {
    where: AddressProvincesWhereUniqueInput
    update: XOR<AddressProvincesUpdateWithoutCountryInput, AddressProvincesUncheckedUpdateWithoutCountryInput>
    create: XOR<AddressProvincesCreateWithoutCountryInput, AddressProvincesUncheckedCreateWithoutCountryInput>
  }

  export type AddressProvincesUpdateWithWhereUniqueWithoutCountryInput = {
    where: AddressProvincesWhereUniqueInput
    data: XOR<AddressProvincesUpdateWithoutCountryInput, AddressProvincesUncheckedUpdateWithoutCountryInput>
  }

  export type AddressProvincesUpdateManyWithWhereWithoutCountryInput = {
    where: AddressProvincesScalarWhereInput
    data: XOR<AddressProvincesUpdateManyMutationInput, AddressProvincesUncheckedUpdateManyWithoutCountryInput>
  }

  export type AddressProvincesScalarWhereInput = {
    AND?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
    OR?: AddressProvincesScalarWhereInput[]
    NOT?: AddressProvincesScalarWhereInput | AddressProvincesScalarWhereInput[]
    id?: StringFilter<"AddressProvinces"> | string
    name?: StringFilter<"AddressProvinces"> | string
    nameEn?: StringFilter<"AddressProvinces"> | string
    fullName?: StringFilter<"AddressProvinces"> | string
    fullNameEn?: StringFilter<"AddressProvinces"> | string
    administrativeUnitId?: StringFilter<"AddressProvinces"> | string
    administrativeRegionId?: StringFilter<"AddressProvinces"> | string
    countryId?: StringFilter<"AddressProvinces"> | string
  }

  export type AddressUpsertWithWhereUniqueWithoutCountryInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutCountryInput, AddressUncheckedUpdateWithoutCountryInput>
    create: XOR<AddressCreateWithoutCountryInput, AddressUncheckedCreateWithoutCountryInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutCountryInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutCountryInput, AddressUncheckedUpdateWithoutCountryInput>
  }

  export type AddressUpdateManyWithWhereWithoutCountryInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutCountryInput>
  }

  export type AddressAdministrativeUnitsCreateWithoutProvincesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    districts?: AddressDistrictsCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsUncheckedCreateWithoutProvincesInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsCreateOrConnectWithoutProvincesInput = {
    where: AddressAdministrativeUnitsWhereUniqueInput
    create: XOR<AddressAdministrativeUnitsCreateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedCreateWithoutProvincesInput>
  }

  export type AddressAdministrativeRegionsCreateWithoutProvincesInput = {
    id?: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
  }

  export type AddressAdministrativeRegionsUncheckedCreateWithoutProvincesInput = {
    id?: string
    name: string
    nameEn: string
    codeName: string
    codeNameEn: string
  }

  export type AddressAdministrativeRegionsCreateOrConnectWithoutProvincesInput = {
    where: AddressAdministrativeRegionsWhereUniqueInput
    create: XOR<AddressAdministrativeRegionsCreateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedCreateWithoutProvincesInput>
  }

  export type AddressDistrictsCreateWithoutProvinceInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutDistrictsInput
    wards?: AddressWardsCreateNestedManyWithoutDistrictInput
    addresses?: AddressCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsUncheckedCreateWithoutProvinceInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    wards?: AddressWardsUncheckedCreateNestedManyWithoutDistrictInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsCreateOrConnectWithoutProvinceInput = {
    where: AddressDistrictsWhereUniqueInput
    create: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput>
  }

  export type AddressDistrictsCreateManyProvinceInputEnvelope = {
    data: AddressDistrictsCreateManyProvinceInput | AddressDistrictsCreateManyProvinceInput[]
    skipDuplicates?: boolean
  }

  export type CountryCreateWithoutProvincesInput = {
    id?: string
    name: string
    codeName: string
    addresses?: AddressCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateWithoutProvincesInput = {
    id?: string
    name: string
    codeName: string
    addresses?: AddressUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryCreateOrConnectWithoutProvincesInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
  }

  export type AddressCreateWithoutVnProvinceInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressInput
    vnDistrict?: AddressDistrictsCreateNestedOneWithoutAddressesInput
    vnWard?: AddressWardsCreateNestedOneWithoutAddressesInput
    country: CountryCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutVnProvinceInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutVnProvinceInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput>
  }

  export type AddressCreateManyVnProvinceInputEnvelope = {
    data: AddressCreateManyVnProvinceInput | AddressCreateManyVnProvinceInput[]
    skipDuplicates?: boolean
  }

  export type AddressAdministrativeUnitsUpsertWithoutProvincesInput = {
    update: XOR<AddressAdministrativeUnitsUpdateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedUpdateWithoutProvincesInput>
    create: XOR<AddressAdministrativeUnitsCreateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedCreateWithoutProvincesInput>
    where?: AddressAdministrativeUnitsWhereInput
  }

  export type AddressAdministrativeUnitsUpdateToOneWithWhereWithoutProvincesInput = {
    where?: AddressAdministrativeUnitsWhereInput
    data: XOR<AddressAdministrativeUnitsUpdateWithoutProvincesInput, AddressAdministrativeUnitsUncheckedUpdateWithoutProvincesInput>
  }

  export type AddressAdministrativeUnitsUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeUnitsUncheckedUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeRegionsUpsertWithoutProvincesInput = {
    update: XOR<AddressAdministrativeRegionsUpdateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedUpdateWithoutProvincesInput>
    create: XOR<AddressAdministrativeRegionsCreateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedCreateWithoutProvincesInput>
    where?: AddressAdministrativeRegionsWhereInput
  }

  export type AddressAdministrativeRegionsUpdateToOneWithWhereWithoutProvincesInput = {
    where?: AddressAdministrativeRegionsWhereInput
    data: XOR<AddressAdministrativeRegionsUpdateWithoutProvincesInput, AddressAdministrativeRegionsUncheckedUpdateWithoutProvincesInput>
  }

  export type AddressAdministrativeRegionsUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressAdministrativeRegionsUncheckedUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
  }

  export type AddressDistrictsUpsertWithWhereUniqueWithoutProvinceInput = {
    where: AddressDistrictsWhereUniqueInput
    update: XOR<AddressDistrictsUpdateWithoutProvinceInput, AddressDistrictsUncheckedUpdateWithoutProvinceInput>
    create: XOR<AddressDistrictsCreateWithoutProvinceInput, AddressDistrictsUncheckedCreateWithoutProvinceInput>
  }

  export type AddressDistrictsUpdateWithWhereUniqueWithoutProvinceInput = {
    where: AddressDistrictsWhereUniqueInput
    data: XOR<AddressDistrictsUpdateWithoutProvinceInput, AddressDistrictsUncheckedUpdateWithoutProvinceInput>
  }

  export type AddressDistrictsUpdateManyWithWhereWithoutProvinceInput = {
    where: AddressDistrictsScalarWhereInput
    data: XOR<AddressDistrictsUpdateManyMutationInput, AddressDistrictsUncheckedUpdateManyWithoutProvinceInput>
  }

  export type AddressDistrictsScalarWhereInput = {
    AND?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
    OR?: AddressDistrictsScalarWhereInput[]
    NOT?: AddressDistrictsScalarWhereInput | AddressDistrictsScalarWhereInput[]
    id?: StringFilter<"AddressDistricts"> | string
    name?: StringFilter<"AddressDistricts"> | string
    nameEn?: StringFilter<"AddressDistricts"> | string
    fullName?: StringFilter<"AddressDistricts"> | string
    fullNameEn?: StringFilter<"AddressDistricts"> | string
    provinceCode?: StringFilter<"AddressDistricts"> | string
    administrativeUnitId?: StringFilter<"AddressDistricts"> | string
  }

  export type CountryUpsertWithoutProvincesInput = {
    update: XOR<CountryUpdateWithoutProvincesInput, CountryUncheckedUpdateWithoutProvincesInput>
    create: XOR<CountryCreateWithoutProvincesInput, CountryUncheckedCreateWithoutProvincesInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutProvincesInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutProvincesInput, CountryUncheckedUpdateWithoutProvincesInput>
  }

  export type CountryUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateWithoutProvincesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type AddressUpsertWithWhereUniqueWithoutVnProvinceInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutVnProvinceInput, AddressUncheckedUpdateWithoutVnProvinceInput>
    create: XOR<AddressCreateWithoutVnProvinceInput, AddressUncheckedCreateWithoutVnProvinceInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutVnProvinceInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutVnProvinceInput, AddressUncheckedUpdateWithoutVnProvinceInput>
  }

  export type AddressUpdateManyWithWhereWithoutVnProvinceInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutVnProvinceInput>
  }

  export type AddressProvincesCreateWithoutDistrictsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput
    administrativeRegion: AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput
    country: CountryCreateNestedOneWithoutProvincesInput
    addresses?: AddressCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUncheckedCreateWithoutDistrictsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
    countryId: string
    addresses?: AddressUncheckedCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesCreateOrConnectWithoutDistrictsInput = {
    where: AddressProvincesWhereUniqueInput
    create: XOR<AddressProvincesCreateWithoutDistrictsInput, AddressProvincesUncheckedCreateWithoutDistrictsInput>
  }

  export type AddressAdministrativeUnitsCreateWithoutDistrictsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsUncheckedCreateWithoutDistrictsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeUnitInput
    wards?: AddressWardsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsCreateOrConnectWithoutDistrictsInput = {
    where: AddressAdministrativeUnitsWhereUniqueInput
    create: XOR<AddressAdministrativeUnitsCreateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedCreateWithoutDistrictsInput>
  }

  export type AddressWardsCreateWithoutDistrictInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutWardsInput
    addresses?: AddressCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsUncheckedCreateWithoutDistrictInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    addresses?: AddressUncheckedCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsCreateOrConnectWithoutDistrictInput = {
    where: AddressWardsWhereUniqueInput
    create: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput>
  }

  export type AddressWardsCreateManyDistrictInputEnvelope = {
    data: AddressWardsCreateManyDistrictInput | AddressWardsCreateManyDistrictInput[]
    skipDuplicates?: boolean
  }

  export type AddressCreateWithoutVnDistrictInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressInput
    vnProvince?: AddressProvincesCreateNestedOneWithoutAddressesInput
    vnWard?: AddressWardsCreateNestedOneWithoutAddressesInput
    country: CountryCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutVnDistrictInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutVnDistrictInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput>
  }

  export type AddressCreateManyVnDistrictInputEnvelope = {
    data: AddressCreateManyVnDistrictInput | AddressCreateManyVnDistrictInput[]
    skipDuplicates?: boolean
  }

  export type AddressProvincesUpsertWithoutDistrictsInput = {
    update: XOR<AddressProvincesUpdateWithoutDistrictsInput, AddressProvincesUncheckedUpdateWithoutDistrictsInput>
    create: XOR<AddressProvincesCreateWithoutDistrictsInput, AddressProvincesUncheckedCreateWithoutDistrictsInput>
    where?: AddressProvincesWhereInput
  }

  export type AddressProvincesUpdateToOneWithWhereWithoutDistrictsInput = {
    where?: AddressProvincesWhereInput
    data: XOR<AddressProvincesUpdateWithoutDistrictsInput, AddressProvincesUncheckedUpdateWithoutDistrictsInput>
  }

  export type AddressProvincesUpdateWithoutDistrictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput
    administrativeRegion?: AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
    addresses?: AddressUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateWithoutDistrictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressAdministrativeUnitsUpsertWithoutDistrictsInput = {
    update: XOR<AddressAdministrativeUnitsUpdateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedUpdateWithoutDistrictsInput>
    create: XOR<AddressAdministrativeUnitsCreateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedCreateWithoutDistrictsInput>
    where?: AddressAdministrativeUnitsWhereInput
  }

  export type AddressAdministrativeUnitsUpdateToOneWithWhereWithoutDistrictsInput = {
    where?: AddressAdministrativeUnitsWhereInput
    data: XOR<AddressAdministrativeUnitsUpdateWithoutDistrictsInput, AddressAdministrativeUnitsUncheckedUpdateWithoutDistrictsInput>
  }

  export type AddressAdministrativeUnitsUpdateWithoutDistrictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeUnitsUncheckedUpdateWithoutDistrictsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
    wards?: AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressWardsUpsertWithWhereUniqueWithoutDistrictInput = {
    where: AddressWardsWhereUniqueInput
    update: XOR<AddressWardsUpdateWithoutDistrictInput, AddressWardsUncheckedUpdateWithoutDistrictInput>
    create: XOR<AddressWardsCreateWithoutDistrictInput, AddressWardsUncheckedCreateWithoutDistrictInput>
  }

  export type AddressWardsUpdateWithWhereUniqueWithoutDistrictInput = {
    where: AddressWardsWhereUniqueInput
    data: XOR<AddressWardsUpdateWithoutDistrictInput, AddressWardsUncheckedUpdateWithoutDistrictInput>
  }

  export type AddressWardsUpdateManyWithWhereWithoutDistrictInput = {
    where: AddressWardsScalarWhereInput
    data: XOR<AddressWardsUpdateManyMutationInput, AddressWardsUncheckedUpdateManyWithoutDistrictInput>
  }

  export type AddressWardsScalarWhereInput = {
    AND?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
    OR?: AddressWardsScalarWhereInput[]
    NOT?: AddressWardsScalarWhereInput | AddressWardsScalarWhereInput[]
    id?: StringFilter<"AddressWards"> | string
    name?: StringFilter<"AddressWards"> | string
    nameEn?: StringFilter<"AddressWards"> | string
    fullName?: StringFilter<"AddressWards"> | string
    fullNameEn?: StringFilter<"AddressWards"> | string
    districtId?: StringFilter<"AddressWards"> | string
    administrativeUnitId?: StringFilter<"AddressWards"> | string
  }

  export type AddressUpsertWithWhereUniqueWithoutVnDistrictInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutVnDistrictInput, AddressUncheckedUpdateWithoutVnDistrictInput>
    create: XOR<AddressCreateWithoutVnDistrictInput, AddressUncheckedCreateWithoutVnDistrictInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutVnDistrictInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutVnDistrictInput, AddressUncheckedUpdateWithoutVnDistrictInput>
  }

  export type AddressUpdateManyWithWhereWithoutVnDistrictInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutVnDistrictInput>
  }

  export type AddressDistrictsCreateWithoutWardsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    province: AddressProvincesCreateNestedOneWithoutDistrictsInput
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutDistrictsInput
    addresses?: AddressCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsUncheckedCreateWithoutWardsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    administrativeUnitId: string
    addresses?: AddressUncheckedCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsCreateOrConnectWithoutWardsInput = {
    where: AddressDistrictsWhereUniqueInput
    create: XOR<AddressDistrictsCreateWithoutWardsInput, AddressDistrictsUncheckedCreateWithoutWardsInput>
  }

  export type AddressAdministrativeUnitsCreateWithoutWardsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesCreateNestedManyWithoutAdministrativeUnitInput
    districts?: AddressDistrictsCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsUncheckedCreateWithoutWardsInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    codeName: string
    codeNameEn: string
    provinces?: AddressProvincesUncheckedCreateNestedManyWithoutAdministrativeUnitInput
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutAdministrativeUnitInput
  }

  export type AddressAdministrativeUnitsCreateOrConnectWithoutWardsInput = {
    where: AddressAdministrativeUnitsWhereUniqueInput
    create: XOR<AddressAdministrativeUnitsCreateWithoutWardsInput, AddressAdministrativeUnitsUncheckedCreateWithoutWardsInput>
  }

  export type AddressCreateWithoutVnWardInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressInput
    vnProvince?: AddressProvincesCreateNestedOneWithoutAddressesInput
    vnDistrict?: AddressDistrictsCreateNestedOneWithoutAddressesInput
    country: CountryCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateWithoutVnWardInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutVnWardInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput>
  }

  export type AddressCreateManyVnWardInputEnvelope = {
    data: AddressCreateManyVnWardInput | AddressCreateManyVnWardInput[]
    skipDuplicates?: boolean
  }

  export type AddressDistrictsUpsertWithoutWardsInput = {
    update: XOR<AddressDistrictsUpdateWithoutWardsInput, AddressDistrictsUncheckedUpdateWithoutWardsInput>
    create: XOR<AddressDistrictsCreateWithoutWardsInput, AddressDistrictsUncheckedCreateWithoutWardsInput>
    where?: AddressDistrictsWhereInput
  }

  export type AddressDistrictsUpdateToOneWithWhereWithoutWardsInput = {
    where?: AddressDistrictsWhereInput
    data: XOR<AddressDistrictsUpdateWithoutWardsInput, AddressDistrictsUncheckedUpdateWithoutWardsInput>
  }

  export type AddressDistrictsUpdateWithoutWardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    province?: AddressProvincesUpdateOneRequiredWithoutDistrictsNestedInput
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutDistrictsNestedInput
    addresses?: AddressUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateWithoutWardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressAdministrativeUnitsUpsertWithoutWardsInput = {
    update: XOR<AddressAdministrativeUnitsUpdateWithoutWardsInput, AddressAdministrativeUnitsUncheckedUpdateWithoutWardsInput>
    create: XOR<AddressAdministrativeUnitsCreateWithoutWardsInput, AddressAdministrativeUnitsUncheckedCreateWithoutWardsInput>
    where?: AddressAdministrativeUnitsWhereInput
  }

  export type AddressAdministrativeUnitsUpdateToOneWithWhereWithoutWardsInput = {
    where?: AddressAdministrativeUnitsWhereInput
    data: XOR<AddressAdministrativeUnitsUpdateWithoutWardsInput, AddressAdministrativeUnitsUncheckedUpdateWithoutWardsInput>
  }

  export type AddressAdministrativeUnitsUpdateWithoutWardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUpdateManyWithoutAdministrativeUnitNestedInput
    districts?: AddressDistrictsUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressAdministrativeUnitsUncheckedUpdateWithoutWardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    codeName?: StringFieldUpdateOperationsInput | string
    codeNameEn?: StringFieldUpdateOperationsInput | string
    provinces?: AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
    districts?: AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitNestedInput
  }

  export type AddressUpsertWithWhereUniqueWithoutVnWardInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutVnWardInput, AddressUncheckedUpdateWithoutVnWardInput>
    create: XOR<AddressCreateWithoutVnWardInput, AddressUncheckedCreateWithoutVnWardInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutVnWardInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutVnWardInput, AddressUncheckedUpdateWithoutVnWardInput>
  }

  export type AddressUpdateManyWithWhereWithoutVnWardInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutVnWardInput>
  }

  export type AddressProvincesCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeRegion: AddressAdministrativeRegionsCreateNestedOneWithoutProvincesInput
    districts?: AddressDistrictsCreateNestedManyWithoutProvinceInput
    country: CountryCreateNestedOneWithoutProvincesInput
    addresses?: AddressCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeRegionId: string
    countryId: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesCreateOrConnectWithoutAdministrativeUnitInput = {
    where: AddressProvincesWhereUniqueInput
    create: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressProvincesCreateManyAdministrativeUnitInputEnvelope = {
    data: AddressProvincesCreateManyAdministrativeUnitInput | AddressProvincesCreateManyAdministrativeUnitInput[]
    skipDuplicates?: boolean
  }

  export type AddressDistrictsCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    province: AddressProvincesCreateNestedOneWithoutDistrictsInput
    wards?: AddressWardsCreateNestedManyWithoutDistrictInput
    addresses?: AddressCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
    wards?: AddressWardsUncheckedCreateNestedManyWithoutDistrictInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnDistrictInput
  }

  export type AddressDistrictsCreateOrConnectWithoutAdministrativeUnitInput = {
    where: AddressDistrictsWhereUniqueInput
    create: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressDistrictsCreateManyAdministrativeUnitInputEnvelope = {
    data: AddressDistrictsCreateManyAdministrativeUnitInput | AddressDistrictsCreateManyAdministrativeUnitInput[]
    skipDuplicates?: boolean
  }

  export type AddressWardsCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    district: AddressDistrictsCreateNestedOneWithoutWardsInput
    addresses?: AddressCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsUncheckedCreateWithoutAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
    addresses?: AddressUncheckedCreateNestedManyWithoutVnWardInput
  }

  export type AddressWardsCreateOrConnectWithoutAdministrativeUnitInput = {
    where: AddressWardsWhereUniqueInput
    create: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressWardsCreateManyAdministrativeUnitInputEnvelope = {
    data: AddressWardsCreateManyAdministrativeUnitInput | AddressWardsCreateManyAdministrativeUnitInput[]
    skipDuplicates?: boolean
  }

  export type AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressProvincesWhereUniqueInput
    update: XOR<AddressProvincesUpdateWithoutAdministrativeUnitInput, AddressProvincesUncheckedUpdateWithoutAdministrativeUnitInput>
    create: XOR<AddressProvincesCreateWithoutAdministrativeUnitInput, AddressProvincesUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressProvincesWhereUniqueInput
    data: XOR<AddressProvincesUpdateWithoutAdministrativeUnitInput, AddressProvincesUncheckedUpdateWithoutAdministrativeUnitInput>
  }

  export type AddressProvincesUpdateManyWithWhereWithoutAdministrativeUnitInput = {
    where: AddressProvincesScalarWhereInput
    data: XOR<AddressProvincesUpdateManyMutationInput, AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitInput>
  }

  export type AddressDistrictsUpsertWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressDistrictsWhereUniqueInput
    update: XOR<AddressDistrictsUpdateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedUpdateWithoutAdministrativeUnitInput>
    create: XOR<AddressDistrictsCreateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressDistrictsUpdateWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressDistrictsWhereUniqueInput
    data: XOR<AddressDistrictsUpdateWithoutAdministrativeUnitInput, AddressDistrictsUncheckedUpdateWithoutAdministrativeUnitInput>
  }

  export type AddressDistrictsUpdateManyWithWhereWithoutAdministrativeUnitInput = {
    where: AddressDistrictsScalarWhereInput
    data: XOR<AddressDistrictsUpdateManyMutationInput, AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitInput>
  }

  export type AddressWardsUpsertWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressWardsWhereUniqueInput
    update: XOR<AddressWardsUpdateWithoutAdministrativeUnitInput, AddressWardsUncheckedUpdateWithoutAdministrativeUnitInput>
    create: XOR<AddressWardsCreateWithoutAdministrativeUnitInput, AddressWardsUncheckedCreateWithoutAdministrativeUnitInput>
  }

  export type AddressWardsUpdateWithWhereUniqueWithoutAdministrativeUnitInput = {
    where: AddressWardsWhereUniqueInput
    data: XOR<AddressWardsUpdateWithoutAdministrativeUnitInput, AddressWardsUncheckedUpdateWithoutAdministrativeUnitInput>
  }

  export type AddressWardsUpdateManyWithWhereWithoutAdministrativeUnitInput = {
    where: AddressWardsScalarWhereInput
    data: XOR<AddressWardsUpdateManyMutationInput, AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitInput>
  }

  export type AddressProvincesCreateWithoutAdministrativeRegionInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnit: AddressAdministrativeUnitsCreateNestedOneWithoutProvincesInput
    districts?: AddressDistrictsCreateNestedManyWithoutProvinceInput
    country: CountryCreateNestedOneWithoutProvincesInput
    addresses?: AddressCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    countryId: string
    districts?: AddressDistrictsUncheckedCreateNestedManyWithoutProvinceInput
    addresses?: AddressUncheckedCreateNestedManyWithoutVnProvinceInput
  }

  export type AddressProvincesCreateOrConnectWithoutAdministrativeRegionInput = {
    where: AddressProvincesWhereUniqueInput
    create: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput>
  }

  export type AddressProvincesCreateManyAdministrativeRegionInputEnvelope = {
    data: AddressProvincesCreateManyAdministrativeRegionInput | AddressProvincesCreateManyAdministrativeRegionInput[]
    skipDuplicates?: boolean
  }

  export type AddressProvincesUpsertWithWhereUniqueWithoutAdministrativeRegionInput = {
    where: AddressProvincesWhereUniqueInput
    update: XOR<AddressProvincesUpdateWithoutAdministrativeRegionInput, AddressProvincesUncheckedUpdateWithoutAdministrativeRegionInput>
    create: XOR<AddressProvincesCreateWithoutAdministrativeRegionInput, AddressProvincesUncheckedCreateWithoutAdministrativeRegionInput>
  }

  export type AddressProvincesUpdateWithWhereUniqueWithoutAdministrativeRegionInput = {
    where: AddressProvincesWhereUniqueInput
    data: XOR<AddressProvincesUpdateWithoutAdministrativeRegionInput, AddressProvincesUncheckedUpdateWithoutAdministrativeRegionInput>
  }

  export type AddressProvincesUpdateManyWithWhereWithoutAdministrativeRegionInput = {
    where: AddressProvincesScalarWhereInput
    data: XOR<AddressProvincesUpdateManyMutationInput, AddressProvincesUncheckedUpdateManyWithoutAdministrativeRegionInput>
  }

  export type AddressCreateManyUserInput = {
    id?: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vnProvince?: AddressProvincesUpdateOneWithoutAddressesNestedInput
    vnDistrict?: AddressDistrictsUpdateOneWithoutAddressesNestedInput
    vnWard?: AddressWardsUpdateOneWithoutAddressesNestedInput
    country?: CountryUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressProvincesCreateManyCountryInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    administrativeRegionId: string
  }

  export type AddressCreateManyCountryInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressProvincesUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput
    administrativeRegion?: AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput
    districts?: AddressDistrictsUpdateManyWithoutProvinceNestedInput
    addresses?: AddressUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateManyWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressNestedInput
    vnProvince?: AddressProvincesUpdateOneWithoutAddressesNestedInput
    vnDistrict?: AddressDistrictsUpdateOneWithoutAddressesNestedInput
    vnWard?: AddressWardsUpdateOneWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutCountryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressDistrictsCreateManyProvinceInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
  }

  export type AddressCreateManyVnProvinceInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnDistrictId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressDistrictsUpdateWithoutProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutDistrictsNestedInput
    wards?: AddressWardsUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateWithoutProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    wards?: AddressWardsUncheckedUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateManyWithoutProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUpdateWithoutVnProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressNestedInput
    vnDistrict?: AddressDistrictsUpdateOneWithoutAddressesNestedInput
    vnWard?: AddressWardsUpdateOneWithoutAddressesNestedInput
    country?: CountryUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutVnProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutVnProvinceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressWardsCreateManyDistrictInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
  }

  export type AddressCreateManyVnDistrictInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnWardId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressWardsUpdateWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutWardsNestedInput
    addresses?: AddressUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsUncheckedUpdateWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsUncheckedUpdateManyWithoutDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressUpdateWithoutVnDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressNestedInput
    vnProvince?: AddressProvincesUpdateOneWithoutAddressesNestedInput
    vnWard?: AddressWardsUpdateOneWithoutAddressesNestedInput
    country?: CountryUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutVnDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutVnDistrictInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnWardId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyVnWardInput = {
    id?: string
    userId: string
    name: string
    street: string
    city?: string | null
    state?: string | null
    vnProvinceId?: string | null
    vnDistrictId?: string | null
    zip?: string | null
    countryId: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateWithoutVnWardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressNestedInput
    vnProvince?: AddressProvincesUpdateOneWithoutAddressesNestedInput
    vnDistrict?: AddressDistrictsUpdateOneWithoutAddressesNestedInput
    country?: CountryUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateWithoutVnWardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutVnWardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    vnProvinceId?: NullableStringFieldUpdateOperationsInput | string | null
    vnDistrictId?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    countryId?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressProvincesCreateManyAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeRegionId: string
    countryId: string
  }

  export type AddressDistrictsCreateManyAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    provinceCode: string
  }

  export type AddressWardsCreateManyAdministrativeUnitInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    districtId: string
  }

  export type AddressProvincesUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeRegion?: AddressAdministrativeRegionsUpdateOneRequiredWithoutProvincesNestedInput
    districts?: AddressDistrictsUpdateManyWithoutProvinceNestedInput
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
    addresses?: AddressUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateManyWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeRegionId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressDistrictsUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    province?: AddressProvincesUpdateOneRequiredWithoutDistrictsNestedInput
    wards?: AddressWardsUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
    wards?: AddressWardsUncheckedUpdateManyWithoutDistrictNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnDistrictNestedInput
  }

  export type AddressDistrictsUncheckedUpdateManyWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    provinceCode?: StringFieldUpdateOperationsInput | string
  }

  export type AddressWardsUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    district?: AddressDistrictsUpdateOneRequiredWithoutWardsNestedInput
    addresses?: AddressUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsUncheckedUpdateWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
    addresses?: AddressUncheckedUpdateManyWithoutVnWardNestedInput
  }

  export type AddressWardsUncheckedUpdateManyWithoutAdministrativeUnitInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    districtId?: StringFieldUpdateOperationsInput | string
  }

  export type AddressProvincesCreateManyAdministrativeRegionInput = {
    id?: string
    name: string
    nameEn: string
    fullName: string
    fullNameEn: string
    administrativeUnitId: string
    countryId: string
  }

  export type AddressProvincesUpdateWithoutAdministrativeRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnit?: AddressAdministrativeUnitsUpdateOneRequiredWithoutProvincesNestedInput
    districts?: AddressDistrictsUpdateManyWithoutProvinceNestedInput
    country?: CountryUpdateOneRequiredWithoutProvincesNestedInput
    addresses?: AddressUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateWithoutAdministrativeRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
    districts?: AddressDistrictsUncheckedUpdateManyWithoutProvinceNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutVnProvinceNestedInput
  }

  export type AddressProvincesUncheckedUpdateManyWithoutAdministrativeRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameEn?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    fullNameEn?: StringFieldUpdateOperationsInput | string
    administrativeUnitId?: StringFieldUpdateOperationsInput | string
    countryId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}