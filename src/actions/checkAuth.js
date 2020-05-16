import {signOut} from './signOut';
import {signInSuccess} from './signIn';

export const checkAuth = () => dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(signOut());
  } else {
    dispatch(signInSuccess());
  }
};