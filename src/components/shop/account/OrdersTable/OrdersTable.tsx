import './OrdersTable.scss'
import React, { FC } from 'react'
import { ChangeOrderType, IOrder, ISorting } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'
import SortableTitle from '../../../UI/SortableTitle/SortableTitle'

interface IProps {
  orders: IOrder[]
  sorting: ISorting
  onSorting: ChangeOrderType
}

const OrdersTable: FC<IProps> = (props) => {
  const { orders, sorting, onSorting } = props

  const getSortingDirection = (orderBy: string): 'desc' | 'asc' | null => {
    return sorting.orderBy === orderBy ? sorting.direction : null
  }

  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>
            <SortableTitle
              direction={getSortingDirection('id')}
              onChange={(direction) => {
                onSorting('id', direction, 'number')
              }}
            >
              Number
            </SortableTitle>
          </th>
          <th>Status</th>
          <th>Delivery</th>
          <th>
            <SortableTitle
              direction={getSortingDirection('created.date')}
              onChange={(direction) => {
                onSorting('created.date', direction, 'string')
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={getSortingDirection('total')}
              onChange={(direction) => {
                onSorting('total', direction, 'number')
              }}
            >
              Total
            </SortableTitle>
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
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
