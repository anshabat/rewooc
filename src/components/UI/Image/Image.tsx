import React, { FC } from 'react'

interface IProps {
  image: HTMLImageElement
}

const Image: FC<IProps> = (props) => {
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
