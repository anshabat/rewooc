export interface TSorting<T = string> {
  orderBy: T
  direction: 'asc' | 'desc'
}

export type TGetSortingDirection = (orderBy: string) => 'desc' | 'asc' | null