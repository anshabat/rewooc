import React, { Component } from 'react'
import { appApi } from 'app-data'
import ContentLoader from '../components/UI/loaders/ContentLoader/ContentLoader'

const withPageData = (InnerComponent) =>
  // TODO remove this
  // eslint-disable-next-line react/display-name
  class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: null,
      }
      this.loadData = this.loadData.bind(this)
    }

    componentDidMount() {
      this.loadData()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.setState({ data: null })
        this.loadData()
      }
    }

    loadData() {
      const url = url ? url : window.location.pathname
      appApi.fetchPageData(url).then(({ data }) => {
        this.setState({ data })
      })
    }

    render() {
      return this.state.data ? (
        <InnerComponent {...this.props} {...this.state.data} />
      ) : (
        <ContentLoader />
      )
    }
  }

export default withPageData
