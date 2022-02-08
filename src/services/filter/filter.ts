import { propertyFromDottedString } from '../../shared/utilities'

export class Filter<T> {
  constructor(private items: T[]) {}

  private isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  public equal(filterBy: string, values: string[]): this {
    if (values.length) {
      this.items = this.items.filter((item) => {
        const itemValue = propertyFromDottedString(item, filterBy)
        return values.includes(itemValue)
      })
    }

    return this
  }

  public range(filterBy: string, min: string, max: string): this {
    const minValue = this.isNumeric(min) ? Number(min) : 0
    const maxValue = this.isNumeric(max) ? Number(max) : Infinity

    if(minValue === 0 && maxValue === Infinity) {
      return this
    }

    this.items = this.items.filter((item) => {
      const currentValue = Number(propertyFromDottedString(item, filterBy))
      return currentValue >= minValue && currentValue < maxValue
    })

    return this
  }

  public getItems(): T[] {
    return this.items
  }
}
