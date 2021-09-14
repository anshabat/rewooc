import './OrdersTable.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import A from '../../../UI/A/A'
import Price from '../../Price/Price'
import { getFormattedDate } from 'app-services/date'
import SortableTitle from '../../../UI/SortableTitle/SortableTitle'

interface IProps {
  orders: IOrder[]
}

interface ISorting {
  orderBy: 'price' | 'id' | 'created'
  direction: 'asc' | 'desc'
}

const sortOrders = (orders: IOrder[], sorting: ISorting): IOrder[] => {
  const { orderBy, direction } = sorting
  const newOrders = [...orders]
  const sortedOrders = newOrders.sort((a, b) => {
    let result = a.id - b.id
    switch (orderBy) {
      case 'id':
        result = direction === 'desc' ? b.id - a.id : a.id - b.id
        break
      case 'price':
        result = direction === 'desc' ? b.total - a.total : a.total - b.total
        break
      case 'created':
        if (direction === 'desc') {
          result = a.created.date > b.created.date ? -1 : 1
        } else {
          result = a.created.date > b.created.date ? 1 : -1
        }
        break
    }
    return result
  })
  return sortedOrders
}

const OrdersTable: FC<IProps> = (props) => {
  const { orders } = props
  const [sorting, setSorting] = useState<ISorting>({
    orderBy: 'created',
    direction: 'asc',
  })

  const changeOrder = (
    orderBy: 'price' | 'id' | 'created',
    direction: 'asc' | 'desc'
  ): void => {
    setSorting({
      orderBy,
      direction,
    })
  }

  const sortedOrders = sortOrders(orders, sorting)

  return (
    <table className="rw-order-table">
      <thead>
        <tr>
          <th>
            <SortableTitle
              direction={sorting.orderBy === 'id' ? sorting.direction : null}
              onChange={(direction) => {
                changeOrder('id', direction)
              }}
            >
              Number
            </SortableTitle>
          </th>
          <th>Status</th>
          <th>
            <SortableTitle
              direction={
                sorting.orderBy === 'created' ? sorting.direction : null
              }
              onChange={(direction) => {
                changeOrder('created', direction)
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={sorting.orderBy === 'price' ? sorting.direction : null}
              onChange={(direction) => {
                changeOrder('price', direction)
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
