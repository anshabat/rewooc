import './Arrow.scss'
import React from 'react'

const Arrow = ({ onClick, ico }) => (
  <button onClick={onClick} type="button">
    {ico}
  </button>
)

export default Arrow
