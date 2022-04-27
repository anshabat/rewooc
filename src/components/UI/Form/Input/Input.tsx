import './Input.scss'
import React, { FC, InputHTMLAttributes } from 'react'
import FormField, { IFormFieldProps } from '../FormField/FormField'

export type TInputProps = IFormFieldProps &
  InputHTMLAttributes<HTMLInputElement>

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
    id,
    ...restProps
  } = props

  return (
    <FormField
      label={label}
      hideLabel={hideLabel}
      horizontal={horizontal}
      required={required}
      error={error}
      id={id}
    >
      <input
        className="rw-input"
        type={type}
        placeholder={placeholder}
        id={id}
        {...restProps}
      />
      {children}
    </FormField>
  )
}

export default Input
