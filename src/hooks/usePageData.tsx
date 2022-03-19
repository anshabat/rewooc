import { useEffect, useState } from 'react'
import { appApi } from 'api'

export function usePageData<P>(): P | null {
  const [data, setData] = useState<null | P>(null)

  let isMounted = true
  useEffect(() => {
    appApi.fetchPageData<P>(window.location.pathname).then((data) => {
      if (isMounted) setData(data)
    })
    return () => {
      isMounted = false
    }
  }, [])

  return data ?? null
}
