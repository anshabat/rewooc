import React, {useEffect} from "react";
import {apiUrl} from "../shared/utilities";
import {useDispatch, useSelector} from "react-redux";

const connectPage = (action) => (Component) => (props) => {
  const router = useSelector(state => state.router);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action(apiUrl(window.location.pathname)))
  }, [router.location.pathname])

  return <Component {...props} />
}

export default connectPage