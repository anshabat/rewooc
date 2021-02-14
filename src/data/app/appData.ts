import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'
import { AxiosResponse } from 'axios'

function fetchPageData<P>(url: string): Promise<AxiosResponse<P>> {
  return instance.get<P>(pageUrl(url))
}

function fetchGeneralData(): Promise<AxiosResponse> {
  return instance.get(wcAjax('rewooc_get_common_data'))
}

export default {
  fetchPageData,
  fetchGeneralData,
}
