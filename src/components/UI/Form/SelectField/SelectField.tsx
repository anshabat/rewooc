import './SelectField.scss'
import React, { FC, SelectHTMLAttributes } from 'react'
import FormField2, { IFormFieldProps } from '../FormField2/FormField2'

interface TProps extends IFormFieldProps,  SelectHTMLAttributes<HTMLSelectElement>{
  options: [string, string][]
}

const SelectField: FC<TProps> = (props) => {
  const {
    options,
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
      <select className="rw-select-field" {...restProps}>
        <option value="">Chose your country</option>
        {options.map((option) => {
          return (
            <option value={option[1]} key={option[1]}>
              {option[0]}
            </option>
          )
        })}
      </select>
    </FormField2>
  )
}

export default SelectField
