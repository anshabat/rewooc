import { instance } from '../instance'
import { wcAjax } from '../endpoints'

export default {
  searchProducts: (term, limit) =>
    instance.get(wcAjax('rewooc_search_products'), {
      params: { term, limit },
    }),
  fetchCatalogPage: (url) => instance.get(url),
}
