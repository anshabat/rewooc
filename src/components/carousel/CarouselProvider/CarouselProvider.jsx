import React, { Component } from 'react'
import Context from '../context'

class CarouselProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carousel: null,
    }

    this.getSlider = this.getSlider.bind(this)
  }

  getSlider(carousel) {
    this.setState({ carousel })
  }

  render() {
    const { children } = this.props
    const { carousel } = this.state
    return (
      <Context.Provider
        value={{
          getSlider: this.getSlider,
          carousel,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default CarouselProvider
