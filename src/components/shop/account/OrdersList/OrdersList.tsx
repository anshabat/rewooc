import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter, {
  OrderFilterAttributes,
} from '../OrdersFilter/OrdersFilter'
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
  const {
    filterOrders,
    updateAttribute,
    deliveries,
    setDeliveries,
    statuses,
    setStatuses,
  } = useOrdersFilter(orders)

  const onFilterHandler = (attributes: OrderFilterAttributes) => {
    const newOrders = filterOrders(attributes)
    const newStatuses = updateAttribute('status', attributes)
    const newDeliveries = updateAttribute('delivery', attributes)

    setFilteredOrders(newOrders)
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
