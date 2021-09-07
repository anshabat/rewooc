import './Backdrop.scss'
import React, { FC } from 'react'

interface IProps {
  onClick?: () => void
}

const Backdrop: FC<IProps> = (props) => {
  const { children, onClick } = props
  return (
    <div
      className="rw-backdrop"
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick()
        }
      }}
    >
      <div
        className="rw-backdrop__body"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Backdrop
