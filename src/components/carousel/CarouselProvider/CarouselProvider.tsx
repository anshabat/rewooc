import React, { FC, useState } from 'react'
import Context, { CarouselType } from '../context'

const CarouselProvider: FC = (props) => {
  const { children } = props
  const [carousel, setCarousel] = useState<CarouselType>(null)

  const getSlider = (carousel: CarouselType): void => {
    setCarousel(carousel)
  }

  return (
    <Context.Provider value={{ getSlider, carousel }}>
      {children}
    </Context.Provider>
  )
}

export default CarouselProvider
