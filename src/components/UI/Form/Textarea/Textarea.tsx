import './Textarea.scss'
import React, { FC, InputHTMLAttributes, LegacyRef } from 'react'
import FormField2, { IFormFieldProps } from '../FormField2/FormField2'

export type TTextareaProps = IFormFieldProps &
  InputHTMLAttributes<HTMLTextAreaElement> & {
    elementRef?: LegacyRef<HTMLInputElement>
  }

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
    <FormField2
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
    </FormField2>
  )
}

export default Textarea
