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

/*const attributesFacade = (attributes: {
  [key: string]: FilterChoiceValue[]
}): IOrderFilter => {
  // TODO probably should be set as hook arguments, with generic for Order attributes
  return [
    {
      key: 'status',
      label: 'Status',
      values: attributes.status,
      type: 'multichoice',
    },
    {
      key: 'delivery',
      label: 'Delivery',
      values: attributes.delivery,
      type: 'multichoice',
    },
  ]
}*/

export interface IOrderValues {
  status: string[]
  delivery: string[]
}

const initialValues: IOrderValues = {
  status: [],
  delivery: [],
}

type IOrderFilter = IFilterAttributes<keyof IOrderValues>[]

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const { filteredOrders, updatedAttributes, applyFilter } = useOrdersFilter<IOrderValues>(
    orders
  )

  return (
    <div className="rw-orders-list">
      <OrdersFilter
        attributes={updatedAttributes}
        attributesValues={initialValues}
        onFilter={applyFilter}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
