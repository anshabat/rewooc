import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter, {
  OrderFilterAttributes,
} from '../OrdersFilter/OrdersFilter'
import { IDeliveryMethod } from 'app-api'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'

interface OrdersListProps {
  orders: IOrder[]
}

export interface IFilterChoiceValue {
  label: string
  value: string
  count?: number
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders)
  const {filterOrders, updateAttribute} = useOrdersFilter(orders)

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
    const newOrders = filterOrders(attributes)
    setFilteredOrders(orders)

    const newStatuses = updateAttribute('status', initialStatuses, attributes)
    const newDeliveries = updateAttribute(
      'delivery',
      initialDeliveries,
      attributes
    )
    setStatuses(newStatuses)
    setDeliveries(newDeliveries)
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
