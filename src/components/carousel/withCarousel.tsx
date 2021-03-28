import React, { ReactNode, useContext } from 'react'
import Context, { ICarouselContext } from './context'

function withCarousel<P>(
  WrappedComponent: React.ComponentType<ICarouselContext & P>
) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return (props: P): ReactNode => {
    const context = useContext<ICarouselContext>(Context)

    return <WrappedComponent {...context} {...props} />
  }
}

export default withCarousel
