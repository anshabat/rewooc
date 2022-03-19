import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ICatalogPage } from './catalogTypes'
import { IProduct } from 'types'

async function searchProducts(
  term: string,
  limit: number
): Promise<Array<IProduct>> {
  const response = await instance.get<Array<IProduct>>(
    wcAjax('rewooc_search_products'),
    {
      params: { term, limit },
    }
  )
  return response.data
}

async function fetchCatalogPage(url: string): Promise<ICatalogPage> {
  const response = await instance.get<ICatalogPage>(url)
  return response.data
}

export default {
  searchProducts,
  fetchCatalogPage,
}
