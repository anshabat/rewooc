import { useEffect, useState } from 'react'

interface IParam {
  [key: string]: string | string[]
}

const VALUES_SEPARATOR = ','

export function useQuery() {
  const [params, setParams] = useState<IParam>({})

  /* TODO
   * + parse url query and update params
   * - change url when new params receive
   * */

  useEffect(() => {
    //TODO use popstate for handling back & forward button click, maybe put to the Effect below
    window.addEventListener('popstate', (e) => {
      console.log(e)
    })
  }, [])

  useEffect(() => {
    if (!window) {
      throw Error('works only in browsers')
    }
    const params = parseQueryString(window.location.search)
    setParams(params)
  }, [])

  const updateQueryString = (values: IParam) => {
    /*const params = Object.entries(values).map(([key, values]) => {
      const valuesStr = Array.isArray(values) ? values.join(VALUES_SEPARATOR) : values
      return `${key}=${valuesStr}`
    })*/
    /*
    * 1 - map values
    * 2 - if key exist - change value inside param
    * 3 - if not exist - add new key to the param
    * 4 - if values empty - remove key
    * */

    const newParams = {...params}
    //console.log(values)

    Object.entries(values).forEach(([key, val]) => {
      if((Array.isArray(val) && val.length === 0) || '') {
        delete newParams[key]
      } else {
        newParams[key] = val
      }
      //const valueStr = Array.isArray(val) ? val.join(VALUES_SEPARATOR) : String(val)
      if(newParams[key] != null) {
        /*
        * if val === [''] || '' - delete newParams[key]
        * else - newParams[key] = val
        * */
/*       if(Array.isArray(val) && Array.isArray(param)) {
         console.log('old - arrays')
         newParams[key] = val
       } else if (!Array.isArray(val) && !Array.isArray(param)) {
         console.log('olf - primitives')
         newParams[key] = val
       } else {
         throw Error ('inconsistent types')
       }*/
      } else {
        /*if(Array.isArray(val)) {
          console.log('new - array')
        } else if (val != null) {
          console.log('new - primitives')
        } else {
          throw Error ('inconsistent types')
        }*/
      }

    })
    //return `${key}=${valuesStr}`
    console.log(newParams)
  }

  const parseQueryString = (str: string): IParam => {
    const params = str.slice(1).split('&')
    return params.reduce<IParam>((res, param) => {
      const [name, value] = param.split('=')
      const values = value.split(VALUES_SEPARATOR)
      res[name] = values.length > 1 ? values : value
      return res
    }, {})
  }

  return {
    params,
    updateQueryString,
  }
}
