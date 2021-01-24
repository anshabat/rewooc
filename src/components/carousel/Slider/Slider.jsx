import './Slider.scss'
import React, { Component, Children } from 'react'
import * as utils from '../../../shared/utilities'
import withCarousel from '../withCarousel'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      offset: 0,
      startIndex: 0,
      innerSlidesCount: 0,
      lastLoadedIndex: 0,
    }

    this.fitSlides = this.fitSlides.bind(this)
    this.debouncedFitSlides = utils.debounce(this.fitSlides)
  }

  componentDidMount() {
    const { getSlider } = this.props
    const innerSlidesCount = this.getInnerSlidesCount()
    this.setState({
      innerSlidesCount,
      lastLoadedIndex: innerSlidesCount,
    })
    window.addEventListener('resize', this.debouncedFitSlides)
    getSlider(this)
  }

  componentDidUpdate() {
    const { offset } = this.state
    this.$carousel.style.setProperty('--offset', offset)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedFitSlides)
  }

  getInnerSlidesCount() {
    return Number(getComputedStyle(this.$carousel).getPropertyValue('--slides'))
  }

  moveSlider(operator) {
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

  prev() {
    const { startIndex } = this.state
    if (startIndex <= 0) {
      return
    }
    this.moveSlider(-1)
  }

  next() {
    const { startIndex, innerSlidesCount } = this.state
    const { children } = this.props
    if (startIndex + innerSlidesCount >= Children.count(children)) {
      return
    }
    this.moveSlider(1)
  }

  fitSlides() {
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

  render() {
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

export default withCarousel(Slider)
