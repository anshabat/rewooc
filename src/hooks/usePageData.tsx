import React, { useEffect, useState } from 'react'
import { appApi } from 'app-data'

export function usePageData<P>(): P | null {
  const [data, setData] = useState<null | P>(null)

  useEffect(() => {
    appApi.fetchPageData<P>(window.location.pathname).then((data) => {
      setData(data)
    })
  }, [])

  return data ?? null
}
