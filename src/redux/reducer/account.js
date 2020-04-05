import {INIT_APP_SUCCESS} from "../actionTypes";

const initialState = {
  data: null
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case INIT_APP_SUCCESS:
      return {...state, data: payload.user};
    default:
      return state;
  }

};

export default reducer