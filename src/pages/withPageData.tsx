import React, { ComponentType, useEffect, useState } from 'react'
import { appApi } from 'app-data'
import ContentLoader from '../components/UI/loaders/ContentLoader/ContentLoader'

function withPageData<P, T = unknown>(InnerComponent: ComponentType<P & T>) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return function (props: T): JSX.Element {
    const [data, setData] = useState<null | P>(null)

    useEffect(() => {
      appApi.fetchPageData<P>(window.location.pathname).then((data) => {
        setData(data)
      })
    }, [])

    return data ? <InnerComponent {...data} {...props} /> : <ContentLoader />
  }
}

export default withPageData
