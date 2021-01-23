import {instance} from "../instance";
import {wcAjax} from "../endpoints";

export const searchProducts = (term, limit) => {
  return instance.get(wcAjax('rewooc_search_products'), {
    params: {term, limit}
  })
}