import {Record} from "immutable";
import {INIT_APP_SUCCESS} from '../app/appActions';

const initialState = Record({
  user: null
});

const reducer = (state = new initialState(), action) => {
  const {type, payload} = action;

  switch (type) {
    case INIT_APP_SUCCESS:
      return state.set('user', payload.user);
    default:
      return state;
  }

};

export default reducer