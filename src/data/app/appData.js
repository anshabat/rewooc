import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'

export default {
  fetchPageData: (url) => {
    return instance.get(pageUrl(url))
  },
  fetchGeneralData: () => {
    return instance.get(wcAjax('rewooc_get_common_data'))
  },
}
