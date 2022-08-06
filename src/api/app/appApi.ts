import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'
import { IGeneralData, IGeneralResponseData } from './appTypes'
import { ErrorMessage } from '../../shared/errorMessages'
import { cartHashToItems } from '../cart/cartHelpers'

async function fetchPageData<P>(url: string): Promise<P> {
  const response = await instance.get<P>(pageUrl(url))
  return response.data
}

async function fetchGeneralData(): Promise<IGeneralData> {
  try {
    const response = await instance.get<IGeneralResponseData>(
      wcAjax('rewooc_get_common_data')
    )
    const { data } = response
    return { ...data, cart: cartHashToItems(data.cart) }
  } catch (e) {
    throw new Error(ErrorMessage.APP_FAIL_TO_FETCH_GENERAL_DATA)
  }
}

export default {
  fetchPageData,
  fetchGeneralData,
}
