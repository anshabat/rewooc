import React from 'react'
import withPageData from '../../withPageData'

function Orders({ orders }) {
  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default withPageData(Orders)
