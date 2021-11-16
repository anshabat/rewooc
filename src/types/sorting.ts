export interface ISorting {
  orderBy: string
  direction: 'asc' | 'desc'
  type: 'string' | 'number'
}

export type ChangeOrderType = (
  orderBy: string,
  direction: 'asc' | 'desc',
  type: 'string' | 'number'
) => void

export type TGetSortingDirection = (orderBy: string) => 'desc' | 'asc' | null