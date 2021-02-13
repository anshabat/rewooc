import React, { Component } from 'react'
import { appApi } from 'app-data'
import ContentLoader from '../components/UI/loaders/ContentLoader/ContentLoader'

function withPageData(InnerComponent) {
  // TODO remove this
  // eslint-disable-next-line react/display-name
  return class extends Component<any, any> {
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
      const { location } = this.props
      if (prevProps.location.pathname !== location.pathname) {
        this.setState({ data: null })
        this.loadData()
      }
    }

    loadData() {
      appApi.fetchPageData(window.location.pathname).then(({ data }) => {
        this.setState({ data })
      })
    }

    render() {
      const { data } = this.state
      return data ? (
        <InnerComponent {...this.props} {...this.state.data} />
      ) : (
        <ContentLoader />
      )
    }
  }
}

export default withPageData
