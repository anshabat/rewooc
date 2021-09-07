import './Backdrop.scss'
import React, { FC } from 'react'

interface IProps {
  onClick?: () => void
}

const Backdrop: FC<IProps> = (props) => {
  const { onClick } = props
  return (
    <div
      className="rw-backdrop"
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick()
        }
      }}
    />
  )
}

export default Backdrop
