import './ChoiceGroup.scss'
import React from 'react'

interface IProps<T> {
  items: Array<T>
  error?: string
  children: (item: T) => any
}

function ChoiceGroup<T>(props: IProps<T>) {
  const { items, children, error = '' } = props
  return (
    <div className="rw-choice-group">
      <div className="rw-choice-group__items">
        {items.map((item) => {
          return children(item)
        })}
      </div>
      {error ? <div className="rw-choice-group__error">{error}</div> : null}
    </div>
  )
}

export default ChoiceGroup
