import './Slider.scss'
import React, { Component, Children, ReactNode, ReactElement } from 'react'
import * as utils from '../../../shared/utilities'
import withCarousel from '../withCarousel'
import { ICarouselContext } from '../context'

interface IState {
  offset: number
  startIndex: number
  innerSlidesCount: number
  lastLoadedIndex: number
}

interface IOwnProps {
  children: ReactNode
}

type IProps = ICarouselContext & IOwnProps

class Slider extends Component<IProps, IState> {
  debouncedFitSlides: (event: Event) => void
  $carousel: HTMLElement | null

  constructor(props: IProps) {
    super(props)

    this.state = {
      offset: 0,
      startIndex: 0,
      innerSlidesCount: 0,
      lastLoadedIndex: 0,
    }

    this.fitSlides = this.fitSlides.bind(this)
    this.debouncedFitSlides = utils.debounce(this.fitSlides)
    this.$carousel = null
  }

  componentDidMount(): void {
    const { getSlider } = this.props
    const innerSlidesCount = this.getInnerSlidesCount()
    this.setState({
      innerSlidesCount,
      lastLoadedIndex: innerSlidesCount,
    })
    window.addEventListener('resize', this.debouncedFitSlides)
    getSlider(this)
  }

  componentDidUpdate(): void {
    const { offset } = this.state
    if (this.$carousel) {
      this.$carousel.style.setProperty('--offset', String(offset))
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.debouncedFitSlides)
  }

  getInnerSlidesCount(): number {
    return this.$carousel
      ? Number(getComputedStyle(this.$carousel).getPropertyValue('--slides'))
      : 0
  }

  moveSlider(operator: number): void {
    this.setState((prev) => {
      const startIndex = Math.max(prev.startIndex + operator, 0)
      return {
        startIndex,
        offset: prev.offset - (operator * 100) / prev.innerSlidesCount,
        lastLoadedIndex: Math.max(
          prev.lastLoadedIndex,
          startIndex + prev.innerSlidesCount
        ),
      }
    })
  }

  prev(): void {
    const { startIndex } = this.state
    if (startIndex <= 0) {
      return
    }
    this.moveSlider(-1)
  }

  next(): void {
    const { startIndex, innerSlidesCount } = this.state
    const { children } = this.props
    if (startIndex + innerSlidesCount >= Children.count(children)) {
      return
    }
    this.moveSlider(1)
  }

  fitSlides(): void {
    const innerSlidesCount = this.getInnerSlidesCount()
    this.setState((prev) => ({
      innerSlidesCount,
      offset:
        prev.offset -
        (prev.offset + (prev.startIndex * 100) / innerSlidesCount),
      lastLoadedIndex: Math.max(
        prev.lastLoadedIndex,
        prev.startIndex + innerSlidesCount
      ),
    }))
  }

  render(): ReactElement {
    const { children } = this.props
    const { innerSlidesCount, lastLoadedIndex } = this.state

    return (
      <div
        className="rw-slider"
        ref={(element) => {
          this.$carousel = element
        }}
      >
        {innerSlidesCount && (
          <div className="rw-slider__wrapper">
            <div className="rw-slider__list">
              {Children.map(children, (Slide, index) => (
                <div className="rw-slider__item">
                  {index < lastLoadedIndex ? Slide : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export type SliderComponentType = Slider

export default withCarousel<IOwnProps>(Slider)
