import {PAGE_LOAD_FAIL, PAGE_LOAD_START, PAGE_LOAD_SUCCESS} from "../actionTypes";

const initialStat = {
  loading: false,
  error: false,
  data: null
};

const reducer = (state = initialStat, action) => {
  console.log(action);
  const {type, payload, error} = action;
  switch (type) {
    case PAGE_LOAD_START:
      return {...state, loading: true};
    case PAGE_LOAD_SUCCESS:
      return {...state, data: payload.data, loading: false};
    case PAGE_LOAD_FAIL:
      return {...state, error, loading: false};
    default:
      return {...state}
  }
};

export default reducer;