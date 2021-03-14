import './PageLoader.scss'
import React, { FC } from 'react'
import Loader from '../Loader/Loader'

const PageLoader: FC= () => (
  <div className="rw-page-loader">
    <Loader />
  </div>
)

export default PageLoader
