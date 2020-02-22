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
      return {...state, loading: true};
    case INIT_APP_SUCCESS:
      return {...state, loading: false, data: action.payload.data};
    case INIT_APP_FAIL:
      return {...state, error: true};
    default:
      return {...state}
  }
};

export default reducer;