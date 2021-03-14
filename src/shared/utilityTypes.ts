import { Map } from 'immutable'

/**
 * Allow use object type T as Generic inside Map<T> type from immutable.js
 */
export interface ImmutableMap<T> extends Map<string, any> {
  get<K extends keyof T>(name: K): T[K]
}

/**
 * Eject T from Promise<T> type
 */
export type Await<T> = T extends PromiseLike<infer U> ? U : T
