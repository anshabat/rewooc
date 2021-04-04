import './Button.scss'
import React, { ButtonHTMLAttributes, FC } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'lg'
  color: 'secondary'
  className?: string
}

const Button: FC<IProps> = (props) => {
  const {
    size = 'md',
    color = 'secondary',
    className = '',
    children,
    ...restProps
  } = props

  return (
    <button
      className={`pc-button pc-button--${size} pc-button--${color} ${className}`.trim()}
      {...restProps}
    >
      <span>{children}</span>
    </button>
  )
}

export default Button
