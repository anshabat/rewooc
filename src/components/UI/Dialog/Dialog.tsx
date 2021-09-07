import './Dialog.scss'
import React, { FC } from 'react'
import DialogPortal from './DialogPortal'
import Backdrop from '../Backdrop/Backdrop'

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
      <Backdrop onClick={onClose}>
        <div className="rw-dialog">
          <button className="rw-dialog__close" onClick={onClose}>
            X
          </button>
          <div className="rw-dialog__content">{children}</div>
        </div>
      </Backdrop>
    </DialogPortal>
  )
}

export default Dialog
