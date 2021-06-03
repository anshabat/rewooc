import './FormField.scss'
import React, { FC } from 'react'
import css from 'classnames'

interface IProps {
  label: string
  hideLabel?: boolean
  direction?: 'horizontal' | 'vertical'
}

const FormField: FC<IProps> = (props) => {
  const { direction = 'vertical', label, hideLabel = false, children } = props

  const screenReaderClass = css({ 'h-screen-reader-text': hideLabel })

  return (
    <div className={`rw-form-field rw-form-field--${direction}`}>
      <label className={screenReaderClass} htmlFor="billing_first_name">
        {label}
      </label>
      <div className="rw-form-field__element">{children}</div>
    </div>
  )
}

export default FormField
