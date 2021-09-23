import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter, {
  OrderFilterAttributes,
} from '../OrdersFilter/OrdersFilter'
import { IDeliveryMethod } from 'app-api'

interface OrdersListProps {
  orders: IOrder[]
}

export class OrderFilterModule {
  constructor(public orders: IOrder[]) {}

  filterByStatus(status: string[]): this {
    if (status.length) {
      this.orders = this.orders.filter((order) =>
        status.includes(order.status.key)
      )
    }
    return this
  }

  filterByDelivery(delivery: string[]): this {
    if (delivery.length) {
      this.orders = this.orders.filter((order) =>
        delivery.includes(String(order.deliveryMethod.id))
      )
    }
    return this
  }
}

export interface IFilterChoiceValue {
  label: string
  value: string
  count?: number
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const initialDeliveries = orders
    .reduce<IDeliveryMethod[]>((prev, order) => {
      const existing = prev.some((i) => i.id === order.deliveryMethod.id)
      return existing ? prev : prev.concat(order.deliveryMethod)
    }, [])
    .map<IFilterChoiceValue>((value, index, array) => {
      return {
        label: value.title,
        value: String(value.id),
        count: array.length,
      }
    })

  const initialStatuses = orders
    .reduce<OrderStatus[]>((prev, order) => {
      const existing = prev.some((i) => i.key === order.status.key)
      return existing ? prev : prev.concat(order.status)
    }, [])
    .map<IFilterChoiceValue>((value, index, array) => {
      return {
        label: value.value,
        value: value.key,
        count: array.length,
      }
    })

  const [deliveries, setDeliveries] = useState<IFilterChoiceValue[]>(
    initialDeliveries
  )
  const [statuses, setStatuses] = useState<IFilterChoiceValue[]>(
    initialStatuses
  )

  const onFilterHandler = (attributes: OrderFilterAttributes) => {
    const filter = new OrderFilterModule(orders)
      .filterByStatus(attributes.status)
      .filterByDelivery(attributes.delivery)
    setFilteredOrders(filter.orders)

    const newStatuses = initialStatuses.map<IFilterChoiceValue>((option) => {
      const statuses = [...attributes.status, option.value]
      const filter2 = new OrderFilterModule(orders)
        .filterByStatus(statuses)
        .filterByDelivery(attributes.delivery)
      return {
        value: option.value,
        label: option.label,
        count: filter2.orders.length,
      }
    })
    setStatuses(newStatuses)
  }

  return (
    <div className="rw-orders-list">
      <OrdersFilter
        deliveryOptions={deliveries}
        statusOptions={statuses}
        onFilter={onFilterHandler}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
