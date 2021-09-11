import './OrdersTable.scss'
import React, { FC } from 'react'
import { IOrder } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'

interface IProps {
  orders: IOrder[]
}

const OrdersTable: FC<IProps> = (props) => {
  const { orders } = props
  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Status</th>
          <th>Created</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <td>
                <A to={`/my-account/view-order/${order.id}`}>{order.id}</A>
              </td>
              <td>{order.status}</td>
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
