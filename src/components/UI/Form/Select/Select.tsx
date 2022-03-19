import './Select.scss'
import React, { FC, HTMLProps, ReactNode } from 'react'

type SelectProps = HTMLProps<HTMLSelectElement> & {
  children: ReactNode
}

type OptionProps = HTMLProps<HTMLOptionElement> & {
  children: ReactNode
}

const Select: FC<SelectProps> = (props) => {
  const { children, ...nativeProps } = props

  return (
    <select {...nativeProps} className="rw-select">
      {children}
    </select>
  )
}

export const Option: FC<OptionProps> = (props) => {
  const { children, ...nativeProps } = props

  return <option {...nativeProps}>{children}</option>
}

export default Select
