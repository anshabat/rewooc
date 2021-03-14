import './FormField.scss'
import React, { FC, InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  className?: string
}

const FormField: FC<IProps> = (props) => {
  const { className = '', ...restProps } = props

  return (
    <div className={`rw-form-field ${className}`.trim()}>
      <input className="rw-form-field__control" {...restProps} />
    </div>
  )
}

export default FormField
