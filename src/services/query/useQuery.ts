import { useEffect, useState } from 'react'

interface IParam {
  [key: string]: string | string[]
}

const VALUES_SEPARATOR = ','

export function useQuery() {
  const [params, setParams] = useState<IParam>({})

  useEffect(() => {
    setParamsFromUrl()
    window.addEventListener('popstate', setParamsFromUrl)

    return () => {
      window.removeEventListener('popstate', setParamsFromUrl)
    }
  }, [])

  useEffect(() => {
    updateUrl(params)
  }, [params])

  const updateUrl = (newParams: IParam): void => {
    const pageUrl = `${window.location.origin}${window.location.pathname}`
    const search = getQueryStringFromParams(newParams)
    const fullUrl = search ? `${pageUrl}?${search}` : pageUrl
    window.history.pushState(null, '', fullUrl)
  }

  const updateParams = (values: IParam) => {
    const newParams = { ...params }
    Object.entries(values).forEach(([key, val]) => {
      if ((Array.isArray(val) && val.length === 0) || val === '') {
        delete newParams[key]
      } else {
        newParams[key] = val
      }
    })
    setParams(newParams)
  }

  const setParamsFromUrl = () => {
    if (!window) {
      throw Error('works only in browsers')
    }
    const queryStrParams = parseQueryString(window.location.search)
    setParams(queryStrParams)
  }

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