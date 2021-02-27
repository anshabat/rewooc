import React, { ComponentType, useEffect, useState } from 'react'
import { appApi } from 'app-data'
import ContentLoader from '../components/UI/loaders/ContentLoader/ContentLoader'

function withPageData<P>(InnerComponent: ComponentType<P>) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return function (): JSX.Element {
    const [data, setData] = useState<null | P>(null)

    useEffect(() => {
      appApi.fetchPageData<P>(window.location.pathname).then((data) => {
        setData(data)
      })
    }, [])

    return data ? <InnerComponent {...data} /> : <ContentLoader />
  }
}

export default withPageData
