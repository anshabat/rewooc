import './FormElement.scss'
import React, { FC, InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
}

const FormField: FC<IProps> = (props) => {
  const { className = '', ...restProps } = props

  return (
    <div className={`rw-form-element ${className}`.trim()}>
      <input className="rw-form-element__control" {...restProps} />
    </div>
  )
}

export default FormField
