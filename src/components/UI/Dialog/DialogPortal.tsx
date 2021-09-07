import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const DialogPortal = (props: any): any => {
  const { children } = props
  const elementId = 'dialog-portal'
  const elementTag = 'div'

  const element = document.createElement(elementTag)
  element.setAttribute('id', elementId)

  useEffect(() => {
    document.body.appendChild(element)
    return () => {
      document.body.removeChild(element)
    }
  })

  return ReactDOM.createPortal(children, element)
}

export default DialogPortal
