import './CardPost.scss'
import React from 'react'
import Image from '../../UI/Image/Image'

const CardPost = (props) => {
  const { images, dateCreated, title } = props

  return (
    <div className="rw-post-card">
      <div className="rw-post-card__image">
        <Image image={images.medium} />
      </div>
      <div className="rw-post-card__created">{dateCreated}</div>
      <div className="rw-post-card__title">{title}</div>
    </div>
  )
}

export default CardPost
