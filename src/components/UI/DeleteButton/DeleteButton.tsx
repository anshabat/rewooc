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
        <Icon classes={['fa-circle-o-notch', 'fa-spin']} ariaLabel="Deleting in progress" />
      ) : (
        <Icon classes={['fa-times']} ariaLabel="Delete" />
      )}
    </button>
  )
}

export default DeleteButton
