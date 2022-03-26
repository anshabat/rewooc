import './Dialog.scss'
import React, { FC, useEffect } from 'react'
import DialogPortal from './DialogPortal'
import Backdrop from '../Backdrop/Backdrop'

interface IProps {
  isOpened: boolean
  onClose?: () => void
  title?: string
}

const Dialog: FC<IProps> = (props) => {
  const { children, isOpened, onClose, title } = props

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      console.log(e)
      if (e.key === 'Escape' && onClose) onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  })

  if (!isOpened) {
    return null
  }

  const onCloseHandler = () => {
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  return (
    <DialogPortal>
      <Backdrop onClick={onCloseHandler} />
      <div className="rw-dialog" role="dialog">
        {title ? (
          <div className="rw-dialog__header">
            <h3>{title}</h3>
            <button
              className="rw-dialog__close"
              aria-label="Close"
              onClick={onCloseHandler}
            >
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
