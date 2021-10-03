import { IOrder } from 'app-types'

export class OrderFilterModule {
  constructor(private orders: IOrder[]) {}

  public filterByStatus(status: string[]): this {
    if (status.length) {
      this.orders = this.orders.filter((order) =>
        status.includes(order.status.key)
      )
    }
    return this
  }

  public filterByDelivery(delivery: string[]): this {
    if (delivery.length) {
      this.orders = this.orders.filter((order) =>
        delivery.includes(String(order.deliveryMethod.id))
      )
    }
    return this
  }

  public getOrders(): IOrder[] {
    return this.orders
  }
}