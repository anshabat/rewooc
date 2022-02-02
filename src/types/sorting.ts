export interface TSorting<T = string> {
  orderBy: T
  direction: 'asc' | 'desc'
  type: 'string' | 'number'
}

export type TGetSortingDirection = (orderBy: string) => 'desc' | 'asc' | null