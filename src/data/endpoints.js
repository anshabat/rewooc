export const wcAjax = (action) => `/?wc-ajax=${action}`
export const pageUrl = (url) => url[0] === '/' ? url : `/${url}`;