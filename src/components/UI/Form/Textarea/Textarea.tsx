import './Textarea.scss'
import React, { FC, InputHTMLAttributes } from 'react'
import FormField, { IFormFieldProps } from '../FormField/FormField'

export type TTextareaProps = IFormFieldProps &
  InputHTMLAttributes<HTMLTextAreaElement>

const Textarea: FC<TTextareaProps> = (props) => {
  const {
    placeholder,
    label,
    hideLabel,
    horizontal,
    required,
    error,
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
      <textarea
        className="rw-textarea"
        placeholder={placeholder}
        {...restProps}
      />
    </FormField>
  )
}

export default Textarea
