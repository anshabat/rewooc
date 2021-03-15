/**
 * Eject T from Promise<T> type
 */
export type Await<T> = T extends PromiseLike<infer U> ? U : T
