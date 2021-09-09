import './Dialog.scss'
import React, { FC } from 'react'
import DialogPortal from './DialogPortal'
import Backdrop from '../Backdrop/Backdrop'

interface IProps {
  isOpened: boolean
  onClose: () => void
  title?: string
}

const Dialog: FC<IProps> = (props) => {
  const { children, isOpened, onClose, title } = props

  if (!isOpened) {
    return null
  }

  return (
    <DialogPortal>
      <Backdrop onClick={onClose} />
      <div className="rw-dialog">
        {title ? (
          <div className="rw-dialog__header">
            <h3>{title}</h3>
            <button className="rw-dialog__close" onClick={onClose}>
              X
            </button>
          </div>
        ) : null}
        <div className="rw-dialog__content">{children}</div>
      </div>
    </DialogPortal>
  )
}

export default Dialog
