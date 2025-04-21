
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
 * Model Saga
 * 
 */
export type Saga = $Result.DefaultSelection<Prisma.$SagaPayload>
/**
 * Model Step
 * 
 */
export type Step = $Result.DefaultSelection<Prisma.$StepPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sagas
 * const sagas = await prisma.saga.findMany()
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
   * // Fetch zero or more Sagas
   * const sagas = await prisma.saga.findMany()
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
   * `prisma.saga`: Exposes CRUD operations for the **Saga** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sagas
    * const sagas = await prisma.saga.findMany()
    * ```
    */
  get saga(): Prisma.SagaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.step`: Exposes CRUD operations for the **Step** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Steps
    * const steps = await prisma.step.findMany()
    * ```
    */
  get step(): Prisma.StepDelegate<ExtArgs, ClientOptions>;
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
    Saga: 'Saga',
    Step: 'Step'
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
      modelProps: "saga" | "step"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Saga: {
        payload: Prisma.$SagaPayload<ExtArgs>
        fields: Prisma.SagaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SagaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SagaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          findFirst: {
            args: Prisma.SagaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SagaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          findMany: {
            args: Prisma.SagaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>[]
          }
          create: {
            args: Prisma.SagaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          createMany: {
            args: Prisma.SagaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SagaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>[]
          }
          delete: {
            args: Prisma.SagaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          update: {
            args: Prisma.SagaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          deleteMany: {
            args: Prisma.SagaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SagaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SagaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>[]
          }
          upsert: {
            args: Prisma.SagaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SagaPayload>
          }
          aggregate: {
            args: Prisma.SagaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSaga>
          }
          groupBy: {
            args: Prisma.SagaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SagaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SagaCountArgs<ExtArgs>
            result: $Utils.Optional<SagaCountAggregateOutputType> | number
          }
        }
      }
      Step: {
        payload: Prisma.$StepPayload<ExtArgs>
        fields: Prisma.StepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          findFirst: {
            args: Prisma.StepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          findMany: {
            args: Prisma.StepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>[]
          }
          create: {
            args: Prisma.StepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          createMany: {
            args: Prisma.StepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>[]
          }
          delete: {
            args: Prisma.StepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          update: {
            args: Prisma.StepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          deleteMany: {
            args: Prisma.StepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>[]
          }
          upsert: {
            args: Prisma.StepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StepPayload>
          }
          aggregate: {
            args: Prisma.StepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStep>
          }
          groupBy: {
            args: Prisma.StepGroupByArgs<ExtArgs>
            result: $Utils.Optional<StepGroupByOutputType>[]
          }
          count: {
            args: Prisma.StepCountArgs<ExtArgs>
            result: $Utils.Optional<StepCountAggregateOutputType> | number
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
    saga?: SagaOmit
    step?: StepOmit
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
   * Count Type SagaCountOutputType
   */

  export type SagaCountOutputType = {
    steps: number
  }

  export type SagaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | SagaCountOutputTypeCountStepsArgs
  }

  // Custom InputTypes
  /**
   * SagaCountOutputType without action
   */
  export type SagaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SagaCountOutputType
     */
    select?: SagaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SagaCountOutputType without action
   */
  export type SagaCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Saga
   */

  export type AggregateSaga = {
    _count: SagaCountAggregateOutputType | null
    _min: SagaMinAggregateOutputType | null
    _max: SagaMaxAggregateOutputType | null
  }

  export type SagaMinAggregateOutputType = {
    id: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SagaMaxAggregateOutputType = {
    id: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SagaCountAggregateOutputType = {
    id: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SagaMinAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SagaMaxAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SagaCountAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SagaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Saga to aggregate.
     */
    where?: SagaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sagas to fetch.
     */
    orderBy?: SagaOrderByWithRelationInput | SagaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SagaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sagas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sagas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sagas
    **/
    _count?: true | SagaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SagaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SagaMaxAggregateInputType
  }

  export type GetSagaAggregateType<T extends SagaAggregateArgs> = {
        [P in keyof T & keyof AggregateSaga]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSaga[P]>
      : GetScalarType<T[P], AggregateSaga[P]>
  }




  export type SagaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SagaWhereInput
    orderBy?: SagaOrderByWithAggregationInput | SagaOrderByWithAggregationInput[]
    by: SagaScalarFieldEnum[] | SagaScalarFieldEnum
    having?: SagaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SagaCountAggregateInputType | true
    _min?: SagaMinAggregateInputType
    _max?: SagaMaxAggregateInputType
  }

  export type SagaGroupByOutputType = {
    id: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: SagaCountAggregateOutputType | null
    _min: SagaMinAggregateOutputType | null
    _max: SagaMaxAggregateOutputType | null
  }

  type GetSagaGroupByPayload<T extends SagaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SagaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SagaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SagaGroupByOutputType[P]>
            : GetScalarType<T[P], SagaGroupByOutputType[P]>
        }
      >
    >


  export type SagaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    steps?: boolean | Saga$stepsArgs<ExtArgs>
    _count?: boolean | SagaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["saga"]>

  export type SagaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["saga"]>

  export type SagaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["saga"]>

  export type SagaSelectScalar = {
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SagaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["saga"]>
  export type SagaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | Saga$stepsArgs<ExtArgs>
    _count?: boolean | SagaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SagaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SagaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SagaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Saga"
    objects: {
      steps: Prisma.$StepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["saga"]>
    composites: {}
  }

  type SagaGetPayload<S extends boolean | null | undefined | SagaDefaultArgs> = $Result.GetResult<Prisma.$SagaPayload, S>

  type SagaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SagaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SagaCountAggregateInputType | true
    }

  export interface SagaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Saga'], meta: { name: 'Saga' } }
    /**
     * Find zero or one Saga that matches the filter.
     * @param {SagaFindUniqueArgs} args - Arguments to find a Saga
     * @example
     * // Get one Saga
     * const saga = await prisma.saga.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SagaFindUniqueArgs>(args: SelectSubset<T, SagaFindUniqueArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Saga that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SagaFindUniqueOrThrowArgs} args - Arguments to find a Saga
     * @example
     * // Get one Saga
     * const saga = await prisma.saga.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SagaFindUniqueOrThrowArgs>(args: SelectSubset<T, SagaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saga that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaFindFirstArgs} args - Arguments to find a Saga
     * @example
     * // Get one Saga
     * const saga = await prisma.saga.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SagaFindFirstArgs>(args?: SelectSubset<T, SagaFindFirstArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Saga that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaFindFirstOrThrowArgs} args - Arguments to find a Saga
     * @example
     * // Get one Saga
     * const saga = await prisma.saga.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SagaFindFirstOrThrowArgs>(args?: SelectSubset<T, SagaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sagas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sagas
     * const sagas = await prisma.saga.findMany()
     * 
     * // Get first 10 Sagas
     * const sagas = await prisma.saga.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sagaWithIdOnly = await prisma.saga.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SagaFindManyArgs>(args?: SelectSubset<T, SagaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Saga.
     * @param {SagaCreateArgs} args - Arguments to create a Saga.
     * @example
     * // Create one Saga
     * const Saga = await prisma.saga.create({
     *   data: {
     *     // ... data to create a Saga
     *   }
     * })
     * 
     */
    create<T extends SagaCreateArgs>(args: SelectSubset<T, SagaCreateArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sagas.
     * @param {SagaCreateManyArgs} args - Arguments to create many Sagas.
     * @example
     * // Create many Sagas
     * const saga = await prisma.saga.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SagaCreateManyArgs>(args?: SelectSubset<T, SagaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sagas and returns the data saved in the database.
     * @param {SagaCreateManyAndReturnArgs} args - Arguments to create many Sagas.
     * @example
     * // Create many Sagas
     * const saga = await prisma.saga.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sagas and only return the `id`
     * const sagaWithIdOnly = await prisma.saga.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SagaCreateManyAndReturnArgs>(args?: SelectSubset<T, SagaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Saga.
     * @param {SagaDeleteArgs} args - Arguments to delete one Saga.
     * @example
     * // Delete one Saga
     * const Saga = await prisma.saga.delete({
     *   where: {
     *     // ... filter to delete one Saga
     *   }
     * })
     * 
     */
    delete<T extends SagaDeleteArgs>(args: SelectSubset<T, SagaDeleteArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Saga.
     * @param {SagaUpdateArgs} args - Arguments to update one Saga.
     * @example
     * // Update one Saga
     * const saga = await prisma.saga.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SagaUpdateArgs>(args: SelectSubset<T, SagaUpdateArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sagas.
     * @param {SagaDeleteManyArgs} args - Arguments to filter Sagas to delete.
     * @example
     * // Delete a few Sagas
     * const { count } = await prisma.saga.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SagaDeleteManyArgs>(args?: SelectSubset<T, SagaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sagas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sagas
     * const saga = await prisma.saga.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SagaUpdateManyArgs>(args: SelectSubset<T, SagaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sagas and returns the data updated in the database.
     * @param {SagaUpdateManyAndReturnArgs} args - Arguments to update many Sagas.
     * @example
     * // Update many Sagas
     * const saga = await prisma.saga.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sagas and only return the `id`
     * const sagaWithIdOnly = await prisma.saga.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SagaUpdateManyAndReturnArgs>(args: SelectSubset<T, SagaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Saga.
     * @param {SagaUpsertArgs} args - Arguments to update or create a Saga.
     * @example
     * // Update or create a Saga
     * const saga = await prisma.saga.upsert({
     *   create: {
     *     // ... data to create a Saga
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Saga we want to update
     *   }
     * })
     */
    upsert<T extends SagaUpsertArgs>(args: SelectSubset<T, SagaUpsertArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sagas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaCountArgs} args - Arguments to filter Sagas to count.
     * @example
     * // Count the number of Sagas
     * const count = await prisma.saga.count({
     *   where: {
     *     // ... the filter for the Sagas we want to count
     *   }
     * })
    **/
    count<T extends SagaCountArgs>(
      args?: Subset<T, SagaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SagaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Saga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SagaAggregateArgs>(args: Subset<T, SagaAggregateArgs>): Prisma.PrismaPromise<GetSagaAggregateType<T>>

    /**
     * Group by Saga.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SagaGroupByArgs} args - Group by arguments.
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
      T extends SagaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SagaGroupByArgs['orderBy'] }
        : { orderBy?: SagaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SagaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSagaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Saga model
   */
  readonly fields: SagaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Saga.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SagaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends Saga$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Saga$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Saga model
   */
  interface SagaFieldRefs {
    readonly id: FieldRef<"Saga", 'String'>
    readonly status: FieldRef<"Saga", 'String'>
    readonly createdAt: FieldRef<"Saga", 'DateTime'>
    readonly updatedAt: FieldRef<"Saga", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Saga findUnique
   */
  export type SagaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter, which Saga to fetch.
     */
    where: SagaWhereUniqueInput
  }

  /**
   * Saga findUniqueOrThrow
   */
  export type SagaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter, which Saga to fetch.
     */
    where: SagaWhereUniqueInput
  }

  /**
   * Saga findFirst
   */
  export type SagaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter, which Saga to fetch.
     */
    where?: SagaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sagas to fetch.
     */
    orderBy?: SagaOrderByWithRelationInput | SagaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sagas.
     */
    cursor?: SagaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sagas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sagas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sagas.
     */
    distinct?: SagaScalarFieldEnum | SagaScalarFieldEnum[]
  }

  /**
   * Saga findFirstOrThrow
   */
  export type SagaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter, which Saga to fetch.
     */
    where?: SagaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sagas to fetch.
     */
    orderBy?: SagaOrderByWithRelationInput | SagaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sagas.
     */
    cursor?: SagaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sagas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sagas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sagas.
     */
    distinct?: SagaScalarFieldEnum | SagaScalarFieldEnum[]
  }

  /**
   * Saga findMany
   */
  export type SagaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter, which Sagas to fetch.
     */
    where?: SagaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sagas to fetch.
     */
    orderBy?: SagaOrderByWithRelationInput | SagaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sagas.
     */
    cursor?: SagaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sagas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sagas.
     */
    skip?: number
    distinct?: SagaScalarFieldEnum | SagaScalarFieldEnum[]
  }

  /**
   * Saga create
   */
  export type SagaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * The data needed to create a Saga.
     */
    data: XOR<SagaCreateInput, SagaUncheckedCreateInput>
  }

  /**
   * Saga createMany
   */
  export type SagaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sagas.
     */
    data: SagaCreateManyInput | SagaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Saga createManyAndReturn
   */
  export type SagaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * The data used to create many Sagas.
     */
    data: SagaCreateManyInput | SagaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Saga update
   */
  export type SagaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * The data needed to update a Saga.
     */
    data: XOR<SagaUpdateInput, SagaUncheckedUpdateInput>
    /**
     * Choose, which Saga to update.
     */
    where: SagaWhereUniqueInput
  }

  /**
   * Saga updateMany
   */
  export type SagaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sagas.
     */
    data: XOR<SagaUpdateManyMutationInput, SagaUncheckedUpdateManyInput>
    /**
     * Filter which Sagas to update
     */
    where?: SagaWhereInput
    /**
     * Limit how many Sagas to update.
     */
    limit?: number
  }

  /**
   * Saga updateManyAndReturn
   */
  export type SagaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * The data used to update Sagas.
     */
    data: XOR<SagaUpdateManyMutationInput, SagaUncheckedUpdateManyInput>
    /**
     * Filter which Sagas to update
     */
    where?: SagaWhereInput
    /**
     * Limit how many Sagas to update.
     */
    limit?: number
  }

  /**
   * Saga upsert
   */
  export type SagaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * The filter to search for the Saga to update in case it exists.
     */
    where: SagaWhereUniqueInput
    /**
     * In case the Saga found by the `where` argument doesn't exist, create a new Saga with this data.
     */
    create: XOR<SagaCreateInput, SagaUncheckedCreateInput>
    /**
     * In case the Saga was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SagaUpdateInput, SagaUncheckedUpdateInput>
  }

  /**
   * Saga delete
   */
  export type SagaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
    /**
     * Filter which Saga to delete.
     */
    where: SagaWhereUniqueInput
  }

  /**
   * Saga deleteMany
   */
  export type SagaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sagas to delete
     */
    where?: SagaWhereInput
    /**
     * Limit how many Sagas to delete.
     */
    limit?: number
  }

  /**
   * Saga.steps
   */
  export type Saga$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    where?: StepWhereInput
    orderBy?: StepOrderByWithRelationInput | StepOrderByWithRelationInput[]
    cursor?: StepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StepScalarFieldEnum | StepScalarFieldEnum[]
  }

  /**
   * Saga without action
   */
  export type SagaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Saga
     */
    select?: SagaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Saga
     */
    omit?: SagaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SagaInclude<ExtArgs> | null
  }


  /**
   * Model Step
   */

  export type AggregateStep = {
    _count: StepCountAggregateOutputType | null
    _min: StepMinAggregateOutputType | null
    _max: StepMaxAggregateOutputType | null
  }

  export type StepMinAggregateOutputType = {
    id: string | null
    sagaId: string | null
    name: string | null
    status: string | null
  }

  export type StepMaxAggregateOutputType = {
    id: string | null
    sagaId: string | null
    name: string | null
    status: string | null
  }

  export type StepCountAggregateOutputType = {
    id: number
    sagaId: number
    name: number
    status: number
    _all: number
  }


  export type StepMinAggregateInputType = {
    id?: true
    sagaId?: true
    name?: true
    status?: true
  }

  export type StepMaxAggregateInputType = {
    id?: true
    sagaId?: true
    name?: true
    status?: true
  }

  export type StepCountAggregateInputType = {
    id?: true
    sagaId?: true
    name?: true
    status?: true
    _all?: true
  }

  export type StepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Step to aggregate.
     */
    where?: StepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Steps to fetch.
     */
    orderBy?: StepOrderByWithRelationInput | StepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Steps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Steps
    **/
    _count?: true | StepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StepMaxAggregateInputType
  }

  export type GetStepAggregateType<T extends StepAggregateArgs> = {
        [P in keyof T & keyof AggregateStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStep[P]>
      : GetScalarType<T[P], AggregateStep[P]>
  }




  export type StepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StepWhereInput
    orderBy?: StepOrderByWithAggregationInput | StepOrderByWithAggregationInput[]
    by: StepScalarFieldEnum[] | StepScalarFieldEnum
    having?: StepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StepCountAggregateInputType | true
    _min?: StepMinAggregateInputType
    _max?: StepMaxAggregateInputType
  }

  export type StepGroupByOutputType = {
    id: string
    sagaId: string
    name: string
    status: string
    _count: StepCountAggregateOutputType | null
    _min: StepMinAggregateOutputType | null
    _max: StepMaxAggregateOutputType | null
  }

  type GetStepGroupByPayload<T extends StepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StepGroupByOutputType[P]>
            : GetScalarType<T[P], StepGroupByOutputType[P]>
        }
      >
    >


  export type StepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sagaId?: boolean
    name?: boolean
    status?: boolean
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["step"]>

  export type StepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sagaId?: boolean
    name?: boolean
    status?: boolean
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["step"]>

  export type StepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sagaId?: boolean
    name?: boolean
    status?: boolean
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["step"]>

  export type StepSelectScalar = {
    id?: boolean
    sagaId?: boolean
    name?: boolean
    status?: boolean
  }

  export type StepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sagaId" | "name" | "status", ExtArgs["result"]["step"]>
  export type StepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }
  export type StepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }
  export type StepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Saga?: boolean | SagaDefaultArgs<ExtArgs>
  }

  export type $StepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Step"
    objects: {
      Saga: Prisma.$SagaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sagaId: string
      name: string
      status: string
    }, ExtArgs["result"]["step"]>
    composites: {}
  }

  type StepGetPayload<S extends boolean | null | undefined | StepDefaultArgs> = $Result.GetResult<Prisma.$StepPayload, S>

  type StepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StepCountAggregateInputType | true
    }

  export interface StepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Step'], meta: { name: 'Step' } }
    /**
     * Find zero or one Step that matches the filter.
     * @param {StepFindUniqueArgs} args - Arguments to find a Step
     * @example
     * // Get one Step
     * const step = await prisma.step.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StepFindUniqueArgs>(args: SelectSubset<T, StepFindUniqueArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Step that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StepFindUniqueOrThrowArgs} args - Arguments to find a Step
     * @example
     * // Get one Step
     * const step = await prisma.step.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StepFindUniqueOrThrowArgs>(args: SelectSubset<T, StepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Step that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepFindFirstArgs} args - Arguments to find a Step
     * @example
     * // Get one Step
     * const step = await prisma.step.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StepFindFirstArgs>(args?: SelectSubset<T, StepFindFirstArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Step that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepFindFirstOrThrowArgs} args - Arguments to find a Step
     * @example
     * // Get one Step
     * const step = await prisma.step.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StepFindFirstOrThrowArgs>(args?: SelectSubset<T, StepFindFirstOrThrowArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Steps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Steps
     * const steps = await prisma.step.findMany()
     * 
     * // Get first 10 Steps
     * const steps = await prisma.step.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stepWithIdOnly = await prisma.step.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StepFindManyArgs>(args?: SelectSubset<T, StepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Step.
     * @param {StepCreateArgs} args - Arguments to create a Step.
     * @example
     * // Create one Step
     * const Step = await prisma.step.create({
     *   data: {
     *     // ... data to create a Step
     *   }
     * })
     * 
     */
    create<T extends StepCreateArgs>(args: SelectSubset<T, StepCreateArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Steps.
     * @param {StepCreateManyArgs} args - Arguments to create many Steps.
     * @example
     * // Create many Steps
     * const step = await prisma.step.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StepCreateManyArgs>(args?: SelectSubset<T, StepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Steps and returns the data saved in the database.
     * @param {StepCreateManyAndReturnArgs} args - Arguments to create many Steps.
     * @example
     * // Create many Steps
     * const step = await prisma.step.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Steps and only return the `id`
     * const stepWithIdOnly = await prisma.step.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StepCreateManyAndReturnArgs>(args?: SelectSubset<T, StepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Step.
     * @param {StepDeleteArgs} args - Arguments to delete one Step.
     * @example
     * // Delete one Step
     * const Step = await prisma.step.delete({
     *   where: {
     *     // ... filter to delete one Step
     *   }
     * })
     * 
     */
    delete<T extends StepDeleteArgs>(args: SelectSubset<T, StepDeleteArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Step.
     * @param {StepUpdateArgs} args - Arguments to update one Step.
     * @example
     * // Update one Step
     * const step = await prisma.step.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StepUpdateArgs>(args: SelectSubset<T, StepUpdateArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Steps.
     * @param {StepDeleteManyArgs} args - Arguments to filter Steps to delete.
     * @example
     * // Delete a few Steps
     * const { count } = await prisma.step.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StepDeleteManyArgs>(args?: SelectSubset<T, StepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Steps
     * const step = await prisma.step.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StepUpdateManyArgs>(args: SelectSubset<T, StepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Steps and returns the data updated in the database.
     * @param {StepUpdateManyAndReturnArgs} args - Arguments to update many Steps.
     * @example
     * // Update many Steps
     * const step = await prisma.step.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Steps and only return the `id`
     * const stepWithIdOnly = await prisma.step.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StepUpdateManyAndReturnArgs>(args: SelectSubset<T, StepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Step.
     * @param {StepUpsertArgs} args - Arguments to update or create a Step.
     * @example
     * // Update or create a Step
     * const step = await prisma.step.upsert({
     *   create: {
     *     // ... data to create a Step
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Step we want to update
     *   }
     * })
     */
    upsert<T extends StepUpsertArgs>(args: SelectSubset<T, StepUpsertArgs<ExtArgs>>): Prisma__StepClient<$Result.GetResult<Prisma.$StepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Steps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepCountArgs} args - Arguments to filter Steps to count.
     * @example
     * // Count the number of Steps
     * const count = await prisma.step.count({
     *   where: {
     *     // ... the filter for the Steps we want to count
     *   }
     * })
    **/
    count<T extends StepCountArgs>(
      args?: Subset<T, StepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Step.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StepAggregateArgs>(args: Subset<T, StepAggregateArgs>): Prisma.PrismaPromise<GetStepAggregateType<T>>

    /**
     * Group by Step.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StepGroupByArgs} args - Group by arguments.
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
      T extends StepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StepGroupByArgs['orderBy'] }
        : { orderBy?: StepGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Step model
   */
  readonly fields: StepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Step.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Saga<T extends SagaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SagaDefaultArgs<ExtArgs>>): Prisma__SagaClient<$Result.GetResult<Prisma.$SagaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Step model
   */
  interface StepFieldRefs {
    readonly id: FieldRef<"Step", 'String'>
    readonly sagaId: FieldRef<"Step", 'String'>
    readonly name: FieldRef<"Step", 'String'>
    readonly status: FieldRef<"Step", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Step findUnique
   */
  export type StepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter, which Step to fetch.
     */
    where: StepWhereUniqueInput
  }

  /**
   * Step findUniqueOrThrow
   */
  export type StepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter, which Step to fetch.
     */
    where: StepWhereUniqueInput
  }

  /**
   * Step findFirst
   */
  export type StepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter, which Step to fetch.
     */
    where?: StepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Steps to fetch.
     */
    orderBy?: StepOrderByWithRelationInput | StepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Steps.
     */
    cursor?: StepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Steps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Steps.
     */
    distinct?: StepScalarFieldEnum | StepScalarFieldEnum[]
  }

  /**
   * Step findFirstOrThrow
   */
  export type StepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter, which Step to fetch.
     */
    where?: StepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Steps to fetch.
     */
    orderBy?: StepOrderByWithRelationInput | StepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Steps.
     */
    cursor?: StepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Steps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Steps.
     */
    distinct?: StepScalarFieldEnum | StepScalarFieldEnum[]
  }

  /**
   * Step findMany
   */
  export type StepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter, which Steps to fetch.
     */
    where?: StepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Steps to fetch.
     */
    orderBy?: StepOrderByWithRelationInput | StepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Steps.
     */
    cursor?: StepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Steps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Steps.
     */
    skip?: number
    distinct?: StepScalarFieldEnum | StepScalarFieldEnum[]
  }

  /**
   * Step create
   */
  export type StepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * The data needed to create a Step.
     */
    data: XOR<StepCreateInput, StepUncheckedCreateInput>
  }

  /**
   * Step createMany
   */
  export type StepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Steps.
     */
    data: StepCreateManyInput | StepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Step createManyAndReturn
   */
  export type StepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * The data used to create many Steps.
     */
    data: StepCreateManyInput | StepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Step update
   */
  export type StepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * The data needed to update a Step.
     */
    data: XOR<StepUpdateInput, StepUncheckedUpdateInput>
    /**
     * Choose, which Step to update.
     */
    where: StepWhereUniqueInput
  }

  /**
   * Step updateMany
   */
  export type StepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Steps.
     */
    data: XOR<StepUpdateManyMutationInput, StepUncheckedUpdateManyInput>
    /**
     * Filter which Steps to update
     */
    where?: StepWhereInput
    /**
     * Limit how many Steps to update.
     */
    limit?: number
  }

  /**
   * Step updateManyAndReturn
   */
  export type StepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * The data used to update Steps.
     */
    data: XOR<StepUpdateManyMutationInput, StepUncheckedUpdateManyInput>
    /**
     * Filter which Steps to update
     */
    where?: StepWhereInput
    /**
     * Limit how many Steps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Step upsert
   */
  export type StepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * The filter to search for the Step to update in case it exists.
     */
    where: StepWhereUniqueInput
    /**
     * In case the Step found by the `where` argument doesn't exist, create a new Step with this data.
     */
    create: XOR<StepCreateInput, StepUncheckedCreateInput>
    /**
     * In case the Step was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StepUpdateInput, StepUncheckedUpdateInput>
  }

  /**
   * Step delete
   */
  export type StepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
    /**
     * Filter which Step to delete.
     */
    where: StepWhereUniqueInput
  }

  /**
   * Step deleteMany
   */
  export type StepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Steps to delete
     */
    where?: StepWhereInput
    /**
     * Limit how many Steps to delete.
     */
    limit?: number
  }

  /**
   * Step without action
   */
  export type StepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Step
     */
    select?: StepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Step
     */
    omit?: StepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StepInclude<ExtArgs> | null
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


  export const SagaScalarFieldEnum: {
    id: 'id',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SagaScalarFieldEnum = (typeof SagaScalarFieldEnum)[keyof typeof SagaScalarFieldEnum]


  export const StepScalarFieldEnum: {
    id: 'id',
    sagaId: 'sagaId',
    name: 'name',
    status: 'status'
  };

  export type StepScalarFieldEnum = (typeof StepScalarFieldEnum)[keyof typeof StepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type SagaWhereInput = {
    AND?: SagaWhereInput | SagaWhereInput[]
    OR?: SagaWhereInput[]
    NOT?: SagaWhereInput | SagaWhereInput[]
    id?: StringFilter<"Saga"> | string
    status?: StringFilter<"Saga"> | string
    createdAt?: DateTimeFilter<"Saga"> | Date | string
    updatedAt?: DateTimeFilter<"Saga"> | Date | string
    steps?: StepListRelationFilter
  }

  export type SagaOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    steps?: StepOrderByRelationAggregateInput
  }

  export type SagaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SagaWhereInput | SagaWhereInput[]
    OR?: SagaWhereInput[]
    NOT?: SagaWhereInput | SagaWhereInput[]
    status?: StringFilter<"Saga"> | string
    createdAt?: DateTimeFilter<"Saga"> | Date | string
    updatedAt?: DateTimeFilter<"Saga"> | Date | string
    steps?: StepListRelationFilter
  }, "id">

  export type SagaOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SagaCountOrderByAggregateInput
    _max?: SagaMaxOrderByAggregateInput
    _min?: SagaMinOrderByAggregateInput
  }

  export type SagaScalarWhereWithAggregatesInput = {
    AND?: SagaScalarWhereWithAggregatesInput | SagaScalarWhereWithAggregatesInput[]
    OR?: SagaScalarWhereWithAggregatesInput[]
    NOT?: SagaScalarWhereWithAggregatesInput | SagaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Saga"> | string
    status?: StringWithAggregatesFilter<"Saga"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Saga"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Saga"> | Date | string
  }

  export type StepWhereInput = {
    AND?: StepWhereInput | StepWhereInput[]
    OR?: StepWhereInput[]
    NOT?: StepWhereInput | StepWhereInput[]
    id?: StringFilter<"Step"> | string
    sagaId?: StringFilter<"Step"> | string
    name?: StringFilter<"Step"> | string
    status?: StringFilter<"Step"> | string
    Saga?: XOR<SagaScalarRelationFilter, SagaWhereInput>
  }

  export type StepOrderByWithRelationInput = {
    id?: SortOrder
    sagaId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    Saga?: SagaOrderByWithRelationInput
  }

  export type StepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StepWhereInput | StepWhereInput[]
    OR?: StepWhereInput[]
    NOT?: StepWhereInput | StepWhereInput[]
    sagaId?: StringFilter<"Step"> | string
    name?: StringFilter<"Step"> | string
    status?: StringFilter<"Step"> | string
    Saga?: XOR<SagaScalarRelationFilter, SagaWhereInput>
  }, "id">

  export type StepOrderByWithAggregationInput = {
    id?: SortOrder
    sagaId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    _count?: StepCountOrderByAggregateInput
    _max?: StepMaxOrderByAggregateInput
    _min?: StepMinOrderByAggregateInput
  }

  export type StepScalarWhereWithAggregatesInput = {
    AND?: StepScalarWhereWithAggregatesInput | StepScalarWhereWithAggregatesInput[]
    OR?: StepScalarWhereWithAggregatesInput[]
    NOT?: StepScalarWhereWithAggregatesInput | StepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Step"> | string
    sagaId?: StringWithAggregatesFilter<"Step"> | string
    name?: StringWithAggregatesFilter<"Step"> | string
    status?: StringWithAggregatesFilter<"Step"> | string
  }

  export type SagaCreateInput = {
    id?: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: StepCreateNestedManyWithoutSagaInput
  }

  export type SagaUncheckedCreateInput = {
    id?: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: StepUncheckedCreateNestedManyWithoutSagaInput
  }

  export type SagaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: StepUpdateManyWithoutSagaNestedInput
  }

  export type SagaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: StepUncheckedUpdateManyWithoutSagaNestedInput
  }

  export type SagaCreateManyInput = {
    id?: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SagaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SagaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepCreateInput = {
    id?: string
    name: string
    status: string
    Saga: SagaCreateNestedOneWithoutStepsInput
  }

  export type StepUncheckedCreateInput = {
    id?: string
    sagaId: string
    name: string
    status: string
  }

  export type StepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    Saga?: SagaUpdateOneRequiredWithoutStepsNestedInput
  }

  export type StepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sagaId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StepCreateManyInput = {
    id?: string
    sagaId: string
    name: string
    status: string
  }

  export type StepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sagaId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StepListRelationFilter = {
    every?: StepWhereInput
    some?: StepWhereInput
    none?: StepWhereInput
  }

  export type StepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SagaCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SagaMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SagaMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SagaScalarRelationFilter = {
    is?: SagaWhereInput
    isNot?: SagaWhereInput
  }

  export type StepCountOrderByAggregateInput = {
    id?: SortOrder
    sagaId?: SortOrder
    name?: SortOrder
    status?: SortOrder
  }

  export type StepMaxOrderByAggregateInput = {
    id?: SortOrder
    sagaId?: SortOrder
    name?: SortOrder
    status?: SortOrder
  }

  export type StepMinOrderByAggregateInput = {
    id?: SortOrder
    sagaId?: SortOrder
    name?: SortOrder
    status?: SortOrder
  }

  export type StepCreateNestedManyWithoutSagaInput = {
    create?: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput> | StepCreateWithoutSagaInput[] | StepUncheckedCreateWithoutSagaInput[]
    connectOrCreate?: StepCreateOrConnectWithoutSagaInput | StepCreateOrConnectWithoutSagaInput[]
    createMany?: StepCreateManySagaInputEnvelope
    connect?: StepWhereUniqueInput | StepWhereUniqueInput[]
  }

  export type StepUncheckedCreateNestedManyWithoutSagaInput = {
    create?: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput> | StepCreateWithoutSagaInput[] | StepUncheckedCreateWithoutSagaInput[]
    connectOrCreate?: StepCreateOrConnectWithoutSagaInput | StepCreateOrConnectWithoutSagaInput[]
    createMany?: StepCreateManySagaInputEnvelope
    connect?: StepWhereUniqueInput | StepWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StepUpdateManyWithoutSagaNestedInput = {
    create?: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput> | StepCreateWithoutSagaInput[] | StepUncheckedCreateWithoutSagaInput[]
    connectOrCreate?: StepCreateOrConnectWithoutSagaInput | StepCreateOrConnectWithoutSagaInput[]
    upsert?: StepUpsertWithWhereUniqueWithoutSagaInput | StepUpsertWithWhereUniqueWithoutSagaInput[]
    createMany?: StepCreateManySagaInputEnvelope
    set?: StepWhereUniqueInput | StepWhereUniqueInput[]
    disconnect?: StepWhereUniqueInput | StepWhereUniqueInput[]
    delete?: StepWhereUniqueInput | StepWhereUniqueInput[]
    connect?: StepWhereUniqueInput | StepWhereUniqueInput[]
    update?: StepUpdateWithWhereUniqueWithoutSagaInput | StepUpdateWithWhereUniqueWithoutSagaInput[]
    updateMany?: StepUpdateManyWithWhereWithoutSagaInput | StepUpdateManyWithWhereWithoutSagaInput[]
    deleteMany?: StepScalarWhereInput | StepScalarWhereInput[]
  }

  export type StepUncheckedUpdateManyWithoutSagaNestedInput = {
    create?: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput> | StepCreateWithoutSagaInput[] | StepUncheckedCreateWithoutSagaInput[]
    connectOrCreate?: StepCreateOrConnectWithoutSagaInput | StepCreateOrConnectWithoutSagaInput[]
    upsert?: StepUpsertWithWhereUniqueWithoutSagaInput | StepUpsertWithWhereUniqueWithoutSagaInput[]
    createMany?: StepCreateManySagaInputEnvelope
    set?: StepWhereUniqueInput | StepWhereUniqueInput[]
    disconnect?: StepWhereUniqueInput | StepWhereUniqueInput[]
    delete?: StepWhereUniqueInput | StepWhereUniqueInput[]
    connect?: StepWhereUniqueInput | StepWhereUniqueInput[]
    update?: StepUpdateWithWhereUniqueWithoutSagaInput | StepUpdateWithWhereUniqueWithoutSagaInput[]
    updateMany?: StepUpdateManyWithWhereWithoutSagaInput | StepUpdateManyWithWhereWithoutSagaInput[]
    deleteMany?: StepScalarWhereInput | StepScalarWhereInput[]
  }

  export type SagaCreateNestedOneWithoutStepsInput = {
    create?: XOR<SagaCreateWithoutStepsInput, SagaUncheckedCreateWithoutStepsInput>
    connectOrCreate?: SagaCreateOrConnectWithoutStepsInput
    connect?: SagaWhereUniqueInput
  }

  export type SagaUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<SagaCreateWithoutStepsInput, SagaUncheckedCreateWithoutStepsInput>
    connectOrCreate?: SagaCreateOrConnectWithoutStepsInput
    upsert?: SagaUpsertWithoutStepsInput
    connect?: SagaWhereUniqueInput
    update?: XOR<XOR<SagaUpdateToOneWithWhereWithoutStepsInput, SagaUpdateWithoutStepsInput>, SagaUncheckedUpdateWithoutStepsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StepCreateWithoutSagaInput = {
    id?: string
    name: string
    status: string
  }

  export type StepUncheckedCreateWithoutSagaInput = {
    id?: string
    name: string
    status: string
  }

  export type StepCreateOrConnectWithoutSagaInput = {
    where: StepWhereUniqueInput
    create: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput>
  }

  export type StepCreateManySagaInputEnvelope = {
    data: StepCreateManySagaInput | StepCreateManySagaInput[]
    skipDuplicates?: boolean
  }

  export type StepUpsertWithWhereUniqueWithoutSagaInput = {
    where: StepWhereUniqueInput
    update: XOR<StepUpdateWithoutSagaInput, StepUncheckedUpdateWithoutSagaInput>
    create: XOR<StepCreateWithoutSagaInput, StepUncheckedCreateWithoutSagaInput>
  }

  export type StepUpdateWithWhereUniqueWithoutSagaInput = {
    where: StepWhereUniqueInput
    data: XOR<StepUpdateWithoutSagaInput, StepUncheckedUpdateWithoutSagaInput>
  }

  export type StepUpdateManyWithWhereWithoutSagaInput = {
    where: StepScalarWhereInput
    data: XOR<StepUpdateManyMutationInput, StepUncheckedUpdateManyWithoutSagaInput>
  }

  export type StepScalarWhereInput = {
    AND?: StepScalarWhereInput | StepScalarWhereInput[]
    OR?: StepScalarWhereInput[]
    NOT?: StepScalarWhereInput | StepScalarWhereInput[]
    id?: StringFilter<"Step"> | string
    sagaId?: StringFilter<"Step"> | string
    name?: StringFilter<"Step"> | string
    status?: StringFilter<"Step"> | string
  }

  export type SagaCreateWithoutStepsInput = {
    id?: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SagaUncheckedCreateWithoutStepsInput = {
    id?: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SagaCreateOrConnectWithoutStepsInput = {
    where: SagaWhereUniqueInput
    create: XOR<SagaCreateWithoutStepsInput, SagaUncheckedCreateWithoutStepsInput>
  }

  export type SagaUpsertWithoutStepsInput = {
    update: XOR<SagaUpdateWithoutStepsInput, SagaUncheckedUpdateWithoutStepsInput>
    create: XOR<SagaCreateWithoutStepsInput, SagaUncheckedCreateWithoutStepsInput>
    where?: SagaWhereInput
  }

  export type SagaUpdateToOneWithWhereWithoutStepsInput = {
    where?: SagaWhereInput
    data: XOR<SagaUpdateWithoutStepsInput, SagaUncheckedUpdateWithoutStepsInput>
  }

  export type SagaUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SagaUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StepCreateManySagaInput = {
    id?: string
    name: string
    status: string
  }

  export type StepUpdateWithoutSagaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StepUncheckedUpdateWithoutSagaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type StepUncheckedUpdateManyWithoutSagaInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
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