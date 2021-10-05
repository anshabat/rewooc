import './OrdersList.scss'
import React, { FC } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'
import { FilterChoiceValue } from 'app-services/orders'
import { IFilterAttributes } from 'app-services/orders/types'

interface OrdersListProps {
  orders: IOrder[]
}

const attributesFacade = (attributes: {
  [key: string]: FilterChoiceValue[]
}): IFilterAttributes<{status: any, delivery: any}> => {
  // TODO probably should be set as hook arguments, with generic for Order attributes
  return {
    status: {
      label: 'Status',
      values: attributes.status,
      type: 'multichoice',
    },
    delivery: {
      label: 'Delivery',
      values: attributes.delivery,
      type: 'multichoice',
    },
  }
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const { filteredOrders, updatedAttributes, applyFilter } = useOrdersFilter(
    orders
  )
  // TODO should come from the hook instead of temporary facade
  const newAttributes = attributesFacade(updatedAttributes)
  return (
    <div className="rw-orders-list">
      <OrdersFilter attributes={newAttributes} onFilter={applyFilter} />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
