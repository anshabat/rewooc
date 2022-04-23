import './PageLoader.scss'
import React, { FC } from 'react'
import Loader from '../Loader/Loader'

const PageLoader: FC= () => (
  <div className="rw-page-loader" role="progressbar" aria-label="Page loader">
    <Loader />
  </div>
)

export default PageLoader
