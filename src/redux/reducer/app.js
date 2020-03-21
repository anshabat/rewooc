import {INIT_APP_FAIL, INIT_APP_START, INIT_APP_SUCCESS} from "../actionTypes";

const initialState = {
  data: {},
  loading: true,
  error: false
};

const reducer = (state = initialState, action) => {
  //console.log(action)
  //console.log(state)

  switch (action.type) {
    case INIT_APP_START:
      return {...state, loading: true, error: false};
    case INIT_APP_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload};
    case INIT_APP_FAIL:
      return {...state, loading: false, error: action.error};
    default:
      return {...state}
  }
};

export default reducer;