import React, { FC, useState } from 'react'
import Icon from '../../Icon/Icon'
import Input, { TInputProps } from '../Input/Input'

const PasswordField: FC<TInputProps> = (props) => {
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
    <Input type={mode} {...rest}>
      <Icon name={iconClass} onClick={togglePasswordVisibility} />
    </Input>
  )
}

export default PasswordField
