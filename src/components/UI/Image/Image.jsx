import React from 'react'

const Image = (props) => {
  const { image } = props
  return image ? (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
    />
  ) : null
}

export default Image
