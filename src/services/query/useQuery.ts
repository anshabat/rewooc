import { useEffect, useState } from 'react'

export interface IParam {
  [key: string]: string | string[]
}

const VALUES_SEPARATOR = ','

const parseQueryString = (str: string): IParam => {
  if (!str.startsWith('?')) {
    return {}
  }
  const params = str.slice(1).split('&')
  return params.reduce<IParam>((res, param) => {
    const [name, value] = param.split('=')
    if (value) {
      const values = value.split(VALUES_SEPARATOR)
      res[name] = values.length > 1 ? values : value
    }
    return res
  }, {})
}

//TODO add typing to return value
export function useQuery() {
  const [params, setParams] = useState<IParam>(
    parseQueryString(window.location.search)
  )

  useEffect(() => {
    window.addEventListener('popstate', setParamsFromUrl)

    return () => {
      window.removeEventListener('popstate', setParamsFromUrl)
    }
  }, [])

  const updateUrl = (newParams: IParam): void => {
    const pageUrl = `${window.location.origin}${window.location.pathname}`
    const search = getQueryStringFromParams(newParams)
    const fullUrl = search ? `${pageUrl}?${search}` : pageUrl
    window.history.pushState(null, '', fullUrl)
  }

  const updateParams = (values: IParam) => {
    const newParams = parseQueryString(window.location.search)
    Object.entries(values).forEach(([key, val]) => {
      if ((Array.isArray(val) && val.length === 0) || val === '') {
        delete newParams[key]
      } else {
        newParams[key] = val
      }
    })
    setParams(newParams)
    updateUrl(newParams)
  }

  const setParamsFromUrl = () => {
    if (!window) {
      throw Error('works only in browsers')
    }
    const queryStrParams = parseQueryString(window.location.search)
    setParams(queryStrParams)
  }

  const getQueryStringFromParams = (params: IParam): string => {
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
