import './Input.scss'
import React, { FC, InputHTMLAttributes, LegacyRef } from 'react'
import FormField, { IFormFieldProps } from '../FormField/FormField'

export type TInputProps = IFormFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    elementRef?: LegacyRef<HTMLInputElement>
  }

const Input: FC<TInputProps> = (props) => {
  const {
    type = 'text',
    placeholder,
    label,
    hideLabel,
    horizontal,
    required,
    error,
    children,
    elementRef = null,
    ...restProps
  } = props

  return (
    <FormField
      label={label}
      hideLabel={hideLabel}
      horizontal={horizontal}
      required={required}
      error={error}
    >
      <input
        className="rw-input"
        type={type}
        placeholder={placeholder}
        ref={elementRef}
        {...restProps}
      />
      {children}
    </FormField>
  )
}

export default Input
