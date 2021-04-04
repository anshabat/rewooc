export const wcAjax = (action: string): string => `/?wc-ajax=${action}`
export const wcRest = (url: string): string => `/wp-json/wc/v3/${url}`
export const pageUrl = (url: string): string => (url[0] === '/' ? url : `/${url}`)
