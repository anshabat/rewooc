import './InputButton.scss'
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import Input, { TInputProps } from '../Input/Input'
import Button from '../../Button/Button'

interface TProps extends TInputProps {
  onApply: (value: string) => void
}

const InputButton: FC<TProps> = (props) => {
  const {
    onApply,
    onChange,
    value: defaultValue = '',
    ...restProps
  } = props
  const [value, setValue] = useState(defaultValue)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if(onChange) {
      onChange(e)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    onApply(target.text.value)
  }

  return (
    <form className="rw-input-button" onSubmit={handleSubmit}>
      <Input name="text" value={value} onChange={handleInput} {...restProps} />
      <Button size="md" color="secondary">OK</Button>
    </form>
  )
}

export default InputButton
