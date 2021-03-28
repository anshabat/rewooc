import React from 'react'
import { SliderComponentType } from './Slider/Slider'

export type CarouselType = SliderComponentType | null

export interface ICarouselContext {
  getSlider: (carousel: CarouselType) => void
  carousel: CarouselType
}

export default React.createContext<ICarouselContext>({
  getSlider: () => {
    return
  },
  carousel: null,
})
