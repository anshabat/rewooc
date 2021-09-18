import './OrdersTable.scss'
import React, { FC } from 'react'
import { IOrder } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'
import SortableTitle from '../../../UI/SortableTitle/SortableTitle'
import { useSorting } from '../../../../hooks/useSorting'

interface IProps {
  orders: IOrder[]
}

type OrderProperties = 'total' | 'id' | 'created.date'

const OrdersTable: FC<IProps> = (props) => {
  const { orders } = props
  const { sortedOrders, sorting, changeOrder } = useSorting<OrderProperties>(
    orders,
    {
      orderBy: 'created.date',
      direction: 'asc',
      type: 'string',
    }
  )

  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>
            <SortableTitle
              direction={sorting.orderBy === 'id' ? sorting.direction : null}
              onChange={(direction) => {
                changeOrder('id', direction, 'number')
              }}
            >
              Number
            </SortableTitle>
          </th>
          <th>Status</th>
          <th>Delivery</th>
          <th>
            <SortableTitle
              direction={
                sorting.orderBy === 'created.date' ? sorting.direction : null
              }
              onChange={(direction) => {
                changeOrder('created.date', direction, 'string')
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={sorting.orderBy === 'total' ? sorting.direction : null}
              onChange={(direction) => {
                changeOrder('total', direction, 'number')
              }}
            >
              Total
            </SortableTitle>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedOrders.map((order) => {
          return (
            <tr key={order.id}>
              <td>
                <A to={`/my-account/view-order/${order.id}`}>{order.id}</A>
              </td>
              <td>{order.status.value}</td>
              <td>{order.deliveryMethod.title}</td>
              <td>{getFormattedDate(order.created.date)}</td>
              <td>
                <Price value={order.total} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrdersTable
