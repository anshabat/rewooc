import React, { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react'
import FormField from '../../../UI/Form/FormField/FormField'
import { trimObject } from '../../../../shared/utilities'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue: number
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
}

const QuantityField: FC<IProps> = (props) => {
  const { initialValue } = props
  const newProps = trimObject<IProps>(props, ['onChange', 'initialValue'])
  const [value, setValue] = useState<number>(initialValue)

  return (
    <FormField
      type="number"
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
      }}
      value={value}
      {...newProps}
    />
  )
}

export default QuantityField
