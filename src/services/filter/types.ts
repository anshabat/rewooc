import { TChoiceField } from "app-services/form";

interface TFilterAttribute<T> {
  label: string
  key: T
  type: string
  isApplied: boolean
}

export interface TFilterChoiseAttribute<T> extends TFilterAttribute<T> {
  options: TChoiceField[]
}

export type TFilterValues<T extends string> = Record<T, string[]>
