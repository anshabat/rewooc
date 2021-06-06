import './Form.scss'
import React, { FC, FormEvent } from 'react'
import classNames from 'classnames'

export type FormEventType = FormEvent<HTMLFormElement> & {
  target: HTMLFormElement
}

interface IFormProps {
  onSubmit?: (e: FormEventType) => void
  loading?: boolean
}
interface ISubComponents {
  Fieldset: typeof Fieldset
  Legend: typeof Legend
  Fields: typeof Fields
}
const Form: FC<IFormProps> & ISubComponents = (props) => {
  const { children, onSubmit, loading = false } = props
  const formClass = classNames({
    'rw-form': true,
    'rw-form--is-loading': loading,
  })

  return (
    <form className={formClass} action="" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
const Fieldset: FC = ({ children }) => {
  return <fieldset className="rw-form__fieldset">{children}</fieldset>
}

const Legend: FC = ({ children }) => {
  return <legend className="rw-form__legend">{children}</legend>
}

const Fields: FC = ({ children }) => {
  return <div className="rw-form__fields">{children}</div>
}

Form.Fieldset = Fieldset
Form.Legend = Legend
Form.Fields = Fields

export default Form
