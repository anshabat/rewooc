import 'font-awesome/fonts/fontawesome-webfont.eot'
import 'font-awesome/fonts/fontawesome-webfont.ttf'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.woff2'
import 'font-awesome/fonts/fontawesome-webfont.svg'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'

const Icon = (props) => {
  const { classes = [], name } = props
  classes.push('fa', name)
  return <i className={classes.join(' ')} aria-hidden="true" />
}
export default Icon
