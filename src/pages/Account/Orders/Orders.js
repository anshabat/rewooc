import React, { Component } from 'react'
import withPageData from '../../withPageData'

class Orders extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.orders.map((order) => {
            return <li key={order.id}>{order.number}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default withPageData(Orders)
