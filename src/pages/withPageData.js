import React, {Component} from "react";
import {fetchPageData} from "app-data";
import ContentLoader from "../components/UI/loaders/ContentLoader/ContentLoader";

const withPageData = (InnerComponent, url) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
      this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
      this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.setState({data: null});
        this.loadData();
      }
    }

    loadData() {
      const url = url ? url : window.location.pathname;
      fetchPageData(url).then(({data}) => {
        this.setState({data});
      })
    }

    render() {
      return this.state.data ? (
        <InnerComponent {...this.props} {...this.state.data} />
      ) : (
        <ContentLoader/>
      )
    }
  }
}

export default withPageData