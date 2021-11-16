import './OrdersTable.scss'
import React, { FC } from 'react'
import { IOrder, ISorting } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'
import SortableTitle from '../../../UI/SortableTitle/SortableTitle'
import { useSorting } from '../../../../hooks/useSorting'

interface IProps {
  orders: IOrder[]
  initialSorting: ISorting
  onSorting: (sorting: ISorting) => void
}

const OrdersTable: FC<IProps> = (props) => {
  const { orders, initialSorting, onSorting } = props
  const { getDirection, setDirection } = useSorting(initialSorting, onSorting)

  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>
            <SortableTitle
              direction={getDirection('id')}
              onChange={(direction) => {
                setDirection('id', direction, 'number')
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
                setDirection('created.date', direction, 'string')
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={getDirection('total')}
              onChange={(direction) => {
                setDirection('total', direction, 'number')
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
