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
    id,
    ...restProps
  } = props

  return (
    <FormField
      id={id}
      label={label}
      hideLabel={hideLabel}
      horizontal={horizontal}
      required={required}
      error={error}
    >
      <textarea
        className="rw-textarea"
        placeholder={placeholder}
        id={id}
        {...restProps}
      />
    </FormField>
  )
}

export default Textarea
