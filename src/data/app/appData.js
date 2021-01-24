import { instance } from '../instance'
import { pageUrl, wcAjax } from '../endpoints'

export default {
  fetchPageData: (url) => instance.get(pageUrl(url)),
  fetchGeneralData: () => instance.get(wcAjax('rewooc_get_common_data')),
}
