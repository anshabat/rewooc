import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'
import { AxiosResponse } from 'axios'
import { IGeneralData, IGeneralResponseData } from "./appTypes";
import { ErrorMessage } from '../../shared/errorMessages'
import { cartHashToItems } from '../cart/cartHelpers'

function fetchPageData<P>(url: string): Promise<AxiosResponse<P>> {
  return instance.get<P>(pageUrl(url))
}

async function fetchGeneralData(): Promise<IGeneralData> {
  const response = await instance.get<IGeneralResponseData>(
    wcAjax('rewooc_get_common_data')
  )
  const { data } = response
  if (!data) {
    throw new Error(ErrorMessage.CART_FAIL_TO_FETCH_GENERAL_DATA)
  }
  return { ...data, cart: cartHashToItems(data.cart) }
}

export default {
  fetchPageData,
  fetchGeneralData,
}
