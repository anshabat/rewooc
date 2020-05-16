import React, {useEffect} from "react";
import {apiUrl} from "../shared/utilities";
import {connect} from "react-redux";

const connectPage = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {

    const Page = (props) => {
      const {loadPage, router} = props;

      useEffect(() => {
        loadPage(apiUrl(window.location.pathname))
      }, [router.location.pathname])

      return (
        <Component {...props} />
      )
    }

    return connect((state) => {
      return {
        router: state.router,
        ...mapStateToProps(state)
      }
    }, mapDispatchToProps)(Page)
  }
};

export default connectPage