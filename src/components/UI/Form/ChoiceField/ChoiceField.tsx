import './ChoiceField.scss'
import React, { AllHTMLAttributes, FC } from 'react'
import classNames from 'classnames'

interface IProps extends AllHTMLAttributes<HTMLElement> {
  type: 'radio' | 'checkbox'
  label: string
}

const ChoiceField: FC<IProps> = (props) => {
  const { type, label, disabled, ...restProps } = props
  const classes = classNames('rw-choice-field', {
    'rw-choice-field--disabled': disabled,
  })

  return (
    <label className={classes}>
      <input type={type} disabled={disabled} {...restProps} />
      <span>{label}</span>
    </label>
  )
}

export default ChoiceField
