import {instance} from "../instance";
import {wcAjax} from "../endpoints";

export default {
  searchProducts: (term, limit) => {
    return instance.get(wcAjax('rewooc_search_products'), {
      params: {term, limit}
    })
  },
  fetchCatalogPage: (url) => {
    return instance.get(url)
  }
}