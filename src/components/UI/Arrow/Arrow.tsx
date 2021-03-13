import './Arrow.scss'
import React, { FC, MouseEvent } from 'react'

interface IProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  ico: string
}

const Arrow: FC<IProps> = (props) => {
  const { onClick, ico } = props

  return (
    <button onClick={onClick} type="button">
      {ico}
    </button>
  )
}

export default Arrow
