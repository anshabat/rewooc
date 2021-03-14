export const wcAjax = (action: string): string => `/?wc-ajax=${action}`
export const pageUrl = (url: string): string => (url[0] === '/' ? url : `/${url}`)
