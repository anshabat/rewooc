import './A.scss'
import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const A: FC<LinkProps> = (props) => {
  const { children, ...linkProps } = props
  return (
    <Link className="rw-link" {...linkProps}>
      {children}
    </Link>
  )
}

export default A
