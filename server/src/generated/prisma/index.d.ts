
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
 * Model WorldChampion
 * 
 */
export type WorldChampion = $Result.DefaultSelection<Prisma.$WorldChampionPayload>
/**
 * Model RaceChampion
 * 
 */
export type RaceChampion = $Result.DefaultSelection<Prisma.$RaceChampionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more WorldChampions
 * const worldChampions = await prisma.worldChampion.findMany()
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
   * // Fetch zero or more WorldChampions
   * const worldChampions = await prisma.worldChampion.findMany()
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
   * `prisma.worldChampion`: Exposes CRUD operations for the **WorldChampion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorldChampions
    * const worldChampions = await prisma.worldChampion.findMany()
    * ```
    */
  get worldChampion(): Prisma.WorldChampionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.raceChampion`: Exposes CRUD operations for the **RaceChampion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RaceChampions
    * const raceChampions = await prisma.raceChampion.findMany()
    * ```
    */
  get raceChampion(): Prisma.RaceChampionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
    WorldChampion: 'WorldChampion',
    RaceChampion: 'RaceChampion'
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
      modelProps: "worldChampion" | "raceChampion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      WorldChampion: {
        payload: Prisma.$WorldChampionPayload<ExtArgs>
        fields: Prisma.WorldChampionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorldChampionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorldChampionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          findFirst: {
            args: Prisma.WorldChampionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorldChampionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          findMany: {
            args: Prisma.WorldChampionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>[]
          }
          create: {
            args: Prisma.WorldChampionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          createMany: {
            args: Prisma.WorldChampionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorldChampionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>[]
          }
          delete: {
            args: Prisma.WorldChampionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          update: {
            args: Prisma.WorldChampionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          deleteMany: {
            args: Prisma.WorldChampionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorldChampionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorldChampionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>[]
          }
          upsert: {
            args: Prisma.WorldChampionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorldChampionPayload>
          }
          aggregate: {
            args: Prisma.WorldChampionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorldChampion>
          }
          groupBy: {
            args: Prisma.WorldChampionGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorldChampionGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorldChampionCountArgs<ExtArgs>
            result: $Utils.Optional<WorldChampionCountAggregateOutputType> | number
          }
        }
      }
      RaceChampion: {
        payload: Prisma.$RaceChampionPayload<ExtArgs>
        fields: Prisma.RaceChampionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RaceChampionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RaceChampionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          findFirst: {
            args: Prisma.RaceChampionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RaceChampionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          findMany: {
            args: Prisma.RaceChampionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>[]
          }
          create: {
            args: Prisma.RaceChampionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          createMany: {
            args: Prisma.RaceChampionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RaceChampionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>[]
          }
          delete: {
            args: Prisma.RaceChampionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          update: {
            args: Prisma.RaceChampionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          deleteMany: {
            args: Prisma.RaceChampionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RaceChampionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RaceChampionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>[]
          }
          upsert: {
            args: Prisma.RaceChampionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RaceChampionPayload>
          }
          aggregate: {
            args: Prisma.RaceChampionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRaceChampion>
          }
          groupBy: {
            args: Prisma.RaceChampionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RaceChampionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RaceChampionCountArgs<ExtArgs>
            result: $Utils.Optional<RaceChampionCountAggregateOutputType> | number
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
    worldChampion?: WorldChampionOmit
    raceChampion?: RaceChampionOmit
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
   * Count Type WorldChampionCountOutputType
   */

  export type WorldChampionCountOutputType = {
    raceChampions: number
  }

  export type WorldChampionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raceChampions?: boolean | WorldChampionCountOutputTypeCountRaceChampionsArgs
  }

  // Custom InputTypes
  /**
   * WorldChampionCountOutputType without action
   */
  export type WorldChampionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampionCountOutputType
     */
    select?: WorldChampionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorldChampionCountOutputType without action
   */
  export type WorldChampionCountOutputTypeCountRaceChampionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaceChampionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model WorldChampion
   */

  export type AggregateWorldChampion = {
    _count: WorldChampionCountAggregateOutputType | null
    _avg: WorldChampionAvgAggregateOutputType | null
    _sum: WorldChampionSumAggregateOutputType | null
    _min: WorldChampionMinAggregateOutputType | null
    _max: WorldChampionMaxAggregateOutputType | null
  }

  export type WorldChampionAvgAggregateOutputType = {
    season: number | null
    points: number | null
  }

  export type WorldChampionSumAggregateOutputType = {
    season: number | null
    points: number | null
  }

  export type WorldChampionMinAggregateOutputType = {
    season: number | null
    driverId: string | null
    points: number | null
    name: string | null
    familyName: string | null
    team: string | null
  }

  export type WorldChampionMaxAggregateOutputType = {
    season: number | null
    driverId: string | null
    points: number | null
    name: string | null
    familyName: string | null
    team: string | null
  }

  export type WorldChampionCountAggregateOutputType = {
    season: number
    driverId: number
    points: number
    name: number
    familyName: number
    team: number
    _all: number
  }


  export type WorldChampionAvgAggregateInputType = {
    season?: true
    points?: true
  }

  export type WorldChampionSumAggregateInputType = {
    season?: true
    points?: true
  }

  export type WorldChampionMinAggregateInputType = {
    season?: true
    driverId?: true
    points?: true
    name?: true
    familyName?: true
    team?: true
  }

  export type WorldChampionMaxAggregateInputType = {
    season?: true
    driverId?: true
    points?: true
    name?: true
    familyName?: true
    team?: true
  }

  export type WorldChampionCountAggregateInputType = {
    season?: true
    driverId?: true
    points?: true
    name?: true
    familyName?: true
    team?: true
    _all?: true
  }

  export type WorldChampionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorldChampion to aggregate.
     */
    where?: WorldChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldChampions to fetch.
     */
    orderBy?: WorldChampionOrderByWithRelationInput | WorldChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorldChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorldChampions
    **/
    _count?: true | WorldChampionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorldChampionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorldChampionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorldChampionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorldChampionMaxAggregateInputType
  }

  export type GetWorldChampionAggregateType<T extends WorldChampionAggregateArgs> = {
        [P in keyof T & keyof AggregateWorldChampion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorldChampion[P]>
      : GetScalarType<T[P], AggregateWorldChampion[P]>
  }




  export type WorldChampionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorldChampionWhereInput
    orderBy?: WorldChampionOrderByWithAggregationInput | WorldChampionOrderByWithAggregationInput[]
    by: WorldChampionScalarFieldEnum[] | WorldChampionScalarFieldEnum
    having?: WorldChampionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorldChampionCountAggregateInputType | true
    _avg?: WorldChampionAvgAggregateInputType
    _sum?: WorldChampionSumAggregateInputType
    _min?: WorldChampionMinAggregateInputType
    _max?: WorldChampionMaxAggregateInputType
  }

  export type WorldChampionGroupByOutputType = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
    _count: WorldChampionCountAggregateOutputType | null
    _avg: WorldChampionAvgAggregateOutputType | null
    _sum: WorldChampionSumAggregateOutputType | null
    _min: WorldChampionMinAggregateOutputType | null
    _max: WorldChampionMaxAggregateOutputType | null
  }

  type GetWorldChampionGroupByPayload<T extends WorldChampionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorldChampionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorldChampionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorldChampionGroupByOutputType[P]>
            : GetScalarType<T[P], WorldChampionGroupByOutputType[P]>
        }
      >
    >


  export type WorldChampionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    season?: boolean
    driverId?: boolean
    points?: boolean
    name?: boolean
    familyName?: boolean
    team?: boolean
    raceChampions?: boolean | WorldChampion$raceChampionsArgs<ExtArgs>
    _count?: boolean | WorldChampionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["worldChampion"]>

  export type WorldChampionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    season?: boolean
    driverId?: boolean
    points?: boolean
    name?: boolean
    familyName?: boolean
    team?: boolean
  }, ExtArgs["result"]["worldChampion"]>

  export type WorldChampionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    season?: boolean
    driverId?: boolean
    points?: boolean
    name?: boolean
    familyName?: boolean
    team?: boolean
  }, ExtArgs["result"]["worldChampion"]>

  export type WorldChampionSelectScalar = {
    season?: boolean
    driverId?: boolean
    points?: boolean
    name?: boolean
    familyName?: boolean
    team?: boolean
  }

  export type WorldChampionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"season" | "driverId" | "points" | "name" | "familyName" | "team", ExtArgs["result"]["worldChampion"]>
  export type WorldChampionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    raceChampions?: boolean | WorldChampion$raceChampionsArgs<ExtArgs>
    _count?: boolean | WorldChampionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorldChampionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WorldChampionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorldChampionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorldChampion"
    objects: {
      raceChampions: Prisma.$RaceChampionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      season: number
      driverId: string
      points: number
      name: string
      familyName: string
      team: string
    }, ExtArgs["result"]["worldChampion"]>
    composites: {}
  }

  type WorldChampionGetPayload<S extends boolean | null | undefined | WorldChampionDefaultArgs> = $Result.GetResult<Prisma.$WorldChampionPayload, S>

  type WorldChampionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorldChampionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorldChampionCountAggregateInputType | true
    }

  export interface WorldChampionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorldChampion'], meta: { name: 'WorldChampion' } }
    /**
     * Find zero or one WorldChampion that matches the filter.
     * @param {WorldChampionFindUniqueArgs} args - Arguments to find a WorldChampion
     * @example
     * // Get one WorldChampion
     * const worldChampion = await prisma.worldChampion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorldChampionFindUniqueArgs>(args: SelectSubset<T, WorldChampionFindUniqueArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorldChampion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorldChampionFindUniqueOrThrowArgs} args - Arguments to find a WorldChampion
     * @example
     * // Get one WorldChampion
     * const worldChampion = await prisma.worldChampion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorldChampionFindUniqueOrThrowArgs>(args: SelectSubset<T, WorldChampionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorldChampion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionFindFirstArgs} args - Arguments to find a WorldChampion
     * @example
     * // Get one WorldChampion
     * const worldChampion = await prisma.worldChampion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorldChampionFindFirstArgs>(args?: SelectSubset<T, WorldChampionFindFirstArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorldChampion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionFindFirstOrThrowArgs} args - Arguments to find a WorldChampion
     * @example
     * // Get one WorldChampion
     * const worldChampion = await prisma.worldChampion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorldChampionFindFirstOrThrowArgs>(args?: SelectSubset<T, WorldChampionFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorldChampions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorldChampions
     * const worldChampions = await prisma.worldChampion.findMany()
     * 
     * // Get first 10 WorldChampions
     * const worldChampions = await prisma.worldChampion.findMany({ take: 10 })
     * 
     * // Only select the `season`
     * const worldChampionWithSeasonOnly = await prisma.worldChampion.findMany({ select: { season: true } })
     * 
     */
    findMany<T extends WorldChampionFindManyArgs>(args?: SelectSubset<T, WorldChampionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorldChampion.
     * @param {WorldChampionCreateArgs} args - Arguments to create a WorldChampion.
     * @example
     * // Create one WorldChampion
     * const WorldChampion = await prisma.worldChampion.create({
     *   data: {
     *     // ... data to create a WorldChampion
     *   }
     * })
     * 
     */
    create<T extends WorldChampionCreateArgs>(args: SelectSubset<T, WorldChampionCreateArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorldChampions.
     * @param {WorldChampionCreateManyArgs} args - Arguments to create many WorldChampions.
     * @example
     * // Create many WorldChampions
     * const worldChampion = await prisma.worldChampion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorldChampionCreateManyArgs>(args?: SelectSubset<T, WorldChampionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorldChampions and returns the data saved in the database.
     * @param {WorldChampionCreateManyAndReturnArgs} args - Arguments to create many WorldChampions.
     * @example
     * // Create many WorldChampions
     * const worldChampion = await prisma.worldChampion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorldChampions and only return the `season`
     * const worldChampionWithSeasonOnly = await prisma.worldChampion.createManyAndReturn({
     *   select: { season: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorldChampionCreateManyAndReturnArgs>(args?: SelectSubset<T, WorldChampionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorldChampion.
     * @param {WorldChampionDeleteArgs} args - Arguments to delete one WorldChampion.
     * @example
     * // Delete one WorldChampion
     * const WorldChampion = await prisma.worldChampion.delete({
     *   where: {
     *     // ... filter to delete one WorldChampion
     *   }
     * })
     * 
     */
    delete<T extends WorldChampionDeleteArgs>(args: SelectSubset<T, WorldChampionDeleteArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorldChampion.
     * @param {WorldChampionUpdateArgs} args - Arguments to update one WorldChampion.
     * @example
     * // Update one WorldChampion
     * const worldChampion = await prisma.worldChampion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorldChampionUpdateArgs>(args: SelectSubset<T, WorldChampionUpdateArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorldChampions.
     * @param {WorldChampionDeleteManyArgs} args - Arguments to filter WorldChampions to delete.
     * @example
     * // Delete a few WorldChampions
     * const { count } = await prisma.worldChampion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorldChampionDeleteManyArgs>(args?: SelectSubset<T, WorldChampionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorldChampions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorldChampions
     * const worldChampion = await prisma.worldChampion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorldChampionUpdateManyArgs>(args: SelectSubset<T, WorldChampionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorldChampions and returns the data updated in the database.
     * @param {WorldChampionUpdateManyAndReturnArgs} args - Arguments to update many WorldChampions.
     * @example
     * // Update many WorldChampions
     * const worldChampion = await prisma.worldChampion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorldChampions and only return the `season`
     * const worldChampionWithSeasonOnly = await prisma.worldChampion.updateManyAndReturn({
     *   select: { season: true },
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
    updateManyAndReturn<T extends WorldChampionUpdateManyAndReturnArgs>(args: SelectSubset<T, WorldChampionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorldChampion.
     * @param {WorldChampionUpsertArgs} args - Arguments to update or create a WorldChampion.
     * @example
     * // Update or create a WorldChampion
     * const worldChampion = await prisma.worldChampion.upsert({
     *   create: {
     *     // ... data to create a WorldChampion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorldChampion we want to update
     *   }
     * })
     */
    upsert<T extends WorldChampionUpsertArgs>(args: SelectSubset<T, WorldChampionUpsertArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorldChampions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionCountArgs} args - Arguments to filter WorldChampions to count.
     * @example
     * // Count the number of WorldChampions
     * const count = await prisma.worldChampion.count({
     *   where: {
     *     // ... the filter for the WorldChampions we want to count
     *   }
     * })
    **/
    count<T extends WorldChampionCountArgs>(
      args?: Subset<T, WorldChampionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorldChampionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorldChampion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorldChampionAggregateArgs>(args: Subset<T, WorldChampionAggregateArgs>): Prisma.PrismaPromise<GetWorldChampionAggregateType<T>>

    /**
     * Group by WorldChampion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorldChampionGroupByArgs} args - Group by arguments.
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
      T extends WorldChampionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorldChampionGroupByArgs['orderBy'] }
        : { orderBy?: WorldChampionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorldChampionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorldChampionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorldChampion model
   */
  readonly fields: WorldChampionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorldChampion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorldChampionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    raceChampions<T extends WorldChampion$raceChampionsArgs<ExtArgs> = {}>(args?: Subset<T, WorldChampion$raceChampionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the WorldChampion model
   */
  interface WorldChampionFieldRefs {
    readonly season: FieldRef<"WorldChampion", 'Int'>
    readonly driverId: FieldRef<"WorldChampion", 'String'>
    readonly points: FieldRef<"WorldChampion", 'Int'>
    readonly name: FieldRef<"WorldChampion", 'String'>
    readonly familyName: FieldRef<"WorldChampion", 'String'>
    readonly team: FieldRef<"WorldChampion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorldChampion findUnique
   */
  export type WorldChampionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter, which WorldChampion to fetch.
     */
    where: WorldChampionWhereUniqueInput
  }

  /**
   * WorldChampion findUniqueOrThrow
   */
  export type WorldChampionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter, which WorldChampion to fetch.
     */
    where: WorldChampionWhereUniqueInput
  }

  /**
   * WorldChampion findFirst
   */
  export type WorldChampionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter, which WorldChampion to fetch.
     */
    where?: WorldChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldChampions to fetch.
     */
    orderBy?: WorldChampionOrderByWithRelationInput | WorldChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorldChampions.
     */
    cursor?: WorldChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorldChampions.
     */
    distinct?: WorldChampionScalarFieldEnum | WorldChampionScalarFieldEnum[]
  }

  /**
   * WorldChampion findFirstOrThrow
   */
  export type WorldChampionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter, which WorldChampion to fetch.
     */
    where?: WorldChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldChampions to fetch.
     */
    orderBy?: WorldChampionOrderByWithRelationInput | WorldChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorldChampions.
     */
    cursor?: WorldChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorldChampions.
     */
    distinct?: WorldChampionScalarFieldEnum | WorldChampionScalarFieldEnum[]
  }

  /**
   * WorldChampion findMany
   */
  export type WorldChampionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter, which WorldChampions to fetch.
     */
    where?: WorldChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorldChampions to fetch.
     */
    orderBy?: WorldChampionOrderByWithRelationInput | WorldChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorldChampions.
     */
    cursor?: WorldChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorldChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorldChampions.
     */
    skip?: number
    distinct?: WorldChampionScalarFieldEnum | WorldChampionScalarFieldEnum[]
  }

  /**
   * WorldChampion create
   */
  export type WorldChampionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * The data needed to create a WorldChampion.
     */
    data: XOR<WorldChampionCreateInput, WorldChampionUncheckedCreateInput>
  }

  /**
   * WorldChampion createMany
   */
  export type WorldChampionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorldChampions.
     */
    data: WorldChampionCreateManyInput | WorldChampionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorldChampion createManyAndReturn
   */
  export type WorldChampionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * The data used to create many WorldChampions.
     */
    data: WorldChampionCreateManyInput | WorldChampionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorldChampion update
   */
  export type WorldChampionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * The data needed to update a WorldChampion.
     */
    data: XOR<WorldChampionUpdateInput, WorldChampionUncheckedUpdateInput>
    /**
     * Choose, which WorldChampion to update.
     */
    where: WorldChampionWhereUniqueInput
  }

  /**
   * WorldChampion updateMany
   */
  export type WorldChampionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorldChampions.
     */
    data: XOR<WorldChampionUpdateManyMutationInput, WorldChampionUncheckedUpdateManyInput>
    /**
     * Filter which WorldChampions to update
     */
    where?: WorldChampionWhereInput
    /**
     * Limit how many WorldChampions to update.
     */
    limit?: number
  }

  /**
   * WorldChampion updateManyAndReturn
   */
  export type WorldChampionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * The data used to update WorldChampions.
     */
    data: XOR<WorldChampionUpdateManyMutationInput, WorldChampionUncheckedUpdateManyInput>
    /**
     * Filter which WorldChampions to update
     */
    where?: WorldChampionWhereInput
    /**
     * Limit how many WorldChampions to update.
     */
    limit?: number
  }

  /**
   * WorldChampion upsert
   */
  export type WorldChampionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * The filter to search for the WorldChampion to update in case it exists.
     */
    where: WorldChampionWhereUniqueInput
    /**
     * In case the WorldChampion found by the `where` argument doesn't exist, create a new WorldChampion with this data.
     */
    create: XOR<WorldChampionCreateInput, WorldChampionUncheckedCreateInput>
    /**
     * In case the WorldChampion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorldChampionUpdateInput, WorldChampionUncheckedUpdateInput>
  }

  /**
   * WorldChampion delete
   */
  export type WorldChampionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
    /**
     * Filter which WorldChampion to delete.
     */
    where: WorldChampionWhereUniqueInput
  }

  /**
   * WorldChampion deleteMany
   */
  export type WorldChampionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorldChampions to delete
     */
    where?: WorldChampionWhereInput
    /**
     * Limit how many WorldChampions to delete.
     */
    limit?: number
  }

  /**
   * WorldChampion.raceChampions
   */
  export type WorldChampion$raceChampionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    where?: RaceChampionWhereInput
    orderBy?: RaceChampionOrderByWithRelationInput | RaceChampionOrderByWithRelationInput[]
    cursor?: RaceChampionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RaceChampionScalarFieldEnum | RaceChampionScalarFieldEnum[]
  }

  /**
   * WorldChampion without action
   */
  export type WorldChampionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorldChampion
     */
    select?: WorldChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorldChampion
     */
    omit?: WorldChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorldChampionInclude<ExtArgs> | null
  }


  /**
   * Model RaceChampion
   */

  export type AggregateRaceChampion = {
    _count: RaceChampionCountAggregateOutputType | null
    _avg: RaceChampionAvgAggregateOutputType | null
    _sum: RaceChampionSumAggregateOutputType | null
    _min: RaceChampionMinAggregateOutputType | null
    _max: RaceChampionMaxAggregateOutputType | null
  }

  export type RaceChampionAvgAggregateOutputType = {
    id: number | null
    season: number | null
  }

  export type RaceChampionSumAggregateOutputType = {
    id: number | null
    season: number | null
  }

  export type RaceChampionMinAggregateOutputType = {
    id: number | null
    season: number | null
    driverId: string | null
    driverName: string | null
    driverFamilyName: string | null
    team: string | null
  }

  export type RaceChampionMaxAggregateOutputType = {
    id: number | null
    season: number | null
    driverId: string | null
    driverName: string | null
    driverFamilyName: string | null
    team: string | null
  }

  export type RaceChampionCountAggregateOutputType = {
    id: number
    season: number
    driverId: number
    driverName: number
    driverFamilyName: number
    team: number
    _all: number
  }


  export type RaceChampionAvgAggregateInputType = {
    id?: true
    season?: true
  }

  export type RaceChampionSumAggregateInputType = {
    id?: true
    season?: true
  }

  export type RaceChampionMinAggregateInputType = {
    id?: true
    season?: true
    driverId?: true
    driverName?: true
    driverFamilyName?: true
    team?: true
  }

  export type RaceChampionMaxAggregateInputType = {
    id?: true
    season?: true
    driverId?: true
    driverName?: true
    driverFamilyName?: true
    team?: true
  }

  export type RaceChampionCountAggregateInputType = {
    id?: true
    season?: true
    driverId?: true
    driverName?: true
    driverFamilyName?: true
    team?: true
    _all?: true
  }

  export type RaceChampionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RaceChampion to aggregate.
     */
    where?: RaceChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaceChampions to fetch.
     */
    orderBy?: RaceChampionOrderByWithRelationInput | RaceChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RaceChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaceChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaceChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RaceChampions
    **/
    _count?: true | RaceChampionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RaceChampionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RaceChampionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RaceChampionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RaceChampionMaxAggregateInputType
  }

  export type GetRaceChampionAggregateType<T extends RaceChampionAggregateArgs> = {
        [P in keyof T & keyof AggregateRaceChampion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRaceChampion[P]>
      : GetScalarType<T[P], AggregateRaceChampion[P]>
  }




  export type RaceChampionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RaceChampionWhereInput
    orderBy?: RaceChampionOrderByWithAggregationInput | RaceChampionOrderByWithAggregationInput[]
    by: RaceChampionScalarFieldEnum[] | RaceChampionScalarFieldEnum
    having?: RaceChampionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RaceChampionCountAggregateInputType | true
    _avg?: RaceChampionAvgAggregateInputType
    _sum?: RaceChampionSumAggregateInputType
    _min?: RaceChampionMinAggregateInputType
    _max?: RaceChampionMaxAggregateInputType
  }

  export type RaceChampionGroupByOutputType = {
    id: number
    season: number
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
    _count: RaceChampionCountAggregateOutputType | null
    _avg: RaceChampionAvgAggregateOutputType | null
    _sum: RaceChampionSumAggregateOutputType | null
    _min: RaceChampionMinAggregateOutputType | null
    _max: RaceChampionMaxAggregateOutputType | null
  }

  type GetRaceChampionGroupByPayload<T extends RaceChampionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RaceChampionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RaceChampionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RaceChampionGroupByOutputType[P]>
            : GetScalarType<T[P], RaceChampionGroupByOutputType[P]>
        }
      >
    >


  export type RaceChampionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    season?: boolean
    driverId?: boolean
    driverName?: boolean
    driverFamilyName?: boolean
    team?: boolean
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raceChampion"]>

  export type RaceChampionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    season?: boolean
    driverId?: boolean
    driverName?: boolean
    driverFamilyName?: boolean
    team?: boolean
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raceChampion"]>

  export type RaceChampionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    season?: boolean
    driverId?: boolean
    driverName?: boolean
    driverFamilyName?: boolean
    team?: boolean
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["raceChampion"]>

  export type RaceChampionSelectScalar = {
    id?: boolean
    season?: boolean
    driverId?: boolean
    driverName?: boolean
    driverFamilyName?: boolean
    team?: boolean
  }

  export type RaceChampionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "season" | "driverId" | "driverName" | "driverFamilyName" | "team", ExtArgs["result"]["raceChampion"]>
  export type RaceChampionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }
  export type RaceChampionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }
  export type RaceChampionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    worldChampion?: boolean | WorldChampionDefaultArgs<ExtArgs>
  }

  export type $RaceChampionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RaceChampion"
    objects: {
      worldChampion: Prisma.$WorldChampionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      season: number
      driverId: string
      driverName: string
      driverFamilyName: string
      team: string
    }, ExtArgs["result"]["raceChampion"]>
    composites: {}
  }

  type RaceChampionGetPayload<S extends boolean | null | undefined | RaceChampionDefaultArgs> = $Result.GetResult<Prisma.$RaceChampionPayload, S>

  type RaceChampionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RaceChampionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RaceChampionCountAggregateInputType | true
    }

  export interface RaceChampionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RaceChampion'], meta: { name: 'RaceChampion' } }
    /**
     * Find zero or one RaceChampion that matches the filter.
     * @param {RaceChampionFindUniqueArgs} args - Arguments to find a RaceChampion
     * @example
     * // Get one RaceChampion
     * const raceChampion = await prisma.raceChampion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RaceChampionFindUniqueArgs>(args: SelectSubset<T, RaceChampionFindUniqueArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RaceChampion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RaceChampionFindUniqueOrThrowArgs} args - Arguments to find a RaceChampion
     * @example
     * // Get one RaceChampion
     * const raceChampion = await prisma.raceChampion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RaceChampionFindUniqueOrThrowArgs>(args: SelectSubset<T, RaceChampionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RaceChampion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionFindFirstArgs} args - Arguments to find a RaceChampion
     * @example
     * // Get one RaceChampion
     * const raceChampion = await prisma.raceChampion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RaceChampionFindFirstArgs>(args?: SelectSubset<T, RaceChampionFindFirstArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RaceChampion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionFindFirstOrThrowArgs} args - Arguments to find a RaceChampion
     * @example
     * // Get one RaceChampion
     * const raceChampion = await prisma.raceChampion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RaceChampionFindFirstOrThrowArgs>(args?: SelectSubset<T, RaceChampionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RaceChampions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RaceChampions
     * const raceChampions = await prisma.raceChampion.findMany()
     * 
     * // Get first 10 RaceChampions
     * const raceChampions = await prisma.raceChampion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const raceChampionWithIdOnly = await prisma.raceChampion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RaceChampionFindManyArgs>(args?: SelectSubset<T, RaceChampionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RaceChampion.
     * @param {RaceChampionCreateArgs} args - Arguments to create a RaceChampion.
     * @example
     * // Create one RaceChampion
     * const RaceChampion = await prisma.raceChampion.create({
     *   data: {
     *     // ... data to create a RaceChampion
     *   }
     * })
     * 
     */
    create<T extends RaceChampionCreateArgs>(args: SelectSubset<T, RaceChampionCreateArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RaceChampions.
     * @param {RaceChampionCreateManyArgs} args - Arguments to create many RaceChampions.
     * @example
     * // Create many RaceChampions
     * const raceChampion = await prisma.raceChampion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RaceChampionCreateManyArgs>(args?: SelectSubset<T, RaceChampionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RaceChampions and returns the data saved in the database.
     * @param {RaceChampionCreateManyAndReturnArgs} args - Arguments to create many RaceChampions.
     * @example
     * // Create many RaceChampions
     * const raceChampion = await prisma.raceChampion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RaceChampions and only return the `id`
     * const raceChampionWithIdOnly = await prisma.raceChampion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RaceChampionCreateManyAndReturnArgs>(args?: SelectSubset<T, RaceChampionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RaceChampion.
     * @param {RaceChampionDeleteArgs} args - Arguments to delete one RaceChampion.
     * @example
     * // Delete one RaceChampion
     * const RaceChampion = await prisma.raceChampion.delete({
     *   where: {
     *     // ... filter to delete one RaceChampion
     *   }
     * })
     * 
     */
    delete<T extends RaceChampionDeleteArgs>(args: SelectSubset<T, RaceChampionDeleteArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RaceChampion.
     * @param {RaceChampionUpdateArgs} args - Arguments to update one RaceChampion.
     * @example
     * // Update one RaceChampion
     * const raceChampion = await prisma.raceChampion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RaceChampionUpdateArgs>(args: SelectSubset<T, RaceChampionUpdateArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RaceChampions.
     * @param {RaceChampionDeleteManyArgs} args - Arguments to filter RaceChampions to delete.
     * @example
     * // Delete a few RaceChampions
     * const { count } = await prisma.raceChampion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RaceChampionDeleteManyArgs>(args?: SelectSubset<T, RaceChampionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RaceChampions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RaceChampions
     * const raceChampion = await prisma.raceChampion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RaceChampionUpdateManyArgs>(args: SelectSubset<T, RaceChampionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RaceChampions and returns the data updated in the database.
     * @param {RaceChampionUpdateManyAndReturnArgs} args - Arguments to update many RaceChampions.
     * @example
     * // Update many RaceChampions
     * const raceChampion = await prisma.raceChampion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RaceChampions and only return the `id`
     * const raceChampionWithIdOnly = await prisma.raceChampion.updateManyAndReturn({
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
    updateManyAndReturn<T extends RaceChampionUpdateManyAndReturnArgs>(args: SelectSubset<T, RaceChampionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RaceChampion.
     * @param {RaceChampionUpsertArgs} args - Arguments to update or create a RaceChampion.
     * @example
     * // Update or create a RaceChampion
     * const raceChampion = await prisma.raceChampion.upsert({
     *   create: {
     *     // ... data to create a RaceChampion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RaceChampion we want to update
     *   }
     * })
     */
    upsert<T extends RaceChampionUpsertArgs>(args: SelectSubset<T, RaceChampionUpsertArgs<ExtArgs>>): Prisma__RaceChampionClient<$Result.GetResult<Prisma.$RaceChampionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RaceChampions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionCountArgs} args - Arguments to filter RaceChampions to count.
     * @example
     * // Count the number of RaceChampions
     * const count = await prisma.raceChampion.count({
     *   where: {
     *     // ... the filter for the RaceChampions we want to count
     *   }
     * })
    **/
    count<T extends RaceChampionCountArgs>(
      args?: Subset<T, RaceChampionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RaceChampionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RaceChampion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RaceChampionAggregateArgs>(args: Subset<T, RaceChampionAggregateArgs>): Prisma.PrismaPromise<GetRaceChampionAggregateType<T>>

    /**
     * Group by RaceChampion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RaceChampionGroupByArgs} args - Group by arguments.
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
      T extends RaceChampionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RaceChampionGroupByArgs['orderBy'] }
        : { orderBy?: RaceChampionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RaceChampionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRaceChampionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RaceChampion model
   */
  readonly fields: RaceChampionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RaceChampion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RaceChampionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    worldChampion<T extends WorldChampionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorldChampionDefaultArgs<ExtArgs>>): Prisma__WorldChampionClient<$Result.GetResult<Prisma.$WorldChampionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RaceChampion model
   */
  interface RaceChampionFieldRefs {
    readonly id: FieldRef<"RaceChampion", 'Int'>
    readonly season: FieldRef<"RaceChampion", 'Int'>
    readonly driverId: FieldRef<"RaceChampion", 'String'>
    readonly driverName: FieldRef<"RaceChampion", 'String'>
    readonly driverFamilyName: FieldRef<"RaceChampion", 'String'>
    readonly team: FieldRef<"RaceChampion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RaceChampion findUnique
   */
  export type RaceChampionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter, which RaceChampion to fetch.
     */
    where: RaceChampionWhereUniqueInput
  }

  /**
   * RaceChampion findUniqueOrThrow
   */
  export type RaceChampionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter, which RaceChampion to fetch.
     */
    where: RaceChampionWhereUniqueInput
  }

  /**
   * RaceChampion findFirst
   */
  export type RaceChampionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter, which RaceChampion to fetch.
     */
    where?: RaceChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaceChampions to fetch.
     */
    orderBy?: RaceChampionOrderByWithRelationInput | RaceChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RaceChampions.
     */
    cursor?: RaceChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaceChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaceChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RaceChampions.
     */
    distinct?: RaceChampionScalarFieldEnum | RaceChampionScalarFieldEnum[]
  }

  /**
   * RaceChampion findFirstOrThrow
   */
  export type RaceChampionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter, which RaceChampion to fetch.
     */
    where?: RaceChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaceChampions to fetch.
     */
    orderBy?: RaceChampionOrderByWithRelationInput | RaceChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RaceChampions.
     */
    cursor?: RaceChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaceChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaceChampions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RaceChampions.
     */
    distinct?: RaceChampionScalarFieldEnum | RaceChampionScalarFieldEnum[]
  }

  /**
   * RaceChampion findMany
   */
  export type RaceChampionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter, which RaceChampions to fetch.
     */
    where?: RaceChampionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RaceChampions to fetch.
     */
    orderBy?: RaceChampionOrderByWithRelationInput | RaceChampionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RaceChampions.
     */
    cursor?: RaceChampionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RaceChampions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RaceChampions.
     */
    skip?: number
    distinct?: RaceChampionScalarFieldEnum | RaceChampionScalarFieldEnum[]
  }

  /**
   * RaceChampion create
   */
  export type RaceChampionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * The data needed to create a RaceChampion.
     */
    data: XOR<RaceChampionCreateInput, RaceChampionUncheckedCreateInput>
  }

  /**
   * RaceChampion createMany
   */
  export type RaceChampionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RaceChampions.
     */
    data: RaceChampionCreateManyInput | RaceChampionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RaceChampion createManyAndReturn
   */
  export type RaceChampionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * The data used to create many RaceChampions.
     */
    data: RaceChampionCreateManyInput | RaceChampionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RaceChampion update
   */
  export type RaceChampionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * The data needed to update a RaceChampion.
     */
    data: XOR<RaceChampionUpdateInput, RaceChampionUncheckedUpdateInput>
    /**
     * Choose, which RaceChampion to update.
     */
    where: RaceChampionWhereUniqueInput
  }

  /**
   * RaceChampion updateMany
   */
  export type RaceChampionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RaceChampions.
     */
    data: XOR<RaceChampionUpdateManyMutationInput, RaceChampionUncheckedUpdateManyInput>
    /**
     * Filter which RaceChampions to update
     */
    where?: RaceChampionWhereInput
    /**
     * Limit how many RaceChampions to update.
     */
    limit?: number
  }

  /**
   * RaceChampion updateManyAndReturn
   */
  export type RaceChampionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * The data used to update RaceChampions.
     */
    data: XOR<RaceChampionUpdateManyMutationInput, RaceChampionUncheckedUpdateManyInput>
    /**
     * Filter which RaceChampions to update
     */
    where?: RaceChampionWhereInput
    /**
     * Limit how many RaceChampions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RaceChampion upsert
   */
  export type RaceChampionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * The filter to search for the RaceChampion to update in case it exists.
     */
    where: RaceChampionWhereUniqueInput
    /**
     * In case the RaceChampion found by the `where` argument doesn't exist, create a new RaceChampion with this data.
     */
    create: XOR<RaceChampionCreateInput, RaceChampionUncheckedCreateInput>
    /**
     * In case the RaceChampion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RaceChampionUpdateInput, RaceChampionUncheckedUpdateInput>
  }

  /**
   * RaceChampion delete
   */
  export type RaceChampionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
    /**
     * Filter which RaceChampion to delete.
     */
    where: RaceChampionWhereUniqueInput
  }

  /**
   * RaceChampion deleteMany
   */
  export type RaceChampionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RaceChampions to delete
     */
    where?: RaceChampionWhereInput
    /**
     * Limit how many RaceChampions to delete.
     */
    limit?: number
  }

  /**
   * RaceChampion without action
   */
  export type RaceChampionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RaceChampion
     */
    select?: RaceChampionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RaceChampion
     */
    omit?: RaceChampionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RaceChampionInclude<ExtArgs> | null
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


  export const WorldChampionScalarFieldEnum: {
    season: 'season',
    driverId: 'driverId',
    points: 'points',
    name: 'name',
    familyName: 'familyName',
    team: 'team'
  };

  export type WorldChampionScalarFieldEnum = (typeof WorldChampionScalarFieldEnum)[keyof typeof WorldChampionScalarFieldEnum]


  export const RaceChampionScalarFieldEnum: {
    id: 'id',
    season: 'season',
    driverId: 'driverId',
    driverName: 'driverName',
    driverFamilyName: 'driverFamilyName',
    team: 'team'
  };

  export type RaceChampionScalarFieldEnum = (typeof RaceChampionScalarFieldEnum)[keyof typeof RaceChampionScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type WorldChampionWhereInput = {
    AND?: WorldChampionWhereInput | WorldChampionWhereInput[]
    OR?: WorldChampionWhereInput[]
    NOT?: WorldChampionWhereInput | WorldChampionWhereInput[]
    season?: IntFilter<"WorldChampion"> | number
    driverId?: StringFilter<"WorldChampion"> | string
    points?: IntFilter<"WorldChampion"> | number
    name?: StringFilter<"WorldChampion"> | string
    familyName?: StringFilter<"WorldChampion"> | string
    team?: StringFilter<"WorldChampion"> | string
    raceChampions?: RaceChampionListRelationFilter
  }

  export type WorldChampionOrderByWithRelationInput = {
    season?: SortOrder
    driverId?: SortOrder
    points?: SortOrder
    name?: SortOrder
    familyName?: SortOrder
    team?: SortOrder
    raceChampions?: RaceChampionOrderByRelationAggregateInput
  }

  export type WorldChampionWhereUniqueInput = Prisma.AtLeast<{
    season?: number
    AND?: WorldChampionWhereInput | WorldChampionWhereInput[]
    OR?: WorldChampionWhereInput[]
    NOT?: WorldChampionWhereInput | WorldChampionWhereInput[]
    driverId?: StringFilter<"WorldChampion"> | string
    points?: IntFilter<"WorldChampion"> | number
    name?: StringFilter<"WorldChampion"> | string
    familyName?: StringFilter<"WorldChampion"> | string
    team?: StringFilter<"WorldChampion"> | string
    raceChampions?: RaceChampionListRelationFilter
  }, "season">

  export type WorldChampionOrderByWithAggregationInput = {
    season?: SortOrder
    driverId?: SortOrder
    points?: SortOrder
    name?: SortOrder
    familyName?: SortOrder
    team?: SortOrder
    _count?: WorldChampionCountOrderByAggregateInput
    _avg?: WorldChampionAvgOrderByAggregateInput
    _max?: WorldChampionMaxOrderByAggregateInput
    _min?: WorldChampionMinOrderByAggregateInput
    _sum?: WorldChampionSumOrderByAggregateInput
  }

  export type WorldChampionScalarWhereWithAggregatesInput = {
    AND?: WorldChampionScalarWhereWithAggregatesInput | WorldChampionScalarWhereWithAggregatesInput[]
    OR?: WorldChampionScalarWhereWithAggregatesInput[]
    NOT?: WorldChampionScalarWhereWithAggregatesInput | WorldChampionScalarWhereWithAggregatesInput[]
    season?: IntWithAggregatesFilter<"WorldChampion"> | number
    driverId?: StringWithAggregatesFilter<"WorldChampion"> | string
    points?: IntWithAggregatesFilter<"WorldChampion"> | number
    name?: StringWithAggregatesFilter<"WorldChampion"> | string
    familyName?: StringWithAggregatesFilter<"WorldChampion"> | string
    team?: StringWithAggregatesFilter<"WorldChampion"> | string
  }

  export type RaceChampionWhereInput = {
    AND?: RaceChampionWhereInput | RaceChampionWhereInput[]
    OR?: RaceChampionWhereInput[]
    NOT?: RaceChampionWhereInput | RaceChampionWhereInput[]
    id?: IntFilter<"RaceChampion"> | number
    season?: IntFilter<"RaceChampion"> | number
    driverId?: StringFilter<"RaceChampion"> | string
    driverName?: StringFilter<"RaceChampion"> | string
    driverFamilyName?: StringFilter<"RaceChampion"> | string
    team?: StringFilter<"RaceChampion"> | string
    worldChampion?: XOR<WorldChampionScalarRelationFilter, WorldChampionWhereInput>
  }

  export type RaceChampionOrderByWithRelationInput = {
    id?: SortOrder
    season?: SortOrder
    driverId?: SortOrder
    driverName?: SortOrder
    driverFamilyName?: SortOrder
    team?: SortOrder
    worldChampion?: WorldChampionOrderByWithRelationInput
  }

  export type RaceChampionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RaceChampionWhereInput | RaceChampionWhereInput[]
    OR?: RaceChampionWhereInput[]
    NOT?: RaceChampionWhereInput | RaceChampionWhereInput[]
    season?: IntFilter<"RaceChampion"> | number
    driverId?: StringFilter<"RaceChampion"> | string
    driverName?: StringFilter<"RaceChampion"> | string
    driverFamilyName?: StringFilter<"RaceChampion"> | string
    team?: StringFilter<"RaceChampion"> | string
    worldChampion?: XOR<WorldChampionScalarRelationFilter, WorldChampionWhereInput>
  }, "id">

  export type RaceChampionOrderByWithAggregationInput = {
    id?: SortOrder
    season?: SortOrder
    driverId?: SortOrder
    driverName?: SortOrder
    driverFamilyName?: SortOrder
    team?: SortOrder
    _count?: RaceChampionCountOrderByAggregateInput
    _avg?: RaceChampionAvgOrderByAggregateInput
    _max?: RaceChampionMaxOrderByAggregateInput
    _min?: RaceChampionMinOrderByAggregateInput
    _sum?: RaceChampionSumOrderByAggregateInput
  }

  export type RaceChampionScalarWhereWithAggregatesInput = {
    AND?: RaceChampionScalarWhereWithAggregatesInput | RaceChampionScalarWhereWithAggregatesInput[]
    OR?: RaceChampionScalarWhereWithAggregatesInput[]
    NOT?: RaceChampionScalarWhereWithAggregatesInput | RaceChampionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RaceChampion"> | number
    season?: IntWithAggregatesFilter<"RaceChampion"> | number
    driverId?: StringWithAggregatesFilter<"RaceChampion"> | string
    driverName?: StringWithAggregatesFilter<"RaceChampion"> | string
    driverFamilyName?: StringWithAggregatesFilter<"RaceChampion"> | string
    team?: StringWithAggregatesFilter<"RaceChampion"> | string
  }

  export type WorldChampionCreateInput = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
    raceChampions?: RaceChampionCreateNestedManyWithoutWorldChampionInput
  }

  export type WorldChampionUncheckedCreateInput = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
    raceChampions?: RaceChampionUncheckedCreateNestedManyWithoutWorldChampionInput
  }

  export type WorldChampionUpdateInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    raceChampions?: RaceChampionUpdateManyWithoutWorldChampionNestedInput
  }

  export type WorldChampionUncheckedUpdateInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    raceChampions?: RaceChampionUncheckedUpdateManyWithoutWorldChampionNestedInput
  }

  export type WorldChampionCreateManyInput = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
  }

  export type WorldChampionUpdateManyMutationInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type WorldChampionUncheckedUpdateManyInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionCreateInput = {
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
    worldChampion: WorldChampionCreateNestedOneWithoutRaceChampionsInput
  }

  export type RaceChampionUncheckedCreateInput = {
    id?: number
    season: number
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
  }

  export type RaceChampionUpdateInput = {
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
    worldChampion?: WorldChampionUpdateOneRequiredWithoutRaceChampionsNestedInput
  }

  export type RaceChampionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionCreateManyInput = {
    id?: number
    season: number
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
  }

  export type RaceChampionUpdateManyMutationInput = {
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type RaceChampionListRelationFilter = {
    every?: RaceChampionWhereInput
    some?: RaceChampionWhereInput
    none?: RaceChampionWhereInput
  }

  export type RaceChampionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorldChampionCountOrderByAggregateInput = {
    season?: SortOrder
    driverId?: SortOrder
    points?: SortOrder
    name?: SortOrder
    familyName?: SortOrder
    team?: SortOrder
  }

  export type WorldChampionAvgOrderByAggregateInput = {
    season?: SortOrder
    points?: SortOrder
  }

  export type WorldChampionMaxOrderByAggregateInput = {
    season?: SortOrder
    driverId?: SortOrder
    points?: SortOrder
    name?: SortOrder
    familyName?: SortOrder
    team?: SortOrder
  }

  export type WorldChampionMinOrderByAggregateInput = {
    season?: SortOrder
    driverId?: SortOrder
    points?: SortOrder
    name?: SortOrder
    familyName?: SortOrder
    team?: SortOrder
  }

  export type WorldChampionSumOrderByAggregateInput = {
    season?: SortOrder
    points?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type WorldChampionScalarRelationFilter = {
    is?: WorldChampionWhereInput
    isNot?: WorldChampionWhereInput
  }

  export type RaceChampionCountOrderByAggregateInput = {
    id?: SortOrder
    season?: SortOrder
    driverId?: SortOrder
    driverName?: SortOrder
    driverFamilyName?: SortOrder
    team?: SortOrder
  }

  export type RaceChampionAvgOrderByAggregateInput = {
    id?: SortOrder
    season?: SortOrder
  }

  export type RaceChampionMaxOrderByAggregateInput = {
    id?: SortOrder
    season?: SortOrder
    driverId?: SortOrder
    driverName?: SortOrder
    driverFamilyName?: SortOrder
    team?: SortOrder
  }

  export type RaceChampionMinOrderByAggregateInput = {
    id?: SortOrder
    season?: SortOrder
    driverId?: SortOrder
    driverName?: SortOrder
    driverFamilyName?: SortOrder
    team?: SortOrder
  }

  export type RaceChampionSumOrderByAggregateInput = {
    id?: SortOrder
    season?: SortOrder
  }

  export type RaceChampionCreateNestedManyWithoutWorldChampionInput = {
    create?: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput> | RaceChampionCreateWithoutWorldChampionInput[] | RaceChampionUncheckedCreateWithoutWorldChampionInput[]
    connectOrCreate?: RaceChampionCreateOrConnectWithoutWorldChampionInput | RaceChampionCreateOrConnectWithoutWorldChampionInput[]
    createMany?: RaceChampionCreateManyWorldChampionInputEnvelope
    connect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
  }

  export type RaceChampionUncheckedCreateNestedManyWithoutWorldChampionInput = {
    create?: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput> | RaceChampionCreateWithoutWorldChampionInput[] | RaceChampionUncheckedCreateWithoutWorldChampionInput[]
    connectOrCreate?: RaceChampionCreateOrConnectWithoutWorldChampionInput | RaceChampionCreateOrConnectWithoutWorldChampionInput[]
    createMany?: RaceChampionCreateManyWorldChampionInputEnvelope
    connect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type RaceChampionUpdateManyWithoutWorldChampionNestedInput = {
    create?: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput> | RaceChampionCreateWithoutWorldChampionInput[] | RaceChampionUncheckedCreateWithoutWorldChampionInput[]
    connectOrCreate?: RaceChampionCreateOrConnectWithoutWorldChampionInput | RaceChampionCreateOrConnectWithoutWorldChampionInput[]
    upsert?: RaceChampionUpsertWithWhereUniqueWithoutWorldChampionInput | RaceChampionUpsertWithWhereUniqueWithoutWorldChampionInput[]
    createMany?: RaceChampionCreateManyWorldChampionInputEnvelope
    set?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    disconnect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    delete?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    connect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    update?: RaceChampionUpdateWithWhereUniqueWithoutWorldChampionInput | RaceChampionUpdateWithWhereUniqueWithoutWorldChampionInput[]
    updateMany?: RaceChampionUpdateManyWithWhereWithoutWorldChampionInput | RaceChampionUpdateManyWithWhereWithoutWorldChampionInput[]
    deleteMany?: RaceChampionScalarWhereInput | RaceChampionScalarWhereInput[]
  }

  export type RaceChampionUncheckedUpdateManyWithoutWorldChampionNestedInput = {
    create?: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput> | RaceChampionCreateWithoutWorldChampionInput[] | RaceChampionUncheckedCreateWithoutWorldChampionInput[]
    connectOrCreate?: RaceChampionCreateOrConnectWithoutWorldChampionInput | RaceChampionCreateOrConnectWithoutWorldChampionInput[]
    upsert?: RaceChampionUpsertWithWhereUniqueWithoutWorldChampionInput | RaceChampionUpsertWithWhereUniqueWithoutWorldChampionInput[]
    createMany?: RaceChampionCreateManyWorldChampionInputEnvelope
    set?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    disconnect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    delete?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    connect?: RaceChampionWhereUniqueInput | RaceChampionWhereUniqueInput[]
    update?: RaceChampionUpdateWithWhereUniqueWithoutWorldChampionInput | RaceChampionUpdateWithWhereUniqueWithoutWorldChampionInput[]
    updateMany?: RaceChampionUpdateManyWithWhereWithoutWorldChampionInput | RaceChampionUpdateManyWithWhereWithoutWorldChampionInput[]
    deleteMany?: RaceChampionScalarWhereInput | RaceChampionScalarWhereInput[]
  }

  export type WorldChampionCreateNestedOneWithoutRaceChampionsInput = {
    create?: XOR<WorldChampionCreateWithoutRaceChampionsInput, WorldChampionUncheckedCreateWithoutRaceChampionsInput>
    connectOrCreate?: WorldChampionCreateOrConnectWithoutRaceChampionsInput
    connect?: WorldChampionWhereUniqueInput
  }

  export type WorldChampionUpdateOneRequiredWithoutRaceChampionsNestedInput = {
    create?: XOR<WorldChampionCreateWithoutRaceChampionsInput, WorldChampionUncheckedCreateWithoutRaceChampionsInput>
    connectOrCreate?: WorldChampionCreateOrConnectWithoutRaceChampionsInput
    upsert?: WorldChampionUpsertWithoutRaceChampionsInput
    connect?: WorldChampionWhereUniqueInput
    update?: XOR<XOR<WorldChampionUpdateToOneWithWhereWithoutRaceChampionsInput, WorldChampionUpdateWithoutRaceChampionsInput>, WorldChampionUncheckedUpdateWithoutRaceChampionsInput>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type RaceChampionCreateWithoutWorldChampionInput = {
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
  }

  export type RaceChampionUncheckedCreateWithoutWorldChampionInput = {
    id?: number
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
  }

  export type RaceChampionCreateOrConnectWithoutWorldChampionInput = {
    where: RaceChampionWhereUniqueInput
    create: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput>
  }

  export type RaceChampionCreateManyWorldChampionInputEnvelope = {
    data: RaceChampionCreateManyWorldChampionInput | RaceChampionCreateManyWorldChampionInput[]
    skipDuplicates?: boolean
  }

  export type RaceChampionUpsertWithWhereUniqueWithoutWorldChampionInput = {
    where: RaceChampionWhereUniqueInput
    update: XOR<RaceChampionUpdateWithoutWorldChampionInput, RaceChampionUncheckedUpdateWithoutWorldChampionInput>
    create: XOR<RaceChampionCreateWithoutWorldChampionInput, RaceChampionUncheckedCreateWithoutWorldChampionInput>
  }

  export type RaceChampionUpdateWithWhereUniqueWithoutWorldChampionInput = {
    where: RaceChampionWhereUniqueInput
    data: XOR<RaceChampionUpdateWithoutWorldChampionInput, RaceChampionUncheckedUpdateWithoutWorldChampionInput>
  }

  export type RaceChampionUpdateManyWithWhereWithoutWorldChampionInput = {
    where: RaceChampionScalarWhereInput
    data: XOR<RaceChampionUpdateManyMutationInput, RaceChampionUncheckedUpdateManyWithoutWorldChampionInput>
  }

  export type RaceChampionScalarWhereInput = {
    AND?: RaceChampionScalarWhereInput | RaceChampionScalarWhereInput[]
    OR?: RaceChampionScalarWhereInput[]
    NOT?: RaceChampionScalarWhereInput | RaceChampionScalarWhereInput[]
    id?: IntFilter<"RaceChampion"> | number
    season?: IntFilter<"RaceChampion"> | number
    driverId?: StringFilter<"RaceChampion"> | string
    driverName?: StringFilter<"RaceChampion"> | string
    driverFamilyName?: StringFilter<"RaceChampion"> | string
    team?: StringFilter<"RaceChampion"> | string
  }

  export type WorldChampionCreateWithoutRaceChampionsInput = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
  }

  export type WorldChampionUncheckedCreateWithoutRaceChampionsInput = {
    season: number
    driverId: string
    points: number
    name: string
    familyName: string
    team: string
  }

  export type WorldChampionCreateOrConnectWithoutRaceChampionsInput = {
    where: WorldChampionWhereUniqueInput
    create: XOR<WorldChampionCreateWithoutRaceChampionsInput, WorldChampionUncheckedCreateWithoutRaceChampionsInput>
  }

  export type WorldChampionUpsertWithoutRaceChampionsInput = {
    update: XOR<WorldChampionUpdateWithoutRaceChampionsInput, WorldChampionUncheckedUpdateWithoutRaceChampionsInput>
    create: XOR<WorldChampionCreateWithoutRaceChampionsInput, WorldChampionUncheckedCreateWithoutRaceChampionsInput>
    where?: WorldChampionWhereInput
  }

  export type WorldChampionUpdateToOneWithWhereWithoutRaceChampionsInput = {
    where?: WorldChampionWhereInput
    data: XOR<WorldChampionUpdateWithoutRaceChampionsInput, WorldChampionUncheckedUpdateWithoutRaceChampionsInput>
  }

  export type WorldChampionUpdateWithoutRaceChampionsInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type WorldChampionUncheckedUpdateWithoutRaceChampionsInput = {
    season?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    familyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionCreateManyWorldChampionInput = {
    id?: number
    driverId: string
    driverName: string
    driverFamilyName: string
    team: string
  }

  export type RaceChampionUpdateWithoutWorldChampionInput = {
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionUncheckedUpdateWithoutWorldChampionInput = {
    id?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
  }

  export type RaceChampionUncheckedUpdateManyWithoutWorldChampionInput = {
    id?: IntFieldUpdateOperationsInput | number
    driverId?: StringFieldUpdateOperationsInput | string
    driverName?: StringFieldUpdateOperationsInput | string
    driverFamilyName?: StringFieldUpdateOperationsInput | string
    team?: StringFieldUpdateOperationsInput | string
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