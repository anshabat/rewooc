import './ChoiceField.scss'
import React, { AllHTMLAttributes, FC } from 'react'

interface IProps extends AllHTMLAttributes<HTMLElement> {
  type: 'radio' | 'checkbox'
  label: string
}

const ChoiceField: FC<IProps> = (props) => {
  const { type, label, ...restProps } = props

  return (
    <label className="rw-choice-field">
      <input type={type} {...restProps} />
      <span>{label}</span>
    </label>
  )
}

export default ChoiceField
