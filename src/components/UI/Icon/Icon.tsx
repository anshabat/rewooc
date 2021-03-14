import 'font-awesome/fonts/fontawesome-webfont.eot'
import 'font-awesome/fonts/fontawesome-webfont.ttf'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.woff2'
import 'font-awesome/fonts/fontawesome-webfont.svg'
import 'font-awesome/css/font-awesome.min.css'
import React, { FC } from 'react'

interface IProps {
  classes?: string[]
  name?: string
}

const Icon: FC<IProps> = (props) => {
  const { classes = [], name = '' } = props
  classes.push('fa', name)

  return <i className={classes.join(' ').trim()} aria-hidden="true" />
}
export default Icon
