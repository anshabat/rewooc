import './FormField.scss'
import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hideLabel?: boolean
  horizontal?: boolean
}

const FormField: FC<IProps> = (props) => {
  const {
    horizontal = false,
    label,
    hideLabel = false,
    id,
    ...restProps
  } = props

  const screenReaderClass = classNames({ 'h-screen-reader-text': hideLabel })
  const fieldClass = classNames({
    'rw-form-field': true,
    'rw-form-field--horizontal': horizontal,
  })

  return (
    <div className={fieldClass}>
      <label className={screenReaderClass} htmlFor={id}>
        {label}
      </label>
      <div className="rw-form-field__element">
        <input className="rw-form-field__control" id={id} {...restProps} />
      </div>
    </div>
  )
}

export default FormField
