import './InputButton.scss'
import React, { FC, FormEvent } from 'react'
import Input, { TInputProps } from '../Input/Input'
import Button from '../../Button/Button'

interface TProps extends TInputProps {
  onApply: (value: string) => void
}

const InputButton: FC<TProps> = (props) => {
  const {
    onApply,
    ...restProps
  } = props

  const handleSubmit = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    const target = e.target as HTMLFormElement
    onApply(target.text.value)
  }

  return (
    <form className="rw-input-button" onSubmit={handleSubmit}>
      <Input name="text" {...restProps} />
      <Button size="md" color="secondary">OK</Button>
    </form>
  )
}

export default InputButton
