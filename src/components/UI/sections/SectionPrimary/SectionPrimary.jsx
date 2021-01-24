import './SectionPrimary.scss'
import React from 'react'
import Arrow from '../../Arrow/Arrow'
import { withCarousel } from '../../../carousel'

const SectionPrimary = (props) => {
  const { title, carousel, children } = props

  return (
    <section className="rw-section-primary">
      {title && (
        <div className="rw-section-primary__header">
          <h2 className="rw-section-primary__title">{title}</h2>
          {carousel && (
            <div className="rw-section-primary__arrows">
              <div className="rw-section-primary__arrow-left">
                <Arrow onClick={() => carousel.prev()} ico="Prev" />
              </div>
              <div className="rw-section-primary__arrow-right">
                <Arrow onClick={() => carousel.next()} ico="Next" />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="rw-section-primary__body">{children}</div>
    </section>
  )
}

export default withCarousel(SectionPrimary)
