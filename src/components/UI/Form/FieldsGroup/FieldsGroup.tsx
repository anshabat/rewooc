import './FieldsGroup.scss'
import React from 'react'

interface IProps<T> {
  items: Array<T>
  error?: string
  children: (item: T) => any
}

function FieldsGroup<T>(props: IProps<T>) {
  const { items, children, error = '' } = props
  return (
    <div className="rw-fields-group">
      <div className="rw-fields-group__items">
        {items.map((item) => {
          return children(item)
        })}
      </div>
      {error ? <div className="rw-fields-group__error">{error}</div> : null}
    </div>
  )
}

export default FieldsGroup
