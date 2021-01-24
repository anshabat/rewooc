import React from 'react'
import withPageData from '../../withPageData'

function Addresses({ address }) {
  return <div>{address}</div>
}

export default withPageData(Addresses)
