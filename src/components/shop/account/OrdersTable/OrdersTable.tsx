import './OrdersTable.scss'
import React, { FC } from 'react'
import { IOrder, TGetSortingDirection } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'
import SortableTitle from '../../../UI/SortableTitle/SortableTitle'
import { TOrdersSorting } from 'src/hooks/useOrdersList'

interface IProps {
  orders: IOrder[]
  sorting: TOrdersSorting
  onSorting: (sorting: TOrdersSorting) => void
}

const OrdersTable: FC<IProps> = (props) => {
  const { orders, sorting, onSorting } = props

  //TODO move to helpers, as the filer helpers
  const getDirection: TGetSortingDirection = (orderBy) => {
    return sorting.orderBy === orderBy ? sorting.direction : null
  }

  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>
            <SortableTitle
              direction={getDirection('id')}
              onChange={(direction) => {
                onSorting({
                  orderBy: 'id',
                  type: 'number',
                  direction,
                })
              }}
            >
              Number
            </SortableTitle>
          </th>
          <th>Status</th>
          <th>Delivery</th>
          <th>
            <SortableTitle
              direction={getDirection('created.date')}
              onChange={(direction) => {
                onSorting({
                  orderBy: 'created.date',
                  type: 'string',
                  direction,
                })
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={getDirection('total')}
              onChange={(direction) => {
                onSorting({
                  orderBy: 'total',
                  type: 'number',
                  direction,
                })
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
