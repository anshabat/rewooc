import { TChoiceField } from "app-services/form";

interface TFilterAttribute<T> {
  key: T
  label: string
  isApplied: boolean
}

export interface TFilterChoiseAttribute<T> extends TFilterAttribute<T> {
  type: 'choice'
  options: TChoiceField[]
}

export interface TFilterTextAttribute<T> extends TFilterAttribute<T> {
  type: 'text'
  value: string
}

export interface TFilterRangeAttribute<T> extends TFilterAttribute<T> {
  type: 'range'
  min: string
  max: string
}

export type TFilterValues<T extends string> = Record<T, string[]>
