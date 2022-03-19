import './Input.scss'
import React, { FC, InputHTMLAttributes, LegacyRef } from 'react'
import FormField2, { IFormFieldProps } from '../FormField2/FormField2'

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
    <FormField2
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
    </FormField2>
  )
}

export default Input
