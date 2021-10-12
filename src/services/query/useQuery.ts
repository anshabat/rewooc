import { useEffect, useState } from 'react'

interface IParam {
  [key: string]: string | string[]
}

export function useQuery() {
  const [params, setParams] = useState<IParam>({})

  /*
   * 1 - window -> current window + param
   * 2 -
   * */

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
    const params = parseQueryString(window.location.search)
    setParams(params)
  }, [window.location.search])

  const parseQueryString = (str: string): IParam => {
    const params = str.slice(1).split('&')
    return params.reduce<IParam>((res, param) => {
      const [name, value] = param.split('=')
      const values = value.split(',')
      res[name] = values.length > 1 ? values : value
      return res
    }, {})
  }

  return {
    params,
  }
}
