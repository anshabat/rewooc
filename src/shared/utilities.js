/**
 * Delay event handler call until user finish trigger event
 *
 * @param callback - Event handle function
 * @param delay - handel call delay
 * @returns {function(*=)} Delayed event handler function
 */

import { Config } from '../config'

export const debounce = (callback, delay = 300) => {
  let timeout = null
  return (event) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(event)
    }, delay)
  }
}

export const removeTrailingSlash = (str) =>
  str.endsWith('/') ? removeTrailingSlash(str.slice(0, -1)) : str

export const siteUrl = (url) => {
  const urlPath = url.replace(Config.apiUrl, '')

  return urlPath[0] === '/' || urlPath.startsWith('http')
    ? urlPath
    : `/${urlPath}`
}

export const apiUrl = (url = '') =>
  `${removeTrailingSlash(Config.apiUrl + url)}/`

export const ajaxEndpoint = (action) => `${Config.apiUrl}/?wc-ajax=${action}`
