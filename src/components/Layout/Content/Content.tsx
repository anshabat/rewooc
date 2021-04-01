import './Content.scss'
import React, { FC } from 'react'

interface IProps {
  title: string
  size?: 'sm' | 'md'
}

const Content: FC<IProps> = (props) => {
  const { title, children, size } = props
  const bodySize = size ? `${size}` : 'md'

  return (
    <div className="rw-content">
      <div className="rw-content__breadcrumbs">
        <div className="rw-content__container">[Beadcrumbs]</div>
      </div>
      <section className="rw-content__container">
        <div className="rw-content__heading">
          <h1 className="rw-content__title">{title}</h1>
        </div>
        <div
          className={`rw-content__body rw-content__body--size-${bodySize}`.trim()}
        >
          {children}
        </div>
      </section>
    </div>
  )
}

export default Content
