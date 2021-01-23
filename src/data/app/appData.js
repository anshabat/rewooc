import {instance} from "../instance";
import {pageUrl} from "../endpoints";

export const fetchPageData = (url) => {
  return instance.get(pageUrl(url))
}