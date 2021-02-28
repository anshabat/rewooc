import React, { Component, ReactNode } from "react";
import Context, { CarouselType } from "../context";

interface IProps {
  children: ReactNode
}

interface IState {
  carousel: CarouselType
}

class CarouselProvider extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      carousel: null,
    }

    this.getSlider = this.getSlider.bind(this)
  }

  getSlider(carousel: CarouselType): void {
    this.setState({ carousel })
  }

  render(): ReactNode {
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
