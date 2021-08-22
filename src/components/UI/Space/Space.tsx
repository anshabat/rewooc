import './Space.scss'
import React, { FC } from 'react'

interface IProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Space: FC<IProps> = (props) => {
  const { size, children } = props
  return <div className={`rw-space rw-space--${size}`}>{children}</div>
}

export default Space
