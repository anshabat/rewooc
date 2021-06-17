import './FormField.scss'
import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hideLabel?: boolean
  horizontal?: boolean
  required: boolean
  error?: string
}

const FormField: FC<IProps> = (props) => {
  const {
    horizontal = false,
    label,
    hideLabel = false,
    id,
    required,
    error,
    ...restProps
  } = props

  const labelClass = classNames({
    'rw-form-field__label': true,
    'h-screen-reader-text': hideLabel,
  })
  const fieldClass = classNames({
    'rw-form-field': true,
    'rw-form-field--horizontal': horizontal,
    'rw-form-field--required': required,
    'rw-form-field--invalid': error,
  })

  return (
    <div className={fieldClass}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <div className="rw-form-field__element">
        <input
          className="rw-form-field__control"
          id={id}
          required={required}
          {...restProps}
        />
      </div>
      {error ? <div className="rw-form-field__error">{error}</div> : null}
    </div>
  )
}

export default FormField
