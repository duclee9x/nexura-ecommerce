
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
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderNote
 * 
 */
export type OrderNote = $Result.DefaultSelection<Prisma.$OrderNotePayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Shipping
 * 
 */
export type Shipping = $Result.DefaultSelection<Prisma.$ShippingPayload>
/**
 * Model Tracking
 * 
 */
export type Tracking = $Result.DefaultSelection<Prisma.$TrackingPayload>
/**
 * Model TrackingEvent
 * 
 */
export type TrackingEvent = $Result.DefaultSelection<Prisma.$TrackingEventPayload>
/**
 * Model Coordinates
 * 
 */
export type Coordinates = $Result.DefaultSelection<Prisma.$CoordinatesPayload>
/**
 * Model Point
 * 
 */
export type Point = $Result.DefaultSelection<Prisma.$PointPayload>
/**
 * Model OrderStatusHistory
 * 
 */
export type OrderStatusHistory = $Result.DefaultSelection<Prisma.$OrderStatusHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  ORDER_PENDING: 'ORDER_PENDING',
  ORDER_PROCESSING: 'ORDER_PROCESSING',
  ORDER_SHIPPED: 'ORDER_SHIPPED',
  ORDER_COMPENSATING: 'ORDER_COMPENSATING',
  ORDER_DELIVERED: 'ORDER_DELIVERED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_COMPLETED: 'ORDER_COMPLETED',
  ORDER_FAILED: 'ORDER_FAILED',
  ORDER_REFUNDED: 'ORDER_REFUNDED',
  ORDER_EXPIRED: 'ORDER_EXPIRED',
  ORDER_ON_HOLD: 'ORDER_ON_HOLD',
  ORDER_PAYMENT_PAID: 'ORDER_PAYMENT_PAID',
  ORDER_TRACKING_UPDATED: 'ORDER_TRACKING_UPDATED',
  ORDER_NOTE_ADDED: 'ORDER_NOTE_ADDED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Orders
 * const orders = await prisma.order.findMany()
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
   * // Fetch zero or more Orders
   * const orders = await prisma.order.findMany()
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
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderNote`: Exposes CRUD operations for the **OrderNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderNotes
    * const orderNotes = await prisma.orderNote.findMany()
    * ```
    */
  get orderNote(): Prisma.OrderNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shipping`: Exposes CRUD operations for the **Shipping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shippings
    * const shippings = await prisma.shipping.findMany()
    * ```
    */
  get shipping(): Prisma.ShippingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tracking`: Exposes CRUD operations for the **Tracking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trackings
    * const trackings = await prisma.tracking.findMany()
    * ```
    */
  get tracking(): Prisma.TrackingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trackingEvent`: Exposes CRUD operations for the **TrackingEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackingEvents
    * const trackingEvents = await prisma.trackingEvent.findMany()
    * ```
    */
  get trackingEvent(): Prisma.TrackingEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.coordinates`: Exposes CRUD operations for the **Coordinates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coordinates
    * const coordinates = await prisma.coordinates.findMany()
    * ```
    */
  get coordinates(): Prisma.CoordinatesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.point`: Exposes CRUD operations for the **Point** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Points
    * const points = await prisma.point.findMany()
    * ```
    */
  get point(): Prisma.PointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderStatusHistory`: Exposes CRUD operations for the **OrderStatusHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderStatusHistories
    * const orderStatusHistories = await prisma.orderStatusHistory.findMany()
    * ```
    */
  get orderStatusHistory(): Prisma.OrderStatusHistoryDelegate<ExtArgs, ClientOptions>;
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
    Order: 'Order',
    OrderNote: 'OrderNote',
    OrderItem: 'OrderItem',
    Shipping: 'Shipping',
    Tracking: 'Tracking',
    TrackingEvent: 'TrackingEvent',
    Coordinates: 'Coordinates',
    Point: 'Point',
    OrderStatusHistory: 'OrderStatusHistory'
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
      modelProps: "order" | "orderNote" | "orderItem" | "shipping" | "tracking" | "trackingEvent" | "coordinates" | "point" | "orderStatusHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderNote: {
        payload: Prisma.$OrderNotePayload<ExtArgs>
        fields: Prisma.OrderNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          findFirst: {
            args: Prisma.OrderNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          findMany: {
            args: Prisma.OrderNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>[]
          }
          create: {
            args: Prisma.OrderNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          createMany: {
            args: Prisma.OrderNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          update: {
            args: Prisma.OrderNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          deleteMany: {
            args: Prisma.OrderNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderNotePayload>
          }
          aggregate: {
            args: Prisma.OrderNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderNote>
          }
          groupBy: {
            args: Prisma.OrderNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderNoteCountArgs<ExtArgs>
            result: $Utils.Optional<OrderNoteCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Shipping: {
        payload: Prisma.$ShippingPayload<ExtArgs>
        fields: Prisma.ShippingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShippingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShippingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          findFirst: {
            args: Prisma.ShippingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShippingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          findMany: {
            args: Prisma.ShippingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>[]
          }
          create: {
            args: Prisma.ShippingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          createMany: {
            args: Prisma.ShippingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ShippingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          update: {
            args: Prisma.ShippingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          deleteMany: {
            args: Prisma.ShippingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShippingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShippingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShippingPayload>
          }
          aggregate: {
            args: Prisma.ShippingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipping>
          }
          groupBy: {
            args: Prisma.ShippingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShippingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShippingCountArgs<ExtArgs>
            result: $Utils.Optional<ShippingCountAggregateOutputType> | number
          }
        }
      }
      Tracking: {
        payload: Prisma.$TrackingPayload<ExtArgs>
        fields: Prisma.TrackingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findFirst: {
            args: Prisma.TrackingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          findMany: {
            args: Prisma.TrackingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>[]
          }
          create: {
            args: Prisma.TrackingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          createMany: {
            args: Prisma.TrackingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TrackingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          update: {
            args: Prisma.TrackingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          deleteMany: {
            args: Prisma.TrackingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingPayload>
          }
          aggregate: {
            args: Prisma.TrackingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTracking>
          }
          groupBy: {
            args: Prisma.TrackingGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingCountAggregateOutputType> | number
          }
        }
      }
      TrackingEvent: {
        payload: Prisma.$TrackingEventPayload<ExtArgs>
        fields: Prisma.TrackingEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          findFirst: {
            args: Prisma.TrackingEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          findMany: {
            args: Prisma.TrackingEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>[]
          }
          create: {
            args: Prisma.TrackingEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          createMany: {
            args: Prisma.TrackingEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TrackingEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          update: {
            args: Prisma.TrackingEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          deleteMany: {
            args: Prisma.TrackingEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TrackingEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          aggregate: {
            args: Prisma.TrackingEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackingEvent>
          }
          groupBy: {
            args: Prisma.TrackingEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingEventCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingEventCountAggregateOutputType> | number
          }
        }
      }
      Coordinates: {
        payload: Prisma.$CoordinatesPayload<ExtArgs>
        fields: Prisma.CoordinatesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CoordinatesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CoordinatesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          findFirst: {
            args: Prisma.CoordinatesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CoordinatesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          findMany: {
            args: Prisma.CoordinatesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>[]
          }
          create: {
            args: Prisma.CoordinatesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          createMany: {
            args: Prisma.CoordinatesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CoordinatesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          update: {
            args: Prisma.CoordinatesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          deleteMany: {
            args: Prisma.CoordinatesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CoordinatesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CoordinatesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoordinatesPayload>
          }
          aggregate: {
            args: Prisma.CoordinatesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCoordinates>
          }
          groupBy: {
            args: Prisma.CoordinatesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CoordinatesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CoordinatesCountArgs<ExtArgs>
            result: $Utils.Optional<CoordinatesCountAggregateOutputType> | number
          }
        }
      }
      Point: {
        payload: Prisma.$PointPayload<ExtArgs>
        fields: Prisma.PointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          findFirst: {
            args: Prisma.PointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          findMany: {
            args: Prisma.PointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>[]
          }
          create: {
            args: Prisma.PointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          createMany: {
            args: Prisma.PointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          update: {
            args: Prisma.PointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          deleteMany: {
            args: Prisma.PointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointPayload>
          }
          aggregate: {
            args: Prisma.PointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoint>
          }
          groupBy: {
            args: Prisma.PointGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointCountArgs<ExtArgs>
            result: $Utils.Optional<PointCountAggregateOutputType> | number
          }
        }
      }
      OrderStatusHistory: {
        payload: Prisma.$OrderStatusHistoryPayload<ExtArgs>
        fields: Prisma.OrderStatusHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderStatusHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          findFirst: {
            args: Prisma.OrderStatusHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          findMany: {
            args: Prisma.OrderStatusHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>[]
          }
          create: {
            args: Prisma.OrderStatusHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          createMany: {
            args: Prisma.OrderStatusHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderStatusHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          update: {
            args: Prisma.OrderStatusHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          deleteMany: {
            args: Prisma.OrderStatusHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderStatusHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderStatusHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderStatusHistoryPayload>
          }
          aggregate: {
            args: Prisma.OrderStatusHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderStatusHistory>
          }
          groupBy: {
            args: Prisma.OrderStatusHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderStatusHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OrderStatusHistoryCountAggregateOutputType> | number
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
    order?: OrderOmit
    orderNote?: OrderNoteOmit
    orderItem?: OrderItemOmit
    shipping?: ShippingOmit
    tracking?: TrackingOmit
    trackingEvent?: TrackingEventOmit
    coordinates?: CoordinatesOmit
    point?: PointOmit
    orderStatusHistory?: OrderStatusHistoryOmit
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
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    notes: number
    items: number
    statusHistory: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | OrderCountOutputTypeCountNotesArgs
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    statusHistory?: boolean | OrderCountOutputTypeCountStatusHistoryArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderNoteWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusHistoryWhereInput
  }


  /**
   * Count Type TrackingCountOutputType
   */

  export type TrackingCountOutputType = {
    history: number
  }

  export type TrackingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | TrackingCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * TrackingCountOutputType without action
   */
  export type TrackingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingCountOutputType
     */
    select?: TrackingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TrackingCountOutputType without action
   */
  export type TrackingCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.OrderStatus | null
    totalAmount: number | null
    shippingAddressId: string | null
    paymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    status: $Enums.OrderStatus | null
    totalAmount: number | null
    shippingAddressId: string | null
    paymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    status: number
    totalAmount: number
    shippingAddressId: number
    paymentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalAmount?: true
    shippingAddressId?: true
    paymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalAmount?: true
    shippingAddressId?: true
    paymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    status?: true
    totalAmount?: true
    shippingAddressId?: true
    paymentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    status: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    status?: boolean
    totalAmount?: boolean
    shippingAddressId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    notes?: boolean | Order$notesArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    shipping?: boolean | Order$shippingArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    status?: boolean
    totalAmount?: boolean
    shippingAddressId?: boolean
    paymentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "status" | "totalAmount" | "shippingAddressId" | "paymentId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | Order$notesArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    statusHistory?: boolean | Order$statusHistoryArgs<ExtArgs>
    shipping?: boolean | Order$shippingArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      notes: Prisma.$OrderNotePayload<ExtArgs>[]
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      statusHistory: Prisma.$OrderStatusHistoryPayload<ExtArgs>[]
      shipping: Prisma.$ShippingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      status: $Enums.OrderStatus
      totalAmount: number
      shippingAddressId: string
      paymentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends Order$notesArgs<ExtArgs> = {}>(args?: Subset<T, Order$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    statusHistory<T extends Order$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Order$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shipping<T extends Order$shippingArgs<ExtArgs> = {}>(args?: Subset<T, Order$shippingArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly shippingAddressId: FieldRef<"Order", 'String'>
    readonly paymentId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.notes
   */
  export type Order$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    where?: OrderNoteWhereInput
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    cursor?: OrderNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.statusHistory
   */
  export type Order$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    where?: OrderStatusHistoryWhereInput
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    cursor?: OrderStatusHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * Order.shipping
   */
  export type Order$shippingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    where?: ShippingWhereInput
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderNote
   */

  export type AggregateOrderNote = {
    _count: OrderNoteCountAggregateOutputType | null
    _min: OrderNoteMinAggregateOutputType | null
    _max: OrderNoteMaxAggregateOutputType | null
  }

  export type OrderNoteMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    note: string | null
    createdAt: Date | null
  }

  export type OrderNoteMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    note: string | null
    createdAt: Date | null
  }

  export type OrderNoteCountAggregateOutputType = {
    id: number
    orderId: number
    note: number
    createdAt: number
    _all: number
  }


  export type OrderNoteMinAggregateInputType = {
    id?: true
    orderId?: true
    note?: true
    createdAt?: true
  }

  export type OrderNoteMaxAggregateInputType = {
    id?: true
    orderId?: true
    note?: true
    createdAt?: true
  }

  export type OrderNoteCountAggregateInputType = {
    id?: true
    orderId?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type OrderNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderNote to aggregate.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderNotes
    **/
    _count?: true | OrderNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderNoteMaxAggregateInputType
  }

  export type GetOrderNoteAggregateType<T extends OrderNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderNote[P]>
      : GetScalarType<T[P], AggregateOrderNote[P]>
  }




  export type OrderNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderNoteWhereInput
    orderBy?: OrderNoteOrderByWithAggregationInput | OrderNoteOrderByWithAggregationInput[]
    by: OrderNoteScalarFieldEnum[] | OrderNoteScalarFieldEnum
    having?: OrderNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderNoteCountAggregateInputType | true
    _min?: OrderNoteMinAggregateInputType
    _max?: OrderNoteMaxAggregateInputType
  }

  export type OrderNoteGroupByOutputType = {
    id: string
    orderId: string
    note: string
    createdAt: Date
    _count: OrderNoteCountAggregateOutputType | null
    _min: OrderNoteMinAggregateOutputType | null
    _max: OrderNoteMaxAggregateOutputType | null
  }

  type GetOrderNoteGroupByPayload<T extends OrderNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderNoteGroupByOutputType[P]>
            : GetScalarType<T[P], OrderNoteGroupByOutputType[P]>
        }
      >
    >


  export type OrderNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    note?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderNote"]>



  export type OrderNoteSelectScalar = {
    id?: boolean
    orderId?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type OrderNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "note" | "createdAt", ExtArgs["result"]["orderNote"]>
  export type OrderNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderNote"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      note: string
      createdAt: Date
    }, ExtArgs["result"]["orderNote"]>
    composites: {}
  }

  type OrderNoteGetPayload<S extends boolean | null | undefined | OrderNoteDefaultArgs> = $Result.GetResult<Prisma.$OrderNotePayload, S>

  type OrderNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderNoteCountAggregateInputType | true
    }

  export interface OrderNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderNote'], meta: { name: 'OrderNote' } }
    /**
     * Find zero or one OrderNote that matches the filter.
     * @param {OrderNoteFindUniqueArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderNoteFindUniqueArgs>(args: SelectSubset<T, OrderNoteFindUniqueArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderNoteFindUniqueOrThrowArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindFirstArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderNoteFindFirstArgs>(args?: SelectSubset<T, OrderNoteFindFirstArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindFirstOrThrowArgs} args - Arguments to find a OrderNote
     * @example
     * // Get one OrderNote
     * const orderNote = await prisma.orderNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderNotes
     * const orderNotes = await prisma.orderNote.findMany()
     * 
     * // Get first 10 OrderNotes
     * const orderNotes = await prisma.orderNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderNoteWithIdOnly = await prisma.orderNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderNoteFindManyArgs>(args?: SelectSubset<T, OrderNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderNote.
     * @param {OrderNoteCreateArgs} args - Arguments to create a OrderNote.
     * @example
     * // Create one OrderNote
     * const OrderNote = await prisma.orderNote.create({
     *   data: {
     *     // ... data to create a OrderNote
     *   }
     * })
     * 
     */
    create<T extends OrderNoteCreateArgs>(args: SelectSubset<T, OrderNoteCreateArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderNotes.
     * @param {OrderNoteCreateManyArgs} args - Arguments to create many OrderNotes.
     * @example
     * // Create many OrderNotes
     * const orderNote = await prisma.orderNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderNoteCreateManyArgs>(args?: SelectSubset<T, OrderNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderNote.
     * @param {OrderNoteDeleteArgs} args - Arguments to delete one OrderNote.
     * @example
     * // Delete one OrderNote
     * const OrderNote = await prisma.orderNote.delete({
     *   where: {
     *     // ... filter to delete one OrderNote
     *   }
     * })
     * 
     */
    delete<T extends OrderNoteDeleteArgs>(args: SelectSubset<T, OrderNoteDeleteArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderNote.
     * @param {OrderNoteUpdateArgs} args - Arguments to update one OrderNote.
     * @example
     * // Update one OrderNote
     * const orderNote = await prisma.orderNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderNoteUpdateArgs>(args: SelectSubset<T, OrderNoteUpdateArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderNotes.
     * @param {OrderNoteDeleteManyArgs} args - Arguments to filter OrderNotes to delete.
     * @example
     * // Delete a few OrderNotes
     * const { count } = await prisma.orderNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderNoteDeleteManyArgs>(args?: SelectSubset<T, OrderNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderNotes
     * const orderNote = await prisma.orderNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderNoteUpdateManyArgs>(args: SelectSubset<T, OrderNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderNote.
     * @param {OrderNoteUpsertArgs} args - Arguments to update or create a OrderNote.
     * @example
     * // Update or create a OrderNote
     * const orderNote = await prisma.orderNote.upsert({
     *   create: {
     *     // ... data to create a OrderNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderNote we want to update
     *   }
     * })
     */
    upsert<T extends OrderNoteUpsertArgs>(args: SelectSubset<T, OrderNoteUpsertArgs<ExtArgs>>): Prisma__OrderNoteClient<$Result.GetResult<Prisma.$OrderNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteCountArgs} args - Arguments to filter OrderNotes to count.
     * @example
     * // Count the number of OrderNotes
     * const count = await prisma.orderNote.count({
     *   where: {
     *     // ... the filter for the OrderNotes we want to count
     *   }
     * })
    **/
    count<T extends OrderNoteCountArgs>(
      args?: Subset<T, OrderNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderNoteAggregateArgs>(args: Subset<T, OrderNoteAggregateArgs>): Prisma.PrismaPromise<GetOrderNoteAggregateType<T>>

    /**
     * Group by OrderNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderNoteGroupByArgs} args - Group by arguments.
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
      T extends OrderNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderNoteGroupByArgs['orderBy'] }
        : { orderBy?: OrderNoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderNote model
   */
  readonly fields: OrderNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderNote model
   */
  interface OrderNoteFieldRefs {
    readonly id: FieldRef<"OrderNote", 'String'>
    readonly orderId: FieldRef<"OrderNote", 'String'>
    readonly note: FieldRef<"OrderNote", 'String'>
    readonly createdAt: FieldRef<"OrderNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderNote findUnique
   */
  export type OrderNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote findUniqueOrThrow
   */
  export type OrderNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote findFirst
   */
  export type OrderNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderNotes.
     */
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote findFirstOrThrow
   */
  export type OrderNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNote to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderNotes.
     */
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote findMany
   */
  export type OrderNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter, which OrderNotes to fetch.
     */
    where?: OrderNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderNotes to fetch.
     */
    orderBy?: OrderNoteOrderByWithRelationInput | OrderNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderNotes.
     */
    cursor?: OrderNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderNotes.
     */
    skip?: number
    distinct?: OrderNoteScalarFieldEnum | OrderNoteScalarFieldEnum[]
  }

  /**
   * OrderNote create
   */
  export type OrderNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderNote.
     */
    data: XOR<OrderNoteCreateInput, OrderNoteUncheckedCreateInput>
  }

  /**
   * OrderNote createMany
   */
  export type OrderNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderNotes.
     */
    data: OrderNoteCreateManyInput | OrderNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderNote update
   */
  export type OrderNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderNote.
     */
    data: XOR<OrderNoteUpdateInput, OrderNoteUncheckedUpdateInput>
    /**
     * Choose, which OrderNote to update.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote updateMany
   */
  export type OrderNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderNotes.
     */
    data: XOR<OrderNoteUpdateManyMutationInput, OrderNoteUncheckedUpdateManyInput>
    /**
     * Filter which OrderNotes to update
     */
    where?: OrderNoteWhereInput
    /**
     * Limit how many OrderNotes to update.
     */
    limit?: number
  }

  /**
   * OrderNote upsert
   */
  export type OrderNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderNote to update in case it exists.
     */
    where: OrderNoteWhereUniqueInput
    /**
     * In case the OrderNote found by the `where` argument doesn't exist, create a new OrderNote with this data.
     */
    create: XOR<OrderNoteCreateInput, OrderNoteUncheckedCreateInput>
    /**
     * In case the OrderNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderNoteUpdateInput, OrderNoteUncheckedUpdateInput>
  }

  /**
   * OrderNote delete
   */
  export type OrderNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
    /**
     * Filter which OrderNote to delete.
     */
    where: OrderNoteWhereUniqueInput
  }

  /**
   * OrderNote deleteMany
   */
  export type OrderNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderNotes to delete
     */
    where?: OrderNoteWhereInput
    /**
     * Limit how many OrderNotes to delete.
     */
    limit?: number
  }

  /**
   * OrderNote without action
   */
  export type OrderNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderNote
     */
    select?: OrderNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderNote
     */
    omit?: OrderNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderNoteInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    variantId: string | null
    quantity: number | null
    productId: string | null
    productName: string | null
    productSlug: string | null
    variantName: string | null
    sku: string | null
    price: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    variantId: string | null
    quantity: number | null
    productId: string | null
    productName: string | null
    productSlug: string | null
    variantName: string | null
    sku: string | null
    price: number | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    variantId: number
    quantity: number
    productId: number
    productName: number
    productSlug: number
    variantName: number
    sku: number
    price: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    quantity?: true
    productId?: true
    productName?: true
    productSlug?: true
    variantName?: true
    sku?: true
    price?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    quantity?: true
    productId?: true
    productName?: true
    productSlug?: true
    variantName?: true
    sku?: true
    price?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    variantId?: true
    quantity?: true
    productId?: true
    productName?: true
    productSlug?: true
    variantName?: true
    sku?: true
    price?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt: Date
    updatedAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    variantId?: boolean
    quantity?: boolean
    productId?: boolean
    productName?: boolean
    productSlug?: boolean
    variantName?: boolean
    sku?: boolean
    price?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>



  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    variantId?: boolean
    quantity?: boolean
    productId?: boolean
    productName?: boolean
    productSlug?: boolean
    variantName?: boolean
    sku?: boolean
    price?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "variantId" | "quantity" | "productId" | "productName" | "productSlug" | "variantName" | "sku" | "price" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      variantId: string
      quantity: number
      productId: string
      productName: string
      productSlug: string
      variantName: string
      sku: string
      price: number
      image: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly variantId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly productName: FieldRef<"OrderItem", 'String'>
    readonly productSlug: FieldRef<"OrderItem", 'String'>
    readonly variantName: FieldRef<"OrderItem", 'String'>
    readonly sku: FieldRef<"OrderItem", 'String'>
    readonly price: FieldRef<"OrderItem", 'Float'>
    readonly image: FieldRef<"OrderItem", 'String'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Shipping
   */

  export type AggregateShipping = {
    _count: ShippingCountAggregateOutputType | null
    _avg: ShippingAvgAggregateOutputType | null
    _sum: ShippingSumAggregateOutputType | null
    _min: ShippingMinAggregateOutputType | null
    _max: ShippingMaxAggregateOutputType | null
  }

  export type ShippingAvgAggregateOutputType = {
    cost: number | null
  }

  export type ShippingSumAggregateOutputType = {
    cost: number | null
  }

  export type ShippingMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    method: string | null
    cost: number | null
    shippingAddressId: string | null
    estimatedDelivery: Date | null
    trackingId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShippingMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    method: string | null
    cost: number | null
    shippingAddressId: string | null
    estimatedDelivery: Date | null
    trackingId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShippingCountAggregateOutputType = {
    id: number
    orderId: number
    method: number
    cost: number
    shippingAddressId: number
    estimatedDelivery: number
    trackingId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShippingAvgAggregateInputType = {
    cost?: true
  }

  export type ShippingSumAggregateInputType = {
    cost?: true
  }

  export type ShippingMinAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    cost?: true
    shippingAddressId?: true
    estimatedDelivery?: true
    trackingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShippingMaxAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    cost?: true
    shippingAddressId?: true
    estimatedDelivery?: true
    trackingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShippingCountAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    cost?: true
    shippingAddressId?: true
    estimatedDelivery?: true
    trackingId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShippingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipping to aggregate.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shippings
    **/
    _count?: true | ShippingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShippingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShippingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShippingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShippingMaxAggregateInputType
  }

  export type GetShippingAggregateType<T extends ShippingAggregateArgs> = {
        [P in keyof T & keyof AggregateShipping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipping[P]>
      : GetScalarType<T[P], AggregateShipping[P]>
  }




  export type ShippingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShippingWhereInput
    orderBy?: ShippingOrderByWithAggregationInput | ShippingOrderByWithAggregationInput[]
    by: ShippingScalarFieldEnum[] | ShippingScalarFieldEnum
    having?: ShippingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShippingCountAggregateInputType | true
    _avg?: ShippingAvgAggregateInputType
    _sum?: ShippingSumAggregateInputType
    _min?: ShippingMinAggregateInputType
    _max?: ShippingMaxAggregateInputType
  }

  export type ShippingGroupByOutputType = {
    id: string
    orderId: string
    method: string
    cost: number
    shippingAddressId: string | null
    estimatedDelivery: Date | null
    trackingId: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: ShippingCountAggregateOutputType | null
    _avg: ShippingAvgAggregateOutputType | null
    _sum: ShippingSumAggregateOutputType | null
    _min: ShippingMinAggregateOutputType | null
    _max: ShippingMaxAggregateOutputType | null
  }

  type GetShippingGroupByPayload<T extends ShippingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShippingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShippingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShippingGroupByOutputType[P]>
            : GetScalarType<T[P], ShippingGroupByOutputType[P]>
        }
      >
    >


  export type ShippingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    method?: boolean
    cost?: boolean
    shippingAddressId?: boolean
    estimatedDelivery?: boolean
    trackingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    tracking?: boolean | TrackingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipping"]>



  export type ShippingSelectScalar = {
    id?: boolean
    orderId?: boolean
    method?: boolean
    cost?: boolean
    shippingAddressId?: boolean
    estimatedDelivery?: boolean
    trackingId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShippingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "method" | "cost" | "shippingAddressId" | "estimatedDelivery" | "trackingId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["shipping"]>
  export type ShippingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    tracking?: boolean | TrackingDefaultArgs<ExtArgs>
  }

  export type $ShippingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipping"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      tracking: Prisma.$TrackingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      method: string
      cost: number
      shippingAddressId: string | null
      estimatedDelivery: Date | null
      trackingId: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shipping"]>
    composites: {}
  }

  type ShippingGetPayload<S extends boolean | null | undefined | ShippingDefaultArgs> = $Result.GetResult<Prisma.$ShippingPayload, S>

  type ShippingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShippingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShippingCountAggregateInputType | true
    }

  export interface ShippingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipping'], meta: { name: 'Shipping' } }
    /**
     * Find zero or one Shipping that matches the filter.
     * @param {ShippingFindUniqueArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShippingFindUniqueArgs>(args: SelectSubset<T, ShippingFindUniqueArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shipping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShippingFindUniqueOrThrowArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShippingFindUniqueOrThrowArgs>(args: SelectSubset<T, ShippingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindFirstArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShippingFindFirstArgs>(args?: SelectSubset<T, ShippingFindFirstArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shipping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindFirstOrThrowArgs} args - Arguments to find a Shipping
     * @example
     * // Get one Shipping
     * const shipping = await prisma.shipping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShippingFindFirstOrThrowArgs>(args?: SelectSubset<T, ShippingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shippings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shippings
     * const shippings = await prisma.shipping.findMany()
     * 
     * // Get first 10 Shippings
     * const shippings = await prisma.shipping.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shippingWithIdOnly = await prisma.shipping.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShippingFindManyArgs>(args?: SelectSubset<T, ShippingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shipping.
     * @param {ShippingCreateArgs} args - Arguments to create a Shipping.
     * @example
     * // Create one Shipping
     * const Shipping = await prisma.shipping.create({
     *   data: {
     *     // ... data to create a Shipping
     *   }
     * })
     * 
     */
    create<T extends ShippingCreateArgs>(args: SelectSubset<T, ShippingCreateArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shippings.
     * @param {ShippingCreateManyArgs} args - Arguments to create many Shippings.
     * @example
     * // Create many Shippings
     * const shipping = await prisma.shipping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShippingCreateManyArgs>(args?: SelectSubset<T, ShippingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Shipping.
     * @param {ShippingDeleteArgs} args - Arguments to delete one Shipping.
     * @example
     * // Delete one Shipping
     * const Shipping = await prisma.shipping.delete({
     *   where: {
     *     // ... filter to delete one Shipping
     *   }
     * })
     * 
     */
    delete<T extends ShippingDeleteArgs>(args: SelectSubset<T, ShippingDeleteArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shipping.
     * @param {ShippingUpdateArgs} args - Arguments to update one Shipping.
     * @example
     * // Update one Shipping
     * const shipping = await prisma.shipping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShippingUpdateArgs>(args: SelectSubset<T, ShippingUpdateArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shippings.
     * @param {ShippingDeleteManyArgs} args - Arguments to filter Shippings to delete.
     * @example
     * // Delete a few Shippings
     * const { count } = await prisma.shipping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShippingDeleteManyArgs>(args?: SelectSubset<T, ShippingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shippings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shippings
     * const shipping = await prisma.shipping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShippingUpdateManyArgs>(args: SelectSubset<T, ShippingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shipping.
     * @param {ShippingUpsertArgs} args - Arguments to update or create a Shipping.
     * @example
     * // Update or create a Shipping
     * const shipping = await prisma.shipping.upsert({
     *   create: {
     *     // ... data to create a Shipping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipping we want to update
     *   }
     * })
     */
    upsert<T extends ShippingUpsertArgs>(args: SelectSubset<T, ShippingUpsertArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shippings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingCountArgs} args - Arguments to filter Shippings to count.
     * @example
     * // Count the number of Shippings
     * const count = await prisma.shipping.count({
     *   where: {
     *     // ... the filter for the Shippings we want to count
     *   }
     * })
    **/
    count<T extends ShippingCountArgs>(
      args?: Subset<T, ShippingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShippingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShippingAggregateArgs>(args: Subset<T, ShippingAggregateArgs>): Prisma.PrismaPromise<GetShippingAggregateType<T>>

    /**
     * Group by Shipping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShippingGroupByArgs} args - Group by arguments.
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
      T extends ShippingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShippingGroupByArgs['orderBy'] }
        : { orderBy?: ShippingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShippingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShippingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipping model
   */
  readonly fields: ShippingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShippingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tracking<T extends TrackingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrackingDefaultArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Shipping model
   */
  interface ShippingFieldRefs {
    readonly id: FieldRef<"Shipping", 'String'>
    readonly orderId: FieldRef<"Shipping", 'String'>
    readonly method: FieldRef<"Shipping", 'String'>
    readonly cost: FieldRef<"Shipping", 'Float'>
    readonly shippingAddressId: FieldRef<"Shipping", 'String'>
    readonly estimatedDelivery: FieldRef<"Shipping", 'DateTime'>
    readonly trackingId: FieldRef<"Shipping", 'String'>
    readonly status: FieldRef<"Shipping", 'String'>
    readonly createdAt: FieldRef<"Shipping", 'DateTime'>
    readonly updatedAt: FieldRef<"Shipping", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shipping findUnique
   */
  export type ShippingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping findUniqueOrThrow
   */
  export type ShippingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping findFirst
   */
  export type ShippingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shippings.
     */
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping findFirstOrThrow
   */
  export type ShippingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shipping to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shippings.
     */
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping findMany
   */
  export type ShippingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter, which Shippings to fetch.
     */
    where?: ShippingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shippings to fetch.
     */
    orderBy?: ShippingOrderByWithRelationInput | ShippingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shippings.
     */
    cursor?: ShippingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shippings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shippings.
     */
    skip?: number
    distinct?: ShippingScalarFieldEnum | ShippingScalarFieldEnum[]
  }

  /**
   * Shipping create
   */
  export type ShippingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The data needed to create a Shipping.
     */
    data: XOR<ShippingCreateInput, ShippingUncheckedCreateInput>
  }

  /**
   * Shipping createMany
   */
  export type ShippingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shippings.
     */
    data: ShippingCreateManyInput | ShippingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipping update
   */
  export type ShippingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The data needed to update a Shipping.
     */
    data: XOR<ShippingUpdateInput, ShippingUncheckedUpdateInput>
    /**
     * Choose, which Shipping to update.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping updateMany
   */
  export type ShippingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shippings.
     */
    data: XOR<ShippingUpdateManyMutationInput, ShippingUncheckedUpdateManyInput>
    /**
     * Filter which Shippings to update
     */
    where?: ShippingWhereInput
    /**
     * Limit how many Shippings to update.
     */
    limit?: number
  }

  /**
   * Shipping upsert
   */
  export type ShippingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * The filter to search for the Shipping to update in case it exists.
     */
    where: ShippingWhereUniqueInput
    /**
     * In case the Shipping found by the `where` argument doesn't exist, create a new Shipping with this data.
     */
    create: XOR<ShippingCreateInput, ShippingUncheckedCreateInput>
    /**
     * In case the Shipping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShippingUpdateInput, ShippingUncheckedUpdateInput>
  }

  /**
   * Shipping delete
   */
  export type ShippingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    /**
     * Filter which Shipping to delete.
     */
    where: ShippingWhereUniqueInput
  }

  /**
   * Shipping deleteMany
   */
  export type ShippingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shippings to delete
     */
    where?: ShippingWhereInput
    /**
     * Limit how many Shippings to delete.
     */
    limit?: number
  }

  /**
   * Shipping without action
   */
  export type ShippingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
  }


  /**
   * Model Tracking
   */

  export type AggregateTracking = {
    _count: TrackingCountAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  export type TrackingMinAggregateOutputType = {
    id: string | null
    number: string | null
    carrier: string | null
    status: string | null
    currentLocation: string | null
    coordinatesId: string | null
  }

  export type TrackingMaxAggregateOutputType = {
    id: string | null
    number: string | null
    carrier: string | null
    status: string | null
    currentLocation: string | null
    coordinatesId: string | null
  }

  export type TrackingCountAggregateOutputType = {
    id: number
    number: number
    carrier: number
    status: number
    currentLocation: number
    coordinatesId: number
    _all: number
  }


  export type TrackingMinAggregateInputType = {
    id?: true
    number?: true
    carrier?: true
    status?: true
    currentLocation?: true
    coordinatesId?: true
  }

  export type TrackingMaxAggregateInputType = {
    id?: true
    number?: true
    carrier?: true
    status?: true
    currentLocation?: true
    coordinatesId?: true
  }

  export type TrackingCountAggregateInputType = {
    id?: true
    number?: true
    carrier?: true
    status?: true
    currentLocation?: true
    coordinatesId?: true
    _all?: true
  }

  export type TrackingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracking to aggregate.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trackings
    **/
    _count?: true | TrackingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingMaxAggregateInputType
  }

  export type GetTrackingAggregateType<T extends TrackingAggregateArgs> = {
        [P in keyof T & keyof AggregateTracking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTracking[P]>
      : GetScalarType<T[P], AggregateTracking[P]>
  }




  export type TrackingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingWhereInput
    orderBy?: TrackingOrderByWithAggregationInput | TrackingOrderByWithAggregationInput[]
    by: TrackingScalarFieldEnum[] | TrackingScalarFieldEnum
    having?: TrackingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingCountAggregateInputType | true
    _min?: TrackingMinAggregateInputType
    _max?: TrackingMaxAggregateInputType
  }

  export type TrackingGroupByOutputType = {
    id: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinatesId: string | null
    _count: TrackingCountAggregateOutputType | null
    _min: TrackingMinAggregateOutputType | null
    _max: TrackingMaxAggregateOutputType | null
  }

  type GetTrackingGroupByPayload<T extends TrackingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingGroupByOutputType[P]>
        }
      >
    >


  export type TrackingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    carrier?: boolean
    status?: boolean
    currentLocation?: boolean
    coordinatesId?: boolean
    shipping?: boolean | Tracking$shippingArgs<ExtArgs>
    coordinates?: boolean | Tracking$coordinatesArgs<ExtArgs>
    history?: boolean | Tracking$historyArgs<ExtArgs>
    _count?: boolean | TrackingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tracking"]>



  export type TrackingSelectScalar = {
    id?: boolean
    number?: boolean
    carrier?: boolean
    status?: boolean
    currentLocation?: boolean
    coordinatesId?: boolean
  }

  export type TrackingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "number" | "carrier" | "status" | "currentLocation" | "coordinatesId", ExtArgs["result"]["tracking"]>
  export type TrackingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipping?: boolean | Tracking$shippingArgs<ExtArgs>
    coordinates?: boolean | Tracking$coordinatesArgs<ExtArgs>
    history?: boolean | Tracking$historyArgs<ExtArgs>
    _count?: boolean | TrackingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TrackingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tracking"
    objects: {
      shipping: Prisma.$ShippingPayload<ExtArgs> | null
      coordinates: Prisma.$CoordinatesPayload<ExtArgs> | null
      history: Prisma.$TrackingEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      carrier: string
      status: string
      currentLocation: string
      coordinatesId: string | null
    }, ExtArgs["result"]["tracking"]>
    composites: {}
  }

  type TrackingGetPayload<S extends boolean | null | undefined | TrackingDefaultArgs> = $Result.GetResult<Prisma.$TrackingPayload, S>

  type TrackingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackingCountAggregateInputType | true
    }

  export interface TrackingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tracking'], meta: { name: 'Tracking' } }
    /**
     * Find zero or one Tracking that matches the filter.
     * @param {TrackingFindUniqueArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingFindUniqueArgs>(args: SelectSubset<T, TrackingFindUniqueArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tracking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackingFindUniqueOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tracking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingFindFirstArgs>(args?: SelectSubset<T, TrackingFindFirstArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tracking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindFirstOrThrowArgs} args - Arguments to find a Tracking
     * @example
     * // Get one Tracking
     * const tracking = await prisma.tracking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trackings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trackings
     * const trackings = await prisma.tracking.findMany()
     * 
     * // Get first 10 Trackings
     * const trackings = await prisma.tracking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingWithIdOnly = await prisma.tracking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingFindManyArgs>(args?: SelectSubset<T, TrackingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tracking.
     * @param {TrackingCreateArgs} args - Arguments to create a Tracking.
     * @example
     * // Create one Tracking
     * const Tracking = await prisma.tracking.create({
     *   data: {
     *     // ... data to create a Tracking
     *   }
     * })
     * 
     */
    create<T extends TrackingCreateArgs>(args: SelectSubset<T, TrackingCreateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trackings.
     * @param {TrackingCreateManyArgs} args - Arguments to create many Trackings.
     * @example
     * // Create many Trackings
     * const tracking = await prisma.tracking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingCreateManyArgs>(args?: SelectSubset<T, TrackingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tracking.
     * @param {TrackingDeleteArgs} args - Arguments to delete one Tracking.
     * @example
     * // Delete one Tracking
     * const Tracking = await prisma.tracking.delete({
     *   where: {
     *     // ... filter to delete one Tracking
     *   }
     * })
     * 
     */
    delete<T extends TrackingDeleteArgs>(args: SelectSubset<T, TrackingDeleteArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tracking.
     * @param {TrackingUpdateArgs} args - Arguments to update one Tracking.
     * @example
     * // Update one Tracking
     * const tracking = await prisma.tracking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingUpdateArgs>(args: SelectSubset<T, TrackingUpdateArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trackings.
     * @param {TrackingDeleteManyArgs} args - Arguments to filter Trackings to delete.
     * @example
     * // Delete a few Trackings
     * const { count } = await prisma.tracking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingDeleteManyArgs>(args?: SelectSubset<T, TrackingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trackings
     * const tracking = await prisma.tracking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingUpdateManyArgs>(args: SelectSubset<T, TrackingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tracking.
     * @param {TrackingUpsertArgs} args - Arguments to update or create a Tracking.
     * @example
     * // Update or create a Tracking
     * const tracking = await prisma.tracking.upsert({
     *   create: {
     *     // ... data to create a Tracking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tracking we want to update
     *   }
     * })
     */
    upsert<T extends TrackingUpsertArgs>(args: SelectSubset<T, TrackingUpsertArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trackings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingCountArgs} args - Arguments to filter Trackings to count.
     * @example
     * // Count the number of Trackings
     * const count = await prisma.tracking.count({
     *   where: {
     *     // ... the filter for the Trackings we want to count
     *   }
     * })
    **/
    count<T extends TrackingCountArgs>(
      args?: Subset<T, TrackingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackingAggregateArgs>(args: Subset<T, TrackingAggregateArgs>): Prisma.PrismaPromise<GetTrackingAggregateType<T>>

    /**
     * Group by Tracking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingGroupByArgs} args - Group by arguments.
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
      T extends TrackingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingGroupByArgs['orderBy'] }
        : { orderBy?: TrackingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tracking model
   */
  readonly fields: TrackingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tracking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipping<T extends Tracking$shippingArgs<ExtArgs> = {}>(args?: Subset<T, Tracking$shippingArgs<ExtArgs>>): Prisma__ShippingClient<$Result.GetResult<Prisma.$ShippingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    coordinates<T extends Tracking$coordinatesArgs<ExtArgs> = {}>(args?: Subset<T, Tracking$coordinatesArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    history<T extends Tracking$historyArgs<ExtArgs> = {}>(args?: Subset<T, Tracking$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Tracking model
   */
  interface TrackingFieldRefs {
    readonly id: FieldRef<"Tracking", 'String'>
    readonly number: FieldRef<"Tracking", 'String'>
    readonly carrier: FieldRef<"Tracking", 'String'>
    readonly status: FieldRef<"Tracking", 'String'>
    readonly currentLocation: FieldRef<"Tracking", 'String'>
    readonly coordinatesId: FieldRef<"Tracking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tracking findUnique
   */
  export type TrackingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findUniqueOrThrow
   */
  export type TrackingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking findFirst
   */
  export type TrackingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findFirstOrThrow
   */
  export type TrackingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Tracking to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trackings.
     */
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking findMany
   */
  export type TrackingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter, which Trackings to fetch.
     */
    where?: TrackingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trackings to fetch.
     */
    orderBy?: TrackingOrderByWithRelationInput | TrackingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trackings.
     */
    cursor?: TrackingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trackings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trackings.
     */
    skip?: number
    distinct?: TrackingScalarFieldEnum | TrackingScalarFieldEnum[]
  }

  /**
   * Tracking create
   */
  export type TrackingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to create a Tracking.
     */
    data: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
  }

  /**
   * Tracking createMany
   */
  export type TrackingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trackings.
     */
    data: TrackingCreateManyInput | TrackingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tracking update
   */
  export type TrackingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The data needed to update a Tracking.
     */
    data: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
    /**
     * Choose, which Tracking to update.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking updateMany
   */
  export type TrackingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trackings.
     */
    data: XOR<TrackingUpdateManyMutationInput, TrackingUncheckedUpdateManyInput>
    /**
     * Filter which Trackings to update
     */
    where?: TrackingWhereInput
    /**
     * Limit how many Trackings to update.
     */
    limit?: number
  }

  /**
   * Tracking upsert
   */
  export type TrackingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * The filter to search for the Tracking to update in case it exists.
     */
    where: TrackingWhereUniqueInput
    /**
     * In case the Tracking found by the `where` argument doesn't exist, create a new Tracking with this data.
     */
    create: XOR<TrackingCreateInput, TrackingUncheckedCreateInput>
    /**
     * In case the Tracking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingUpdateInput, TrackingUncheckedUpdateInput>
  }

  /**
   * Tracking delete
   */
  export type TrackingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    /**
     * Filter which Tracking to delete.
     */
    where: TrackingWhereUniqueInput
  }

  /**
   * Tracking deleteMany
   */
  export type TrackingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trackings to delete
     */
    where?: TrackingWhereInput
    /**
     * Limit how many Trackings to delete.
     */
    limit?: number
  }

  /**
   * Tracking.shipping
   */
  export type Tracking$shippingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipping
     */
    select?: ShippingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shipping
     */
    omit?: ShippingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShippingInclude<ExtArgs> | null
    where?: ShippingWhereInput
  }

  /**
   * Tracking.coordinates
   */
  export type Tracking$coordinatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    where?: CoordinatesWhereInput
  }

  /**
   * Tracking.history
   */
  export type Tracking$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    where?: TrackingEventWhereInput
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    cursor?: TrackingEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * Tracking without action
   */
  export type TrackingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
  }


  /**
   * Model TrackingEvent
   */

  export type AggregateTrackingEvent = {
    _count: TrackingEventCountAggregateOutputType | null
    _min: TrackingEventMinAggregateOutputType | null
    _max: TrackingEventMaxAggregateOutputType | null
  }

  export type TrackingEventMinAggregateOutputType = {
    id: string | null
    trackingId: string | null
    date: Date | null
    time: Date | null
    location: string | null
    status: string | null
    description: string | null
  }

  export type TrackingEventMaxAggregateOutputType = {
    id: string | null
    trackingId: string | null
    date: Date | null
    time: Date | null
    location: string | null
    status: string | null
    description: string | null
  }

  export type TrackingEventCountAggregateOutputType = {
    id: number
    trackingId: number
    date: number
    time: number
    location: number
    status: number
    description: number
    _all: number
  }


  export type TrackingEventMinAggregateInputType = {
    id?: true
    trackingId?: true
    date?: true
    time?: true
    location?: true
    status?: true
    description?: true
  }

  export type TrackingEventMaxAggregateInputType = {
    id?: true
    trackingId?: true
    date?: true
    time?: true
    location?: true
    status?: true
    description?: true
  }

  export type TrackingEventCountAggregateInputType = {
    id?: true
    trackingId?: true
    date?: true
    time?: true
    location?: true
    status?: true
    description?: true
    _all?: true
  }

  export type TrackingEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingEvent to aggregate.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackingEvents
    **/
    _count?: true | TrackingEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingEventMaxAggregateInputType
  }

  export type GetTrackingEventAggregateType<T extends TrackingEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackingEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackingEvent[P]>
      : GetScalarType<T[P], AggregateTrackingEvent[P]>
  }




  export type TrackingEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingEventWhereInput
    orderBy?: TrackingEventOrderByWithAggregationInput | TrackingEventOrderByWithAggregationInput[]
    by: TrackingEventScalarFieldEnum[] | TrackingEventScalarFieldEnum
    having?: TrackingEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingEventCountAggregateInputType | true
    _min?: TrackingEventMinAggregateInputType
    _max?: TrackingEventMaxAggregateInputType
  }

  export type TrackingEventGroupByOutputType = {
    id: string
    trackingId: string
    date: Date
    time: Date
    location: string
    status: string
    description: string
    _count: TrackingEventCountAggregateOutputType | null
    _min: TrackingEventMinAggregateOutputType | null
    _max: TrackingEventMaxAggregateOutputType | null
  }

  type GetTrackingEventGroupByPayload<T extends TrackingEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingEventGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingEventGroupByOutputType[P]>
        }
      >
    >


  export type TrackingEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    trackingId?: boolean
    date?: boolean
    time?: boolean
    location?: boolean
    status?: boolean
    description?: boolean
    tracking?: boolean | TrackingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trackingEvent"]>



  export type TrackingEventSelectScalar = {
    id?: boolean
    trackingId?: boolean
    date?: boolean
    time?: boolean
    location?: boolean
    status?: boolean
    description?: boolean
  }

  export type TrackingEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "trackingId" | "date" | "time" | "location" | "status" | "description", ExtArgs["result"]["trackingEvent"]>
  export type TrackingEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tracking?: boolean | TrackingDefaultArgs<ExtArgs>
  }

  export type $TrackingEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackingEvent"
    objects: {
      tracking: Prisma.$TrackingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      trackingId: string
      date: Date
      time: Date
      location: string
      status: string
      description: string
    }, ExtArgs["result"]["trackingEvent"]>
    composites: {}
  }

  type TrackingEventGetPayload<S extends boolean | null | undefined | TrackingEventDefaultArgs> = $Result.GetResult<Prisma.$TrackingEventPayload, S>

  type TrackingEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackingEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackingEventCountAggregateInputType | true
    }

  export interface TrackingEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackingEvent'], meta: { name: 'TrackingEvent' } }
    /**
     * Find zero or one TrackingEvent that matches the filter.
     * @param {TrackingEventFindUniqueArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingEventFindUniqueArgs>(args: SelectSubset<T, TrackingEventFindUniqueArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackingEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackingEventFindUniqueOrThrowArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindFirstArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingEventFindFirstArgs>(args?: SelectSubset<T, TrackingEventFindFirstArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindFirstOrThrowArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackingEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackingEvents
     * const trackingEvents = await prisma.trackingEvent.findMany()
     * 
     * // Get first 10 TrackingEvents
     * const trackingEvents = await prisma.trackingEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingEventWithIdOnly = await prisma.trackingEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingEventFindManyArgs>(args?: SelectSubset<T, TrackingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackingEvent.
     * @param {TrackingEventCreateArgs} args - Arguments to create a TrackingEvent.
     * @example
     * // Create one TrackingEvent
     * const TrackingEvent = await prisma.trackingEvent.create({
     *   data: {
     *     // ... data to create a TrackingEvent
     *   }
     * })
     * 
     */
    create<T extends TrackingEventCreateArgs>(args: SelectSubset<T, TrackingEventCreateArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackingEvents.
     * @param {TrackingEventCreateManyArgs} args - Arguments to create many TrackingEvents.
     * @example
     * // Create many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingEventCreateManyArgs>(args?: SelectSubset<T, TrackingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TrackingEvent.
     * @param {TrackingEventDeleteArgs} args - Arguments to delete one TrackingEvent.
     * @example
     * // Delete one TrackingEvent
     * const TrackingEvent = await prisma.trackingEvent.delete({
     *   where: {
     *     // ... filter to delete one TrackingEvent
     *   }
     * })
     * 
     */
    delete<T extends TrackingEventDeleteArgs>(args: SelectSubset<T, TrackingEventDeleteArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackingEvent.
     * @param {TrackingEventUpdateArgs} args - Arguments to update one TrackingEvent.
     * @example
     * // Update one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingEventUpdateArgs>(args: SelectSubset<T, TrackingEventUpdateArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackingEvents.
     * @param {TrackingEventDeleteManyArgs} args - Arguments to filter TrackingEvents to delete.
     * @example
     * // Delete a few TrackingEvents
     * const { count } = await prisma.trackingEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingEventDeleteManyArgs>(args?: SelectSubset<T, TrackingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingEventUpdateManyArgs>(args: SelectSubset<T, TrackingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TrackingEvent.
     * @param {TrackingEventUpsertArgs} args - Arguments to update or create a TrackingEvent.
     * @example
     * // Update or create a TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.upsert({
     *   create: {
     *     // ... data to create a TrackingEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackingEvent we want to update
     *   }
     * })
     */
    upsert<T extends TrackingEventUpsertArgs>(args: SelectSubset<T, TrackingEventUpsertArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrackingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventCountArgs} args - Arguments to filter TrackingEvents to count.
     * @example
     * // Count the number of TrackingEvents
     * const count = await prisma.trackingEvent.count({
     *   where: {
     *     // ... the filter for the TrackingEvents we want to count
     *   }
     * })
    **/
    count<T extends TrackingEventCountArgs>(
      args?: Subset<T, TrackingEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrackingEventAggregateArgs>(args: Subset<T, TrackingEventAggregateArgs>): Prisma.PrismaPromise<GetTrackingEventAggregateType<T>>

    /**
     * Group by TrackingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventGroupByArgs} args - Group by arguments.
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
      T extends TrackingEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingEventGroupByArgs['orderBy'] }
        : { orderBy?: TrackingEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TrackingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackingEvent model
   */
  readonly fields: TrackingEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackingEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tracking<T extends TrackingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TrackingDefaultArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TrackingEvent model
   */
  interface TrackingEventFieldRefs {
    readonly id: FieldRef<"TrackingEvent", 'String'>
    readonly trackingId: FieldRef<"TrackingEvent", 'String'>
    readonly date: FieldRef<"TrackingEvent", 'DateTime'>
    readonly time: FieldRef<"TrackingEvent", 'DateTime'>
    readonly location: FieldRef<"TrackingEvent", 'String'>
    readonly status: FieldRef<"TrackingEvent", 'String'>
    readonly description: FieldRef<"TrackingEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TrackingEvent findUnique
   */
  export type TrackingEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent findUniqueOrThrow
   */
  export type TrackingEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent findFirst
   */
  export type TrackingEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingEvents.
     */
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent findFirstOrThrow
   */
  export type TrackingEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingEvents.
     */
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent findMany
   */
  export type TrackingEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter, which TrackingEvents to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent create
   */
  export type TrackingEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * The data needed to create a TrackingEvent.
     */
    data: XOR<TrackingEventCreateInput, TrackingEventUncheckedCreateInput>
  }

  /**
   * TrackingEvent createMany
   */
  export type TrackingEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackingEvents.
     */
    data: TrackingEventCreateManyInput | TrackingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackingEvent update
   */
  export type TrackingEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * The data needed to update a TrackingEvent.
     */
    data: XOR<TrackingEventUpdateInput, TrackingEventUncheckedUpdateInput>
    /**
     * Choose, which TrackingEvent to update.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent updateMany
   */
  export type TrackingEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackingEvents.
     */
    data: XOR<TrackingEventUpdateManyMutationInput, TrackingEventUncheckedUpdateManyInput>
    /**
     * Filter which TrackingEvents to update
     */
    where?: TrackingEventWhereInput
    /**
     * Limit how many TrackingEvents to update.
     */
    limit?: number
  }

  /**
   * TrackingEvent upsert
   */
  export type TrackingEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * The filter to search for the TrackingEvent to update in case it exists.
     */
    where: TrackingEventWhereUniqueInput
    /**
     * In case the TrackingEvent found by the `where` argument doesn't exist, create a new TrackingEvent with this data.
     */
    create: XOR<TrackingEventCreateInput, TrackingEventUncheckedCreateInput>
    /**
     * In case the TrackingEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingEventUpdateInput, TrackingEventUncheckedUpdateInput>
  }

  /**
   * TrackingEvent delete
   */
  export type TrackingEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
    /**
     * Filter which TrackingEvent to delete.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent deleteMany
   */
  export type TrackingEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingEvents to delete
     */
    where?: TrackingEventWhereInput
    /**
     * Limit how many TrackingEvents to delete.
     */
    limit?: number
  }

  /**
   * TrackingEvent without action
   */
  export type TrackingEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingEventInclude<ExtArgs> | null
  }


  /**
   * Model Coordinates
   */

  export type AggregateCoordinates = {
    _count: CoordinatesCountAggregateOutputType | null
    _min: CoordinatesMinAggregateOutputType | null
    _max: CoordinatesMaxAggregateOutputType | null
  }

  export type CoordinatesMinAggregateOutputType = {
    id: string | null
    originId: string | null
    currentId: string | null
    destinationId: string | null
  }

  export type CoordinatesMaxAggregateOutputType = {
    id: string | null
    originId: string | null
    currentId: string | null
    destinationId: string | null
  }

  export type CoordinatesCountAggregateOutputType = {
    id: number
    originId: number
    currentId: number
    destinationId: number
    _all: number
  }


  export type CoordinatesMinAggregateInputType = {
    id?: true
    originId?: true
    currentId?: true
    destinationId?: true
  }

  export type CoordinatesMaxAggregateInputType = {
    id?: true
    originId?: true
    currentId?: true
    destinationId?: true
  }

  export type CoordinatesCountAggregateInputType = {
    id?: true
    originId?: true
    currentId?: true
    destinationId?: true
    _all?: true
  }

  export type CoordinatesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coordinates to aggregate.
     */
    where?: CoordinatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinates to fetch.
     */
    orderBy?: CoordinatesOrderByWithRelationInput | CoordinatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CoordinatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Coordinates
    **/
    _count?: true | CoordinatesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoordinatesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoordinatesMaxAggregateInputType
  }

  export type GetCoordinatesAggregateType<T extends CoordinatesAggregateArgs> = {
        [P in keyof T & keyof AggregateCoordinates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoordinates[P]>
      : GetScalarType<T[P], AggregateCoordinates[P]>
  }




  export type CoordinatesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CoordinatesWhereInput
    orderBy?: CoordinatesOrderByWithAggregationInput | CoordinatesOrderByWithAggregationInput[]
    by: CoordinatesScalarFieldEnum[] | CoordinatesScalarFieldEnum
    having?: CoordinatesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoordinatesCountAggregateInputType | true
    _min?: CoordinatesMinAggregateInputType
    _max?: CoordinatesMaxAggregateInputType
  }

  export type CoordinatesGroupByOutputType = {
    id: string
    originId: string
    currentId: string
    destinationId: string
    _count: CoordinatesCountAggregateOutputType | null
    _min: CoordinatesMinAggregateOutputType | null
    _max: CoordinatesMaxAggregateOutputType | null
  }

  type GetCoordinatesGroupByPayload<T extends CoordinatesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CoordinatesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoordinatesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoordinatesGroupByOutputType[P]>
            : GetScalarType<T[P], CoordinatesGroupByOutputType[P]>
        }
      >
    >


  export type CoordinatesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originId?: boolean
    currentId?: boolean
    destinationId?: boolean
    current?: boolean | PointDefaultArgs<ExtArgs>
    destination?: boolean | PointDefaultArgs<ExtArgs>
    origin?: boolean | PointDefaultArgs<ExtArgs>
    tracking?: boolean | Coordinates$trackingArgs<ExtArgs>
  }, ExtArgs["result"]["coordinates"]>



  export type CoordinatesSelectScalar = {
    id?: boolean
    originId?: boolean
    currentId?: boolean
    destinationId?: boolean
  }

  export type CoordinatesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originId" | "currentId" | "destinationId", ExtArgs["result"]["coordinates"]>
  export type CoordinatesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    current?: boolean | PointDefaultArgs<ExtArgs>
    destination?: boolean | PointDefaultArgs<ExtArgs>
    origin?: boolean | PointDefaultArgs<ExtArgs>
    tracking?: boolean | Coordinates$trackingArgs<ExtArgs>
  }

  export type $CoordinatesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Coordinates"
    objects: {
      current: Prisma.$PointPayload<ExtArgs>
      destination: Prisma.$PointPayload<ExtArgs>
      origin: Prisma.$PointPayload<ExtArgs>
      tracking: Prisma.$TrackingPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originId: string
      currentId: string
      destinationId: string
    }, ExtArgs["result"]["coordinates"]>
    composites: {}
  }

  type CoordinatesGetPayload<S extends boolean | null | undefined | CoordinatesDefaultArgs> = $Result.GetResult<Prisma.$CoordinatesPayload, S>

  type CoordinatesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CoordinatesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CoordinatesCountAggregateInputType | true
    }

  export interface CoordinatesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Coordinates'], meta: { name: 'Coordinates' } }
    /**
     * Find zero or one Coordinates that matches the filter.
     * @param {CoordinatesFindUniqueArgs} args - Arguments to find a Coordinates
     * @example
     * // Get one Coordinates
     * const coordinates = await prisma.coordinates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CoordinatesFindUniqueArgs>(args: SelectSubset<T, CoordinatesFindUniqueArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coordinates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CoordinatesFindUniqueOrThrowArgs} args - Arguments to find a Coordinates
     * @example
     * // Get one Coordinates
     * const coordinates = await prisma.coordinates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CoordinatesFindUniqueOrThrowArgs>(args: SelectSubset<T, CoordinatesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coordinates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesFindFirstArgs} args - Arguments to find a Coordinates
     * @example
     * // Get one Coordinates
     * const coordinates = await prisma.coordinates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CoordinatesFindFirstArgs>(args?: SelectSubset<T, CoordinatesFindFirstArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coordinates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesFindFirstOrThrowArgs} args - Arguments to find a Coordinates
     * @example
     * // Get one Coordinates
     * const coordinates = await prisma.coordinates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CoordinatesFindFirstOrThrowArgs>(args?: SelectSubset<T, CoordinatesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coordinates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coordinates
     * const coordinates = await prisma.coordinates.findMany()
     * 
     * // Get first 10 Coordinates
     * const coordinates = await prisma.coordinates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coordinatesWithIdOnly = await prisma.coordinates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CoordinatesFindManyArgs>(args?: SelectSubset<T, CoordinatesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coordinates.
     * @param {CoordinatesCreateArgs} args - Arguments to create a Coordinates.
     * @example
     * // Create one Coordinates
     * const Coordinates = await prisma.coordinates.create({
     *   data: {
     *     // ... data to create a Coordinates
     *   }
     * })
     * 
     */
    create<T extends CoordinatesCreateArgs>(args: SelectSubset<T, CoordinatesCreateArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coordinates.
     * @param {CoordinatesCreateManyArgs} args - Arguments to create many Coordinates.
     * @example
     * // Create many Coordinates
     * const coordinates = await prisma.coordinates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CoordinatesCreateManyArgs>(args?: SelectSubset<T, CoordinatesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Coordinates.
     * @param {CoordinatesDeleteArgs} args - Arguments to delete one Coordinates.
     * @example
     * // Delete one Coordinates
     * const Coordinates = await prisma.coordinates.delete({
     *   where: {
     *     // ... filter to delete one Coordinates
     *   }
     * })
     * 
     */
    delete<T extends CoordinatesDeleteArgs>(args: SelectSubset<T, CoordinatesDeleteArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coordinates.
     * @param {CoordinatesUpdateArgs} args - Arguments to update one Coordinates.
     * @example
     * // Update one Coordinates
     * const coordinates = await prisma.coordinates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CoordinatesUpdateArgs>(args: SelectSubset<T, CoordinatesUpdateArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coordinates.
     * @param {CoordinatesDeleteManyArgs} args - Arguments to filter Coordinates to delete.
     * @example
     * // Delete a few Coordinates
     * const { count } = await prisma.coordinates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CoordinatesDeleteManyArgs>(args?: SelectSubset<T, CoordinatesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coordinates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coordinates
     * const coordinates = await prisma.coordinates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CoordinatesUpdateManyArgs>(args: SelectSubset<T, CoordinatesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Coordinates.
     * @param {CoordinatesUpsertArgs} args - Arguments to update or create a Coordinates.
     * @example
     * // Update or create a Coordinates
     * const coordinates = await prisma.coordinates.upsert({
     *   create: {
     *     // ... data to create a Coordinates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coordinates we want to update
     *   }
     * })
     */
    upsert<T extends CoordinatesUpsertArgs>(args: SelectSubset<T, CoordinatesUpsertArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coordinates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesCountArgs} args - Arguments to filter Coordinates to count.
     * @example
     * // Count the number of Coordinates
     * const count = await prisma.coordinates.count({
     *   where: {
     *     // ... the filter for the Coordinates we want to count
     *   }
     * })
    **/
    count<T extends CoordinatesCountArgs>(
      args?: Subset<T, CoordinatesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoordinatesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coordinates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CoordinatesAggregateArgs>(args: Subset<T, CoordinatesAggregateArgs>): Prisma.PrismaPromise<GetCoordinatesAggregateType<T>>

    /**
     * Group by Coordinates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoordinatesGroupByArgs} args - Group by arguments.
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
      T extends CoordinatesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoordinatesGroupByArgs['orderBy'] }
        : { orderBy?: CoordinatesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CoordinatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoordinatesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Coordinates model
   */
  readonly fields: CoordinatesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Coordinates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CoordinatesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    current<T extends PointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointDefaultArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    destination<T extends PointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointDefaultArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    origin<T extends PointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointDefaultArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tracking<T extends Coordinates$trackingArgs<ExtArgs> = {}>(args?: Subset<T, Coordinates$trackingArgs<ExtArgs>>): Prisma__TrackingClient<$Result.GetResult<Prisma.$TrackingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Coordinates model
   */
  interface CoordinatesFieldRefs {
    readonly id: FieldRef<"Coordinates", 'String'>
    readonly originId: FieldRef<"Coordinates", 'String'>
    readonly currentId: FieldRef<"Coordinates", 'String'>
    readonly destinationId: FieldRef<"Coordinates", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Coordinates findUnique
   */
  export type CoordinatesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter, which Coordinates to fetch.
     */
    where: CoordinatesWhereUniqueInput
  }

  /**
   * Coordinates findUniqueOrThrow
   */
  export type CoordinatesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter, which Coordinates to fetch.
     */
    where: CoordinatesWhereUniqueInput
  }

  /**
   * Coordinates findFirst
   */
  export type CoordinatesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter, which Coordinates to fetch.
     */
    where?: CoordinatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinates to fetch.
     */
    orderBy?: CoordinatesOrderByWithRelationInput | CoordinatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coordinates.
     */
    cursor?: CoordinatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coordinates.
     */
    distinct?: CoordinatesScalarFieldEnum | CoordinatesScalarFieldEnum[]
  }

  /**
   * Coordinates findFirstOrThrow
   */
  export type CoordinatesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter, which Coordinates to fetch.
     */
    where?: CoordinatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinates to fetch.
     */
    orderBy?: CoordinatesOrderByWithRelationInput | CoordinatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Coordinates.
     */
    cursor?: CoordinatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Coordinates.
     */
    distinct?: CoordinatesScalarFieldEnum | CoordinatesScalarFieldEnum[]
  }

  /**
   * Coordinates findMany
   */
  export type CoordinatesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter, which Coordinates to fetch.
     */
    where?: CoordinatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Coordinates to fetch.
     */
    orderBy?: CoordinatesOrderByWithRelationInput | CoordinatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Coordinates.
     */
    cursor?: CoordinatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Coordinates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Coordinates.
     */
    skip?: number
    distinct?: CoordinatesScalarFieldEnum | CoordinatesScalarFieldEnum[]
  }

  /**
   * Coordinates create
   */
  export type CoordinatesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * The data needed to create a Coordinates.
     */
    data: XOR<CoordinatesCreateInput, CoordinatesUncheckedCreateInput>
  }

  /**
   * Coordinates createMany
   */
  export type CoordinatesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Coordinates.
     */
    data: CoordinatesCreateManyInput | CoordinatesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Coordinates update
   */
  export type CoordinatesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * The data needed to update a Coordinates.
     */
    data: XOR<CoordinatesUpdateInput, CoordinatesUncheckedUpdateInput>
    /**
     * Choose, which Coordinates to update.
     */
    where: CoordinatesWhereUniqueInput
  }

  /**
   * Coordinates updateMany
   */
  export type CoordinatesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Coordinates.
     */
    data: XOR<CoordinatesUpdateManyMutationInput, CoordinatesUncheckedUpdateManyInput>
    /**
     * Filter which Coordinates to update
     */
    where?: CoordinatesWhereInput
    /**
     * Limit how many Coordinates to update.
     */
    limit?: number
  }

  /**
   * Coordinates upsert
   */
  export type CoordinatesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * The filter to search for the Coordinates to update in case it exists.
     */
    where: CoordinatesWhereUniqueInput
    /**
     * In case the Coordinates found by the `where` argument doesn't exist, create a new Coordinates with this data.
     */
    create: XOR<CoordinatesCreateInput, CoordinatesUncheckedCreateInput>
    /**
     * In case the Coordinates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CoordinatesUpdateInput, CoordinatesUncheckedUpdateInput>
  }

  /**
   * Coordinates delete
   */
  export type CoordinatesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    /**
     * Filter which Coordinates to delete.
     */
    where: CoordinatesWhereUniqueInput
  }

  /**
   * Coordinates deleteMany
   */
  export type CoordinatesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Coordinates to delete
     */
    where?: CoordinatesWhereInput
    /**
     * Limit how many Coordinates to delete.
     */
    limit?: number
  }

  /**
   * Coordinates.tracking
   */
  export type Coordinates$trackingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracking
     */
    select?: TrackingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tracking
     */
    omit?: TrackingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackingInclude<ExtArgs> | null
    where?: TrackingWhereInput
  }

  /**
   * Coordinates without action
   */
  export type CoordinatesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
  }


  /**
   * Model Point
   */

  export type AggregatePoint = {
    _count: PointCountAggregateOutputType | null
    _avg: PointAvgAggregateOutputType | null
    _sum: PointSumAggregateOutputType | null
    _min: PointMinAggregateOutputType | null
    _max: PointMaxAggregateOutputType | null
  }

  export type PointAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type PointSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type PointMinAggregateOutputType = {
    id: string | null
    lat: number | null
    lng: number | null
  }

  export type PointMaxAggregateOutputType = {
    id: string | null
    lat: number | null
    lng: number | null
  }

  export type PointCountAggregateOutputType = {
    id: number
    lat: number
    lng: number
    _all: number
  }


  export type PointAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type PointSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type PointMinAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PointMaxAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
  }

  export type PointCountAggregateInputType = {
    id?: true
    lat?: true
    lng?: true
    _all?: true
  }

  export type PointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Point to aggregate.
     */
    where?: PointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Points to fetch.
     */
    orderBy?: PointOrderByWithRelationInput | PointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Points from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Points.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Points
    **/
    _count?: true | PointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointMaxAggregateInputType
  }

  export type GetPointAggregateType<T extends PointAggregateArgs> = {
        [P in keyof T & keyof AggregatePoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoint[P]>
      : GetScalarType<T[P], AggregatePoint[P]>
  }




  export type PointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointWhereInput
    orderBy?: PointOrderByWithAggregationInput | PointOrderByWithAggregationInput[]
    by: PointScalarFieldEnum[] | PointScalarFieldEnum
    having?: PointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointCountAggregateInputType | true
    _avg?: PointAvgAggregateInputType
    _sum?: PointSumAggregateInputType
    _min?: PointMinAggregateInputType
    _max?: PointMaxAggregateInputType
  }

  export type PointGroupByOutputType = {
    id: string
    lat: number
    lng: number
    _count: PointCountAggregateOutputType | null
    _avg: PointAvgAggregateOutputType | null
    _sum: PointSumAggregateOutputType | null
    _min: PointMinAggregateOutputType | null
    _max: PointMaxAggregateOutputType | null
  }

  type GetPointGroupByPayload<T extends PointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointGroupByOutputType[P]>
            : GetScalarType<T[P], PointGroupByOutputType[P]>
        }
      >
    >


  export type PointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lat?: boolean
    lng?: boolean
    currentFor?: boolean | Point$currentForArgs<ExtArgs>
    destinationFor?: boolean | Point$destinationForArgs<ExtArgs>
    originFor?: boolean | Point$originForArgs<ExtArgs>
  }, ExtArgs["result"]["point"]>



  export type PointSelectScalar = {
    id?: boolean
    lat?: boolean
    lng?: boolean
  }

  export type PointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "lat" | "lng", ExtArgs["result"]["point"]>
  export type PointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    currentFor?: boolean | Point$currentForArgs<ExtArgs>
    destinationFor?: boolean | Point$destinationForArgs<ExtArgs>
    originFor?: boolean | Point$originForArgs<ExtArgs>
  }

  export type $PointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Point"
    objects: {
      currentFor: Prisma.$CoordinatesPayload<ExtArgs> | null
      destinationFor: Prisma.$CoordinatesPayload<ExtArgs> | null
      originFor: Prisma.$CoordinatesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      lat: number
      lng: number
    }, ExtArgs["result"]["point"]>
    composites: {}
  }

  type PointGetPayload<S extends boolean | null | undefined | PointDefaultArgs> = $Result.GetResult<Prisma.$PointPayload, S>

  type PointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PointCountAggregateInputType | true
    }

  export interface PointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Point'], meta: { name: 'Point' } }
    /**
     * Find zero or one Point that matches the filter.
     * @param {PointFindUniqueArgs} args - Arguments to find a Point
     * @example
     * // Get one Point
     * const point = await prisma.point.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointFindUniqueArgs>(args: SelectSubset<T, PointFindUniqueArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Point that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PointFindUniqueOrThrowArgs} args - Arguments to find a Point
     * @example
     * // Get one Point
     * const point = await prisma.point.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointFindUniqueOrThrowArgs>(args: SelectSubset<T, PointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Point that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointFindFirstArgs} args - Arguments to find a Point
     * @example
     * // Get one Point
     * const point = await prisma.point.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointFindFirstArgs>(args?: SelectSubset<T, PointFindFirstArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Point that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointFindFirstOrThrowArgs} args - Arguments to find a Point
     * @example
     * // Get one Point
     * const point = await prisma.point.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointFindFirstOrThrowArgs>(args?: SelectSubset<T, PointFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Points that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Points
     * const points = await prisma.point.findMany()
     * 
     * // Get first 10 Points
     * const points = await prisma.point.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointWithIdOnly = await prisma.point.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointFindManyArgs>(args?: SelectSubset<T, PointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Point.
     * @param {PointCreateArgs} args - Arguments to create a Point.
     * @example
     * // Create one Point
     * const Point = await prisma.point.create({
     *   data: {
     *     // ... data to create a Point
     *   }
     * })
     * 
     */
    create<T extends PointCreateArgs>(args: SelectSubset<T, PointCreateArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Points.
     * @param {PointCreateManyArgs} args - Arguments to create many Points.
     * @example
     * // Create many Points
     * const point = await prisma.point.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointCreateManyArgs>(args?: SelectSubset<T, PointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Point.
     * @param {PointDeleteArgs} args - Arguments to delete one Point.
     * @example
     * // Delete one Point
     * const Point = await prisma.point.delete({
     *   where: {
     *     // ... filter to delete one Point
     *   }
     * })
     * 
     */
    delete<T extends PointDeleteArgs>(args: SelectSubset<T, PointDeleteArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Point.
     * @param {PointUpdateArgs} args - Arguments to update one Point.
     * @example
     * // Update one Point
     * const point = await prisma.point.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointUpdateArgs>(args: SelectSubset<T, PointUpdateArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Points.
     * @param {PointDeleteManyArgs} args - Arguments to filter Points to delete.
     * @example
     * // Delete a few Points
     * const { count } = await prisma.point.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointDeleteManyArgs>(args?: SelectSubset<T, PointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Points.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Points
     * const point = await prisma.point.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointUpdateManyArgs>(args: SelectSubset<T, PointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Point.
     * @param {PointUpsertArgs} args - Arguments to update or create a Point.
     * @example
     * // Update or create a Point
     * const point = await prisma.point.upsert({
     *   create: {
     *     // ... data to create a Point
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Point we want to update
     *   }
     * })
     */
    upsert<T extends PointUpsertArgs>(args: SelectSubset<T, PointUpsertArgs<ExtArgs>>): Prisma__PointClient<$Result.GetResult<Prisma.$PointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Points.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointCountArgs} args - Arguments to filter Points to count.
     * @example
     * // Count the number of Points
     * const count = await prisma.point.count({
     *   where: {
     *     // ... the filter for the Points we want to count
     *   }
     * })
    **/
    count<T extends PointCountArgs>(
      args?: Subset<T, PointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Point.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointAggregateArgs>(args: Subset<T, PointAggregateArgs>): Prisma.PrismaPromise<GetPointAggregateType<T>>

    /**
     * Group by Point.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointGroupByArgs} args - Group by arguments.
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
      T extends PointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointGroupByArgs['orderBy'] }
        : { orderBy?: PointGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Point model
   */
  readonly fields: PointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Point.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    currentFor<T extends Point$currentForArgs<ExtArgs> = {}>(args?: Subset<T, Point$currentForArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    destinationFor<T extends Point$destinationForArgs<ExtArgs> = {}>(args?: Subset<T, Point$destinationForArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    originFor<T extends Point$originForArgs<ExtArgs> = {}>(args?: Subset<T, Point$originForArgs<ExtArgs>>): Prisma__CoordinatesClient<$Result.GetResult<Prisma.$CoordinatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Point model
   */
  interface PointFieldRefs {
    readonly id: FieldRef<"Point", 'String'>
    readonly lat: FieldRef<"Point", 'Float'>
    readonly lng: FieldRef<"Point", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Point findUnique
   */
  export type PointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter, which Point to fetch.
     */
    where: PointWhereUniqueInput
  }

  /**
   * Point findUniqueOrThrow
   */
  export type PointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter, which Point to fetch.
     */
    where: PointWhereUniqueInput
  }

  /**
   * Point findFirst
   */
  export type PointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter, which Point to fetch.
     */
    where?: PointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Points to fetch.
     */
    orderBy?: PointOrderByWithRelationInput | PointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Points.
     */
    cursor?: PointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Points from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Points.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Points.
     */
    distinct?: PointScalarFieldEnum | PointScalarFieldEnum[]
  }

  /**
   * Point findFirstOrThrow
   */
  export type PointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter, which Point to fetch.
     */
    where?: PointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Points to fetch.
     */
    orderBy?: PointOrderByWithRelationInput | PointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Points.
     */
    cursor?: PointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Points from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Points.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Points.
     */
    distinct?: PointScalarFieldEnum | PointScalarFieldEnum[]
  }

  /**
   * Point findMany
   */
  export type PointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter, which Points to fetch.
     */
    where?: PointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Points to fetch.
     */
    orderBy?: PointOrderByWithRelationInput | PointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Points.
     */
    cursor?: PointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Points from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Points.
     */
    skip?: number
    distinct?: PointScalarFieldEnum | PointScalarFieldEnum[]
  }

  /**
   * Point create
   */
  export type PointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * The data needed to create a Point.
     */
    data: XOR<PointCreateInput, PointUncheckedCreateInput>
  }

  /**
   * Point createMany
   */
  export type PointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Points.
     */
    data: PointCreateManyInput | PointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Point update
   */
  export type PointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * The data needed to update a Point.
     */
    data: XOR<PointUpdateInput, PointUncheckedUpdateInput>
    /**
     * Choose, which Point to update.
     */
    where: PointWhereUniqueInput
  }

  /**
   * Point updateMany
   */
  export type PointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Points.
     */
    data: XOR<PointUpdateManyMutationInput, PointUncheckedUpdateManyInput>
    /**
     * Filter which Points to update
     */
    where?: PointWhereInput
    /**
     * Limit how many Points to update.
     */
    limit?: number
  }

  /**
   * Point upsert
   */
  export type PointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * The filter to search for the Point to update in case it exists.
     */
    where: PointWhereUniqueInput
    /**
     * In case the Point found by the `where` argument doesn't exist, create a new Point with this data.
     */
    create: XOR<PointCreateInput, PointUncheckedCreateInput>
    /**
     * In case the Point was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointUpdateInput, PointUncheckedUpdateInput>
  }

  /**
   * Point delete
   */
  export type PointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
    /**
     * Filter which Point to delete.
     */
    where: PointWhereUniqueInput
  }

  /**
   * Point deleteMany
   */
  export type PointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Points to delete
     */
    where?: PointWhereInput
    /**
     * Limit how many Points to delete.
     */
    limit?: number
  }

  /**
   * Point.currentFor
   */
  export type Point$currentForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    where?: CoordinatesWhereInput
  }

  /**
   * Point.destinationFor
   */
  export type Point$destinationForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    where?: CoordinatesWhereInput
  }

  /**
   * Point.originFor
   */
  export type Point$originForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coordinates
     */
    select?: CoordinatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Coordinates
     */
    omit?: CoordinatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CoordinatesInclude<ExtArgs> | null
    where?: CoordinatesWhereInput
  }

  /**
   * Point without action
   */
  export type PointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Point
     */
    select?: PointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Point
     */
    omit?: PointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointInclude<ExtArgs> | null
  }


  /**
   * Model OrderStatusHistory
   */

  export type AggregateOrderStatusHistory = {
    _count: OrderStatusHistoryCountAggregateOutputType | null
    _min: OrderStatusHistoryMinAggregateOutputType | null
    _max: OrderStatusHistoryMaxAggregateOutputType | null
  }

  export type OrderStatusHistoryMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.OrderStatus | null
    description: string | null
    createdAt: Date | null
  }

  export type OrderStatusHistoryMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: $Enums.OrderStatus | null
    description: string | null
    createdAt: Date | null
  }

  export type OrderStatusHistoryCountAggregateOutputType = {
    id: number
    orderId: number
    status: number
    description: number
    createdAt: number
    _all: number
  }


  export type OrderStatusHistoryMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    createdAt?: true
  }

  export type OrderStatusHistoryMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    createdAt?: true
  }

  export type OrderStatusHistoryCountAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type OrderStatusHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusHistory to aggregate.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderStatusHistories
    **/
    _count?: true | OrderStatusHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderStatusHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderStatusHistoryMaxAggregateInputType
  }

  export type GetOrderStatusHistoryAggregateType<T extends OrderStatusHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderStatusHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderStatusHistory[P]>
      : GetScalarType<T[P], AggregateOrderStatusHistory[P]>
  }




  export type OrderStatusHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderStatusHistoryWhereInput
    orderBy?: OrderStatusHistoryOrderByWithAggregationInput | OrderStatusHistoryOrderByWithAggregationInput[]
    by: OrderStatusHistoryScalarFieldEnum[] | OrderStatusHistoryScalarFieldEnum
    having?: OrderStatusHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderStatusHistoryCountAggregateInputType | true
    _min?: OrderStatusHistoryMinAggregateInputType
    _max?: OrderStatusHistoryMaxAggregateInputType
  }

  export type OrderStatusHistoryGroupByOutputType = {
    id: string
    orderId: string
    status: $Enums.OrderStatus
    description: string | null
    createdAt: Date
    _count: OrderStatusHistoryCountAggregateOutputType | null
    _min: OrderStatusHistoryMinAggregateOutputType | null
    _max: OrderStatusHistoryMaxAggregateOutputType | null
  }

  type GetOrderStatusHistoryGroupByPayload<T extends OrderStatusHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderStatusHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderStatusHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OrderStatusHistoryGroupByOutputType[P]>
        }
      >
    >


  export type OrderStatusHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderStatusHistory"]>



  export type OrderStatusHistorySelectScalar = {
    id?: boolean
    orderId?: boolean
    status?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type OrderStatusHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "status" | "description" | "createdAt", ExtArgs["result"]["orderStatusHistory"]>
  export type OrderStatusHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderStatusHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderStatusHistory"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      status: $Enums.OrderStatus
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["orderStatusHistory"]>
    composites: {}
  }

  type OrderStatusHistoryGetPayload<S extends boolean | null | undefined | OrderStatusHistoryDefaultArgs> = $Result.GetResult<Prisma.$OrderStatusHistoryPayload, S>

  type OrderStatusHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderStatusHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderStatusHistoryCountAggregateInputType | true
    }

  export interface OrderStatusHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderStatusHistory'], meta: { name: 'OrderStatusHistory' } }
    /**
     * Find zero or one OrderStatusHistory that matches the filter.
     * @param {OrderStatusHistoryFindUniqueArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderStatusHistoryFindUniqueArgs>(args: SelectSubset<T, OrderStatusHistoryFindUniqueArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderStatusHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderStatusHistoryFindUniqueOrThrowArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderStatusHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindFirstArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderStatusHistoryFindFirstArgs>(args?: SelectSubset<T, OrderStatusHistoryFindFirstArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderStatusHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindFirstOrThrowArgs} args - Arguments to find a OrderStatusHistory
     * @example
     * // Get one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderStatusHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderStatusHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderStatusHistories
     * const orderStatusHistories = await prisma.orderStatusHistory.findMany()
     * 
     * // Get first 10 OrderStatusHistories
     * const orderStatusHistories = await prisma.orderStatusHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderStatusHistoryWithIdOnly = await prisma.orderStatusHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderStatusHistoryFindManyArgs>(args?: SelectSubset<T, OrderStatusHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderStatusHistory.
     * @param {OrderStatusHistoryCreateArgs} args - Arguments to create a OrderStatusHistory.
     * @example
     * // Create one OrderStatusHistory
     * const OrderStatusHistory = await prisma.orderStatusHistory.create({
     *   data: {
     *     // ... data to create a OrderStatusHistory
     *   }
     * })
     * 
     */
    create<T extends OrderStatusHistoryCreateArgs>(args: SelectSubset<T, OrderStatusHistoryCreateArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderStatusHistories.
     * @param {OrderStatusHistoryCreateManyArgs} args - Arguments to create many OrderStatusHistories.
     * @example
     * // Create many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderStatusHistoryCreateManyArgs>(args?: SelectSubset<T, OrderStatusHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderStatusHistory.
     * @param {OrderStatusHistoryDeleteArgs} args - Arguments to delete one OrderStatusHistory.
     * @example
     * // Delete one OrderStatusHistory
     * const OrderStatusHistory = await prisma.orderStatusHistory.delete({
     *   where: {
     *     // ... filter to delete one OrderStatusHistory
     *   }
     * })
     * 
     */
    delete<T extends OrderStatusHistoryDeleteArgs>(args: SelectSubset<T, OrderStatusHistoryDeleteArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderStatusHistory.
     * @param {OrderStatusHistoryUpdateArgs} args - Arguments to update one OrderStatusHistory.
     * @example
     * // Update one OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderStatusHistoryUpdateArgs>(args: SelectSubset<T, OrderStatusHistoryUpdateArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderStatusHistories.
     * @param {OrderStatusHistoryDeleteManyArgs} args - Arguments to filter OrderStatusHistories to delete.
     * @example
     * // Delete a few OrderStatusHistories
     * const { count } = await prisma.orderStatusHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderStatusHistoryDeleteManyArgs>(args?: SelectSubset<T, OrderStatusHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderStatusHistories
     * const orderStatusHistory = await prisma.orderStatusHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderStatusHistoryUpdateManyArgs>(args: SelectSubset<T, OrderStatusHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderStatusHistory.
     * @param {OrderStatusHistoryUpsertArgs} args - Arguments to update or create a OrderStatusHistory.
     * @example
     * // Update or create a OrderStatusHistory
     * const orderStatusHistory = await prisma.orderStatusHistory.upsert({
     *   create: {
     *     // ... data to create a OrderStatusHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderStatusHistory we want to update
     *   }
     * })
     */
    upsert<T extends OrderStatusHistoryUpsertArgs>(args: SelectSubset<T, OrderStatusHistoryUpsertArgs<ExtArgs>>): Prisma__OrderStatusHistoryClient<$Result.GetResult<Prisma.$OrderStatusHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderStatusHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryCountArgs} args - Arguments to filter OrderStatusHistories to count.
     * @example
     * // Count the number of OrderStatusHistories
     * const count = await prisma.orderStatusHistory.count({
     *   where: {
     *     // ... the filter for the OrderStatusHistories we want to count
     *   }
     * })
    **/
    count<T extends OrderStatusHistoryCountArgs>(
      args?: Subset<T, OrderStatusHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderStatusHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderStatusHistoryAggregateArgs>(args: Subset<T, OrderStatusHistoryAggregateArgs>): Prisma.PrismaPromise<GetOrderStatusHistoryAggregateType<T>>

    /**
     * Group by OrderStatusHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderStatusHistoryGroupByArgs} args - Group by arguments.
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
      T extends OrderStatusHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderStatusHistoryGroupByArgs['orderBy'] }
        : { orderBy?: OrderStatusHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderStatusHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderStatusHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderStatusHistory model
   */
  readonly fields: OrderStatusHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderStatusHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderStatusHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderStatusHistory model
   */
  interface OrderStatusHistoryFieldRefs {
    readonly id: FieldRef<"OrderStatusHistory", 'String'>
    readonly orderId: FieldRef<"OrderStatusHistory", 'String'>
    readonly status: FieldRef<"OrderStatusHistory", 'OrderStatus'>
    readonly description: FieldRef<"OrderStatusHistory", 'String'>
    readonly createdAt: FieldRef<"OrderStatusHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderStatusHistory findUnique
   */
  export type OrderStatusHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory findUniqueOrThrow
   */
  export type OrderStatusHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory findFirst
   */
  export type OrderStatusHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusHistories.
     */
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory findFirstOrThrow
   */
  export type OrderStatusHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistory to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderStatusHistories.
     */
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory findMany
   */
  export type OrderStatusHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderStatusHistories to fetch.
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderStatusHistories to fetch.
     */
    orderBy?: OrderStatusHistoryOrderByWithRelationInput | OrderStatusHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderStatusHistories.
     */
    cursor?: OrderStatusHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderStatusHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderStatusHistories.
     */
    skip?: number
    distinct?: OrderStatusHistoryScalarFieldEnum | OrderStatusHistoryScalarFieldEnum[]
  }

  /**
   * OrderStatusHistory create
   */
  export type OrderStatusHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderStatusHistory.
     */
    data: XOR<OrderStatusHistoryCreateInput, OrderStatusHistoryUncheckedCreateInput>
  }

  /**
   * OrderStatusHistory createMany
   */
  export type OrderStatusHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderStatusHistories.
     */
    data: OrderStatusHistoryCreateManyInput | OrderStatusHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderStatusHistory update
   */
  export type OrderStatusHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderStatusHistory.
     */
    data: XOR<OrderStatusHistoryUpdateInput, OrderStatusHistoryUncheckedUpdateInput>
    /**
     * Choose, which OrderStatusHistory to update.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory updateMany
   */
  export type OrderStatusHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderStatusHistories.
     */
    data: XOR<OrderStatusHistoryUpdateManyMutationInput, OrderStatusHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderStatusHistories to update
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * Limit how many OrderStatusHistories to update.
     */
    limit?: number
  }

  /**
   * OrderStatusHistory upsert
   */
  export type OrderStatusHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderStatusHistory to update in case it exists.
     */
    where: OrderStatusHistoryWhereUniqueInput
    /**
     * In case the OrderStatusHistory found by the `where` argument doesn't exist, create a new OrderStatusHistory with this data.
     */
    create: XOR<OrderStatusHistoryCreateInput, OrderStatusHistoryUncheckedCreateInput>
    /**
     * In case the OrderStatusHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderStatusHistoryUpdateInput, OrderStatusHistoryUncheckedUpdateInput>
  }

  /**
   * OrderStatusHistory delete
   */
  export type OrderStatusHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
    /**
     * Filter which OrderStatusHistory to delete.
     */
    where: OrderStatusHistoryWhereUniqueInput
  }

  /**
   * OrderStatusHistory deleteMany
   */
  export type OrderStatusHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderStatusHistories to delete
     */
    where?: OrderStatusHistoryWhereInput
    /**
     * Limit how many OrderStatusHistories to delete.
     */
    limit?: number
  }

  /**
   * OrderStatusHistory without action
   */
  export type OrderStatusHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderStatusHistory
     */
    select?: OrderStatusHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderStatusHistory
     */
    omit?: OrderStatusHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderStatusHistoryInclude<ExtArgs> | null
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


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    status: 'status',
    totalAmount: 'totalAmount',
    shippingAddressId: 'shippingAddressId',
    paymentId: 'paymentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderNoteScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type OrderNoteScalarFieldEnum = (typeof OrderNoteScalarFieldEnum)[keyof typeof OrderNoteScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    variantId: 'variantId',
    quantity: 'quantity',
    productId: 'productId',
    productName: 'productName',
    productSlug: 'productSlug',
    variantName: 'variantName',
    sku: 'sku',
    price: 'price',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const ShippingScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    method: 'method',
    cost: 'cost',
    shippingAddressId: 'shippingAddressId',
    estimatedDelivery: 'estimatedDelivery',
    trackingId: 'trackingId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShippingScalarFieldEnum = (typeof ShippingScalarFieldEnum)[keyof typeof ShippingScalarFieldEnum]


  export const TrackingScalarFieldEnum: {
    id: 'id',
    number: 'number',
    carrier: 'carrier',
    status: 'status',
    currentLocation: 'currentLocation',
    coordinatesId: 'coordinatesId'
  };

  export type TrackingScalarFieldEnum = (typeof TrackingScalarFieldEnum)[keyof typeof TrackingScalarFieldEnum]


  export const TrackingEventScalarFieldEnum: {
    id: 'id',
    trackingId: 'trackingId',
    date: 'date',
    time: 'time',
    location: 'location',
    status: 'status',
    description: 'description'
  };

  export type TrackingEventScalarFieldEnum = (typeof TrackingEventScalarFieldEnum)[keyof typeof TrackingEventScalarFieldEnum]


  export const CoordinatesScalarFieldEnum: {
    id: 'id',
    originId: 'originId',
    currentId: 'currentId',
    destinationId: 'destinationId'
  };

  export type CoordinatesScalarFieldEnum = (typeof CoordinatesScalarFieldEnum)[keyof typeof CoordinatesScalarFieldEnum]


  export const PointScalarFieldEnum: {
    id: 'id',
    lat: 'lat',
    lng: 'lng'
  };

  export type PointScalarFieldEnum = (typeof PointScalarFieldEnum)[keyof typeof PointScalarFieldEnum]


  export const OrderStatusHistoryScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type OrderStatusHistoryScalarFieldEnum = (typeof OrderStatusHistoryScalarFieldEnum)[keyof typeof OrderStatusHistoryScalarFieldEnum]


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


  export const OrderOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    shippingAddressId: 'shippingAddressId',
    paymentId: 'paymentId'
  };

  export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum]


  export const OrderNoteOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    note: 'note'
  };

  export type OrderNoteOrderByRelevanceFieldEnum = (typeof OrderNoteOrderByRelevanceFieldEnum)[keyof typeof OrderNoteOrderByRelevanceFieldEnum]


  export const OrderItemOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    variantId: 'variantId',
    productId: 'productId',
    productName: 'productName',
    productSlug: 'productSlug',
    variantName: 'variantName',
    sku: 'sku',
    image: 'image'
  };

  export type OrderItemOrderByRelevanceFieldEnum = (typeof OrderItemOrderByRelevanceFieldEnum)[keyof typeof OrderItemOrderByRelevanceFieldEnum]


  export const ShippingOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    method: 'method',
    shippingAddressId: 'shippingAddressId',
    trackingId: 'trackingId',
    status: 'status'
  };

  export type ShippingOrderByRelevanceFieldEnum = (typeof ShippingOrderByRelevanceFieldEnum)[keyof typeof ShippingOrderByRelevanceFieldEnum]


  export const TrackingOrderByRelevanceFieldEnum: {
    id: 'id',
    number: 'number',
    carrier: 'carrier',
    status: 'status',
    currentLocation: 'currentLocation',
    coordinatesId: 'coordinatesId'
  };

  export type TrackingOrderByRelevanceFieldEnum = (typeof TrackingOrderByRelevanceFieldEnum)[keyof typeof TrackingOrderByRelevanceFieldEnum]


  export const TrackingEventOrderByRelevanceFieldEnum: {
    id: 'id',
    trackingId: 'trackingId',
    location: 'location',
    status: 'status',
    description: 'description'
  };

  export type TrackingEventOrderByRelevanceFieldEnum = (typeof TrackingEventOrderByRelevanceFieldEnum)[keyof typeof TrackingEventOrderByRelevanceFieldEnum]


  export const CoordinatesOrderByRelevanceFieldEnum: {
    id: 'id',
    originId: 'originId',
    currentId: 'currentId',
    destinationId: 'destinationId'
  };

  export type CoordinatesOrderByRelevanceFieldEnum = (typeof CoordinatesOrderByRelevanceFieldEnum)[keyof typeof CoordinatesOrderByRelevanceFieldEnum]


  export const PointOrderByRelevanceFieldEnum: {
    id: 'id'
  };

  export type PointOrderByRelevanceFieldEnum = (typeof PointOrderByRelevanceFieldEnum)[keyof typeof PointOrderByRelevanceFieldEnum]


  export const OrderStatusHistoryOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    description: 'description'
  };

  export type OrderStatusHistoryOrderByRelevanceFieldEnum = (typeof OrderStatusHistoryOrderByRelevanceFieldEnum)[keyof typeof OrderStatusHistoryOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatFilter<"Order"> | number
    shippingAddressId?: StringFilter<"Order"> | string
    paymentId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    notes?: OrderNoteListRelationFilter
    items?: OrderItemListRelationFilter
    statusHistory?: OrderStatusHistoryListRelationFilter
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    shippingAddressId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    notes?: OrderNoteOrderByRelationAggregateInput
    items?: OrderItemOrderByRelationAggregateInput
    statusHistory?: OrderStatusHistoryOrderByRelationAggregateInput
    shipping?: ShippingOrderByWithRelationInput
    _relevance?: OrderOrderByRelevanceInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatFilter<"Order"> | number
    shippingAddressId?: StringFilter<"Order"> | string
    paymentId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    notes?: OrderNoteListRelationFilter
    items?: OrderItemListRelationFilter
    statusHistory?: OrderStatusHistoryListRelationFilter
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    shippingAddressId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    shippingAddressId?: StringWithAggregatesFilter<"Order"> | string
    paymentId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderNoteWhereInput = {
    AND?: OrderNoteWhereInput | OrderNoteWhereInput[]
    OR?: OrderNoteWhereInput[]
    NOT?: OrderNoteWhereInput | OrderNoteWhereInput[]
    id?: StringFilter<"OrderNote"> | string
    orderId?: StringFilter<"OrderNote"> | string
    note?: StringFilter<"OrderNote"> | string
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderNoteOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    _relevance?: OrderNoteOrderByRelevanceInput
  }

  export type OrderNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderNoteWhereInput | OrderNoteWhereInput[]
    OR?: OrderNoteWhereInput[]
    NOT?: OrderNoteWhereInput | OrderNoteWhereInput[]
    orderId?: StringFilter<"OrderNote"> | string
    note?: StringFilter<"OrderNote"> | string
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderNoteOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    _count?: OrderNoteCountOrderByAggregateInput
    _max?: OrderNoteMaxOrderByAggregateInput
    _min?: OrderNoteMinOrderByAggregateInput
  }

  export type OrderNoteScalarWhereWithAggregatesInput = {
    AND?: OrderNoteScalarWhereWithAggregatesInput | OrderNoteScalarWhereWithAggregatesInput[]
    OR?: OrderNoteScalarWhereWithAggregatesInput[]
    NOT?: OrderNoteScalarWhereWithAggregatesInput | OrderNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderNote"> | string
    orderId?: StringWithAggregatesFilter<"OrderNote"> | string
    note?: StringWithAggregatesFilter<"OrderNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OrderNote"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    variantId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    productSlug?: StringFilter<"OrderItem"> | string
    variantName?: StringFilter<"OrderItem"> | string
    sku?: StringFilter<"OrderItem"> | string
    price?: FloatFilter<"OrderItem"> | number
    image?: StringFilter<"OrderItem"> | string
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productSlug?: SortOrder
    variantName?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    _relevance?: OrderItemOrderByRelevanceInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    variantId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    productSlug?: StringFilter<"OrderItem"> | string
    variantName?: StringFilter<"OrderItem"> | string
    sku?: StringFilter<"OrderItem"> | string
    price?: FloatFilter<"OrderItem"> | number
    image?: StringFilter<"OrderItem"> | string
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productSlug?: SortOrder
    variantName?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    variantId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    productName?: StringWithAggregatesFilter<"OrderItem"> | string
    productSlug?: StringWithAggregatesFilter<"OrderItem"> | string
    variantName?: StringWithAggregatesFilter<"OrderItem"> | string
    sku?: StringWithAggregatesFilter<"OrderItem"> | string
    price?: FloatWithAggregatesFilter<"OrderItem"> | number
    image?: StringWithAggregatesFilter<"OrderItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type ShippingWhereInput = {
    AND?: ShippingWhereInput | ShippingWhereInput[]
    OR?: ShippingWhereInput[]
    NOT?: ShippingWhereInput | ShippingWhereInput[]
    id?: StringFilter<"Shipping"> | string
    orderId?: StringFilter<"Shipping"> | string
    method?: StringFilter<"Shipping"> | string
    cost?: FloatFilter<"Shipping"> | number
    shippingAddressId?: StringNullableFilter<"Shipping"> | string | null
    estimatedDelivery?: DateTimeNullableFilter<"Shipping"> | Date | string | null
    trackingId?: StringFilter<"Shipping"> | string
    status?: StringFilter<"Shipping"> | string
    createdAt?: DateTimeFilter<"Shipping"> | Date | string
    updatedAt?: DateTimeFilter<"Shipping"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    tracking?: XOR<TrackingScalarRelationFilter, TrackingWhereInput>
  }

  export type ShippingOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    cost?: SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    estimatedDelivery?: SortOrderInput | SortOrder
    trackingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    tracking?: TrackingOrderByWithRelationInput
    _relevance?: ShippingOrderByRelevanceInput
  }

  export type ShippingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    trackingId?: string
    AND?: ShippingWhereInput | ShippingWhereInput[]
    OR?: ShippingWhereInput[]
    NOT?: ShippingWhereInput | ShippingWhereInput[]
    method?: StringFilter<"Shipping"> | string
    cost?: FloatFilter<"Shipping"> | number
    shippingAddressId?: StringNullableFilter<"Shipping"> | string | null
    estimatedDelivery?: DateTimeNullableFilter<"Shipping"> | Date | string | null
    status?: StringFilter<"Shipping"> | string
    createdAt?: DateTimeFilter<"Shipping"> | Date | string
    updatedAt?: DateTimeFilter<"Shipping"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    tracking?: XOR<TrackingScalarRelationFilter, TrackingWhereInput>
  }, "id" | "orderId" | "trackingId">

  export type ShippingOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    cost?: SortOrder
    shippingAddressId?: SortOrderInput | SortOrder
    estimatedDelivery?: SortOrderInput | SortOrder
    trackingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShippingCountOrderByAggregateInput
    _avg?: ShippingAvgOrderByAggregateInput
    _max?: ShippingMaxOrderByAggregateInput
    _min?: ShippingMinOrderByAggregateInput
    _sum?: ShippingSumOrderByAggregateInput
  }

  export type ShippingScalarWhereWithAggregatesInput = {
    AND?: ShippingScalarWhereWithAggregatesInput | ShippingScalarWhereWithAggregatesInput[]
    OR?: ShippingScalarWhereWithAggregatesInput[]
    NOT?: ShippingScalarWhereWithAggregatesInput | ShippingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shipping"> | string
    orderId?: StringWithAggregatesFilter<"Shipping"> | string
    method?: StringWithAggregatesFilter<"Shipping"> | string
    cost?: FloatWithAggregatesFilter<"Shipping"> | number
    shippingAddressId?: StringNullableWithAggregatesFilter<"Shipping"> | string | null
    estimatedDelivery?: DateTimeNullableWithAggregatesFilter<"Shipping"> | Date | string | null
    trackingId?: StringWithAggregatesFilter<"Shipping"> | string
    status?: StringWithAggregatesFilter<"Shipping"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Shipping"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shipping"> | Date | string
  }

  export type TrackingWhereInput = {
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    id?: StringFilter<"Tracking"> | string
    number?: StringFilter<"Tracking"> | string
    carrier?: StringFilter<"Tracking"> | string
    status?: StringFilter<"Tracking"> | string
    currentLocation?: StringFilter<"Tracking"> | string
    coordinatesId?: StringNullableFilter<"Tracking"> | string | null
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
    coordinates?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    history?: TrackingEventListRelationFilter
  }

  export type TrackingOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    carrier?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    coordinatesId?: SortOrderInput | SortOrder
    shipping?: ShippingOrderByWithRelationInput
    coordinates?: CoordinatesOrderByWithRelationInput
    history?: TrackingEventOrderByRelationAggregateInput
    _relevance?: TrackingOrderByRelevanceInput
  }

  export type TrackingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    coordinatesId?: string
    AND?: TrackingWhereInput | TrackingWhereInput[]
    OR?: TrackingWhereInput[]
    NOT?: TrackingWhereInput | TrackingWhereInput[]
    number?: StringFilter<"Tracking"> | string
    carrier?: StringFilter<"Tracking"> | string
    status?: StringFilter<"Tracking"> | string
    currentLocation?: StringFilter<"Tracking"> | string
    shipping?: XOR<ShippingNullableScalarRelationFilter, ShippingWhereInput> | null
    coordinates?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    history?: TrackingEventListRelationFilter
  }, "id" | "coordinatesId">

  export type TrackingOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    carrier?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    coordinatesId?: SortOrderInput | SortOrder
    _count?: TrackingCountOrderByAggregateInput
    _max?: TrackingMaxOrderByAggregateInput
    _min?: TrackingMinOrderByAggregateInput
  }

  export type TrackingScalarWhereWithAggregatesInput = {
    AND?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    OR?: TrackingScalarWhereWithAggregatesInput[]
    NOT?: TrackingScalarWhereWithAggregatesInput | TrackingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tracking"> | string
    number?: StringWithAggregatesFilter<"Tracking"> | string
    carrier?: StringWithAggregatesFilter<"Tracking"> | string
    status?: StringWithAggregatesFilter<"Tracking"> | string
    currentLocation?: StringWithAggregatesFilter<"Tracking"> | string
    coordinatesId?: StringNullableWithAggregatesFilter<"Tracking"> | string | null
  }

  export type TrackingEventWhereInput = {
    AND?: TrackingEventWhereInput | TrackingEventWhereInput[]
    OR?: TrackingEventWhereInput[]
    NOT?: TrackingEventWhereInput | TrackingEventWhereInput[]
    id?: StringFilter<"TrackingEvent"> | string
    trackingId?: StringFilter<"TrackingEvent"> | string
    date?: DateTimeFilter<"TrackingEvent"> | Date | string
    time?: DateTimeFilter<"TrackingEvent"> | Date | string
    location?: StringFilter<"TrackingEvent"> | string
    status?: StringFilter<"TrackingEvent"> | string
    description?: StringFilter<"TrackingEvent"> | string
    tracking?: XOR<TrackingScalarRelationFilter, TrackingWhereInput>
  }

  export type TrackingEventOrderByWithRelationInput = {
    id?: SortOrder
    trackingId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    status?: SortOrder
    description?: SortOrder
    tracking?: TrackingOrderByWithRelationInput
    _relevance?: TrackingEventOrderByRelevanceInput
  }

  export type TrackingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackingEventWhereInput | TrackingEventWhereInput[]
    OR?: TrackingEventWhereInput[]
    NOT?: TrackingEventWhereInput | TrackingEventWhereInput[]
    trackingId?: StringFilter<"TrackingEvent"> | string
    date?: DateTimeFilter<"TrackingEvent"> | Date | string
    time?: DateTimeFilter<"TrackingEvent"> | Date | string
    location?: StringFilter<"TrackingEvent"> | string
    status?: StringFilter<"TrackingEvent"> | string
    description?: StringFilter<"TrackingEvent"> | string
    tracking?: XOR<TrackingScalarRelationFilter, TrackingWhereInput>
  }, "id">

  export type TrackingEventOrderByWithAggregationInput = {
    id?: SortOrder
    trackingId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    status?: SortOrder
    description?: SortOrder
    _count?: TrackingEventCountOrderByAggregateInput
    _max?: TrackingEventMaxOrderByAggregateInput
    _min?: TrackingEventMinOrderByAggregateInput
  }

  export type TrackingEventScalarWhereWithAggregatesInput = {
    AND?: TrackingEventScalarWhereWithAggregatesInput | TrackingEventScalarWhereWithAggregatesInput[]
    OR?: TrackingEventScalarWhereWithAggregatesInput[]
    NOT?: TrackingEventScalarWhereWithAggregatesInput | TrackingEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackingEvent"> | string
    trackingId?: StringWithAggregatesFilter<"TrackingEvent"> | string
    date?: DateTimeWithAggregatesFilter<"TrackingEvent"> | Date | string
    time?: DateTimeWithAggregatesFilter<"TrackingEvent"> | Date | string
    location?: StringWithAggregatesFilter<"TrackingEvent"> | string
    status?: StringWithAggregatesFilter<"TrackingEvent"> | string
    description?: StringWithAggregatesFilter<"TrackingEvent"> | string
  }

  export type CoordinatesWhereInput = {
    AND?: CoordinatesWhereInput | CoordinatesWhereInput[]
    OR?: CoordinatesWhereInput[]
    NOT?: CoordinatesWhereInput | CoordinatesWhereInput[]
    id?: StringFilter<"Coordinates"> | string
    originId?: StringFilter<"Coordinates"> | string
    currentId?: StringFilter<"Coordinates"> | string
    destinationId?: StringFilter<"Coordinates"> | string
    current?: XOR<PointScalarRelationFilter, PointWhereInput>
    destination?: XOR<PointScalarRelationFilter, PointWhereInput>
    origin?: XOR<PointScalarRelationFilter, PointWhereInput>
    tracking?: XOR<TrackingNullableScalarRelationFilter, TrackingWhereInput> | null
  }

  export type CoordinatesOrderByWithRelationInput = {
    id?: SortOrder
    originId?: SortOrder
    currentId?: SortOrder
    destinationId?: SortOrder
    current?: PointOrderByWithRelationInput
    destination?: PointOrderByWithRelationInput
    origin?: PointOrderByWithRelationInput
    tracking?: TrackingOrderByWithRelationInput
    _relevance?: CoordinatesOrderByRelevanceInput
  }

  export type CoordinatesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    originId?: string
    currentId?: string
    destinationId?: string
    AND?: CoordinatesWhereInput | CoordinatesWhereInput[]
    OR?: CoordinatesWhereInput[]
    NOT?: CoordinatesWhereInput | CoordinatesWhereInput[]
    current?: XOR<PointScalarRelationFilter, PointWhereInput>
    destination?: XOR<PointScalarRelationFilter, PointWhereInput>
    origin?: XOR<PointScalarRelationFilter, PointWhereInput>
    tracking?: XOR<TrackingNullableScalarRelationFilter, TrackingWhereInput> | null
  }, "id" | "originId" | "currentId" | "destinationId">

  export type CoordinatesOrderByWithAggregationInput = {
    id?: SortOrder
    originId?: SortOrder
    currentId?: SortOrder
    destinationId?: SortOrder
    _count?: CoordinatesCountOrderByAggregateInput
    _max?: CoordinatesMaxOrderByAggregateInput
    _min?: CoordinatesMinOrderByAggregateInput
  }

  export type CoordinatesScalarWhereWithAggregatesInput = {
    AND?: CoordinatesScalarWhereWithAggregatesInput | CoordinatesScalarWhereWithAggregatesInput[]
    OR?: CoordinatesScalarWhereWithAggregatesInput[]
    NOT?: CoordinatesScalarWhereWithAggregatesInput | CoordinatesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Coordinates"> | string
    originId?: StringWithAggregatesFilter<"Coordinates"> | string
    currentId?: StringWithAggregatesFilter<"Coordinates"> | string
    destinationId?: StringWithAggregatesFilter<"Coordinates"> | string
  }

  export type PointWhereInput = {
    AND?: PointWhereInput | PointWhereInput[]
    OR?: PointWhereInput[]
    NOT?: PointWhereInput | PointWhereInput[]
    id?: StringFilter<"Point"> | string
    lat?: FloatFilter<"Point"> | number
    lng?: FloatFilter<"Point"> | number
    currentFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    destinationFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    originFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
  }

  export type PointOrderByWithRelationInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    currentFor?: CoordinatesOrderByWithRelationInput
    destinationFor?: CoordinatesOrderByWithRelationInput
    originFor?: CoordinatesOrderByWithRelationInput
    _relevance?: PointOrderByRelevanceInput
  }

  export type PointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointWhereInput | PointWhereInput[]
    OR?: PointWhereInput[]
    NOT?: PointWhereInput | PointWhereInput[]
    lat?: FloatFilter<"Point"> | number
    lng?: FloatFilter<"Point"> | number
    currentFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    destinationFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
    originFor?: XOR<CoordinatesNullableScalarRelationFilter, CoordinatesWhereInput> | null
  }, "id">

  export type PointOrderByWithAggregationInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    _count?: PointCountOrderByAggregateInput
    _avg?: PointAvgOrderByAggregateInput
    _max?: PointMaxOrderByAggregateInput
    _min?: PointMinOrderByAggregateInput
    _sum?: PointSumOrderByAggregateInput
  }

  export type PointScalarWhereWithAggregatesInput = {
    AND?: PointScalarWhereWithAggregatesInput | PointScalarWhereWithAggregatesInput[]
    OR?: PointScalarWhereWithAggregatesInput[]
    NOT?: PointScalarWhereWithAggregatesInput | PointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Point"> | string
    lat?: FloatWithAggregatesFilter<"Point"> | number
    lng?: FloatWithAggregatesFilter<"Point"> | number
  }

  export type OrderStatusHistoryWhereInput = {
    AND?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    OR?: OrderStatusHistoryWhereInput[]
    NOT?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    id?: StringFilter<"OrderStatusHistory"> | string
    orderId?: StringFilter<"OrderStatusHistory"> | string
    status?: EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus
    description?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderStatusHistoryOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    _relevance?: OrderStatusHistoryOrderByRelevanceInput
  }

  export type OrderStatusHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    OR?: OrderStatusHistoryWhereInput[]
    NOT?: OrderStatusHistoryWhereInput | OrderStatusHistoryWhereInput[]
    orderId?: StringFilter<"OrderStatusHistory"> | string
    status?: EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus
    description?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderStatusHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderStatusHistoryCountOrderByAggregateInput
    _max?: OrderStatusHistoryMaxOrderByAggregateInput
    _min?: OrderStatusHistoryMinOrderByAggregateInput
  }

  export type OrderStatusHistoryScalarWhereWithAggregatesInput = {
    AND?: OrderStatusHistoryScalarWhereWithAggregatesInput | OrderStatusHistoryScalarWhereWithAggregatesInput[]
    OR?: OrderStatusHistoryScalarWhereWithAggregatesInput[]
    NOT?: OrderStatusHistoryScalarWhereWithAggregatesInput | OrderStatusHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    orderId?: StringWithAggregatesFilter<"OrderStatusHistory"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"OrderStatusHistory"> | $Enums.OrderStatus
    description?: StringNullableWithAggregatesFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OrderStatusHistory"> | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    shipping?: ShippingCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteCreateInput = {
    id?: string
    note: string
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutNotesInput
  }

  export type OrderNoteUncheckedCreateInput = {
    id?: string
    orderId: string
    note: string
    createdAt?: Date | string
  }

  export type OrderNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutNotesNestedInput
  }

  export type OrderNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteCreateManyInput = {
    id?: string
    orderId: string
    note: string
    createdAt?: Date | string
  }

  export type OrderNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShippingCreateInput = {
    id?: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutShippingInput
    tracking: TrackingCreateNestedOneWithoutShippingInput
  }

  export type ShippingUncheckedCreateInput = {
    id?: string
    orderId: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    trackingId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShippingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutShippingNestedInput
    tracking?: TrackingUpdateOneRequiredWithoutShippingNestedInput
  }

  export type ShippingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShippingCreateManyInput = {
    id?: string
    orderId: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    trackingId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShippingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShippingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingCreateInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    shipping?: ShippingCreateNestedOneWithoutTrackingInput
    coordinates?: CoordinatesCreateNestedOneWithoutTrackingInput
    history?: TrackingEventCreateNestedManyWithoutTrackingInput
  }

  export type TrackingUncheckedCreateInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinatesId?: string | null
    shipping?: ShippingUncheckedCreateNestedOneWithoutTrackingInput
    history?: TrackingEventUncheckedCreateNestedManyWithoutTrackingInput
  }

  export type TrackingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    shipping?: ShippingUpdateOneWithoutTrackingNestedInput
    coordinates?: CoordinatesUpdateOneWithoutTrackingNestedInput
    history?: TrackingEventUpdateManyWithoutTrackingNestedInput
  }

  export type TrackingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    coordinatesId?: NullableStringFieldUpdateOperationsInput | string | null
    shipping?: ShippingUncheckedUpdateOneWithoutTrackingNestedInput
    history?: TrackingEventUncheckedUpdateManyWithoutTrackingNestedInput
  }

  export type TrackingCreateManyInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinatesId?: string | null
  }

  export type TrackingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    coordinatesId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TrackingEventCreateInput = {
    id?: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
    tracking: TrackingCreateNestedOneWithoutHistoryInput
  }

  export type TrackingEventUncheckedCreateInput = {
    id?: string
    trackingId: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
  }

  export type TrackingEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tracking?: TrackingUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type TrackingEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingEventCreateManyInput = {
    id?: string
    trackingId: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
  }

  export type TrackingEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    trackingId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CoordinatesCreateInput = {
    id?: string
    current: PointCreateNestedOneWithoutCurrentForInput
    destination: PointCreateNestedOneWithoutDestinationForInput
    origin: PointCreateNestedOneWithoutOriginForInput
    tracking?: TrackingCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesUncheckedCreateInput = {
    id?: string
    originId: string
    currentId: string
    destinationId: string
    tracking?: TrackingUncheckedCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: PointUpdateOneRequiredWithoutCurrentForNestedInput
    destination?: PointUpdateOneRequiredWithoutDestinationForNestedInput
    origin?: PointUpdateOneRequiredWithoutOriginForNestedInput
    tracking?: TrackingUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    currentId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    tracking?: TrackingUncheckedUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesCreateManyInput = {
    id?: string
    originId: string
    currentId: string
    destinationId: string
  }

  export type CoordinatesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type CoordinatesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    currentId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
  }

  export type PointCreateInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesCreateNestedOneWithoutCurrentInput
    destinationFor?: CoordinatesCreateNestedOneWithoutDestinationInput
    originFor?: CoordinatesCreateNestedOneWithoutOriginInput
  }

  export type PointUncheckedCreateInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesUncheckedCreateNestedOneWithoutCurrentInput
    destinationFor?: CoordinatesUncheckedCreateNestedOneWithoutDestinationInput
    originFor?: CoordinatesUncheckedCreateNestedOneWithoutOriginInput
  }

  export type PointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUpdateOneWithoutCurrentNestedInput
    destinationFor?: CoordinatesUpdateOneWithoutDestinationNestedInput
    originFor?: CoordinatesUpdateOneWithoutOriginNestedInput
  }

  export type PointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUncheckedUpdateOneWithoutCurrentNestedInput
    destinationFor?: CoordinatesUncheckedUpdateOneWithoutDestinationNestedInput
    originFor?: CoordinatesUncheckedUpdateOneWithoutOriginNestedInput
  }

  export type PointCreateManyInput = {
    id?: string
    lat: number
    lng: number
  }

  export type PointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type PointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderStatusHistoryCreateInput = {
    id?: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutStatusHistoryInput
  }

  export type OrderStatusHistoryUncheckedCreateInput = {
    id?: string
    orderId: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type OrderStatusHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryCreateManyInput = {
    id?: string
    orderId: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type OrderNoteListRelationFilter = {
    every?: OrderNoteWhereInput
    some?: OrderNoteWhereInput
    none?: OrderNoteWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderStatusHistoryListRelationFilter = {
    every?: OrderStatusHistoryWhereInput
    some?: OrderStatusHistoryWhereInput
    none?: OrderStatusHistoryWhereInput
  }

  export type ShippingNullableScalarRelationFilter = {
    is?: ShippingWhereInput | null
    isNot?: ShippingWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderStatusHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelevanceInput = {
    fields: OrderOrderByRelevanceFieldEnum | OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    shippingAddressId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    shippingAddressId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    shippingAddressId?: SortOrder
    paymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
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

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderNoteOrderByRelevanceInput = {
    fields: OrderNoteOrderByRelevanceFieldEnum | OrderNoteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderNoteCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderNoteMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
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

  export type OrderItemOrderByRelevanceInput = {
    fields: OrderItemOrderByRelevanceFieldEnum | OrderItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productSlug?: SortOrder
    variantName?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productSlug?: SortOrder
    variantName?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    variantId?: SortOrder
    quantity?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productSlug?: SortOrder
    variantName?: SortOrder
    sku?: SortOrder
    price?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
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

  export type TrackingScalarRelationFilter = {
    is?: TrackingWhereInput
    isNot?: TrackingWhereInput
  }

  export type ShippingOrderByRelevanceInput = {
    fields: ShippingOrderByRelevanceFieldEnum | ShippingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ShippingCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    cost?: SortOrder
    shippingAddressId?: SortOrder
    estimatedDelivery?: SortOrder
    trackingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShippingAvgOrderByAggregateInput = {
    cost?: SortOrder
  }

  export type ShippingMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    cost?: SortOrder
    shippingAddressId?: SortOrder
    estimatedDelivery?: SortOrder
    trackingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShippingMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    cost?: SortOrder
    shippingAddressId?: SortOrder
    estimatedDelivery?: SortOrder
    trackingId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShippingSumOrderByAggregateInput = {
    cost?: SortOrder
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

  export type CoordinatesNullableScalarRelationFilter = {
    is?: CoordinatesWhereInput | null
    isNot?: CoordinatesWhereInput | null
  }

  export type TrackingEventListRelationFilter = {
    every?: TrackingEventWhereInput
    some?: TrackingEventWhereInput
    none?: TrackingEventWhereInput
  }

  export type TrackingEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TrackingOrderByRelevanceInput = {
    fields: TrackingOrderByRelevanceFieldEnum | TrackingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TrackingCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    carrier?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    coordinatesId?: SortOrder
  }

  export type TrackingMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    carrier?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    coordinatesId?: SortOrder
  }

  export type TrackingMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    carrier?: SortOrder
    status?: SortOrder
    currentLocation?: SortOrder
    coordinatesId?: SortOrder
  }

  export type TrackingEventOrderByRelevanceInput = {
    fields: TrackingEventOrderByRelevanceFieldEnum | TrackingEventOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TrackingEventCountOrderByAggregateInput = {
    id?: SortOrder
    trackingId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    status?: SortOrder
    description?: SortOrder
  }

  export type TrackingEventMaxOrderByAggregateInput = {
    id?: SortOrder
    trackingId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    status?: SortOrder
    description?: SortOrder
  }

  export type TrackingEventMinOrderByAggregateInput = {
    id?: SortOrder
    trackingId?: SortOrder
    date?: SortOrder
    time?: SortOrder
    location?: SortOrder
    status?: SortOrder
    description?: SortOrder
  }

  export type PointScalarRelationFilter = {
    is?: PointWhereInput
    isNot?: PointWhereInput
  }

  export type TrackingNullableScalarRelationFilter = {
    is?: TrackingWhereInput | null
    isNot?: TrackingWhereInput | null
  }

  export type CoordinatesOrderByRelevanceInput = {
    fields: CoordinatesOrderByRelevanceFieldEnum | CoordinatesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CoordinatesCountOrderByAggregateInput = {
    id?: SortOrder
    originId?: SortOrder
    currentId?: SortOrder
    destinationId?: SortOrder
  }

  export type CoordinatesMaxOrderByAggregateInput = {
    id?: SortOrder
    originId?: SortOrder
    currentId?: SortOrder
    destinationId?: SortOrder
  }

  export type CoordinatesMinOrderByAggregateInput = {
    id?: SortOrder
    originId?: SortOrder
    currentId?: SortOrder
    destinationId?: SortOrder
  }

  export type PointOrderByRelevanceInput = {
    fields: PointOrderByRelevanceFieldEnum | PointOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PointCountOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PointAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PointMaxOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PointMinOrderByAggregateInput = {
    id?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type PointSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type OrderStatusHistoryOrderByRelevanceInput = {
    fields: OrderStatusHistoryOrderByRelevanceFieldEnum | OrderStatusHistoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderStatusHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderStatusHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderNoteCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderStatusHistoryCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
  }

  export type ShippingCreateNestedOneWithoutOrderInput = {
    create?: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutOrderInput
    connect?: ShippingWhereUniqueInput
  }

  export type OrderNoteUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
  }

  export type ShippingUncheckedCreateNestedOneWithoutOrderInput = {
    create?: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutOrderInput
    connect?: ShippingWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderNoteUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    upsert?: OrderNoteUpsertWithWhereUniqueWithoutOrderInput | OrderNoteUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    set?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    disconnect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    delete?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    update?: OrderNoteUpdateWithWhereUniqueWithoutOrderInput | OrderNoteUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderNoteUpdateManyWithWhereWithoutOrderInput | OrderNoteUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderStatusHistoryUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    set?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    disconnect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    delete?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    update?: OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
  }

  export type ShippingUpdateOneWithoutOrderNestedInput = {
    create?: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutOrderInput
    upsert?: ShippingUpsertWithoutOrderInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutOrderInput, ShippingUpdateWithoutOrderInput>, ShippingUncheckedUpdateWithoutOrderInput>
  }

  export type OrderNoteUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput> | OrderNoteCreateWithoutOrderInput[] | OrderNoteUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderNoteCreateOrConnectWithoutOrderInput | OrderNoteCreateOrConnectWithoutOrderInput[]
    upsert?: OrderNoteUpsertWithWhereUniqueWithoutOrderInput | OrderNoteUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderNoteCreateManyOrderInputEnvelope
    set?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    disconnect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    delete?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    connect?: OrderNoteWhereUniqueInput | OrderNoteWhereUniqueInput[]
    update?: OrderNoteUpdateWithWhereUniqueWithoutOrderInput | OrderNoteUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderNoteUpdateManyWithWhereWithoutOrderInput | OrderNoteUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput> | OrderStatusHistoryCreateWithoutOrderInput[] | OrderStatusHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderStatusHistoryCreateOrConnectWithoutOrderInput | OrderStatusHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderStatusHistoryCreateManyOrderInputEnvelope
    set?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    disconnect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    delete?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    connect?: OrderStatusHistoryWhereUniqueInput | OrderStatusHistoryWhereUniqueInput[]
    update?: OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput | OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
  }

  export type ShippingUncheckedUpdateOneWithoutOrderNestedInput = {
    create?: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutOrderInput
    upsert?: ShippingUpsertWithoutOrderInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutOrderInput, ShippingUpdateWithoutOrderInput>, ShippingUncheckedUpdateWithoutOrderInput>
  }

  export type OrderCreateNestedOneWithoutNotesInput = {
    create?: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNotesInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    connectOrCreate?: OrderCreateOrConnectWithoutNotesInput
    upsert?: OrderUpsertWithoutNotesInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutNotesInput, OrderUpdateWithoutNotesInput>, OrderUncheckedUpdateWithoutNotesInput>
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderCreateNestedOneWithoutShippingInput = {
    create?: XOR<OrderCreateWithoutShippingInput, OrderUncheckedCreateWithoutShippingInput>
    connectOrCreate?: OrderCreateOrConnectWithoutShippingInput
    connect?: OrderWhereUniqueInput
  }

  export type TrackingCreateNestedOneWithoutShippingInput = {
    create?: XOR<TrackingCreateWithoutShippingInput, TrackingUncheckedCreateWithoutShippingInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutShippingInput
    connect?: TrackingWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrderUpdateOneRequiredWithoutShippingNestedInput = {
    create?: XOR<OrderCreateWithoutShippingInput, OrderUncheckedCreateWithoutShippingInput>
    connectOrCreate?: OrderCreateOrConnectWithoutShippingInput
    upsert?: OrderUpsertWithoutShippingInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutShippingInput, OrderUpdateWithoutShippingInput>, OrderUncheckedUpdateWithoutShippingInput>
  }

  export type TrackingUpdateOneRequiredWithoutShippingNestedInput = {
    create?: XOR<TrackingCreateWithoutShippingInput, TrackingUncheckedCreateWithoutShippingInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutShippingInput
    upsert?: TrackingUpsertWithoutShippingInput
    connect?: TrackingWhereUniqueInput
    update?: XOR<XOR<TrackingUpdateToOneWithWhereWithoutShippingInput, TrackingUpdateWithoutShippingInput>, TrackingUncheckedUpdateWithoutShippingInput>
  }

  export type ShippingCreateNestedOneWithoutTrackingInput = {
    create?: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutTrackingInput
    connect?: ShippingWhereUniqueInput
  }

  export type CoordinatesCreateNestedOneWithoutTrackingInput = {
    create?: XOR<CoordinatesCreateWithoutTrackingInput, CoordinatesUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutTrackingInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type TrackingEventCreateNestedManyWithoutTrackingInput = {
    create?: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput> | TrackingEventCreateWithoutTrackingInput[] | TrackingEventUncheckedCreateWithoutTrackingInput[]
    connectOrCreate?: TrackingEventCreateOrConnectWithoutTrackingInput | TrackingEventCreateOrConnectWithoutTrackingInput[]
    createMany?: TrackingEventCreateManyTrackingInputEnvelope
    connect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
  }

  export type ShippingUncheckedCreateNestedOneWithoutTrackingInput = {
    create?: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutTrackingInput
    connect?: ShippingWhereUniqueInput
  }

  export type TrackingEventUncheckedCreateNestedManyWithoutTrackingInput = {
    create?: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput> | TrackingEventCreateWithoutTrackingInput[] | TrackingEventUncheckedCreateWithoutTrackingInput[]
    connectOrCreate?: TrackingEventCreateOrConnectWithoutTrackingInput | TrackingEventCreateOrConnectWithoutTrackingInput[]
    createMany?: TrackingEventCreateManyTrackingInputEnvelope
    connect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
  }

  export type ShippingUpdateOneWithoutTrackingNestedInput = {
    create?: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutTrackingInput
    upsert?: ShippingUpsertWithoutTrackingInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutTrackingInput, ShippingUpdateWithoutTrackingInput>, ShippingUncheckedUpdateWithoutTrackingInput>
  }

  export type CoordinatesUpdateOneWithoutTrackingNestedInput = {
    create?: XOR<CoordinatesCreateWithoutTrackingInput, CoordinatesUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutTrackingInput
    upsert?: CoordinatesUpsertWithoutTrackingInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutTrackingInput, CoordinatesUpdateWithoutTrackingInput>, CoordinatesUncheckedUpdateWithoutTrackingInput>
  }

  export type TrackingEventUpdateManyWithoutTrackingNestedInput = {
    create?: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput> | TrackingEventCreateWithoutTrackingInput[] | TrackingEventUncheckedCreateWithoutTrackingInput[]
    connectOrCreate?: TrackingEventCreateOrConnectWithoutTrackingInput | TrackingEventCreateOrConnectWithoutTrackingInput[]
    upsert?: TrackingEventUpsertWithWhereUniqueWithoutTrackingInput | TrackingEventUpsertWithWhereUniqueWithoutTrackingInput[]
    createMany?: TrackingEventCreateManyTrackingInputEnvelope
    set?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    disconnect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    delete?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    connect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    update?: TrackingEventUpdateWithWhereUniqueWithoutTrackingInput | TrackingEventUpdateWithWhereUniqueWithoutTrackingInput[]
    updateMany?: TrackingEventUpdateManyWithWhereWithoutTrackingInput | TrackingEventUpdateManyWithWhereWithoutTrackingInput[]
    deleteMany?: TrackingEventScalarWhereInput | TrackingEventScalarWhereInput[]
  }

  export type ShippingUncheckedUpdateOneWithoutTrackingNestedInput = {
    create?: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
    connectOrCreate?: ShippingCreateOrConnectWithoutTrackingInput
    upsert?: ShippingUpsertWithoutTrackingInput
    disconnect?: ShippingWhereInput | boolean
    delete?: ShippingWhereInput | boolean
    connect?: ShippingWhereUniqueInput
    update?: XOR<XOR<ShippingUpdateToOneWithWhereWithoutTrackingInput, ShippingUpdateWithoutTrackingInput>, ShippingUncheckedUpdateWithoutTrackingInput>
  }

  export type TrackingEventUncheckedUpdateManyWithoutTrackingNestedInput = {
    create?: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput> | TrackingEventCreateWithoutTrackingInput[] | TrackingEventUncheckedCreateWithoutTrackingInput[]
    connectOrCreate?: TrackingEventCreateOrConnectWithoutTrackingInput | TrackingEventCreateOrConnectWithoutTrackingInput[]
    upsert?: TrackingEventUpsertWithWhereUniqueWithoutTrackingInput | TrackingEventUpsertWithWhereUniqueWithoutTrackingInput[]
    createMany?: TrackingEventCreateManyTrackingInputEnvelope
    set?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    disconnect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    delete?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    connect?: TrackingEventWhereUniqueInput | TrackingEventWhereUniqueInput[]
    update?: TrackingEventUpdateWithWhereUniqueWithoutTrackingInput | TrackingEventUpdateWithWhereUniqueWithoutTrackingInput[]
    updateMany?: TrackingEventUpdateManyWithWhereWithoutTrackingInput | TrackingEventUpdateManyWithWhereWithoutTrackingInput[]
    deleteMany?: TrackingEventScalarWhereInput | TrackingEventScalarWhereInput[]
  }

  export type TrackingCreateNestedOneWithoutHistoryInput = {
    create?: XOR<TrackingCreateWithoutHistoryInput, TrackingUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutHistoryInput
    connect?: TrackingWhereUniqueInput
  }

  export type TrackingUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<TrackingCreateWithoutHistoryInput, TrackingUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutHistoryInput
    upsert?: TrackingUpsertWithoutHistoryInput
    connect?: TrackingWhereUniqueInput
    update?: XOR<XOR<TrackingUpdateToOneWithWhereWithoutHistoryInput, TrackingUpdateWithoutHistoryInput>, TrackingUncheckedUpdateWithoutHistoryInput>
  }

  export type PointCreateNestedOneWithoutCurrentForInput = {
    create?: XOR<PointCreateWithoutCurrentForInput, PointUncheckedCreateWithoutCurrentForInput>
    connectOrCreate?: PointCreateOrConnectWithoutCurrentForInput
    connect?: PointWhereUniqueInput
  }

  export type PointCreateNestedOneWithoutDestinationForInput = {
    create?: XOR<PointCreateWithoutDestinationForInput, PointUncheckedCreateWithoutDestinationForInput>
    connectOrCreate?: PointCreateOrConnectWithoutDestinationForInput
    connect?: PointWhereUniqueInput
  }

  export type PointCreateNestedOneWithoutOriginForInput = {
    create?: XOR<PointCreateWithoutOriginForInput, PointUncheckedCreateWithoutOriginForInput>
    connectOrCreate?: PointCreateOrConnectWithoutOriginForInput
    connect?: PointWhereUniqueInput
  }

  export type TrackingCreateNestedOneWithoutCoordinatesInput = {
    create?: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutCoordinatesInput
    connect?: TrackingWhereUniqueInput
  }

  export type TrackingUncheckedCreateNestedOneWithoutCoordinatesInput = {
    create?: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutCoordinatesInput
    connect?: TrackingWhereUniqueInput
  }

  export type PointUpdateOneRequiredWithoutCurrentForNestedInput = {
    create?: XOR<PointCreateWithoutCurrentForInput, PointUncheckedCreateWithoutCurrentForInput>
    connectOrCreate?: PointCreateOrConnectWithoutCurrentForInput
    upsert?: PointUpsertWithoutCurrentForInput
    connect?: PointWhereUniqueInput
    update?: XOR<XOR<PointUpdateToOneWithWhereWithoutCurrentForInput, PointUpdateWithoutCurrentForInput>, PointUncheckedUpdateWithoutCurrentForInput>
  }

  export type PointUpdateOneRequiredWithoutDestinationForNestedInput = {
    create?: XOR<PointCreateWithoutDestinationForInput, PointUncheckedCreateWithoutDestinationForInput>
    connectOrCreate?: PointCreateOrConnectWithoutDestinationForInput
    upsert?: PointUpsertWithoutDestinationForInput
    connect?: PointWhereUniqueInput
    update?: XOR<XOR<PointUpdateToOneWithWhereWithoutDestinationForInput, PointUpdateWithoutDestinationForInput>, PointUncheckedUpdateWithoutDestinationForInput>
  }

  export type PointUpdateOneRequiredWithoutOriginForNestedInput = {
    create?: XOR<PointCreateWithoutOriginForInput, PointUncheckedCreateWithoutOriginForInput>
    connectOrCreate?: PointCreateOrConnectWithoutOriginForInput
    upsert?: PointUpsertWithoutOriginForInput
    connect?: PointWhereUniqueInput
    update?: XOR<XOR<PointUpdateToOneWithWhereWithoutOriginForInput, PointUpdateWithoutOriginForInput>, PointUncheckedUpdateWithoutOriginForInput>
  }

  export type TrackingUpdateOneWithoutCoordinatesNestedInput = {
    create?: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutCoordinatesInput
    upsert?: TrackingUpsertWithoutCoordinatesInput
    disconnect?: TrackingWhereInput | boolean
    delete?: TrackingWhereInput | boolean
    connect?: TrackingWhereUniqueInput
    update?: XOR<XOR<TrackingUpdateToOneWithWhereWithoutCoordinatesInput, TrackingUpdateWithoutCoordinatesInput>, TrackingUncheckedUpdateWithoutCoordinatesInput>
  }

  export type TrackingUncheckedUpdateOneWithoutCoordinatesNestedInput = {
    create?: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
    connectOrCreate?: TrackingCreateOrConnectWithoutCoordinatesInput
    upsert?: TrackingUpsertWithoutCoordinatesInput
    disconnect?: TrackingWhereInput | boolean
    delete?: TrackingWhereInput | boolean
    connect?: TrackingWhereUniqueInput
    update?: XOR<XOR<TrackingUpdateToOneWithWhereWithoutCoordinatesInput, TrackingUpdateWithoutCoordinatesInput>, TrackingUncheckedUpdateWithoutCoordinatesInput>
  }

  export type CoordinatesCreateNestedOneWithoutCurrentInput = {
    create?: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutCurrentInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesCreateNestedOneWithoutDestinationInput = {
    create?: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutDestinationInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesCreateNestedOneWithoutOriginInput = {
    create?: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutOriginInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesUncheckedCreateNestedOneWithoutCurrentInput = {
    create?: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutCurrentInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesUncheckedCreateNestedOneWithoutDestinationInput = {
    create?: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutDestinationInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesUncheckedCreateNestedOneWithoutOriginInput = {
    create?: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutOriginInput
    connect?: CoordinatesWhereUniqueInput
  }

  export type CoordinatesUpdateOneWithoutCurrentNestedInput = {
    create?: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutCurrentInput
    upsert?: CoordinatesUpsertWithoutCurrentInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutCurrentInput, CoordinatesUpdateWithoutCurrentInput>, CoordinatesUncheckedUpdateWithoutCurrentInput>
  }

  export type CoordinatesUpdateOneWithoutDestinationNestedInput = {
    create?: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutDestinationInput
    upsert?: CoordinatesUpsertWithoutDestinationInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutDestinationInput, CoordinatesUpdateWithoutDestinationInput>, CoordinatesUncheckedUpdateWithoutDestinationInput>
  }

  export type CoordinatesUpdateOneWithoutOriginNestedInput = {
    create?: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutOriginInput
    upsert?: CoordinatesUpsertWithoutOriginInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutOriginInput, CoordinatesUpdateWithoutOriginInput>, CoordinatesUncheckedUpdateWithoutOriginInput>
  }

  export type CoordinatesUncheckedUpdateOneWithoutCurrentNestedInput = {
    create?: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutCurrentInput
    upsert?: CoordinatesUpsertWithoutCurrentInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutCurrentInput, CoordinatesUpdateWithoutCurrentInput>, CoordinatesUncheckedUpdateWithoutCurrentInput>
  }

  export type CoordinatesUncheckedUpdateOneWithoutDestinationNestedInput = {
    create?: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutDestinationInput
    upsert?: CoordinatesUpsertWithoutDestinationInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutDestinationInput, CoordinatesUpdateWithoutDestinationInput>, CoordinatesUncheckedUpdateWithoutDestinationInput>
  }

  export type CoordinatesUncheckedUpdateOneWithoutOriginNestedInput = {
    create?: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
    connectOrCreate?: CoordinatesCreateOrConnectWithoutOriginInput
    upsert?: CoordinatesUpsertWithoutOriginInput
    disconnect?: CoordinatesWhereInput | boolean
    delete?: CoordinatesWhereInput | boolean
    connect?: CoordinatesWhereUniqueInput
    update?: XOR<XOR<CoordinatesUpdateToOneWithWhereWithoutOriginInput, CoordinatesUpdateWithoutOriginInput>, CoordinatesUncheckedUpdateWithoutOriginInput>
  }

  export type OrderCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutStatusHistoryInput
    upsert?: OrderUpsertWithoutStatusHistoryInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutStatusHistoryInput, OrderUpdateWithoutStatusHistoryInput>, OrderUncheckedUpdateWithoutStatusHistoryInput>
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

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
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

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type OrderNoteCreateWithoutOrderInput = {
    id?: string
    note: string
    createdAt?: Date | string
  }

  export type OrderNoteUncheckedCreateWithoutOrderInput = {
    id?: string
    note: string
    createdAt?: Date | string
  }

  export type OrderNoteCreateOrConnectWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    create: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput>
  }

  export type OrderNoteCreateManyOrderInputEnvelope = {
    data: OrderNoteCreateManyOrderInput | OrderNoteCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderStatusHistoryCreateWithoutOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryUncheckedCreateWithoutOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
  }

  export type OrderStatusHistoryCreateOrConnectWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    create: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusHistoryCreateManyOrderInputEnvelope = {
    data: OrderStatusHistoryCreateManyOrderInput | OrderStatusHistoryCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ShippingCreateWithoutOrderInput = {
    id?: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tracking: TrackingCreateNestedOneWithoutShippingInput
  }

  export type ShippingUncheckedCreateWithoutOrderInput = {
    id?: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    trackingId: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShippingCreateOrConnectWithoutOrderInput = {
    where: ShippingWhereUniqueInput
    create: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
  }

  export type OrderNoteUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    update: XOR<OrderNoteUpdateWithoutOrderInput, OrderNoteUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderNoteCreateWithoutOrderInput, OrderNoteUncheckedCreateWithoutOrderInput>
  }

  export type OrderNoteUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderNoteWhereUniqueInput
    data: XOR<OrderNoteUpdateWithoutOrderInput, OrderNoteUncheckedUpdateWithoutOrderInput>
  }

  export type OrderNoteUpdateManyWithWhereWithoutOrderInput = {
    where: OrderNoteScalarWhereInput
    data: XOR<OrderNoteUpdateManyMutationInput, OrderNoteUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderNoteScalarWhereInput = {
    AND?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
    OR?: OrderNoteScalarWhereInput[]
    NOT?: OrderNoteScalarWhereInput | OrderNoteScalarWhereInput[]
    id?: StringFilter<"OrderNote"> | string
    orderId?: StringFilter<"OrderNote"> | string
    note?: StringFilter<"OrderNote"> | string
    createdAt?: DateTimeFilter<"OrderNote"> | Date | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    variantId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    productId?: StringFilter<"OrderItem"> | string
    productName?: StringFilter<"OrderItem"> | string
    productSlug?: StringFilter<"OrderItem"> | string
    variantName?: StringFilter<"OrderItem"> | string
    sku?: StringFilter<"OrderItem"> | string
    price?: FloatFilter<"OrderItem"> | number
    image?: StringFilter<"OrderItem"> | string
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    update: XOR<OrderStatusHistoryUpdateWithoutOrderInput, OrderStatusHistoryUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderStatusHistoryCreateWithoutOrderInput, OrderStatusHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderStatusHistoryWhereUniqueInput
    data: XOR<OrderStatusHistoryUpdateWithoutOrderInput, OrderStatusHistoryUncheckedUpdateWithoutOrderInput>
  }

  export type OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput = {
    where: OrderStatusHistoryScalarWhereInput
    data: XOR<OrderStatusHistoryUpdateManyMutationInput, OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderStatusHistoryScalarWhereInput = {
    AND?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
    OR?: OrderStatusHistoryScalarWhereInput[]
    NOT?: OrderStatusHistoryScalarWhereInput | OrderStatusHistoryScalarWhereInput[]
    id?: StringFilter<"OrderStatusHistory"> | string
    orderId?: StringFilter<"OrderStatusHistory"> | string
    status?: EnumOrderStatusFilter<"OrderStatusHistory"> | $Enums.OrderStatus
    description?: StringNullableFilter<"OrderStatusHistory"> | string | null
    createdAt?: DateTimeFilter<"OrderStatusHistory"> | Date | string
  }

  export type ShippingUpsertWithoutOrderInput = {
    update: XOR<ShippingUpdateWithoutOrderInput, ShippingUncheckedUpdateWithoutOrderInput>
    create: XOR<ShippingCreateWithoutOrderInput, ShippingUncheckedCreateWithoutOrderInput>
    where?: ShippingWhereInput
  }

  export type ShippingUpdateToOneWithWhereWithoutOrderInput = {
    where?: ShippingWhereInput
    data: XOR<ShippingUpdateWithoutOrderInput, ShippingUncheckedUpdateWithoutOrderInput>
  }

  export type ShippingUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tracking?: TrackingUpdateOneRequiredWithoutShippingNestedInput
  }

  export type ShippingUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    trackingId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutNotesInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    shipping?: ShippingCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutNotesInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutNotesInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
  }

  export type OrderUpsertWithoutNotesInput = {
    update: XOR<OrderUpdateWithoutNotesInput, OrderUncheckedUpdateWithoutNotesInput>
    create: XOR<OrderCreateWithoutNotesInput, OrderUncheckedCreateWithoutNotesInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutNotesInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutNotesInput, OrderUncheckedUpdateWithoutNotesInput>
  }

  export type OrderUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
    shipping?: ShippingCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderCreateWithoutShippingInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutShippingInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    statusHistory?: OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutShippingInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutShippingInput, OrderUncheckedCreateWithoutShippingInput>
  }

  export type TrackingCreateWithoutShippingInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinates?: CoordinatesCreateNestedOneWithoutTrackingInput
    history?: TrackingEventCreateNestedManyWithoutTrackingInput
  }

  export type TrackingUncheckedCreateWithoutShippingInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinatesId?: string | null
    history?: TrackingEventUncheckedCreateNestedManyWithoutTrackingInput
  }

  export type TrackingCreateOrConnectWithoutShippingInput = {
    where: TrackingWhereUniqueInput
    create: XOR<TrackingCreateWithoutShippingInput, TrackingUncheckedCreateWithoutShippingInput>
  }

  export type OrderUpsertWithoutShippingInput = {
    update: XOR<OrderUpdateWithoutShippingInput, OrderUncheckedUpdateWithoutShippingInput>
    create: XOR<OrderCreateWithoutShippingInput, OrderUncheckedCreateWithoutShippingInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutShippingInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutShippingInput, OrderUncheckedUpdateWithoutShippingInput>
  }

  export type OrderUpdateWithoutShippingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutShippingInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    statusHistory?: OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type TrackingUpsertWithoutShippingInput = {
    update: XOR<TrackingUpdateWithoutShippingInput, TrackingUncheckedUpdateWithoutShippingInput>
    create: XOR<TrackingCreateWithoutShippingInput, TrackingUncheckedCreateWithoutShippingInput>
    where?: TrackingWhereInput
  }

  export type TrackingUpdateToOneWithWhereWithoutShippingInput = {
    where?: TrackingWhereInput
    data: XOR<TrackingUpdateWithoutShippingInput, TrackingUncheckedUpdateWithoutShippingInput>
  }

  export type TrackingUpdateWithoutShippingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    coordinates?: CoordinatesUpdateOneWithoutTrackingNestedInput
    history?: TrackingEventUpdateManyWithoutTrackingNestedInput
  }

  export type TrackingUncheckedUpdateWithoutShippingInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    coordinatesId?: NullableStringFieldUpdateOperationsInput | string | null
    history?: TrackingEventUncheckedUpdateManyWithoutTrackingNestedInput
  }

  export type ShippingCreateWithoutTrackingInput = {
    id?: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutShippingInput
  }

  export type ShippingUncheckedCreateWithoutTrackingInput = {
    id?: string
    orderId: string
    method: string
    cost: number
    shippingAddressId?: string | null
    estimatedDelivery?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShippingCreateOrConnectWithoutTrackingInput = {
    where: ShippingWhereUniqueInput
    create: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
  }

  export type CoordinatesCreateWithoutTrackingInput = {
    id?: string
    current: PointCreateNestedOneWithoutCurrentForInput
    destination: PointCreateNestedOneWithoutDestinationForInput
    origin: PointCreateNestedOneWithoutOriginForInput
  }

  export type CoordinatesUncheckedCreateWithoutTrackingInput = {
    id?: string
    originId: string
    currentId: string
    destinationId: string
  }

  export type CoordinatesCreateOrConnectWithoutTrackingInput = {
    where: CoordinatesWhereUniqueInput
    create: XOR<CoordinatesCreateWithoutTrackingInput, CoordinatesUncheckedCreateWithoutTrackingInput>
  }

  export type TrackingEventCreateWithoutTrackingInput = {
    id?: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
  }

  export type TrackingEventUncheckedCreateWithoutTrackingInput = {
    id?: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
  }

  export type TrackingEventCreateOrConnectWithoutTrackingInput = {
    where: TrackingEventWhereUniqueInput
    create: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput>
  }

  export type TrackingEventCreateManyTrackingInputEnvelope = {
    data: TrackingEventCreateManyTrackingInput | TrackingEventCreateManyTrackingInput[]
    skipDuplicates?: boolean
  }

  export type ShippingUpsertWithoutTrackingInput = {
    update: XOR<ShippingUpdateWithoutTrackingInput, ShippingUncheckedUpdateWithoutTrackingInput>
    create: XOR<ShippingCreateWithoutTrackingInput, ShippingUncheckedCreateWithoutTrackingInput>
    where?: ShippingWhereInput
  }

  export type ShippingUpdateToOneWithWhereWithoutTrackingInput = {
    where?: ShippingWhereInput
    data: XOR<ShippingUpdateWithoutTrackingInput, ShippingUncheckedUpdateWithoutTrackingInput>
  }

  export type ShippingUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutShippingNestedInput
  }

  export type ShippingUncheckedUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    cost?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: NullableStringFieldUpdateOperationsInput | string | null
    estimatedDelivery?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CoordinatesUpsertWithoutTrackingInput = {
    update: XOR<CoordinatesUpdateWithoutTrackingInput, CoordinatesUncheckedUpdateWithoutTrackingInput>
    create: XOR<CoordinatesCreateWithoutTrackingInput, CoordinatesUncheckedCreateWithoutTrackingInput>
    where?: CoordinatesWhereInput
  }

  export type CoordinatesUpdateToOneWithWhereWithoutTrackingInput = {
    where?: CoordinatesWhereInput
    data: XOR<CoordinatesUpdateWithoutTrackingInput, CoordinatesUncheckedUpdateWithoutTrackingInput>
  }

  export type CoordinatesUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: PointUpdateOneRequiredWithoutCurrentForNestedInput
    destination?: PointUpdateOneRequiredWithoutDestinationForNestedInput
    origin?: PointUpdateOneRequiredWithoutOriginForNestedInput
  }

  export type CoordinatesUncheckedUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    currentId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingEventUpsertWithWhereUniqueWithoutTrackingInput = {
    where: TrackingEventWhereUniqueInput
    update: XOR<TrackingEventUpdateWithoutTrackingInput, TrackingEventUncheckedUpdateWithoutTrackingInput>
    create: XOR<TrackingEventCreateWithoutTrackingInput, TrackingEventUncheckedCreateWithoutTrackingInput>
  }

  export type TrackingEventUpdateWithWhereUniqueWithoutTrackingInput = {
    where: TrackingEventWhereUniqueInput
    data: XOR<TrackingEventUpdateWithoutTrackingInput, TrackingEventUncheckedUpdateWithoutTrackingInput>
  }

  export type TrackingEventUpdateManyWithWhereWithoutTrackingInput = {
    where: TrackingEventScalarWhereInput
    data: XOR<TrackingEventUpdateManyMutationInput, TrackingEventUncheckedUpdateManyWithoutTrackingInput>
  }

  export type TrackingEventScalarWhereInput = {
    AND?: TrackingEventScalarWhereInput | TrackingEventScalarWhereInput[]
    OR?: TrackingEventScalarWhereInput[]
    NOT?: TrackingEventScalarWhereInput | TrackingEventScalarWhereInput[]
    id?: StringFilter<"TrackingEvent"> | string
    trackingId?: StringFilter<"TrackingEvent"> | string
    date?: DateTimeFilter<"TrackingEvent"> | Date | string
    time?: DateTimeFilter<"TrackingEvent"> | Date | string
    location?: StringFilter<"TrackingEvent"> | string
    status?: StringFilter<"TrackingEvent"> | string
    description?: StringFilter<"TrackingEvent"> | string
  }

  export type TrackingCreateWithoutHistoryInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    shipping?: ShippingCreateNestedOneWithoutTrackingInput
    coordinates?: CoordinatesCreateNestedOneWithoutTrackingInput
  }

  export type TrackingUncheckedCreateWithoutHistoryInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    coordinatesId?: string | null
    shipping?: ShippingUncheckedCreateNestedOneWithoutTrackingInput
  }

  export type TrackingCreateOrConnectWithoutHistoryInput = {
    where: TrackingWhereUniqueInput
    create: XOR<TrackingCreateWithoutHistoryInput, TrackingUncheckedCreateWithoutHistoryInput>
  }

  export type TrackingUpsertWithoutHistoryInput = {
    update: XOR<TrackingUpdateWithoutHistoryInput, TrackingUncheckedUpdateWithoutHistoryInput>
    create: XOR<TrackingCreateWithoutHistoryInput, TrackingUncheckedCreateWithoutHistoryInput>
    where?: TrackingWhereInput
  }

  export type TrackingUpdateToOneWithWhereWithoutHistoryInput = {
    where?: TrackingWhereInput
    data: XOR<TrackingUpdateWithoutHistoryInput, TrackingUncheckedUpdateWithoutHistoryInput>
  }

  export type TrackingUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    shipping?: ShippingUpdateOneWithoutTrackingNestedInput
    coordinates?: CoordinatesUpdateOneWithoutTrackingNestedInput
  }

  export type TrackingUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    coordinatesId?: NullableStringFieldUpdateOperationsInput | string | null
    shipping?: ShippingUncheckedUpdateOneWithoutTrackingNestedInput
  }

  export type PointCreateWithoutCurrentForInput = {
    id?: string
    lat: number
    lng: number
    destinationFor?: CoordinatesCreateNestedOneWithoutDestinationInput
    originFor?: CoordinatesCreateNestedOneWithoutOriginInput
  }

  export type PointUncheckedCreateWithoutCurrentForInput = {
    id?: string
    lat: number
    lng: number
    destinationFor?: CoordinatesUncheckedCreateNestedOneWithoutDestinationInput
    originFor?: CoordinatesUncheckedCreateNestedOneWithoutOriginInput
  }

  export type PointCreateOrConnectWithoutCurrentForInput = {
    where: PointWhereUniqueInput
    create: XOR<PointCreateWithoutCurrentForInput, PointUncheckedCreateWithoutCurrentForInput>
  }

  export type PointCreateWithoutDestinationForInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesCreateNestedOneWithoutCurrentInput
    originFor?: CoordinatesCreateNestedOneWithoutOriginInput
  }

  export type PointUncheckedCreateWithoutDestinationForInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesUncheckedCreateNestedOneWithoutCurrentInput
    originFor?: CoordinatesUncheckedCreateNestedOneWithoutOriginInput
  }

  export type PointCreateOrConnectWithoutDestinationForInput = {
    where: PointWhereUniqueInput
    create: XOR<PointCreateWithoutDestinationForInput, PointUncheckedCreateWithoutDestinationForInput>
  }

  export type PointCreateWithoutOriginForInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesCreateNestedOneWithoutCurrentInput
    destinationFor?: CoordinatesCreateNestedOneWithoutDestinationInput
  }

  export type PointUncheckedCreateWithoutOriginForInput = {
    id?: string
    lat: number
    lng: number
    currentFor?: CoordinatesUncheckedCreateNestedOneWithoutCurrentInput
    destinationFor?: CoordinatesUncheckedCreateNestedOneWithoutDestinationInput
  }

  export type PointCreateOrConnectWithoutOriginForInput = {
    where: PointWhereUniqueInput
    create: XOR<PointCreateWithoutOriginForInput, PointUncheckedCreateWithoutOriginForInput>
  }

  export type TrackingCreateWithoutCoordinatesInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    shipping?: ShippingCreateNestedOneWithoutTrackingInput
    history?: TrackingEventCreateNestedManyWithoutTrackingInput
  }

  export type TrackingUncheckedCreateWithoutCoordinatesInput = {
    id?: string
    number: string
    carrier: string
    status: string
    currentLocation: string
    shipping?: ShippingUncheckedCreateNestedOneWithoutTrackingInput
    history?: TrackingEventUncheckedCreateNestedManyWithoutTrackingInput
  }

  export type TrackingCreateOrConnectWithoutCoordinatesInput = {
    where: TrackingWhereUniqueInput
    create: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
  }

  export type PointUpsertWithoutCurrentForInput = {
    update: XOR<PointUpdateWithoutCurrentForInput, PointUncheckedUpdateWithoutCurrentForInput>
    create: XOR<PointCreateWithoutCurrentForInput, PointUncheckedCreateWithoutCurrentForInput>
    where?: PointWhereInput
  }

  export type PointUpdateToOneWithWhereWithoutCurrentForInput = {
    where?: PointWhereInput
    data: XOR<PointUpdateWithoutCurrentForInput, PointUncheckedUpdateWithoutCurrentForInput>
  }

  export type PointUpdateWithoutCurrentForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    destinationFor?: CoordinatesUpdateOneWithoutDestinationNestedInput
    originFor?: CoordinatesUpdateOneWithoutOriginNestedInput
  }

  export type PointUncheckedUpdateWithoutCurrentForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    destinationFor?: CoordinatesUncheckedUpdateOneWithoutDestinationNestedInput
    originFor?: CoordinatesUncheckedUpdateOneWithoutOriginNestedInput
  }

  export type PointUpsertWithoutDestinationForInput = {
    update: XOR<PointUpdateWithoutDestinationForInput, PointUncheckedUpdateWithoutDestinationForInput>
    create: XOR<PointCreateWithoutDestinationForInput, PointUncheckedCreateWithoutDestinationForInput>
    where?: PointWhereInput
  }

  export type PointUpdateToOneWithWhereWithoutDestinationForInput = {
    where?: PointWhereInput
    data: XOR<PointUpdateWithoutDestinationForInput, PointUncheckedUpdateWithoutDestinationForInput>
  }

  export type PointUpdateWithoutDestinationForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUpdateOneWithoutCurrentNestedInput
    originFor?: CoordinatesUpdateOneWithoutOriginNestedInput
  }

  export type PointUncheckedUpdateWithoutDestinationForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUncheckedUpdateOneWithoutCurrentNestedInput
    originFor?: CoordinatesUncheckedUpdateOneWithoutOriginNestedInput
  }

  export type PointUpsertWithoutOriginForInput = {
    update: XOR<PointUpdateWithoutOriginForInput, PointUncheckedUpdateWithoutOriginForInput>
    create: XOR<PointCreateWithoutOriginForInput, PointUncheckedCreateWithoutOriginForInput>
    where?: PointWhereInput
  }

  export type PointUpdateToOneWithWhereWithoutOriginForInput = {
    where?: PointWhereInput
    data: XOR<PointUpdateWithoutOriginForInput, PointUncheckedUpdateWithoutOriginForInput>
  }

  export type PointUpdateWithoutOriginForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUpdateOneWithoutCurrentNestedInput
    destinationFor?: CoordinatesUpdateOneWithoutDestinationNestedInput
  }

  export type PointUncheckedUpdateWithoutOriginForInput = {
    id?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    currentFor?: CoordinatesUncheckedUpdateOneWithoutCurrentNestedInput
    destinationFor?: CoordinatesUncheckedUpdateOneWithoutDestinationNestedInput
  }

  export type TrackingUpsertWithoutCoordinatesInput = {
    update: XOR<TrackingUpdateWithoutCoordinatesInput, TrackingUncheckedUpdateWithoutCoordinatesInput>
    create: XOR<TrackingCreateWithoutCoordinatesInput, TrackingUncheckedCreateWithoutCoordinatesInput>
    where?: TrackingWhereInput
  }

  export type TrackingUpdateToOneWithWhereWithoutCoordinatesInput = {
    where?: TrackingWhereInput
    data: XOR<TrackingUpdateWithoutCoordinatesInput, TrackingUncheckedUpdateWithoutCoordinatesInput>
  }

  export type TrackingUpdateWithoutCoordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    shipping?: ShippingUpdateOneWithoutTrackingNestedInput
    history?: TrackingEventUpdateManyWithoutTrackingNestedInput
  }

  export type TrackingUncheckedUpdateWithoutCoordinatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    carrier?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    currentLocation?: StringFieldUpdateOperationsInput | string
    shipping?: ShippingUncheckedUpdateOneWithoutTrackingNestedInput
    history?: TrackingEventUncheckedUpdateManyWithoutTrackingNestedInput
  }

  export type CoordinatesCreateWithoutCurrentInput = {
    id?: string
    destination: PointCreateNestedOneWithoutDestinationForInput
    origin: PointCreateNestedOneWithoutOriginForInput
    tracking?: TrackingCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesUncheckedCreateWithoutCurrentInput = {
    id?: string
    originId: string
    destinationId: string
    tracking?: TrackingUncheckedCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesCreateOrConnectWithoutCurrentInput = {
    where: CoordinatesWhereUniqueInput
    create: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
  }

  export type CoordinatesCreateWithoutDestinationInput = {
    id?: string
    current: PointCreateNestedOneWithoutCurrentForInput
    origin: PointCreateNestedOneWithoutOriginForInput
    tracking?: TrackingCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesUncheckedCreateWithoutDestinationInput = {
    id?: string
    originId: string
    currentId: string
    tracking?: TrackingUncheckedCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesCreateOrConnectWithoutDestinationInput = {
    where: CoordinatesWhereUniqueInput
    create: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
  }

  export type CoordinatesCreateWithoutOriginInput = {
    id?: string
    current: PointCreateNestedOneWithoutCurrentForInput
    destination: PointCreateNestedOneWithoutDestinationForInput
    tracking?: TrackingCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesUncheckedCreateWithoutOriginInput = {
    id?: string
    currentId: string
    destinationId: string
    tracking?: TrackingUncheckedCreateNestedOneWithoutCoordinatesInput
  }

  export type CoordinatesCreateOrConnectWithoutOriginInput = {
    where: CoordinatesWhereUniqueInput
    create: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
  }

  export type CoordinatesUpsertWithoutCurrentInput = {
    update: XOR<CoordinatesUpdateWithoutCurrentInput, CoordinatesUncheckedUpdateWithoutCurrentInput>
    create: XOR<CoordinatesCreateWithoutCurrentInput, CoordinatesUncheckedCreateWithoutCurrentInput>
    where?: CoordinatesWhereInput
  }

  export type CoordinatesUpdateToOneWithWhereWithoutCurrentInput = {
    where?: CoordinatesWhereInput
    data: XOR<CoordinatesUpdateWithoutCurrentInput, CoordinatesUncheckedUpdateWithoutCurrentInput>
  }

  export type CoordinatesUpdateWithoutCurrentInput = {
    id?: StringFieldUpdateOperationsInput | string
    destination?: PointUpdateOneRequiredWithoutDestinationForNestedInput
    origin?: PointUpdateOneRequiredWithoutOriginForNestedInput
    tracking?: TrackingUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUncheckedUpdateWithoutCurrentInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    tracking?: TrackingUncheckedUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUpsertWithoutDestinationInput = {
    update: XOR<CoordinatesUpdateWithoutDestinationInput, CoordinatesUncheckedUpdateWithoutDestinationInput>
    create: XOR<CoordinatesCreateWithoutDestinationInput, CoordinatesUncheckedCreateWithoutDestinationInput>
    where?: CoordinatesWhereInput
  }

  export type CoordinatesUpdateToOneWithWhereWithoutDestinationInput = {
    where?: CoordinatesWhereInput
    data: XOR<CoordinatesUpdateWithoutDestinationInput, CoordinatesUncheckedUpdateWithoutDestinationInput>
  }

  export type CoordinatesUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: PointUpdateOneRequiredWithoutCurrentForNestedInput
    origin?: PointUpdateOneRequiredWithoutOriginForNestedInput
    tracking?: TrackingUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUncheckedUpdateWithoutDestinationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originId?: StringFieldUpdateOperationsInput | string
    currentId?: StringFieldUpdateOperationsInput | string
    tracking?: TrackingUncheckedUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUpsertWithoutOriginInput = {
    update: XOR<CoordinatesUpdateWithoutOriginInput, CoordinatesUncheckedUpdateWithoutOriginInput>
    create: XOR<CoordinatesCreateWithoutOriginInput, CoordinatesUncheckedCreateWithoutOriginInput>
    where?: CoordinatesWhereInput
  }

  export type CoordinatesUpdateToOneWithWhereWithoutOriginInput = {
    where?: CoordinatesWhereInput
    data: XOR<CoordinatesUpdateWithoutOriginInput, CoordinatesUncheckedUpdateWithoutOriginInput>
  }

  export type CoordinatesUpdateWithoutOriginInput = {
    id?: StringFieldUpdateOperationsInput | string
    current?: PointUpdateOneRequiredWithoutCurrentForNestedInput
    destination?: PointUpdateOneRequiredWithoutDestinationForNestedInput
    tracking?: TrackingUpdateOneWithoutCoordinatesNestedInput
  }

  export type CoordinatesUncheckedUpdateWithoutOriginInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentId?: StringFieldUpdateOperationsInput | string
    destinationId?: StringFieldUpdateOperationsInput | string
    tracking?: TrackingUncheckedUpdateOneWithoutCoordinatesNestedInput
  }

  export type OrderCreateWithoutStatusHistoryInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteCreateNestedManyWithoutOrderInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    shipping?: ShippingCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    userId: string
    status?: $Enums.OrderStatus
    totalAmount: number
    shippingAddressId: string
    paymentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    notes?: OrderNoteUncheckedCreateNestedManyWithoutOrderInput
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    shipping?: ShippingUncheckedCreateNestedOneWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutStatusHistoryInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
  }

  export type OrderUpsertWithoutStatusHistoryInput = {
    update: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<OrderCreateWithoutStatusHistoryInput, OrderUncheckedCreateWithoutStatusHistoryInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutStatusHistoryInput, OrderUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type OrderUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUpdateManyWithoutOrderNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUpdateOneWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalAmount?: FloatFieldUpdateOperationsInput | number
    shippingAddressId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: OrderNoteUncheckedUpdateManyWithoutOrderNestedInput
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    shipping?: ShippingUncheckedUpdateOneWithoutOrderNestedInput
  }

  export type OrderNoteCreateManyOrderInput = {
    id?: string
    note: string
    createdAt?: Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    variantId: string
    quantity: number
    productId: string
    productName: string
    productSlug: string
    variantName: string
    sku: string
    price: number
    image: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderStatusHistoryCreateManyOrderInput = {
    id?: string
    status: $Enums.OrderStatus
    description?: string | null
    createdAt?: Date | string
  }

  export type OrderNoteUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderNoteUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    variantId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    productSlug?: StringFieldUpdateOperationsInput | string
    variantName?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderStatusHistoryUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingEventCreateManyTrackingInput = {
    id?: string
    date: Date | string
    time: Date | string
    location: string
    status: string
    description: string
  }

  export type TrackingEventUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingEventUncheckedUpdateWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TrackingEventUncheckedUpdateManyWithoutTrackingInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
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