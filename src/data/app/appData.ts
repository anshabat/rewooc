import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'
import { AxiosResponse } from "axios";

function fetchPageData(url: string): Promise<AxiosResponse> {
  return instance.get(pageUrl(url))
}

function fetchGeneralData() {
  return instance.get(wcAjax('rewooc_get_common_data'))
}

export default {
  fetchPageData,
  fetchGeneralData,
}
