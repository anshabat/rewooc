import { useEffect, useState } from 'react'

export type IParam<T> = {
  [Property in keyof T]?: string | string[]
}

interface IUseQuery<T> {
  params: IParam<T>
  updateParams: (values: IParam<T>) => void
}

const VALUES_SEPARATOR = ','

const parseQueryString = function <P>(str: string): IParam<P> {
  if (!str.startsWith('?')) {
    return {}
  }
  const params = str.slice(1).split('&')
  return params.reduce<IParam<P>>((res, param) => {
    const [name, value] = param.split('=')
    if (value) {
      const values = value.split(VALUES_SEPARATOR)
      res[name as keyof P] = values.length > 1 ? values : value
    }
    return res
  }, {})
}

//TODO add typing to return value
export function useQuery<T>(): IUseQuery<T> {
  const [params, setParams] = useState<IParam<T>>(
    parseQueryString(window.location.search)
  )

  useEffect(() => {
    window.addEventListener('popstate', setParamsFromUrl)

    return () => {
      window.removeEventListener('popstate', setParamsFromUrl)
    }
  }, [])

  const setParamsFromUrl = () => {
    if (!window) {
      throw Error('works only in browsers')
    }
    const queryStrParams = parseQueryString(window.location.search)
    setParams(queryStrParams)
  }

  const updateParams = (values: IParam<T>) => {
    const newParams = parseQueryString<T>(window.location.search)
    Object.entries<string | string[] | undefined>(values).forEach(
      ([key, val]) => {
        if ((Array.isArray(val) && val.length === 0) || val === '') {
          delete newParams[key as keyof T]
        } else {
          newParams[key as keyof T] = val
        }
      }
    )
    setParams(newParams)
    updateUrl(newParams)
  }

  const updateUrl = (newParams: IParam<T>): void => {
    const pageUrl = `${window.location.origin}${window.location.pathname}`
    const search = getQueryStringFromParams(newParams)
    const fullUrl = search ? `${pageUrl}?${search}` : pageUrl
    window.history.pushState(null, '', fullUrl)
  }

  const getQueryStringFromParams = (params: IParam<T>): string => {
    const queryParams = Object.entries(params).map(([key, value]) => {
      const valueStr = Array.isArray(value) ? value.join(',') : value
      return `${key}=${valueStr}`
    })
    return queryParams.join('&')
  }

  return {
    params,
    updateParams,
  }
}
