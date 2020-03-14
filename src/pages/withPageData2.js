import React, {Component} from "react";
import axios from "axios";
import {apiUrl} from "../shared/utilities";
import ContentLoader from "../components/UI/loaders/ContentLoader/ContentLoader";
import {connect} from "react-redux";
import Content from "../components/Layout/Content/Content";

const withPageData2 = (mapStateToProps, mapDispatchToProps) => {
  return (InnerComponent) => {
    return connect(mapStateToProps, mapDispatchToProps)(class extends Component {
      /*constructor(props) {
        super(props);
        this.state = {
          data: null
        };
        this.loadData = this.loadData.bind(this);
      }*/

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
        const {title, loading} = this.props.page;

        if (loading) return <ContentLoader/>;

        return (
          <Content title={title}>
            <InnerComponent {...this.props} />
          </Content>
        )

      }
    })
  }
};

export default withPageData2