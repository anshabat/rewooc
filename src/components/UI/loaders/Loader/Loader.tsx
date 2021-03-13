import './Loader.scss'
import React, { FC } from 'react'

const Loader: FC = () => (
  <div className="lds-ring">
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
)

export default Loader
