import { TBasicFilterAttributes, TFilterValues } from './types'

export function getAttributeValue(attr: TBasicFilterAttributes): string[] {
  switch (attr.type) {
    case 'choice':
      return attr.options.filter((o) => o.checked).map((o) => o.value)
    case 'range':
      return [attr.min, attr.max]
    case 'text':
      return attr.value ? [attr.value] : []
  }
}

export function getValuesFromAttributes<T extends string>(
  attributes: TBasicFilterAttributes[]
): TFilterValues<T> {
  const attrs = attributes.map((attr) => [[attr.key], getAttributeValue(attr)])

  return Object.fromEntries(attrs)
}

export function getAppliedAttributes(attributes: TBasicFilterAttributes[]): string[] {
  return attributes.filter(attr => {
    const value = getAttributeValue(attr)
    return Boolean(value.filter(v => Boolean(v)).length)
  }).map(attr => attr.key)
}