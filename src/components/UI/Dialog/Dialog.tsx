import './Dialog.scss'
import React, { FC } from 'react'
import DialogPortal from './DialogPortal'

interface IProps {
  isOpened: boolean
  onClose?: () => void
}

const Dialog: FC<IProps> = (props) => {
  const { children, isOpened, onClose } = props

  if (!isOpened) {
    return null
  }

  return (
    <DialogPortal>
      <div className="rw-dialog">
        <button className="rw-dialog__close" onClick={onClose}>X</button>
        <div className="rw-dialog__content">{children}</div>
      </div>
    </DialogPortal>
  )
}

export default Dialog
