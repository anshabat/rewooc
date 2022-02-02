/**
 * Delay event handler call until user finish trigger event
 *
 * @param callback - Event handle function
 * @param delay - handel call delay
 * @returns {function(*=)} Delayed event handler function
 */

import { Config } from '../config'
import { TSorting } from 'app-types'

export const debounce = (
  callback: (e: Event) => void,
  delay = 300
): ((e: Event) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (event: Event) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      callback(event)
    }, delay)
  }
}

export const removeTrailingSlash = (str: string): string => {
  return str.endsWith('/') ? removeTrailingSlash(str.slice(0, -1)) : str
}

export const siteUrl = (url: string): string => {
  const urlPath = Config.apiUrl ? url.replace(Config.apiUrl, '') : '/'

  return urlPath[0] === '/' || urlPath.startsWith('http')
    ? urlPath
    : `/${urlPath}`
}

export const apiUrl = (url = ''): string => {
  return `${removeTrailingSlash(Config.apiUrl + url)}/`
}

export const ajaxEndpoint = (action: string): string => {
  return `${Config.apiUrl}/?wc-ajax=${action}`
}

export function trimObject<T>(obj: T, exceptions: Array<string>): Partial<T> {
  const filteredKeys = Object.keys(obj).filter(
    (p) => !exceptions.includes(p)
  ) as Array<keyof T>

  return filteredKeys.reduce<Partial<T>>((result, item) => {
    result[item] = obj[item]
    return result
  }, {})
}

export const propertyFromDottedString = (obj: any, dottedStr: string): any => {
  const properties = dottedStr.split('.')
  return properties.reduce((res, item) => res?.[item], obj)
}

export function sortObjects<T>(items: T[], sorting: TSorting): T[] {
  const { orderBy, direction, type } = sorting
  const newOrders = [...items]
  return newOrders.sort((a, b) => {
    const aValue = propertyFromDottedString(a, String(orderBy))
    const bValue = propertyFromDottedString(b, String(orderBy))
    switch (type) {
      case 'string':
        if (direction === 'desc') {
          return aValue > bValue ? -1 : 1
        } else {
          return aValue > bValue ? 1 : -1
        }
      case 'number':
      default:
        return direction === 'desc' ? bValue - aValue : aValue - bValue
    }
  })
}