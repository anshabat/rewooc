import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import Input from '../../../UI/Form/Input/Input'
import { trimObject } from '../../../../shared/utilities'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  initialValue: number
  disabled: boolean
  hasChanged: boolean
}

const QuantityField: FC<IProps> = (props) => {
  const { initialValue, hasChanged } = props
  const newProps = trimObject<IProps>(props, [
    'onChange',
    'initialValue',
    'hasChanged',
  ])
  const [value, setValue] = useState<number>(initialValue)

  useEffect(() => {
    if (!hasChanged) {
      setValue(initialValue)
    }
  }, [hasChanged])

  return (
    <Input
      label="Quantity"
      hideLabel
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
