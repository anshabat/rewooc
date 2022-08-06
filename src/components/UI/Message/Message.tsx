import './Message.scss'
import React, { FC } from 'react'

interface IProps {
  type?: string
}

const Message: FC<IProps> = (props) => {
  const { children, type = 'default' } = props

  return <div className={`rw-message rw-message--${type}`} aria-label="Error">{children}</div>
}

export default Message
