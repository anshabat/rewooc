import { useContext } from 'react'
import Context, { CarouselType, ICarouselContext } from './context'

export function useCarousel(): CarouselType {
  const { carousel } = useContext<ICarouselContext>(Context)
  return carousel
}
