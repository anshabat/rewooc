export const CATALOG_PAGE_LOAD = 'CATALOG_PAGE_LOAD';
export const CATALOG_PAGE_LOAD_SUCCESS = 'CATALOG_PAGE_LOAD_SUCCESS';
export const CATALOG_PAGE_LOAD_FAIL = 'CATALOG_PAGE_LOAD_FAIL';

export const loadCatalogPage = (url) => {
  return {type: CATALOG_PAGE_LOAD, payload: {url}}
}

export const loadCatalogPageSuccess = (data) => {
  return {
    type: CATALOG_PAGE_LOAD_SUCCESS,
    payload: {
      products: data.products,
      title: data.title
    }
  };
};

export const loadCatalogPageFail = (error) => {
  return {type: CATALOG_PAGE_LOAD_FAIL, error};
};