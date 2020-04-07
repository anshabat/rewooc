import axios from 'axios';

export const CATALOG_PAGE_LOAD_START = 'CATALOG_PAGE_LOAD_START';
export const CATALOG_PAGE_LOAD_SUCCESS = 'CATALOG_PAGE_LOAD_SUCCESS';
export const CATALOG_PAGE_LOAD_FAIL = 'CATALOG_PAGE_LOAD_FAIL';

export const loadCatalogPage = (url) => {
  return dispatch => {
    dispatch(loadCatalogPageStart());
    axios.get(url).then(({data}) => {
      dispatch(loadCatalogPageSuccess(data));
    }).catch(error => {
      dispatch(loadCatalogPageFail(error))
    })
  }
};

export const loadCatalogPageStart = () => {
  return {type: CATALOG_PAGE_LOAD_START};
};

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