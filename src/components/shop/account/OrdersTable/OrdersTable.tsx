import './OrdersTable.scss'
import React, { FC } from 'react'
import { IOrder, TGetSortingDirection } from 'types'
import Price from '../../Price/Price'
import { getFormattedDate } from 'services/date'
import { TOrdersSorting } from 'hooks/useOrdersList'
import SortableTitle from 'components/UI/SortableTitle/SortableTitle'
import A from 'components/UI/A/A'

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
                onSorting({ orderBy: 'id', direction })
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
                onSorting({ orderBy: 'created.date', direction })
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={getDirection('total')}
              onChange={(direction) => {
                onSorting({ orderBy: 'total', direction })
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
                {/* <A to={`/my-account/view-order/${order.id}`}>{order.id}</A> */}
                {order.id}
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
