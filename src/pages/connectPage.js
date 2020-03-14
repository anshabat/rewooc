import React, {Component} from "react";
import {apiUrl} from "../shared/utilities";
import {connect} from "react-redux";

const connectPage = (mapStateToProps, mapDispatchToProps) => {
  return (InnerComponent) => {
    return connect(mapStateToProps, mapDispatchToProps)(class extends Component {

      componentDidMount() {
        this.loadData();
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
          this.loadData();
        }
      }

      loadData() {
        this.props.loadPage(apiUrl(window.location.pathname))
      }

      render() {
        return (
          <InnerComponent {...this.props} />
        )
      }
    })
  }
};

export default connectPage