import { propertyFromDottedString } from '../../shared/utilities'

export class Filter<T> {
  constructor(private items: T[]) {}

  public by(filterBy: string, values: string[]): this {
    if (values.length) {
      this.items = this.items.filter((item) => {
        const itemValue = propertyFromDottedString(item, filterBy)
        return values.includes(itemValue)
      })
    }

    return this
  }

  public getItems(): T[] {
    return this.items
  }
}
