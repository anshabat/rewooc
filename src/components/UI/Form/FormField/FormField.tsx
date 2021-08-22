import './FormField.scss'
import React, { AllHTMLAttributes, FC, LegacyRef } from 'react'
import classNames from 'classnames'

export interface IFormFieldProps extends AllHTMLAttributes<HTMLElement> {
  label: string
  hideLabel?: boolean
  horizontal?: boolean
  required?: boolean
  error?: string
  elementType?: 'input' | 'textarea' | 'select'
  elementRef?: LegacyRef<HTMLInputElement>
}

const FormField: FC<IFormFieldProps> = (props) => {
  const {
    horizontal = false,
    label,
    hideLabel = false,
    id,
    required,
    error,
    elementType = 'input',
    children,
    elementRef = null,
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

  const InputControl = (
    <input
      className="rw-form-field__control"
      id={id}
      required={required}
      ref={elementRef}
      {...restProps}
    />
  )

  const TextAreaControl = (
    <textarea
      className="rw-form-field__control"
      id={id}
      required={required}
      {...restProps}
    />
  )

  const SelectControl = <div>Select placeholder</div>

  const controls = {
    input: InputControl,
    textarea: TextAreaControl,
    select: SelectControl,
  }

  return (
    <div className={fieldClass}>
      <div className={labelClass}>
        <label htmlFor={id}>{label}</label>
        {required ? (
          <span className="rw-form-field__required-star">*</span>
        ) : null}
      </div>
      <div className="rw-form-field__element">
        {controls[elementType]}
        {children}
      </div>
      {error ? <div className="rw-form-field__error">{error}</div> : null}
    </div>
  )
}

export default FormField
