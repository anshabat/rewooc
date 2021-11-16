import './OrdersTable.scss'
import React, { FC, useEffect, useState } from 'react'
import { ChangeOrderType, IOrder, ISorting } from 'app-types'
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

  /*const { sortedOrders, sorting, changeOrder } = useSorting({
    orderBy: 'id',
    direction: 'asc',
    type: 'string',
  })*/
  const [sorting, setSorting] = useState<ISorting>(initialSorting)

  useEffect(() => {
    onSorting(sorting)
  }, [sorting])

  const changeDirection: ChangeOrderType = (orderBy, direction, type) => {
    setSorting({ orderBy, direction, type })
  }

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
                changeDirection('id', direction, 'number')
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
                changeDirection('created.date', direction, 'string')
              }}
            >
              Created
            </SortableTitle>
          </th>
          <th>
            <SortableTitle
              direction={getSortingDirection('total')}
              onChange={(direction) => {
                changeDirection('total', direction, 'number')
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
