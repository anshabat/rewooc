import React, { FC, useState } from 'react'
import Icon from '../../Icon/Icon'
import FormField, { IFormFieldProps } from '../FormField/FormField'

const PasswordField: FC<IFormFieldProps> = (props) => {
  const { type, ...rest } = props
  const [mode, setMode] = useState(type)
  const iconClass = mode === 'password' ? 'fa-eye' : 'fa-eye-slash'
  const togglePasswordVisibility = () => {
    if (mode === 'password') {
      setMode('text')
    } else {
      setMode('password')
    }
  }

  return (
    <FormField type={mode} {...rest}>
      <Icon name={iconClass} onClick={togglePasswordVisibility} />
    </FormField>
  )
}

export default PasswordField
