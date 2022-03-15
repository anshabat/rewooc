import { TBasicFilterAttributes } from './types'

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
