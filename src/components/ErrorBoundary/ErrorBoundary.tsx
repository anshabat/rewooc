import React, { FC } from 'react'
import Dialog from '../UI/Dialog/Dialog'

interface IProps {
  error: boolean | Error
  onClose?: () => void
}

const ErrorBoundary: FC<IProps> = (props) => {
  const { children, error, onClose } = props

  if (!error) return <>{children}</>

  return (
    <Dialog
      isOpened={true}
      onClose={() => {
        if (typeof onClose === 'function') {
          onClose()
        }
      }}
    >
      {error.toString()}
    </Dialog>
  )
}

export default ErrorBoundary
