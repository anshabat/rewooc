import React, { Component } from 'react'
import Context, { ICarouselContext } from './context'

function withCarousel<P>(
  WrappedComponent: React.ComponentType<ICarouselContext & P>
) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return class extends Component<P> {
    static contextType = Context

    render() {
      return <WrappedComponent {...this.context} {...this.props} />
    }
  }
}

export default withCarousel
