import { propertyFromDottedString } from '../../shared/utilities'

const tempMapper = {
  status: 'status.key',
  delivery: 'deliveryMethod.id'
}

export class Filter<T> {
  constructor(private items: T[]) {}

  public by(filterBy: string, values: string[]): this {
    if (values.length) {
      this.items = this.items.filter((item) => {
        // @ts-ignore
        const itemValue = propertyFromDottedString(item, tempMapper[filterBy])
        return values.includes(itemValue)
      })
    }

    return this
  }

  public getItems(): T[] {
    return this.items
  }
}
