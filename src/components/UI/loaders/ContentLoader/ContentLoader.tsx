import './ContentLoader.scss'
import React, { FC } from 'react'
import Loader from '../Loader/Loader'

const ContentLoader: FC = () => (
  <div className="rw-content-loader" role="progressbar">
    <Loader />
  </div>
)

export default ContentLoader
