import {instance} from "../instance";
import {pageUrl, wcAjax} from "../endpoints";

export const fetchPageData = (url) => {
  return instance.get(pageUrl(url))
}

export const fetchGeneralData = () => {
  return instance.get(wcAjax('rewooc_get_common_data'))
}