import './FormField2.scss'
import React, { FC } from 'react'
import classNames from 'classnames'

export interface IFormFieldProps {
  label: string
  id?: string
  hideLabel?: boolean
  horizontal?: boolean
  required?: boolean
  error?: string
}

const FormField2: FC<IFormFieldProps> = (props) => {
  const {
    horizontal = false,
    label,
    hideLabel = false,
    id,
    required,
    error,
    children,
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
      <div className={labelClass}>
        <label htmlFor={id}>{label}</label>
        {required ? (
          <span className="rw-form-field__required-star">*</span>
        ) : null}
      </div>
      <div className="rw-form-field__element">{children}</div>
      {error ? <div className="rw-form-field__error">{error}</div> : null}
    </div>
  )
}

export default FormField2
