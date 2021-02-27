import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { AxiosResponse } from 'axios'
import { ICatalogPage } from './catalogTypes'
import { IProduct } from 'app-types'

function searchProducts(
  term: string,
  limit: number
): Promise<AxiosResponse<Array<IProduct>>> {
  return instance.get<Array<IProduct>>(wcAjax('rewooc_search_products'), {
    params: { term, limit },
  })
}

function fetchCatalogPage(url: string): Promise<AxiosResponse<ICatalogPage>> {
  return instance.get<ICatalogPage>(url)
}

export default {
  searchProducts,
  fetchCatalogPage,
}
