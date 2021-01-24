import './FormField.scss'
import React from 'react'

const FormField = (props) => {
  const { className = '', ...restProps } = props

  return (
    <div className={`rw-form-field ${className}`.trim()}>
      <input className={`rw-form-field__control`} {...restProps} />
    </div>
  )
}

export default FormField
