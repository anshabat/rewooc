import 'font-awesome/fonts/fontawesome-webfont.eot'
import 'font-awesome/fonts/fontawesome-webfont.ttf'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.woff2'
import 'font-awesome/fonts/fontawesome-webfont.svg'
import 'font-awesome/css/font-awesome.min.css'
import './Icon.scss'
import React, { FC, MouseEvent } from 'react'

interface IProps {
  classes?: string[]
  name?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  ariaLabel?: string
}

const Icon: FC<IProps> = (props) => {
  const { classes = [], name = '', ariaLabel, onClick } = props
  classes.push('fa', name)

  const IconComponent = (
    <i
      className={classes.join(' ').trim()}
      aria-label={ariaLabel}
      role="img"
    />
  )

  return onClick ? (
    <button className="rw-icon" type="button" onClick={onClick}>
      {IconComponent}
    </button>
  ) : (
    <span className="rw-icon">{IconComponent}</span>
  )
}

export default Icon
