import './DeleteButton.scss'
import React, { FC, MouseEvent } from 'react'
import Icon from '../Icon/Icon'

interface IProps {
  isLoading?: boolean
  onDelete?: (e: MouseEvent) => void
}

const DeleteButton: FC<IProps> = (props) => {
  const { isLoading, onDelete } = props
  return (
    <button className="rw-delete-button" type="button" onClick={onDelete}>
      {isLoading ? (
        <Icon classes={['fa-circle-o-notch', 'fa-spin']} />
      ) : (
        <Icon classes={['fa-times']} />
      )}
    </button>
  )
}

export default DeleteButton
