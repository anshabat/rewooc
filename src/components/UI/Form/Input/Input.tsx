import React, { FC, InputHTMLAttributes } from 'react'
import FormField2, { IFormFieldProps } from '../FormField2/FormField2'

export type TInputProps = IFormFieldProps & InputHTMLAttributes<HTMLInputElement>

const Input: FC<TInputProps> = (props) => {
  const {
    type = 'text',
    placeholder,
    label,
    hideLabel,
    horizontal,
    required,
    error,
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
      <input type={type} placeholder={placeholder} {...restProps} />
    </FormField2>
  )
}

export default Input
